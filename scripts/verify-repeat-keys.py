#!/usr/bin/env python3
"""Count Bull repeatable-job registrations in a Redis instance.

Repeatable polling jobs live only in Redis. After a cutover (or any eviction/flush) the
integrations stay RUNNING in the database while their jobs are gone, and nothing reports it --
the pods look healthy. This script is the check: it counts what is actually registered, so a
restart pass can be verified instead of assumed.

Bull keeps the repeat registry in a ZSET at `<prefix>:<queue>:repeat`, one member per repeatable
job. Prefixes differ per engine (`{}`, `{bull:idexx}`, `{bull:antech}`, and zoetis is not
hash-tagged), so this scans for every `*:repeat` ZSET rather than assuming a layout.

Usage:
  python3 verify-repeat-keys.py --host <name>.redis.cache.windows.net [--expect 10]

  REDIS_PASSWORD=... python3 verify-repeat-keys.py --host ... --port 6380

Runs anywhere with the `redis` package and network access to the instance -- e.g. the
dmi-monitor container, or `kubectl run` inside the cluster when the instance is behind a
private endpoint.
"""

import argparse
import os
import sys
from collections import defaultdict

try:
    import redis
except ImportError:  # pragma: no cover
    sys.exit("The 'redis' package is required: pip install redis")


def parse_args():
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--host", required=True, help="Redis hostname")
    parser.add_argument("--port", type=int, default=6380, help="Redis port (default: 6380, TLS)")
    parser.add_argument("--password", default=os.environ.get("REDIS_PASSWORD"),
                        help="Access key (default: $REDIS_PASSWORD)")
    parser.add_argument("--no-tls", action="store_true", help="Connect without TLS")
    parser.add_argument("--db", type=int, default=0, help="Database index (default: 0)")
    parser.add_argument("--match", default="*repeat*",
                        help="SCAN pattern (default: *repeat*)")
    parser.add_argument("--expect", type=int, default=None,
                        help="Expected total repeatable jobs; exit 1 if the total differs")
    parser.add_argument("--legacy-prefix", default="bull:",
                        help="Report keys under this non-hash-tagged prefix separately "
                             "(default: bull:) -- debris from the earlier prefix migration")
    return parser.parse_args()


def main():
    args = parse_args()

    client = redis.Redis(
        host=args.host,
        port=args.port,
        password=args.password,
        ssl=not args.no_tls,
        db=args.db,
        decode_responses=True,
        socket_timeout=15,
    )

    registries = {}
    legacy_keys = 0
    scanned = 0

    for key in client.scan_iter(match=args.match, count=1000):
        scanned += 1
        if key.startswith(args.legacy_prefix):
            legacy_keys += 1
        if key.endswith(":repeat") and client.type(key) == "zset":
            registries[key] = client.zcard(key)

    if not registries:
        print(f"No repeatable-job registries found (scanned {scanned} key(s) matching "
              f"{args.match!r})")

    by_prefix = defaultdict(list)
    for key, count in registries.items():
        # `<prefix>:<queue>:repeat` -- everything before the queue name is the prefix
        parts = key.rsplit(":", 2)
        prefix = parts[0] if len(parts) == 3 else key
        by_prefix[prefix].append((key, count))

    total = 0
    for prefix in sorted(by_prefix):
        entries = sorted(by_prefix[prefix])
        subtotal = sum(count for _, count in entries)
        total += subtotal
        print(f"\n{prefix}  ({subtotal} job(s) across {len(entries)} queue(s))")
        for key, count in entries:
            print(f"  {count:>6}  {key}")

    print(f"\nTotal repeatable jobs: {total}")
    if legacy_keys:
        print(f"Keys under legacy prefix {args.legacy_prefix!r}: {legacy_keys} "
              f"(expected 0 after cutover validation)")

    if args.expect is not None and total != args.expect:
        print(f"\nFAIL: expected {args.expect} repeatable job(s), found {total}")
        return 1

    if args.expect is not None:
        print(f"OK: matches the expected {args.expect}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
