# Waited for services
wget -q https://github.com/eficode/wait-for/releases/latest/download/wait-for
chmod +x ./wait-for
./wait-for -q mysql:3306 -t 60 -- echo 'MySQL is up' &
PID_MYSQL=$!
./wait-for -q mongo:27017 -t 60 -- echo 'Mongo is up' &
PID_MONGO=$!
./wait-for -q activemq:1883 -t 60 -- echo 'ActiveMQ is up' &
PID_ACTIVEMQ=$!

echo 'Waiting for all services to start...'
wait $PID_MYSQL || { echo 'MySQL connection timed out'; exit 1; }
wait $PID_MONGO || { echo 'Mongo connection timed out'; exit 1; }
wait $PID_ACTIVEMQ || { echo 'ActiveMQ connection timed out'; exit 1; }
echo 'Waited for all services successfully'
eval $1
