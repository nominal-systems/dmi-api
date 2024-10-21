import { MigrationInterface, QueryRunner } from 'typeorm'

const providerRefs = [
    {
        id: 1,
        code: 'M',
        name: 'Male',
        species: null,
        type: 'sex',
        provider: 'antech',
        ref: 1
    },
    {
        id: 2,
        code: 'MALE_INTACT',
        name: 'Male',
        species: null,
        type: 'sex',
        provider: 'idexx',
        ref: 1
    },
    {
        id: 3,
        code: 'F',
        name: 'Female',
        species: null,
        type: 'sex',
        provider: 'antech',
        ref: 2
    },
    {
        id: 4,
        code: 'FEMALE_INTACT',
        name: 'Female',
        species: null,
        type: 'sex',
        provider: 'idexx',
        ref: 2
    },
    {
        id: 5,
        code: 'U',
        name: 'Unknown',
        species: null,
        type: 'sex',
        provider: 'antech',
        ref: 3
    },
    {
        id: 6,
        code: 'UNKNOWN',
        name: 'Unknown',
        species: null,
        type: 'sex',
        provider: 'idexx',
        ref: 3
    },
    {
        id: 7,
        code: '41',
        name: 'Canine',
        species: null,
        type: 'species',
        provider: 'antech',
        ref: 4
    },
    {
        id: 8,
        code: 'BOVINE',
        name: 'Bovine',
        species: null,
        type: 'species',
        provider: 'idexx',
        ref: 7
    },
    {
        id: 9,
        code: '42',
        name: 'Feline',
        species: null,
        type: 'species',
        provider: 'antech',
        ref: 5
    },
    {
        id: 10,
        code: '45',
        name: 'Bovine',
        species: null,
        type: 'species',
        provider: 'antech',
        ref: 7
    }
]
const refs = [
    {
        id: 1,
        name: 'Male',
        code: 'MALE',
        species: null,
        type: 'sex'
    },
    {
        id: 2,
        name: 'Female',
        code: 'FEMALE',
        species: null,
        type: 'sex'
    },
    {
        id: 3,
        name: 'Unknown',
        code: 'UNKNOWN',
        species: null,
        type: 'sex'
    },
    {
        id: 4,
        name: 'Canis familiaris',
        code: 'CANIS_FAMILIARIS',
        species: null,
        type: 'species'
    },
    {
        id: 5,
        name: 'Felidae',
        code: 'FELIDAE',
        species: null,
        type: 'species'
    },
    {
        id: 7,
        name: 'Bovine',
        code: 'BOVINE',
        species: null,
        type: 'species'
    }
]
const mappings = [
    [
        "Schipperke",
        "163",
        "41",
        "breed",
        "antech"
    ],
    [
        "Blue Gascony Griffon",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Yugoslavian Shepherd DogSharplanina Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis aureus naria",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis adustus bweha",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus gregoryi",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-Haired Medium-Sized Portuguese Podengo Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Whippet Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Austrian Pinscher Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bracco Italiano",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Puli Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Havana Brown",
        "18",
        "42",
        "breed",
        "antech"
    ],
    [
        "Japanese Bobtail Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Finnish Hound",
        "529",
        "41",
        "breed",
        "antech"
    ],
    [
        "Standard Mexican Hairless Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mexican Hairless Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Long-haired Pointer Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sam sawet",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Abyssinian Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Uruguayan Cimarron",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Ukrainian Levkoy Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Great AngloFrench Tricolour Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Plott Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Icelandic Sheepdog",
        "530",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Short-haired Curl Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Swedish Elkhound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Slovakian Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bloodhound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Parson Russell Terrier",
        "1303",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans goldmani",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bracco Italiano Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Volpino Italiano Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "European German Shepherd Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Aegean",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "American Short-haired Curl",
        "3",
        "42",
        "breed",
        "antech"
    ],
    [
        "Great AngloFrench Tricolour Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Side-striped Jackal",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Neva Masquerade Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis lupus pambasileus",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bloodhound",
        "64",
        "41",
        "breed",
        "antech"
    ],
    [
        "Spanish Mastiff Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Lynx Point Siamese",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Short-haired Dutch Shepherd Dog",
        "630",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dragon Li",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Belgian Griffon Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Croatian Sheepdog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sarabi dog mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Javanese Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Siberian Husky Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mekong Bobtail",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Thai Ridgeback dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Nederlandse Kooikerhondje",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Spitz Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-Haired Large Portuguese Podengo",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Basenji Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Toy Manchester Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rabbit Hunting Dachshund Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kishu Ken",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis mesomelas mesomelas",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Silky Terrier",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pharaoh Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pug Dog",
        "156",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Toy Terrier",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Stumpy Tail Cattle Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Russian Toy",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "LaPerm Long-haired Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Devon Rex",
        "14",
        "42",
        "breed",
        "antech"
    ],
    [
        "Spanish Greyhound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Croatian Sheepdog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-Haired Miniature Portuguese Podengo",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Affenpinscher Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "British Blue Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Small Blue Gascony Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Suphalak",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Norwegian Buhund Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dandie Dinmont Terrier",
        "91",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sussex Spaniel",
        "177",
        "41",
        "breed",
        "antech"
    ],
    [
        "Burgos Pointing Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Munchkin Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Lakeland Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Black Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "West Highland White Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-haired Standard Dachshund Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Cocker Spaniel",
        "86",
        "41",
        "breed",
        "antech"
    ],
    [
        "Keeshond Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Setter dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Black and Tan Coonhound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sporting Lucas Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norwegian Elkhound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Pointing Dog Gascogne",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Traditional Persian Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Dwelf Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Setter dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hokkaido",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Azawakh",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Parson Russell Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Asian Cat",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Wire-Haired Large Portuguese Podengo Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Labrador Retriever",
        "130",
        "41",
        "breed",
        "antech"
    ],
    [
        "Manx",
        "24",
        "42",
        "breed",
        "antech"
    ],
    [
        "Curilsk Bobtail",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Blue-Eyed Cat",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Labrador Wolf",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Cat",
        "29",
        "42",
        "breed",
        "antech"
    ],
    [
        "Rafeiro of Alentejo Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Bulldog",
        "75",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mexican Hairless Dog Miniature",
        "533",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mexican Hairless Dog",
        "1296",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Spaniel",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Standard Schnauzer",
        "426",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Setter Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "South Russian Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Elo Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Miniature Dachshund Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bergamasco Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tibetan Spaniel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "European Shorthair",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Porcelain",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Neapolitan Mastiff Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Garafian Shepherd Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Curly Coated Retriever Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pekingese Dog",
        "147",
        "41",
        "breed",
        "antech"
    ],
    [
        "Border Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "BeagleHarrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-haired Rabbit Hunting Dachshund Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Maltese Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Oregon Rex",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Borzoi Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Oriental Cat",
        "27",
        "42",
        "breed",
        "antech"
    ],
    [
        "Wila Krungthep",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Jack Russell Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cyprus Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Lancashire Heeler Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Shiba Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Spaniel dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans clepticus",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Beagle Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mudi",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bernese Mountain Dog",
        "61",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus tundrarum",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus youngi",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Poodle Mix Toy",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tornjak",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kai Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans umpquensis",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rottweiler Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Raas Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Dachshund Long-haired Miniature",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Swiss Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-faced Pyrenean Sheepdog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-Haired Large Portuguese Podengo Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Snowshoe Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Cairn Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Small Portuguese Podengo Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bearded Collie Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus arabs",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Appenzell Cattle Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norwegian Forest Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Tibetan Terrier",
        "179",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Standard Dachshund",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Burmese Cat",
        "10",
        "42",
        "breed",
        "antech"
    ],
    [
        "Russian Spaniel",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus ligoni",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Fawn Brittany Basset",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Saint Bernard Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Peruvian Hairless Dog Mix miniature",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Berger Picard",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Maltipoo",
        "1302",
        "41",
        "breed",
        "antech"
    ],
    [
        "Swedish White Elkhound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Save Valley Scenthound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Short-haired Saint Bernard Dog",
        "160",
        "41",
        "breed",
        "antech"
    ],
    [
        "Powderpuff Chinese Crested Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chinese Crested Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Black-backed Jackal",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans hondurensis",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Jura Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Beauceron Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Austrian Black and Tan Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Curly Coated Retriever",
        "88",
        "41",
        "breed",
        "antech"
    ],
    [
        "Gascon Saintongeois Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Miniature American Shepherd",
        "533",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sloughi Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Ghadrejani Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Spitz Miniature",
        "153",
        "41",
        "breed",
        "antech"
    ],
    [
        "Shih Tzu Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired German Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Bulldog",
        "632",
        "41",
        "breed",
        "antech"
    ],
    [
        "Montenegrin Mountain Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Leonberger Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Poodle",
        "154",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Hunting Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Somali Cat",
        "36",
        "42",
        "breed",
        "antech"
    ],
    [
        "Serrade Petit",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Polish Hunting Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Slovakian Chuvach",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Manx Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Flat Coated Retriever",
        "99",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hokkaido Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rough-haired Dutch Shepherd Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rabbit Hunting Dachshund",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schnauzer Mix Miniature",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Polish Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Petit Basset Griffon Vendeen Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cymric Long-haired Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Ibizan Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Balinese Cat",
        "6",
        "42",
        "breed",
        "antech"
    ],
    [
        "Great Pyrenees Pyrenean Mountain Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Rabbit Hunting Dachshund",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus hodophilax",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Phalène Continental Toy Spaniel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Georgian Shepherd",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Goldendoodle",
        "541",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Pinscher",
        "105",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pixie-bob Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Artesian-Norman Basset",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Artois Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dachshund Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Shetland Sheepdog",
        "167",
        "41",
        "breed",
        "antech"
    ],
    [
        "Affenpinscher",
        "41",
        "41",
        "breed",
        "antech"
    ],
    [
        "Saarloos Wolfdog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Billy",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norwich Terrier",
        "143",
        "41",
        "breed",
        "antech"
    ],
    [
        "Leonberger",
        "489",
        "41",
        "breed",
        "antech"
    ],
    [
        "Greyhound",
        "115",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tonkinese Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Afghan Hound",
        "42",
        "41",
        "breed",
        "antech"
    ],
    [
        "Atlas Shepherd Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Toy Spaniel",
        "96",
        "41",
        "breed",
        "antech"
    ],
    [
        "Miniature Shar Pei Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Chihuahua",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chihuahua",
        "81",
        "41",
        "breed",
        "antech"
    ],
    [
        "Briard",
        "71",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hairless Chinese Crested Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-faced Pyrenean Sheepdog",
        "497",
        "41",
        "breed",
        "antech"
    ],
    [
        "Fila Brasileiro Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Slovakian Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Siamese Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Wetterhoun",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Belgian Shepherd Dog Tervuren",
        "60",
        "41",
        "breed",
        "antech"
    ],
    [
        "Belgian Shepherd Dog",
        "1311",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dalmatian",
        "90",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pyrenean Shepherd Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Jagdterrier dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Basenji",
        "53",
        "41",
        "breed",
        "antech"
    ],
    [
        "Old German Shepherd Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canadian Eskimo Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Water Spaniel",
        "48",
        "41",
        "breed",
        "antech"
    ],
    [
        "Artesian-Norman Basset Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Napoleon Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis lupus griseoalbus",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Standard Dachshund Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Miniature Portuguese Podengo",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Shikoku Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cairn Terrier",
        "77",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans vigilis",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sphynx Cat",
        "37",
        "42",
        "breed",
        "antech"
    ],
    [
        "Cao Fila de Sao Miguel",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Large Münsterlander",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Laekenois Belgian Shepherd Dog",
        "629",
        "41",
        "breed",
        "antech"
    ],
    [
        "Lancashire Heeler",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Italian Spinone Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired German Shepherd Dog",
        "106",
        "41",
        "breed",
        "antech"
    ],
    [
        "Birman Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Aphrodite Giant",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis lupus rufus",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Jagdterrier dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Miniature Pinscher Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tortie Point Siamese",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Japanese Spitz",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Standard Dachshund Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Hairless Terrier",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Silky Terrier",
        "171",
        "41",
        "breed",
        "antech"
    ],
    [
        "Large Münsterlander Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Catalan Sheepdog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Alaskan Malamute Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schnauzer Dog",
        "543",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rough-coated Collie",
        "87",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dutch Shepherd Dog",
        "630",
        "41",
        "breed",
        "antech"
    ],
    [
        "Briquet Griffon Vendeen",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chausie Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Stabyhoun Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Pointing Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tortie Point Siamese Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Burmilla",
        "10",
        "42",
        "breed",
        "antech"
    ],
    [
        "Kromfohrländer Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Gascogne French Pointing Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hamilton Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sphynx Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Labrador Retriever Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-Haired Medium-Sized Portuguese Podengo",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Spaniel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Scottish Deerhound",
        "164",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Rabbit Hunting Dachshund Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Traditional Persian",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Ocicat Cat",
        "26",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis aureus bea",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-Haired Miniature Portuguese Podengo Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus orion",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Long-haired Bobtail Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Rafeiro of Alentejo",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canarian Warren Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Short haired Majorcan Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Munsterlander Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Grey Norwegian Elkhound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Russian Toy Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cao Fila de Sao Miguel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Glen of Imaal Terrier",
        "495",
        "41",
        "breed",
        "antech"
    ],
    [
        "Halden Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norwegian Elkhound grey",
        "142",
        "41",
        "breed",
        "antech"
    ],
    [
        "Balinese Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Cane corso",
        "525",
        "41",
        "breed",
        "antech"
    ],
    [
        "Jungle Curl",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "American Cocker Spaniel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tatra Shepherd Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Brazilian Terrier",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus campestris",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Alpine Dachsbracke",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cymric Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Long-haired Rabbit Hunting Dachshund Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Blue Gascony Basset",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Manchester Terrier",
        "135",
        "41",
        "breed",
        "antech"
    ],
    [
        "Himalayan Sheepdog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Wirehaired Pointer",
        "108",
        "41",
        "breed",
        "antech"
    ],
    [
        "Irish Glen of Imaal Terrier",
        "495",
        "41",
        "breed",
        "antech"
    ],
    [
        "Short-haired German Shepherd Dog",
        "106",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Cymric",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Gordon Setter",
        "111",
        "41",
        "breed",
        "antech"
    ],
    [
        "Majorca Mastiff",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Finnish Lapphund Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Central Asia Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Kurilean BobtailMix",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Tibetan Spaniel",
        "178",
        "41",
        "breed",
        "antech"
    ],
    [
        "Aegean Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "German Rex",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Volpino Italiano",
        "1300",
        "41",
        "breed",
        "antech"
    ],
    [
        "Uruguayan Cimarron Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Greater Swiss Mountain Dog",
        "114",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cavalier King Charles Spaniel",
        "79",
        "41",
        "breed",
        "antech"
    ],
    [
        "Picardy Spaniel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dunker Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kangal Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Scottish Fold Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Lynx Point Siamese Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Bengal Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Puli",
        "157",
        "41",
        "breed",
        "antech"
    ],
    [
        "Persian Cat",
        "28",
        "42",
        "breed",
        "antech"
    ],
    [
        "Neva Masquerade",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Sussex Spaniel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Staffordshire Bull Terrier",
        "175",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-haired Miniature Dachshund Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dragon Li Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Asian Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Hollandse Smoushond",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Cocker Spaniel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bohemian Shepherd",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Rabbit Hunting Dachshund",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis aureus riparius",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bombay Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Swedish Vallhund Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Samoyed Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Border Terrier",
        "66",
        "41",
        "breed",
        "antech"
    ],
    [
        "Oriental Bicolor",
        "27",
        "42",
        "breed",
        "antech"
    ],
    [
        "British Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Welsh Corgi Pembroke",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Old English Sheepdog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bambino Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Dogue De Bordeaux Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Standardized Siamese Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Bavarian Mountain Scenthound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bohemian Shepherd Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bohemian Wire-haired Pointing Griffon Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Indian Spitz",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Terceira Mastiff",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kerry Blue Terrier",
        "127",
        "41",
        "breed",
        "antech"
    ],
    [
        "Miniature Bull Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Barbet",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Harrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus arctos",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Black Russian Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Scottish Terrier",
        "165",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wolf Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Peterbald",
        "507",
        "42",
        "breed",
        "antech"
    ],
    [
        "Blue Gascony Griffon Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Spitz Pomeranian",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Welsh Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Otterhound",
        "635",
        "41",
        "breed",
        "antech"
    ],
    [
        "Korean Bobtail",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Shar Pei Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tosa",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Boykin Spaniel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Retriever Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Siberian Cat",
        "34",
        "42",
        "breed",
        "antech"
    ],
    [
        "Irish Water Spaniel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "PontAudemer Spaniel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Turkish Angora",
        "513",
        "42",
        "breed",
        "antech"
    ],
    [
        "Lhasa Apso Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "DanishSwedish Farmdog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Thai Cat",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Central Asia Shepherd Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Oriental Short-haired",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Japanese Spitz Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Water Spaniel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hälleforshund",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Small Blue Gascony Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Oriental Bicolor Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Spanish Water Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus bernardi",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Wire-haired Korthals Pointing Griffon",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Italian Short-haired Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Spitz Mix Pomeranian",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus mackenzii",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "King Shepherd",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sokoke",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Taiwan Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Karst Shepherd Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian working kelpie Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Egyptian Mau Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis latrans incolatus",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Majorca Mastiff Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Grand Griffon Vendeen",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "York Chocolate Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Ibizan Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Spaniel",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Elo",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Greenland Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus albus",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Turkish Van Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Ragdoll Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Czechoslovakian Wolfdog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Groenendael Belgian Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Spaniel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Russian Toy Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "South African Blue Cat",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis latrans microdon",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Malinois Belgian Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Terceira Mastiff Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Japanese Chin",
        "125",
        "41",
        "breed",
        "antech"
    ],
    [
        "Suphalak Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Halden Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Continental Toy Spaniel Mix Papillon",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dogo Argentino",
        "1298",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Shepherd Dog",
        "106",
        "41",
        "breed",
        "antech"
    ],
    [
        "Porcelain Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bohemian Wire-haired Pointing Griffon",
        "189",
        "41",
        "breed",
        "antech"
    ],
    [
        "Staffordshire Bull terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pyrenean French Pointing Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Spotted Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "LaPerm Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis latrans cagottis",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Welsh Sheepdog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Belgian Shepherd Dog Groenendael",
        "628",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans mearnsi",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Shiba",
        "168",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cirneco dell'Etna Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Miniature Fox Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hamilton Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus fuscus",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Griffon Nivernais Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Nova Scotia Duck Tolling Retriever Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Serbian Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Minskin",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Long-haired Chihuahua",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Ibizan Smooth-haired Hound",
        "118",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rottweiler",
        "159",
        "41",
        "breed",
        "antech"
    ],
    [
        "Grand Basset Griffon Vendeen",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-Haired Miniature Portuguese Podengo",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Welsh Terrier",
        "186",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sealyham Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Lykoi Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "American Wire-haired Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Slovakian Chuvach Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tosa Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Ragdoll",
        "30",
        "42",
        "breed",
        "antech"
    ],
    [
        "Irish Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kishu Ken Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chinese Crested Hairless",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chinese Crested",
        "82",
        "41",
        "breed",
        "antech"
    ],
    [
        "Saint-Usuge Spaniel",
        "177",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Curl Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis adustus lateralis",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Yakutian Laika Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Polish Hunting Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Swedish Elkhound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "East European Shepherd",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Azawakh Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norwegian Lundehund Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Irish Red and White Setter Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mekong Bobtail Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Finnish Lapphund",
        "529",
        "41",
        "breed",
        "antech"
    ],
    [
        "Short-haired Weimaraner",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hollandse Smoushond Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cheasapeake Bay Retriever",
        "80",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Short-haired Pointer",
        "107",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-haired Miniature Dachshund",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Miniature Dachshund",
        "89",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire Fox Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Scottish Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Black Terrier",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tibetan Mastiff Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Aphrodite Giant Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Poodle Medium",
        "154",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Eskimo Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Grand Griffon Vendeen Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Spitz Mix Miniature",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Domestic Cat",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Turkish Van",
        "40",
        "42",
        "breed",
        "antech"
    ],
    [
        "French Hound White and Black",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schapendoes Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "East Siberian Laïka Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Prague Ratter",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cantabrian Water Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hälleforshund Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Slovakian Rough-haired Pointer Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Domestic Short-haired Cat (British)",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "English Cocker Spaniel",
        "93",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Staffordshire Terrier",
        "47",
        "41",
        "breed",
        "antech"
    ],
    [
        "Poodle Toy",
        "638",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bergamasco Shepherd Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Save Valley Scenthound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Segugio Maremmano Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Abyssinian",
        "1",
        "42",
        "breed",
        "antech"
    ],
    [
        "Kintamani-Bali Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Toy Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Finnish Spitz Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Bulldog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norwich Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Weimaraner",
        "182",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus baileyi",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kromfohrländer",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Galician Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chausie",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Chantilly-Tiffany",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Oriental Long-haired Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Ariege Pointing Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Wirehaired Pointer Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bichon Frise",
        "62",
        "41",
        "breed",
        "antech"
    ],
    [
        "Great Anglo-French White and Orange Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans texensis",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Saint-Usuge Spaniel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rough-haired Dutch Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Harrier",
        "116",
        "41",
        "breed",
        "antech"
    ],
    [
        "Peruvian Hairless Dog miniature",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sam sawet Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Russian White Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Raas",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Catalan Sheepdog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chartreuse Cat",
        "11",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis lupaster doederleini",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Japanese Bobtail",
        "19",
        "42",
        "breed",
        "antech"
    ],
    [
        "Cymric",
        "506",
        "42",
        "breed",
        "antech"
    ],
    [
        "Russian-European Laïka Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dwelf",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis lupus alces",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "California Spangled Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Shikoku",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Welsh Springer Spaniel",
        "185",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tortie Lynx Point Siamese Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Boston Terrier",
        "68",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bohemian Rex",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Smooth-coated Collie Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Toy Manchester Terrier",
        "135",
        "41",
        "breed",
        "antech"
    ],
    [
        "Somali Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Neapolitan Mastiff",
        "492",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Long-haired Purebred cat",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Pinscher dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Doberman Pinscher",
        "92",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bouvier des Flandres Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Foxhound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American German Shepherd Dog",
        "106",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tortie Lynx Point Siamese Cat",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Irish Red and White Setter",
        "496",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Scottish Fold",
        "31",
        "42",
        "breed",
        "antech"
    ],
    [
        "Korat",
        "21",
        "42",
        "breed",
        "antech"
    ],
    [
        "Medium-Sized Anglo-French Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norwegian Elkhound",
        "142",
        "41",
        "breed",
        "antech"
    ],
    [
        "Old Danish Pointing Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Stabyhoun Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Shetland Sheepdog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "LaPerm Long-haired",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Singapura Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Highlander",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Ariege Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Serbian Tricolour Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hygen Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Old German Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Finnish Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Basque Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Indian Spitz Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Cattle Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Scottish Fold",
        "31",
        "42",
        "breed",
        "antech"
    ],
    [
        "Thai Bangkaew Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Tabby",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis lupus hattai",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Singapura",
        "35",
        "42",
        "breed",
        "antech"
    ],
    [
        "Schwyz Swiss Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Irish Softcoated Wheaten Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Toyger Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "American Akita",
        "44",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chow Chow",
        "84",
        "41",
        "breed",
        "antech"
    ],
    [
        "Skye Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Short-haired Scottish Fold",
        "31",
        "42",
        "breed",
        "antech"
    ],
    [
        "Brazilian Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Korea Jindo Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Bobtail Short-haired Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Savannah Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Portuguese Podengo Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Selkirk Rex",
        "32",
        "42",
        "breed",
        "antech"
    ],
    [
        "Polish Greyhound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kuvasz",
        "129",
        "41",
        "breed",
        "antech"
    ],
    [
        "East European Shepherd Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Shiloh Shepherd Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Alaskan Malamute",
        "45",
        "41",
        "breed",
        "antech"
    ],
    [
        "European",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Whippet",
        "188",
        "41",
        "breed",
        "antech"
    ],
    [
        "Romanian Mioritic Shepherd Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Arabian Mau",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Brussels Griffon Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Ibizan Rough-haired Hound",
        "118",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Pointer",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canaan",
        "78",
        "41",
        "breed",
        "antech"
    ],
    [
        "Minskin Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Bucovina Shepherd Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Cattle Dog",
        "50",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Black Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Japanese Akita",
        "44",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Mist",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Briard Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Hound Tricolour",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kuvasz Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Old English Sheepdog",
        "144",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tonkinese Cat",
        "38",
        "42",
        "breed",
        "antech"
    ],
    [
        "Belgian Shepherd Dog Malinois",
        "58",
        "41",
        "breed",
        "antech"
    ],
    [
        "Saluki Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Castro Laboreiro Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Westphalian Dachsbracke Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wetterhoun Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tibetan Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Maine Coon Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Italian Hound Mix Coarsehaired",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Short-haired Scottish Fold Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Belgian Shepherd Dog Mix Tervuren",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Maltese",
        "134",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bichon Frise Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Foldex",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Cesky Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long haired Majorcan Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Afghan Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chow Chow Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Auvergne Pointing Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Swedish Lapphund Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Transylvanian Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Polish Tatra Sheepdog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Billy Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "LaPerm Short-haired",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Irish Wolfhound",
        "122",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Setter",
        "94",
        "41",
        "breed",
        "antech"
    ],
    [
        "Romanian Bucovina Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Standard Poodle",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Long-haired Bobtail",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Himalayan Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Miniature Dachshund",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Anatolian Shepherd Dog",
        "49",
        "41",
        "breed",
        "antech"
    ],
    [
        "Irish Glen of Imaal Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Borzoi",
        "460",
        "41",
        "breed",
        "antech"
    ],
    [
        "Beagle-Harrier",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Samoyed Dog",
        "162",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Rex Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Boxer Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Great AngloFrench White and Orange Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Small Brabant Griffon Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Icelandic Sheepdog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Miniature Dachshund Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Artois Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Serrade Petit Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Fox Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus beothucus",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Portuguese Pointing Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rat Terrier",
        "503",
        "41",
        "breed",
        "antech"
    ],
    [
        "<unknown>",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Miniature American Shepherd Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Clumber Spaniel",
        "85",
        "41",
        "breed",
        "antech"
    ],
    [
        "Beauceron",
        "491",
        "41",
        "breed",
        "antech"
    ],
    [
        "Romanian Carpathian Shepherd Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cavalier King Charles Spaniel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Crossbred",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Keeshond",
        "126",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tibetan Mastiff",
        "499",
        "41",
        "breed",
        "antech"
    ],
    [
        "Italian Hound Coarsehaired",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bluetick Coonhound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Long-haired Curl",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis simensis citernii",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Löwchen",
        "133",
        "41",
        "breed",
        "antech"
    ],
    [
        "Poodle Miniature",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cantabrian Water Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bernadoodle Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Grand Basset Griffon Vendeen Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-haired Hungarian Vizsla",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Asian Cat Semi-Long-hair",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Cane corso Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans latrans",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Other Canids Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kangal Shepherd Dog",
        "49",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cockapoo",
        "932",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Saint Bernard Dog",
        "160",
        "41",
        "breed",
        "antech"
    ],
    [
        "Standard Schnauzer Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-haired Rabbit Hunting Dachshund",
        "89",
        "41",
        "breed",
        "antech"
    ],
    [
        "Crossbred Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dogo Canario Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Småland Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cornish Rex Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Wila Krungthep Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Newfoundland Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Karst Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Yorkipoo",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis aureus qattarensis",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Fox Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kumaon Mastiff",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dogo Canario",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Himalayan Sheepdog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Komondor",
        "128",
        "41",
        "breed",
        "antech"
    ],
    [
        "Gull Terrier",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bull Terrier Mix Standard",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schiller Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Curilsk Bobtail Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Modern Persian Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "English Pointer Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis aureus ecsedensis",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Carpathian Shepherd Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Basset Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Kelpie",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Labradoodle Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Fawn Brittany Griffon Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Taiwan Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Peruvian Hairless Dog mediumsized",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Irish Terrier",
        "120",
        "41",
        "breed",
        "antech"
    ],
    [
        "King Shepherd Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Donskoy",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Asian Cat Shorthair",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Swiss Hound Lucerne",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Miniature Shar Pei",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Scottish Deerhound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tenterfield Terrier",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis aureus soudanicus",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Foxhound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Black and Tan Coonhound",
        "516",
        "41",
        "breed",
        "antech"
    ],
    [
        "Peruvian Hairless Dog Large",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Yugoslavian Shepherd Dog Sharplanina",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian working kelpie",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Irish Red Setter Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bosnian CoarseHaired Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dutch Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis adustus adustus",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "York Chocolate",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "African Golden Wolf (Canis anthus)",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Shepherd",
        "51",
        "41",
        "breed",
        "antech"
    ],
    [
        "Gull Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Small Münsterländer",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rat Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Standard Dachshund",
        "89",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus columbianus",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Barbet Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis aureus algirensis",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Short-haired Majorcan Shepherd Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Irish Softcoated Wheaten Terrier",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Havanese Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Coton de Tuléar",
        "634",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cockapoo Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hungarian Greyhound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Khao Manee Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Estonian Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Burmese Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Saarloos Wolfdog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Czechoslovakian Wolfdog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus mogollonensis",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Shepherd Dog Mix Short-haired",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Clumber Spaniel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Valencian rat hunting dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Black Russian Terrier",
        "493",
        "41",
        "breed",
        "antech"
    ],
    [
        "Swedish Lapphund",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Doberman Pinscher Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "St Germain Pointing Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Maltipoo Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dandie Dinmont Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Spanish Water Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Entlebucher Mountain Dog",
        "528",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Stumpy Tail Cattle Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Shepherd Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hovawart",
        "933",
        "41",
        "breed",
        "antech"
    ],
    [
        "Lagotto romagnolo Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Spaniel dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-Haired Medium-Sized Portuguese Podengo",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rhodesian Ridgeback",
        "158",
        "41",
        "breed",
        "antech"
    ],
    [
        "Belgian Griffon",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kintamani-Bali",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis aureus moreotica",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Silky Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Bulldog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Pyrenean Sheepdog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus pallipes",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mexican Hairless Dog MediumSized",
        "533",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pont Audemer Spaniel",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Fawn Brittany Basset Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Field Spaniel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Short-haired Bobtail",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Golden Retriever Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Dutch Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norwegian Lundehund",
        "532",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pudelpointer",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pyrenean Shepherd",
        "497",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mixed breed",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "South African Blue Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Romanian Mioritic Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Colourpoint Shorthair Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis mesomelas schmidti",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bambino",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Caucasian Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bullmastiff",
        "76",
        "41",
        "breed",
        "antech"
    ],
    [
        "Greek Shepherd",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Polish Lowland Sheepdog",
        "151",
        "41",
        "breed",
        "antech"
    ],
    [
        "LaPerm Short-haired Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Welsh Springer Spaniel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Eurasian",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chantilly-Tiffany Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Portuguese Pointing Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Old English Terrier",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Short-haired Pointer Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Great Pyrenees Pyrenean Mountain Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Gordon Setter Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Ocicat Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Great Gascony Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Drever",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Ghadrejani Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pumi Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Irish Water Spaniel",
        "121",
        "41",
        "breed",
        "antech"
    ],
    [
        "Serengeti",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "English Foxhound",
        "103",
        "41",
        "breed",
        "antech"
    ],
    [
        "Welsh Corgi Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Maine Coon",
        "23",
        "42",
        "breed",
        "antech"
    ],
    [
        "Old English Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Persian Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Ojos Azules Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "European Shorthair Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Ukrainian Levkoy",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Yakutian Laika",
        "1312",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pixie-bob",
        "508",
        "42",
        "breed",
        "antech"
    ],
    [
        "Valencian rat hunting dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Welsh Sheepdog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Posavaz Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Curl",
        "3",
        "42",
        "breed",
        "antech"
    ],
    [
        "Bombay",
        "8",
        "42",
        "breed",
        "antech"
    ],
    [
        "Korn Ja",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "dingo (Canis lupus dingo)",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Spitz",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-haired Hungarian Vizsla Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Wire-haired",
        "5",
        "42",
        "breed",
        "antech"
    ],
    [
        "Great Dane",
        "112",
        "41",
        "breed",
        "antech"
    ],
    [
        "Afghan Shepherd Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Styrian Coarse-haired Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mastiff Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus occidentalis",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Kelpie Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Drentse Partridge Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Teddy Roosevelt Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus nubilus",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cesky Terrier",
        "526",
        "41",
        "breed",
        "antech"
    ],
    [
        "Plummer Terrier",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "European Continental Landseer Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Shepherd",
        "631",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Dutch Shepherd Dog",
        "630",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus manningi",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Carpathian Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Felis catus Crossbred Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Maremma and Abruzzes Sheepdog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Medium-Sized Mexican Hairless Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "White Shepherd Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Weimaraner Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis adustus notatus",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Serbian Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Savannah",
        "1308",
        "42",
        "breed",
        "antech"
    ],
    [
        "Siberian Husky",
        "170",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Spitz Gross",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Ibizan Hound",
        "118",
        "41",
        "breed",
        "antech"
    ],
    [
        "Galician Shepherd Dog",
        "106",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hellenic Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Majorcan Shepherd Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Turkish Angora Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Russian Blue Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Jack Russell Terrier",
        "124",
        "41",
        "breed",
        "antech"
    ],
    [
        "Italian Hound Mix Short-haired",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "European Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Maremma and Abruzzes Sheepdog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Polish Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Irish Red Setter",
        "119",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Spaniel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Traditional Siamese Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "English Mastiff Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Toy Fox Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Garafian Shepherd",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Gascon Saintongeois",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Thai Bangkaew Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-Haired Miniature Portuguese Podengo Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Tabby Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Afghan Shepherd",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tyrolean Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Donskoy Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Short-haired Saint Bernard Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Drentse Partridge Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Barak Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired American Curl Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Poitevin Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Picardy Spaniel",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Lhasa Apso",
        "132",
        "41",
        "breed",
        "antech"
    ],
    [
        "Snowshoe",
        "512",
        "42",
        "breed",
        "antech"
    ],
    [
        "Irish Wolfhound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Estonian Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Old Danish Pointing Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long haired Majorcan Shepherd Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus lupus",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Oriental Short-haired Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Rough-coated Collie Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "domestic dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pyrenean Mastiff",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Crossbred",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Bernese Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Broholmer",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Atlas Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schipperke Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Portuguese Podengo",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Fox Terrier",
        "100",
        "41",
        "breed",
        "antech"
    ],
    [
        "Other Canidae",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Mist Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "West Siberian Laïka Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Spotted Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Colourpoint Short-haired",
        "12",
        "42",
        "breed",
        "antech"
    ],
    [
        "Thai Ridgeback dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dalmatian Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Pointing Dog Pyrenean",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "King Charles Spaniel",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chinese Crested Powderpuff",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Karelian Bear Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Short-haired Purebred cat",
        "4",
        "42",
        "breed",
        "antech"
    ],
    [
        "German Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Wire-haired Korthals Pointing Griffon Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Saluki",
        "161",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sporting Lucas Terrier",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Shih Tzu",
        "169",
        "41",
        "breed",
        "antech"
    ],
    [
        "Anatolian Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "<unknown>",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Short-haired Weimaraner Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Patterdale Terrier",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Mastiff",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bolognese Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Large Peruvian Hairless Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Korea Jindo Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norfolk Terrier",
        "141",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tatra Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Poodle Mix Medium",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Modern Siamese Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Standard Dachshund",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Italian Spinone",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Burgos Pointing Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sokoke Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis aureus aureus",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Laekenois Belgian Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Arabian Mau Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Retriever Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Segugio Maremmano",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mexican Hairless Dog Mix Miniature",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Havanese",
        "117",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chilean Terrier",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupaster lupaster",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Asian Semi-Long-haired Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis latrans ochropus",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bouvier des Ardennes",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Hound Mix White and Black",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Black Norwegian Elkhound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis adustus kaffensis",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Portuguese Sheepdog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "White Shepherd",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pyrenean Sheepdog",
        "497",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Bobtail",
        "2",
        "42",
        "breed",
        "antech"
    ],
    [
        "Cheasapeake Bay Retriever Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Hound White and Orange",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Saint Bernard Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Basset Griffon Vendeen",
        "148",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sarabi dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Eastern wolf",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Phalène Continental Toy Spaniel",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Black",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "French Bulldog",
        "104",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norrbottenspitz",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bernese Mountain Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Havana Brown Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Greyhound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pyrenean Sheepdog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-Haired Medium-Sized Portuguese Podengo Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Estrela Mountain Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Majorcan Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "British Blue Cat",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Hungarian Greyhound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Coton de Tuléar Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans frustror",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Transylvanian Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Boykin Spaniel",
        "517",
        "41",
        "breed",
        "antech"
    ],
    [
        "East Siberian Laïka",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Great Gascony Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Styrian Coarsehaired Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schnauzer Giant",
        "176",
        "41",
        "breed",
        "antech"
    ],
    [
        "Small Münsterländer Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hanoverian Scenthound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cyprus",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Shiloh Shepherd",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Gray Wolf",
        "1304",
        "41",
        "breed",
        "antech"
    ],
    [
        "Georgian Shepherd Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Greater Swiss Mountain Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tornjak Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Plott Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis adustus grayi",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Glen of Imaal Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Petit Basset Griffon Vendeen",
        "148",
        "41",
        "breed",
        "antech"
    ],
    [
        "Boxer",
        "70",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Silky Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Yorkshire Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Blue Picardy Spaniel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kumaon Mastiff Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Nebelung Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Swedish White Elkhound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Asian Short-haired  Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Newfoundland dog",
        "140",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schnoodle",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bedlington Terrier",
        "57",
        "41",
        "breed",
        "antech"
    ],
    [
        "Löwchen Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "British Longhair",
        "1314",
        "42",
        "breed",
        "antech"
    ],
    [
        "Norrbottenspitz Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Prague Ratter Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bouvier des Ardennes Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Fox Terrier",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Catahoula Leopard Dog",
        "459",
        "41",
        "breed",
        "antech"
    ],
    [
        "Blue Picardy Spaniel",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Welsh Corgi Cardigan",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Appenzell Cattle Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Swiss Hound Lucerne Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Plummer Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Yorkipoo Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus irremotus",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Saint Bernard Dog",
        "160",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Bobtail Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Great AngloFrench White and Black Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Terrier",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Short-haired Kurilean Bobtail",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Birman Cat",
        "7",
        "42",
        "breed",
        "antech"
    ],
    [
        "Ariege Pointing Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Siamese",
        "33",
        "42",
        "breed",
        "antech"
    ],
    [
        "Norwegian Forest Cat",
        "25",
        "42",
        "breed",
        "antech"
    ],
    [
        "Miniature Bull Terrier",
        "137",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bluetick Coonhound",
        "515",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pug Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Korat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Peekapoo",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Portuguese Water Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Patterdale Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dogue De Bordeaux",
        "494",
        "41",
        "breed",
        "antech"
    ],
    [
        "Selkirk Rex Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis aureus indicus",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Burmilla Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Japanese Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Korean Bobtail Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Scottish Fold Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Jura Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Asian Cat Long-haired Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Standard Dachshund Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bullmastiff Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Serengeti Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Pyrenean Mastiff Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "LaPerm",
        "22",
        "42",
        "breed",
        "antech"
    ],
    [
        "Great Dane Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Catahoula Leopard Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Lagotto romagnolo",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire Fox Terrier",
        "101",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Shepherd Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian White",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "California Spangled",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Miniature Pinscher",
        "138",
        "41",
        "breed",
        "antech"
    ],
    [
        "Ragamuffin Cat",
        "509",
        "42",
        "breed",
        "antech"
    ],
    [
        "Labradoodle",
        "542",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bearded Collie",
        "56",
        "41",
        "breed",
        "antech"
    ],
    [
        "Short-haired Dutch Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Polish Tatra Sheepdog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bucovina Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Border Collie Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bernese Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chilean Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans impavidus",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pembroke Welsh Corgi Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Blue",
        "29",
        "42",
        "breed",
        "antech"
    ],
    [
        "Cornish Rex",
        "13",
        "42",
        "breed",
        "antech"
    ],
    [
        "Nebelung",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Large Portuguese Podengo",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Braque Du Bourbannais",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Boston Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis aureus syriacus",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Westphalian Dachsbracke",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "King Charles Spaniel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Modern Persian",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Field Spaniel",
        "97",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mexican Hairless Dog Standard",
        "533",
        "41",
        "breed",
        "antech"
    ],
    [
        "Småland Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Berger Picard Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Swiss Hound Schwyz Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Airedale Terrier",
        "43",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chihuahua Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Long-haired Pointer",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Spitz Mix Mittel",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Hairless Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "St Germain Pointing Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Komondor Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Spanish Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pekingese Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Oriental Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canaan Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Continental Toy Spaniel Papillon",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Slovakian Rough-haired Pointer",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Flat Coated Retriever Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bavarian Mountain Scenthound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Akita Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Manchester Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Poodle Mix Miniature",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Griffon Nivernais",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Swiss Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-coated Collie",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Karelian Bear Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Springer Spaniel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Nederlandse Kooikerhondje Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chartreuse Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Mittel German Spitz",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "American German Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Munsterlander",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Yorkshire Terrier",
        "190",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mudi Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Italian Greyhound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bedlington Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Briquet Griffon Vendeen Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Medium Griffon Vendeen",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Toy Fox Terrier",
        "180",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian-European Laïka",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schnauzer Miniature",
        "139",
        "41",
        "breed",
        "antech"
    ],
    [
        "West Siberian Laïka",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Golden Retriever",
        "110",
        "41",
        "breed",
        "antech"
    ],
    [
        "Basset Hound",
        "54",
        "41",
        "breed",
        "antech"
    ],
    [
        "Short-haired Hungarian Vizsla",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Spanish Greyhound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "European German Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans peninsulae",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hygen Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Hound Mix White and Orange",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tenterfield Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schapendoes",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Poodle Mix Standard",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pumi",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Greek Shepherd Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Highlander Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Peterbald Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "White Swiss Shepherd Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canadian Eskimo Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Pointing Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Hunting Terrier",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cardigan Welsh Corgi Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Kurilean Bobtail",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Bouvier des Flandres",
        "69",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bengal Cat",
        "413",
        "42",
        "breed",
        "antech"
    ],
    [
        "Serbian Tricolour Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sloughi Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Asian Cat Long-haired",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Alpine Dachsbracke Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dogo Argentino Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tyrolean Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans dickeyi",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Lykoi",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Jungle Curl Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Poodle Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mastiff",
        "136",
        "41",
        "breed",
        "antech"
    ],
    [
        "Auvergne Pointing Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Bulldog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Polish Lowland Sheepdog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canarian Warren Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Portuguese Water Dog",
        "155",
        "41",
        "breed",
        "antech"
    ],
    [
        "Entlebuch Mountain Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Medium Griffon Vendeen Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Miniature Fox Terrier",
        "180",
        "41",
        "breed",
        "antech"
    ],
    [
        "Peekapoo Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Lilac-point Siamese",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Estrela Mountain Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Black and Tan English Toy Terrier",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rough-haired Ibizan Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kai",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Brittany Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "White Swiss Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Small Brabant Griffon",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Fila Brasileiro",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Romanian Carpathian Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Basset Griffon Vendeen Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Nova Scotia Duck Tolling Retriever",
        "490",
        "41",
        "breed",
        "antech"
    ],
    [
        "Spanish Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hanoverian Scenthound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Beagle",
        "55",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schnoodle Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Chihuahua Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus crassodon",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schiller Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Foxhound",
        "102",
        "41",
        "breed",
        "antech"
    ],
    [
        "Teddy Roosevelt Terrier",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Fawn Brittany Griffon",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Japanese Akita Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Spanish Mastiff",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Great AngloFrench White and Black Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Eskimo Dog",
        "46",
        "41",
        "breed",
        "antech"
    ],
    [
        "Japanese Terrier",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Blue Gascony Basset Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bourbonnais Pointing Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Skye Terrier",
        "172",
        "41",
        "breed",
        "antech"
    ],
    [
        "Ragamuffin Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Norwegian Buhund",
        "531",
        "41",
        "breed",
        "antech"
    ],
    [
        "DanishSwedish Farmdog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sealyham Terrier",
        "166",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Spitz Mix Gross",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Other dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Montenegrin Mountain Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norwegian Elkhound black",
        "142",
        "41",
        "breed",
        "antech"
    ],
    [
        "Poitevin",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Siberian Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Romanian Bucovina Shepherd Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rhodesian Ridgeback Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Pyrenean Sheepdog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Napoleon",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Kerry Blue Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "British Cat",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Dunker Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Austrian Pinscher",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hovawart Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Finnish Spitz",
        "98",
        "41",
        "breed",
        "antech"
    ],
    [
        "Soft-Coated Wheaten Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Broholmer Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Foldex Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Pinscher dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus floridanus",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Slovakian Wire-haired Pointer Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Cat Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Short-haired Kurilean Bobtail Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Dachshund",
        "89",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pharaoh Hound",
        "149",
        "41",
        "breed",
        "antech"
    ],
    [
        "Shar Pei",
        "83",
        "41",
        "breed",
        "antech"
    ],
    [
        "Welsh Corgi",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Otterhound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus monstrabilis",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Ariege Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bull Terrier Standard",
        "74",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schnauzer Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Springer Spaniel",
        "95",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Staffordshire Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Austrian Black and Tan Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Black and Tan English Toy Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cirneco dell'Etna",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bolognese",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus hudsonicus",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bohemian Rex Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "French Hound Mix Tricolour",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Drever Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Oriental Long-haired",
        "27",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis latrans jamesi",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis aureus cruesemanni",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Brittany",
        "72",
        "41",
        "breed",
        "antech"
    ],
    [
        "Portuguese Sheepdog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus filchneri",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Russian Toy",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Slovakian Wirehaired Pointer",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Toyger",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Brazilian Shorthair",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Munchkin",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Polish Greyhound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Himalayan",
        "456",
        "42",
        "breed",
        "antech"
    ],
    [
        "Devon Rex Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis simensis simensis",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hellenic Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "MediumSized AngloFrench Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norfolk Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Korn Ja Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Bernadoodle",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Italian Greyhound",
        "123",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-haired Standard Dachshund",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Japanese Chin Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Brussels Griffon",
        "73",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus chanco",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Short-haired Hungarian Vizsla Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pudelpointer Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "South Russian Shepherd Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Eurasian Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Landseer European Continental type",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Chihuahua Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "West Highland White Terrier",
        "187",
        "41",
        "breed",
        "antech"
    ],
    [
        "Peruvian Hairless Dog Mix mediumsized",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Oregon Rex Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Swedish Vallhund",
        "498",
        "41",
        "breed",
        "antech"
    ],
    [
        "Border Collie",
        "65",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans thamnos",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans lestes",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Lakeland Terrier",
        "131",
        "41",
        "breed",
        "antech"
    ],
    [
        "Goldendoodle Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Standardized Siamese",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Egyptian Mau",
        "15",
        "42",
        "breed",
        "antech"
    ],
    [
        "Long-haired Miniature Dachshund Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Basque Shepherd Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Colourpoint Long-haired",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "German Pinscher Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Castro Laboreiro Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Toy Spaniel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Greenland Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Caucasian Shepherd Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Khao Manee",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Schnauzer Mix Giant",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Airedale Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Soft-Coated Wheaten Terrier",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Akbash",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Coonhound",
        "524",
        "41",
        "breed",
        "antech"
    ],
    [
        "Anglo-Français de Moyen Vénerie Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Coonhound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Black Mouth Cur",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Anglo-Français de Petite Vénerie",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Pit Bull Terrier",
        "449",
        "41",
        "breed",
        "antech"
    ],
    [
        "Alaskan Klee Kai",
        "1306",
        "41",
        "breed",
        "antech"
    ],
    [
        "Feist Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Leopard Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Istrian Coarse-haired Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Tsvetnaya Bolonka",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Istrian Shorthaired Hound",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Istrian Shorthaired Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Redbone Coonhound",
        "514",
        "41",
        "breed",
        "antech"
    ],
    [
        "Black Mouth Cur Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Shepherd Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Treeing Cur Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hound Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Lapponian Herder",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Carolina Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hound Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Treeing Walker Coonhound",
        "518",
        "41",
        "breed",
        "antech"
    ],
    [
        "Istrian Coarse-haired Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Coonhound",
        "63",
        "41",
        "breed",
        "antech"
    ],
    [
        "Biewer Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chinook Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Treeing Cur",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Biewer Terrier",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Feist",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Lapponian Herder Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Anglo-Français de Petite Vénerie Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Treeing Tennessee Brindle",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Alaskan Klee Kai Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Redbone Coonhound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chinook",
        "527",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Medium-haired Purebred cat",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Carolina Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Coonhound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Shepherd",
        "1297",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Leopard Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Pit Bull Terrier Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Tsvetnaya Bolonka Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Treeing Tennessee Brindle Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Anglo-Français de Moyen Vénerie",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Treeing Walker Coonhound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Domestic Short-haired (USA)",
        "343",
        "42",
        "breed",
        "antech"
    ],
    [
        "Domestic Medium-haired (USA)",
        "523",
        "42",
        "breed",
        "antech"
    ],
    [
        "Domestic Long-haired (USA)",
        "344",
        "42",
        "breed",
        "antech"
    ],
    [
        "Mountain Cur",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Belgian Shepherd Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Exotic",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Exotic Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "European Burmese",
        "16",
        "42",
        "breed",
        "antech"
    ],
    [
        "European Burmese Mix",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Boerboel",
        "633",
        "41",
        "breed",
        "antech"
    ],
    [
        "Boerboel Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Peruvian Inca Orchid",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Peruvian Inca Orchid Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Deutsch Stichelhaar",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Deutsch Stichelhaar Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Treeing Feist",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Treeing Feist Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Indian Dog",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Indian Dog Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Akbash Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mountain Cur Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Posavaz Hound Mix",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Affenpinscher",
        "AFFENPINSCHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Affenpinscher Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Afghan Hound",
        "AFGHAN_HOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Afghan Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Afghan Shepherd",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Afghan Shepherd Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Airedale Terrier",
        "AIREDALE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Airedale Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Akbash",
        "AKBASH",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Akbash Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Alaskan Klee Kai",
        "ALASKAN_KLEE_KAI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Alaskan Klee Kai Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Alaskan Malamute",
        "ALASKAN_MALAMUTE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Alaskan Malamute Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Alpine Dachsbracke",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Alpine Dachsbracke Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Akita",
        "AKITA",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Akita Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Bulldog",
        "BULLDOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Bulldog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Cocker Spaniel",
        "COCKER_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Cocker Spaniel Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Eskimo Dog",
        "AMERICAN_ESKIMO",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Eskimo Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Foxhound",
        "AMERICAN_FOXHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Foxhound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American German Shepherd Dog",
        "GERMAN_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American German Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Hairless Terrier",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Hairless Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Indian Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Indian Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Leopard Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Leopard Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Pit Bull Terrier",
        "AMERICAN_PIT_BULL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Pit Bull Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Staffordshire Terrier",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Staffordshire Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Water Spaniel",
        "AMERICAN_WATER_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Water Spaniel Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Anatolian Shepherd Dog",
        "ANATOLIAN_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Anatolian Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Anglo-FranÃ§ais de Moyen VÃ©nerie",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Anglo-FranÃ§ais de Moyen VÃ©nerie Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Anglo-FranÃ§ais de Petite VÃ©nerie",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Anglo-FranÃ§ais de Petite VÃ©nerie Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Appenzell Cattle Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Appenzell Cattle Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ariege Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ariege Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ariege Pointing Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ariege Pointing Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Artesian-Norman Basset",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Artesian-Norman Basset Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Artois Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Artois Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Atlas Shepherd Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Atlas Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Cattle Dog",
        "AUSTRALIAN_CATTLE_DOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Cattle Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Kelpie",
        "AUSTRALIAN_KELPIE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Kelpie Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Shepherd",
        "AUSTRALIAN_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Shepherd Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Silky Terrier",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Silky Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Stumpy Tail Cattle Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Stumpy Tail Cattle Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Terrier",
        "AUSTRALIAN_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian working kelpie",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian working kelpie Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Austrian Black and Tan Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Austrian Black and Tan Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Austrian Pinscher",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Austrian Pinscher Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Auvergne Pointing Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Auvergne Pointing Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Azawakh",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Azawakh Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bosnian Coarse-Haired Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Barbet",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Barbet Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Basenji",
        "BASENJI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Basenji Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Basque Shepherd Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Basque Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Basset Griffon Vendeen",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Basset Griffon Vendeen Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Basset Hound",
        "BASSET_HOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Basset Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bavarian Mountain Scenthound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bavarian Mountain Scenthound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Beagle",
        "BEAGLE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Beagle Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Beagle-Harrier",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Beagle-Harrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bearded Collie",
        "BEARDED_COLLIE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bearded Collie Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Beauceron",
        "BEAUCERON",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Beauceron Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bedlington Terrier",
        "BEDLINGTON_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bedlington Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Griffon",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Griffon Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Shepherd Dog",
        "BELGIAN_SHEEPDOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Shepherd Dog Groenendael",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Shepherd Dog Malinois",
        "BELGIAN_MALINOIS",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Shepherd Dog Mix Tervuren",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Shepherd Dog Tervuren",
        "BELGIAN_TERVUREN",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bergamasco Shepherd Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bergamasco Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Berger Picard",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Berger Picard Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bernadoodle",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bernadoodle Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bernese Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bernese Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bernese Mountain Dog",
        "BERNESE_MOUNTAIN_DOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bernese Mountain Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bichon Frise",
        "BICHON_FRISE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bichon Frise Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Biewer Terrier",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Biewer Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Billy",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Billy Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Black and Tan Coonhound",
        "COONHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Black and Tan Coonhound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Black and Tan English Toy Terrier",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Black and Tan English Toy Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Black Mouth Cur",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Black Mouth Cur Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Elkhound Mix black",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Black Russian Terrier",
        "BLACK_RUSSIAN_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Black Russian Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bloodhound",
        "BLOODHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bloodhound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Blue Gascony Basset",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Blue Gascony Basset Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Blue Gascony Griffon",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Blue Gascony Griffon Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Blue Picardy Spaniel",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Blue Picardy Spaniel Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bluetick Coonhound",
        "BLUETICK_COONHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bluetick Coonhound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Boerboel",
        "BOERBOEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Boerboel Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bohemian Shepherd",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bohemian Shepherd Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bohemian Wire-haired Pointing Griffon",
        "WIREHAIRED_POINTING_GRIFFON",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bohemian Wire-haired Pointing Griffon Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bolognese",
        "BOLOGNESE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bolognese Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Border Collie",
        "BORDER_COLLIE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Border Collie Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Border Terrier",
        "BORDER_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Border Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Borzoi",
        "BORZOI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Borzoi Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bosnian Coarse-Haired Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Boston Terrier",
        "BOSTON_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Boston Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bourbonnais Pointing Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bouvier des Ardennes",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bouvier des Ardennes Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bouvier des Flandres",
        "BOUVIER_DES_FLANDRES",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bouvier des Flandres Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Boxer",
        "BOXER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Boxer Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Boykin Spaniel",
        "BOYKIN_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Boykin Spaniel Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bracco Italiano",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bracco Italiano Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bourbonnais Pointing Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Brazilian Terrier",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Brazilian Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Briard",
        "BRIARD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Briard Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Briquet Griffon Vendeen",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Briquet Griffon Vendeen Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Brittany",
        "BRITTANY_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Brittany Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Broholmer",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Broholmer Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Brussels Griffon",
        "BRUSSELS_GRIFFON",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Brussels Griffon Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bucovina Shepherd Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bucovina Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bull Terrier Mix Standard",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bull Terrier Standard",
        "BULL_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bullmastiff",
        "BULLMASTIFF",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bullmastiff Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Burgos Pointing Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Burgos Pointing Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cairn Terrier",
        "CAIRN_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cairn Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Canaan Dog",
        "CANAAN_DOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Canaan Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Canadian Eskimo Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Canadian Eskimo Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Canarian Warren Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Canarian Warren Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cane corso",
        "CANE_CORSO",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cane corso Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cantabrian Water Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cantabrian Water Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cao Fila de Sao Miguel",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cao Fila de Sao Miguel Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Corgi Mix Cardigan",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Carolina Dog",
        "CAROLINA_DOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Carolina Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Carpathian Shepherd Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Carpathian Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Castro Laboreiro Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Castro Laboreiro Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Maltese Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Catahoula Leopard Dog",
        "CATAHOULA_LEOPARD_DOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Catalan Sheepdog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Catalan Sheepdog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Caucasian Shepherd Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Caucasian Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cavalier King Charles Spaniel",
        "CAVALIER_KING_CHARLES_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cavalier King Charles Spaniel Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Central Asia Shepherd Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Central Asia Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cesky Terrier",
        "CESKY_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cesky Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cheasapeake Bay Retriever",
        "CHESAPEAKE_BAY_RETRIEVER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cheasapeake Bay Retriever Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chihuahua",
        "CHIHUAHUA",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chihuahua Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chilean Terrier",
        "CHIHUAHUA",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chilean Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chinese Crested",
        "CHINESE_CRESTED",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chinese Crested Hairless",
        "CHINESE_CRESTED",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chinese Crested Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chinese Crested Powderpuff",
        "CHINESE_CRESTED",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chinook",
        "CHINOOK",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chinook Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chow Chow",
        "CHOW_CHOW",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chow Chow Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cirneco dell'Etna",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cirneco dell'Etna Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Clumber Spaniel",
        "CLUMBER_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Clumber Spaniel Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cockapoo",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cockapoo Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Continental Toy Spaniel Mix Papillon",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Continental Toy Spaniel Papillon",
        "PAPILLON",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Coonhound",
        "COONHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Coonhound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Coton de TulÃ©ar",
        "COTON_DE_TULEAR",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Coton de TulÃ©ar Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Croatian Sheepdog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Croatian Sheepdog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Crossbred",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Crossbred Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Curly Coated Retriever",
        "CURLY_COATED_RETRIEVER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Curly Coated Retriever Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Czechoslovakian Wolfdog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Czechoslovakian Wolfdog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Long-haired Miniature",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dalmatian",
        "DALMATION",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dalmatian Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dandie Dinmont Terrier",
        "DANDIE_DINMONT_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dandie Dinmont Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Danish-Swedish Farmdog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Danish-Swedish Farmdog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Deutsch Stichelhaar",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Deutsch Stichelhaar Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Doberman Pinscher",
        "DOBERMAN_PINSCHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Doberman Pinscher Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dogo Argentino",
        "ARGENTINO_DOGO",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dogo Argentino Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dogo Canario",
        "PERRO_DE_PRESA_CANARIO",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dogo Canario Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dogue De Bordeaux",
        "DOGUE_DE_BORDEAUX",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dogue De Bordeaux Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Canis lupus familiaris",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Drentse Partridge Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Drentse Partridge Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Drever",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Drever Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dunker Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dunker Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dutch Shepherd Dog",
        "DUTCH_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dutch Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "East European Shepherd",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "East European Shepherd Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "East Siberian LaÃ¯ka",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "East Siberian LaÃ¯ka Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Elo Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Elo Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Bulldog",
        "BULLDOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Bulldog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Cocker Spaniel",
        "ENGLISH_COCKER_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Cocker Spaniel Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Coonhound",
        "REDTICK_COONHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Coonhound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Foxhound",
        "ENGLISH_FOXHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Foxhound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Mastiff",
        "MASTIFF",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Mastiff Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Pointer",
        "POINTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Pointer Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Setter",
        "ENGLISH_SETTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Setter Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Shepherd",
        "ENGLISH_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Shepherd Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Springer Spaniel",
        "ENGLISH_SPRINGER_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Springer Spaniel Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Toy Spaniel",
        "ENGLISH_TOY_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Toy Spaniel Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Toy Terrier",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Toy Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Entlebuch Mountain Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Entlebuch Mountain Dog",
        "ENTLEBUCHER_MOUNTAIN_DOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Estonian Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Estonian Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Estrela Mountain Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Estrela Mountain Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Eurasian",
        "EURASIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Eurasian Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Landseer Mix European Continental type",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "European German Shepherd Dog",
        "GERMAN_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "European German Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fawn Brittany Basset",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fawn Brittany Basset Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fawn Brittany Griffon",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fawn Brittany Griffon Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Feist",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Feist Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Field Spaniel",
        "FIELD_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Field Spaniel Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fila Brasileiro",
        "FILA_BRASILEIRO",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fila Brasileiro Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Finnish Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Finnish Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Finnish Lapphund",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Finnish Lapphund Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Finnish Spitz",
        "FINNISH_SPITZ",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Finnish Spitz Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Flat Coated Retriever",
        "FLAT_COATED_RETRIEVER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Flat Coated Retriever Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fox Terrier",
        "FOX_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fox Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Bulldog",
        "FRENCH_BULLDOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Bulldog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Hound Mix Tricolour",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Hound Mix White and Black",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Hound Mix White and Orange",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Hound Tricolour",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Hound White and Black",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Hound White and Orange",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Pointing Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Pointing Dog Gascogne",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Pointing Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Pointing Dog Pyrenean",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Spaniel",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Spaniel Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Wire-haired Korthals Pointing Griffon",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Wire-haired Korthals Pointing Griffon Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Galician Shepherd Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Galician Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Garafian Shepherd",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Garafian Shepherd Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Pointing Dog Mix Gascogne",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Gascon Saintongeois",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Gascon Saintongeois Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Georgian Shepherd",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Georgian Shepherd Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Hunting Terrier",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Hunting Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Long-haired Pointer",
        "POINTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Long-haired Pointer Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Pinscher",
        "GERMAN_PINSCHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Pinscher Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Shepherd Dog",
        "GERMAN_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Shepherd Dog Mix Short-haired",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Short-haired Pointer",
        "GERMAN_SHORTHAIRED_POINTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Short-haired Pointer Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spaniel",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spaniel Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spitz",
        "GERMAN_SPITZ",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spitz Gross",
        "GERMAN_SPITZ",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spitz Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spitz Mix Pomeranian",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spitz Mix Gross",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spitz Mix Miniature",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spitz Mix Mittel",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spitz Pomeranian",
        "POMERANIAN",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spitz Miniature",
        "GERMAN_SPITZ",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pointer German Wire-Haired",
        "GERMAN_WIREHAIRED_POINTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Wire-Haired Pointer Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ghadrejani Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ghadrejani Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Glen of Imaal Terrier",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Glen of Imaal Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Golden Retriever",
        "GOLDEN_RETRIEVER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Golden Retriever Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Goldendoodle",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Goldendoodle Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Gordon Setter",
        "GORDON_SETTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Gordon Setter Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Grand Basset Griffon Vendeen",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Grand Basset Griffon Vendeen Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Grand Griffon Vendeen",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Grand Griffon Vendeen Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Anglo-French Tricolour Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Anglo-French Tricolour Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Anglo-French White and Black Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Anglo-French White and Black Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Anglo-French White and Orange Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Anglo-French White and Orange Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Dane",
        "GREAT_DANE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Dane Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Gascony Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Gascony Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Pyrenees Pyrenean Mountain Dog",
        "GREAT_PYRENEES",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Pyrenees Pyrenean Mountain Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Swiss Mountain Dog",
        "SWISS_MOUNTAIN_DOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Swiss Mountain Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Greek Shepherd",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Greek Shepherd Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Greenland Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Greenland Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Elkhound Mix grey",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Greyhound",
        "GREYHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Greyhound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Griffon Nivernais",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Griffon Nivernais Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Shepherd Dog Mix Groenendael",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Gull Terrier",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Gull Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "HÃ¤lleforshund",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "HÃ¤lleforshund Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chinese Crested Mix Hairless",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Halden Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Halden Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hamilton Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hamilton Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hanoverian Scenthound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hanoverian Scenthound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Harrier",
        "HARRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Harrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Havanese",
        "HAVANESE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Havanese Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hellenic Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hellenic Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Himalayan Sheepdog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Himalayan Sheepdog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hokkaido",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hokkaido Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hollandse Smoushond",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hollandse Smoushond Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hound Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hound Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hovawart",
        "HOVAWART",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hovawart Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hungarian Greyhound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hungarian Greyhound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hygen Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hygen Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ibizan Hound",
        "HOUND_IBIZAN",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ibizan Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ibizan Hound rough-haired",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ibizan Hound smooth-haired",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Icelandic Sheepdog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Icelandic Sheepdog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Indian Spitz",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Indian Spitz Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Glen of Imaal Terrier",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Glen of Imaal Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Red and White Setter",
        "IRISH_SETTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Red and White Setter Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Red Setter",
        "IRISH_SETTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Red Setter Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Softcoated Wheaten Terrier",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Softcoated Wheaten Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Terrier",
        "IRISH_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Water Spaniel",
        "IRISH_WATER_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Water Spaniel Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Wolfhound",
        "IRISH_WOLFHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Wolfhound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Istrian Coarse-haired Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Istrian Coarse-haired Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Istrian Shorthaired Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Istrian Shorthaired Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Italian Greyhound",
        "ITALIAN_GREYHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Italian Greyhound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Italian Hound Coarse-haired",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Italian Hound Mix Coarse-haired",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Italian Hound Mix Short-haired",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Italian Hound Short-haired",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Italian Spinone",
        "SPINONE_ITALIANO",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Italian Spinone Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Jack Russell Terrier",
        "JACK_RUSSEL_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Jack Russell Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Jagdterrier dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Jagdterrier dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Japanese Akita",
        "AKITA",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Japanese Akita Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Japanese Chin",
        "JAPANESE_CHIN",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Japanese Chin Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Japanese Spitz",
        "JAPANESE_SPITZ",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Japanese Spitz Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Japanese Terrier",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Japanese Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Jura Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Jura Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kai",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kai Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kangal Shepherd Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kangal Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Karelian Bear Dog",
        "KARELIAN_BEAR_DOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Karelian Bear Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Karst Shepherd Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Karst Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Keeshond",
        "KEESHOND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Keeshond Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kerry Blue Terrier",
        "KERRY_BLUE_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kerry Blue Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "King Charles Spaniel",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "King Charles Spaniel Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "King Shepherd",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "King Shepherd Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kintamani-Bali Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kintamani-Bali Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kishu Ken",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kishu Ken Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Komondor",
        "KOMONDOR",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Komondor Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Korea Jindo Dog",
        "KOREA_JINDO_DOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Korea Jindo Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "KromfohrlÃ¤nder",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "KromfohrlÃ¤nder Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kumaon Mastiff",
        "MASTIFF",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kumaon Mastiff Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kuvasz",
        "KUVASZ",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kuvasz Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "LÃ¶wchen",
        "LOWCHEN",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "LÃ¶wchen Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Labradoodle",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Labradoodle Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Labrador Retriever",
        "LABRADOR_RETRIEVER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Labrador Retriever Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Shepherd Dog Laekenois",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Shepherd Dog Mix Laekenois",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Lagotto romagnolo",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Lagotto romagnolo Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Lakeland Terrier",
        "LAKELAND_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Lakeland Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Lancashire Heeler",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Lancashire Heeler Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Landseer European Continental type",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Lapponian Herder",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Lapponian Herder Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Large MÃ¼nsterlander",
        "MUNSTERLANDER_POINTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Large MÃ¼nsterlander Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Peruvian Hairless Dog Mix Large",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Leonberger",
        "LEONBERGER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Leonberger Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Lhasa Apso",
        "LHASA_APSO",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Lhasa Apso Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Majorcan Shepherd Dog long haired",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Majorcan Shepherd Dog Mix long haired",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chihuahua Long-haired",
        "CHIHUAHUA",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chihuahua Mix Long-haired",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dutch Shepherd Dog Long-haired",
        "DUTCH_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dutch Shepherd Dog Mix Long-haired",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Shepherd Dog Long-haired",
        "GERMAN_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Shepherd Dog Mix Long-haired",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Long-haired Miniature",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pyrenean Sheepdog Long-haired",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pyrenean Sheepdog Mix Long-haired",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Long-haired Rabbit Hunting",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Long-haired Rabbit Hunting",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Toy Long-haired",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Toy Mix Long-haired",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saint Bernard Dog Long-haired",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saint Bernard Dog Mix Long-haired",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Long-haired Standard",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Long-haired Standard",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Weimaraner Long-haired",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Weimaraner Mix Long-haired",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Majorca Mastiff",
        "MASTIFF",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Majorca Mastiff Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Majorcan Shepherd Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Majorcan Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Shepherd Dog Mix Malinois",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Maltese",
        "MALTESE_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Maltese Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Maltipoo",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Maltipoo Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Manchester Terrier",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Manchester Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Maremma and Abruzzes Sheepdog",
        "MAREMMA_SHEEPDOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Maremma and Abruzzes Sheepdog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mastiff Dog",
        "MASTIFF",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mastiff Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Medium Griffon Vendeen",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Medium Griffon Vendeen Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Medium-Sized Anglo-French Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Medium-Sized Anglo-French Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mexican Hairless Dog Mix Medium-Sized",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mexican Hairless Dog",
        "MEXICAN_HAIRLESS",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mexican Hairless Dog Medium-Sized",
        "MEXICAN_HAIRLESS",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mexican Hairless Dog Miniature",
        "MEXICAN_HAIRLESS",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mexican Hairless Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mexican Hairless Dog Mix Miniature",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mexican Hairless Dog Standard",
        "MEXICAN_HAIRLESS",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Miniature American Shepherd",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Miniature American Shepherd Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Miniature Bull Terrier",
        "BULL_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Miniature Bull Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Miniature",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Miniature",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Miniature Fox Terrier",
        "FOX_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Miniature Fox Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Miniature Pinscher",
        "PINSCHER_MINIATURE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Miniature Pinscher Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Miniature",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shar Pei Miniature",
        "SHAR_PEI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shar Pei Mix Miniature",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spitz Mittel",
        "GERMAN_SPITZ",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mixed Breed Dog",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Montenegrin Mountain Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Montenegrin Mountain Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mountain Cur",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mountain Cur Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mudi Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mudi Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Munsterlander",
        "MUNSTERLANDER_POINTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Munsterlander Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Neapolitan Mastiff",
        "NEAPOLITAN_MASTIFF",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Neapolitan Mastiff Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Nederlandse Kooikerhondje",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Nederlandse Kooikerhondje Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Newfoundland",
        "NEWFOUNDLAND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Newfoundland Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norfolk Terrier",
        "NORFOLK_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norfolk Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norrbottenspitz",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norrbottenspitz Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Buhund",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Buhund Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Elkhound",
        "NORWEGIAN_ELKHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Elkhound black",
        "NORWEGIAN_ELKHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Elkhound grey",
        "NORWEGIAN_ELKHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Elkhound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Lundehund",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Lundehund Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwich Terrier",
        "NORWICH_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwich Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Nova Scotia Duck Tolling Retriever",
        "NOVA_SCOTIA_DUCK_TOLLING_RETRIEVER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Nova Scotia Duck Tolling Retriever Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Old Danish Pointing Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Old Danish Pointing Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Old English Sheepdog",
        "OLD_ENGLISH_SHEEPDOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Old English Sheepdog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Old English Terrier",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Old English Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Old German Shepherd Dog",
        "GERMAN_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Old German Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Other dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Otterhound",
        "OTTERHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Otterhound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Parson Russell Terrier",
        "PARSON_RUSSELL_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Parson Russell Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Patterdale Terrier",
        "PATTERDALE_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Patterdale Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Peekapoo",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Peekapoo Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pekingese Dog",
        "PEKINGESE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pekingese Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Corgi Mix Pembroke",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Peruvian Hairless Dog Large",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Peruvian Hairless Dog medium-sized",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Peruvian Hairless Dog miniature",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Peruvian Hairless Dog Mix medium-sized",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Peruvian Hairless Dog Mix miniature",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Peruvian Inca Orchid",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Peruvian Inca Orchid Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Petit Basset Griffon Vendeen",
        "PETIT_BASSET_GRIFFON_VENDEEN",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Petit Basset Griffon Vendeen Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Continental Toy Spaniel PhalÃ¨ne",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Continental Toy Spaniel Mix PhalÃ¨ne",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pharaoh Hound",
        "HOUND_PHARAOH",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pharaoh Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Picardy Spaniel",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Picardy Spaniel Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pinscher dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pinscher dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Plott Dog",
        "PLOTT_HOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Plott Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Plummer Terrier",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Plummer Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poitevin Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poitevin Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Polish Greyhound",
        "CHART_POLSKI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Polish Greyhound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Polish Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Polish Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Polish Hunting Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Polish Hunting Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Polish Lowland Sheepdog",
        "POLISH_LOWLAND_SHEEPDOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Polish Lowland Sheepdog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Polish Tatra Sheepdog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Polish Tatra Sheepdog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pont-Audemer Spaniel",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pont-Audemer Spaniel Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poodle Dog",
        "POODLE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poodle Medium",
        "POODLE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poodle Miniature",
        "POODLE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poodle Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poodle Mix Medium",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poodle Mix Miniature",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poodle Mix Standard",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poodle Mix Toy",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poodle Toy",
        "POODLE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Porcelain",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Porcelain Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Pointing Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Pointing Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Sheepdog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Sheepdog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Water Dog",
        "PORTUGUESE_WATER_DOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Water Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Posavaz Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Posavaz Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chinese Crested Mix Powderpuff",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Prague Ratter",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Prague Ratter Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pudelpointer",
        "PUDELPOINTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pudelpointer Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pug Dog",
        "PUG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pug Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Puli Dog",
        "PULI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Puli Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pumi Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pumi Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Pointing Dog Mix Pyrenean",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pyrenean Mastiff",
        "MASTIFF",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pyrenean Mastiff Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pyrenean Sheepdog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pyrenean Sheepdog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pyrenean Shepherd",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pyrenean Shepherd Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Rabbit Hunting",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Rabbit Hunting",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Rafeiro of Alentejo",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Rafeiro of Alentejo Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Rat Terrier",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Rat Terrier Mix",
        "RAT_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Redbone Coonhound",
        "REDBONE_COONHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Redbone Coonhound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Retriever Dog",
        "RETRIEVER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Retriever Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Rhodesian Ridgeback",
        "RHODESIAN_RIDGEBACK",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Rhodesian Ridgeback Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Romanian Bucovina Shepherd Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Romanian Bucovina Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Romanian Carpathian Shepherd Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Romanian Carpathian Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Romanian Mioritic Shepherd Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Romanian Mioritic Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Rottweiler Dog",
        "ROTTWEILER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Rottweiler Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Collie Rough-coated",
        "COLLIE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Collie Mix Rough-coated",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dutch Shepherd Dog rough-haired",
        "DUTCH_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dutch Shepherd Dog Mix rough-haired",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ibizan Hound Mix rough-haired",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Black Terrier",
        "BLACK_RUSSIAN_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Black Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Spaniel",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Spaniel Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Spotted Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Spotted Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Tsvetnaya Bolonka",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Tsvetnaya Bolonka Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian-European LaÃ¯ka",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian-European LaÃ¯ka Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saarloos Wolfdog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saarloos Wolfdog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saint Bernard Dog",
        "SAINT_BERNARD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saint Bernard Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saint-Usuge Spaniel",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saint-Usuge Spaniel Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saluki Dog",
        "SALUKI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saluki Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Samoyed Dog",
        "SAMOYED",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Samoyed Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Sarabi dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Sarabi dog mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Save Valley Scenthound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Save Valley Scenthound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schapendoes",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schapendoes Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schiller Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schiller Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schipperke",
        "SCHIPPERKE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schipperke Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schnauzer Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schnauzer Giant",
        "SCHNAUZER_GIANT",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schnauzer Miniature",
        "SCHNAUZER_MINIATURE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schnauzer Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schnauzer Mix Giant",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schnauzer Mix Miniature",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schnoodle",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schnoodle Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swiss Hound Schwyz",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Scottish Deerhound",
        "SCOTTISH_DEERHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Scottish Deerhound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Scottish Terrier",
        "SCOTTISH_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Scottish Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Sealyham Terrier",
        "SEALYLHAM_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Sealyham Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Segugio Maremmano",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Segugio Maremmano Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Serbian Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Serbian Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Serbian Tricolour Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Serbian Tricolour Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Setter dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Setter dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shar Pei",
        "SHAR_PEI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shar Pei Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shepherd",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shepherd Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shetland Sheepdog",
        "SHETLAND_SHEEPDOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shetland Sheepdog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shiba Dog",
        "SHIBA_INU",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shiba Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shih Tzu",
        "SHIH_TZU",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shih Tzu Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shikoku Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shikoku Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shiloh Shepherd",
        "SHILOH_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shiloh Shepherd Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Majorcan Shepherd Dog Mix short haired",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dutch Shepherd Dog Short-haired",
        "DUTCH_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dutch Shepherd Dog Mix Short-haired",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Shepherd Dog Short-haired",
        "GERMAN_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hungarian Vizsla Short-haired",
        "VIZSLA",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hungarian Vizsla Mix Short-haired",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Majorcan Shepherd Dog short haired",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saint Bernard Dog Short-haired",
        "SAINT_BERNARD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saint Bernard Dog Mix Short-haired",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Weimaraner Short-haired",
        "WEIMARANER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Weimaraner Mix Short-haired",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Siberian Husky",
        "SIBERIAN_HUSKY",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Siberian Husky Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Silky Terrier",
        "SILKY_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Silky Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Skye Terrier",
        "SKYE_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Skye Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Sloughi Dog",
        "SLOUGHI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Sloughi Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Slovakian Chuvach",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Slovakian Chuvach Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Slovakian Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Slovakian Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Slovakian Rough-haired Pointer",
        "POINTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Slovakian Rough-haired Pointer Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Slovakian Wire-haired Pointer",
        "POINTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Slovakian Wire-haired Pointer Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "SmÃ¥land Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "SmÃ¥land Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Small Blue Gascony Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Small Blue Gascony Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Small Brabant Griffon",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Small Brabant Griffon Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Small MÃ¼nsterlÃ¤nder",
        "MUNSTERLANDER_POINTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Small MÃ¼nsterlÃ¤nder Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Mix Small",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Collie Smooth-coated",
        "COLLIE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Collie Mix Smooth-coated",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pyrenean Sheepdog Smooth-faced",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pyrenean Sheepdog Mix Smooth-faced",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chihuahua Smooth-haired",
        "CHIHUAHUA",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chihuahua Mix Smooth-haired",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fox Terrier smooth",
        "FOX_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fox Terrier Mix smooth",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ibizan Hound Mix smooth-haired",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Smooth-Haired Large",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Mix Smooth-Haired Large",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Smooth-Haired Medium-Sized",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Mix Smooth-Haired Medium-Sized",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Smooth-Haired Miniature",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Smooth-Haired Miniature",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Smooth-Haired Miniature",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Mix Smooth-Haired Miniature",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Smooth-haired Rabbit Hunting",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Smooth-haired Rabbit Hunting",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Toy smooth-haired",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Toy Mix Smooth-haired",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Smooth-Haired Standard",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Smooth-Haired Standard",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Soft-Coated Wheaten Terrier",
        "SOFT_COATED_WHEATEN_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Soft-Coated Wheaten Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "South Russian Shepherd Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "South Russian Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Spaniel dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Spaniel dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Spanish Greyhound",
        "SPANISH_GREYHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Spanish Greyhound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Spanish Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Spanish Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Spanish Mastiff",
        "MASTIFF",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Spanish Mastiff Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Spanish Water Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Spanish Water Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Sporting Lucas Terrier",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Sporting Lucas Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "St. Germain Pointing Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "St. Germain Pointing Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Stabyhoun Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Stabyhoun Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Staffordshire Bull terrier",
        "STAFFORDSHIRE_BULL_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Staffordshire Bull terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Standard",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Standard",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mexican Hairless Dog Mix Standard",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poodle Standard",
        "POODLE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schnauzer Standard",
        "SCHNAUZER_STANDARD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schnauzer Mix Standard",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Styrian Coarse-haired Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Styrian Coarse-haired Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Sussex Spaniel",
        "SUSSEX_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Sussex Spaniel Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swedish Elkhound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swedish Elkhound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swedish Lapphund",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swedish Lapphund Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swedish Vallhund",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swedish Vallhund Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swedish White Elkhound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swedish White Elkhound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swiss Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swiss Hound Lucerne",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swiss Hound Lucerne Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swiss Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swiss Hound Schwyz Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Taiwan Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Taiwan Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tatra Shepherd Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tatra Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Teddy Roosevelt Terrier",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Teddy Roosevelt Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tenterfield Terrier",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tenterfield Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Terceira Mastiff",
        "MASTIFF",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Terceira Mastiff Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Thai Bangkaew Dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Thai Bangkaew Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Thai Ridgeback dog",
        "THAI_RIDGEBACK",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Thai Ridgeback dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tibetan Mastiff",
        "TIBETAN_MASTIFF",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tibetan Mastiff Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tibetan Spaniel",
        "TIBETAN_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tibetan Spaniel Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tibetan Terrier",
        "TIBETAN_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tibetan Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tornjak",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tornjak Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tosa",
        "TOSA",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tosa Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Toy Fox Terrier",
        "FOX_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Toy Fox Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Toy Manchester Terrier",
        "MANCHESTER_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Toy Manchester Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Transylvanian Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Transylvanian Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Treeing Cur",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Treeing Cur Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Treeing Feist",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Treeing Feist Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Treeing Tennessee Brindle",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Treeing Tennessee Brindle Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Treeing Walker Coonhound",
        "TREEING_WALKER_COONHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Treeing Walker Coonhound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tyrolean Hound",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tyrolean Hound Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Uruguayan Cimarron",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Uruguayan Cimarron Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Valencian rat hunting dog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Valencian rat hunting dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Volpino Italiano",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Volpino Italiano Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Corgi",
        "WELSH_CORGI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Corgi Cardigan",
        "CARDIGAN_WELSH_CORGI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Corgi Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Corgi Pembroke",
        "PEMBROKE_WELSH_CORGI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Sheepdog",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Sheepdog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Springer Spaniel",
        "WELSH_SPRINGER_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Springer Spaniel Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Terrier",
        "WELSH_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "West Highland White Terrier",
        "WEST_HIGHLAND_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "West Highland White Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "West Siberian LaÃ¯ka",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "West Siberian LaÃ¯ka Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Westphalian Dachsbracke",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Westphalian Dachsbracke Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Wetterhoun",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Wetterhoun Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Whippet",
        "WHIPPET",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Whippet Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "White Shepherd",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "White Shepherd Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "White Swiss Shepherd Dog",
        "BERGER_BLANC_SUISSE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "White Swiss Shepherd Dog Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fox Terrier wire",
        "FOX_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fox Terrier Mix wire",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hungarian Vizsla Wire-haired",
        "VIZSLA",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hungarian Vizsla Mix Wire-haired",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Wire-Haired Large",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Mix Wire-Haired Large",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Wire-Haired Medium-Sized",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Mix Wire-Haired Medium-Sized",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Wire-Haired Miniature",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Wire-Haired Miniature",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Wire-Haired Miniature",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Mix Wire-Haired Miniature",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Wire-haired Rabbit Hunting",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Wire-haired Rabbit Hunting",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Wire-Haired Standard",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Wire-Haired Standard",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Wolf Mix",
        "WOLF_HYBRID",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Yakutian Laika",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Yakutian Laika Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Yorkipoo",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Yorkipoo Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Yorkshire Terrier",
        "YORKSHIRE_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Yorkshire Terrier Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Yugoslavian Shepherd Dog-Sharplanina",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Yugoslavian Shepherd Dog-Sharplanina Mix",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Abyssinian Cat",
        "ABYSSINIAN_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Abyssinian Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Aegean Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Aegean Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Bobtail",
        "BOBTAIL_AMERICAN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Bobtail Longhair",
        "BOBTAIL_AMERICAN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Bobtail Longhair Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Bobtail Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Bobtail Shorthair",
        "BOBTAIL_AMERICAN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Bobtail Shorthair Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Curl",
        "AMERICAN_CURL",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Curl Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Curl Longhair",
        "AMERICAN_CURL",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Curl Longhair Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Curl Shorthair",
        "AMERICAN_CURL",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Curl Shorthair Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Domestic Long-haired cat",
        "DOMESTIC_LONGHAIR",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Domestic Medium-haired cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Domestic Short-haired cat",
        "DOMESTIC_SHORTHAIR",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Long-haired Purebred cat",
        "AMERICAN_LONGHAIR",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Medium-haired Purebred cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Short-haired Purebred cat",
        "AMERICAN_SHORTHAIR",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Wire-haired",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Wire-haired Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Aphrodite Giant",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Aphrodite Giant Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Arabian Mau",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Arabian Mau Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Asian Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Asian Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Asian Cat Long-haired",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Asian Cat Long-haired Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Asian Cat Semi-Long-hair",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Asian Cat Semi-Long-hair Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Asian Cat Shorthair",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Asian Cat Shorthair Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Mist",
        "AUSTRALIAN_MIST",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Mist Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Balinese Cat",
        "BALINESE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Balinese Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Bambino Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Bambino Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Bengal Cat",
        "BENGAL",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Bengal Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Birman Cat",
        "BIRMAN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Birman Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Bohemian Rex",
        "REX_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Bohemian Rex Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Bombay Cat",
        "BOMBAY",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Bombay Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Brazilian Shorthair",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "British Blue Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "British Blue Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "British Cat",
        "BRITISH_SHORTHAIR",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "British Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "British Longhair",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "British Shorthair",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Burmese Cat",
        "BURMESE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Burmese Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Burmilla Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Burmilla Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "California Spangled",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "California Spangled Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Chantilly-Tiffany Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Chantilly-Tiffany Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Chartreuse Cat",
        "CHARTREUX",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Chartreuse Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Chausie Cat",
        "CHAUSIE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Chausie Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Colourpoint Shorthair",
        "COLORPOINT_SHORTHAIR",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Colourpoint Shorthair Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Cornish Rex",
        "REX_CORNISH",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Cornish Rex Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Crossbred",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Crossbred Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Cymric",
        "CYMRIC",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Cymric Long-haired",
        "CYMRIC",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Cymric Long-haired Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Cymric Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Cyprus Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Cyprus Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Devon Rex",
        "REX_DEVON",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Devon Rex Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Donskoy Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Donskoy Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Dragon Li",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Dragon Li Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Dwelf Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Dwelf Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Egyptian Mau",
        "EGYPTIAN_MAU",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Egyptian Mau Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "European Burmese Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "European Burmese Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "European Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "European Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "European Shorthair",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "European Shorthair Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Exotic Cat",
        "EXOTIC",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Exotic Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Felis catus",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Foldex Cat",
        "SCOTTISH_FOLD",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Foldex Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "German Rex",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "German Rex Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Havana Brown",
        "HAVANA_BROWN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Havana Brown Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Highlander Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Highlander Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Himalayan Cat",
        "HIMALAYAN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Himalayan Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Japanese Bobtail",
        "JAPANESE_BOBTAIL",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Japanese Bobtail Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Javanese Cat",
        "JAVANESE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Javanese Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Jungle Curl",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Jungle Curl Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Khao Manee",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Khao Manee Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Korat Cat",
        "KORAT",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Korat Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Korean Bobtail",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Korean Bobtail Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Korn Ja",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Korn Ja Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Kurilean Bobtail Long-haired",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Kurilean Bobtail Long-haired Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Kurilean Bobtail Short-haired",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Kurilean Bobtail Short-haired Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Kurilian Bobtail",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Kurilian Bobtail Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "LaPerm Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "LaPerm Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "LaPerm Longhair",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "LaPerm Longhair Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "LaPerm Shorthair",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "LaPerm Shorthair Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Lykoi Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Lykoi Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Lynx Point Siamese",
        "SIAMESE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Lynx Point Siamese Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Maine Coon",
        "MAINE_COON_CAT",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Maine Coon Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Manx Cat",
        "MANX",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Manx Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Mekong Bobtail",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Mekong Bobtail Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Minskin Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Minskin Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Modern Persian",
        "PERSIAN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Modern Persian Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Modern Siamese Cat",
        "SIAMESE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Modern Siamese Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Munchkin Cat",
        "MUNCHKIN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Munchkin Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Napoleon Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Napoleon Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Nebelung Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Nebelung Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Neva Masquerade",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Neva Masquerade Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Forest Cat",
        "NORWEGIAN_FOREST_CAT",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Forest Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Ocicat Cat",
        "OCICAT",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Ocicat Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Ojos Azules",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Ojos Azules Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Oregon Rex",
        "REX_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Oregon Rex Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Oriental Bicolor",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Oriental Bicolor Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Oriental Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Oriental Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Oriental Long-haired",
        "ORIENTAL_LONGHAIR",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Oriental Long-haired Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Oriental Short-haired",
        "ORIENTAL_SHORTHAIR",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Oriental Short-haired Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Persian Cat",
        "PERSIAN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Persian Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Peterbald Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Peterbald Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Pixie-bob Cat",
        "PIXIE_BOB",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Pixie-bob Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Raas Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Raas Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Ragamuffin Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Ragamuffin Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Ragdoll Cat",
        "RAG_DOLL",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Ragdoll Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Black",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Black Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Blue",
        "RUSSIAN_BLUE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Blue Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Tabby",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Tabby Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Russian White",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Russian White Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Sam sawet",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Sam sawet Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Savannah Cat",
        "SAVANNAH",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Savannah Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Scottish Fold",
        "SCOTTISH_FOLD",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Scottish Fold Longhair",
        "SCOTTISH_FOLD",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Scottish Fold Longhair Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Scottish Fold Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Scottish Fold Shorthair",
        "SCOTTISH_FOLD",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Scottish Fold Shorthair Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Selkirk Rex",
        "REX_SELKIRK",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Selkirk Rex Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Serengeti Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Serengeti Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Serrade Petit",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Serrade Petit Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Siamese",
        "SIAMESE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Siamese Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Siberian Cat",
        "SIBERIAN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Siberian Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Singapura Cat",
        "SINGAPURA",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Singapura Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Snowshoe Cat",
        "SNOWSHOE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Snowshoe Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Sokoke Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Sokoke Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Somali Cat",
        "SOMALI",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Somali Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "South African Blue Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "South African Blue Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Sphynx Cat",
        "SPHYNX",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Sphynx Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Standardized Siamese Cat",
        "SIAMESE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Standardized Siamese Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Suphalak Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Suphalak Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Thai Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Thai Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Tonkinese Cat",
        "TONKINESE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Tonkinese Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Tortie Lynx Point Siamese Cat",
        "SIAMESE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Tortie Lynx Point Siamese Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Tortie Point Siamese",
        "SIAMESE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Tortie Point Siamese Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Toyger Cat",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Toyger Cat Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Traditional Persian",
        "PERSIAN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Traditional Persian Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Turkish Angora",
        "TURKISH_ANGORA",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Turkish Angora Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Turkish Van",
        "TURKISH_VAN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Turkish Van Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Ukrainian Levkoy",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Ukrainian Levkoy Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Unknown Feline",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Wila Krungthep",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Wila Krungthep Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "York Chocolate",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "York Chocolate Mix",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Feline",
        "FELINE",
        "null",
        "species",
        "heska"
    ],
    [
        "Canine",
        "CANINE",
        "null",
        "species",
        "heska"
    ],
    [
        "Abyssinian Cat",
        "ABYSS",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Abyssinian Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Aegean Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Aegean Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Bobtail",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Bobtail Longhair",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Bobtail Longhair Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Bobtail Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Bobtail Shorthair",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Bobtail Shorthair Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Curl",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Curl Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Curl Longhair",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Curl Longhair Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Curl Shorthair",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Curl Shorthair Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Domestic Long-haired cat",
        "DLH",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Domestic Medium-haired cat",
        "DMH",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Domestic Short-haired cat",
        "DSH",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Long-haired Purebred",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Medium-haired Purebred",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Short-haired Purebred",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Wire-haired",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Wire-haired Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Aphrodite Giant",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Aphrodite Giant Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Arabian Mau",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Arabian Mau Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Asian Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Asian Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Asian Cat Long-haired",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Asian Cat Long-haired Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Asian Cat Semi-Long-hair",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Asian Cat Semi-Long-hair Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Asian Cat Shorthair",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Asian Cat Shorthair Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Australian Mist",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Australian Mist Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Balinese Cat",
        "BALIN",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Balinese Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Bambino Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Bambino Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Bengal Cat",
        "BENGA",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Bengal Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Birman Cat",
        "BIRMA",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Birman Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Bohemian Rex",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Bohemian Rex Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Bombay Cat",
        "BOMBA",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Bombay Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Brazilian Shorthair",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "British Blue Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "British Blue Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "British Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "British Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "British Longhair",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "British Shorthair",
        "BRISH",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Burmese Cat",
        "BURME",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Burmese Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Burmilla Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Burmilla Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "California Spangled",
        "CALSP",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "California Spangled Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Chantilly-Tiffany Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Chantilly-Tiffany Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Chartreuse Cat",
        "CHART",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Chartreuse Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Chausie Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Chausie Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Colourpoint Shorthair",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Colourpoint Shorthair Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Cornish Rex",
        "REXCO",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Cornish Rex Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Crossbred",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Crossbred Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Cymric",
        "CYMRI",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Cymric Long-haired",
        "CYMRI",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Cymric Long-haired Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Cymric Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Cyprus Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Cyprus Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Devon Rex",
        "REXDE",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Devon Rex Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Donskoy Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Donskoy Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Dragon Li",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Dragon Li Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Dwelf Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Dwelf Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Egyptian Mau",
        "EGYMA",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Egyptian Mau Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "European Burmese Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "European Burmese Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "European Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "European Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "European Shorthair",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "European Shorthair Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Exotic Cat",
        "EXOSH",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Exotic Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Felis catus",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Foldex Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Foldex Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "German Rex",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "German Rex Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Havana Brown",
        "HAVAN",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Havana Brown Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Highlander Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Highlander Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Himalayan Cat",
        "HIMAL",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Himalayan Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Japanese Bobtail",
        "JAPBO",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Japanese Bobtail Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Javanese Cat",
        "JAVAN",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Javanese Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Jungle Curl",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Jungle Curl Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Khao Manee",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Khao Manee Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Korat Cat",
        "KORET",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Korat Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Korean Bobtail",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Korean Bobtail Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Korn Ja",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Korn Ja Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Kurilean Bobtail Long-haired",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Kurilean Bobtail Long-haired Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Kurilean Bobtail Short-haired",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Kurilean Bobtail Short-haired Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Kurilian Bobtail",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Kurilian Bobtail Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "LaPerm Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "LaPerm Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "LaPerm Longhair",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "LaPerm Longhair Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "LaPerm Shorthair",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "LaPerm Shorthair Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Lykoi Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Lykoi Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Lynx Point Siamese",
        "SIAME",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Lynx Point Siamese Mix",
        "SIAMX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Maine Coon",
        "MAICO",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Maine Coon Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Manx Cat",
        "MANX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Manx Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Mekong Bobtail",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Mekong Bobtail Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Minskin Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Minskin Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Modern Persian",
        "PERSI",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Modern Persian Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Modern Siamese Cat",
        "SIAME",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Modern Siamese Cat Mix",
        "SIAMX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Munchkin Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Munchkin Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Napoleon Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Napoleon Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Nebelung Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Nebelung Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Neva Masquerade",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Neva Masquerade Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Forest Cat",
        "NORFO",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Forest Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Ocicat Cat",
        "OCICA",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Ocicat Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Ojos Azules",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Ojos Azules Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Oregon Rex",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Oregon Rex Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Oriental Bicolor",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Oriental Bicolor Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Oriental Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Oriental Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Oriental Long-haired",
        "ORILO",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Oriental Long-haired Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Oriental Short-haired",
        "ORISH",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Oriental Short-haired Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Persian Cat",
        "PERSI",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Persian Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Peterbald Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Peterbald Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Pixie-bob Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Pixie-bob Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Raas Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Raas Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Ragamuffin Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Ragamuffin Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Ragdoll Cat",
        "RAGDO",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Ragdoll Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Russian Black",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Russian Black Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Russian Blue",
        "RUSBL",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Russian Blue Mix",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Russian Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Russian Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Russian Tabby",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Russian Tabby Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Russian White",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Russian White Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Sam sawet",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Sam sawet Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Savannah Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Savannah Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Scottish Fold",
        "SCOFO",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Scottish Fold Longhair",
        "SCOFO",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Scottish Fold Longhair Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Scottish Fold Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Scottish Fold Shorthair",
        "SCOFO",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Scottish Fold Shorthair Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Selkirk Rex",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Selkirk Rex Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Serengeti Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Serengeti Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Serrade Petit",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Serrade Petit Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Siamese",
        "SIAME",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Siamese Mix",
        "SIAMX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Siberian Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Siberian Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Singapura Cat",
        "SINGA",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Singapura Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Snowshoe Cat",
        "SNOWS",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Snowshoe Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Sokoke Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Sokoke Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Somali Cat",
        "SOMAL",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Somali Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "South African Blue Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "South African Blue Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Sphynx Cat",
        "SPHYN",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Sphynx Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Standardized Siamese Cat",
        "SIAME",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Standardized Siamese Cat Mix",
        "SIAMX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Suphalak Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Suphalak Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Thai Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Thai Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Tonkinese Cat",
        "TONKI",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Tonkinese Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Tortie Lynx Point Siamese Cat",
        "SIAME",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Tortie Lynx Point Siamese Cat Mix",
        "SIAMX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Tortie Point Siamese",
        "SIAME",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Tortie Point Siamese Mix",
        "SIAMX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Toyger Cat",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Toyger Cat Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Traditional Persian",
        "PERSI",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Traditional Persian Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Turkish Angora",
        "TURAN",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Turkish Angora Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Turkish Van",
        "TURVA",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Turkish Van Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Ukrainian Levkoy",
        "PERSI",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Ukrainian Levkoy Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Unknown Feline",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Wila Krungthep",
        "PERSI",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Wila Krungthep Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "York Chocolate",
        "PERSI",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "York Chocolate Mix",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Affenpinscher",
        "AFFEN",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Affenpinscher Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Afghan Hound",
        "AFGHO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Afghan Hound Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Afghan Shepherd Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Airedale Terrier",
        "AIRED",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Airedale Terrier Mix",
        "AIRTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Akbash",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Akbash Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Alaskan Klee Kai",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Alaskan Klee Kai Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Alaskan Malamute",
        "ALAMA",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Alaskan Malamute Mix",
        "ALAMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Alpine Dachsbracke",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Alpine Dachsbracke Mix",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Akita",
        "AKITA",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Akita Mix",
        "AKITX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Bulldog",
        "BULAM",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Bulldog Mix",
        "BULLX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Cocker Spaniel",
        "COCSP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Cocker Spaniel Mix",
        "COCSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Eskimo Dog",
        "AMEES",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Eskimo Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Foxhound",
        "AMEFH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Foxhound Mix",
        "FOXHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American German Shepherd Dog",
        "GERSH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American German Shepherd Dog Mix",
        "GERSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Hairless Terrier",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Hairless Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Indian Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Indian Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Leopard Hound",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Leopard Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Pit Bull Terrier",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Pit Bull Terrier Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Staffordshire Terrier",
        "AMSTT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Staffordshire Terrier Mix",
        "AMSTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Water Spaniel",
        "AMEWS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Water Spaniel Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Anatolian Shepherd Dog",
        "ANASH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Anatolian Shepherd Dog Mix Shepherd",
        "Mix",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Anglo-FranÃ§ais de Moyen VÃ©nerie",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Anglo-FranÃ§ais de Moyen VÃ©nerie Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Anglo-FranÃ§ais de Petite VÃ©nerie",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Anglo-FranÃ§ais de Petite VÃ©nerie Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Appenzell Cattle Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Appenzell Cattle Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ariege Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ariege Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ariege Pointing Dog",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ariege Pointing Dog Mix",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Artesian-Norman Basset",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Artesian-Norman Basset Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Artois Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Artois Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Atlas Shepherd Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Atlas Shepherd Dog Mix Shepherd",
        "Mix",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Cattle Dog",
        "AUSCD",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Cattle Dog Mix",
        "AUSCX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Kelpie",
        "AUSKE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Kelpie Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Shepherd",
        "AUSSH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Shepherd Mix",
        "AUSSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Silky Terrier",
        "SILTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Silky Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Stumpy Tail Cattle Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Stumpy Tail Cattle Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Terrier",
        "AUSTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian working kelpie",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian working kelpie Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Austrian Black and Tan Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Austrian Black and Tan Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Austrian Pinscher",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Austrian Pinscher Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Auvergne Pointing Dog",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Auvergne Pointing Dog Mix",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Azawakh",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Azawakh Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Barbet",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Barbet Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Basenji",
        "BASEN",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Basenji Mix",
        "BASMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Basque Shepherd Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Basque Shepherd Dog Mix Shepherd",
        "Mix",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Basset Griffon Vendeen",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Basset Griffon Vendeen Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Basset Hound",
        "BASHO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Basset Hound Mix",
        "BASHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bavarian Mountain Scenthound",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bavarian Mountain Scenthound Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Beagle",
        "BEAGL",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Beagle Mix",
        "BEAGX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Beagle-Harrier",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Beagle-Harrier Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bearded Collie",
        "BEACO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bearded Collie Mix",
        "COLLX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Beauceron",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Beauceron Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bedlington Terrier",
        "BEDTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bedlington Terrier Mix",
        "BEDTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Griffon",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Griffon Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Shepherd Dog",
        "BELSH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Shepherd Dog Mix",
        "Shepherd Mix",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Shepherd Dog Mix Groenendael",
        "Shepherd Mix",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Shepherd Dog Mix Laekenois",
        "Shepherd Mix",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Shepherd Dog Mix Malinois",
        "BELMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Shepherd Dog Mix Tervuren",
        "Shepherd Mix",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Shepherd Dog Groenendael",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Shepherd Dog Laekenois",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Shepherd Dog Malinois",
        "BELMA",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Shepherd Dog Tervuren",
        "BELTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bergamasco Shepherd Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bergamasco Shepherd Dog Mix Shepherd",
        "Mix",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Berger Picard",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Berger Picard Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bernadoodle",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bernadoodle Mix",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bernese Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bernese Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bernese Mountain Dog",
        "BERMD",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bernese Mountain Dog Mix",
        "BERMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bichon Frise",
        "BICFR",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bichon Frise Mix",
        "BICFX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Biewer Terrier",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Biewer Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Billy",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Billy Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Black Mouth Cur",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Black Mouth Cur Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Black Russian Terrier",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Black Russian Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Black and Tan Coonhound",
        "COOBT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Black and Tan Coonhound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Black and Tan English Toy Terrier",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Black and Tan English Toy Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bloodhound",
        "BLOOD",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bloodhound Mix",
        "BLOOX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Blue Gascony Basset",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Blue Gascony Basset Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Blue Gascony Griffon",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Blue Gascony Griffon Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Blue Picardy Spaniel",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Blue Picardy Spaniel Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bluetick Coonhound",
        "BLUHO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bluetick Coonhound Mix",
        "COONX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Boerboel",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Boerboel Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bohemian Shepherd",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bohemian Shepherd Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bohemian Wire-haired Pointing Griffon",
        "GRIWP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bohemian Wire-haired Pointing Griffon Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bolognese",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bolognese Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Border Collie",
        "BORCO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Border Collie Mix",
        "BORCX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Border Terrier",
        "BORTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Border Terrier Mix",
        "BORTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Borzoi",
        "BORZO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Borzoi Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bosnian Coarse-Haired Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bosnian Coarse-Haired Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Boston Terrier",
        "BOSTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Boston Terrier Mix",
        "BOSTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bourbonnais Pointing Dog",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bourbonnais Pointing Dog Mix",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bouvier des Ardennes",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bouvier des Ardennes Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bouvier des Flandres",
        "BOUDF",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bouvier des Flandres Mix",
        "BOUDX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Boxer",
        "BOXER",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Boxer Mix",
        "BOXEX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Boykin Spaniel",
        "BOYSP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Boykin Spaniel Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bracco Italiano",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bracco Italiano Mix",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Brazilian Terrier",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Brazilian Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Briard",
        "BRIAR",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Briard Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Briquet Griffon Vendeen Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Brittany",
        "BRITT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Brittany Mix",
        "BRITX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Broholmer",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Broholmer Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Brussels Griffon",
        "GRIBR",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Brussels Griffon Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bucovina Shepherd Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bucovina Shepherd Dog Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bull Terrier Mix Standard",
        "BULTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bull Terrier Standard",
        "BULTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bullmastiff",
        "BULMA",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bullmastiff Mix",
        "MASTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Burgos Pointing Dog",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Burgos Pointing Dog Mix",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cairn Terrier",
        "CAITE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cairn Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Canaan Dog",
        "CANDO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Canaan Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Canadian Eskimo Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Canadian Eskimo Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Canarian Warren Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Canarian Warren Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cane corso",
        "CANEC",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cane corso Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Canis lupus familiaris",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cantabrian Water Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cantabrian Water Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cao Fila de Sao Miguel",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cao Fila de Sao Miguel Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Carolina Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Carolina Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Carpathian Shepherd Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Carpathian Shepherd Dog Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Castro Laboreiro Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Castro Laboreiro Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Catahoula Leopard Dog",
        "CATLD",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Catahoula Leopard Dog Mix",
        "CATLDX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Catalan Sheepdog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Catalan Sheepdog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Caucasian Shepherd Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Caucasian Shepherd Dog Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cavalier King Charles Spaniel",
        "KINCS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cavalier King Charles Spaniel Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Central Asia Shepherd Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Central Asia Shepherd Dog Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cesky Terrier",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cesky Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cheasapeake Bay Retriever",
        "CHEBR",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cheasapeake Bay Retriever Mix",
        "CHEBX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chihuahua",
        "CHIHU",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chihuahua Mix",
        "CHIHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chihuahua Mix Long-haired",
        "CHIHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chihuahua Mix Smooth-haired",
        "CHIHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chihuahua Long-haired",
        "CHIHU",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chihuahua Smooth-haired",
        "CHIHU",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chilean Terrier",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chilean Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chinese Crested",
        "CHICR",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chinese Crested Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chinese Crested Mix Hairless",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chinese Crested Mix Powderpuff",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chinese Crested Hairless",
        "CHICR",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chinese Crested Powderpuff",
        "CHICR",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chinook",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chinook Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chow Chow",
        "CHOW",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chow Chow Mix",
        "CHOWX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cirneco dell'Etna",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cirneco dell'Etna Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Clumber Spaniel",
        "CLUSP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Clumber Spaniel Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cockapoo",
        "COCKA",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cockapoo Mix",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Collie Mix Rough-coated",
        "COLLX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Collie Mix Smooth-coated",
        "COLLX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Collie Rough-coated",
        "COLLI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Collie Smooth-coated",
        "COLLI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Continental Toy Spaniel Mix Papillon",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Continental Toy Spaniel Mix PhalÃ¨ne",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Continental Toy Spaniel Papillon",
        "PAPIL",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Continental Toy Spaniel PhalÃ¨ne",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Coonhound",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Coonhound Mix",
        "COONX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Coton de TulÃ©ar",
        "COTDT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Coton de TulÃ©ar Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Croatian Sheepdog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Croatian Sheepdog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Crossbred",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Crossbred Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Curly Coated Retriever",
        "CURCR",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Curly Coated Retriever Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Czechoslovakian Wolfdog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Czechoslovakian Wolfdog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund",
        "DACHS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Long-haired Miniature",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Long-haired Rabbit Hunting",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Long-haired Standard",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Miniature",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Rabbit Hunting",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Smooth-Haired Miniature",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Smooth-Haired Standard",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Smooth-haired Rabbit Hunting",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Standard",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Wire-Haired Miniature",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Wire-Haired Standard",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Wire-haired Rabbit Hunting",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Long-haired Miniature",
        "DACMI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Long-haired Rabbit Hunting",
        "DACHS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Long-haired Standard",
        "DACHS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Miniature",
        "DACMI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Rabbit Hunting",
        "DACHS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Smooth-Haired Miniature",
        "DACMI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Smooth-Haired Standard",
        "DACHS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Smooth-haired Rabbit Hunting",
        "DACHS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Standard",
        "DACHS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Wire-Haired Miniature",
        "DACMI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Wire-Haired Standard",
        "DACHS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Wire-haired Rabbit Hunting",
        "DACHS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dalmatian",
        "DALMA",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dalmatian Mix",
        "DALMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dandie Dinmont Terrier",
        "DANDT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dandie Dinmont Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Danish-Swedish Farmdog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Danish-Swedish Farmdog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Deutsch Stichelhaar",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Deutsch Stichelhaar Mix",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Doberman Pinscher",
        "DOBPI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Doberman Pinscher Mix",
        "DOBPX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dogo Argentino",
        "DOGAR",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dogo Argentino Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dogo Canario",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dogo Canario Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dogue De Bordeaux",
        "DOGUE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dogue De Bordeaux Mix",
        "m",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Drentse Partridge Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Drentse Partridge Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Drever",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Drever Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dunker Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dunker Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dutch Shepherd Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dutch Shepherd Dog Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dutch Shepherd Dog Mix Long-haired",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dutch Shepherd Dog Mix Short-haired",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dutch Shepherd Dog Mix rough-haired",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dutch Shepherd Dog Long-haired",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dutch Shepherd Dog Short-haired",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dutch Shepherd Dog rough-haired",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "East European Shepherd",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "East European Shepherd Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "East Siberian LaÃ¯ka",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "East Siberian LaÃ¯ka Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Elo Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Elo Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Bulldog",
        "BULEN",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Bulldog Mix",
        "BULLX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Cocker Spaniel",
        "COCSE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Cocker Spaniel Mix",
        "COCSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Coonhound",
        "REDTH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Coonhound Mix",
        "COONX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Foxhound",
        "FOXEN",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Foxhound Mix",
        "FOXHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Mastiff",
        "MASTI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Mastiff Mix",
        "MASTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Pointer",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Pointer Mix",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Setter",
        "ENGSE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Setter Mix",
        "ENGSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Shepherd",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Shepherd Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Springer Spaniel",
        "ENGSS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Springer Spaniel Mix",
        "SPRSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Toy Spaniel",
        "ENGTS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Toy Spaniel Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Toy Terrier",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Toy Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Entlebuch Mountain Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Entlebuch Mountain Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Estonian Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Estonian Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Estrela Mountain Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Estrela Mountain Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Eurasian",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Eurasian Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "European German Shepherd Dog",
        "GERSH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "European German Shepherd Dog Mix",
        "GERSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fawn Brittany Basset",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fawn Brittany Basset Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fawn Brittany Griffon",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fawn Brittany Griffon Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Feist",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Feist Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Field Spaniel",
        "FIESP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Field Spaniel Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fila Brasileiro",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fila Brasileiro Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Finnish Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Finnish Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Finnish Lapphund",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Finnish Lapphund Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Finnish Spitz",
        "SPITZ",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Finnish Spitz Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Flat Coated Retriever",
        "FLACR",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Flat Coated Retriever Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fox Terrier",
        "FOXTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fox Terrier Mix",
        "FOXTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fox Terrier Mix smooth",
        "FOXTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fox Terrier Mix wire",
        "FOXTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fox Terrier smooth",
        "FOXTS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fox Terrier wire",
        "FOXTW",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Bulldog",
        "BULLF",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Bulldog Mix",
        "BULLX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Hound Mix Tricolour",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Hound Mix White and Black",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Hound Mix White and Orange",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Hound Tricolour",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Hound White and Black",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Hound White and Orange",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Pointing Dog",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Pointing Dog Mix",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Pointing Dog Mix Gascogne",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Pointing Dog Mix Pyrenean",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Pointing Dog Gascogne",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Pointing Dog Pyrenean",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Spaniel",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Spaniel Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Wire-haired Korthals Pointing Griffon",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Wire-haired Korthals Pointing Griffon Mix",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Galician Shepherd Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Galician Shepherd Dog Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Garafian Shepherd",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Garafian Shepherd Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Gascon Saintongeois",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Gascon Saintongeois Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Georgian Shepherd",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Georgian Shepherd Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Hunting Terrier",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Hunting Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Long-haired Pointer",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Long-haired Pointer Mix",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Pinscher",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Pinscher Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Shepherd Dog",
        "GERSH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Shepherd Dog Mix",
        "GERSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Shepherd Dog Mix Long-haired",
        "GERSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Shepherd Dog Mix Short-haired",
        "GERSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Shepherd Dog Long-haired",
        "GERSH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Shepherd Dog Short-haired",
        "GERSH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Short-haired Pointer",
        "POIGS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Short-haired Pointer Mix",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spaniel",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spaniel Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spitz",
        "SPITZ",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spitz Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spitz Mix Gross",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spitz Mix Miniature",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spitz Mix Mittel",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spitz Mix Pomeranian",
        "POMEX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spitz Gross",
        "SPITZ",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spitz Miniature",
        "SPITZ",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spitz Mittel",
        "SPITZ",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spitz Pomeranian",
        "POMER",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Wire-Haired Pointer Mix",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ghadrejani Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ghadrejani Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Glen of Imaal Terrier",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Glen of Imaal Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Golden Retriever",
        "GOLRE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Golden Retriever Mix",
        "GOLRX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Goldendoodle",
        "GLDOO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Goldendoodle Mix",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Gordon Setter",
        "GORSE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Gordon Setter Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Grand Basset Griffon Vendeen",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Grand Basset Griffon Vendeen Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Grand Griffon Vendeen",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Grand Griffon Vendeen Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Anglo-French Tricolour Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Anglo-French Tricolour Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Anglo-French White and Black Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Anglo-French White and Black Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Anglo-French White and Orange Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Anglo-French White and Orange Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Dane",
        "GREDA",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Dane Mix",
        "GREDX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Gascony Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Gascony Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Pyrenees Pyrenean Mountain Dog",
        "GREPY",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Pyrenees Pyrenean Mountain Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Swiss Mountain Dog",
        "SWIMD",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Swiss Mountain Dog Mix",
        "SWIMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Greek Shepherd",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Greek Shepherd Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Greenland Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Greenland Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Greyhound",
        "GREYH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Greyhound Mix",
        "GREYX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Griffon Nivernais",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Griffon Nivernais Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Gull Terrier",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Gull Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Halden Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Halden Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hamilton Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hamilton Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hanoverian Scenthound",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hanoverian Scenthound Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Harrier",
        "HARRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Harrier Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Havanese",
        "HAVAN",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Havanese Mix",
        "HAVMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hellenic Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hellenic Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Himalayan Sheepdog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Himalayan Sheepdog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hokkaido",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hokkaido Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hollandse Smoushond",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hollandse Smoushond Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hound Dog",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hound Dog Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hovawart",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hovawart Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hungarian Greyhound",
        "GREYH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hungarian Greyhound Mix",
        "GREYX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hungarian Vizsla Mix Short-haired",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hungarian Vizsla Mix Wire-haired",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hungarian Vizsla Short-haired",
        "VIZSL",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hungarian Vizsla Wire-haired",
        "VIZSL",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hygen Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hygen Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "HÃ¤lleforshund",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "HÃ¤lleforshund Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ibizan Hound",
        "IBIHO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ibizan Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ibizan Hound Mix rough-haired",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ibizan Hound Mix smooth-haired",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ibizan Hound rough-haired",
        "IBIHO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ibizan Hound smooth-haired",
        "IBIHO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Icelandic Sheepdog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Icelandic Sheepdog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Indian Spitz",
        "SPITZ",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Indian Spitz Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Glen of Imaal Terrier",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Glen of Imaal Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Red Setter",
        "IRISE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Red Setter Mix",
        "IRISX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Red and White Setter",
        "IRISE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Red and White Setter Mix",
        "IRISX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Softcoated Wheaten Terrier",
        "WHETS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Softcoated Wheaten Terrier Mix",
        "WHETX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Terrier",
        "IRITE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Water Spaniel",
        "IRIWS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Water Spaniel Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Wolfhound",
        "IRIWO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Wolfhound Mix",
        "IRIWX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Istrian Coarse-haired Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Istrian Coarse-haired Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Istrian Shorthaired Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Istrian Shorthaired Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Italian Greyhound",
        "GREIT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Italian Greyhound Mix",
        "GREYX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Italian Hound Mix Coarse-haired",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Italian Hound Mix Short-haired",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Italian Hound Coarse-haired",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Italian Hound Short-haired",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Italian Spinone",
        "ITISP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Italian Spinone Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Jack Russell Terrier",
        "JACRU",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Jack Russell Terrier Mix",
        "JACRUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Jagdterrier dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Jagdterrier dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Japanese Akita",
        "AKITA",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Japanese Akita Mix",
        "AKITX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Japanese Chin",
        "JAPCH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Japanese Chin Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Japanese Spitz",
        "SPITZ",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Japanese Spitz Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Japanese Terrier",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Japanese Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Jura Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Jura Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kai",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kai Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kangal Shepherd Dog",
        "ANASH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kangal Shepherd Dog Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Karelian Bear Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Karelian Bear Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Karst Shepherd Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Karst Shepherd Dog Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Keeshond",
        "KEESH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Keeshond Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kerry Blue Terrier",
        "KERBT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kerry Blue Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "King Charles Spaniel",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "King Charles Spaniel Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "King Shepherd",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "King Shepherd Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kintamani-Bali Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kintamani-Bali Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kishu Ken",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kishu Ken Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Komondor",
        "KOMON",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Komondor Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Korea Jindo Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Korea Jindo Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "KromfohrlÃ¤nder",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "KromfohrlÃ¤nder Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kumaon Mastiff",
        "MASTI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kumaon Mastiff Mix",
        "MASTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kuvasz",
        "KUVAS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kuvasz Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Labradoodle",
        "LABOO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Labradoodle Mix",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Labrador Retriever",
        "LABRE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Labrador Retriever Mix",
        "LABRX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Lagotto romagnolo",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Lagotto romagnolo Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Lakeland Terrier",
        "LAKTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Lakeland Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Lancashire Heeler",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Lancashire Heeler Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Landseer Mix European Continental type",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Landseer European Continental type",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Lapponian Herder",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Lapponian Herder Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Large MÃ¼nsterlander",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Large MÃ¼nsterlander Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Leonberger",
        "LEONB",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Leonberger Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Lhasa Apso",
        "LHAAP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Lhasa Apso Mix",
        "LHAAX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "LÃ¶wchen",
        "LOWCH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "LÃ¶wchen Mix",
        "LOWCH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Majorca Mastiff",
        "MASTI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Majorca Mastiff Mix",
        "MASTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Majorcan Shepherd Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Majorcan Shepherd Dog Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Majorcan Shepherd Dog Mix long haired",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Majorcan Shepherd Dog Mix short haired",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Majorcan Shepherd Dog long haired",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Majorcan Shepherd Dog short haired",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Maltese",
        "MALTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Maltese Mix",
        "MALTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Maltipoo",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Maltipoo Mix",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Manchester Terrier",
        "MANTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Manchester Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Maremma and Abruzzes Sheepdog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Maremma and Abruzzes Sheepdog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mastiff Dog",
        "MASTI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mastiff Mix",
        "MASTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Medium Griffon Vendeen",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Medium Griffon Vendeen Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Medium-Sized Anglo-French Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Medium-Sized Anglo-French Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mexican Hairless Dog",
        "XOLO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mexican Hairless Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mexican Hairless Dog Mix Medium-Sized",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mexican Hairless Dog Mix Miniature",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mexican Hairless Dog Mix Standard",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mexican Hairless Dog Medium-Sized",
        "XOLO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mexican Hairless Dog Miniature",
        "XOLO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mexican Hairless Dog Standard",
        "XOLO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Miniature American Shepherd",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Miniature American Shepherd Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Miniature Bull Terrier",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Miniature Bull Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Miniature Fox Terrier",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Miniature Fox Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Miniature Pinscher",
        "MINPI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Miniature Pinscher Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mixed Breed Dog",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Montenegrin Mountain Hound",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Montenegrin Mountain Hound Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mountain Cur",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mountain Cur Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mudi Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mudi Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Munsterlander",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Munsterlander Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Neapolitan Mastiff",
        "MASTI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Neapolitan Mastiff Mix",
        "MASTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Nederlandse Kooikerhondje",
        "SPITZ",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Nederlandse Kooikerhondje Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Newfoundland",
        "NEWFO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Newfoundland Mix",
        "NEWFX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norfolk Terrier",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norfolk Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norrbottenspitz",
        "SPITZ",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norrbottenspitz Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Buhund",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Buhund Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Elkhound",
        "NOREL",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Elkhound Mix",
        "NOREX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Elkhound Mix black",
        "NOREX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Elkhound Mix grey",
        "NOREX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Elkhound black",
        "NOREL",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Elkhound grey",
        "NOREL",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Lundehund",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Lundehund Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwich Terrier",
        "NORTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwich Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Nova Scotia Duck Tolling Retriever",
        "NSDTR",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Nova Scotia Duck Tolling Retriever Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Old Danish Pointing Dog",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Old Danish Pointing Dog Mix",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Old English Sheepdog",
        "OLDES",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Old English Sheepdog Mix",
        "OLDEX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Old English Terrier",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Old English Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Old German Shepherd Dog",
        "GERSH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Old German Shepherd Dog Mix",
        "GERSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Other dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Otterhound",
        "OTTER",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Otterhound Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Parson Russell Terrier",
        "RUSTP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Parson Russell Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Patterdale Terrier",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Patterdale Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Peekapoo",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Peekapoo Mix",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pekingese Dog",
        "PEKIN",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pekingese Mix",
        "PEKINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Peruvian Hairless Dog Mix Large",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Peruvian Hairless Dog Mix medium-sized",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Peruvian Hairless Dog Mix miniature",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Peruvian Hairless Dog Large",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Peruvian Hairless Dog medium-sized",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Peruvian Hairless Dog miniature",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Peruvian Inca Orchid",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Peruvian Inca Orchid Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Petit Basset Griffon Vendeen",
        "PETBG",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Petit Basset Griffon Vendeen Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pharaoh Hound",
        "PHAHO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pharaoh Hound Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Picardy Spaniel",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Picardy Spaniel Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pinscher dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pinscher dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Plott Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Plott Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Plummer Terrier",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Plummer Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Wire-Haired Pointer",
        "POIGW",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poitevin Dog",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poitevin Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Polish Greyhound",
        "GREYH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Polish Greyhound Mix",
        "GREYX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Polish Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Polish Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Polish Hunting Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Polish Hunting Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Polish Lowland Sheepdog",
        "PLSHEP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Polish Lowland Sheepdog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Polish Tatra Sheepdog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Polish Tatra Sheepdog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pont-Audemer Spaniel",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pont-Audemer Spaniel Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poodle Dog",
        "POODL",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poodle Mix",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poodle Mix Medium",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poodle Mix Miniature",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poodle Mix Standard",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poodle Mix Toy",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poodle Medium",
        "POODL",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poodle Miniature",
        "POOMI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poodle Standard",
        "POOST",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poodle Toy",
        "POOTO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Porcelain",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Porcelain Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Mix Small",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Mix Smooth-Haired Large",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Mix Smooth-Haired Medium-Sized",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Mix Smooth-Haired Miniature",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Mix Wire-Haired Large",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Mix Wire-Haired Medium-Sized",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Mix Wire-Haired Miniature",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Miniature",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Smooth-Haired Large",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Smooth-Haired Medium-Sized",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Smooth-Haired Miniature",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Wire-Haired Large",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Wire-Haired Medium-Sized",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Wire-Haired Miniature",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Pointing Dog",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Pointing Dog Mix",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Sheepdog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Sheepdog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Water Dog",
        "PORWD",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Water Dog Mix",
        "PORWX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Posavaz Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Posavaz Hound Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Prague Ratter",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Prague Ratter Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pudelpointer",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pudelpointer Mix",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pug Dog",
        "PUG",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pug Mix",
        "PUGX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Puli Dog",
        "PULI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Puli Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pumi Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pumi Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pyrenean Mastiff",
        "MASTI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pyrenean Mastiff Mix",
        "MASTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pyrenean Sheepdog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pyrenean Sheepdog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pyrenean Sheepdog Mix Long-haired",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pyrenean Sheepdog Mix Smooth-faced",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pyrenean Sheepdog Long-haired",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pyrenean Sheepdog Smooth-faced",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pyrenean Shepherd",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pyrenean Shepherd Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Rafeiro of Alentejo",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Rafeiro of Alentejo Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Rat Terrier",
        "RATTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Rat Terrier Mix",
        "RATTEX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Redbone Coonhound",
        "REDHO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Redbone Coonhound Mix",
        "COONX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Retriever Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Retriever Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Rhodesian Ridgeback",
        "RHORI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Rhodesian Ridgeback Mix",
        "RHORX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Romanian Bucovina Shepherd Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Romanian Bucovina Shepherd Dog Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Romanian Carpathian Shepherd Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Romanian Carpathian Shepherd Dog Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Romanian Mioritic Shepherd Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Romanian Mioritic Shepherd Dog Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Rottweiler Dog",
        "ROTTW",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Rottweiler Mix",
        "ROTTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Black Terrier",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Black Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Spaniel",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Spaniel Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Spotted Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Spotted Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Toy Mix Long-haired",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Toy Mix Smooth-haired",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Toy Long-haired",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Toy smooth-haired",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Tsvetnaya Bolonka",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Tsvetnaya Bolonka Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian-European LaÃ¯ka",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian-European LaÃ¯ka Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saarloos Wolfdog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saarloos Wolfdog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saint Bernard Dog",
        "SAIBE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saint Bernard Dog Mix",
        "SAIBX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saint Bernard Dog Mix Long-haired",
        "SAIBX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saint Bernard Dog Mix Short-haired",
        "SAIBX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saint Bernard Dog Long-haired",
        "SAIBE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saint Bernard Dog Short-haired",
        "SAIBE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saint-Usuge Spaniel",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saint-Usuge Spaniel Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saluki Dog",
        "SALUK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saluki Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Samoyed Dog",
        "SAMOY",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Samoyed Mix",
        "SAMOX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Sarabi Dog",
        "MASTI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Sarabi Dog Mix",
        "MASTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Save Valley Scenthound",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Save Valley Scenthound Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schapendoes",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schapendoes Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schiller Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schiller Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schipperke",
        "SCHIP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schipperke Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schnauzer Dog",
        "SCHNA",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schnauzer Mix",
        "SCHNX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schnauzer Mix Giant",
        "SCHNX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schnauzer Mix Miniature",
        "SCHNX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schnauzer Mix Standard",
        "SCHNX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schnauzer Giant",
        "SCHGI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schnauzer Miniature",
        "SCHMI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schnauzer Standard",
        "SCHST",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schnoodle",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schnoodle Mix",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Scottish Deerhound",
        "SCODE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Scottish Deerhound Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Scottish Terrier",
        "SCOTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Scottish Terrier Mix",
        "SCOTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Sealyham Terrier",
        "SEATE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Sealyham Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Segugio Maremmano",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Segugio Maremmano Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Serbian Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Serbian Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Serbian Tricolour Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Serbian Tricolour Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Setter dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Setter dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shar Pei",
        "SHAPE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shar Pei Mix",
        "SHAPX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shar Pei Mix Miniature",
        "SHAPX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shar Pei Miniature",
        "SHAPE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shepherd",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shepherd Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shetland Sheepdog",
        "SHESH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shetland Sheepdog Mix",
        "SHESX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shiba Dog",
        "SHIIN",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shiba Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shih Tzu",
        "SHIH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shih Tzu Mix",
        "SHITX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shikoku Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shikoku Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shiloh Shepherd",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shiloh Shepherd Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Siberian Husky",
        "SIBHU",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Siberian Husky Mix",
        "SIBHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Silky Terrier",
        "SILTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Silky Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Skye Terrier",
        "SKYTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Skye Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Sloughi Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Sloughi Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Slovakian Chuvach",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Slovakian Chuvach Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Slovakian Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Slovakian Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Slovakian Rough-haired Pointer",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Slovakian Rough-haired Pointer Mix",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Slovakian Wire-haired Pointer",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Slovakian Wire-haired Pointer Mix",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Small Blue Gascony Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Small Blue Gascony Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Small Brabant Griffon",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Small Brabant Griffon Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Small MÃ¼nsterlÃ¤nder",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Small MÃ¼nsterlÃ¤nder Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "SmÃ¥land Hound",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "SmÃ¥land Hound Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Soft-Coated Wheaten Terrier",
        "WHETS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Soft-Coated Wheaten Terrier Mix",
        "WHETX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "South Russian Shepherd Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "South Russian Shepherd Dog Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Spaniel dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Spaniel dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Spanish Greyhound",
        "GREYH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Spanish Greyhound Mix",
        "GREYX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Spanish Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Spanish Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Spanish Mastiff",
        "MASTI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Spanish Mastiff Mix",
        "MASTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Spanish Water Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Spanish Water Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Sporting Lucas Terrier",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Sporting Lucas Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "St. Germain Pointing Dog",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "St. Germain Pointing Dog Mix",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Stabyhoun Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Stabyhoun Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Staffordshire Bull terrier",
        "STABT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Staffordshire Bull terrier Mix",
        "STABX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Styrian Coarse-haired Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Styrian Coarse-haired Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Sussex Spaniel",
        "SUSSP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Sussex Spaniel Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swedish Elkhound",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swedish Elkhound Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swedish Lapphund",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swedish Lapphund Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swedish Vallhund",
        "SPITZ",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swedish Vallhund Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swedish White Elkhound",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swedish White Elkhound Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swiss Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swiss Hound Lucerne Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swiss Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swiss Hound Schwyz Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swiss Hound Lucerne",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swiss Hound Schwyz",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Taiwan Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Taiwan Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tatra Shepherd Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tatra Shepherd Dog Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Teddy Roosevelt Terrier",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Teddy Roosevelt Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tenterfield Terrier",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tenterfield Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Terceira Mastiff",
        "MASTI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Terceira Mastiff Mix",
        "MASTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Thai Bangkaew Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Thai Bangkaew Dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Thai Ridgeback dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Thai Ridgeback dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tibetan Mastiff",
        "MASTI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tibetan Mastiff Mix",
        "MASTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tibetan Spaniel",
        "TIBSP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tibetan Spaniel Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tibetan Terrier",
        "TIBTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tibetan Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tornjak",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tornjak Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tosa",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tosa Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Toy Fox Terrier",
        "FOXTT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Toy Fox Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Toy Manchester Terrier",
        "MANTT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Toy Manchester Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Transylvanian Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Transylvanian Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Treeing Cur",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Treeing Cur Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Treeing Feist",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Treeing Feist Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Treeing Tennessee Brindle",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Treeing Tennessee Brindle Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Treeing Walker Coonhound",
        "TREWC",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Treeing Walker Coonhound Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tyrolean Hound",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tyrolean Hound Mix",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Uruguayan Cimarron",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Uruguayan Cimarron Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Valencian rat hunting dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Valencian rat hunting dog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Volpino Italiano",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Volpino Italiano Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Weimaraner Mix Long-haired",
        "WEIMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Weimaraner Mix Short-haired",
        "WEIMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Weimaraner Long-haired",
        "WEIMA",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Weimaraner Short-haired",
        "WEIMA",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Corgi",
        "WELCO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Corgi Mix",
        "WELCX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Corgi Mix Cardigan",
        "WELCX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Corgi Mix Pembroke",
        "WELCX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Corgi Cardigan",
        "WELCC",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Corgi Pembroke",
        "WELCP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Sheepdog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Sheepdog Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Springer Spaniel",
        "SPRSW",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Springer Spaniel Mix",
        "SPRSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Terrier",
        "WELTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Terrier Mix",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "West Highland White Terrier",
        "WEHWT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "West Highland White Terrier Mix",
        "WEHWX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "West Siberian LaÃ¯ka",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "West Siberian LaÃ¯ka Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Westphalian Dachsbracke",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Westphalian Dachsbracke Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Wetterhoun",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Wetterhoun Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Whippet",
        "WHIPP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Whippet Mix",
        "WHIPX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "White Shepherd",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "White Shepherd Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "White Swiss Shepherd Dog",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "White Swiss Shepherd Dog Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Wolf Mix",
        "WOLHY",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Yakutian Laika",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Yakutian Laika Mix",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Yorkipoo",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Yorkipoo Mix",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Yorkshire Terrier",
        "YORTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Yorkshire Terrier Mix",
        "YORTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Yugoslavian Shepherd Dog-Sharplanina",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Yugoslavian Shepherd Dog-Sharplanina Mix",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dog",
        "DOG",
        "null",
        "species",
        "zoetis"
    ],
    [
        "Cat",
        "CAT",
        "null",
        "species",
        "zoetis"
    ],
    [
        "Affenpinscher",
        "1ddbf413-d7ed-11ea-87e2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Affenpinscher Mix",
        "1ddc69df-d7ed-11ea-9a16-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Afghan Hound",
        "1ddbf414-d7ed-11ea-8e57-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Afghan Hound Mix",
        "1ddc69e0-d7ed-11ea-8621-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Afghan Shepherd",
        "1ddc699b-d7ed-11ea-9b8c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Afghan Shepherd Mix",
        "1ddcdf22-d7ed-11ea-8a6e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Airedale Terrier",
        "1ddbf415-d7ed-11ea-b281-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Airedale Terrier Mix",
        "1ddc69e1-d7ed-11ea-9c19-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Akbash",
        "1f9348b9-8d3b-11ed-b601-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Akbash Mix",
        "8f50afec-52a5-11ee-be56-0242ac120002",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Alaskan Klee Kai",
        "ca437109-8dc9-11ed-9ceb-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Alaskan Klee Kai Mix",
        "ca45bae3-8dc9-11ed-b01e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Alaskan Malamute",
        "1ddbf416-d7ed-11ea-8f92-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Alaskan Malamute Mix",
        "1ddc69e2-d7ed-11ea-98d3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Alpine Dachsbracke",
        "1ddbf417-d7ed-11ea-9148-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Alpine Dachsbracke Mix",
        "1ddc69e3-d7ed-11ea-9e2a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Akita",
        "1ddbf418-d7ed-11ea-a8a2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Akita Mix",
        "1ddc69e4-d7ed-11ea-8fb6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Bulldog",
        "1ddbf419-d7ed-11ea-971b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Bulldog Mix",
        "1ddc69e5-d7ed-11ea-999d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Cocker Spaniel",
        "1ddbf41a-d7ed-11ea-b0b3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Cocker Spaniel Mix",
        "1ddc69e6-d7ed-11ea-bfe5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Eskimo Dog",
        "1ddbf41b-d7ed-11ea-bff4-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Eskimo Dog Mix",
        "1ddc69e7-d7ed-11ea-8c38-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Foxhound",
        "1ddbf41c-d7ed-11ea-bd3d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Foxhound Mix",
        "1ddc69e8-d7ed-11ea-8c93-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American German Shepherd Dog",
        "1ddbf41f-d7ed-11ea-ab2c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American German Shepherd Dog Mix",
        "1ddc69eb-d7ed-11ea-9454-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Hairless Terrier",
        "1ddc69ab-d7ed-11ea-ae8c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Hairless Terrier Mix",
        "1ddcdf32-d7ed-11ea-a2f3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Indian Dog",
        "746a8ca6-edf2-11ed-a05b-0242ac120003",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Indian Dog Mix",
        "746a8db4-edf2-11ed-a05b-0242ac120003",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Leopard Hound",
        "ca72618a-8dc9-11ed-b20b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Leopard Hound Mix",
        "ca739a06-8dc9-11ed-b0c1-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Pit Bull Terrier",
        "ca836606-8dc9-11ed-ab7b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Pit Bull Terrier Mix",
        "ca849e83-8dc9-11ed-956f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Staffordshire Terrier",
        "1ddbf41d-d7ed-11ea-bdaf-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Staffordshire Terrier Mix",
        "1ddc69e9-d7ed-11ea-9552-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Water Spaniel",
        "1ddbf41e-d7ed-11ea-8345-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Water Spaniel Mix",
        "1ddc69ea-d7ed-11ea-af0f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Anatolian Shepherd Dog",
        "1ddc699c-d7ed-11ea-9cb1-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Anatolian Shepherd Dog Mix",
        "1ddcdf23-d7ed-11ea-96ce-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Anglo-FranÃ§ais de Moyen VÃ©nerie",
        "ca4d5c24-8dc9-11ed-bafe-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Anglo-FranÃ§ais de Moyen VÃ©nerie Mix",
        "ca4ebba6-8dc9-11ed-9325-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Anglo-FranÃ§ais de Petite VÃ©nerie",
        "ca946a60-8dc9-11ed-95d3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Anglo-FranÃ§ais de Petite VÃ©nerie Mix",
        "ca95a2e0-8dc9-11ed-bcca-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Appenzell Cattle Dog",
        "1ddbf420-d7ed-11ea-b48a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Appenzell Cattle Dog Mix",
        "1ddc69ec-d7ed-11ea-a2db-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ariege Hound",
        "1ddbf421-d7ed-11ea-950c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ariege Hound Mix",
        "1ddc69ed-d7ed-11ea-82c2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ariege Pointing Dog",
        "1ddbf422-d7ed-11ea-acdb-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ariege Pointing Dog Mix",
        "1ddc69ee-d7ed-11ea-b3e3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Artesian-Norman Basset",
        "1ddbf423-d7ed-11ea-9b30-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Artesian-Norman Basset Mix",
        "1ddc69ef-d7ed-11ea-952e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Artois Hound",
        "1ddbf424-d7ed-11ea-94f6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Artois Hound Mix",
        "1ddc69f0-d7ed-11ea-9ddf-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Atlas Shepherd Dog",
        "1ddbf425-d7ed-11ea-a8fc-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Atlas Shepherd Dog Mix",
        "1ddc69f1-d7ed-11ea-9da4-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Cattle Dog",
        "1ddbf426-d7ed-11ea-ac5b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Cattle Dog Mix",
        "1ddc69f2-d7ed-11ea-b863-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Kelpie",
        "1ddbf427-d7ed-11ea-b2bf-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Kelpie Mix",
        "1ddc69f3-d7ed-11ea-b540-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Shepherd",
        "1ddbf428-d7ed-11ea-8e47-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Shepherd Mix",
        "1ddc69f4-d7ed-11ea-8725-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Silky Terrier",
        "1ddbf429-d7ed-11ea-b05e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Silky Terrier Mix",
        "1ddc69f5-d7ed-11ea-a453-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Stumpy Tail Cattle Dog",
        "1ddbf42a-d7ed-11ea-9fe5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Stumpy Tail Cattle Dog Mix",
        "1ddc69f6-d7ed-11ea-afe0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Terrier",
        "1ddbf42b-d7ed-11ea-bda7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Terrier Mix",
        "1ddc69f7-d7ed-11ea-8cb7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian working kelpie",
        "1ddbf42c-d7ed-11ea-9660-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian working kelpie Mix",
        "1ddc907e-d7ed-11ea-9a10-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Austrian Black and Tan Hound",
        "1ddbf42d-d7ed-11ea-8268-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Austrian Black and Tan Hound Mix",
        "1ddc907f-d7ed-11ea-9111-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Austrian Pinscher",
        "1ddbf42e-d7ed-11ea-8e5c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Austrian Pinscher Mix",
        "1ddc9080-d7ed-11ea-8dc0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Auvergne Pointing Dog",
        "1ddbf42f-d7ed-11ea-ae59-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Auvergne Pointing Dog Mix",
        "1ddc9081-d7ed-11ea-b05d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Azawakh",
        "1ddbf430-d7ed-11ea-9f2f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Azawakh Mix",
        "1ddc9082-d7ed-11ea-bc0b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bosnian Coarse-Haired Hound",
        "1ddbf451-d7ed-11ea-b28b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Barbet",
        "1ddbf431-d7ed-11ea-bde6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Barbet Mix",
        "1ddc9083-d7ed-11ea-aff4-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Basenji",
        "1ddbf432-d7ed-11ea-a3ab-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Basenji Mix",
        "1ddc9084-d7ed-11ea-b8f5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Basque Shepherd Dog",
        "1ddc699d-d7ed-11ea-9cb7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Basque Shepherd Dog Mix",
        "1ddcdf24-d7ed-11ea-aa13-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Basset Griffon Vendeen",
        "1ddc69d1-d7ed-11ea-b72b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Basset Griffon Vendeen Mix",
        "1ddd05c4-d7ed-11ea-a8a8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Basset Hound",
        "1ddbf433-d7ed-11ea-bff4-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Basset Hound Mix",
        "1ddc9085-d7ed-11ea-b6c5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bavarian Mountain Scenthound",
        "1ddbf434-d7ed-11ea-8322-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bavarian Mountain Scenthound Mix",
        "1ddc9086-d7ed-11ea-94ed-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Beagle",
        "1ddbf435-d7ed-11ea-ae96-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Beagle Mix",
        "1ddc9087-d7ed-11ea-a90d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Beagle-Harrier",
        "1ddbf436-d7ed-11ea-80e2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Beagle-Harrier Mix",
        "1ddc9088-d7ed-11ea-bf85-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bearded Collie",
        "1ddbf437-d7ed-11ea-963b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bearded Collie Mix",
        "1ddc9089-d7ed-11ea-8e3b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Beauceron",
        "1ddbf438-d7ed-11ea-bb65-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Beauceron Mix",
        "1ddc908a-d7ed-11ea-986a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bedlington Terrier",
        "1ddbf439-d7ed-11ea-aaf2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bedlington Terrier Mix",
        "1ddc908b-d7ed-11ea-8733-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Griffon",
        "1ddbf43a-d7ed-11ea-85b1-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Griffon Mix",
        "1ddc908c-d7ed-11ea-8cf6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Shepherd Dog",
        "5c24eb8c-d5bd-11ea-83fb-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Shepherd Dog Groenendael",
        "1ddc1b40-d7ed-11ea-aba5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Shepherd Dog Malinois",
        "1ddc4250-d7ed-11ea-beb5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Shepherd Dog Mix",
        "8e4c9d64-e54e-11ed-b5ea-0242ac120002",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Shepherd Dog Mix Tervuren",
        "1ddcdf1f-d7ed-11ea-b2e1-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Shepherd Dog Tervuren",
        "1ddc6998-d7ed-11ea-9afd-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bergamasco Shepherd Dog",
        "1ddbf43b-d7ed-11ea-b8e4-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bergamasco Shepherd Dog Mix",
        "1ddc908d-d7ed-11ea-8a94-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Berger Picard",
        "1ddbf440-d7ed-11ea-a229-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Berger Picard Mix",
        "1ddc9092-d7ed-11ea-a544-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bernadoodle",
        "1ddc69d8-d7ed-11ea-8316-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bernadoodle Mix",
        "1ddd05cb-d7ed-11ea-9d60-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bernese Hound",
        "1ddbf441-d7ed-11ea-b1d3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bernese Hound Mix",
        "1ddc9093-d7ed-11ea-b86f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bernese Mountain Dog",
        "1ddbf442-d7ed-11ea-aa83-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bernese Mountain Dog Mix",
        "1ddc9094-d7ed-11ea-bcc9-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bichon Frise",
        "1ddbf443-d7ed-11ea-9447-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bichon Frise Mix",
        "1ddc9095-d7ed-11ea-91dd-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Biewer Terrier",
        "ca85fe25-8dc9-11ed-bf42-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Biewer Terrier Mix",
        "ca873696-8dc9-11ed-ac76-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Billy",
        "1ddbf444-d7ed-11ea-bd70-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Billy Mix",
        "1ddc9096-d7ed-11ea-9927-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Black Mouth Cur",
        "ca80a707-8dc9-11ed-9265-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Black Mouth Cur Mix",
        "ca820673-8dc9-11ed-8c6d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Elkhound Mix black",
        "1ddcb7fe-d7ed-11ea-9015-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Black Russian Terrier",
        "1ddc69ac-d7ed-11ea-995e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Black Russian Terrier Mix",
        "1ddcdf33-d7ed-11ea-bcd9-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Black and Tan Coonhound",
        "1ddbf445-d7ed-11ea-897f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Black and Tan Coonhound Mix",
        "1ddc9097-d7ed-11ea-a889-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Black and Tan English Toy Terrier",
        "1ddc69ae-d7ed-11ea-b889-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Black and Tan English Toy Terrier Mix",
        "1ddcdf35-d7ed-11ea-aaf7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bloodhound",
        "1ddbf446-d7ed-11ea-a5ec-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bloodhound Mix",
        "1ddc9098-d7ed-11ea-b80d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Blue Gascony Basset",
        "1ddbf447-d7ed-11ea-9336-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Blue Gascony Basset Mix",
        "1ddc9099-d7ed-11ea-bda2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Blue Gascony Griffon",
        "1ddbf448-d7ed-11ea-b2ad-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Blue Gascony Griffon Mix",
        "1ddc909a-d7ed-11ea-9333-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Blue Picardy Spaniel",
        "1ddbf449-d7ed-11ea-8452-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Blue Picardy Spaniel Mix",
        "1ddc909b-d7ed-11ea-8960-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bluetick Coonhound",
        "1ddbf44a-d7ed-11ea-9789-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bluetick Coonhound Mix",
        "1ddc909c-d7ed-11ea-9f4b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Boerboel",
        "746a8044-edf2-11ed-a05b-0242ac120003",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Boerboel Mix",
        "746a8346-edf2-11ed-a05b-0242ac120003",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bohemian Shepherd",
        "1ddbf43c-d7ed-11ea-a955-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bohemian Shepherd Mix",
        "1ddc908e-d7ed-11ea-8d42-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bohemian Wire-haired Pointing Griffon",
        "1ddbf44c-d7ed-11ea-9732-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bohemian Wire-haired Pointing Griffon Mix",
        "1ddc909e-d7ed-11ea-994d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bolognese",
        "1ddbf44d-d7ed-11ea-8b4b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bolognese Mix",
        "1ddc909f-d7ed-11ea-a80e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Border Collie",
        "1ddbf44e-d7ed-11ea-98bb-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Border Collie Mix",
        "1ddc90a0-d7ed-11ea-a8e0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Border Terrier",
        "1ddbf44f-d7ed-11ea-9e94-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Border Terrier Mix",
        "1ddc90a1-d7ed-11ea-965d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Borzoi",
        "1ddbf450-d7ed-11ea-82a1-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Borzoi Mix",
        "1ddc90a2-d7ed-11ea-95de-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bosnian Coarse-Haired Hound Mix",
        "1ddc90a3-d7ed-11ea-a0f5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Boston Terrier",
        "1ddbf452-d7ed-11ea-99a6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Boston Terrier Mix",
        "1ddc90a4-d7ed-11ea-a1b0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bourbonnais Pointing Dog Mix",
        "1ddc90a5-d7ed-11ea-9bd9-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bouvier des Ardennes",
        "1ddbf454-d7ed-11ea-98a3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bouvier des Ardennes Mix",
        "1ddc90a6-d7ed-11ea-a30a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bouvier des Flandres",
        "1ddbf455-d7ed-11ea-9d32-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bouvier des Flandres Mix",
        "1ddc90a7-d7ed-11ea-96be-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Boxer",
        "1ddbf456-d7ed-11ea-bd2a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Boxer Mix",
        "1ddc90a8-d7ed-11ea-a8a3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Boykin Spaniel",
        "1ddc69bf-d7ed-11ea-b64a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Boykin Spaniel Mix",
        "1ddcdf46-d7ed-11ea-889d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bracco Italiano",
        "1ddbf457-d7ed-11ea-9073-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bracco Italiano Mix",
        "1ddc90a9-d7ed-11ea-b995-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bourbonnais Pointing Dog",
        "1ddbf453-d7ed-11ea-a634-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Brazilian Terrier",
        "1ddbf458-d7ed-11ea-b356-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Brazilian Terrier Mix",
        "1ddc90aa-d7ed-11ea-8d4a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Briard",
        "1ddbf459-d7ed-11ea-b67e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Briard Mix",
        "1ddc90ab-d7ed-11ea-b707-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Briquet Griffon Vendeen",
        "1ddc69d0-d7ed-11ea-99f5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Briquet Griffon Vendeen Mix",
        "1ddd05c3-d7ed-11ea-ad9c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Brittany",
        "1ddbf45a-d7ed-11ea-a8bc-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Brittany Mix",
        "1ddc90ac-d7ed-11ea-afc0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Broholmer",
        "1ddbf45b-d7ed-11ea-b8ca-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Broholmer Mix",
        "1ddc90ad-d7ed-11ea-8ad4-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Brussels Griffon",
        "1ddc1b32-d7ed-11ea-af54-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Brussels Griffon Mix",
        "1ddc90ae-d7ed-11ea-8390-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bucovina Shepherd Dog",
        "1ddc699e-d7ed-11ea-a419-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bucovina Shepherd Dog Mix",
        "1ddcdf25-d7ed-11ea-bdf2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bull Terrier Mix Standard",
        "1ddcdef7-d7ed-11ea-93a0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bull Terrier Standard",
        "1ddc6970-d7ed-11ea-aeae-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bullmastiff",
        "1ddc1b34-d7ed-11ea-9dbe-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bullmastiff Mix",
        "1ddc90b0-d7ed-11ea-937f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Burgos Pointing Dog",
        "1ddc1b35-d7ed-11ea-a1ad-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Burgos Pointing Dog Mix",
        "1ddc90b1-d7ed-11ea-9d66-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cairn Terrier",
        "1ddc1b33-d7ed-11ea-bf8d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cairn Terrier Mix",
        "1ddc90af-d7ed-11ea-b363-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Canaan Dog",
        "1ddc1b37-d7ed-11ea-83b2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Canaan Dog Mix",
        "1ddc90b3-d7ed-11ea-9cb2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Canadian Eskimo Dog",
        "1ddc1b38-d7ed-11ea-90e3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Canadian Eskimo Dog Mix",
        "1ddc90b4-d7ed-11ea-b786-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Canarian Warren Hound",
        "1ddc1b39-d7ed-11ea-92b3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Canarian Warren Hound Mix",
        "1ddc90b5-d7ed-11ea-844d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cane corso",
        "1ddc1b3a-d7ed-11ea-86a8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cane corso Mix",
        "1ddc90b6-d7ed-11ea-945f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cantabrian Water Dog",
        "1ddc69c5-d7ed-11ea-b691-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cantabrian Water Dog Mix",
        "1ddcdf4c-d7ed-11ea-8089-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cao Fila de Sao Miguel",
        "1ddc1b3b-d7ed-11ea-8ff5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cao Fila de Sao Miguel Mix",
        "1ddc90b7-d7ed-11ea-9e57-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Corgi Mix Cardigan",
        "1ddcdf10-d7ed-11ea-9dde-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Carolina Dog",
        "ca4fcd6c-8dc9-11ed-995f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Carolina Dog Mix",
        "ca51a216-8dc9-11ed-8000-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Carpathian Shepherd Dog",
        "1ddc699f-d7ed-11ea-a137-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Carpathian Shepherd Dog Mix",
        "1ddcdf26-d7ed-11ea-9d04-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Castro Laboreiro Dog",
        "1ddc1b3c-d7ed-11ea-ac0e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Castro Laboreiro Dog Mix",
        "1ddc90b8-d7ed-11ea-ad72-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Catahoula Leopard Dog",
        "b3874d6c-1cad-11ec-89c7-302432eba3e9",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Catahoula Leopard Dog Mix",
        "f74b4041-1cad-11ec-8265-302432eba3e9",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Catalan Sheepdog",
        "1ddc1b3d-d7ed-11ea-84f6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Catalan Sheepdog Mix",
        "1ddc90b9-d7ed-11ea-8690-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Caucasian Shepherd Dog",
        "1ddbf43d-d7ed-11ea-92a6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Caucasian Shepherd Dog Mix",
        "1ddc908f-d7ed-11ea-8f44-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cavalier King Charles Spaniel",
        "1ddc1b3f-d7ed-11ea-bae7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cavalier King Charles Spaniel Mix",
        "1ddc90bb-d7ed-11ea-b434-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Central Asia Shepherd Dog",
        "1ddbf43e-d7ed-11ea-b90f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Central Asia Shepherd Dog Mix",
        "1ddc9090-d7ed-11ea-9e75-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cesky Terrier",
        "1ddc1b36-d7ed-11ea-b52a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cesky Terrier Mix",
        "1ddc90b2-d7ed-11ea-a032-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cheasapeake Bay Retriever",
        "1ddc1b42-d7ed-11ea-9fdc-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cheasapeake Bay Retriever Mix",
        "1ddc90be-d7ed-11ea-839c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chihuahua",
        "1ddc1b43-d7ed-11ea-a698-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chihuahua Mix",
        "1ddc90bf-d7ed-11ea-9e65-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chilean Terrier",
        "1ddc69ad-d7ed-11ea-8b38-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chilean Terrier Mix",
        "1ddcdf34-d7ed-11ea-9f45-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chinese Crested",
        "1ddc1b46-d7ed-11ea-9990-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chinese Crested Hairless",
        "1ddc1b47-d7ed-11ea-acf0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chinese Crested Mix",
        "1ddc90c2-d7ed-11ea-ad96-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chinese Crested Powderpuff",
        "1ddc1b48-d7ed-11ea-82ec-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chinook",
        "ca5315e1-8dc9-11ed-90c7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chinook Mix",
        "ca544e63-8dc9-11ed-b87f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chow Chow",
        "1ddc1b49-d7ed-11ea-bcff-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chow Chow Mix",
        "1ddc90c5-d7ed-11ea-af06-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cirneco dell'Etna",
        "1ddc1b4a-d7ed-11ea-b3ff-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cirneco dell'Etna Mix",
        "1ddc90c6-d7ed-11ea-bc36-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Clumber Spaniel",
        "1ddc1b4b-d7ed-11ea-8963-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Clumber Spaniel Mix",
        "1ddc90c7-d7ed-11ea-b1a3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cockapoo",
        "1ddc1b4c-d7ed-11ea-a4ce-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cockapoo Mix",
        "1ddc90c8-d7ed-11ea-abdf-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Continental Toy Spaniel Mix Papillon",
        "1ddc90cb-d7ed-11ea-ba6f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Continental Toy Spaniel Papillon",
        "1ddc1b4f-d7ed-11ea-90e1-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Coonhound",
        "ca56985b-8dc9-11ed-82da-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Coonhound Mix",
        "ca584877-8dc9-11ed-8c56-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Coton de TulÃ©ar",
        "1ddc1b51-d7ed-11ea-b6e3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Coton de TulÃ©ar Mix",
        "1ddc90cd-d7ed-11ea-a20d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Croatian Sheepdog",
        "1ddc1b52-d7ed-11ea-ac30-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Croatian Sheepdog Mix",
        "1ddc90ce-d7ed-11ea-af7e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Crossbred",
        "1ddc1b53-d7ed-11ea-984b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Crossbred Mix",
        "1ddc90cf-d7ed-11ea-94c4-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Curly Coated Retriever",
        "1ddc1b54-d7ed-11ea-8d0c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Curly Coated Retriever Mix",
        "1ddc90d0-d7ed-11ea-a638-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Czechoslovakian Wolfdog",
        "1ddc1b55-d7ed-11ea-b718-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Czechoslovakian Wolfdog Mix",
        "1ddc90d1-d7ed-11ea-a8a6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund",
        "1ddc1b56-d7ed-11ea-bc76-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix",
        "1ddc90d2-d7ed-11ea-b4fe-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Long-haired Miniature",
        "1ddc1b5d-d7ed-11ea-a14c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dalmatian",
        "1ddc1b63-d7ed-11ea-bd2a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dalmatian Mix",
        "1ddc90df-d7ed-11ea-b529-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dandie Dinmont Terrier",
        "1ddc1b41-d7ed-11ea-84b9-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dandie Dinmont Terrier Mix",
        "1ddc90bd-d7ed-11ea-8021-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Danish-Swedish Farmdog",
        "1ddc1b65-d7ed-11ea-9a4a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Danish-Swedish Farmdog Mix",
        "1ddc90e1-d7ed-11ea-80df-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Deutsch Stichelhaar",
        "746a86d4-edf2-11ed-a05b-0242ac120003",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Deutsch Stichelhaar Mix",
        "746a87f6-edf2-11ed-a05b-0242ac120003",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Doberman Pinscher",
        "1ddc1b66-d7ed-11ea-a1e2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Doberman Pinscher Mix",
        "1ddc90e2-d7ed-11ea-866d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dogo Argentino",
        "1ddc1b67-d7ed-11ea-863d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dogo Argentino Mix",
        "1ddc90e3-d7ed-11ea-913f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dogo Canario",
        "1ddc1b68-d7ed-11ea-8cef-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dogo Canario Mix",
        "1ddc90e4-d7ed-11ea-b1aa-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dogue De Bordeaux",
        "1ddc1b69-d7ed-11ea-ba8a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dogue De Bordeaux Mix",
        "1ddc90e5-d7ed-11ea-a520-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Drentse Partridge Dog",
        "1ddc1b6a-d7ed-11ea-aa9d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Drentse Partridge Dog Mix",
        "1ddc90e6-d7ed-11ea-8f58-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Drever",
        "1ddc1b6b-d7ed-11ea-8ff5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Drever Mix",
        "1ddc90e7-d7ed-11ea-9ff9-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dunker Hound",
        "1ddc1b6c-d7ed-11ea-906e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dunker Hound Mix",
        "1ddc90e8-d7ed-11ea-95d8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dutch Shepherd Dog",
        "1ddc1b96-d7ed-11ea-9a30-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dutch Shepherd Dog Mix",
        "1ddc9112-d7ed-11ea-80bd-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "East European Shepherd",
        "1ddc69a0-d7ed-11ea-9bec-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "East European Shepherd Mix",
        "1ddcdf27-d7ed-11ea-956f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "East Siberian LaÃ¯ka",
        "1ddc1b71-d7ed-11ea-bddd-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "East Siberian LaÃ¯ka Mix",
        "1ddc90ed-d7ed-11ea-b936-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Elo Dog",
        "1ddc1b72-d7ed-11ea-9426-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Elo Mix",
        "1ddc90ee-d7ed-11ea-aaec-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Bulldog",
        "1ddc1b73-d7ed-11ea-9087-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Bulldog Mix",
        "1ddc90ef-d7ed-11ea-821e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Cocker Spaniel",
        "1ddc1b74-d7ed-11ea-b918-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Cocker Spaniel Mix",
        "1ddc90f0-d7ed-11ea-ae7f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Coonhound",
        "ca5980f7-8dc9-11ed-842a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Coonhound Mix",
        "ca5b2ea8-8dc9-11ed-8e17-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Foxhound",
        "1ddc1b75-d7ed-11ea-bd90-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Foxhound Mix",
        "1ddc90f1-d7ed-11ea-a54d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Mastiff",
        "1ddc4264-d7ed-11ea-bb55-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Mastiff Mix",
        "1ddcb7e4-d7ed-11ea-953d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Pointer",
        "1ddc1b76-d7ed-11ea-b737-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Pointer Mix",
        "1ddc90f2-d7ed-11ea-bdbe-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Setter",
        "1ddc1b77-d7ed-11ea-affa-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Setter Mix",
        "1ddc90f3-d7ed-11ea-8375-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Shepherd",
        "1ddc69a1-d7ed-11ea-a897-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Shepherd Mix",
        "1ddcdf28-d7ed-11ea-88d3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Springer Spaniel",
        "1ddc1b78-d7ed-11ea-bff2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Springer Spaniel Mix",
        "1ddc90f4-d7ed-11ea-a835-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Toy Spaniel",
        "1ddc69c3-d7ed-11ea-8a52-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Toy Spaniel Mix",
        "1ddcdf4a-d7ed-11ea-ae4a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Toy Terrier",
        "1ddc1b64-d7ed-11ea-8bb0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Toy Terrier Mix",
        "1ddc90e0-d7ed-11ea-aaf9-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Entlebuch Mountain Dog Mix",
        "1ddc90f6-d7ed-11ea-81ab-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Entlebuch Mountain Dog",
        "1ddc1b7a-d7ed-11ea-8a12-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Estonian Hound",
        "1ddc1b7b-d7ed-11ea-8476-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Estonian Hound Mix",
        "1ddc90f7-d7ed-11ea-abe5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Estrela Mountain Dog",
        "1ddc1b7c-d7ed-11ea-af52-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Estrela Mountain Dog Mix",
        "1ddc90f8-d7ed-11ea-af1a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Eurasian",
        "1ddc1b7d-d7ed-11ea-9438-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Eurasian Mix",
        "1ddc90f9-d7ed-11ea-bce8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Landseer Mix European Continental type",
        "1ddcb7de-d7ed-11ea-bd2b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "European German Shepherd Dog",
        "1ddbf44b-d7ed-11ea-a302-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "European German Shepherd Dog Mix",
        "1ddc909d-d7ed-11ea-a1e4-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fawn Brittany Basset",
        "1ddc1b7e-d7ed-11ea-892a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fawn Brittany Basset Mix",
        "1ddc90fa-d7ed-11ea-9f79-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fawn Brittany Griffon",
        "1ddc1b7f-d7ed-11ea-b2ca-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fawn Brittany Griffon Mix",
        "1ddc90fb-d7ed-11ea-be6c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Feist",
        "ca67c600-8dc9-11ed-9a9d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Feist Mix",
        "ca694ca9-8dc9-11ed-87e0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Field Spaniel",
        "1ddc1b80-d7ed-11ea-80f7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Field Spaniel Mix",
        "1ddc90fc-d7ed-11ea-96e6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fila Brasileiro",
        "1ddc1b81-d7ed-11ea-a2c4-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fila Brasileiro Mix",
        "1ddc90fd-d7ed-11ea-a6aa-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Finnish Hound",
        "1ddc1b82-d7ed-11ea-b83d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Finnish Hound Mix",
        "1ddc90fe-d7ed-11ea-99f3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Finnish Lapphund",
        "1ddc1b83-d7ed-11ea-aed7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Finnish Lapphund Mix",
        "1ddc90ff-d7ed-11ea-ade7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Finnish Spitz",
        "1ddc1b84-d7ed-11ea-bf54-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Finnish Spitz Mix",
        "1ddc9100-d7ed-11ea-931b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Flat Coated Retriever",
        "1ddc1b85-d7ed-11ea-aaf3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Flat Coated Retriever Mix",
        "1ddc9101-d7ed-11ea-816d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fox Terrier",
        "1ddc69be-d7ed-11ea-a4b1-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fox Terrier Mix",
        "1ddcdf45-d7ed-11ea-938a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Bulldog",
        "1ddc1b88-d7ed-11ea-a5b0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Bulldog Mix",
        "1ddc9104-d7ed-11ea-a432-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Hound Mix Tricolour",
        "1ddc9109-d7ed-11ea-a51b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Hound Mix White and Black",
        "1ddc910a-d7ed-11ea-99db-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Hound Mix White and Orange",
        "1ddc910b-d7ed-11ea-ac0d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Hound Tricolour",
        "1ddc1b8d-d7ed-11ea-b836-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Hound White and Black",
        "1ddc1b8e-d7ed-11ea-bb6b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Hound White and Orange",
        "1ddc1b8f-d7ed-11ea-bb22-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Pointing Dog",
        "1ddc1b89-d7ed-11ea-bc49-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Pointing Dog Gascogne",
        "1ddc1b8a-d7ed-11ea-b7b0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Pointing Dog Mix",
        "1ddc9105-d7ed-11ea-a81d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Pointing Dog Pyrenean",
        "1ddc1b8b-d7ed-11ea-85db-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Spaniel",
        "1ddc1b8c-d7ed-11ea-aea2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Spaniel Mix",
        "1ddc9108-d7ed-11ea-8a6e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Wire-haired Korthals Pointing Griffon",
        "1ddc1b90-d7ed-11ea-af9a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Wire-haired Korthals Pointing Griffon Mix",
        "1ddc910c-d7ed-11ea-a7e6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Galician Shepherd Dog",
        "1ddc69a2-d7ed-11ea-aaa8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Galician Shepherd Dog Mix",
        "1ddcdf29-d7ed-11ea-8c86-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Garafian Shepherd",
        "1ddc69a3-d7ed-11ea-bf6e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Garafian Shepherd Mix",
        "1ddcdf2a-d7ed-11ea-bfce-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Pointing Dog Mix Gascogne",
        "1ddc9106-d7ed-11ea-8c2b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Gascon Saintongeois",
        "1ddc1b91-d7ed-11ea-aae1-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Gascon Saintongeois Mix",
        "1ddc910d-d7ed-11ea-bbed-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Georgian Shepherd",
        "1ddc69a4-d7ed-11ea-a97e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Georgian Shepherd Mix",
        "1ddcdf2b-d7ed-11ea-afaa-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Hound",
        "1ddc1b92-d7ed-11ea-98b1-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Hound Mix",
        "1ddc910e-d7ed-11ea-97da-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Hunting Terrier",
        "1ddc1b79-d7ed-11ea-96cd-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Hunting Terrier Mix",
        "1ddc90f5-d7ed-11ea-8241-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Long-haired Pointer",
        "1ddc1b94-d7ed-11ea-9193-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Long-haired Pointer Mix",
        "1ddc9110-d7ed-11ea-8bde-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Pinscher",
        "1ddc1b95-d7ed-11ea-abc9-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Pinscher Mix",
        "1ddc9111-d7ed-11ea-be99-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Shepherd Dog",
        "1ddc1b3e-d7ed-11ea-a4cd-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Shepherd Dog Mix",
        "1ddc90ba-d7ed-11ea-881a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Shepherd Dog Mix Short-haired",
        "1ddcdf01-d7ed-11ea-a8b7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Short-haired Pointer",
        "1ddc1b9a-d7ed-11ea-8144-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Short-haired Pointer Mix",
        "1ddcb795-d7ed-11ea-b9cd-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spaniel",
        "1ddc1b9b-d7ed-11ea-a8f4-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spaniel Mix",
        "1ddcb796-d7ed-11ea-8c2e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spitz",
        "1ddc1b9c-d7ed-11ea-86cd-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spitz Gross",
        "1ddc1b9d-d7ed-11ea-ad0d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spitz Mix",
        "1ddcb797-d7ed-11ea-b1da-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spitz Mix Pomeranian",
        "1ddcb79a-d7ed-11ea-a6c8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spitz Mix Gross",
        "1ddcb798-d7ed-11ea-9c42-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spitz Mix Miniature",
        "1ddcb799-d7ed-11ea-ae4b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spitz Mix Mittel",
        "1ddd05c2-d7ed-11ea-a055-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spitz Pomeranian",
        "1ddc1b9f-d7ed-11ea-b60f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spitz Miniature",
        "1ddc1b9e-d7ed-11ea-befd-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Wire-Haired Pointer",
        "1ddc1ba0-d7ed-11ea-9c88-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Wire-Haired Pointer Mix",
        "1ddcb79b-d7ed-11ea-a048-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ghadrejani Dog",
        "0d290cc6-63f8-11ec-9c73-7085c2a1b8e0",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ghadrejani Dog Mix",
        "46578df8-63f8-11ec-a061-7085c2a1b8e0",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Glen of Imaal Terrier",
        "1ddc69af-d7ed-11ea-8977-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Glen of Imaal Terrier Mix",
        "1ddcdf36-d7ed-11ea-a8a9-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Golden Retriever",
        "1ddc1ba2-d7ed-11ea-9c46-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Golden Retriever Mix",
        "1ddcb79d-d7ed-11ea-bf40-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Goldendoodle",
        "734e4977-3bf8-11ec-84ee-7085c2a1b8e0",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Goldendoodle Mix",
        "73c13018-3bf8-11ec-9e98-7085c2a1b8e0",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Gordon Setter",
        "1ddc1ba3-d7ed-11ea-8bd7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Gordon Setter Mix",
        "1ddcb79e-d7ed-11ea-89f5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Grand Basset Griffon Vendeen",
        "1ddc1ba4-d7ed-11ea-8003-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Grand Basset Griffon Vendeen Mix",
        "1ddcb79f-d7ed-11ea-a219-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Grand Griffon Vendeen",
        "1ddc1ba5-d7ed-11ea-b43b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Grand Griffon Vendeen Mix",
        "1ddcb7a0-d7ed-11ea-ae47-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Anglo-French White and Orange Hound",
        "1ddc1ba8-d7ed-11ea-abfa-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Anglo-French Tricolour Hound",
        "1ddc1ba6-d7ed-11ea-9dd0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Anglo-French Tricolour Hound Mix",
        "1ddcb7a1-d7ed-11ea-b895-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Anglo-French White and Black Hound",
        "1ddc1ba7-d7ed-11ea-bb0f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Anglo-French White and Black Hound Mix",
        "1ddcb7a2-d7ed-11ea-846c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Anglo-French White and Orange Hound Mix",
        "1ddcb7a3-d7ed-11ea-8140-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Dane",
        "1ddc1ba9-d7ed-11ea-91ed-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Dane Mix",
        "1ddcb7a4-d7ed-11ea-a49f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Gascony Hound",
        "1ddc1baa-d7ed-11ea-b388-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Gascony Hound Mix",
        "1ddcb7a5-d7ed-11ea-8c85-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Pyrenees Pyrenean Mountain Dog",
        "1ddc1bab-d7ed-11ea-8d0b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Pyrenees Pyrenean Mountain Dog Mix",
        "1ddcb7a6-d7ed-11ea-b751-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Swiss Mountain Dog",
        "1ddc1bac-d7ed-11ea-9da3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Swiss Mountain Dog Mix",
        "1ddcb7a7-d7ed-11ea-939c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Greek Shepherd",
        "1ddc69a5-d7ed-11ea-8e81-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Greek Shepherd Mix",
        "1ddcdf2c-d7ed-11ea-bc97-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Greenland Dog",
        "1ddc1bad-d7ed-11ea-aca8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Greenland Dog Mix",
        "1ddcb7a8-d7ed-11ea-96aa-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Elkhound Mix grey",
        "1ddcb7ff-d7ed-11ea-946f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Greyhound",
        "1ddc1bae-d7ed-11ea-bc95-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Greyhound Mix",
        "1ddcb7a9-d7ed-11ea-9ded-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Griffon Nivernais",
        "1ddc1baf-d7ed-11ea-a870-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Griffon Nivernais Mix",
        "1ddcb7aa-d7ed-11ea-8c94-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Shepherd Dog Mix Groenendael",
        "1ddc90bc-d7ed-11ea-acc3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Gull Terrier",
        "1ddc69b0-d7ed-11ea-a93c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Gull Terrier Mix",
        "1ddcdf37-d7ed-11ea-a0c0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chinese Crested Mix Hairless",
        "1ddc90c3-d7ed-11ea-94f6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Halden Hound",
        "1ddc1bb0-d7ed-11ea-94f2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Halden Hound Mix",
        "1ddcb7ab-d7ed-11ea-93c0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hamilton Hound",
        "1ddc1bb2-d7ed-11ea-8604-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hamilton Hound Mix",
        "1ddcb7ad-d7ed-11ea-b6ce-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hanoverian Scenthound",
        "1ddc1bb3-d7ed-11ea-b6d2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hanoverian Scenthound Mix",
        "1ddcb7ae-d7ed-11ea-9faa-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Harrier",
        "1ddc1bb4-d7ed-11ea-9a0b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Harrier Mix",
        "1ddcb7af-d7ed-11ea-96ae-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Havanese",
        "1ddc1bb5-d7ed-11ea-89f1-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Havanese Mix",
        "1ddcb7b0-d7ed-11ea-aeea-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hellenic Hound",
        "1ddc1bb6-d7ed-11ea-8092-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hellenic Hound Mix",
        "1ddcb7b1-d7ed-11ea-a749-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Himalayan Sheepdog",
        "1ddc69c7-d7ed-11ea-a196-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Himalayan Sheepdog Mix",
        "1ddcdf4e-d7ed-11ea-a394-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hokkaido",
        "1ddc1bb7-d7ed-11ea-91da-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hokkaido Mix",
        "1ddcb7b2-d7ed-11ea-a4b7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hollandse Smoushond",
        "1ddc1bb8-d7ed-11ea-89f7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hollandse Smoushond Mix",
        "1ddcb7b3-d7ed-11ea-85ba-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hound Dog",
        "ca6d4440-8dc9-11ed-9a90-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hound Dog Mix",
        "ca6e7cfc-8dc9-11ed-89e9-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hovawart",
        "1ddc1bb9-d7ed-11ea-98ed-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hovawart Mix",
        "1ddcb7b4-d7ed-11ea-b446-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hungarian Greyhound",
        "1ddc1bba-d7ed-11ea-9292-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hungarian Greyhound Mix",
        "1ddcb7b5-d7ed-11ea-8f77-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hygen Hound",
        "1ddc1bbd-d7ed-11ea-acf8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hygen Hound Mix",
        "1ddcb7b8-d7ed-11ea-ad4e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "HÃ¤lleforshund",
        "1ddc1bb1-d7ed-11ea-9b75-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "HÃ¤lleforshund Mix",
        "1ddcb7ac-d7ed-11ea-8998-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ibizan Hound",
        "1ddc1bbe-d7ed-11ea-bdd7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ibizan Hound Mix",
        "1ddcb7b9-d7ed-11ea-b9d7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ibizan Hound rough-haired",
        "1ddc1bbf-d7ed-11ea-ac76-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ibizan Hound smooth-haired",
        "1ddc1bc0-d7ed-11ea-a675-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Icelandic Sheepdog",
        "1ddc1bc1-d7ed-11ea-9ecd-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Icelandic Sheepdog Mix",
        "1ddcb7bc-d7ed-11ea-ad3c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Indian Spitz",
        "1ddc69ce-d7ed-11ea-8db4-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Indian Spitz Mix",
        "1ddd05c1-d7ed-11ea-aa54-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Glen of Imaal Terrier",
        "1ddc1b86-d7ed-11ea-ac05-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Glen of Imaal Terrier Mix",
        "1ddc9102-d7ed-11ea-bf52-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Red Setter",
        "1ddc1bc4-d7ed-11ea-b937-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Red Setter Mix",
        "1ddcb7bf-d7ed-11ea-a63e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Red and White Setter",
        "1ddc1bc3-d7ed-11ea-bc0e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Red and White Setter Mix",
        "1ddcb7be-d7ed-11ea-9333-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Softcoated Wheaten Terrier",
        "1ddc1b87-d7ed-11ea-a40b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Softcoated Wheaten Terrier Mix",
        "1ddc9103-d7ed-11ea-aee6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Terrier",
        "1ddc1b93-d7ed-11ea-a2f7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Terrier Mix",
        "1ddc910f-d7ed-11ea-9509-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Water Spaniel",
        "1ddc4241-d7ed-11ea-b745-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Water Spaniel Mix",
        "1ddcb7c2-d7ed-11ea-9b9c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Wolfhound",
        "1ddc4242-d7ed-11ea-9d68-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Wolfhound Mix",
        "1ddcb7c3-d7ed-11ea-ad6e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Istrian Coarse-haired Hound",
        "66935571-8dcb-11ed-9220-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Istrian Coarse-haired Hound Mix",
        "6854db1b-8dcb-11ed-993d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Istrian Shorthaired Hound",
        "ca6fdc9e-8dc9-11ed-acce-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Istrian Shorthaired Hound Mix",
        "ca7101f4-8dc9-11ed-8546-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Italian Greyhound",
        "1ddc4243-d7ed-11ea-9b9f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Italian Greyhound Mix",
        "1ddcb7c4-d7ed-11ea-af8f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Italian Hound Coarse-haired",
        "1ddc4245-d7ed-11ea-8a08-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Italian Hound Mix Coarse-haired",
        "1ddcb7c6-d7ed-11ea-a799-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Italian Hound Mix Short-haired",
        "1ddcb7c5-d7ed-11ea-9649-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Italian Hound Short-haired",
        "1ddc4246-d7ed-11ea-878f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Italian Spinone",
        "1ddc4247-d7ed-11ea-81a9-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Italian Spinone Mix",
        "1ddcb7c7-d7ed-11ea-8dbf-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Jack Russell Terrier",
        "1ddc1bc2-d7ed-11ea-aee5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Jack Russell Terrier Mix",
        "1ddcb7bd-d7ed-11ea-8615-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Jagdterrier dog",
        "1ddc69b1-d7ed-11ea-8a17-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Jagdterrier dog Mix",
        "1ddcdf38-d7ed-11ea-9090-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Japanese Akita",
        "1ddc4249-d7ed-11ea-8de7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Japanese Akita Mix",
        "1ddcb7c9-d7ed-11ea-b6f5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Japanese Chin",
        "1ddc424a-d7ed-11ea-8c8f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Japanese Chin Mix",
        "1ddcb7ca-d7ed-11ea-a8cd-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Japanese Spitz",
        "1ddc424b-d7ed-11ea-9800-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Japanese Spitz Mix",
        "1ddcb7cb-d7ed-11ea-8c3a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Japanese Terrier",
        "1ddc1bc5-d7ed-11ea-86f4-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Japanese Terrier Mix",
        "1ddcb7c0-d7ed-11ea-bf30-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Jura Hound",
        "1ddc424d-d7ed-11ea-a0c6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Jura Hound Mix",
        "1ddcb7cd-d7ed-11ea-a6e5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kai",
        "1ddc424e-d7ed-11ea-aece-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kai Mix",
        "1ddcb7ce-d7ed-11ea-a6ed-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kangal Shepherd Dog",
        "1ddc1b6d-d7ed-11ea-8299-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kangal Shepherd Dog Mix",
        "1ddc90e9-d7ed-11ea-81db-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Karelian Bear Dog",
        "1ddc424f-d7ed-11ea-b268-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Karelian Bear Dog Mix",
        "1ddcb7cf-d7ed-11ea-9d1e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Karst Shepherd Dog",
        "1ddc1b6e-d7ed-11ea-a073-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Karst Shepherd Dog Mix",
        "1ddc90ea-d7ed-11ea-b405-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Keeshond",
        "6761857c-a169-11ec-94b4-7085c2a1b8e0",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Keeshond Mix",
        "c6b49ac4-a169-11ec-8ae8-7085c2a1b8e0",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kerry Blue Terrier",
        "1ddc4240-d7ed-11ea-8b27-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kerry Blue Terrier Mix",
        "1ddcb7c1-d7ed-11ea-b84d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "King Charles Spaniel",
        "1ddc4252-d7ed-11ea-93ca-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "King Charles Spaniel Mix",
        "1ddcb7d2-d7ed-11ea-a41f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "King Shepherd",
        "1ddc69a6-d7ed-11ea-bdb8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "King Shepherd Mix",
        "1ddcdf2d-d7ed-11ea-95fe-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kintamani-Bali Dog",
        "1ddc4253-d7ed-11ea-86e4-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kintamani-Bali Dog Mix",
        "1ddcb7d3-d7ed-11ea-af20-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kishu Ken",
        "1ddc4254-d7ed-11ea-8da4-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kishu Ken Mix",
        "1ddcb7d4-d7ed-11ea-9ab4-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Komondor",
        "1ddc4255-d7ed-11ea-834d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Komondor Mix",
        "1ddcb7d5-d7ed-11ea-8b60-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Korea Jindo Dog",
        "1ddc4256-d7ed-11ea-8001-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Korea Jindo Dog Mix",
        "1ddcb7d6-d7ed-11ea-8630-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "KromfohrlÃ¤nder",
        "1ddc4257-d7ed-11ea-ac19-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "KromfohrlÃ¤nder Mix",
        "1ddcb7d7-d7ed-11ea-90ce-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kumaon Mastiff",
        "1ddc426b-d7ed-11ea-b339-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kumaon Mastiff Mix",
        "1ddcb7eb-d7ed-11ea-b687-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kuvasz",
        "1ddc4258-d7ed-11ea-aa00-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kuvasz Mix",
        "1ddcb7d8-d7ed-11ea-a0bd-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Labradoodle",
        "1ddc4259-d7ed-11ea-82c1-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Labradoodle Mix",
        "1ddcb7d9-d7ed-11ea-a5e6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Labrador Retriever",
        "1ddc425a-d7ed-11ea-a641-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Labrador Retriever Mix",
        "1ddcb7da-d7ed-11ea-8904-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Shepherd Dog Laekenois",
        "1ddc1b6f-d7ed-11ea-82c8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Shepherd Dog Mix Laekenois",
        "1ddc90eb-d7ed-11ea-8343-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Lagotto romagnolo",
        "1ddc425b-d7ed-11ea-af08-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Lagotto romagnolo Mix",
        "1ddcb7db-d7ed-11ea-8d54-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Lakeland Terrier",
        "1ddc4248-d7ed-11ea-acbb-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Lakeland Terrier Mix",
        "1ddcb7c8-d7ed-11ea-aa89-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Lancashire Heeler",
        "1ddc425d-d7ed-11ea-83ab-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Lancashire Heeler Mix",
        "1ddcb7dd-d7ed-11ea-a3f9-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Landseer European Continental type",
        "1ddc425e-d7ed-11ea-b00b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Lapponian Herder",
        "ca6a8522-8dc9-11ed-9e69-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Lapponian Herder Mix",
        "ca6be4b9-8dc9-11ed-8c89-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Large MÃ¼nsterlander",
        "1ddc4260-d7ed-11ea-af86-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Large MÃ¼nsterlander Mix",
        "1ddcb7e0-d7ed-11ea-9a7b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Peruvian Hairless Dog Mix Large",
        "1ddcb80a-d7ed-11ea-b4bc-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Leonberger",
        "1ddc4261-d7ed-11ea-9b43-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Leonberger Mix",
        "1ddcb7e1-d7ed-11ea-967c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Lhasa Apso",
        "1ddc4262-d7ed-11ea-b52b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Lhasa Apso Mix",
        "1ddcb7e2-d7ed-11ea-9c08-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Majorcan Shepherd Dog long haired",
        "1ddc1b70-d7ed-11ea-b8a0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Majorcan Shepherd Dog Mix long haired",
        "1ddc90ec-d7ed-11ea-a8bf-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chihuahua Long-haired",
        "1ddc1b45-d7ed-11ea-8310-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chihuahua Mix Long-haired",
        "1ddc90c1-d7ed-11ea-96d5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dutch Shepherd Dog Long-haired",
        "1ddc1b97-d7ed-11ea-923a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dutch Shepherd Dog Mix Long-haired",
        "1ddcb792-d7ed-11ea-a1bf-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Shepherd Dog Long-haired",
        "1ddc1b98-d7ed-11ea-a88c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Shepherd Dog Mix Long-haired",
        "1ddcb793-d7ed-11ea-9be3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Long-haired Miniature",
        "1ddc90d9-d7ed-11ea-a19e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pyrenean Sheepdog Long-haired",
        "1ddc42ad-d7ed-11ea-af23-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pyrenean Sheepdog Mix Long-haired",
        "1ddcdec0-d7ed-11ea-b737-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Long-haired Rabbit Hunting",
        "1ddc1b59-d7ed-11ea-a01d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Long-haired Rabbit Hunting",
        "1ddc90d5-d7ed-11ea-af5d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Toy Long-haired",
        "1ddc42b7-d7ed-11ea-b67f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Toy Mix Long-haired",
        "1ddcdeca-d7ed-11ea-afce-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saint Bernard Dog Long-haired",
        "1ddc42bc-d7ed-11ea-97d4-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saint Bernard Dog Mix Long-haired",
        "1ddcdecf-d7ed-11ea-a094-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Long-haired Standard",
        "1ddc1b5c-d7ed-11ea-b8b8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Long-haired Standard",
        "1ddc90d8-d7ed-11ea-8bc8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Weimaraner Long-haired",
        "1ddc6988-d7ed-11ea-bbc7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Weimaraner Mix Long-haired",
        "1ddcdf0e-d7ed-11ea-8282-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "LÃ¶wchen",
        "1ddc4263-d7ed-11ea-b800-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "LÃ¶wchen Mix",
        "1ddcb7e3-d7ed-11ea-a278-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Majorca Mastiff",
        "1ddc4277-d7ed-11ea-a05e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Majorca Mastiff Mix",
        "1ddcb7f7-d7ed-11ea-ad27-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Majorcan Shepherd Dog",
        "1ddc1b99-d7ed-11ea-9375-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Majorcan Shepherd Dog Mix",
        "1ddcb794-d7ed-11ea-87ba-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Shepherd Dog Mix Malinois",
        "1ddcb7d0-d7ed-11ea-8380-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Maltese",
        "1ddc4268-d7ed-11ea-a936-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Maltese Mix",
        "1ddcb7e8-d7ed-11ea-a103-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Maltipoo",
        "1ddc69d9-d7ed-11ea-be0b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Maltipoo Mix",
        "1ddd05cc-d7ed-11ea-b65a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Manchester Terrier",
        "1ddc424c-d7ed-11ea-801d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Manchester Terrier Mix",
        "1ddcb7cc-d7ed-11ea-9161-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Maremma and Abruzzes Sheepdog",
        "1ddc426a-d7ed-11ea-88ed-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Maremma and Abruzzes Sheepdog Mix",
        "1ddcb7ea-d7ed-11ea-a15e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mastiff Dog",
        "1ddc42ab-d7ed-11ea-a0ad-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mastiff Mix",
        "1ddcdebe-d7ed-11ea-bb62-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Medium Griffon Vendeen",
        "1ddc426c-d7ed-11ea-915c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Medium Griffon Vendeen Mix",
        "1ddcb7ec-d7ed-11ea-8c5b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Medium-Sized Anglo-French Hound",
        "1ddc426d-d7ed-11ea-bfb7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mexican Hairless Dog Mix Medium-Sized",
        "1ddcb7ee-d7ed-11ea-8f7c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Medium-Sized Anglo-French Hound Mix",
        "1ddcb7ed-d7ed-11ea-816b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mexican Hairless Dog",
        "1ddc69d3-d7ed-11ea-8341-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mexican Hairless Dog Medium-Sized",
        "1ddc426e-d7ed-11ea-b3ae-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mexican Hairless Dog Miniature",
        "1ddc426f-d7ed-11ea-9c8b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mexican Hairless Dog Mix",
        "1ddd05c6-d7ed-11ea-b796-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mexican Hairless Dog Mix Miniature",
        "1ddcb7ef-d7ed-11ea-86ca-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mexican Hairless Dog Standard",
        "1ddc4270-d7ed-11ea-a58a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Miniature American Shepherd",
        "1ddc4265-d7ed-11ea-b0d8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Miniature American Shepherd Mix",
        "1ddcb7e5-d7ed-11ea-b653-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Miniature Bull Terrier",
        "1ddc4251-d7ed-11ea-81e8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Miniature Bull Terrier Mix",
        "1ddcb7d1-d7ed-11ea-87f0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Miniature",
        "1ddc1b57-d7ed-11ea-b7c7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Miniature",
        "1ddc90d3-d7ed-11ea-8e4d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Miniature Fox Terrier",
        "1ddc69b2-d7ed-11ea-84e9-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Miniature Fox Terrier Mix",
        "1ddcdf39-d7ed-11ea-9c42-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Miniature Pinscher",
        "1ddc4273-d7ed-11ea-8094-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Miniature Pinscher Mix",
        "1ddcb7f3-d7ed-11ea-8b10-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Miniature",
        "e452cd9c-7bc1-11eb-8966-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shar Pei Miniature",
        "1ddc69db-d7ed-11ea-810b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shar Pei Mix Miniature",
        "1ddd05ce-d7ed-11ea-b8a8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spitz Mittel",
        "1ddc69cf-d7ed-11ea-8891-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mixed Breed Dog",
        "f689dbd6-9964-11eb-9f44-7085c2a1b8e0",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Montenegrin Mountain Hound",
        "1ddc4275-d7ed-11ea-a1db-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Montenegrin Mountain Hound Mix",
        "1ddcb7f5-d7ed-11ea-a26f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mountain Cur",
        "6d9a2d01-e46f-11ed-978e-106fd9dd20e8",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mountain Cur Mix",
        "8f50bdb6-52a5-11ee-be56-0242ac120002",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mudi Dog",
        "1ddc4276-d7ed-11ea-8add-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mudi Mix",
        "1ddcb7f6-d7ed-11ea-ac99-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Munsterlander",
        "1ddc69dc-d7ed-11ea-9276-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Munsterlander Mix",
        "1ddd05cf-d7ed-11ea-a682-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Neapolitan Mastiff",
        "1ddc696c-d7ed-11ea-9b2b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Neapolitan Mastiff Mix",
        "1ddcdef3-d7ed-11ea-8317-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Nederlandse Kooikerhondje",
        "1ddc4278-d7ed-11ea-a88c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Nederlandse Kooikerhondje Mix",
        "1ddcb7f8-d7ed-11ea-933d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Newfoundland Mix",
        "1ddcb7f9-d7ed-11ea-b401-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Newfoundland",
        "1ddc4279-d7ed-11ea-82e6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norfolk Terrier",
        "1ddc425c-d7ed-11ea-a383-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norfolk Terrier Mix",
        "1ddcb7dc-d7ed-11ea-96ba-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norrbottenspitz",
        "1ddc427b-d7ed-11ea-ad80-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norrbottenspitz Mix",
        "1ddcb7fb-d7ed-11ea-953f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Buhund",
        "1ddc427c-d7ed-11ea-9a91-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Buhund Mix",
        "1ddcb7fc-d7ed-11ea-913d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Elkhound",
        "1ddc427d-d7ed-11ea-a14c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Elkhound Mix",
        "1ddcb7fd-d7ed-11ea-99e6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Elkhound black",
        "1ddc427e-d7ed-11ea-b413-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Elkhound grey",
        "1ddc427f-d7ed-11ea-a23d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Lundehund",
        "1ddc4280-d7ed-11ea-8461-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Lundehund Mix",
        "1ddcb800-d7ed-11ea-930d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwich Terrier",
        "1ddc4269-d7ed-11ea-8292-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwich Terrier Mix",
        "1ddcb7e9-d7ed-11ea-811e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Nova Scotia Duck Tolling Retriever",
        "1ddc4282-d7ed-11ea-814b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Nova Scotia Duck Tolling Retriever Mix",
        "1ddcb802-d7ed-11ea-bb8a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Old Danish Pointing Dog",
        "1ddc4283-d7ed-11ea-92db-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Old Danish Pointing Dog Mix",
        "1ddcb803-d7ed-11ea-8d32-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Old English Sheepdog",
        "1ddc4284-d7ed-11ea-9e05-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Old English Sheepdog Mix",
        "1ddcb804-d7ed-11ea-9834-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Old English Terrier",
        "1ddc69b3-d7ed-11ea-b9a5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Old English Terrier Mix",
        "1ddcdf3a-d7ed-11ea-b1db-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Old German Shepherd Dog",
        "1ddc4266-d7ed-11ea-b1f7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Old German Shepherd Dog Mix",
        "1ddcb7e6-d7ed-11ea-9e8f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Other dog Mix",
        "1ddcb806-d7ed-11ea-a5b0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Otterhound",
        "1ddc4286-d7ed-11ea-9d65-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Otterhound Mix",
        "1ddcb807-d7ed-11ea-a36e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Parson Russell Terrier",
        "1ddc69b4-d7ed-11ea-83c6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Parson Russell Terrier Mix",
        "1ddcb7f2-d7ed-11ea-bf46-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Patterdale Terrier",
        "1ddc69b5-d7ed-11ea-b5df-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Patterdale Terrier Mix",
        "1ddcdf3c-d7ed-11ea-ab0d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Peekapoo",
        "1ddc69da-d7ed-11ea-b7c6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Peekapoo Mix",
        "1ddd05cd-d7ed-11ea-8635-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pekingese Dog",
        "1ddc4288-d7ed-11ea-8b6b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pekingese Mix",
        "1ddcb809-d7ed-11ea-ae9e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Corgi Mix Pembroke",
        "1ddcdf11-d7ed-11ea-a114-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Peruvian Hairless Dog Large",
        "1ddc4289-d7ed-11ea-89bc-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Peruvian Hairless Dog Mix medium-sized",
        "1ddcb80b-d7ed-11ea-988e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Peruvian Hairless Dog Mix miniature",
        "1ddcb80c-d7ed-11ea-9d9e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Peruvian Hairless Dog medium-sized",
        "1ddc428a-d7ed-11ea-a4b9-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Peruvian Hairless Dog miniature",
        "1ddc428b-d7ed-11ea-80cb-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Peruvian Inca Orchid",
        "746a8486-edf2-11ed-a05b-0242ac120003",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Peruvian Inca Orchid Mix",
        "746a85b2-edf2-11ed-a05b-0242ac120003",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Petit Basset Griffon Vendeen",
        "1ddc428c-d7ed-11ea-ab1a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Petit Basset Griffon Vendeen Mix",
        "1ddcb80d-d7ed-11ea-b114-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Continental Toy Spaniel PhalÃ¨ne",
        "1ddc1b50-d7ed-11ea-9468-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Continental Toy Spaniel Mix PhalÃ¨ne",
        "1ddc90cc-d7ed-11ea-bd99-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pharaoh Hound",
        "1ddc428d-d7ed-11ea-bc7b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pharaoh Hound Mix",
        "1ddcb80e-d7ed-11ea-9c9a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Picardy Spaniel",
        "1ddc428e-d7ed-11ea-a51c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Picardy Spaniel Mix",
        "1ddcb80f-d7ed-11ea-91a9-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pinscher dog",
        "1ddc6997-d7ed-11ea-8858-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pinscher dog Mix",
        "1ddcdf1e-d7ed-11ea-bbc0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Plott Dog",
        "1ddc428f-d7ed-11ea-9ce4-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Plott Mix",
        "1ddcb810-d7ed-11ea-a70d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Plummer Terrier",
        "1ddc69b6-d7ed-11ea-85e2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Plummer Terrier Mix",
        "1ddcdf3d-d7ed-11ea-a6d1-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poitevin Dog",
        "1ddc4290-d7ed-11ea-8eb8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poitevin Mix",
        "1ddcb811-d7ed-11ea-9c00-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Polish Greyhound",
        "1ddc4291-d7ed-11ea-884b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Polish Greyhound Mix",
        "1ddcb812-d7ed-11ea-b336-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Polish Hound",
        "1ddc4292-d7ed-11ea-b68f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Polish Hound Mix",
        "1ddcb813-d7ed-11ea-ae2f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Polish Hunting Dog",
        "1ddc4293-d7ed-11ea-9ad2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Polish Hunting Dog Mix",
        "1ddcb814-d7ed-11ea-9473-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Polish Lowland Sheepdog",
        "1ddc4294-d7ed-11ea-bdef-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Polish Lowland Sheepdog Mix",
        "1ddcb815-d7ed-11ea-82e0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Polish Tatra Sheepdog",
        "1ddc69c8-d7ed-11ea-9fd0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Polish Tatra Sheepdog Mix",
        "1ddcdf4f-d7ed-11ea-a9f2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pont-Audemer Spaniel",
        "1ddc6969-d7ed-11ea-ba1e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pont-Audemer Spaniel Mix",
        "1ddcdef0-d7ed-11ea-ade4-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poodle Dog",
        "1ddc4295-d7ed-11ea-8d33-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poodle Medium",
        "1ddc4296-d7ed-11ea-b8ad-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poodle Miniature",
        "1ddc4297-d7ed-11ea-969c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poodle Mix",
        "1ddcb816-d7ed-11ea-9f4a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poodle Mix Medium",
        "1ddcb817-d7ed-11ea-93ea-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poodle Mix Miniature",
        "1ddcb818-d7ed-11ea-b18c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poodle Mix Standard",
        "1ddcb819-d7ed-11ea-8cc5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poodle Mix Toy",
        "1ddcb81a-d7ed-11ea-bcb1-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poodle Toy",
        "1ddc4299-d7ed-11ea-ae0b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Porcelain",
        "1ddc429a-d7ed-11ea-b20e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Porcelain Mix",
        "1ddcb81b-d7ed-11ea-b9e0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo",
        "1ddc429c-d7ed-11ea-878f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Mix",
        "1ddcb81c-d7ed-11ea-b9a7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Pointing Dog",
        "1ddc42a3-d7ed-11ea-b2c8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Pointing Dog Mix",
        "1ddcb823-d7ed-11ea-a4fc-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Sheepdog",
        "1ddc42a4-d7ed-11ea-821b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Sheepdog Mix",
        "1ddcb824-d7ed-11ea-9642-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Water Dog",
        "1ddc42a5-d7ed-11ea-96e5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Water Dog Mix",
        "1ddcb825-d7ed-11ea-a7d9-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Posavaz Hound",
        "1ddc429b-d7ed-11ea-8735-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Posavaz Hound Mix",
        "8f50c2ca-52a5-11ee-be56-0242ac120002",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chinese Crested Mix Powderpuff",
        "1ddc90c4-d7ed-11ea-bd2f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Prague Ratter",
        "1ddc42a6-d7ed-11ea-8985-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Prague Ratter Mix",
        "1ddcb826-d7ed-11ea-ab4e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pudelpointer",
        "1ddc42a7-d7ed-11ea-85b5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pudelpointer Mix",
        "1ddcb827-d7ed-11ea-a4c3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pug Dog",
        "1ddc42a8-d7ed-11ea-8334-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pug Mix",
        "1ddcdebb-d7ed-11ea-8a50-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Puli Dog",
        "1ddc42a9-d7ed-11ea-82f8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Puli Mix",
        "1ddcdebc-d7ed-11ea-b286-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pumi Dog",
        "1ddc42aa-d7ed-11ea-a83b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pumi Mix",
        "1ddcdebd-d7ed-11ea-856b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Pointing Dog Mix Pyrenean",
        "1ddc9107-d7ed-11ea-9df8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pyrenean Mastiff",
        "1ddc697f-d7ed-11ea-9ca9-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pyrenean Mastiff Mix",
        "1ddcdf05-d7ed-11ea-b6e8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pyrenean Sheepdog",
        "1ddc42ac-d7ed-11ea-bdfa-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pyrenean Sheepdog Mix",
        "1ddcdebf-d7ed-11ea-a1de-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pyrenean Shepherd",
        "1ddc69a7-d7ed-11ea-9fc3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pyrenean Shepherd Mix",
        "1ddcdf2e-d7ed-11ea-b26b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Rabbit Hunting",
        "1ddc1b60-d7ed-11ea-8ba8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Rabbit Hunting",
        "1ddc90dc-d7ed-11ea-a022-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Rafeiro of Alentejo",
        "1ddc42af-d7ed-11ea-9836-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Rafeiro of Alentejo Mix",
        "1ddcdec2-d7ed-11ea-afd4-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Rat Terrier",
        "1ddc69b7-d7ed-11ea-add5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Rat Terrier Mix",
        "1ddcdf3e-d7ed-11ea-854c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Redbone Coonhound",
        "ca5c6728-8dc9-11ed-b439-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Redbone Coonhound Mix",
        "ca63f584-8dc9-11ed-a665-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Retriever Dog",
        "1ddc69d2-d7ed-11ea-8aa1-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Retriever Dog Mix",
        "1ddd05c5-d7ed-11ea-963b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Rhodesian Ridgeback",
        "1ddc42b0-d7ed-11ea-861d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Rhodesian Ridgeback Mix",
        "1ddcdec3-d7ed-11ea-b42f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Romanian Bucovina Shepherd Dog",
        "1ddc4267-d7ed-11ea-b650-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Romanian Bucovina Shepherd Dog Mix",
        "1ddcb7e7-d7ed-11ea-a268-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Romanian Carpathian Shepherd Dog",
        "1ddc4271-d7ed-11ea-a610-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Romanian Carpathian Shepherd Dog Mix",
        "1ddcb7f1-d7ed-11ea-b3fa-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Romanian Mioritic Shepherd Dog",
        "1ddc42b1-d7ed-11ea-950e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Romanian Mioritic Shepherd Dog Mix",
        "1ddcdec4-d7ed-11ea-88ab-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Rottweiler Dog",
        "1ddc42b4-d7ed-11ea-93d8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Rottweiler Mix",
        "1ddcdec7-d7ed-11ea-bc61-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Collie Rough-coated",
        "1ddc1b4d-d7ed-11ea-ae6d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Collie Mix Rough-coated",
        "1ddc90c9-d7ed-11ea-98dc-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dutch Shepherd Dog rough-haired",
        "1ddc42b2-d7ed-11ea-a67e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dutch Shepherd Dog Mix rough-haired",
        "1ddcdec5-d7ed-11ea-82cb-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ibizan Hound Mix rough-haired",
        "1ddcb7ba-d7ed-11ea-94f6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Black Terrier",
        "1ddc427a-d7ed-11ea-bae5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Black Terrier Mix",
        "1ddcb7fa-d7ed-11ea-8f84-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Spaniel",
        "1ddc69c0-d7ed-11ea-848e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Spaniel Mix",
        "1ddcdf47-d7ed-11ea-9f8d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Spotted Hound",
        "1ddc42b6-d7ed-11ea-a4c0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Spotted Hound Mix",
        "1ddcdec9-d7ed-11ea-988e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Tsvetnaya Bolonka",
        "ca7b6232-8dc9-11ed-bc22-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Tsvetnaya Bolonka Mix",
        "ca7c9ab4-8dc9-11ed-997d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian-European LaÃ¯ka",
        "1ddc42b9-d7ed-11ea-9440-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian-European LaÃ¯ka Mix",
        "1ddcdecc-d7ed-11ea-8d0e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saarloos Wolfdog",
        "1ddc42ba-d7ed-11ea-bc34-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saarloos Wolfdog Mix",
        "1ddcdecd-d7ed-11ea-a12a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saint Bernard Dog",
        "1ddc42bb-d7ed-11ea-9a6a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saint Bernard Dog Mix",
        "1ddcdece-d7ed-11ea-8790-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saint-Usuge Spaniel",
        "1ddc69c1-d7ed-11ea-84aa-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saint-Usuge Spaniel Mix",
        "1ddcdf48-d7ed-11ea-a60f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saluki Dog",
        "1ddc42be-d7ed-11ea-ae2d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saluki Mix",
        "1ddcded1-d7ed-11ea-ba7e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Samoyed Dog",
        "1ddc42bf-d7ed-11ea-b5b2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Samoyed Mix",
        "1ddcded2-d7ed-11ea-8198-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Sarabi Dog",
        "8932edd8-63f5-11ec-9db7-7085c2a1b8e0",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Sarabi Dog Mix",
        "817ce663-63f5-11ec-b68f-7085c2a1b8e0",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Save Valley Scenthound",
        "1ddc42c0-d7ed-11ea-8d21-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Save Valley Scenthound Mix",
        "1ddcded3-d7ed-11ea-827d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schapendoes",
        "1ddc42c1-d7ed-11ea-950a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schapendoes Mix",
        "1ddcded4-d7ed-11ea-8701-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schiller Hound",
        "1ddc42c2-d7ed-11ea-bcfe-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schiller Hound Mix",
        "1ddcded5-d7ed-11ea-9fb2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schipperke",
        "1ddc42c3-d7ed-11ea-aa5e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schipperke Mix",
        "1ddcded6-d7ed-11ea-a51c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schnauzer Dog",
        "1ddc42c5-d7ed-11ea-ab75-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schnauzer Giant",
        "1ddc1ba1-d7ed-11ea-bb48-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schnauzer Miniature",
        "1ddc4274-d7ed-11ea-9a40-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schnauzer Mix",
        "1ddcded8-d7ed-11ea-bc36-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schnauzer Mix Giant",
        "1ddcb79c-d7ed-11ea-851d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schnauzer Mix Miniature",
        "1ddcb7f4-d7ed-11ea-ae04-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schnoodle",
        "1ddc69d7-d7ed-11ea-8978-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schnoodle Mix",
        "1ddd05ca-d7ed-11ea-bf04-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swiss Hound Schwyz",
        "1ddc6979-d7ed-11ea-b24c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Scottish Deerhound",
        "1ddc42c6-d7ed-11ea-b0fd-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Scottish Deerhound Mix",
        "1ddcded9-d7ed-11ea-a121-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Scottish Terrier",
        "1ddc4281-d7ed-11ea-972a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Scottish Terrier Mix",
        "1ddcb801-d7ed-11ea-b08f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Sealyham Terrier",
        "1ddc4287-d7ed-11ea-a606-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Sealyham Terrier Mix",
        "1ddcb808-d7ed-11ea-8ec4-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Segugio Maremmano",
        "1ddc42c9-d7ed-11ea-af79-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Segugio Maremmano Mix",
        "1ddcdedc-d7ed-11ea-aabc-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Serbian Hound",
        "1ddc42ca-d7ed-11ea-92f7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Serbian Hound Mix",
        "1ddcdedd-d7ed-11ea-9c14-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Serbian Tricolour Hound",
        "1ddc42cb-d7ed-11ea-b67e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Serbian Tricolour Hound Mix",
        "1ddcdede-d7ed-11ea-830f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Setter dog",
        "1ddc69cd-d7ed-11ea-b2b1-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Setter dog Mix",
        "1ddd05c0-d7ed-11ea-84e5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shar Pei",
        "1ddc42cc-d7ed-11ea-9055-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shar Pei Mix",
        "1ddcdedf-d7ed-11ea-af8d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shepherd",
        "ca7dd3a7-8dc9-11ed-9b49-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shepherd Mix",
        "ca7f5a44-8dc9-11ed-81a9-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shetland Sheepdog",
        "1ddc42cd-d7ed-11ea-8801-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shetland Sheepdog Mix",
        "1ddcdee0-d7ed-11ea-9fda-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shiba Dog",
        "1ddc42ce-d7ed-11ea-93a8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shiba Mix",
        "1ddcdee1-d7ed-11ea-b863-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shih Tzu",
        "1ddc42cf-d7ed-11ea-a604-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shih Tzu Mix",
        "1ddcdee3-d7ed-11ea-baa0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shikoku Dog",
        "1ddc42d0-d7ed-11ea-9ccb-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shikoku Mix",
        "1ddcdee4-d7ed-11ea-9946-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shiloh Shepherd",
        "1ddc69a8-d7ed-11ea-b7f7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shiloh Shepherd Mix",
        "1ddcdf2f-d7ed-11ea-9972-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Majorcan Shepherd Dog Mix short haired",
        "1ddcdec6-d7ed-11ea-a56a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dutch Shepherd Dog Short-haired",
        "1ddc6968-d7ed-11ea-8a5d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dutch Shepherd Dog Mix Short-haired",
        "1ddcdeef-d7ed-11ea-b9cf-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Shepherd Dog Short-haired",
        "1ddc697b-d7ed-11ea-84d5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hungarian Vizsla Short-haired",
        "1ddc1bbb-d7ed-11ea-b0fe-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hungarian Vizsla Mix Short-haired",
        "1ddcb7b6-d7ed-11ea-95b6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Majorcan Shepherd Dog short haired",
        "1ddc42b3-d7ed-11ea-9a90-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saint Bernard Dog Short-haired",
        "1ddc42bd-d7ed-11ea-8e0d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saint Bernard Dog Mix Short-haired",
        "1ddcded0-d7ed-11ea-8639-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Weimaraner Short-haired",
        "1ddc6989-d7ed-11ea-b877-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Weimaraner Mix Short-haired",
        "1ddcdf0f-d7ed-11ea-872e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Siberian Husky",
        "1ddc42d1-d7ed-11ea-b56e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Siberian Husky Mix",
        "1ddcdee5-d7ed-11ea-ab99-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Silky Terrier",
        "1ddc69b8-d7ed-11ea-907d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Silky Terrier Mix",
        "1ddcdf3f-d7ed-11ea-8f93-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Skye Terrier",
        "1ddc42b5-d7ed-11ea-a5cc-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Skye Terrier Mix",
        "1ddcdec8-d7ed-11ea-962b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Sloughi Dog",
        "1ddc42d3-d7ed-11ea-bfa0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Sloughi Mix",
        "1ddcdee7-d7ed-11ea-adc3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Slovakian Chuvach",
        "1ddc42d4-d7ed-11ea-b033-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Slovakian Chuvach Mix",
        "1ddcdee8-d7ed-11ea-82dd-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Slovakian Hound",
        "1ddc6962-d7ed-11ea-b3f9-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Slovakian Hound Mix",
        "1ddcdee9-d7ed-11ea-8901-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Slovakian Rough-haired Pointer",
        "1ddc69c4-d7ed-11ea-b61b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Slovakian Rough-haired Pointer Mix",
        "1ddcdf4b-d7ed-11ea-8426-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Slovakian Wire-haired Pointer Mix",
        "1ddcdeea-d7ed-11ea-b8b3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Slovakian Wire-haired Pointer",
        "1ddc6963-d7ed-11ea-a25f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Small Blue Gascony Hound",
        "1ddc6965-d7ed-11ea-8264-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Small Blue Gascony Hound Mix",
        "1ddcdeec-d7ed-11ea-8249-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Small Brabant Griffon",
        "1ddc6966-d7ed-11ea-8b42-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Small Brabant Griffon Mix",
        "1ddcdeed-d7ed-11ea-9ed1-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Small MÃ¼nsterlÃ¤nder",
        "1ddc6967-d7ed-11ea-a315-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Small MÃ¼nsterlÃ¤nder Mix",
        "1ddcdeee-d7ed-11ea-8f46-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Mix Small",
        "f694d8b2-7bc1-11eb-bc05-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Mix Smooth-Haired Large",
        "1ddcb81d-d7ed-11ea-87c9-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Smooth-Haired Medium-Sized",
        "1ddc429e-d7ed-11ea-b0b8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Mix Smooth-Haired Medium-Sized",
        "1ddcb81e-d7ed-11ea-94c7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Smooth-Haired Miniature",
        "1ddc429f-d7ed-11ea-ac17-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Mix Smooth-Haired Miniature",
        "1ddcb81f-d7ed-11ea-a50e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Collie Smooth-coated",
        "1ddc1b4e-d7ed-11ea-a6fb-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Collie Mix Smooth-coated",
        "1ddc90ca-d7ed-11ea-9e92-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pyrenean Sheepdog Smooth-faced",
        "1ddc42ae-d7ed-11ea-b997-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pyrenean Sheepdog Mix Smooth-faced",
        "1ddcdec1-d7ed-11ea-8390-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chihuahua Smooth-haired",
        "1ddc1b44-d7ed-11ea-aef7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chihuahua Mix Smooth-haired",
        "1ddc90c0-d7ed-11ea-ab9a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fox Terrier smooth",
        "1ddc42c7-d7ed-11ea-bbe4-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fox Terrier Mix smooth",
        "1ddcdeda-d7ed-11ea-a577-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ibizan Hound Mix smooth-haired",
        "1ddcb7bb-d7ed-11ea-9f54-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Smooth-Haired Large",
        "1ddc429d-d7ed-11ea-bd2b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Smooth-Haired Miniature",
        "1ddc1b5e-d7ed-11ea-8beb-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Smooth-Haired Miniature",
        "1ddc90da-d7ed-11ea-8bd8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Smooth-haired Rabbit Hunting",
        "1ddc1b5a-d7ed-11ea-bce5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Smooth-haired Rabbit Hunting",
        "1ddc90d6-d7ed-11ea-9bbf-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Toy smooth-haired",
        "1ddc42b8-d7ed-11ea-a73c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Toy Mix Smooth-haired",
        "1ddcdecb-d7ed-11ea-9ad4-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Smooth-Haired Standard",
        "1ddc1b61-d7ed-11ea-a93e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Smooth-Haired Standard",
        "1ddc90dd-d7ed-11ea-b5ab-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "SmÃ¥land Hound",
        "1ddc6964-d7ed-11ea-bc68-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "SmÃ¥land Hound Mix",
        "1ddcdeeb-d7ed-11ea-8972-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Soft-Coated Wheaten Terrier",
        "1ddc42c8-d7ed-11ea-85fe-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Soft-Coated Wheaten Terrier Mix",
        "1ddcdedb-d7ed-11ea-8ac1-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "South Russian Shepherd Dog",
        "1ddc6993-d7ed-11ea-ac8b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "South Russian Shepherd Dog Mix",
        "1ddcdf19-d7ed-11ea-ab8b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Spaniel dog",
        "1ddc69c2-d7ed-11ea-9780-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Spaniel dog Mix",
        "1ddcdf49-d7ed-11ea-a267-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Spanish Greyhound",
        "1ddc696a-d7ed-11ea-ab66-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Spanish Greyhound Mix",
        "1ddcdef1-d7ed-11ea-84fd-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Spanish Hound",
        "1ddc696b-d7ed-11ea-a559-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Spanish Hound Mix",
        "1ddcdef2-d7ed-11ea-b1a5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Spanish Mastiff",
        "1ddc69ca-d7ed-11ea-ace2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Spanish Mastiff Mix",
        "1ddd05bd-d7ed-11ea-bbde-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Spanish Water Dog",
        "1ddc69c6-d7ed-11ea-aa34-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Spanish Water Dog Mix",
        "1ddcdf4d-d7ed-11ea-ac73-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Sporting Lucas Terrier",
        "1ddc69b9-d7ed-11ea-a4cb-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Sporting Lucas Terrier Mix",
        "1ddcdf40-d7ed-11ea-bb68-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "St. Germain Pointing Dog",
        "1ddc696e-d7ed-11ea-b3a1-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "St. Germain Pointing Dog Mix",
        "1ddcdef5-d7ed-11ea-acd6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Stabyhoun Dog",
        "1ddc696f-d7ed-11ea-8f4d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Stabyhoun Mix",
        "1ddcdef6-d7ed-11ea-aefc-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Staffordshire Bull terrier",
        "1ddc42d2-d7ed-11ea-8199-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Staffordshire Bull terrier Mix",
        "1ddcdee6-d7ed-11ea-8e55-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Standard",
        "1ddc1b58-d7ed-11ea-a558-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Standard",
        "1ddc90d4-d7ed-11ea-8ff7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mexican Hairless Dog Mix Standard",
        "1ddcb7f0-d7ed-11ea-8a8d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poodle Standard",
        "1ddc4298-d7ed-11ea-97c6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schnauzer Standard",
        "1ddc42c4-d7ed-11ea-8421-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schnauzer Mix Standard",
        "1ddcded7-d7ed-11ea-8d92-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Styrian Coarse-haired Hound",
        "1ddc6971-d7ed-11ea-8ed9-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Styrian Coarse-haired Hound Mix",
        "1ddcdef8-d7ed-11ea-a318-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Sussex Spaniel",
        "1ddc6972-d7ed-11ea-a454-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Sussex Spaniel Mix",
        "1ddcdef9-d7ed-11ea-b2d7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swedish Elkhound",
        "1ddc6973-d7ed-11ea-a476-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swedish Elkhound Mix",
        "1ddcdefa-d7ed-11ea-b038-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swedish Lapphund",
        "1ddc6974-d7ed-11ea-ad90-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swedish Lapphund Mix",
        "1ddcdefb-d7ed-11ea-b40a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swedish Vallhund",
        "1ddc6975-d7ed-11ea-a23a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swedish Vallhund Mix",
        "1ddcdefc-d7ed-11ea-8d6d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swedish White Elkhound",
        "1ddc6976-d7ed-11ea-afe5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swedish White Elkhound Mix",
        "1ddcdefd-d7ed-11ea-b9a4-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swiss Hound",
        "1ddc6977-d7ed-11ea-8be9-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swiss Hound Lucerne",
        "1ddc6978-d7ed-11ea-9f4b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swiss Hound Lucerne Hound Mix",
        "1ddcdefe-d7ed-11ea-92ce-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swiss Hound Mix",
        "ad67768a-71c0-11ed-88d8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swiss Hound Schwyz Hound Mix",
        "1ddcdeff-d7ed-11ea-8be6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Taiwan Dog",
        "1ddc697a-d7ed-11ea-ac25-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Taiwan Dog Mix",
        "1ddcdf00-d7ed-11ea-9cbc-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tatra Shepherd Dog",
        "1ddc6996-d7ed-11ea-9b04-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tatra Shepherd Dog Mix",
        "1ddcdf1d-d7ed-11ea-9ffa-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Teddy Roosevelt Terrier",
        "1ddc69ba-d7ed-11ea-ab13-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Teddy Roosevelt Terrier Mix",
        "1ddcdf41-d7ed-11ea-a781-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tenterfield Terrier",
        "1ddc697c-d7ed-11ea-9409-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tenterfield Terrier Mix",
        "1ddcdf02-d7ed-11ea-874e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Terceira Mastiff",
        "1ddc69cb-d7ed-11ea-9af9-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Terceira Mastiff Mix",
        "1ddd05be-d7ed-11ea-bf0b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Terrier Mix",
        "081b788d-ba32-11eb-a230-302432eba3e9",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Thai Bangkaew Dog",
        "1ddc697d-d7ed-11ea-8951-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Thai Bangkaew Dog Mix",
        "1ddcdf03-d7ed-11ea-b535-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Thai Ridgeback dog",
        "1ddc697e-d7ed-11ea-818f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Thai Ridgeback dog Mix",
        "1ddcdf04-d7ed-11ea-a295-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tibetan Mastiff",
        "1ddc69cc-d7ed-11ea-b98a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tibetan Mastiff Mix",
        "1ddd05bf-d7ed-11ea-8ce2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tibetan Spaniel",
        "1ddc6980-d7ed-11ea-a24f-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tibetan Spaniel Mix",
        "1ddcdf06-d7ed-11ea-9b23-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tibetan Terrier",
        "1ddc6981-d7ed-11ea-886e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tibetan Terrier Mix",
        "1ddcdf07-d7ed-11ea-af00-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tornjak",
        "1ddc6982-d7ed-11ea-b369-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tornjak Mix",
        "1ddcdf08-d7ed-11ea-a4ed-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tosa",
        "1ddc6983-d7ed-11ea-aa80-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tosa Mix",
        "1ddcdf09-d7ed-11ea-bb5e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Toy Fox Terrier",
        "1ddc69bb-d7ed-11ea-af38-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Toy Fox Terrier Mix",
        "1ddcdf42-d7ed-11ea-853b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Toy Manchester Terrier",
        "1ddc69bc-d7ed-11ea-8f54-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Toy Manchester Terrier Mix",
        "1ddcdf43-d7ed-11ea-846d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Transylvanian Hound",
        "1ddc6984-d7ed-11ea-a170-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Transylvanian Hound Mix",
        "1ddcdf0a-d7ed-11ea-b370-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Treeing Cur",
        "ca886f16-8dc9-11ed-b6c3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Treeing Cur Mix",
        "ca89a798-8dc9-11ed-b458-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Treeing Feist",
        "746a8a62-edf2-11ed-a05b-0242ac120003",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Treeing Feist Mix",
        "746a8b8e-edf2-11ed-a05b-0242ac120003",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Treeing Tennessee Brindle",
        "ca910f2d-8dc9-11ed-b1cc-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Treeing Tennessee Brindle Mix",
        "ca93802b-8dc9-11ed-905b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Treeing Walker Coonhound",
        "ca652df1-8dc9-11ed-a041-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Treeing Walker Coonhound Mix",
        "ca666671-8dc9-11ed-a275-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tyrolean Hound",
        "1ddc6985-d7ed-11ea-af0b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tyrolean Hound Mix",
        "1ddcdf0b-d7ed-11ea-b65a-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Uruguayan Cimarron",
        "1ddc6986-d7ed-11ea-a3c9-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Uruguayan Cimarron Mix",
        "1ddcdf0c-d7ed-11ea-8bba-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Valencian rat hunting dog",
        "c497fcd7-9648-11ec-ba9c-7085c2a1b8e0",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Valencian rat hunting dog Mix",
        "38a5b9cc-4d26-11ee-96f0-106fd9dd20e8",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Volpino Italiano",
        "1ddc6987-d7ed-11ea-872b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Volpino Italiano Mix",
        "1ddcdf0d-d7ed-11ea-a338-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Corgi",
        "1ddc69d4-d7ed-11ea-9f47-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Corgi Cardigan",
        "1ddc698a-d7ed-11ea-907b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Corgi Mix",
        "1ddd05c7-d7ed-11ea-8482-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Corgi Pembroke",
        "1ddc698b-d7ed-11ea-9282-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Sheepdog",
        "1ddc69c9-d7ed-11ea-9c4e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Sheepdog Mix",
        "1ddcdf50-d7ed-11ea-8546-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Springer Spaniel",
        "1ddc698c-d7ed-11ea-9cc0-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Springer Spaniel Mix",
        "1ddcdf12-d7ed-11ea-a9e6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Terrier",
        "1ddc698d-d7ed-11ea-bd8b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Terrier Mix",
        "1ddcdf13-d7ed-11ea-bf29-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "West Highland White Terrier",
        "1ddc698e-d7ed-11ea-abb6-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "West Highland White Terrier Mix",
        "1ddcdf14-d7ed-11ea-b02d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "West Siberian LaÃ¯ka",
        "1ddc698f-d7ed-11ea-971b-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "West Siberian LaÃ¯ka Mix",
        "1ddcdf15-d7ed-11ea-a7a5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Westphalian Dachsbracke",
        "1ddc6990-d7ed-11ea-b0b3-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Westphalian Dachsbracke Mix",
        "1ddcdf16-d7ed-11ea-a585-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Wetterhoun",
        "1ddc6991-d7ed-11ea-a92d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Wetterhoun Mix",
        "1ddcdf17-d7ed-11ea-868d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Whippet",
        "1ddc6992-d7ed-11ea-ae01-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Whippet Mix",
        "1ddcdf18-d7ed-11ea-b66e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "White Shepherd",
        "1ddc69a9-d7ed-11ea-a296-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "White Shepherd Mix",
        "1ddcdf30-d7ed-11ea-8842-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "White Swiss Shepherd Dog",
        "1ddc6999-d7ed-11ea-9fd8-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "White Swiss Shepherd Dog Mix",
        "1ddcdf20-d7ed-11ea-81ac-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fox Terrier wire",
        "1ddc6995-d7ed-11ea-9edb-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fox Terrier Mix wire",
        "1ddcdf1c-d7ed-11ea-88e7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Wire-Haired Large",
        "1ddc42a0-d7ed-11ea-90bc-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Mix Wire-Haired Large",
        "1ddcb820-d7ed-11ea-9ef2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Wire-Haired Medium-Sized",
        "1ddc42a1-d7ed-11ea-bafc-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Mix Wire-Haired Medium-Sized",
        "1ddcb821-d7ed-11ea-bd5c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Wire-Haired Miniature",
        "1ddc42a2-d7ed-11ea-93cf-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Mix Wire-Haired Miniature",
        "1ddcb822-d7ed-11ea-b244-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hungarian Vizsla Wire-haired",
        "1ddc1bbc-d7ed-11ea-b799-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hungarian Vizsla Mix Wire-haired",
        "1ddcb7b7-d7ed-11ea-956c-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Wire-Haired Miniature",
        "1ddc1b5f-d7ed-11ea-b5d7-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Wire-Haired Miniature",
        "1ddc90db-d7ed-11ea-bcab-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Wire-haired Rabbit Hunting",
        "1ddc1b5b-d7ed-11ea-abd5-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Wire-haired Rabbit Hunting",
        "1ddc90d7-d7ed-11ea-a8ff-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Wire-Haired Standard",
        "1ddc1b62-d7ed-11ea-8bc2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Wire-Haired Standard",
        "1ddc90de-d7ed-11ea-94c1-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Wolf Mix",
        "1ddcdf1a-d7ed-11ea-ab2d-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Yakutian Laika",
        "1ddc6994-d7ed-11ea-be75-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Yakutian Laika Mix",
        "1ddcdf1b-d7ed-11ea-b94e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Yorkipoo",
        "1ddc69d5-d7ed-11ea-8f35-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Yorkipoo Mix",
        "1ddd05c8-d7ed-11ea-b97e-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Yorkshire Terrier",
        "1ddc69aa-d7ed-11ea-bb69-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Yorkshire Terrier Mix",
        "1ddcdf31-d7ed-11ea-b667-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Yugoslavian Shepherd Dog-Sharplanina",
        "1ddc699a-d7ed-11ea-85bd-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Yugoslavian Shepherd Dog-Sharplanina Mix",
        "1ddcdf21-d7ed-11ea-89ff-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Canis lupus familiaris",
        "e7e22593-59a3-11eb-85a2-302432eba3ec",
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Unknown Feline",
        "20e0d4fb-d80a-11ea-a1cd-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Abyssinian Cat",
        "1ddd05d2-d7ed-11ea-b586-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Abyssinian Cat Mix",
        "1ddd2cdc-d7ed-11ea-a16a-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Aegean Cat",
        "1ddd05d3-d7ed-11ea-b566-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Aegean Cat Mix",
        "1ddd2cdd-d7ed-11ea-82d5-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Bobtail",
        "1ddd05d4-d7ed-11ea-b144-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Bobtail Mix",
        "1ddd2cde-d7ed-11ea-b856-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Bobtail Shorthair Mix",
        "1ddd2ce0-d7ed-11ea-8c3d-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Curl",
        "1ddd05d7-d7ed-11ea-a2e4-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Curl Mix",
        "1ddd2ce1-d7ed-11ea-b493-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Bobtail Longhair",
        "1ddd05d5-d7ed-11ea-8e87-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Bobtail Longhair Mix",
        "1ddd2cdf-d7ed-11ea-8fde-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Curl Longhair",
        "1ddd05d8-d7ed-11ea-9de2-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Long-haired Purebred cat",
        "1ddd05da-d7ed-11ea-b4a4-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Medium-haired Purebred cat",
        "862eab3c-8dd1-11ed-b123-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Bobtail Shorthair",
        "1ddd05d6-d7ed-11ea-b8df-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Curl Shorthair",
        "1ddd05d9-d7ed-11ea-ab8c-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Curl Shorthair Mix",
        "1ddd2ce3-d7ed-11ea-8bd1-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Short-haired Purebred cat",
        "1ddd05db-d7ed-11ea-84f4-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Wire-haired",
        "1ddd05dc-d7ed-11ea-9e1e-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Wire-haired Mix",
        "1ddd2ce4-d7ed-11ea-a874-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Aphrodite Giant",
        "1ddd05dd-d7ed-11ea-b116-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Aphrodite Giant Mix",
        "1ddd2ce5-d7ed-11ea-9c32-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Arabian Mau",
        "1ddd05de-d7ed-11ea-9ff1-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Arabian Mau Mix",
        "1ddd2ce6-d7ed-11ea-a4f6-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Asian Cat",
        "1ddd05df-d7ed-11ea-9363-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Asian Cat Mix",
        "1ddd2ce7-d7ed-11ea-9189-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Asian Cat Long-haired",
        "1ddd05e0-d7ed-11ea-a96b-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Asian Cat Long-haired Mix",
        "1ddd2ce8-d7ed-11ea-8e1b-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Asian Cat Semi-Long-hair",
        "1ddd05e1-d7ed-11ea-b83f-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Asian Cat Shorthair",
        "1ddd05e2-d7ed-11ea-b49b-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Asian Cat Semi-Long-hair Mix",
        "1ddd2ce9-d7ed-11ea-a80b-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Asian Cat Shorthair Mix",
        "1ddd2cea-d7ed-11ea-8589-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Australian Mist",
        "1ddd05e3-d7ed-11ea-ae8b-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Australian Mist Mix",
        "1ddd2ceb-d7ed-11ea-845b-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Balinese Cat",
        "1ddd05e4-d7ed-11ea-b040-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Balinese Cat Mix",
        "1ddd2cec-d7ed-11ea-8b56-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Bambino Cat",
        "1ddd05e5-d7ed-11ea-8de0-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Bambino Cat Mix",
        "1ddd2ced-d7ed-11ea-8aa0-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Bengal Cat",
        "1ddd05e6-d7ed-11ea-bee1-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Bengal Cat Mix",
        "1ddd2cee-d7ed-11ea-9bc1-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Birman Cat",
        "1ddd05e7-d7ed-11ea-82c5-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Birman Cat Mix",
        "1ddd2cef-d7ed-11ea-9d22-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Ojos Azules",
        "1ddd0623-d7ed-11ea-895d-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Bohemian Rex",
        "1ddd05e8-d7ed-11ea-a2d6-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Bohemian Rex Mix",
        "1ddd2cf0-d7ed-11ea-b0b9-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Bombay Cat",
        "1ddd05e9-d7ed-11ea-8f23-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Bombay Cat Mix",
        "1ddd2cf1-d7ed-11ea-a4e7-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Brazilian Shorthair",
        "1ddd05ea-d7ed-11ea-a5a9-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "British Blue Cat",
        "1ddd05eb-d7ed-11ea-913a-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "British Blue Cat Mix",
        "1ddd2cf2-d7ed-11ea-a1a5-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "British Cat",
        "1ddd05ec-d7ed-11ea-986d-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "British Cat Mix",
        "1ddd2cf3-d7ed-11ea-930a-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "British Longhair",
        "1ddd05ed-d7ed-11ea-92ef-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Burmese Cat",
        "1ddd05ef-d7ed-11ea-93f9-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Burmese Cat Mix",
        "1ddd2cf4-d7ed-11ea-b239-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Burmilla Cat",
        "1ddd05f0-d7ed-11ea-998b-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Burmilla Cat Mix",
        "1ddd2cf5-d7ed-11ea-be59-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "California Spangled",
        "1ddd05f1-d7ed-11ea-bc41-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "California Spangled Mix",
        "1ddd2cf6-d7ed-11ea-ba6e-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Chantilly-Tiffany Cat",
        "1ddd05f2-d7ed-11ea-aabf-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Chantilly-Tiffany Cat Mix",
        "1ddd2cf7-d7ed-11ea-96ec-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Chartreuse Cat",
        "1ddd05f3-d7ed-11ea-b4d2-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Chartreuse Cat Mix",
        "1ddd2cf8-d7ed-11ea-ae0d-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Chausie Cat",
        "1ddd05f4-d7ed-11ea-92d8-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Chausie Cat Mix",
        "1ddd2cf9-d7ed-11ea-a9c2-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Javanese Cat",
        "1ddd0608-d7ed-11ea-9e87-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Colourpoint Shorthair",
        "1ddd05f5-d7ed-11ea-acee-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Colourpoint Shorthair Mix",
        "1ddd2cfa-d7ed-11ea-887e-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Cornish Rex",
        "1ddd05f6-d7ed-11ea-b309-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Cornish Rex Mix",
        "1ddd2cfb-d7ed-11ea-a402-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Crossbred",
        "1ddd05f7-d7ed-11ea-81b2-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Kurilian Bobtail",
        "1ddd0610-d7ed-11ea-a624-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Kurilian Bobtail Mix",
        "1ddd2d15-d7ed-11ea-8507-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Cymric",
        "1ddd05f8-d7ed-11ea-82bd-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Cymric Long-haired Mix",
        "1ddd2cfe-d7ed-11ea-bf3b-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Cymric Mix",
        "1ddd2cfd-d7ed-11ea-be92-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Cyprus Cat",
        "1ddd05fa-d7ed-11ea-b440-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Cyprus Cat Mix",
        "1ddd2cff-d7ed-11ea-9dce-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Devon Rex",
        "1ddd05fb-d7ed-11ea-808d-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Devon Rex Mix",
        "1ddd2d00-d7ed-11ea-82cf-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Felis catus",
        "e7e6443a-59a3-11eb-ae9d-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Domestic Long-haired cat",
        "9a0a77e7-8de7-11ed-af65-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Domestic Medium-haired cat",
        "87a38adf-8de7-11ed-bd5c-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Domestic Short-haired cat",
        "d51f6cb0-8de6-11ed-bfb8-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "British Shorthair",
        "1ddd05ee-d7ed-11ea-98ef-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Donskoy Cat",
        "1ddd05fc-d7ed-11ea-a61c-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Donskoy Cat Mix",
        "1ddd2d01-d7ed-11ea-9b3e-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Dragon Li",
        "1ddd05fd-d7ed-11ea-bb88-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Dragon Li Mix",
        "1ddd2d02-d7ed-11ea-837a-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Dwelf Cat",
        "1ddd05fe-d7ed-11ea-bfaa-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Dwelf Cat Mix",
        "1ddd2d03-d7ed-11ea-94f4-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Egyptian Mau",
        "1ddd05ff-d7ed-11ea-a69f-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Egyptian Mau Mix",
        "1ddd2d04-d7ed-11ea-bd26-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "European Cat",
        "1ddd0600-d7ed-11ea-b17c-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "European Burmese Cat",
        "8e4caf5c-e54e-11ed-b5ea-0242ac120002",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "European Burmese Cat Mix",
        "8e4cb0b0-e54e-11ed-b5ea-0242ac120002",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "European Cat Mix",
        "1ddd2d05-d7ed-11ea-bd40-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "European Shorthair",
        "1ddd0601-d7ed-11ea-8983-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "European Shorthair Mix",
        "1ddd2d06-d7ed-11ea-ae29-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Exotic Cat",
        "8e4cab1a-e54e-11ed-b5ea-0242ac120002",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Exotic Cat Mix",
        "8e4cac82-e54e-11ed-b5ea-0242ac120002",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Crossbred Mix",
        "1ddd2cfc-d7ed-11ea-86db-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Foldex Cat",
        "1ddd0602-d7ed-11ea-8492-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Foldex Cat Mix",
        "1ddd2d07-d7ed-11ea-8a58-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "German Rex",
        "1ddd0603-d7ed-11ea-8a0d-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "German Rex Mix",
        "1ddd2d08-d7ed-11ea-a5d5-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Havana Brown",
        "1ddd0604-d7ed-11ea-8096-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Havana Brown Mix",
        "1ddd2d09-d7ed-11ea-a826-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Highlander Cat",
        "1ddd0605-d7ed-11ea-b271-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Highlander Cat Mix",
        "1ddd2d0a-d7ed-11ea-b415-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Himalayan Cat",
        "1ddd0606-d7ed-11ea-8b63-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Himalayan Cat Mix",
        "1ddd2d0b-d7ed-11ea-b5f9-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Japanese Bobtail",
        "1ddd0607-d7ed-11ea-a085-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Japanese Bobtail Mix",
        "1ddd2d0c-d7ed-11ea-b12d-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Javanese Cat Mix",
        "1ddd2d0d-d7ed-11ea-8715-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Jungle Curl",
        "1ddd0609-d7ed-11ea-a1de-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Jungle Curl Mix",
        "1ddd2d0e-d7ed-11ea-8c03-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Khao Manee",
        "1ddd060a-d7ed-11ea-8d43-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Khao Manee Mix",
        "1ddd2d0f-d7ed-11ea-a842-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Korat Cat",
        "1ddd060b-d7ed-11ea-8925-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Korat Cat Mix",
        "1ddd2d10-d7ed-11ea-98d6-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Korean Bobtail",
        "1ddd060c-d7ed-11ea-9b97-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Korean Bobtail Mix",
        "1ddd2d11-d7ed-11ea-9951-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Korn Ja",
        "1ddd060d-d7ed-11ea-ab9c-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Korn Ja Mix",
        "1ddd2d12-d7ed-11ea-886b-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "LaPerm Cat",
        "1ddd0611-d7ed-11ea-803e-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "LaPerm Longhair",
        "1ddd0612-d7ed-11ea-9789-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "LaPerm Longhair Mix",
        "1ddd2d17-d7ed-11ea-8577-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "LaPerm Cat Mix",
        "1ddd2d16-d7ed-11ea-8aba-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "LaPerm Shorthair",
        "1ddd0613-d7ed-11ea-8a33-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "LaPerm Shorthair Mix",
        "1ddd2d18-d7ed-11ea-90fe-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Modern Siamese Cat",
        "1ddd061b-d7ed-11ea-8580-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Curl Longhair Mix",
        "1ddd2ce2-d7ed-11ea-9053-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Cymric Long-haired",
        "1ddd05f9-d7ed-11ea-89d9-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Kurilean Bobtail Long-haired",
        "1ddd060e-d7ed-11ea-b946-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Kurilean Bobtail Long-haired Mix",
        "1ddd2d13-d7ed-11ea-98ec-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Scottish Fold Longhair",
        "1ddd0637-d7ed-11ea-a10f-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Scottish Fold Longhair Mix",
        "1ddd2d3c-d7ed-11ea-8999-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Lykoi Cat",
        "1ddd0614-d7ed-11ea-a797-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Lykoi Cat Mix",
        "1ddd2d19-d7ed-11ea-a769-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Lynx Point Siamese",
        "1ddd0615-d7ed-11ea-b2dc-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Lynx Point Siamese Mix",
        "1ddd2d1a-d7ed-11ea-87f6-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Maine Coon",
        "1ddd0616-d7ed-11ea-b92a-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Maine Coon Mix",
        "1ddd2d1b-d7ed-11ea-8a62-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Manx Cat",
        "1ddd0617-d7ed-11ea-9358-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Manx Cat Mix",
        "1ddd2d1c-d7ed-11ea-a28d-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Mekong Bobtail",
        "1ddd0618-d7ed-11ea-9d7b-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Mekong Bobtail Mix",
        "1ddd2d1d-d7ed-11ea-b6d1-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Minskin Cat",
        "1ddd0619-d7ed-11ea-98b6-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Minskin Cat Mix",
        "1ddd2d1e-d7ed-11ea-82aa-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Modern Persian",
        "1ddd061a-d7ed-11ea-8dd4-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Modern Persian Mix",
        "1ddd2d1f-d7ed-11ea-bc51-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Modern Siamese Cat Mix",
        "1ddd2d20-d7ed-11ea-a835-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Munchkin Cat",
        "1ddd061c-d7ed-11ea-ab32-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Munchkin Cat Mix",
        "1ddd2d21-d7ed-11ea-8979-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Napoleon Cat",
        "1ddd061d-d7ed-11ea-82a3-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Napoleon Cat Mix",
        "1ddd2d22-d7ed-11ea-bc68-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Nebelung Cat",
        "1ddd061f-d7ed-11ea-9bfd-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Nebelung Cat Mix",
        "1ddd2d24-d7ed-11ea-b293-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Neva Masquerade",
        "1ddd0620-d7ed-11ea-b026-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Neva Masquerade Mix",
        "1ddd2d25-d7ed-11ea-a91c-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Forest Cat",
        "1ddd0621-d7ed-11ea-b2bb-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Forest Cat Mix",
        "1ddd2d26-d7ed-11ea-9ce1-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Ocicat Cat",
        "1ddd0622-d7ed-11ea-a09e-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Ocicat Cat Mix",
        "1ddd2d27-d7ed-11ea-8dc4-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Ojos Azules Mix",
        "1ddd2d28-d7ed-11ea-b923-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Oregon Rex",
        "1ddd0624-d7ed-11ea-b975-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Oregon Rex Mix",
        "1ddd2d29-d7ed-11ea-b0e4-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Oriental Bicolor",
        "1ddd0625-d7ed-11ea-bcb2-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Oriental Bicolor Mix",
        "1ddd2d2a-d7ed-11ea-b2f7-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Oriental Cat",
        "1ddd0626-d7ed-11ea-ba51-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Oriental Cat Mix",
        "1ddd2d2b-d7ed-11ea-9579-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Oriental Long-haired",
        "1ddd0627-d7ed-11ea-860c-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Oriental Long-haired Mix",
        "1ddd2d2c-d7ed-11ea-9b3a-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Oriental Short-haired",
        "1ddd0628-d7ed-11ea-a861-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Oriental Short-haired Mix",
        "1ddd2d2d-d7ed-11ea-8947-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Persian Cat",
        "1ddd0629-d7ed-11ea-bbc7-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Persian Cat Mix",
        "1ddd2d2e-d7ed-11ea-ae61-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Peterbald Cat",
        "1ddd062a-d7ed-11ea-8941-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Peterbald Cat Mix",
        "1ddd2d2f-d7ed-11ea-a161-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Pixie-bob Cat",
        "1ddd062b-d7ed-11ea-9dbe-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Pixie-bob Cat Mix",
        "1ddd2d30-d7ed-11ea-a1da-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Raas Cat",
        "1ddd062c-d7ed-11ea-99a9-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Raas Cat Mix",
        "1ddd2d31-d7ed-11ea-8b8c-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Ragamuffin Cat",
        "1ddd062d-d7ed-11ea-a4dd-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Ragamuffin Cat Mix",
        "1ddd2d32-d7ed-11ea-921d-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Ragdoll Cat",
        "1ddd062e-d7ed-11ea-adbd-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Ragdoll Cat Mix",
        "1ddd2d33-d7ed-11ea-ae73-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Russian Black",
        "1ddd0630-d7ed-11ea-a733-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Russian Black Mix",
        "1ddd2d35-d7ed-11ea-98cb-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Russian Blue",
        "1ddd0631-d7ed-11ea-8799-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Russian Blue Mix",
        "1ddd2d36-d7ed-11ea-aad8-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Russian Cat",
        "1ddd062f-d7ed-11ea-9a82-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Russian Cat Mix",
        "1ddd2d34-d7ed-11ea-8130-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Russian Tabby",
        "1ddd0632-d7ed-11ea-bcf7-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Russian Tabby Mix",
        "1ddd2d37-d7ed-11ea-9528-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Russian White",
        "1ddd0633-d7ed-11ea-ac8e-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Russian White Mix",
        "1ddd2d38-d7ed-11ea-9cfa-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Sam sawet",
        "1ddd0634-d7ed-11ea-a6ec-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Sam sawet Mix",
        "1ddd2d39-d7ed-11ea-921e-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Savannah Cat",
        "1ddd0635-d7ed-11ea-ac42-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Savannah Cat Mix",
        "1ddd2d3a-d7ed-11ea-9986-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Scottish Fold",
        "1ddd0636-d7ed-11ea-8865-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Scottish Fold Mix",
        "1ddd2d3b-d7ed-11ea-a7fe-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Selkirk Rex",
        "1ddd0639-d7ed-11ea-bd34-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Selkirk Rex Mix",
        "1ddd2d3e-d7ed-11ea-af51-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Serengeti Cat",
        "1ddd063a-d7ed-11ea-946e-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Serengeti Cat Mix",
        "1ddd2d3f-d7ed-11ea-914a-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Serrade Petit",
        "1ddd063b-d7ed-11ea-a2ea-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Serrade Petit Mix",
        "1ddd2d40-d7ed-11ea-9890-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Kurilean Bobtail Short-haired",
        "1ddd060f-d7ed-11ea-bcfc-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Kurilean Bobtail Short-haired Mix",
        "1ddd2d14-d7ed-11ea-a5a5-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Scottish Fold Shorthair",
        "1ddd0638-d7ed-11ea-bea2-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Scottish Fold Shorthair Mix",
        "1ddd2d3d-d7ed-11ea-9954-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Siamese",
        "1ddd063c-d7ed-11ea-a884-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Siamese Mix",
        "1ddd2d41-d7ed-11ea-9289-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Siberian Cat",
        "1ddd063d-d7ed-11ea-974a-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Siberian Cat Mix",
        "1ddd2d42-d7ed-11ea-9a97-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Singapura Cat",
        "1ddd063e-d7ed-11ea-b280-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Singapura Cat Mix",
        "1ddd2d43-d7ed-11ea-86d9-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Snowshoe Cat",
        "1ddd063f-d7ed-11ea-ba3f-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Snowshoe Cat Mix",
        "1ddd2d44-d7ed-11ea-aeb3-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Sokoke Cat",
        "1ddd0640-d7ed-11ea-a020-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Sokoke Cat Mix",
        "1ddd2d45-d7ed-11ea-88e5-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Somali Cat",
        "1ddd0641-d7ed-11ea-96e6-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Somali Cat Mix",
        "1ddd2d46-d7ed-11ea-8529-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "South African Blue Cat",
        "1ddd0642-d7ed-11ea-b06c-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "South African Blue Cat Mix",
        "1ddd2d47-d7ed-11ea-9766-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Sphynx Cat",
        "1ddd0643-d7ed-11ea-b71c-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Sphynx Cat Mix",
        "1ddd2d48-d7ed-11ea-b82b-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Standardized Siamese Cat",
        "1ddd0644-d7ed-11ea-a3a7-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Standardized Siamese Cat Mix",
        "1ddd2d49-d7ed-11ea-ac5c-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Suphalak Cat",
        "1ddd0645-d7ed-11ea-bec8-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Suphalak Cat Mix",
        "1ddd2d4a-d7ed-11ea-863d-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Thai Cat",
        "1ddd0646-d7ed-11ea-80c5-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Tonkinese Cat",
        "1ddd0647-d7ed-11ea-bdb0-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Tonkinese Cat Mix",
        "1ddd2d4c-d7ed-11ea-8040-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Tortie Lynx Point Siamese Cat",
        "1ddd0648-d7ed-11ea-9b9c-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Tortie Lynx Point Siamese Cat Mix",
        "1ddd2d4d-d7ed-11ea-9191-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Tortie Point Siamese",
        "1ddd0649-d7ed-11ea-b8e1-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Tortie Point Siamese Mix",
        "1ddd2d4e-d7ed-11ea-8548-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Toyger Cat",
        "1ddd064a-d7ed-11ea-8ddd-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Toyger Cat Mix",
        "1ddd2d4f-d7ed-11ea-bfb9-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Traditional Persian",
        "1ddd064b-d7ed-11ea-a430-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Traditional Persian Mix",
        "1ddd2d50-d7ed-11ea-a782-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Thai Cat Mix",
        "1ddd2d4b-d7ed-11ea-bdcb-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Turkish Angora",
        "1ddd064c-d7ed-11ea-9418-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Turkish Angora Mix",
        "1ddd2d51-d7ed-11ea-8bba-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Turkish Van",
        "1ddd064d-d7ed-11ea-8d05-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Turkish Van Mix",
        "1ddd2d52-d7ed-11ea-b41d-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Ukrainian Levkoy",
        "1ddd2cd9-d7ed-11ea-8805-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Ukrainian Levkoy Mix",
        "1ddd2d53-d7ed-11ea-81f6-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Wila Krungthep",
        "1ddd2cda-d7ed-11ea-ac89-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Wila Krungthep Mix",
        "1ddd2d54-d7ed-11ea-86c0-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "York Chocolate",
        "1ddd2cdb-d7ed-11ea-b8b9-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "York Chocolate Mix",
        "1ddd2d55-d7ed-11ea-9f4c-302432eba3ec",
        "CAT",
        "breed",
        "zoetis"
    ]
]
export class MapRef1695218566420 implements MigrationInterface {

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM `provider_ref`')
        await queryRunner.query('DELETE FROM `ref`')
        await queryRunner.query('ALTER TABLE `provider_ref` AUTO_INCREMENT = 1')
        await queryRunner.query('ALTER TABLE `ref` AUTO_INCREMENT = 1')
        await queryRunner.query('ALTER TABLE `provider_ref` MODIFY COLUMN `type` VARCHAR(100)')
        //await queryRunner.query('ALTER TABLE `provider_ref` DROP FOREIGN KEY `FK_39f35ae0ad7d98da7164f61e2ff`')
        await queryRunner.query(`DROP INDEX \`idx_species_code\` ON \`provider_ref\``)
        let ref
        for (const ref of refs) {
            await queryRunner.query(`INSERT INTO \`ref\` (\`id\`, \`name\`, \`code\`, \`species\`, \`type\`)
                  VALUES (?, ?, ?, ?, ?)`, [ref.id, ref.name, ref.code, ref.species, ref.type])
        }
        for (const providerRef of providerRefs) {
            await queryRunner.query(`INSERT INTO \`provider_ref\` (\`id\`, \`code\`, \`name\`, \`species\`, \`type\`, \`provider\`, \`refId\`)
                  VALUES (?, ?, ?, ?, ?, ?, ?)`, [providerRef.id, providerRef.code, providerRef.name, providerRef.species, providerRef.type, providerRef.provider, providerRef.ref])
        }

        const uniqueCodes = new Set<string>()

        for (const line of mappings) {
            const [name, code, species, type, provider] = line
            const trimmedProvider = provider.replace(/\n/g, '').trim()
            const createdCode = `${name.replace(/ /g, '_').toUpperCase()}`
            if (!uniqueCodes.has(createdCode)) {
                uniqueCodes.add(createdCode)
                const formattedRef = {
                    name: name,
                    code: createdCode,
                    species: mapSpecies(species),
                    type: 'breed',
                }
                const newBreed = await queryRunner.query(`INSERT INTO \`ref\` (\`name\`, \`code\`, \`species\`, \`type\`)
                  VALUES (?, ?, ?, ?)`, [formattedRef.name, formattedRef.code, formattedRef.species, formattedRef.type])
                ref = newBreed.insertId
            } else {
                const existingBreed = await queryRunner.query('SELECT `id` FROM `ref` WHERE `code` = ?',
                [createdCode])
                ref = existingBreed[0].id
            }
            await queryRunner.query(`
            INSERT INTO provider_ref (name, code, species, type, provider, refId)
            VALUES (?, ?, ?, ?, ?, ?)`, [name, code, species, type, trimmedProvider, ref])
        }

        function mapSpecies (species: string | number) {
            if (species === '41' || species === 'CANINE' || species === 'DOG') {
                return 'CANIS_FAMILIARIS'
            } else if (species === '42' || species === 'FELINE' || species === 'CAT') {
                return 'FELIDAE'
            }
        }
    }


    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM `provider_ref`')
        await queryRunner.query('DELETE FROM `ref`')
        await queryRunner.query('ALTER TABLE `provider_ref` MODIFY COLUMN `type` VARCHAR(50)')
        await queryRunner.query('CREATE UNIQUE INDEX `idx_species_code` ON `provider_ref` (`code`)')
        //await queryRunner.query(`ALTER TABLE \`provider_ref\` ADD CONSTRAINT \`FK_39f35ae0ad7d98da7164f61e2ff\` FOREIGN KEY (\`species\`) REFERENCES \`provider_ref\`(\`code\`) ON DELETE SET NULL ON UPDATE NO ACTION`)
    }
}
