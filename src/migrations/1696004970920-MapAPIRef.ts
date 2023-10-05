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
        code: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
        species: null,
        type: 'species'
    },
    {
        id: 5,
        name: 'Felidae',
        code: '29944158-bd6b-11eb-8276-302432eba3e9',
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
        "Canine",
        "36c3cde0-bd6b-11eb-9610-302432eba3e9",
        "41",
        null,
        "species",
        "antech"
    ],
    [
        "Feline",
        "29944158-bd6b-11eb-8276-302432eba3e9",
        "42",
        null,
        "species",
        "antech"
    ],
    [
        "Schipperke",
        "1ddc42c3-d7ed-11ea-aa5e-302432eba3ec",
        "163",
        "41",
        "breed",
        "antech"
    ],
    [
        "Blue Gascony Griffon",
        "1ddbf448-d7ed-11ea-b2ad-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Yugoslavian Shepherd DogSharplanina Mix",
        "1ddcdf21-d7ed-11ea-89ff-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis aureus naria",
        "5d5a2c33-bd6c-11eb-8245-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis adustus bweha",
        "5d5941b6-bd6c-11eb-99a0-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus gregoryi",
        "5d5d876f-bd6c-11eb-9ebf-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-Haired Medium-Sized Portuguese Podengo Mix",
        "1ddcb81e-d7ed-11ea-94c7-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Whippet Mix",
        "1ddcdf18-d7ed-11ea-b66e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Austrian Pinscher Mix",
        "1ddc9080-d7ed-11ea-8dc0-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bracco Italiano",
        "1ddbf457-d7ed-11ea-9073-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Puli Mix",
        "1ddcdebc-d7ed-11ea-b286-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Havana Brown",
        "1ddd0604-d7ed-11ea-8096-302432eba3ec",
        "18",
        "42",
        "breed",
        "antech"
    ],
    [
        "Japanese Bobtail Mix",
        "1ddd2d0c-d7ed-11ea-b12d-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Finnish Hound",
        "1ddc1b82-d7ed-11ea-b83d-302432eba3ec",
        "529",
        "41",
        "breed",
        "antech"
    ],
    [
        "Standard Mexican Hairless Dog Mix",
        "1ddcb7f0-d7ed-11ea-8a8d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mexican Hairless Dog Mix",
        "1ddd05c6-d7ed-11ea-b796-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Long-haired Pointer Mix",
        "1ddc9110-d7ed-11ea-8bde-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sam sawet",
        "1ddd0634-d7ed-11ea-a6ec-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Abyssinian Cat Mix",
        "1ddd2cdc-d7ed-11ea-a16a-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Uruguayan Cimarron",
        "1ddc6986-d7ed-11ea-a3c9-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Ukrainian Levkoy Mix",
        "1ddd2d53-d7ed-11ea-81f6-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Great AngloFrench Tricolour Hound",
        "1ddc1ba6-d7ed-11ea-9dd0-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Plott Dog",
        "1ddc428f-d7ed-11ea-9ce4-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Icelandic Sheepdog",
        "1ddc1bc1-d7ed-11ea-9ecd-302432eba3ec",
        "530",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Short-haired Curl Mix",
        "1ddd2ce3-d7ed-11ea-8bd1-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Swedish Elkhound Mix",
        "1ddcdefa-d7ed-11ea-b038-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Slovakian Hound",
        "1ddc6962-d7ed-11ea-b3f9-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bloodhound Mix",
        "1ddc9098-d7ed-11ea-b80d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Parson Russell Terrier",
        "1ddc69b4-d7ed-11ea-83c6-302432eba3ec",
        "1303",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans goldmani",
        "5d5b166f-bd6c-11eb-867a-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bracco Italiano Mix",
        "1ddc90a9-d7ed-11ea-b995-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Volpino Italiano Mix",
        "1ddcdf0d-d7ed-11ea-a338-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "European German Shepherd Dog",
        "1ddbf44b-d7ed-11ea-a302-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Aegean",
        "1ddd05d3-d7ed-11ea-b566-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "American Short-haired Curl",
        "1ddd05d9-d7ed-11ea-ab8c-302432eba3ec",
        "3",
        "42",
        "breed",
        "antech"
    ],
    [
        "Great AngloFrench Tricolour Hound Mix",
        "1ddcb7a1-d7ed-11ea-b895-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Side-striped Jackal",
        "e7e24c9b-59a3-11eb-80a2-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Neva Masquerade Mix",
        "1ddd2d25-d7ed-11ea-a91c-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis lupus pambasileus",
        "5d5e71d0-bd6c-11eb-8322-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bloodhound",
        "1ddbf446-d7ed-11ea-a5ec-302432eba3ec",
        "64",
        "41",
        "breed",
        "antech"
    ],
    [
        "Spanish Mastiff Mix",
        "1ddd05bd-d7ed-11ea-bbde-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Lynx Point Siamese",
        "1ddd0615-d7ed-11ea-b2dc-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Short-haired Dutch Shepherd Dog",
        "1ddc6968-d7ed-11ea-8a5d-302432eba3ec",
        "630",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dragon Li",
        "1ddd05fd-d7ed-11ea-bb88-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Belgian Griffon Mix",
        "1ddc908c-d7ed-11ea-8cf6-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Croatian Sheepdog Mix",
        "1ddc90ce-d7ed-11ea-af7e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sarabi dog mix",
        "817ce663-63f5-11ec-b68f-7085c2a1b8e0",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Javanese Mix",
        "1ddd2d0d-d7ed-11ea-8715-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Siberian Husky Mix",
        "1ddcdee5-d7ed-11ea-ab99-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mekong Bobtail",
        "1ddd0618-d7ed-11ea-9d7b-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Thai Ridgeback dog Mix",
        "1ddcdf04-d7ed-11ea-a295-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Nederlandse Kooikerhondje",
        "1ddc4278-d7ed-11ea-a88c-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Spitz Mix",
        "1ddcb797-d7ed-11ea-b1da-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-Haired Large Portuguese Podengo",
        "1ddc42a0-d7ed-11ea-90bc-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Basenji Mix",
        "1ddc9084-d7ed-11ea-b8f5-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Toy Manchester Terrier Mix",
        "1ddcdf43-d7ed-11ea-846d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rabbit Hunting Dachshund Mix",
        "1ddc90dc-d7ed-11ea-a022-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kishu Ken",
        "1ddc4254-d7ed-11ea-8da4-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis mesomelas mesomelas",
        "5d5e98e2-bd6c-11eb-99e9-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Silky Terrier",
        "1ddbf429-d7ed-11ea-b05e-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pharaoh Hound Mix",
        "1ddcb80e-d7ed-11ea-9c9a-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pug Dog",
        "1ddc42a8-d7ed-11ea-8334-302432eba3ec",
        "156",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Toy Terrier",
        "1ddc1b64-d7ed-11ea-8bb0-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Stumpy Tail Cattle Dog",
        "1ddbf42a-d7ed-11ea-9fe5-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Russian Toy",
        "1ddc42b7-d7ed-11ea-b67f-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "LaPerm Long-haired Mix",
        "1ddd2d17-d7ed-11ea-8577-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Devon Rex",
        "1ddd05fb-d7ed-11ea-808d-302432eba3ec",
        "14",
        "42",
        "breed",
        "antech"
    ],
    [
        "Spanish Greyhound",
        "1ddc696a-d7ed-11ea-ab66-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Croatian Sheepdog",
        "1ddc1b52-d7ed-11ea-ac30-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-Haired Miniature Portuguese Podengo",
        "1ddc429f-d7ed-11ea-ac17-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Affenpinscher Mix",
        "1ddc69df-d7ed-11ea-9a16-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "British Blue Cat Mix",
        "1ddd2cf2-d7ed-11ea-a1a5-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Small Blue Gascony Hound Mix",
        "1ddcdeec-d7ed-11ea-8249-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Suphalak",
        "1ddd0645-d7ed-11ea-bec8-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Norwegian Buhund Mix",
        "1ddcb7fc-d7ed-11ea-913d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dandie Dinmont Terrier",
        "1ddc1b41-d7ed-11ea-84b9-302432eba3ec",
        "91",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sussex Spaniel",
        "1ddc6972-d7ed-11ea-a454-302432eba3ec",
        "177",
        "41",
        "breed",
        "antech"
    ],
    [
        "Burgos Pointing Dog",
        "1ddc1b35-d7ed-11ea-a1ad-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Munchkin Cat Mix",
        "1ddd2d21-d7ed-11ea-8979-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Lakeland Terrier Mix",
        "1ddcb7c8-d7ed-11ea-aa89-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Black Mix",
        "1ddd2d35-d7ed-11ea-98cb-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "West Highland White Terrier Mix",
        "1ddcdf14-d7ed-11ea-b02d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-haired Standard Dachshund Mix",
        "1ddc90de-d7ed-11ea-94c1-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Cocker Spaniel",
        "1ddbf41a-d7ed-11ea-b0b3-302432eba3ec",
        "86",
        "41",
        "breed",
        "antech"
    ],
    [
        "Keeshond Mix",
        "c6b49ac4-a169-11ec-8ae8-7085c2a1b8e0",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Setter dog",
        "1ddc69cd-d7ed-11ea-b2b1-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Black and Tan Coonhound Mix",
        "1ddc9097-d7ed-11ea-a889-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sporting Lucas Terrier Mix",
        "1ddcdf40-d7ed-11ea-bb68-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norwegian Elkhound Mix",
        "1ddcb7fd-d7ed-11ea-99e6-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Pointing Dog Gascogne",
        "1ddc1b8a-d7ed-11ea-b7b0-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Traditional Persian Mix",
        "1ddd2d50-d7ed-11ea-a782-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Dwelf Cat Mix",
        "1ddd2d03-d7ed-11ea-94f4-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Setter dog Mix",
        "1ddd05c0-d7ed-11ea-84e5-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hokkaido",
        "1ddc1bb7-d7ed-11ea-91da-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Azawakh",
        "1ddbf430-d7ed-11ea-9f2f-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Parson Russell Terrier Mix",
        "1ddcb7f2-d7ed-11ea-bf46-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Asian Cat",
        "1ddd05df-d7ed-11ea-9363-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Wire-Haired Large Portuguese Podengo Mix",
        "1ddcb820-d7ed-11ea-9ef2-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Labrador Retriever",
        "1ddc425a-d7ed-11ea-a641-302432eba3ec",
        "130",
        "41",
        "breed",
        "antech"
    ],
    [
        "Manx",
        "1ddd0617-d7ed-11ea-9358-302432eba3ec",
        "24",
        "42",
        "breed",
        "antech"
    ],
    [
        "Curilsk Bobtail",
        "1ddd0610-d7ed-11ea-a624-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Blue-Eyed Cat",
        "1ddd0623-d7ed-11ea-895d-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Labrador Wolf",
        "5d5dd59e-bd6c-11eb-9b07-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Cat",
        "1ddd062f-d7ed-11ea-9a82-302432eba3ec",
        "29",
        "42",
        "breed",
        "antech"
    ],
    [
        "Rafeiro of Alentejo Mix",
        "1ddcdec2-d7ed-11ea-afd4-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Bulldog",
        "1ddbf419-d7ed-11ea-971b-302432eba3ec",
        "75",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mexican Hairless Dog Miniature",
        "1ddc426f-d7ed-11ea-9c8b-302432eba3ec",
        "533",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mexican Hairless Dog",
        "1ddc69d3-d7ed-11ea-8341-302432eba3ec",
        "1296",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Spaniel",
        "1ddc1b8c-d7ed-11ea-aea2-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Standard Schnauzer",
        "1ddc42c4-d7ed-11ea-8421-302432eba3ec",
        "426",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Setter Mix",
        "1ddc90f3-d7ed-11ea-8375-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "South Russian Shepherd Dog Mix",
        "1ddcdf19-d7ed-11ea-ab8b-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Elo Mix",
        "1ddc90ee-d7ed-11ea-aaec-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Miniature Dachshund Mix",
        "1ddc90d3-d7ed-11ea-8e4d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bergamasco Shepherd Dog Mix",
        "1ddc908d-d7ed-11ea-8a94-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tibetan Spaniel Mix",
        "1ddcdf06-d7ed-11ea-9b23-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "European Shorthair",
        "1ddd0601-d7ed-11ea-8983-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Porcelain",
        "1ddc429a-d7ed-11ea-b20e-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Hound Mix",
        "1ddc910e-d7ed-11ea-97da-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Neapolitan Mastiff Mix",
        "1ddcdef3-d7ed-11ea-8317-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Garafian Shepherd Mix",
        "1ddcdf2a-d7ed-11ea-bfce-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Curly Coated Retriever Mix",
        "1ddc90d0-d7ed-11ea-a638-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pekingese Dog",
        "1ddc4288-d7ed-11ea-8b6b-302432eba3ec",
        "147",
        "41",
        "breed",
        "antech"
    ],
    [
        "Border Terrier Mix",
        "1ddc90a1-d7ed-11ea-965d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "BeagleHarrier Mix",
        "1ddc9088-d7ed-11ea-bf85-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-haired Rabbit Hunting Dachshund Mix",
        "1ddc90d7-d7ed-11ea-a8ff-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Maltese Mix",
        "1ddcb7e8-d7ed-11ea-a103-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Oregon Rex",
        "1ddd0624-d7ed-11ea-b975-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Borzoi Mix",
        "1ddc90a2-d7ed-11ea-95de-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Oriental Cat",
        "1ddd0626-d7ed-11ea-ba51-302432eba3ec",
        "27",
        "42",
        "breed",
        "antech"
    ],
    [
        "Wila Krungthep",
        "1ddd2cda-d7ed-11ea-ac89-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Jack Russell Terrier Mix",
        "1ddcb7bd-d7ed-11ea-8615-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cyprus Cat Mix",
        "1ddd2cff-d7ed-11ea-9dce-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Lancashire Heeler Mix",
        "1ddcb7dd-d7ed-11ea-a3f9-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Shiba Mix",
        "1ddcdee1-d7ed-11ea-b863-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Spaniel dog Mix",
        "1ddcdf49-d7ed-11ea-a267-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans clepticus",
        "5d5ac85d-bd6c-11eb-ab02-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Beagle Mix",
        "1ddc9087-d7ed-11ea-a90d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mudi",
        "1ddc4276-d7ed-11ea-8add-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bernese Mountain Dog",
        "1ddbf442-d7ed-11ea-aa83-302432eba3ec",
        "61",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus tundrarum",
        "5d5e98df-bd6c-11eb-977f-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus youngi",
        "5d5e98e0-bd6c-11eb-a024-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Poodle Mix Toy",
        "1ddcb81a-d7ed-11ea-bcb1-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tornjak",
        "1ddc6982-d7ed-11ea-b369-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kai Mix",
        "1ddcb7ce-d7ed-11ea-a6ed-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans umpquensis",
        "5d5c27e0-bd6c-11eb-b5ec-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rottweiler Mix",
        "1ddcdec7-d7ed-11ea-bc61-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Raas Mix",
        "1ddd2d31-d7ed-11ea-8b8c-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Dachshund Long-haired Miniature",
        "1ddc1b5d-d7ed-11ea-a14c-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Swiss Hound Mix",
        "ad67768a-71c0-11ed-88d8-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-faced Pyrenean Sheepdog Mix",
        "1ddcdec1-d7ed-11ea-8390-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-Haired Large Portuguese Podengo Mix",
        "1ddcb81d-d7ed-11ea-87c9-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Snowshoe Cat Mix",
        "1ddd2d44-d7ed-11ea-aeb3-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Cairn Terrier Mix",
        "1ddc90af-d7ed-11ea-b363-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Small Portuguese Podengo Mix",
        "f694d8b2-7bc1-11eb-bc05-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bearded Collie Mix",
        "1ddc9089-d7ed-11ea-8e3b-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus arabs",
        "5d5c9d35-bd6c-11eb-bfa9-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Appenzell Cattle Dog Mix",
        "1ddc69ec-d7ed-11ea-a2db-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norwegian Forest Cat Mix",
        "1ddd2d26-d7ed-11ea-9ce1-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Tibetan Terrier",
        "1ddc6981-d7ed-11ea-886e-302432eba3ec",
        "179",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Standard Dachshund",
        "1ddc1b5c-d7ed-11ea-b8b8-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Burmese Cat",
        "1ddd05ef-d7ed-11ea-93f9-302432eba3ec",
        "10",
        "42",
        "breed",
        "antech"
    ],
    [
        "Russian Spaniel",
        "1ddc69c0-d7ed-11ea-848e-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus ligoni",
        "5d5dd59f-bd6c-11eb-ab0e-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Fawn Brittany Basset",
        "1ddc1b7e-d7ed-11ea-892a-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Saint Bernard Dog Mix",
        "1ddcdecf-d7ed-11ea-a094-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Peruvian Hairless Dog Mix miniature",
        "1ddcb80c-d7ed-11ea-9d9e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Berger Picard",
        "1ddbf440-d7ed-11ea-a229-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Maltipoo",
        "1ddc69d9-d7ed-11ea-be0b-302432eba3ec",
        "1302",
        "41",
        "breed",
        "antech"
    ],
    [
        "Swedish White Elkhound Mix",
        "1ddcdefd-d7ed-11ea-b9a4-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Save Valley Scenthound",
        "1ddc42c0-d7ed-11ea-8d21-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Short-haired Saint Bernard Dog",
        "1ddc42bd-d7ed-11ea-8e0d-302432eba3ec",
        "160",
        "41",
        "breed",
        "antech"
    ],
    [
        "Powderpuff Chinese Crested Mix",
        "1ddc90c4-d7ed-11ea-bd2f-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chinese Crested Mix",
        "1ddc90c2-d7ed-11ea-ad96-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Black-backed Jackal",
        "e7e24c9a-59a3-11eb-a51c-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans hondurensis",
        "5d5b1670-bd6c-11eb-b7af-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Jura Hound",
        "1ddc424d-d7ed-11ea-a0c6-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Beauceron Mix",
        "1ddc908a-d7ed-11ea-986a-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Austrian Black and Tan Hound Mix",
        "1ddc907f-d7ed-11ea-9111-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Curly Coated Retriever",
        "1ddc1b54-d7ed-11ea-8d0c-302432eba3ec",
        "88",
        "41",
        "breed",
        "antech"
    ],
    [
        "Gascon Saintongeois Mix",
        "1ddc910d-d7ed-11ea-bbed-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Miniature American Shepherd",
        "1ddc4265-d7ed-11ea-b0d8-302432eba3ec",
        "533",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sloughi Dog",
        "1ddc42d3-d7ed-11ea-bfa0-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Ghadrejani Mix",
        "46578df8-63f8-11ec-a061-7085c2a1b8e0",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Spitz Miniature",
        "1ddc1b9e-d7ed-11ea-befd-302432eba3ec",
        "153",
        "41",
        "breed",
        "antech"
    ],
    [
        "Shih Tzu Mix",
        "1ddcdee3-d7ed-11ea-baa0-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired German Shepherd Dog Mix",
        "1ddcb793-d7ed-11ea-9be3-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Bulldog",
        "1ddc1b73-d7ed-11ea-9087-302432eba3ec",
        "632",
        "41",
        "breed",
        "antech"
    ],
    [
        "Montenegrin Mountain Hound",
        "1ddc4275-d7ed-11ea-a1db-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Leonberger Mix",
        "1ddcb7e1-d7ed-11ea-967c-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Poodle",
        "1ddc4295-d7ed-11ea-8d33-302432eba3ec",
        "154",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Hunting Terrier Mix",
        "1ddc90f5-d7ed-11ea-8241-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Somali Cat",
        "1ddd0641-d7ed-11ea-96e6-302432eba3ec",
        "36",
        "42",
        "breed",
        "antech"
    ],
    [
        "Serrade Petit",
        "1ddd063b-d7ed-11ea-a2ea-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Polish Hunting Dog",
        "1ddc4293-d7ed-11ea-9ad2-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Slovakian Chuvach",
        "1ddc42d4-d7ed-11ea-b033-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Manx Cat Mix",
        "1ddd2d1c-d7ed-11ea-a28d-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Flat Coated Retriever",
        "1ddc1b85-d7ed-11ea-aaf3-302432eba3ec",
        "99",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hokkaido Mix",
        "1ddcb7b2-d7ed-11ea-a4b7-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rough-haired Dutch Shepherd Dog",
        "1ddc42b2-d7ed-11ea-a67e-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rabbit Hunting Dachshund",
        "1ddc1b60-d7ed-11ea-8ba8-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schnauzer Mix Miniature",
        "1ddcb7f4-d7ed-11ea-ae04-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Polish Hound",
        "1ddc4292-d7ed-11ea-b68f-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Petit Basset Griffon Vendeen Mix",
        "1ddcb80d-d7ed-11ea-b114-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cymric Long-haired Mix",
        "1ddd2cfe-d7ed-11ea-bf3b-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Ibizan Hound Mix",
        "1ddcb7b9-d7ed-11ea-b9d7-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Balinese Cat",
        "1ddd05e4-d7ed-11ea-b040-302432eba3ec",
        "6",
        "42",
        "breed",
        "antech"
    ],
    [
        "Great Pyrenees Pyrenean Mountain Dog",
        "1ddc1bab-d7ed-11ea-8d0b-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Rabbit Hunting Dachshund",
        "1ddc1b59-d7ed-11ea-a01d-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus hodophilax",
        "5d5dae9f-bd6c-11eb-b936-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Phalène Continental Toy Spaniel Mix",
        "1ddc90cc-d7ed-11ea-bd99-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Georgian Shepherd",
        "1ddc69a4-d7ed-11ea-a97e-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Goldendoodle",
        "734e4977-3bf8-11ec-84ee-7085c2a1b8e0",
        "541",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Pinscher",
        "1ddc1b95-d7ed-11ea-abc9-302432eba3ec",
        "105",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pixie-bob Mix",
        "1ddd2d30-d7ed-11ea-a1da-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Artesian-Norman Basset",
        "1ddbf423-d7ed-11ea-9b30-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Artois Hound",
        "1ddbf424-d7ed-11ea-94f6-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dachshund Mix",
        "1ddc90d2-d7ed-11ea-b4fe-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Shetland Sheepdog",
        "1ddc42cd-d7ed-11ea-8801-302432eba3ec",
        "167",
        "41",
        "breed",
        "antech"
    ],
    [
        "Affenpinscher",
        "1ddbf413-d7ed-11ea-87e2-302432eba3ec",
        "41",
        "41",
        "breed",
        "antech"
    ],
    [
        "Saarloos Wolfdog",
        "1ddc42ba-d7ed-11ea-bc34-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Billy",
        "1ddbf444-d7ed-11ea-bd70-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norwich Terrier",
        "1ddc4269-d7ed-11ea-8292-302432eba3ec",
        "143",
        "41",
        "breed",
        "antech"
    ],
    [
        "Leonberger",
        "1ddc4261-d7ed-11ea-9b43-302432eba3ec",
        "489",
        "41",
        "breed",
        "antech"
    ],
    [
        "Greyhound",
        "1ddc1bae-d7ed-11ea-bc95-302432eba3ec",
        "115",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tonkinese Cat Mix",
        "1ddd2d4c-d7ed-11ea-8040-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Afghan Hound",
        "1ddbf414-d7ed-11ea-8e57-302432eba3ec",
        "42",
        "41",
        "breed",
        "antech"
    ],
    [
        "Atlas Shepherd Dog",
        "1ddbf425-d7ed-11ea-a8fc-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Toy Spaniel",
        "1ddc69c3-d7ed-11ea-8a52-302432eba3ec",
        "96",
        "41",
        "breed",
        "antech"
    ],
    [
        "Miniature Shar Pei Mix",
        "1ddd05ce-d7ed-11ea-b8a8-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Chihuahua",
        "1ddc1b44-d7ed-11ea-aef7-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chihuahua",
        "1ddc1b43-d7ed-11ea-a698-302432eba3ec",
        "81",
        "41",
        "breed",
        "antech"
    ],
    [
        "Briard",
        "1ddbf459-d7ed-11ea-b67e-302432eba3ec",
        "71",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hairless Chinese Crested Mix",
        "1ddc90c3-d7ed-11ea-94f6-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-faced Pyrenean Sheepdog",
        "1ddc42ae-d7ed-11ea-b997-302432eba3ec",
        "497",
        "41",
        "breed",
        "antech"
    ],
    [
        "Fila Brasileiro Mix",
        "1ddc90fd-d7ed-11ea-a6aa-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Slovakian Hound Mix",
        "1ddcdee9-d7ed-11ea-8901-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Siamese Mix",
        "1ddd2d41-d7ed-11ea-9289-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Wetterhoun",
        "1ddc6991-d7ed-11ea-a92d-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Belgian Shepherd Dog Tervuren",
        "1ddc6998-d7ed-11ea-9afd-302432eba3ec",
        "60",
        "41",
        "breed",
        "antech"
    ],
    [
        "Belgian Shepherd Dog",
        "5c24eb8c-d5bd-11ea-83fb-302432eba3ec",
        "1311",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dalmatian",
        "1ddc1b63-d7ed-11ea-bd2a-302432eba3ec",
        "90",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pyrenean Shepherd Mix",
        "1ddcdf2e-d7ed-11ea-b26b-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Jagdterrier dog",
        "1ddc69b1-d7ed-11ea-8a17-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Basenji",
        "1ddbf432-d7ed-11ea-a3ab-302432eba3ec",
        "53",
        "41",
        "breed",
        "antech"
    ],
    [
        "Old German Shepherd Dog",
        "1ddc4266-d7ed-11ea-b1f7-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canadian Eskimo Dog",
        "1ddc1b38-d7ed-11ea-90e3-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Water Spaniel",
        "1ddbf41e-d7ed-11ea-8345-302432eba3ec",
        "48",
        "41",
        "breed",
        "antech"
    ],
    [
        "Artesian-Norman Basset Mix",
        "1ddc69ef-d7ed-11ea-952e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Napoleon Cat Mix",
        "1ddd2d22-d7ed-11ea-bc68-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis lupus griseoalbus",
        "5d5d8770-bd6c-11eb-8f2e-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Standard Dachshund Mix",
        "1ddc90d4-d7ed-11ea-8ff7-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Miniature Portuguese Podengo",
        "e452cd9c-7bc1-11eb-8966-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Shikoku Mix",
        "1ddcdee4-d7ed-11ea-9946-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cairn Terrier",
        "1ddc1b33-d7ed-11ea-bf8d-302432eba3ec",
        "77",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans vigilis",
        "5d5c27e1-bd6c-11eb-9814-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sphynx Cat",
        "1ddd0643-d7ed-11ea-b71c-302432eba3ec",
        "37",
        "42",
        "breed",
        "antech"
    ],
    [
        "Cao Fila de Sao Miguel",
        "1ddc1b3b-d7ed-11ea-8ff5-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Large Münsterlander",
        "1ddc4260-d7ed-11ea-af86-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Laekenois Belgian Shepherd Dog",
        "1ddc1b6f-d7ed-11ea-82c8-302432eba3ec",
        "629",
        "41",
        "breed",
        "antech"
    ],
    [
        "Lancashire Heeler",
        "1ddc425d-d7ed-11ea-83ab-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Italian Spinone Mix",
        "1ddcb7c7-d7ed-11ea-8dbf-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired German Shepherd Dog",
        "1ddc1b98-d7ed-11ea-a88c-302432eba3ec",
        "106",
        "41",
        "breed",
        "antech"
    ],
    [
        "Birman Cat Mix",
        "1ddd2cef-d7ed-11ea-9d22-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Aphrodite Giant",
        "1ddd05dd-d7ed-11ea-b116-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis lupus rufus",
        "5d5e71d1-bd6c-11eb-a2c2-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Jagdterrier dog Mix",
        "1ddcdf38-d7ed-11ea-9090-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Miniature Pinscher Mix",
        "1ddcb7f3-d7ed-11ea-8b10-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tortie Point Siamese",
        "1ddd0649-d7ed-11ea-b8e1-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Japanese Spitz",
        "1ddc424b-d7ed-11ea-9800-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Standard Dachshund Mix",
        "1ddc90d8-d7ed-11ea-8bc8-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Hairless Terrier",
        "1ddc69ab-d7ed-11ea-ae8c-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Silky Terrier",
        "1ddc69b8-d7ed-11ea-907d-302432eba3ec",
        "171",
        "41",
        "breed",
        "antech"
    ],
    [
        "Large Münsterlander Mix",
        "1ddcb7e0-d7ed-11ea-9a7b-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Catalan Sheepdog",
        "1ddc1b3d-d7ed-11ea-84f6-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Alaskan Malamute Mix",
        "1ddc69e2-d7ed-11ea-98d3-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schnauzer Dog",
        "1ddc42c5-d7ed-11ea-ab75-302432eba3ec",
        "543",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rough-coated Collie",
        "1ddc1b4d-d7ed-11ea-ae6d-302432eba3ec",
        "87",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dutch Shepherd Dog",
        "1ddc1b96-d7ed-11ea-9a30-302432eba3ec",
        "630",
        "41",
        "breed",
        "antech"
    ],
    [
        "Briquet Griffon Vendeen",
        "1ddc69d0-d7ed-11ea-99f5-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chausie Cat Mix",
        "1ddd2cf9-d7ed-11ea-a9c2-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Stabyhoun Mix",
        "1ddcdef6-d7ed-11ea-aefc-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Pointing Dog Mix",
        "1ddc9105-d7ed-11ea-a81d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tortie Point Siamese Mix",
        "1ddd2d4e-d7ed-11ea-8548-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Burmilla",
        "1ddd05f0-d7ed-11ea-998b-302432eba3ec",
        "10",
        "42",
        "breed",
        "antech"
    ],
    [
        "Kromfohrländer Mix",
        "1ddcb7d7-d7ed-11ea-90ce-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Gascogne French Pointing Dog Mix",
        "1ddc9106-d7ed-11ea-8c2b-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hamilton Hound",
        "1ddc1bb2-d7ed-11ea-8604-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sphynx Cat Mix",
        "1ddd2d48-d7ed-11ea-b82b-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Labrador Retriever Mix",
        "1ddcb7da-d7ed-11ea-8904-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-Haired Medium-Sized Portuguese Podengo",
        "1ddc429e-d7ed-11ea-b0b8-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Spaniel Mix",
        "1ddcdf47-d7ed-11ea-9f8d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Scottish Deerhound",
        "1ddc42c6-d7ed-11ea-b0fd-302432eba3ec",
        "164",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Rabbit Hunting Dachshund Mix",
        "1ddc90d6-d7ed-11ea-9bbf-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Traditional Persian",
        "1ddd064b-d7ed-11ea-a430-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Ocicat Cat",
        "1ddd0622-d7ed-11ea-a09e-302432eba3ec",
        "26",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis aureus bea",
        "5d59de4d-bd6c-11eb-8fbf-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-Haired Miniature Portuguese Podengo Mix",
        "1ddcb81f-d7ed-11ea-a50e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus orion",
        "5d5e4ac0-bd6c-11eb-b43a-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Long-haired Bobtail Mix",
        "1ddd2cdf-d7ed-11ea-8fde-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Rafeiro of Alentejo",
        "1ddc42af-d7ed-11ea-9836-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canarian Warren Hound Mix",
        "1ddc90b5-d7ed-11ea-844d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Short haired Majorcan Shepherd Dog Mix",
        "1ddcdec6-d7ed-11ea-a56a-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Munsterlander Mix",
        "1ddd05cf-d7ed-11ea-a682-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Grey Norwegian Elkhound Mix",
        "1ddcb7ff-d7ed-11ea-946f-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Russian Toy Mix",
        "1ddcdeca-d7ed-11ea-afce-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cao Fila de Sao Miguel Mix",
        "1ddc90b7-d7ed-11ea-9e57-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Glen of Imaal Terrier",
        "1ddc69af-d7ed-11ea-8977-302432eba3ec",
        "495",
        "41",
        "breed",
        "antech"
    ],
    [
        "Halden Hound",
        "1ddc1bb0-d7ed-11ea-94f2-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norwegian Elkhound grey",
        "1ddc427f-d7ed-11ea-a23d-302432eba3ec",
        "142",
        "41",
        "breed",
        "antech"
    ],
    [
        "Balinese Cat Mix",
        "1ddd2cec-d7ed-11ea-8b56-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Cane corso",
        "1ddc1b3a-d7ed-11ea-86a8-302432eba3ec",
        "525",
        "41",
        "breed",
        "antech"
    ],
    [
        "Jungle Curl",
        "1ddd0609-d7ed-11ea-a1de-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "American Cocker Spaniel Mix",
        "1ddc69e6-d7ed-11ea-bfe5-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tatra Shepherd Dog",
        "1ddc6996-d7ed-11ea-9b04-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Brazilian Terrier",
        "1ddbf458-d7ed-11ea-b356-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus campestris",
        "5d5ceb31-bd6c-11eb-b4eb-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Alpine Dachsbracke",
        "1ddbf417-d7ed-11ea-9148-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cymric Mix",
        "1ddd2cfd-d7ed-11ea-be92-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Long-haired Rabbit Hunting Dachshund Mix",
        "1ddc90d5-d7ed-11ea-af5d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Blue Gascony Basset",
        "1ddbf447-d7ed-11ea-9336-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Manchester Terrier",
        "1ddc424c-d7ed-11ea-801d-302432eba3ec",
        "135",
        "41",
        "breed",
        "antech"
    ],
    [
        "Himalayan Sheepdog Mix",
        "1ddcdf4e-d7ed-11ea-a394-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Wirehaired Pointer",
        "1ddc1ba0-d7ed-11ea-9c88-302432eba3ec",
        "108",
        "41",
        "breed",
        "antech"
    ],
    [
        "Irish Glen of Imaal Terrier",
        "1ddc1b86-d7ed-11ea-ac05-302432eba3ec",
        "495",
        "41",
        "breed",
        "antech"
    ],
    [
        "Short-haired German Shepherd Dog",
        "1ddc697b-d7ed-11ea-84d5-302432eba3ec",
        "106",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Terrier Mix",
        "1ddc69f7-d7ed-11ea-8cb7-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Cymric",
        "1ddd05f9-d7ed-11ea-89d9-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Gordon Setter",
        "1ddc1ba3-d7ed-11ea-8bd7-302432eba3ec",
        "111",
        "41",
        "breed",
        "antech"
    ],
    [
        "Majorca Mastiff",
        "1ddc4277-d7ed-11ea-a05e-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Finnish Lapphund Mix",
        "1ddc90ff-d7ed-11ea-ade7-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Central Asia Shepherd Dog Mix",
        "1ddc9090-d7ed-11ea-9e75-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Kurilean BobtailMix",
        "1ddd2d13-d7ed-11ea-98ec-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Tibetan Spaniel",
        "1ddc6980-d7ed-11ea-a24f-302432eba3ec",
        "178",
        "41",
        "breed",
        "antech"
    ],
    [
        "Aegean Mix",
        "1ddd2cdd-d7ed-11ea-82d5-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "German Rex",
        "1ddd0603-d7ed-11ea-8a0d-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Volpino Italiano",
        "1ddc6987-d7ed-11ea-872b-302432eba3ec",
        "1300",
        "41",
        "breed",
        "antech"
    ],
    [
        "Uruguayan Cimarron Mix",
        "1ddcdf0c-d7ed-11ea-8bba-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Greater Swiss Mountain Dog",
        "1ddc1bac-d7ed-11ea-9da3-302432eba3ec",
        "114",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cavalier King Charles Spaniel",
        "1ddc1b3f-d7ed-11ea-bae7-302432eba3ec",
        "79",
        "41",
        "breed",
        "antech"
    ],
    [
        "Picardy Spaniel Mix",
        "1ddcb80f-d7ed-11ea-91a9-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dunker Hound",
        "1ddc1b6c-d7ed-11ea-906e-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kangal Shepherd Dog Mix",
        "1ddc90e9-d7ed-11ea-81db-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Scottish Fold Mix",
        "1ddd2d3c-d7ed-11ea-8999-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Lynx Point Siamese Mix",
        "1ddd2d1a-d7ed-11ea-87f6-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Bengal Mix",
        "1ddd2cee-d7ed-11ea-9bc1-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Puli",
        "1ddc42a9-d7ed-11ea-82f8-302432eba3ec",
        "157",
        "41",
        "breed",
        "antech"
    ],
    [
        "Persian Cat",
        "1ddd0629-d7ed-11ea-bbc7-302432eba3ec",
        "28",
        "42",
        "breed",
        "antech"
    ],
    [
        "Neva Masquerade",
        "1ddd0620-d7ed-11ea-b026-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Sussex Spaniel Mix",
        "1ddcdef9-d7ed-11ea-b2d7-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Staffordshire Bull Terrier",
        "1ddc42d2-d7ed-11ea-8199-302432eba3ec",
        "175",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-haired Miniature Dachshund Mix",
        "1ddc90db-d7ed-11ea-bcab-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dragon Li Mix",
        "1ddd2d02-d7ed-11ea-837a-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Asian Cat Mix",
        "1ddd2ce7-d7ed-11ea-9189-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Hollandse Smoushond",
        "1ddc1bb8-d7ed-11ea-89f7-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Cocker Spaniel Mix",
        "1ddc90f0-d7ed-11ea-ae7f-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bohemian Shepherd",
        "1ddbf43c-d7ed-11ea-a955-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Rabbit Hunting Dachshund",
        "1ddc1b5a-d7ed-11ea-bce5-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis aureus riparius",
        "5d5a7a33-bd6c-11eb-949f-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bombay Cat Mix",
        "1ddd2cf1-d7ed-11ea-a4e7-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Swedish Vallhund Mix",
        "1ddcdefc-d7ed-11ea-8d6d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Samoyed Mix",
        "1ddcded2-d7ed-11ea-8198-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Border Terrier",
        "1ddbf44f-d7ed-11ea-9e94-302432eba3ec",
        "66",
        "41",
        "breed",
        "antech"
    ],
    [
        "Oriental Bicolor",
        "1ddd0625-d7ed-11ea-bcb2-302432eba3ec",
        "27",
        "42",
        "breed",
        "antech"
    ],
    [
        "British Cat Mix",
        "1ddd2cf3-d7ed-11ea-930a-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Welsh Corgi Pembroke",
        "1ddc698b-d7ed-11ea-9282-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Old English Sheepdog Mix",
        "1ddcb804-d7ed-11ea-9834-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bambino Cat Mix",
        "1ddd2ced-d7ed-11ea-8aa0-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Dogue De Bordeaux Mix",
        "1ddc90e5-d7ed-11ea-a520-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Standardized Siamese Cat Mix",
        "1ddd2d49-d7ed-11ea-ac5c-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Bavarian Mountain Scenthound",
        "1ddbf434-d7ed-11ea-8322-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bohemian Shepherd Mix",
        "1ddc908e-d7ed-11ea-8d42-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bohemian Wire-haired Pointing Griffon Mix",
        "1ddc909e-d7ed-11ea-994d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Indian Spitz",
        "1ddc69ce-d7ed-11ea-8db4-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Terceira Mastiff",
        "1ddc69cb-d7ed-11ea-9af9-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kerry Blue Terrier",
        "1ddc4240-d7ed-11ea-8b27-302432eba3ec",
        "127",
        "41",
        "breed",
        "antech"
    ],
    [
        "Miniature Bull Terrier Mix",
        "1ddcb7d1-d7ed-11ea-87f0-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Barbet",
        "1ddbf431-d7ed-11ea-bde6-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Harrier Mix",
        "1ddcb7af-d7ed-11ea-96ae-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus arctos",
        "5d5cc426-bd6c-11eb-90c8-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Black Russian Terrier Mix",
        "1ddcdf33-d7ed-11ea-bcd9-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Scottish Terrier",
        "1ddc4281-d7ed-11ea-972a-302432eba3ec",
        "165",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wolf Mix",
        "1ddcdf1a-d7ed-11ea-ab2d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Peterbald",
        "1ddd062a-d7ed-11ea-8941-302432eba3ec",
        "507",
        "42",
        "breed",
        "antech"
    ],
    [
        "Blue Gascony Griffon Mix",
        "1ddc909a-d7ed-11ea-9333-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Spitz Pomeranian",
        "1ddc1b9f-d7ed-11ea-b60f-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Welsh Terrier Mix",
        "1ddcdf13-d7ed-11ea-bf29-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Otterhound",
        "1ddc4286-d7ed-11ea-9d65-302432eba3ec",
        "635",
        "41",
        "breed",
        "antech"
    ],
    [
        "Korean Bobtail",
        "1ddd060c-d7ed-11ea-9b97-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Shar Pei Mix",
        "1ddcdedf-d7ed-11ea-af8d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tosa",
        "1ddc6983-d7ed-11ea-aa80-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Boykin Spaniel Mix",
        "1ddcdf46-d7ed-11ea-889d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Retriever Dog Mix",
        "1ddd05c5-d7ed-11ea-963b-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Siberian Cat",
        "1ddd063d-d7ed-11ea-974a-302432eba3ec",
        "34",
        "42",
        "breed",
        "antech"
    ],
    [
        "Irish Water Spaniel Mix",
        "1ddcb7c2-d7ed-11ea-9b9c-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "PontAudemer Spaniel Mix",
        "1ddcdef0-d7ed-11ea-ade4-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Turkish Angora",
        "1ddd064c-d7ed-11ea-9418-302432eba3ec",
        "513",
        "42",
        "breed",
        "antech"
    ],
    [
        "Lhasa Apso Mix",
        "1ddcb7e2-d7ed-11ea-9c08-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "DanishSwedish Farmdog Mix",
        "1ddc90e1-d7ed-11ea-80df-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Thai Cat",
        "1ddd0646-d7ed-11ea-80c5-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Central Asia Shepherd Dog",
        "1ddbf43e-d7ed-11ea-b90f-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Oriental Short-haired",
        "1ddd0628-d7ed-11ea-a861-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Japanese Spitz Mix",
        "1ddcb7cb-d7ed-11ea-8c3a-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Water Spaniel Mix",
        "1ddc69ea-d7ed-11ea-af0f-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hälleforshund",
        "1ddc1bb1-d7ed-11ea-9b75-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Small Blue Gascony Hound",
        "1ddc6965-d7ed-11ea-8264-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Oriental Bicolor Mix",
        "1ddd2d2a-d7ed-11ea-b2f7-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Spanish Water Dog Mix",
        "1ddcdf4d-d7ed-11ea-ac73-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus bernardi",
        "5d5ceb30-bd6c-11eb-b9b6-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Wire-haired Korthals Pointing Griffon",
        "1ddc1b90-d7ed-11ea-af9a-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Italian Short-haired Hound",
        "1ddc4246-d7ed-11ea-878f-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Spitz Mix Pomeranian",
        "1ddcb79a-d7ed-11ea-a6c8-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus mackenzii",
        "5d5dfca2-bd6c-11eb-9ab1-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "King Shepherd",
        "1ddc69a6-d7ed-11ea-bdb8-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sokoke",
        "1ddd0640-d7ed-11ea-a020-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Taiwan Dog Mix",
        "1ddcdf00-d7ed-11ea-9cbc-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Karst Shepherd Dog",
        "1ddc1b6e-d7ed-11ea-a073-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian working kelpie Mix",
        "1ddc907e-d7ed-11ea-9a10-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Egyptian Mau Mix",
        "1ddd2d04-d7ed-11ea-bd26-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis latrans incolatus",
        "5d5b3d7f-bd6c-11eb-a9f9-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Majorca Mastiff Mix",
        "1ddcb7f7-d7ed-11ea-ad27-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Grand Griffon Vendeen",
        "1ddc1ba5-d7ed-11ea-b43b-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "York Chocolate Mix",
        "1ddd2d55-d7ed-11ea-9f4c-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Ibizan Hound Mix",
        "1ddcb7bb-d7ed-11ea-9f54-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Spaniel",
        "1ddc1b9b-d7ed-11ea-a8f4-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Elo",
        "1ddc1b72-d7ed-11ea-9426-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Greenland Dog",
        "1ddc1bad-d7ed-11ea-aca8-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus albus",
        "5d5c761a-bd6c-11eb-9320-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Turkish Van Mix",
        "1ddd2d52-d7ed-11ea-b41d-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Ragdoll Cat Mix",
        "1ddd2d33-d7ed-11ea-ae73-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Czechoslovakian Wolfdog",
        "1ddc1b55-d7ed-11ea-b718-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Groenendael Belgian Shepherd Dog Mix",
        "7f71a626-7bc2-11eb-930c-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Spaniel Mix",
        "1ddcb796-d7ed-11ea-8c2e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Russian Toy Mix",
        "1ddcdecb-d7ed-11ea-9ad4-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "South African Blue Cat",
        "1ddd0642-d7ed-11ea-b06c-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis latrans microdon",
        "5d5b8ba5-bd6c-11eb-a843-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Malinois Belgian Shepherd Dog Mix",
        "1ddcb7d0-d7ed-11ea-8380-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Terceira Mastiff Mix",
        "1ddd05be-d7ed-11ea-bf0b-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Japanese Chin",
        "1ddc424a-d7ed-11ea-8c8f-302432eba3ec",
        "125",
        "41",
        "breed",
        "antech"
    ],
    [
        "Suphalak Mix",
        "1ddd2d4a-d7ed-11ea-863d-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Halden Hound Mix",
        "1ddcb7ab-d7ed-11ea-93c0-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Continental Toy Spaniel Mix Papillon",
        "1ddc90cb-d7ed-11ea-ba6f-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dogo Argentino",
        "1ddc1b67-d7ed-11ea-863d-302432eba3ec",
        "1298",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Shepherd Dog",
        "1ddc1b3e-d7ed-11ea-a4cd-302432eba3ec",
        "106",
        "41",
        "breed",
        "antech"
    ],
    [
        "Porcelain Mix",
        "1ddcb81b-d7ed-11ea-b9e0-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bohemian Wire-haired Pointing Griffon",
        "1ddbf44c-d7ed-11ea-9732-302432eba3ec",
        "189",
        "41",
        "breed",
        "antech"
    ],
    [
        "Staffordshire Bull terrier Mix",
        "1ddcdee6-d7ed-11ea-8e55-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pyrenean French Pointing Dog Mix",
        "1ddc9107-d7ed-11ea-9df8-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Spotted Hound",
        "1ddc42b6-d7ed-11ea-a4c0-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "LaPerm Mix",
        "1ddd2d16-d7ed-11ea-8aba-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis latrans cagottis",
        "5d5aa14c-bd6c-11eb-aae4-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Welsh Sheepdog Mix",
        "1ddcdf50-d7ed-11ea-8546-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Belgian Shepherd Dog Groenendael",
        "1ddc1b40-d7ed-11ea-aba5-302432eba3ec",
        "628",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans mearnsi",
        "5d5b8ba4-bd6c-11eb-a318-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Shiba",
        "1ddc42ce-d7ed-11ea-93a8-302432eba3ec",
        "168",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cirneco dell'Etna Mix",
        "1ddc90c6-d7ed-11ea-bc36-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Miniature Fox Terrier Mix",
        "1ddcdf39-d7ed-11ea-9c42-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hamilton Hound Mix",
        "1ddcb7ad-d7ed-11ea-b6ce-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus fuscus",
        "5d5d6062-bd6c-11eb-b1f5-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Griffon Nivernais Mix",
        "1ddcb7aa-d7ed-11ea-8c94-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Nova Scotia Duck Tolling Retriever Mix",
        "1ddcb802-d7ed-11ea-bb8a-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Serbian Hound Mix",
        "1ddcdedd-d7ed-11ea-9c14-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Minskin",
        "1ddd0619-d7ed-11ea-98b6-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Long-haired Chihuahua",
        "1ddc1b45-d7ed-11ea-8310-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Ibizan Smooth-haired Hound",
        "1ddc1bc0-d7ed-11ea-a675-302432eba3ec",
        "118",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rottweiler",
        "1ddc42b4-d7ed-11ea-93d8-302432eba3ec",
        "159",
        "41",
        "breed",
        "antech"
    ],
    [
        "Grand Basset Griffon Vendeen",
        "1ddc1ba4-d7ed-11ea-8003-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-Haired Miniature Portuguese Podengo",
        "1ddc42a2-d7ed-11ea-93cf-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Welsh Terrier",
        "1ddc698d-d7ed-11ea-bd8b-302432eba3ec",
        "186",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sealyham Terrier Mix",
        "1ddcb808-d7ed-11ea-8ec4-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Lykoi Cat Mix",
        "1ddd2d19-d7ed-11ea-a769-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "American Wire-haired Mix",
        "1ddd2ce4-d7ed-11ea-a874-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Slovakian Chuvach Mix",
        "1ddcdee8-d7ed-11ea-82dd-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tosa Mix",
        "1ddcdf09-d7ed-11ea-bb5e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Ragdoll",
        "1ddd062e-d7ed-11ea-adbd-302432eba3ec",
        "30",
        "42",
        "breed",
        "antech"
    ],
    [
        "Irish Terrier Mix",
        "1ddc910f-d7ed-11ea-9509-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kishu Ken Mix",
        "1ddcb7d4-d7ed-11ea-9ab4-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chinese Crested Hairless",
        "1ddc1b47-d7ed-11ea-acf0-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chinese Crested",
        "1ddc1b46-d7ed-11ea-9990-302432eba3ec",
        "82",
        "41",
        "breed",
        "antech"
    ],
    [
        "Saint-Usuge Spaniel",
        "1ddc69c1-d7ed-11ea-84aa-302432eba3ec",
        "177",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Curl Mix",
        "1ddd2ce1-d7ed-11ea-b493-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis adustus lateralis",
        "5d5968c2-bd6c-11eb-a125-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Yakutian Laika Mix",
        "1ddcdf1b-d7ed-11ea-b94e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Polish Hunting Dog Mix",
        "1ddcb814-d7ed-11ea-9473-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Swedish Elkhound",
        "1ddc6973-d7ed-11ea-a476-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "East European Shepherd",
        "1ddc69a0-d7ed-11ea-9bec-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Azawakh Mix",
        "1ddc9082-d7ed-11ea-bc0b-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norwegian Lundehund Mix",
        "1ddcb800-d7ed-11ea-930d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Irish Red and White Setter Mix",
        "1ddcb7be-d7ed-11ea-9333-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mekong Bobtail Mix",
        "1ddd2d1d-d7ed-11ea-b6d1-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Finnish Lapphund",
        "1ddc1b83-d7ed-11ea-aed7-302432eba3ec",
        "529",
        "41",
        "breed",
        "antech"
    ],
    [
        "Short-haired Weimaraner",
        "1ddc6989-d7ed-11ea-b877-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hollandse Smoushond Mix",
        "1ddcb7b3-d7ed-11ea-85ba-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cheasapeake Bay Retriever",
        "1ddc1b42-d7ed-11ea-9fdc-302432eba3ec",
        "80",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Short-haired Pointer",
        "1ddc1b9a-d7ed-11ea-8144-302432eba3ec",
        "107",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-haired Miniature Dachshund",
        "1ddc1b5f-d7ed-11ea-b5d7-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Miniature Dachshund",
        "1ddc1b57-d7ed-11ea-b7c7-302432eba3ec",
        "89",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire Fox Terrier Mix",
        "1ddcdf1c-d7ed-11ea-88e7-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Scottish Terrier Mix",
        "1ddcb801-d7ed-11ea-b08f-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Black Terrier",
        "1ddc427a-d7ed-11ea-bae5-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tibetan Mastiff Mix",
        "1ddd05bf-d7ed-11ea-8ce2-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Aphrodite Giant Mix",
        "1ddd2ce5-d7ed-11ea-9c32-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Poodle Medium",
        "1ddc4296-d7ed-11ea-b8ad-302432eba3ec",
        "154",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Eskimo Dog Mix",
        "1ddc69e7-d7ed-11ea-8c38-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Grand Griffon Vendeen Mix",
        "1ddcb7a0-d7ed-11ea-ae47-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Spitz Mix Miniature",
        "1ddcb799-d7ed-11ea-ae4b-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Domestic Cat",
        "e7e6443a-59a3-11eb-ae9d-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Turkish Van",
        "1ddd064d-d7ed-11ea-8d05-302432eba3ec",
        "40",
        "42",
        "breed",
        "antech"
    ],
    [
        "French Hound White and Black",
        "1ddc1b8e-d7ed-11ea-bb6b-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schapendoes Mix",
        "1ddcded4-d7ed-11ea-8701-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "East Siberian Laïka Mix",
        "1ddc90ed-d7ed-11ea-b936-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Prague Ratter",
        "1ddc42a6-d7ed-11ea-8985-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cantabrian Water Dog",
        "1ddc69c5-d7ed-11ea-b691-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hälleforshund Mix",
        "1ddcb7ac-d7ed-11ea-8998-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Slovakian Rough-haired Pointer Mix",
        "1ddcdf4b-d7ed-11ea-8426-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Domestic Short-haired Cat (British)",
        "1ddd05ee-d7ed-11ea-98ef-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "English Cocker Spaniel",
        "1ddc1b74-d7ed-11ea-b918-302432eba3ec",
        "93",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Staffordshire Terrier",
        "1ddbf41d-d7ed-11ea-bdaf-302432eba3ec",
        "47",
        "41",
        "breed",
        "antech"
    ],
    [
        "Poodle Toy",
        "1ddc4299-d7ed-11ea-ae0b-302432eba3ec",
        "638",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bergamasco Shepherd Dog",
        "1ddbf43b-d7ed-11ea-b8e4-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Save Valley Scenthound Mix",
        "1ddcded3-d7ed-11ea-827d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Segugio Maremmano Mix",
        "1ddcdedc-d7ed-11ea-aabc-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Abyssinian",
        "1ddd05d2-d7ed-11ea-b586-302432eba3ec",
        "1",
        "42",
        "breed",
        "antech"
    ],
    [
        "Kintamani-Bali Mix",
        "1ddcb7d3-d7ed-11ea-af20-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Toy Terrier Mix",
        "1ddc90e0-d7ed-11ea-aaf9-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Finnish Spitz Mix",
        "1ddc9100-d7ed-11ea-931b-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Bulldog Mix",
        "1ddc69e5-d7ed-11ea-999d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norwich Terrier Mix",
        "1ddcb7e9-d7ed-11ea-811e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Weimaraner",
        "1ddc6988-d7ed-11ea-bbc7-302432eba3ec",
        "182",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus baileyi",
        "5d5cc427-bd6c-11eb-8e7b-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kromfohrländer",
        "1ddc4257-d7ed-11ea-ac19-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Galician Shepherd Dog Mix",
        "1ddcdf29-d7ed-11ea-8c86-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chausie",
        "1ddd05f4-d7ed-11ea-92d8-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Chantilly-Tiffany",
        "1ddd05f2-d7ed-11ea-aabf-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Oriental Long-haired Mix",
        "1ddd2d2c-d7ed-11ea-9b3a-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Ariege Pointing Dog",
        "1ddbf422-d7ed-11ea-acdb-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Wirehaired Pointer Mix",
        "1ddcb79b-d7ed-11ea-a048-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bichon Frise",
        "1ddbf443-d7ed-11ea-9447-302432eba3ec",
        "62",
        "41",
        "breed",
        "antech"
    ],
    [
        "Great Anglo-French White and Orange Hound",
        "1ddc1ba8-d7ed-11ea-abfa-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans texensis",
        "5d5bd9c0-bd6c-11eb-b86c-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Saint-Usuge Spaniel Mix",
        "1ddcdf48-d7ed-11ea-a60f-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rough-haired Dutch Shepherd Dog Mix",
        "1ddcdec5-d7ed-11ea-82cb-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Harrier",
        "1ddc1bb4-d7ed-11ea-9a0b-302432eba3ec",
        "116",
        "41",
        "breed",
        "antech"
    ],
    [
        "Peruvian Hairless Dog miniature",
        "1ddc428b-d7ed-11ea-80cb-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sam sawet Mix",
        "1ddd2d39-d7ed-11ea-921e-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Russian White Mix",
        "1ddd2d38-d7ed-11ea-9cfa-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Raas",
        "1ddd062c-d7ed-11ea-99a9-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Catalan Sheepdog Mix",
        "1ddc90b9-d7ed-11ea-8690-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chartreuse Cat",
        "1ddd05f3-d7ed-11ea-b4d2-302432eba3ec",
        "11",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis lupaster doederleini",
        "5d5c4eee-bd6c-11eb-ba88-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Japanese Bobtail",
        "1ddd0607-d7ed-11ea-a085-302432eba3ec",
        "19",
        "42",
        "breed",
        "antech"
    ],
    [
        "Cymric",
        "1ddd05f8-d7ed-11ea-82bd-302432eba3ec",
        "506",
        "42",
        "breed",
        "antech"
    ],
    [
        "Russian-European Laïka Mix",
        "1ddcdecc-d7ed-11ea-8d0e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dwelf",
        "1ddd05fe-d7ed-11ea-bfaa-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis lupus alces",
        "5d5c9d33-bd6c-11eb-bef9-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "California Spangled Mix",
        "1ddd2cf6-d7ed-11ea-ba6e-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Shikoku",
        "1ddc42d0-d7ed-11ea-9ccb-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Welsh Springer Spaniel",
        "1ddc698c-d7ed-11ea-9cc0-302432eba3ec",
        "185",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tortie Lynx Point Siamese Cat Mix",
        "1ddd2d4d-d7ed-11ea-9191-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Boston Terrier",
        "1ddbf452-d7ed-11ea-99a6-302432eba3ec",
        "68",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bohemian Rex",
        "1ddd05e8-d7ed-11ea-a2d6-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Smooth-coated Collie Mix",
        "1ddc90ca-d7ed-11ea-9e92-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Toy Manchester Terrier",
        "1ddc69bc-d7ed-11ea-8f54-302432eba3ec",
        "135",
        "41",
        "breed",
        "antech"
    ],
    [
        "Somali Cat Mix",
        "1ddd2d46-d7ed-11ea-8529-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Neapolitan Mastiff",
        "1ddc696c-d7ed-11ea-9b2b-302432eba3ec",
        "492",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Long-haired Purebred cat",
        "1ddd05da-d7ed-11ea-b4a4-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Pinscher dog Mix",
        "1ddcdf1e-d7ed-11ea-bbc0-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Doberman Pinscher",
        "1ddc1b66-d7ed-11ea-a1e2-302432eba3ec",
        "92",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bouvier des Flandres Mix",
        "1ddc90a7-d7ed-11ea-96be-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Foxhound Mix",
        "1ddc69e8-d7ed-11ea-8c93-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American German Shepherd Dog",
        "1ddbf41f-d7ed-11ea-ab2c-302432eba3ec",
        "106",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tortie Lynx Point Siamese Cat",
        "1ddd0648-d7ed-11ea-9b9c-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Irish Red and White Setter",
        "1ddc1bc3-d7ed-11ea-bc0e-302432eba3ec",
        "496",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Scottish Fold",
        "1ddd0637-d7ed-11ea-a10f-302432eba3ec",
        "31",
        "42",
        "breed",
        "antech"
    ],
    [
        "Korat",
        "1ddd060b-d7ed-11ea-8925-302432eba3ec",
        "21",
        "42",
        "breed",
        "antech"
    ],
    [
        "Medium-Sized Anglo-French Hound",
        "1ddc426d-d7ed-11ea-bfb7-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norwegian Elkhound",
        "1ddc427d-d7ed-11ea-a14c-302432eba3ec",
        "142",
        "41",
        "breed",
        "antech"
    ],
    [
        "Old Danish Pointing Dog",
        "1ddc4283-d7ed-11ea-92db-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Stabyhoun Dog",
        "1ddc696f-d7ed-11ea-8f4d-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Shetland Sheepdog Mix",
        "1ddcdee0-d7ed-11ea-9fda-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "LaPerm Long-haired",
        "1ddd0612-d7ed-11ea-9789-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Singapura Cat Mix",
        "1ddd2d43-d7ed-11ea-86d9-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Highlander",
        "1ddd0605-d7ed-11ea-b271-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Ariege Hound Mix",
        "1ddc69ed-d7ed-11ea-82c2-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Serbian Tricolour Hound",
        "1ddc42cb-d7ed-11ea-b67e-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hygen Hound",
        "1ddc1bbd-d7ed-11ea-acf8-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Old German Shepherd Dog Mix",
        "1ddcb7e6-d7ed-11ea-9e8f-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Finnish Hound Mix",
        "1ddc90fe-d7ed-11ea-99f3-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Basque Shepherd Dog Mix",
        "1ddcdf24-d7ed-11ea-aa13-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Indian Spitz Mix",
        "1ddd05c1-d7ed-11ea-aa54-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Cattle Dog Mix",
        "1ddc69f2-d7ed-11ea-b863-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Scottish Fold",
        "1ddd0636-d7ed-11ea-8865-302432eba3ec",
        "31",
        "42",
        "breed",
        "antech"
    ],
    [
        "Thai Bangkaew Dog Mix",
        "1ddcdf03-d7ed-11ea-b535-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Tabby",
        "1ddd0632-d7ed-11ea-bcf7-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis lupus hattai",
        "5d5dae9e-bd6c-11eb-bfa4-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Singapura",
        "1ddd063e-d7ed-11ea-b280-302432eba3ec",
        "35",
        "42",
        "breed",
        "antech"
    ],
    [
        "Schwyz Swiss Hound",
        "1ddc6979-d7ed-11ea-b24c-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Irish Softcoated Wheaten Terrier Mix",
        "1ddc9103-d7ed-11ea-aee6-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Toyger Cat Mix",
        "1ddd2d4f-d7ed-11ea-bfb9-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "American Akita",
        "1ddbf418-d7ed-11ea-a8a2-302432eba3ec",
        "44",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chow Chow",
        "1ddc1b49-d7ed-11ea-bcff-302432eba3ec",
        "84",
        "41",
        "breed",
        "antech"
    ],
    [
        "Skye Terrier Mix",
        "1ddcdec8-d7ed-11ea-962b-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Short-haired Scottish Fold",
        "1ddd0638-d7ed-11ea-bea2-302432eba3ec",
        "31",
        "42",
        "breed",
        "antech"
    ],
    [
        "Brazilian Terrier Mix",
        "1ddc90aa-d7ed-11ea-8d4a-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Korea Jindo Dog",
        "1ddc4256-d7ed-11ea-8001-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Bobtail Short-haired Mix",
        "1ddd2ce0-d7ed-11ea-8c3d-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Savannah Cat Mix",
        "1ddd2d3a-d7ed-11ea-9986-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Portuguese Podengo Mix",
        "1ddcb81c-d7ed-11ea-b9a7-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Selkirk Rex",
        "1ddd0639-d7ed-11ea-bd34-302432eba3ec",
        "32",
        "42",
        "breed",
        "antech"
    ],
    [
        "Polish Greyhound Mix",
        "1ddcb812-d7ed-11ea-b336-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kuvasz",
        "1ddc4258-d7ed-11ea-aa00-302432eba3ec",
        "129",
        "41",
        "breed",
        "antech"
    ],
    [
        "East European Shepherd Mix",
        "1ddcdf27-d7ed-11ea-956f-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Shiloh Shepherd Mix",
        "1ddcdf2f-d7ed-11ea-9972-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Alaskan Malamute",
        "1ddbf416-d7ed-11ea-8f92-302432eba3ec",
        "45",
        "41",
        "breed",
        "antech"
    ],
    [
        "European",
        "1ddd0600-d7ed-11ea-b17c-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Whippet",
        "1ddc6992-d7ed-11ea-ae01-302432eba3ec",
        "188",
        "41",
        "breed",
        "antech"
    ],
    [
        "Romanian Mioritic Shepherd Dog",
        "1ddc42b1-d7ed-11ea-950e-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Arabian Mau",
        "1ddd05de-d7ed-11ea-9ff1-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Brussels Griffon Mix",
        "1ddc90ae-d7ed-11ea-8390-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Ibizan Rough-haired Hound",
        "1ddc1bbf-d7ed-11ea-ac76-302432eba3ec",
        "118",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Pointer",
        "1ddc1b76-d7ed-11ea-b737-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canaan",
        "1ddc1b37-d7ed-11ea-83b2-302432eba3ec",
        "78",
        "41",
        "breed",
        "antech"
    ],
    [
        "Minskin Mix",
        "1ddd2d1e-d7ed-11ea-82aa-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Bucovina Shepherd Dog",
        "1ddc699e-d7ed-11ea-a419-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Cattle Dog",
        "1ddbf426-d7ed-11ea-ac5b-302432eba3ec",
        "50",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Black Terrier Mix",
        "1ddcb7fa-d7ed-11ea-8f84-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Japanese Akita",
        "1ddc4249-d7ed-11ea-8de7-302432eba3ec",
        "44",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Mist",
        "1ddd05e3-d7ed-11ea-ae8b-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Briard Mix",
        "1ddc90ab-d7ed-11ea-b707-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Hound Tricolour",
        "1ddc1b8d-d7ed-11ea-b836-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kuvasz Mix",
        "1ddcb7d8-d7ed-11ea-a0bd-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Old English Sheepdog",
        "1ddc4284-d7ed-11ea-9e05-302432eba3ec",
        "144",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tonkinese Cat",
        "1ddd0647-d7ed-11ea-bdb0-302432eba3ec",
        "38",
        "42",
        "breed",
        "antech"
    ],
    [
        "Belgian Shepherd Dog Malinois",
        "1ddc4250-d7ed-11ea-beb5-302432eba3ec",
        "58",
        "41",
        "breed",
        "antech"
    ],
    [
        "Saluki Mix",
        "1ddcded1-d7ed-11ea-ba7e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Castro Laboreiro Dog Mix",
        "1ddc90b8-d7ed-11ea-ad72-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Westphalian Dachsbracke Mix",
        "1ddcdf16-d7ed-11ea-a585-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wetterhoun Mix",
        "1ddcdf17-d7ed-11ea-868d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tibetan Terrier Mix",
        "1ddcdf07-d7ed-11ea-af00-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Maine Coon Mix",
        "1ddd2d1b-d7ed-11ea-8a62-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Italian Hound Mix Coarsehaired",
        "1ddcb7c6-d7ed-11ea-a799-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Short-haired Scottish Fold Mix",
        "1ddd2d3d-d7ed-11ea-9954-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Belgian Shepherd Dog Mix Tervuren",
        "1ddcdf1f-d7ed-11ea-b2e1-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Maltese",
        "1ddc4268-d7ed-11ea-a936-302432eba3ec",
        "134",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bichon Frise Mix",
        "1ddc9095-d7ed-11ea-91dd-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Foldex",
        "1ddd0602-d7ed-11ea-8492-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Cesky Terrier Mix",
        "1ddc90b2-d7ed-11ea-a032-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long haired Majorcan Shepherd Dog Mix",
        "1ddc90ec-d7ed-11ea-a8bf-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Afghan Hound Mix",
        "1ddc69e0-d7ed-11ea-8621-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chow Chow Mix",
        "1ddc90c5-d7ed-11ea-af06-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Auvergne Pointing Dog Mix",
        "1ddc9081-d7ed-11ea-b05d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Swedish Lapphund Mix",
        "1ddcdefb-d7ed-11ea-b40a-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Transylvanian Hound Mix",
        "1ddcdf0a-d7ed-11ea-b370-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Polish Tatra Sheepdog",
        "1ddc69c8-d7ed-11ea-9fd0-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Billy Mix",
        "1ddc9096-d7ed-11ea-9927-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "LaPerm Short-haired",
        "1ddd0613-d7ed-11ea-8a33-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Irish Wolfhound",
        "1ddc4242-d7ed-11ea-9d68-302432eba3ec",
        "122",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Setter",
        "1ddc1b77-d7ed-11ea-affa-302432eba3ec",
        "94",
        "41",
        "breed",
        "antech"
    ],
    [
        "Romanian Bucovina Shepherd Dog Mix",
        "1ddcb7e7-d7ed-11ea-a268-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Standard Poodle",
        "1ddc4298-d7ed-11ea-97c6-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Long-haired Bobtail",
        "1ddd05d5-d7ed-11ea-8e87-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Himalayan Mix",
        "1ddd2d0b-d7ed-11ea-b5f9-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Miniature Dachshund",
        "1ddc1b5e-d7ed-11ea-8beb-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Anatolian Shepherd Dog",
        "1ddc699c-d7ed-11ea-9cb1-302432eba3ec",
        "49",
        "41",
        "breed",
        "antech"
    ],
    [
        "Irish Glen of Imaal Terrier Mix",
        "1ddc9102-d7ed-11ea-bf52-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Borzoi",
        "1ddbf450-d7ed-11ea-82a1-302432eba3ec",
        "460",
        "41",
        "breed",
        "antech"
    ],
    [
        "Beagle-Harrier",
        "1ddbf436-d7ed-11ea-80e2-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Samoyed Dog",
        "1ddc42bf-d7ed-11ea-b5b2-302432eba3ec",
        "162",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Rex Mix",
        "1ddd2d08-d7ed-11ea-a5d5-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Boxer Mix",
        "1ddc90a8-d7ed-11ea-a8a3-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Great AngloFrench White and Orange Hound Mix",
        "1ddcb7a3-d7ed-11ea-8140-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Small Brabant Griffon Mix",
        "1ddcdeed-d7ed-11ea-9ed1-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Icelandic Sheepdog Mix",
        "1ddcb7bc-d7ed-11ea-ad3c-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Miniature Dachshund Mix",
        "1ddc90da-d7ed-11ea-8bd8-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Artois Hound Mix",
        "1ddc69f0-d7ed-11ea-9ddf-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Serrade Petit Mix",
        "1ddd2d40-d7ed-11ea-9890-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Fox Terrier Mix",
        "1ddcdf45-d7ed-11ea-938a-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus beothucus",
        "5d5cc428-bd6c-11eb-9514-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Portuguese Pointing Dog Mix",
        "1ddcb823-d7ed-11ea-a4fc-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rat Terrier",
        "1ddc69b7-d7ed-11ea-add5-302432eba3ec",
        "503",
        "41",
        "breed",
        "antech"
    ],
    [
        "<unknown>",
        "1dc9ea50-d80a-11ea-b715-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Miniature American Shepherd Mix",
        "1ddcb7e5-d7ed-11ea-b653-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Clumber Spaniel",
        "1ddc1b4b-d7ed-11ea-8963-302432eba3ec",
        "85",
        "41",
        "breed",
        "antech"
    ],
    [
        "Beauceron",
        "1ddbf438-d7ed-11ea-bb65-302432eba3ec",
        "491",
        "41",
        "breed",
        "antech"
    ],
    [
        "Romanian Carpathian Shepherd Dog",
        "1ddc4271-d7ed-11ea-a610-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cavalier King Charles Spaniel Mix",
        "1ddc90bb-d7ed-11ea-b434-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Crossbred",
        "1ddc1b53-d7ed-11ea-984b-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Keeshond",
        "6761857c-a169-11ec-94b4-7085c2a1b8e0",
        "126",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tibetan Mastiff",
        "1ddc69cc-d7ed-11ea-b98a-302432eba3ec",
        "499",
        "41",
        "breed",
        "antech"
    ],
    [
        "Italian Hound Coarsehaired",
        "1ddc4245-d7ed-11ea-8a08-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bluetick Coonhound Mix",
        "1ddc909c-d7ed-11ea-9f4b-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Long-haired Curl",
        "1ddd05d8-d7ed-11ea-9de2-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis simensis citernii",
        "5d5ebfef-bd6c-11eb-a354-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Löwchen",
        "1ddc4263-d7ed-11ea-b800-302432eba3ec",
        "133",
        "41",
        "breed",
        "antech"
    ],
    [
        "Poodle Miniature",
        "1ddc4297-d7ed-11ea-969c-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cantabrian Water Dog Mix",
        "1ddcdf4c-d7ed-11ea-8089-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bernadoodle Mix",
        "1ddd05cb-d7ed-11ea-9d60-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Grand Basset Griffon Vendeen Mix",
        "1ddcb79f-d7ed-11ea-a219-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-haired Hungarian Vizsla",
        "1ddc1bbc-d7ed-11ea-b799-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Asian Cat Semi-Long-hair",
        "1ddd05e1-d7ed-11ea-b83f-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Cane corso Mix",
        "1ddc90b6-d7ed-11ea-945f-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans latrans",
        "5d5b64a9-bd6c-11eb-b5bd-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "z Other Canids Mix",
        "1ddcb805-d7ed-11ea-88df-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kangal Shepherd Dog",
        "1ddc1b6d-d7ed-11ea-8299-302432eba3ec",
        "49",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cockapoo",
        "1ddc1b4c-d7ed-11ea-a4ce-302432eba3ec",
        "932",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Saint Bernard Dog",
        "1ddc42bc-d7ed-11ea-97d4-302432eba3ec",
        "160",
        "41",
        "breed",
        "antech"
    ],
    [
        "Standard Schnauzer Mix",
        "1ddcded7-d7ed-11ea-8d92-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-haired Rabbit Hunting Dachshund",
        "1ddc1b5b-d7ed-11ea-abd5-302432eba3ec",
        "89",
        "41",
        "breed",
        "antech"
    ],
    [
        "Crossbred Mix",
        "1ddc90cf-d7ed-11ea-94c4-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dogo Canario Mix",
        "1ddc90e4-d7ed-11ea-b1aa-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Småland Hound",
        "1ddc6964-d7ed-11ea-bc68-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cornish Rex Mix",
        "1ddd2cfb-d7ed-11ea-a402-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Wila Krungthep Mix",
        "1ddd2d54-d7ed-11ea-86c0-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Newfoundland Mix",
        "1ddcb7f9-d7ed-11ea-b401-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Karst Shepherd Dog Mix",
        "1ddc90ea-d7ed-11ea-b405-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Yorkipoo",
        "1ddc69d5-d7ed-11ea-8f35-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis aureus qattarensis",
        "5d5a7a32-bd6c-11eb-ba30-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Fox Terrier Mix",
        "1ddcdeda-d7ed-11ea-a577-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kumaon Mastiff",
        "1ddc426b-d7ed-11ea-b339-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dogo Canario",
        "1ddc1b68-d7ed-11ea-8cef-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Himalayan Sheepdog",
        "1ddc69c7-d7ed-11ea-a196-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Komondor",
        "1ddc4255-d7ed-11ea-834d-302432eba3ec",
        "128",
        "41",
        "breed",
        "antech"
    ],
    [
        "Gull Terrier",
        "1ddc69b0-d7ed-11ea-a93c-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bull Terrier Mix Standard",
        "1ddcdef7-d7ed-11ea-93a0-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schiller Hound",
        "1ddc42c2-d7ed-11ea-bcfe-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Curilsk Bobtail Mix",
        "1ddd2d15-d7ed-11ea-8507-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Modern Persian Mix",
        "1ddd2d1f-d7ed-11ea-bc51-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "English Pointer Mix",
        "1ddc90f2-d7ed-11ea-bdbe-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis aureus ecsedensis",
        "5d5a051a-bd6c-11eb-9f7b-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Carpathian Shepherd Dog",
        "1ddc699f-d7ed-11ea-a137-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Basset Hound Mix",
        "1ddc9085-d7ed-11ea-b6c5-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Kelpie",
        "1ddbf427-d7ed-11ea-b2bf-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Labradoodle Mix",
        "1ddcb7d9-d7ed-11ea-a5e6-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Fawn Brittany Griffon Mix",
        "1ddc90fb-d7ed-11ea-be6c-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Taiwan Dog",
        "1ddc697a-d7ed-11ea-ac25-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Peruvian Hairless Dog mediumsized",
        "1ddc428a-d7ed-11ea-a4b9-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Irish Terrier",
        "1ddc1b93-d7ed-11ea-a2f7-302432eba3ec",
        "120",
        "41",
        "breed",
        "antech"
    ],
    [
        "King Shepherd Mix",
        "1ddcdf2d-d7ed-11ea-95fe-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Donskoy",
        "1ddd05fc-d7ed-11ea-a61c-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Asian Cat Shorthair",
        "1ddd05e2-d7ed-11ea-b49b-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Swiss Hound Lucerne",
        "1ddc6978-d7ed-11ea-9f4b-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Miniature Shar Pei",
        "1ddc69db-d7ed-11ea-810b-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Scottish Deerhound Mix",
        "1ddcded9-d7ed-11ea-a121-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tenterfield Terrier",
        "1ddc697c-d7ed-11ea-9409-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis aureus soudanicus",
        "5d5aa14a-bd6c-11eb-b4bd-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Foxhound Mix",
        "1ddc90f1-d7ed-11ea-a54d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Black and Tan Coonhound",
        "1ddbf445-d7ed-11ea-897f-302432eba3ec",
        "516",
        "41",
        "breed",
        "antech"
    ],
    [
        "Peruvian Hairless Dog Large",
        "1ddc4289-d7ed-11ea-89bc-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Yugoslavian Shepherd Dog Sharplanina",
        "1ddc699a-d7ed-11ea-85bd-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian working kelpie",
        "1ddbf42c-d7ed-11ea-9660-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Irish Red Setter Mix",
        "1ddcb7bf-d7ed-11ea-a63e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bosnian CoarseHaired Hound Mix",
        "1ddc90a3-d7ed-11ea-a0f5-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dutch Shepherd Dog Mix",
        "1ddc9112-d7ed-11ea-80bd-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis adustus adustus",
        "5d591aa6-bd6c-11eb-b8dc-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "York Chocolate",
        "1ddd2cdb-d7ed-11ea-b8b9-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "African Golden Wolf (Canis anthus)",
        "5d59b6e3-bd6c-11eb-8623-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Shepherd",
        "1ddbf428-d7ed-11ea-8e47-302432eba3ec",
        "51",
        "41",
        "breed",
        "antech"
    ],
    [
        "Gull Terrier Mix",
        "1ddcdf37-d7ed-11ea-a0c0-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Small Münsterländer",
        "1ddc6967-d7ed-11ea-a315-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rat Terrier Mix",
        "1ddcdf3e-d7ed-11ea-854c-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Standard Dachshund",
        "1ddc1b58-d7ed-11ea-a558-302432eba3ec",
        "89",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus columbianus",
        "5d5d1240-bd6c-11eb-9e1c-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Barbet Mix",
        "1ddc9083-d7ed-11ea-aff4-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis aureus algirensis",
        "5d59b6e4-bd6c-11eb-9cc7-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Short-haired Majorcan Shepherd Dog",
        "1ddc42b3-d7ed-11ea-9a90-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Irish Softcoated Wheaten Terrier",
        "1ddc1b87-d7ed-11ea-a40b-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Havanese Mix",
        "1ddcb7b0-d7ed-11ea-aeea-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Coton de Tuléar",
        "1ddc1b51-d7ed-11ea-b6e3-302432eba3ec",
        "634",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cockapoo Mix",
        "1ddc90c8-d7ed-11ea-abdf-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hungarian Greyhound",
        "1ddc1bba-d7ed-11ea-9292-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Khao Manee Mix",
        "1ddd2d0f-d7ed-11ea-a842-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Estonian Hound",
        "1ddc1b7b-d7ed-11ea-8476-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Burmese Cat Mix",
        "1ddd2cf4-d7ed-11ea-b239-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Saarloos Wolfdog Mix",
        "1ddcdecd-d7ed-11ea-a12a-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Czechoslovakian Wolfdog Mix",
        "1ddc90d1-d7ed-11ea-a8a6-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus mogollonensis",
        "5d5e23b0-bd6c-11eb-99b6-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Shepherd Dog Mix Short-haired",
        "1ddcdf01-d7ed-11ea-a8b7-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Clumber Spaniel Mix",
        "1ddc90c7-d7ed-11ea-b1a3-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Valencian rat hunting dog",
        "c497fcd7-9648-11ec-ba9c-7085c2a1b8e0",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Black Russian Terrier",
        "1ddc69ac-d7ed-11ea-995e-302432eba3ec",
        "493",
        "41",
        "breed",
        "antech"
    ],
    [
        "Swedish Lapphund",
        "1ddc6974-d7ed-11ea-ad90-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Doberman Pinscher Mix",
        "1ddc90e2-d7ed-11ea-866d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "St Germain Pointing Dog",
        "1ddc696e-d7ed-11ea-b3a1-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Maltipoo Mix",
        "1ddd05cc-d7ed-11ea-b65a-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dandie Dinmont Terrier Mix",
        "1ddc90bd-d7ed-11ea-8021-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Spanish Water Dog",
        "1ddc69c6-d7ed-11ea-aa34-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Entlebucher Mountain Dog",
        "1ddc1b7a-d7ed-11ea-8a12-302432eba3ec",
        "528",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Stumpy Tail Cattle Dog Mix",
        "1ddc69f6-d7ed-11ea-afe0-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Shepherd Mix",
        "1ddc69f4-d7ed-11ea-8725-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hovawart",
        "1ddc1bb9-d7ed-11ea-98ed-302432eba3ec",
        "933",
        "41",
        "breed",
        "antech"
    ],
    [
        "Lagotto romagnolo Mix",
        "1ddcb7db-d7ed-11ea-8d54-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Spaniel dog",
        "1ddc69c2-d7ed-11ea-9780-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-Haired Medium-Sized Portuguese Podengo",
        "1ddc42a1-d7ed-11ea-bafc-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rhodesian Ridgeback",
        "1ddc42b0-d7ed-11ea-861d-302432eba3ec",
        "158",
        "41",
        "breed",
        "antech"
    ],
    [
        "Belgian Griffon",
        "1ddbf43a-d7ed-11ea-85b1-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kintamani-Bali",
        "1ddc4253-d7ed-11ea-86e4-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis aureus moreotica",
        "5d5a2c32-bd6c-11eb-a1c4-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Silky Terrier Mix",
        "1ddcdf3f-d7ed-11ea-8f93-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Bulldog Mix",
        "1ddc90ef-d7ed-11ea-821e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Pyrenean Sheepdog",
        "1ddc42ad-d7ed-11ea-af23-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus pallipes",
        "5d5e71cf-bd6c-11eb-860e-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mexican Hairless Dog MediumSized",
        "1ddc426e-d7ed-11ea-b3ae-302432eba3ec",
        "533",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pont Audemer Spaniel",
        "1ddc6969-d7ed-11ea-ba1e-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Fawn Brittany Basset Mix",
        "1ddc90fa-d7ed-11ea-9f79-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Field Spaniel Mix",
        "1ddc90fc-d7ed-11ea-96e6-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Short-haired Bobtail",
        "1ddd05d6-d7ed-11ea-b8df-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Golden Retriever Mix",
        "1ddcb79d-d7ed-11ea-bf40-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Dutch Shepherd Dog Mix",
        "1ddcb792-d7ed-11ea-a1bf-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norwegian Lundehund",
        "1ddc4280-d7ed-11ea-8461-302432eba3ec",
        "532",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Shepherd Dog Mix",
        "1ddc90ba-d7ed-11ea-881a-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pudelpointer",
        "1ddc42a7-d7ed-11ea-85b5-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pyrenean Shepherd",
        "1ddc69a7-d7ed-11ea-9fc3-302432eba3ec",
        "497",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mixed breed",
        "f689dbd6-9964-11eb-9f44-7085c2a1b8e0",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "South African Blue Cat Mix",
        "1ddd2d47-d7ed-11ea-9766-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Romanian Mioritic Shepherd Dog Mix",
        "1ddcdec4-d7ed-11ea-88ab-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Colourpoint Shorthair Mix",
        "1ddd2cfa-d7ed-11ea-887e-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis mesomelas schmidti",
        "5d5ebfee-bd6c-11eb-bd11-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bambino",
        "1ddd05e5-d7ed-11ea-8de0-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Caucasian Shepherd Dog Mix",
        "1ddc908f-d7ed-11ea-8f44-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bullmastiff",
        "1ddc1b34-d7ed-11ea-9dbe-302432eba3ec",
        "76",
        "41",
        "breed",
        "antech"
    ],
    [
        "Greek Shepherd",
        "1ddc69a5-d7ed-11ea-8e81-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Polish Lowland Sheepdog",
        "1ddc4294-d7ed-11ea-bdef-302432eba3ec",
        "151",
        "41",
        "breed",
        "antech"
    ],
    [
        "LaPerm Short-haired Mix",
        "1ddd2d18-d7ed-11ea-90fe-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Welsh Springer Spaniel Mix",
        "1ddcdf12-d7ed-11ea-a9e6-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Eurasian",
        "1ddc1b7d-d7ed-11ea-9438-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chantilly-Tiffany Cat Mix",
        "1ddd2cf7-d7ed-11ea-96ec-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Portuguese Pointing Dog",
        "1ddc42a3-d7ed-11ea-b2c8-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Old English Terrier",
        "1ddc69b3-d7ed-11ea-b9a5-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Short-haired Pointer Mix",
        "1ddcb795-d7ed-11ea-b9cd-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Great Pyrenees Pyrenean Mountain Dog Mix",
        "1ddcb7a6-d7ed-11ea-b751-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Gordon Setter Mix",
        "1ddcb79e-d7ed-11ea-89f5-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Ocicat Cat Mix",
        "1ddd2d27-d7ed-11ea-8dc4-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Great Gascony Hound Mix",
        "1ddcb7a5-d7ed-11ea-8c85-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Drever",
        "1ddc1b6b-d7ed-11ea-8ff5-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Ghadrejani Dog",
        "0d290cc6-63f8-11ec-9c73-7085c2a1b8e0",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pumi Mix",
        "1ddcdebd-d7ed-11ea-856b-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Irish Water Spaniel",
        "1ddc4241-d7ed-11ea-b745-302432eba3ec",
        "121",
        "41",
        "breed",
        "antech"
    ],
    [
        "Serengeti",
        "1ddd063a-d7ed-11ea-946e-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "English Foxhound",
        "1ddc1b75-d7ed-11ea-bd90-302432eba3ec",
        "103",
        "41",
        "breed",
        "antech"
    ],
    [
        "Welsh Corgi Mix",
        "1ddd05c7-d7ed-11ea-8482-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Maine Coon",
        "1ddd0616-d7ed-11ea-b92a-302432eba3ec",
        "23",
        "42",
        "breed",
        "antech"
    ],
    [
        "Old English Terrier Mix",
        "1ddcdf3a-d7ed-11ea-b1db-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Persian Cat Mix",
        "1ddd2d2e-d7ed-11ea-ae61-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Ojos Azules Mix",
        "1ddd2d28-d7ed-11ea-b923-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "European Shorthair Mix",
        "1ddd2d06-d7ed-11ea-ae29-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Ukrainian Levkoy",
        "1ddd2cd9-d7ed-11ea-8805-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Yakutian Laika",
        "1ddc6994-d7ed-11ea-be75-302432eba3ec",
        "1312",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pixie-bob",
        "1ddd062b-d7ed-11ea-9dbe-302432eba3ec",
        "508",
        "42",
        "breed",
        "antech"
    ],
    [
        "Valencian rat hunting dog Mix",
        "38a5b9cc-4d26-11ee-96f0-106fd9dd20e8",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Welsh Sheepdog",
        "1ddc69c9-d7ed-11ea-9c4e-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Posavaz Hound",
        "1ddc429b-d7ed-11ea-8735-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Curl",
        "1ddd05d7-d7ed-11ea-a2e4-302432eba3ec",
        "3",
        "42",
        "breed",
        "antech"
    ],
    [
        "Bombay",
        "1ddd05e9-d7ed-11ea-8f23-302432eba3ec",
        "8",
        "42",
        "breed",
        "antech"
    ],
    [
        "Korn Ja",
        "1ddd060d-d7ed-11ea-ab9c-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "dingo (Canis lupus dingo)",
        "5d5d3951-bd6c-11eb-8678-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Spitz",
        "1ddc1b9c-d7ed-11ea-86cd-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-haired Hungarian Vizsla Mix",
        "1ddcb7b7-d7ed-11ea-956c-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Wire-haired",
        "1ddd05dc-d7ed-11ea-9e1e-302432eba3ec",
        "5",
        "42",
        "breed",
        "antech"
    ],
    [
        "Great Dane",
        "1ddc1ba9-d7ed-11ea-91ed-302432eba3ec",
        "112",
        "41",
        "breed",
        "antech"
    ],
    [
        "Afghan Shepherd Mix",
        "1ddcdf22-d7ed-11ea-8a6e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Styrian Coarse-haired Hound",
        "1ddc6971-d7ed-11ea-8ed9-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mastiff Mix",
        "1ddcdebe-d7ed-11ea-bb62-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus occidentalis",
        "5d5e4abf-bd6c-11eb-a583-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Kelpie Mix",
        "1ddc69f3-d7ed-11ea-b540-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Drentse Partridge Dog",
        "1ddc1b6a-d7ed-11ea-aa9d-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Teddy Roosevelt Terrier Mix",
        "1ddcdf41-d7ed-11ea-a781-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus nubilus",
        "5d5e4abe-bd6c-11eb-81a7-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cesky Terrier",
        "1ddc1b36-d7ed-11ea-b52a-302432eba3ec",
        "526",
        "41",
        "breed",
        "antech"
    ],
    [
        "Plummer Terrier",
        "1ddc69b6-d7ed-11ea-85e2-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "European Continental Landseer Mix",
        "1ddcb7de-d7ed-11ea-bd2b-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Shepherd",
        "1ddc69a1-d7ed-11ea-a897-302432eba3ec",
        "631",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Dutch Shepherd Dog",
        "1ddc1b97-d7ed-11ea-923a-302432eba3ec",
        "630",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus manningi",
        "5d5e23af-bd6c-11eb-af09-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Carpathian Shepherd Dog Mix",
        "1ddcdf26-d7ed-11ea-9d04-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Felis catus Crossbred Mix",
        "1ddd2cfc-d7ed-11ea-86db-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Maremma and Abruzzes Sheepdog",
        "1ddc426a-d7ed-11ea-88ed-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Medium-Sized Mexican Hairless Dog Mix",
        "1ddcb7ee-d7ed-11ea-8f7c-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "White Shepherd Mix",
        "1ddcdf30-d7ed-11ea-8842-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Weimaraner Mix",
        "1ddcdf0e-d7ed-11ea-8282-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis adustus notatus",
        "5d598fd2-bd6c-11eb-81ab-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Serbian Hound",
        "1ddc42ca-d7ed-11ea-92f7-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Savannah",
        "1ddd0635-d7ed-11ea-ac42-302432eba3ec",
        "1308",
        "42",
        "breed",
        "antech"
    ],
    [
        "Siberian Husky",
        "1ddc42d1-d7ed-11ea-b56e-302432eba3ec",
        "170",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Spitz Gross",
        "1ddc1b9d-d7ed-11ea-ad0d-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Ibizan Hound",
        "1ddc1bbe-d7ed-11ea-bdd7-302432eba3ec",
        "118",
        "41",
        "breed",
        "antech"
    ],
    [
        "Galician Shepherd Dog",
        "1ddc69a2-d7ed-11ea-aaa8-302432eba3ec",
        "106",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hellenic Hound",
        "1ddc1bb6-d7ed-11ea-8092-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Majorcan Shepherd Dog",
        "1ddc1b99-d7ed-11ea-9375-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Turkish Angora Mix",
        "1ddd2d51-d7ed-11ea-8bba-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Russian Blue Mix",
        "1ddd2d36-d7ed-11ea-aad8-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Jack Russell Terrier",
        "1ddc1bc2-d7ed-11ea-aee5-302432eba3ec",
        "124",
        "41",
        "breed",
        "antech"
    ],
    [
        "Italian Hound Mix Short-haired",
        "1ddcb7c5-d7ed-11ea-9649-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "European Cat Mix",
        "1ddd2d05-d7ed-11ea-bd40-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Maremma and Abruzzes Sheepdog Mix",
        "1ddcb7ea-d7ed-11ea-a15e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Polish Hound Mix",
        "1ddcb813-d7ed-11ea-ae2f-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Irish Red Setter",
        "1ddc1bc4-d7ed-11ea-b937-302432eba3ec",
        "119",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Spaniel Mix",
        "1ddc9108-d7ed-11ea-8a6e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Traditional Siamese Mix",
        "1ddd2d4b-d7ed-11ea-bdcb-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "English Mastiff Mix",
        "1ddcb7e4-d7ed-11ea-953d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Toy Fox Terrier Mix",
        "1ddcdf42-d7ed-11ea-853b-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Garafian Shepherd",
        "1ddc69a3-d7ed-11ea-bf6e-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Gascon Saintongeois",
        "1ddc1b91-d7ed-11ea-aae1-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Thai Bangkaew Dog",
        "1ddc697d-d7ed-11ea-8951-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-Haired Miniature Portuguese Podengo Mix",
        "1ddcb822-d7ed-11ea-b244-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Tabby Mix",
        "1ddd2d37-d7ed-11ea-9528-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Afghan Shepherd",
        "1ddc699b-d7ed-11ea-9b8c-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tyrolean Hound",
        "1ddc6985-d7ed-11ea-af0b-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Donskoy Mix",
        "1ddd2d01-d7ed-11ea-9b3e-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Short-haired Saint Bernard Dog Mix",
        "1ddcded0-d7ed-11ea-8639-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Drentse Partridge Dog Mix",
        "1ddc90e6-d7ed-11ea-8f58-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Barak Hound",
        "1ddbf451-d7ed-11ea-b28b-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired American Curl Mix",
        "1ddd2ce2-d7ed-11ea-9053-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Poitevin Mix",
        "1ddcb811-d7ed-11ea-9c00-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Picardy Spaniel",
        "1ddc428e-d7ed-11ea-a51c-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Lhasa Apso",
        "1ddc4262-d7ed-11ea-b52b-302432eba3ec",
        "132",
        "41",
        "breed",
        "antech"
    ],
    [
        "Snowshoe",
        "1ddd063f-d7ed-11ea-ba3f-302432eba3ec",
        "512",
        "42",
        "breed",
        "antech"
    ],
    [
        "Irish Wolfhound Mix",
        "1ddcb7c3-d7ed-11ea-ad6e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Estonian Hound Mix",
        "1ddc90f7-d7ed-11ea-abe5-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Old Danish Pointing Dog Mix",
        "1ddcb803-d7ed-11ea-8d32-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long haired Majorcan Shepherd Dog",
        "1ddc1b70-d7ed-11ea-b8a0-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus lupus",
        "5d5dfca0-bd6c-11eb-8863-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Oriental Short-haired Mix",
        "1ddd2d2d-d7ed-11ea-8947-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Rough-coated Collie Mix",
        "1ddc90c9-d7ed-11ea-98dc-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "domestic dog",
        "e7e22593-59a3-11eb-85a2-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pyrenean Mastiff",
        "1ddc697f-d7ed-11ea-9ca9-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Crossbred",
        "1ddd05f7-d7ed-11ea-81b2-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Bernese Hound",
        "1ddbf441-d7ed-11ea-b1d3-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Broholmer",
        "1ddbf45b-d7ed-11ea-b8ca-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Atlas Shepherd Dog Mix",
        "1ddc69f1-d7ed-11ea-9da4-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schipperke Mix",
        "1ddcded6-d7ed-11ea-a51c-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Portuguese Podengo",
        "1ddc429c-d7ed-11ea-878f-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Fox Terrier",
        "1ddc42c7-d7ed-11ea-bbe4-302432eba3ec",
        "100",
        "41",
        "breed",
        "antech"
    ],
    [
        "z Other Canidae",
        "1ddc4285-d7ed-11ea-99e3-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Mist Mix",
        "1ddd2ceb-d7ed-11ea-845b-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "West Siberian Laïka Mix",
        "1ddcdf15-d7ed-11ea-a7a5-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Spotted Hound Mix",
        "1ddcdec9-d7ed-11ea-988e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Colourpoint Short-haired",
        "1ddd05f5-d7ed-11ea-acee-302432eba3ec",
        "12",
        "42",
        "breed",
        "antech"
    ],
    [
        "Thai Ridgeback dog",
        "1ddc697e-d7ed-11ea-818f-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dalmatian Mix",
        "1ddc90df-d7ed-11ea-b529-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Pointing Dog Pyrenean",
        "1ddc1b8b-d7ed-11ea-85db-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "King Charles Spaniel",
        "1ddc4252-d7ed-11ea-93ca-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chinese Crested Powderpuff",
        "1ddc1b48-d7ed-11ea-82ec-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Karelian Bear Dog",
        "1ddc424f-d7ed-11ea-b268-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Short-haired Purebred cat",
        "1ddd05db-d7ed-11ea-84f4-302432eba3ec",
        "4",
        "42",
        "breed",
        "antech"
    ],
    [
        "German Hound",
        "1ddc1b92-d7ed-11ea-98b1-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Wire-haired Korthals Pointing Griffon Mix",
        "1ddc910c-d7ed-11ea-a7e6-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Saluki",
        "1ddc42be-d7ed-11ea-ae2d-302432eba3ec",
        "161",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sporting Lucas Terrier",
        "1ddc69b9-d7ed-11ea-a4cb-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Shih Tzu",
        "1ddc42cf-d7ed-11ea-a604-302432eba3ec",
        "169",
        "41",
        "breed",
        "antech"
    ],
    [
        "Anatolian Shepherd Dog Mix",
        "1ddcdf23-d7ed-11ea-96ce-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "<unknown>",
        "20e0d4fb-d80a-11ea-a1cd-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Short-haired Weimaraner Mix",
        "1ddcdf0f-d7ed-11ea-872e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Patterdale Terrier",
        "1ddc69b5-d7ed-11ea-b5df-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Mastiff",
        "1ddc4264-d7ed-11ea-bb55-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bolognese Mix",
        "1ddc909f-d7ed-11ea-a80e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Large Peruvian Hairless Dog Mix",
        "1ddcb80a-d7ed-11ea-b4bc-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Korea Jindo Dog Mix",
        "1ddcb7d6-d7ed-11ea-8630-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norfolk Terrier",
        "1ddc425c-d7ed-11ea-a383-302432eba3ec",
        "141",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tatra Shepherd Dog Mix",
        "1ddcdf1d-d7ed-11ea-9ffa-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Poodle Mix Medium",
        "1ddcb817-d7ed-11ea-93ea-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Modern Siamese Cat Mix",
        "1ddd2d20-d7ed-11ea-a835-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Standard Dachshund",
        "1ddc1b61-d7ed-11ea-a93e-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Italian Spinone",
        "1ddc4247-d7ed-11ea-81a9-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Burgos Pointing Dog Mix",
        "1ddc90b1-d7ed-11ea-9d66-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sokoke Cat Mix",
        "1ddd2d45-d7ed-11ea-88e5-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis aureus aureus",
        "5d59de4c-bd6c-11eb-8da6-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Laekenois Belgian Shepherd Dog Mix",
        "1ddc90eb-d7ed-11ea-8343-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Arabian Mau Mix",
        "1ddd2ce6-d7ed-11ea-a4f6-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Retriever Dog",
        "1ddc69d2-d7ed-11ea-8aa1-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Segugio Maremmano",
        "1ddc42c9-d7ed-11ea-af79-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mexican Hairless Dog Mix Miniature",
        "1ddcb7ef-d7ed-11ea-86ca-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Havanese",
        "1ddc1bb5-d7ed-11ea-89f1-302432eba3ec",
        "117",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chilean Terrier",
        "1ddc69ad-d7ed-11ea-8b38-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupaster lupaster",
        "5d5c7619-bd6c-11eb-b5ec-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Asian Semi-Long-haired Mix",
        "1ddd2ce9-d7ed-11ea-a80b-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis latrans ochropus",
        "5d5bb2af-bd6c-11eb-ae36-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bouvier des Ardennes",
        "1ddbf454-d7ed-11ea-98a3-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Hound Mix White and Black",
        "1ddc910a-d7ed-11ea-99db-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Black Norwegian Elkhound Mix",
        "1ddcb7fe-d7ed-11ea-9015-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis adustus kaffensis",
        "5d5968c1-bd6c-11eb-81ec-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Portuguese Sheepdog Mix",
        "1ddcb824-d7ed-11ea-9642-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "White Shepherd",
        "1ddc69a9-d7ed-11ea-a296-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pyrenean Sheepdog",
        "1ddc42ac-d7ed-11ea-bdfa-302432eba3ec",
        "497",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Bobtail",
        "1ddd05d4-d7ed-11ea-b144-302432eba3ec",
        "2",
        "42",
        "breed",
        "antech"
    ],
    [
        "Cheasapeake Bay Retriever Mix",
        "1ddc90be-d7ed-11ea-839c-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Hound White and Orange",
        "1ddc1b8f-d7ed-11ea-bb22-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Saint Bernard Dog Mix",
        "1ddcdece-d7ed-11ea-8790-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Basset Griffon Vendeen",
        "1ddc69d1-d7ed-11ea-b72b-302432eba3ec",
        "148",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sarabi dog",
        "8932edd8-63f5-11ec-9db7-7085c2a1b8e0",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Eastern wolf",
        "5d5dfca1-bd6c-11eb-839b-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Phalène Continental Toy Spaniel",
        "1ddc1b50-d7ed-11ea-9468-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Black",
        "1ddd0630-d7ed-11ea-a733-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "French Bulldog",
        "1ddc1b88-d7ed-11ea-a5b0-302432eba3ec",
        "104",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norrbottenspitz",
        "1ddc427b-d7ed-11ea-ad80-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bernese Mountain Dog Mix",
        "1ddc9094-d7ed-11ea-bcc9-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Havana Brown Mix",
        "1ddd2d09-d7ed-11ea-a826-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Greyhound Mix",
        "1ddcb7a9-d7ed-11ea-9ded-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pyrenean Sheepdog Mix",
        "1ddcdebf-d7ed-11ea-a1de-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Terrier Mix",
        "081b788d-ba32-11eb-a230-302432eba3e9",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-Haired Medium-Sized Portuguese Podengo Mix",
        "1ddcb821-d7ed-11ea-bd5c-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Estrela Mountain Dog Mix",
        "1ddc90f8-d7ed-11ea-af1a-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Majorcan Shepherd Dog Mix",
        "1ddcb794-d7ed-11ea-87ba-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "British Blue Cat",
        "1ddd05eb-d7ed-11ea-913a-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Hungarian Greyhound Mix",
        "1ddcb7b5-d7ed-11ea-8f77-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Coton de Tuléar Mix",
        "1ddc90cd-d7ed-11ea-a20d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans frustror",
        "5d5aef60-bd6c-11eb-bd6c-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Transylvanian Hound",
        "1ddc6984-d7ed-11ea-a170-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Boykin Spaniel",
        "1ddc69bf-d7ed-11ea-b64a-302432eba3ec",
        "517",
        "41",
        "breed",
        "antech"
    ],
    [
        "East Siberian Laïka",
        "1ddc1b71-d7ed-11ea-bddd-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Great Gascony Hound",
        "1ddc1baa-d7ed-11ea-b388-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Styrian Coarsehaired Hound Mix",
        "1ddcdef8-d7ed-11ea-a318-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schnauzer Giant",
        "1ddc1ba1-d7ed-11ea-bb48-302432eba3ec",
        "176",
        "41",
        "breed",
        "antech"
    ],
    [
        "Small Münsterländer Mix",
        "1ddcdeee-d7ed-11ea-8f46-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hanoverian Scenthound",
        "1ddc1bb3-d7ed-11ea-b6d2-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cyprus",
        "1ddd05fa-d7ed-11ea-b440-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Shiloh Shepherd",
        "1ddc69a8-d7ed-11ea-b7f7-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Gray Wolf",
        "e7e1fe92-59a3-11eb-bb89-302432eba3ec",
        "1304",
        "41",
        "breed",
        "antech"
    ],
    [
        "Georgian Shepherd Mix",
        "1ddcdf2b-d7ed-11ea-afaa-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Greater Swiss Mountain Dog Mix",
        "1ddcb7a7-d7ed-11ea-939c-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tornjak Mix",
        "1ddcdf08-d7ed-11ea-a4ed-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Plott Mix",
        "1ddcb810-d7ed-11ea-a70d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis adustus grayi",
        "5d5941b7-bd6c-11eb-ad38-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Glen of Imaal Terrier Mix",
        "1ddcdf36-d7ed-11ea-a8a9-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Petit Basset Griffon Vendeen",
        "1ddc428c-d7ed-11ea-ab1a-302432eba3ec",
        "148",
        "41",
        "breed",
        "antech"
    ],
    [
        "Boxer",
        "1ddbf456-d7ed-11ea-bd2a-302432eba3ec",
        "70",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Silky Terrier Mix",
        "1ddc69f5-d7ed-11ea-a453-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Yorkshire Terrier Mix",
        "1ddcdf31-d7ed-11ea-b667-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Blue Picardy Spaniel Mix",
        "1ddc909b-d7ed-11ea-8960-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kumaon Mastiff Mix",
        "1ddcb7eb-d7ed-11ea-b687-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Nebelung Cat Mix",
        "1ddd2d24-d7ed-11ea-b293-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Swedish White Elkhound",
        "1ddc6976-d7ed-11ea-afe5-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Asian Short-haired  Mix",
        "1ddd2cea-d7ed-11ea-8589-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Newfoundland dog",
        "1ddc4279-d7ed-11ea-82e6-302432eba3ec",
        "140",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schnoodle",
        "1ddc69d7-d7ed-11ea-8978-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bedlington Terrier",
        "1ddbf439-d7ed-11ea-aaf2-302432eba3ec",
        "57",
        "41",
        "breed",
        "antech"
    ],
    [
        "Löwchen Mix",
        "1ddcb7e3-d7ed-11ea-a278-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "British Longhair",
        "1ddd05ed-d7ed-11ea-92ef-302432eba3ec",
        "1314",
        "42",
        "breed",
        "antech"
    ],
    [
        "Norrbottenspitz Mix",
        "1ddcb7fb-d7ed-11ea-953f-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Prague Ratter Mix",
        "1ddcb826-d7ed-11ea-ab4e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bouvier des Ardennes Mix",
        "1ddc90a6-d7ed-11ea-a30a-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Fox Terrier",
        "1ddc69be-d7ed-11ea-a4b1-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Catahoula Leopard Dog",
        "b3874d6c-1cad-11ec-89c7-302432eba3e9",
        "459",
        "41",
        "breed",
        "antech"
    ],
    [
        "Blue Picardy Spaniel",
        "1ddbf449-d7ed-11ea-8452-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Welsh Corgi Cardigan",
        "1ddc698a-d7ed-11ea-907b-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Appenzell Cattle Dog",
        "1ddbf420-d7ed-11ea-b48a-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Swiss Hound Lucerne Hound Mix",
        "1ddcdefe-d7ed-11ea-92ce-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Plummer Terrier Mix",
        "1ddcdf3d-d7ed-11ea-a6d1-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Yorkipoo Mix",
        "1ddd05c8-d7ed-11ea-b97e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus irremotus",
        "5d5dd59d-bd6c-11eb-862a-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Saint Bernard Dog",
        "1ddc42bb-d7ed-11ea-9a6a-302432eba3ec",
        "160",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Bobtail Mix",
        "1ddd2cde-d7ed-11ea-b856-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Great AngloFrench White and Black Hound",
        "1ddc1ba7-d7ed-11ea-bb0f-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Australian Terrier",
        "1ddbf42b-d7ed-11ea-bda7-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Short-haired Kurilean Bobtail",
        "1ddd060f-d7ed-11ea-bcfc-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Birman Cat",
        "1ddd05e7-d7ed-11ea-82c5-302432eba3ec",
        "7",
        "42",
        "breed",
        "antech"
    ],
    [
        "Ariege Pointing Dog Mix",
        "1ddc69ee-d7ed-11ea-b3e3-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Siamese",
        "1ddd063c-d7ed-11ea-a884-302432eba3ec",
        "33",
        "42",
        "breed",
        "antech"
    ],
    [
        "Norwegian Forest Cat",
        "1ddd0621-d7ed-11ea-b2bb-302432eba3ec",
        "25",
        "42",
        "breed",
        "antech"
    ],
    [
        "Miniature Bull Terrier",
        "1ddc4251-d7ed-11ea-81e8-302432eba3ec",
        "137",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bluetick Coonhound",
        "1ddbf44a-d7ed-11ea-9789-302432eba3ec",
        "515",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pug Mix",
        "1ddcdebb-d7ed-11ea-8a50-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Korat Mix",
        "1ddd2d10-d7ed-11ea-98d6-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Peekapoo",
        "1ddc69da-d7ed-11ea-b7c6-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Portuguese Water Dog Mix",
        "1ddcb825-d7ed-11ea-a7d9-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Patterdale Terrier Mix",
        "1ddcdf3c-d7ed-11ea-ab0d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dogue De Bordeaux",
        "1ddc1b69-d7ed-11ea-ba8a-302432eba3ec",
        "494",
        "41",
        "breed",
        "antech"
    ],
    [
        "Selkirk Rex Mix",
        "1ddd2d3e-d7ed-11ea-af51-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis aureus indicus",
        "5d5a2c31-bd6c-11eb-a578-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Burmilla Cat Mix",
        "1ddd2cf5-d7ed-11ea-be59-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Japanese Terrier Mix",
        "1ddcb7c0-d7ed-11ea-bf30-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Korean Bobtail Mix",
        "1ddd2d11-d7ed-11ea-9951-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Scottish Fold Mix",
        "1ddd2d3b-d7ed-11ea-a7fe-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Jura Hound Mix",
        "1ddcb7cd-d7ed-11ea-a6e5-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Asian Cat Long-haired Mix",
        "1ddd2ce8-d7ed-11ea-8e1b-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Standard Dachshund Mix",
        "1ddc90dd-d7ed-11ea-b5ab-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bullmastiff Mix",
        "1ddc90b0-d7ed-11ea-937f-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Serengeti Mix",
        "1ddd2d3f-d7ed-11ea-914a-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Pyrenean Mastiff Mix",
        "1ddcdf05-d7ed-11ea-b6e8-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "LaPerm",
        "1ddd0611-d7ed-11ea-803e-302432eba3ec",
        "22",
        "42",
        "breed",
        "antech"
    ],
    [
        "Great Dane Mix",
        "1ddcb7a4-d7ed-11ea-a49f-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Catahoula Leopard Dog Mix",
        "f74b4041-1cad-11ec-8265-302432eba3e9",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Lagotto romagnolo",
        "1ddc425b-d7ed-11ea-af08-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire Fox Terrier",
        "1ddc6995-d7ed-11ea-9edb-302432eba3ec",
        "101",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Shepherd Mix",
        "1ddcdf28-d7ed-11ea-88d3-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian White",
        "1ddd0633-d7ed-11ea-ac8e-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "California Spangled",
        "1ddd05f1-d7ed-11ea-bc41-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Miniature Pinscher",
        "1ddc4273-d7ed-11ea-8094-302432eba3ec",
        "138",
        "41",
        "breed",
        "antech"
    ],
    [
        "Ragamuffin Cat",
        "1ddd062d-d7ed-11ea-a4dd-302432eba3ec",
        "509",
        "42",
        "breed",
        "antech"
    ],
    [
        "Labradoodle",
        "1ddc4259-d7ed-11ea-82c1-302432eba3ec",
        "542",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bearded Collie",
        "1ddbf437-d7ed-11ea-963b-302432eba3ec",
        "56",
        "41",
        "breed",
        "antech"
    ],
    [
        "Short-haired Dutch Shepherd Dog Mix",
        "1ddcdeef-d7ed-11ea-b9cf-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Polish Tatra Sheepdog Mix",
        "1ddcdf4f-d7ed-11ea-a9f2-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bucovina Shepherd Dog Mix",
        "1ddcdf25-d7ed-11ea-bdf2-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Border Collie Mix",
        "1ddc90a0-d7ed-11ea-a8e0-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bernese Hound Mix",
        "1ddc9093-d7ed-11ea-b86f-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chilean Terrier Mix",
        "1ddcdf34-d7ed-11ea-9f45-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans impavidus",
        "5d5b1671-bd6c-11eb-b7dc-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pembroke Welsh Corgi Mix",
        "1ddcdf11-d7ed-11ea-a114-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Blue",
        "1ddd0631-d7ed-11ea-8799-302432eba3ec",
        "29",
        "42",
        "breed",
        "antech"
    ],
    [
        "Cornish Rex",
        "1ddd05f6-d7ed-11ea-b309-302432eba3ec",
        "13",
        "42",
        "breed",
        "antech"
    ],
    [
        "Nebelung",
        "1ddd061f-d7ed-11ea-9bfd-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Large Portuguese Podengo",
        "1ddc429d-d7ed-11ea-bd2b-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Braque Du Bourbannais",
        "1ddbf453-d7ed-11ea-a634-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Boston Terrier Mix",
        "1ddc90a4-d7ed-11ea-a1b0-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis aureus syriacus",
        "5d5aa14b-bd6c-11eb-ad1a-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Westphalian Dachsbracke",
        "1ddc6990-d7ed-11ea-b0b3-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "King Charles Spaniel Mix",
        "1ddcb7d2-d7ed-11ea-a41f-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Modern Persian",
        "1ddd061a-d7ed-11ea-8dd4-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Field Spaniel",
        "1ddc1b80-d7ed-11ea-80f7-302432eba3ec",
        "97",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mexican Hairless Dog Standard",
        "1ddc4270-d7ed-11ea-a58a-302432eba3ec",
        "533",
        "41",
        "breed",
        "antech"
    ],
    [
        "Småland Hound Mix",
        "1ddcdeeb-d7ed-11ea-8972-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Berger Picard Mix",
        "1ddc9092-d7ed-11ea-a544-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Swiss Hound Schwyz Hound Mix",
        "1ddcdeff-d7ed-11ea-8be6-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Airedale Terrier",
        "1ddbf415-d7ed-11ea-b281-302432eba3ec",
        "43",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chihuahua Mix",
        "1ddc90bf-d7ed-11ea-9e65-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Long-haired Pointer",
        "1ddc1b94-d7ed-11ea-9193-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Spitz Mix Mittel",
        "1ddd05c2-d7ed-11ea-a055-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Hairless Terrier Mix",
        "1ddcdf32-d7ed-11ea-a2f3-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "St Germain Pointing Dog Mix",
        "1ddcdef5-d7ed-11ea-acd6-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Komondor Mix",
        "1ddcb7d5-d7ed-11ea-8b60-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Spanish Hound Mix",
        "1ddcdef2-d7ed-11ea-b1a5-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pekingese Mix",
        "1ddcb809-d7ed-11ea-ae9e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Oriental Cat Mix",
        "1ddd2d2b-d7ed-11ea-9579-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canaan Dog Mix",
        "1ddc90b3-d7ed-11ea-9cb2-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Continental Toy Spaniel Papillon",
        "1ddc1b4f-d7ed-11ea-90e1-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Slovakian Rough-haired Pointer",
        "1ddc69c4-d7ed-11ea-b61b-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Flat Coated Retriever Mix",
        "1ddc9101-d7ed-11ea-816d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bavarian Mountain Scenthound Mix",
        "1ddc9086-d7ed-11ea-94ed-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Akita Mix",
        "1ddc69e4-d7ed-11ea-8fb6-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Manchester Terrier Mix",
        "1ddcb7cc-d7ed-11ea-9161-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Poodle Mix Miniature",
        "1ddcb818-d7ed-11ea-b18c-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Griffon Nivernais",
        "1ddc1baf-d7ed-11ea-a870-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Swiss Hound",
        "1ddc6977-d7ed-11ea-8be9-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-coated Collie",
        "1ddc1b4e-d7ed-11ea-a6fb-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Karelian Bear Dog Mix",
        "1ddcb7cf-d7ed-11ea-9d1e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Springer Spaniel Mix",
        "1ddc90f4-d7ed-11ea-a835-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Nederlandse Kooikerhondje Mix",
        "1ddcb7f8-d7ed-11ea-933d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chartreuse Cat Mix",
        "1ddd2cf8-d7ed-11ea-ae0d-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Mittel German Spitz",
        "1ddc69cf-d7ed-11ea-8891-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "American German Shepherd Dog Mix",
        "1ddc69eb-d7ed-11ea-9454-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Munsterlander",
        "1ddc69dc-d7ed-11ea-9276-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Yorkshire Terrier",
        "1ddc69aa-d7ed-11ea-bb69-302432eba3ec",
        "190",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mudi Mix",
        "1ddcb7f6-d7ed-11ea-ac99-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Italian Greyhound Mix",
        "1ddcb7c4-d7ed-11ea-af8f-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bedlington Terrier Mix",
        "1ddc908b-d7ed-11ea-8733-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Briquet Griffon Vendeen Mix",
        "1ddd05c3-d7ed-11ea-ad9c-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Medium Griffon Vendeen",
        "1ddc426c-d7ed-11ea-915c-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Toy Fox Terrier",
        "1ddc69bb-d7ed-11ea-af38-302432eba3ec",
        "180",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian-European Laïka",
        "1ddc42b9-d7ed-11ea-9440-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schnauzer Miniature",
        "1ddc4274-d7ed-11ea-9a40-302432eba3ec",
        "139",
        "41",
        "breed",
        "antech"
    ],
    [
        "West Siberian Laïka",
        "1ddc698f-d7ed-11ea-971b-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Golden Retriever",
        "1ddc1ba2-d7ed-11ea-9c46-302432eba3ec",
        "110",
        "41",
        "breed",
        "antech"
    ],
    [
        "Basset Hound",
        "1ddbf433-d7ed-11ea-bff4-302432eba3ec",
        "54",
        "41",
        "breed",
        "antech"
    ],
    [
        "Short-haired Hungarian Vizsla",
        "1ddc1bbb-d7ed-11ea-b0fe-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Spanish Greyhound Mix",
        "1ddcdef1-d7ed-11ea-84fd-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "European German Shepherd Dog Mix",
        "1ddc909d-d7ed-11ea-a1e4-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans peninsulae",
        "5d5bd9bf-bd6c-11eb-b246-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hygen Hound Mix",
        "1ddcb7b8-d7ed-11ea-ad4e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Hound Mix White and Orange",
        "1ddc910b-d7ed-11ea-ac0d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tenterfield Terrier Mix",
        "1ddcdf02-d7ed-11ea-874e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schapendoes",
        "1ddc42c1-d7ed-11ea-950a-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Poodle Mix Standard",
        "1ddcb819-d7ed-11ea-8cc5-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pumi",
        "1ddc42aa-d7ed-11ea-a83b-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Greek Shepherd Mix",
        "1ddcdf2c-d7ed-11ea-bc97-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Highlander Mix",
        "1ddd2d0a-d7ed-11ea-b415-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Peterbald Cat Mix",
        "1ddd2d2f-d7ed-11ea-a161-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "White Swiss Shepherd Dog",
        "1ddc6999-d7ed-11ea-9fd8-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canadian Eskimo Dog Mix",
        "1ddc90b4-d7ed-11ea-b786-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Pointing Dog",
        "1ddc1b89-d7ed-11ea-bc49-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Hunting Terrier",
        "1ddc1b79-d7ed-11ea-96cd-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cardigan Welsh Corgi Mix",
        "1ddcdf10-d7ed-11ea-9dde-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Kurilean Bobtail",
        "1ddd060e-d7ed-11ea-b946-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Bouvier des Flandres",
        "1ddbf455-d7ed-11ea-9d32-302432eba3ec",
        "69",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bengal Cat",
        "1ddd05e6-d7ed-11ea-bee1-302432eba3ec",
        "413",
        "42",
        "breed",
        "antech"
    ],
    [
        "Serbian Tricolour Hound Mix",
        "1ddcdede-d7ed-11ea-830f-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sloughi Mix",
        "1ddcdee7-d7ed-11ea-adc3-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Asian Cat Long-haired",
        "1ddd05e0-d7ed-11ea-a96b-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Alpine Dachsbracke Mix",
        "1ddc69e3-d7ed-11ea-9e2a-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Dogo Argentino Mix",
        "1ddc90e3-d7ed-11ea-913f-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Tyrolean Hound Mix",
        "1ddcdf0b-d7ed-11ea-b65a-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans dickeyi",
        "5d5ac85e-bd6c-11eb-9bed-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Lykoi",
        "1ddd0614-d7ed-11ea-a797-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Jungle Curl Mix",
        "1ddd2d0e-d7ed-11ea-8c03-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Poodle Mix",
        "1ddcb816-d7ed-11ea-9f4a-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mastiff",
        "1ddc42ab-d7ed-11ea-a0ad-302432eba3ec",
        "136",
        "41",
        "breed",
        "antech"
    ],
    [
        "Auvergne Pointing Dog",
        "1ddbf42f-d7ed-11ea-ae59-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Groenendael Belgian Shepherd Dog Mix",
        "1ddc90bc-d7ed-11ea-acc3-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "French Bulldog Mix",
        "1ddc9104-d7ed-11ea-a432-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Polish Lowland Sheepdog Mix",
        "1ddcb815-d7ed-11ea-82e0-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canarian Warren Hound",
        "1ddc1b39-d7ed-11ea-92b3-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Portuguese Water Dog",
        "1ddc42a5-d7ed-11ea-96e5-302432eba3ec",
        "155",
        "41",
        "breed",
        "antech"
    ],
    [
        "Entlebuch Mountain Dog Mix",
        "1ddc90f6-d7ed-11ea-81ab-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Medium Griffon Vendeen Mix",
        "1ddcb7ec-d7ed-11ea-8c5b-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Miniature Fox Terrier",
        "1ddc69b2-d7ed-11ea-84e9-302432eba3ec",
        "180",
        "41",
        "breed",
        "antech"
    ],
    [
        "Peekapoo Mix",
        "1ddd05cd-d7ed-11ea-8635-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Lilac-point Siamese",
        "1ddd061b-d7ed-11ea-8580-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Estrela Mountain Dog",
        "1ddc1b7c-d7ed-11ea-af52-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Black and Tan English Toy Terrier",
        "1ddc69ae-d7ed-11ea-b889-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rough-haired Ibizan Hound Mix",
        "1ddcb7ba-d7ed-11ea-94f6-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Kai",
        "1ddc424e-d7ed-11ea-aece-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Brittany Mix",
        "1ddc90ac-d7ed-11ea-afc0-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "White Swiss Shepherd Dog Mix",
        "1ddcdf20-d7ed-11ea-81ac-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Small Brabant Griffon",
        "1ddc6966-d7ed-11ea-8b42-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Fila Brasileiro",
        "1ddc1b81-d7ed-11ea-a2c4-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Romanian Carpathian Shepherd Dog Mix",
        "1ddcb7f1-d7ed-11ea-b3fa-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Basset Griffon Vendeen Mix",
        "1ddd05c4-d7ed-11ea-a8a8-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Nova Scotia Duck Tolling Retriever",
        "1ddc4282-d7ed-11ea-814b-302432eba3ec",
        "490",
        "41",
        "breed",
        "antech"
    ],
    [
        "Spanish Hound",
        "1ddc696b-d7ed-11ea-a559-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hanoverian Scenthound Mix",
        "1ddcb7ae-d7ed-11ea-9faa-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Beagle",
        "1ddbf435-d7ed-11ea-ae96-302432eba3ec",
        "55",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schnoodle Mix",
        "1ddd05ca-d7ed-11ea-bf04-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Chihuahua Mix",
        "1ddc90c0-d7ed-11ea-ab9a-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus crassodon",
        "5d5d3950-bd6c-11eb-ac87-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schiller Hound Mix",
        "1ddcded5-d7ed-11ea-9fb2-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Foxhound",
        "1ddbf41c-d7ed-11ea-bd3d-302432eba3ec",
        "102",
        "41",
        "breed",
        "antech"
    ],
    [
        "Teddy Roosevelt Terrier",
        "1ddc69ba-d7ed-11ea-ab13-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Fawn Brittany Griffon",
        "1ddc1b7f-d7ed-11ea-b2ca-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Japanese Akita Mix",
        "1ddcb7c9-d7ed-11ea-b6f5-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Spanish Mastiff",
        "1ddc69ca-d7ed-11ea-ace2-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Great AngloFrench White and Black Hound Mix",
        "1ddcb7a2-d7ed-11ea-846c-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Eskimo Dog",
        "1ddbf41b-d7ed-11ea-bff4-302432eba3ec",
        "46",
        "41",
        "breed",
        "antech"
    ],
    [
        "Japanese Terrier",
        "1ddc1bc5-d7ed-11ea-86f4-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Blue Gascony Basset Mix",
        "1ddc9099-d7ed-11ea-bda2-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bourbonnais Pointing Dog Mix",
        "1ddc90a5-d7ed-11ea-9bd9-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Skye Terrier",
        "1ddc42b5-d7ed-11ea-a5cc-302432eba3ec",
        "172",
        "41",
        "breed",
        "antech"
    ],
    [
        "Ragamuffin Cat Mix",
        "1ddd2d32-d7ed-11ea-921d-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Norwegian Buhund",
        "1ddc427c-d7ed-11ea-9a91-302432eba3ec",
        "531",
        "41",
        "breed",
        "antech"
    ],
    [
        "DanishSwedish Farmdog",
        "1ddc1b65-d7ed-11ea-9a4a-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Sealyham Terrier",
        "1ddc4287-d7ed-11ea-a606-302432eba3ec",
        "166",
        "41",
        "breed",
        "antech"
    ],
    [
        "German Spitz Mix Gross",
        "1ddcb798-d7ed-11ea-9c42-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Other dog Mix",
        "1ddcb806-d7ed-11ea-a5b0-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Montenegrin Mountain Hound Mix",
        "1ddcb7f5-d7ed-11ea-a26f-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norwegian Elkhound black",
        "1ddc427e-d7ed-11ea-b413-302432eba3ec",
        "142",
        "41",
        "breed",
        "antech"
    ],
    [
        "Poitevin",
        "1ddc4290-d7ed-11ea-8eb8-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Siberian Cat Mix",
        "1ddd2d42-d7ed-11ea-9a97-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Romanian Bucovina Shepherd Dog",
        "1ddc4267-d7ed-11ea-b650-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Rhodesian Ridgeback Mix",
        "1ddcdec3-d7ed-11ea-b42f-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Pyrenean Sheepdog Mix",
        "1ddcdec0-d7ed-11ea-b737-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Napoleon",
        "1ddd061d-d7ed-11ea-82a3-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Kerry Blue Terrier Mix",
        "1ddcb7c1-d7ed-11ea-b84d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "British Cat",
        "1ddd05ec-d7ed-11ea-986d-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Dunker Hound Mix",
        "1ddc90e8-d7ed-11ea-95d8-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Austrian Pinscher",
        "1ddbf42e-d7ed-11ea-8e5c-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hovawart Mix",
        "1ddcb7b4-d7ed-11ea-b446-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Finnish Spitz",
        "1ddc1b84-d7ed-11ea-bf54-302432eba3ec",
        "98",
        "41",
        "breed",
        "antech"
    ],
    [
        "Soft-Coated Wheaten Terrier Mix",
        "1ddcdedb-d7ed-11ea-8ac1-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Broholmer Mix",
        "1ddc90ad-d7ed-11ea-8ad4-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Foldex Cat Mix",
        "1ddd2d07-d7ed-11ea-8a58-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Pinscher dog",
        "1ddc6997-d7ed-11ea-8858-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus floridanus",
        "5d5d6061-bd6c-11eb-9b00-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Slovakian Wire-haired Pointer Mix",
        "1ddcdeea-d7ed-11ea-b8b3-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Cat Mix",
        "1ddd2d34-d7ed-11ea-8130-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Short-haired Kurilean Bobtail Mix",
        "1ddd2d14-d7ed-11ea-a5a5-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Dachshund",
        "1ddc1b56-d7ed-11ea-bc76-302432eba3ec",
        "89",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pharaoh Hound",
        "1ddc428d-d7ed-11ea-bc7b-302432eba3ec",
        "149",
        "41",
        "breed",
        "antech"
    ],
    [
        "Shar Pei",
        "1ddc42cc-d7ed-11ea-9055-302432eba3ec",
        "83",
        "41",
        "breed",
        "antech"
    ],
    [
        "Welsh Corgi",
        "1ddc69d4-d7ed-11ea-9f47-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Otterhound Mix",
        "1ddcb807-d7ed-11ea-a36e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus monstrabilis",
        "5d5e23b1-bd6c-11eb-a473-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Ariege Hound",
        "1ddbf421-d7ed-11ea-950c-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bull Terrier Standard",
        "1ddc6970-d7ed-11ea-aeae-302432eba3ec",
        "74",
        "41",
        "breed",
        "antech"
    ],
    [
        "Schnauzer Mix",
        "1ddcded8-d7ed-11ea-bc36-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Springer Spaniel",
        "1ddc1b78-d7ed-11ea-bff2-302432eba3ec",
        "95",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Staffordshire Terrier Mix",
        "1ddc69e9-d7ed-11ea-9552-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Austrian Black and Tan Hound",
        "1ddbf42d-d7ed-11ea-8268-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Black and Tan English Toy Terrier Mix",
        "1ddcdf35-d7ed-11ea-aaf7-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Cirneco dell'Etna",
        "1ddc1b4a-d7ed-11ea-b3ff-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bolognese",
        "1ddbf44d-d7ed-11ea-8b4b-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus hudsonicus",
        "5d5daea0-bd6c-11eb-a066-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Bohemian Rex Mix",
        "1ddd2cf0-d7ed-11ea-b0b9-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "French Hound Mix Tricolour",
        "1ddc9109-d7ed-11ea-a51b-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Drever Mix",
        "1ddc90e7-d7ed-11ea-9ff9-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Oriental Long-haired",
        "1ddd0627-d7ed-11ea-860c-302432eba3ec",
        "27",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis latrans jamesi",
        "5d5b64a8-bd6c-11eb-9f8c-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis aureus cruesemanni",
        "5d5a0519-bd6c-11eb-ae0d-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Brittany",
        "1ddbf45a-d7ed-11ea-a8bc-302432eba3ec",
        "72",
        "41",
        "breed",
        "antech"
    ],
    [
        "Portuguese Sheepdog",
        "1ddc42a4-d7ed-11ea-821b-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus filchneri",
        "5d5d6060-bd6c-11eb-b9ed-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Smooth-haired Russian Toy",
        "1ddc42b8-d7ed-11ea-a73c-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Slovakian Wirehaired Pointer",
        "1ddc6963-d7ed-11ea-a25f-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Toyger",
        "1ddd064a-d7ed-11ea-8ddd-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Brazilian Shorthair",
        "1ddd05ea-d7ed-11ea-a5a9-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Munchkin",
        "1ddd061c-d7ed-11ea-ab32-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Polish Greyhound",
        "1ddc4291-d7ed-11ea-884b-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Himalayan",
        "1ddd0606-d7ed-11ea-8b63-302432eba3ec",
        "456",
        "42",
        "breed",
        "antech"
    ],
    [
        "Devon Rex Mix",
        "1ddd2d00-d7ed-11ea-82cf-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Canis simensis simensis",
        "5d5ebff0-bd6c-11eb-800c-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hellenic Hound Mix",
        "1ddcb7b1-d7ed-11ea-a749-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "MediumSized AngloFrench Hound Mix",
        "1ddcb7ed-d7ed-11ea-816b-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Norfolk Terrier Mix",
        "1ddcb7dc-d7ed-11ea-96ba-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Korn Ja Mix",
        "1ddd2d12-d7ed-11ea-886b-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Bernadoodle",
        "1ddc69d8-d7ed-11ea-8316-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Italian Greyhound",
        "1ddc4243-d7ed-11ea-9b9f-302432eba3ec",
        "123",
        "41",
        "breed",
        "antech"
    ],
    [
        "Wire-haired Standard Dachshund",
        "1ddc1b62-d7ed-11ea-8bc2-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Japanese Chin Mix",
        "1ddcb7ca-d7ed-11ea-a8cd-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Brussels Griffon",
        "1ddc1b32-d7ed-11ea-af54-302432eba3ec",
        "73",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis lupus chanco",
        "5d5d123f-bd6c-11eb-8edc-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Short-haired Hungarian Vizsla Mix",
        "1ddcb7b6-d7ed-11ea-95b6-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Pudelpointer Mix",
        "1ddcb827-d7ed-11ea-a4c3-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "South Russian Shepherd Dog",
        "1ddc6993-d7ed-11ea-ac8b-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Eurasian Mix",
        "1ddc90f9-d7ed-11ea-bce8-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Landseer European Continental type",
        "1ddc425e-d7ed-11ea-b00b-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Long-haired Chihuahua Mix",
        "1ddc90c1-d7ed-11ea-96d5-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "West Highland White Terrier",
        "1ddc698e-d7ed-11ea-abb6-302432eba3ec",
        "187",
        "41",
        "breed",
        "antech"
    ],
    [
        "Peruvian Hairless Dog Mix mediumsized",
        "1ddcb80b-d7ed-11ea-988e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Oregon Rex Mix",
        "1ddd2d29-d7ed-11ea-b0e4-302432eba3ec",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Swedish Vallhund",
        "1ddc6975-d7ed-11ea-a23a-302432eba3ec",
        "498",
        "41",
        "breed",
        "antech"
    ],
    [
        "Border Collie",
        "1ddbf44e-d7ed-11ea-98bb-302432eba3ec",
        "65",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans thamnos",
        "5d5c00cf-bd6c-11eb-88a7-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canis latrans lestes",
        "5d5b8ba3-bd6c-11eb-8b6e-302432eba3e9",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Lakeland Terrier",
        "1ddc4248-d7ed-11ea-acbb-302432eba3ec",
        "131",
        "41",
        "breed",
        "antech"
    ],
    [
        "Goldendoodle Mix",
        "73c13018-3bf8-11ec-9e98-7085c2a1b8e0",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Standardized Siamese",
        "1ddd0644-d7ed-11ea-a3a7-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Egyptian Mau",
        "1ddd05ff-d7ed-11ea-a69f-302432eba3ec",
        "15",
        "42",
        "breed",
        "antech"
    ],
    [
        "Long-haired Miniature Dachshund Mix",
        "1ddc90d9-d7ed-11ea-a19e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Basque Shepherd Dog",
        "1ddc699d-d7ed-11ea-9cb7-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Colourpoint Long-haired",
        "1ddd0608-d7ed-11ea-9e87-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "German Pinscher Mix",
        "1ddc9111-d7ed-11ea-be99-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Castro Laboreiro Dog",
        "1ddc1b3c-d7ed-11ea-ac0e-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Toy Spaniel Mix",
        "1ddcdf4a-d7ed-11ea-ae4a-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Greenland Dog Mix",
        "1ddcb7a8-d7ed-11ea-96aa-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Caucasian Shepherd Dog",
        "1ddbf43d-d7ed-11ea-92a6-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Khao Manee",
        "1ddd060a-d7ed-11ea-8d43-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Schnauzer Mix Giant",
        "1ddcb79c-d7ed-11ea-851d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Airedale Terrier Mix",
        "1ddc69e1-d7ed-11ea-9c19-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Soft-Coated Wheaten Terrier",
        "1ddc42c8-d7ed-11ea-85fe-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Akbash",
        "1f9348b9-8d3b-11ed-b601-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Coonhound",
        "ca5980f7-8dc9-11ed-842a-302432eba3ec",
        "524",
        "41",
        "breed",
        "antech"
    ],
    [
        "Anglo-Français de Moyen Vénerie Mix",
        "ca4ebba6-8dc9-11ed-9325-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "English Coonhound Mix",
        "ca5b2ea8-8dc9-11ed-8e17-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Black Mouth Cur",
        "ca80a707-8dc9-11ed-9265-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Anglo-Français de Petite Vénerie",
        "ca946a60-8dc9-11ed-95d3-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Pit Bull Terrier",
        "ca836606-8dc9-11ed-ab7b-302432eba3ec",
        "449",
        "41",
        "breed",
        "antech"
    ],
    [
        "Alaskan Klee Kai",
        "ca437109-8dc9-11ed-9ceb-302432eba3ec",
        "1306",
        "41",
        "breed",
        "antech"
    ],
    [
        "Feist Mix",
        "ca694ca9-8dc9-11ed-87e0-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Leopard Hound",
        "ca72618a-8dc9-11ed-b20b-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Istrian Coarse-haired Hound",
        "66935571-8dcb-11ed-9220-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Tsvetnaya Bolonka",
        "ca7b6232-8dc9-11ed-bc22-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Istrian Shorthaired Hound",
        "ca6fdc9e-8dc9-11ed-acce-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Istrian Shorthaired Hound Mix",
        "ca7101f4-8dc9-11ed-8546-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Redbone Coonhound",
        "ca5c6728-8dc9-11ed-b439-302432eba3ec",
        "514",
        "41",
        "breed",
        "antech"
    ],
    [
        "Black Mouth Cur Mix",
        "ca820673-8dc9-11ed-8c6d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Shepherd Mix",
        "ca7f5a44-8dc9-11ed-81a9-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Treeing Cur Mix",
        "ca89a798-8dc9-11ed-b458-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hound Dog",
        "ca6d4440-8dc9-11ed-9a90-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Lapponian Herder",
        "ca6a8522-8dc9-11ed-9e69-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Carolina Dog Mix",
        "ca51a216-8dc9-11ed-8000-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Hound Dog Mix",
        "ca6e7cfc-8dc9-11ed-89e9-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Treeing Walker Coonhound",
        "ca652df1-8dc9-11ed-a041-302432eba3ec",
        "518",
        "41",
        "breed",
        "antech"
    ],
    [
        "Istrian Coarse-haired Hound Mix",
        "6854db1b-8dcb-11ed-993d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Coonhound",
        "ca56985b-8dc9-11ed-82da-302432eba3ec",
        "63",
        "41",
        "breed",
        "antech"
    ],
    [
        "Biewer Terrier Mix",
        "ca873696-8dc9-11ed-ac76-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chinook Mix",
        "ca544e63-8dc9-11ed-b87f-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Treeing Cur",
        "ca886f16-8dc9-11ed-b6c3-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Biewer Terrier",
        "ca85fe25-8dc9-11ed-bf42-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Feist",
        "ca67c600-8dc9-11ed-9a9d-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Lapponian Herder Mix",
        "ca6be4b9-8dc9-11ed-8c89-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Anglo-Français de Petite Vénerie Mix",
        "ca95a2e0-8dc9-11ed-bcca-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Treeing Tennessee Brindle",
        "ca910f2d-8dc9-11ed-b1cc-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Alaskan Klee Kai Mix",
        "ca45bae3-8dc9-11ed-b01e-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Redbone Coonhound Mix",
        "ca63f584-8dc9-11ed-a665-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Chinook",
        "ca5315e1-8dc9-11ed-90c7-302432eba3ec",
        "527",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Medium-haired Purebred cat",
        "862eab3c-8dd1-11ed-b123-302432eba3ec",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Carolina Dog",
        "ca4fcd6c-8dc9-11ed-995f-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Coonhound Mix",
        "ca584877-8dc9-11ed-8c56-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Shepherd",
        "ca7dd3a7-8dc9-11ed-9b49-302432eba3ec",
        "1297",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Leopard Hound Mix",
        "ca739a06-8dc9-11ed-b0c1-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Pit Bull Terrier Mix",
        "ca849e83-8dc9-11ed-956f-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Russian Tsvetnaya Bolonka Mix",
        "ca7c9ab4-8dc9-11ed-997d-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Treeing Tennessee Brindle Mix",
        "ca93802b-8dc9-11ed-905b-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Anglo-Français de Moyen Vénerie",
        "ca4d5c24-8dc9-11ed-bafe-302432eba3ec",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Treeing Walker Coonhound Mix",
        "ca666671-8dc9-11ed-a275-302432eba3ec",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Domestic Short-haired (USA)",
        "d51f6cb0-8de6-11ed-bfb8-302432eba3ec",
        "343",
        "42",
        "breed",
        "antech"
    ],
    [
        "Domestic Medium-haired (USA)",
        "87a38adf-8de7-11ed-bd5c-302432eba3ec",
        "523",
        "42",
        "breed",
        "antech"
    ],
    [
        "Domestic Long-haired (USA)",
        "9a0a77e7-8de7-11ed-af65-302432eba3ec",
        "344",
        "42",
        "breed",
        "antech"
    ],
    [
        "Mountain Cur",
        "6d9a2d01-e46f-11ed-978e-106fd9dd20e8",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Belgian Shepherd Dog Mix",
        "8e4c9d64-e54e-11ed-b5ea-0242ac120002",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Exotic",
        "8e4cab1a-e54e-11ed-b5ea-0242ac120002",
        "1334",
        "42",
        "breed",
        "antech"
    ],
    [
        "Exotic Mix",
        "8e4cac82-e54e-11ed-b5ea-0242ac120002",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "European Burmese",
        "8e4caf5c-e54e-11ed-b5ea-0242ac120002",
        "16",
        "42",
        "breed",
        "antech"
    ],
    [
        "European Burmese Mix",
        "8e4cb0b0-e54e-11ed-b5ea-0242ac120002",
        "650",
        "42",
        "breed",
        "antech"
    ],
    [
        "Boerboel",
        "746a8044-edf2-11ed-a05b-0242ac120003",
        "633",
        "41",
        "breed",
        "antech"
    ],
    [
        "Boerboel Mix",
        "746a8346-edf2-11ed-a05b-0242ac120003",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Peruvian Inca Orchid",
        "746a8486-edf2-11ed-a05b-0242ac120003",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Peruvian Inca Orchid Mix",
        "746a85b2-edf2-11ed-a05b-0242ac120003",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Deutsch Stichelhaar",
        "746a86d4-edf2-11ed-a05b-0242ac120003",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Deutsch Stichelhaar Mix",
        "746a87f6-edf2-11ed-a05b-0242ac120003",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Treeing Feist",
        "746a8a62-edf2-11ed-a05b-0242ac120003",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "Treeing Feist Mix",
        "746a8b8e-edf2-11ed-a05b-0242ac120003",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Indian Dog",
        "746a8ca6-edf2-11ed-a05b-0242ac120003",
        "505",
        "41",
        "breed",
        "antech"
    ],
    [
        "American Indian Dog Mix",
        "746a8db4-edf2-11ed-a05b-0242ac120003",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Akbash Mix",
        "8f50afec-52a5-11ee-be56-0242ac120002",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Mountain Cur Mix",
        "8f50bdb6-52a5-11ee-be56-0242ac120002",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Posavaz Hound Mix",
        "8f50c2ca-52a5-11ee-be56-0242ac120002",
        "345",
        "41",
        "breed",
        "antech"
    ],
    [
        "Canine",
        "36c3cde0-bd6b-11eb-9610-302432eba3e9",
        "CANINE",
        null,
        "species",
        "idexx"
    ],
    [
        "Feline",
        "29944158-bd6b-11eb-8276-302432eba3e9",
        "FELINE",
        null,
        "species",
        "idexx"
    ],
    [
        "Affenpinscher",
        "1ddbf413-d7ed-11ea-87e2-302432eba3ec",
        "AFFENPINSCHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Affenpinscher Mix",
        "1ddc69df-d7ed-11ea-9a16-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Afghan Hound",
        "1ddbf414-d7ed-11ea-8e57-302432eba3ec",
        "AFGHAN_HOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Afghan Hound Mix",
        "1ddc69e0-d7ed-11ea-8621-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Afghan Shepherd",
        "1ddc699b-d7ed-11ea-9b8c-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Afghan Shepherd Mix",
        "1ddcdf22-d7ed-11ea-8a6e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Airedale Terrier",
        "1ddbf415-d7ed-11ea-b281-302432eba3ec",
        "AIREDALE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Airedale Terrier Mix",
        "1ddc69e1-d7ed-11ea-9c19-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Akbash",
        "1f9348b9-8d3b-11ed-b601-302432eba3ec",
        "AKBASH",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Akbash Mix",
        "8f50afec-52a5-11ee-be56-0242ac120002",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Alaskan Klee Kai",
        "ca437109-8dc9-11ed-9ceb-302432eba3ec",
        "ALASKAN_KLEE_KAI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Alaskan Klee Kai Mix",
        "ca45bae3-8dc9-11ed-b01e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Alaskan Malamute",
        "1ddbf416-d7ed-11ea-8f92-302432eba3ec",
        "ALASKAN_MALAMUTE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Alaskan Malamute Mix",
        "1ddc69e2-d7ed-11ea-98d3-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Alpine Dachsbracke",
        "1ddbf417-d7ed-11ea-9148-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Alpine Dachsbracke Mix",
        "1ddc69e3-d7ed-11ea-9e2a-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Akita",
        "1ddbf418-d7ed-11ea-a8a2-302432eba3ec",
        "AKITA",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Akita Mix",
        "1ddc69e4-d7ed-11ea-8fb6-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Bulldog",
        "1ddbf419-d7ed-11ea-971b-302432eba3ec",
        "BULLDOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Bulldog Mix",
        "1ddc69e5-d7ed-11ea-999d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Cocker Spaniel",
        "1ddbf41a-d7ed-11ea-b0b3-302432eba3ec",
        "COCKER_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Cocker Spaniel Mix",
        "1ddc69e6-d7ed-11ea-bfe5-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Eskimo Dog",
        "1ddbf41b-d7ed-11ea-bff4-302432eba3ec",
        "AMERICAN_ESKIMO",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Eskimo Dog Mix",
        "1ddc69e7-d7ed-11ea-8c38-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Foxhound",
        "1ddbf41c-d7ed-11ea-bd3d-302432eba3ec",
        "AMERICAN_FOXHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Foxhound Mix",
        "1ddc69e8-d7ed-11ea-8c93-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American German Shepherd Dog",
        "1ddbf41f-d7ed-11ea-ab2c-302432eba3ec",
        "GERMAN_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American German Shepherd Dog Mix",
        "1ddc69eb-d7ed-11ea-9454-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Hairless Terrier",
        "1ddc69ab-d7ed-11ea-ae8c-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Hairless Terrier Mix",
        "1ddcdf32-d7ed-11ea-a2f3-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Indian Dog",
        "746a8ca6-edf2-11ed-a05b-0242ac120003",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Indian Dog Mix",
        "746a8db4-edf2-11ed-a05b-0242ac120003",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Leopard Hound",
        "ca72618a-8dc9-11ed-b20b-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Leopard Hound Mix",
        "ca739a06-8dc9-11ed-b0c1-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Pit Bull Terrier",
        "ca836606-8dc9-11ed-ab7b-302432eba3ec",
        "AMERICAN_PIT_BULL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Pit Bull Terrier Mix",
        "ca849e83-8dc9-11ed-956f-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Staffordshire Terrier",
        "1ddbf41d-d7ed-11ea-bdaf-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Staffordshire Terrier Mix",
        "1ddc69e9-d7ed-11ea-9552-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Water Spaniel",
        "1ddbf41e-d7ed-11ea-8345-302432eba3ec",
        "AMERICAN_WATER_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "American Water Spaniel Mix",
        "1ddc69ea-d7ed-11ea-af0f-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Anatolian Shepherd Dog",
        "1ddc699c-d7ed-11ea-9cb1-302432eba3ec",
        "ANATOLIAN_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Anatolian Shepherd Dog Mix",
        "1ddcdf23-d7ed-11ea-96ce-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Anglo-FranÃ§ais de Moyen VÃ©nerie",
        "ca4d5c24-8dc9-11ed-bafe-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Anglo-FranÃ§ais de Moyen VÃ©nerie Mix",
        "ca4ebba6-8dc9-11ed-9325-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Anglo-FranÃ§ais de Petite VÃ©nerie",
        "ca946a60-8dc9-11ed-95d3-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Anglo-FranÃ§ais de Petite VÃ©nerie Mix",
        "ca95a2e0-8dc9-11ed-bcca-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Appenzell Cattle Dog",
        "1ddbf420-d7ed-11ea-b48a-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Appenzell Cattle Dog Mix",
        "1ddc69ec-d7ed-11ea-a2db-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ariege Hound",
        "1ddbf421-d7ed-11ea-950c-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ariege Hound Mix",
        "1ddc69ed-d7ed-11ea-82c2-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ariege Pointing Dog",
        "1ddbf422-d7ed-11ea-acdb-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ariege Pointing Dog Mix",
        "1ddc69ee-d7ed-11ea-b3e3-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Artesian-Norman Basset",
        "1ddbf423-d7ed-11ea-9b30-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Artesian-Norman Basset Mix",
        "1ddc69ef-d7ed-11ea-952e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Artois Hound",
        "1ddbf424-d7ed-11ea-94f6-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Artois Hound Mix",
        "1ddc69f0-d7ed-11ea-9ddf-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Atlas Shepherd Dog",
        "1ddbf425-d7ed-11ea-a8fc-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Atlas Shepherd Dog Mix",
        "1ddc69f1-d7ed-11ea-9da4-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Cattle Dog",
        "1ddbf426-d7ed-11ea-ac5b-302432eba3ec",
        "AUSTRALIAN_CATTLE_DOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Cattle Dog Mix",
        "1ddc69f2-d7ed-11ea-b863-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Kelpie",
        "1ddbf427-d7ed-11ea-b2bf-302432eba3ec",
        "AUSTRALIAN_KELPIE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Kelpie Mix",
        "1ddc69f3-d7ed-11ea-b540-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Shepherd",
        "1ddbf428-d7ed-11ea-8e47-302432eba3ec",
        "AUSTRALIAN_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Shepherd Mix",
        "1ddc69f4-d7ed-11ea-8725-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Silky Terrier",
        "1ddbf429-d7ed-11ea-b05e-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Silky Terrier Mix",
        "1ddc69f5-d7ed-11ea-a453-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Stumpy Tail Cattle Dog",
        "1ddbf42a-d7ed-11ea-9fe5-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Stumpy Tail Cattle Dog Mix",
        "1ddc69f6-d7ed-11ea-afe0-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Terrier",
        "1ddbf42b-d7ed-11ea-bda7-302432eba3ec",
        "AUSTRALIAN_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Terrier Mix",
        "1ddc69f7-d7ed-11ea-8cb7-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian working kelpie",
        "1ddbf42c-d7ed-11ea-9660-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Australian working kelpie Mix",
        "1ddc907e-d7ed-11ea-9a10-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Austrian Black and Tan Hound",
        "1ddbf42d-d7ed-11ea-8268-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Austrian Black and Tan Hound Mix",
        "1ddc907f-d7ed-11ea-9111-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Austrian Pinscher",
        "1ddbf42e-d7ed-11ea-8e5c-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Austrian Pinscher Mix",
        "1ddc9080-d7ed-11ea-8dc0-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Auvergne Pointing Dog",
        "1ddbf42f-d7ed-11ea-ae59-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Auvergne Pointing Dog Mix",
        "1ddc9081-d7ed-11ea-b05d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Azawakh",
        "1ddbf430-d7ed-11ea-9f2f-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Azawakh Mix",
        "1ddc9082-d7ed-11ea-bc0b-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bosnian Coarse-Haired Hound",
        "1ddbf451-d7ed-11ea-b28b-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Barbet",
        "1ddbf431-d7ed-11ea-bde6-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Barbet Mix",
        "1ddc9083-d7ed-11ea-aff4-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Basenji",
        "1ddbf432-d7ed-11ea-a3ab-302432eba3ec",
        "BASENJI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Basenji Mix",
        "1ddc9084-d7ed-11ea-b8f5-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Basque Shepherd Dog",
        "1ddc699d-d7ed-11ea-9cb7-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Basque Shepherd Dog Mix",
        "1ddcdf24-d7ed-11ea-aa13-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Basset Griffon Vendeen",
        "1ddc69d1-d7ed-11ea-b72b-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Basset Griffon Vendeen Mix",
        "1ddd05c4-d7ed-11ea-a8a8-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Basset Hound",
        "1ddbf433-d7ed-11ea-bff4-302432eba3ec",
        "BASSET_HOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Basset Hound Mix",
        "1ddc9085-d7ed-11ea-b6c5-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bavarian Mountain Scenthound",
        "1ddbf434-d7ed-11ea-8322-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bavarian Mountain Scenthound Mix",
        "1ddc9086-d7ed-11ea-94ed-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Beagle",
        "1ddbf435-d7ed-11ea-ae96-302432eba3ec",
        "BEAGLE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Beagle Mix",
        "1ddc9087-d7ed-11ea-a90d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Beagle-Harrier",
        "1ddbf436-d7ed-11ea-80e2-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Beagle-Harrier Mix",
        "1ddc9088-d7ed-11ea-bf85-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bearded Collie",
        "1ddbf437-d7ed-11ea-963b-302432eba3ec",
        "BEARDED_COLLIE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bearded Collie Mix",
        "1ddc9089-d7ed-11ea-8e3b-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Beauceron",
        "1ddbf438-d7ed-11ea-bb65-302432eba3ec",
        "BEAUCERON",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Beauceron Mix",
        "1ddc908a-d7ed-11ea-986a-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bedlington Terrier",
        "1ddbf439-d7ed-11ea-aaf2-302432eba3ec",
        "BEDLINGTON_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bedlington Terrier Mix",
        "1ddc908b-d7ed-11ea-8733-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Griffon",
        "1ddbf43a-d7ed-11ea-85b1-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Griffon Mix",
        "1ddc908c-d7ed-11ea-8cf6-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Shepherd Dog",
        "5c24eb8c-d5bd-11ea-83fb-302432eba3ec",
        "BELGIAN_SHEEPDOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Shepherd Dog Groenendael",
        "1ddc1b40-d7ed-11ea-aba5-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Shepherd Dog Malinois",
        "1ddc4250-d7ed-11ea-beb5-302432eba3ec",
        "BELGIAN_MALINOIS",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Shepherd Dog Mix",
        "8e4c9d64-e54e-11ed-b5ea-0242ac120002",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Shepherd Dog Mix Tervuren",
        "1ddcdf1f-d7ed-11ea-b2e1-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Shepherd Dog Tervuren",
        "1ddc6998-d7ed-11ea-9afd-302432eba3ec",
        "BELGIAN_TERVUREN",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bergamasco Shepherd Dog",
        "1ddbf43b-d7ed-11ea-b8e4-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bergamasco Shepherd Dog Mix",
        "1ddc908d-d7ed-11ea-8a94-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Berger Picard",
        "1ddbf440-d7ed-11ea-a229-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Berger Picard Mix",
        "1ddc9092-d7ed-11ea-a544-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bernadoodle",
        "1ddc69d8-d7ed-11ea-8316-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bernadoodle Mix",
        "1ddd05cb-d7ed-11ea-9d60-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bernese Hound",
        "1ddbf441-d7ed-11ea-b1d3-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bernese Hound Mix",
        "1ddc9093-d7ed-11ea-b86f-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bernese Mountain Dog",
        "1ddbf442-d7ed-11ea-aa83-302432eba3ec",
        "BERNESE_MOUNTAIN_DOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bernese Mountain Dog Mix",
        "1ddc9094-d7ed-11ea-bcc9-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bichon Frise",
        "1ddbf443-d7ed-11ea-9447-302432eba3ec",
        "BICHON_FRISE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bichon Frise Mix",
        "1ddc9095-d7ed-11ea-91dd-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Biewer Terrier",
        "ca85fe25-8dc9-11ed-bf42-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Biewer Terrier Mix",
        "ca873696-8dc9-11ed-ac76-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Billy",
        "1ddbf444-d7ed-11ea-bd70-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Billy Mix",
        "1ddc9096-d7ed-11ea-9927-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Black and Tan Coonhound",
        "1ddbf445-d7ed-11ea-897f-302432eba3ec",
        "COONHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Black and Tan Coonhound Mix",
        "1ddc9097-d7ed-11ea-a889-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Black and Tan English Toy Terrier",
        "1ddc69ae-d7ed-11ea-b889-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Black and Tan English Toy Terrier Mix",
        "1ddcdf35-d7ed-11ea-aaf7-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Black Mouth Cur",
        "ca80a707-8dc9-11ed-9265-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Black Mouth Cur Mix",
        "ca820673-8dc9-11ed-8c6d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Elkhound Mix black",
        "1ddcb7fe-d7ed-11ea-9015-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Black Russian Terrier",
        "1ddc69ac-d7ed-11ea-995e-302432eba3ec",
        "BLACK_RUSSIAN_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Black Russian Terrier Mix",
        "1ddcdf33-d7ed-11ea-bcd9-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bloodhound",
        "1ddbf446-d7ed-11ea-a5ec-302432eba3ec",
        "BLOODHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bloodhound Mix",
        "1ddc9098-d7ed-11ea-b80d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Blue Gascony Basset",
        "1ddbf447-d7ed-11ea-9336-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Blue Gascony Basset Mix",
        "1ddc9099-d7ed-11ea-bda2-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Blue Gascony Griffon",
        "1ddbf448-d7ed-11ea-b2ad-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Blue Gascony Griffon Mix",
        "1ddc909a-d7ed-11ea-9333-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Blue Picardy Spaniel",
        "1ddbf449-d7ed-11ea-8452-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Blue Picardy Spaniel Mix",
        "1ddc909b-d7ed-11ea-8960-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bluetick Coonhound",
        "1ddbf44a-d7ed-11ea-9789-302432eba3ec",
        "BLUETICK_COONHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bluetick Coonhound Mix",
        "1ddc909c-d7ed-11ea-9f4b-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Boerboel",
        "746a8044-edf2-11ed-a05b-0242ac120003",
        "BOERBOEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Boerboel Mix",
        "746a8346-edf2-11ed-a05b-0242ac120003",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bohemian Shepherd",
        "1ddbf43c-d7ed-11ea-a955-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bohemian Shepherd Mix",
        "1ddc908e-d7ed-11ea-8d42-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bohemian Wire-haired Pointing Griffon",
        "1ddbf44c-d7ed-11ea-9732-302432eba3ec",
        "WIREHAIRED_POINTING_GRIFFON",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bohemian Wire-haired Pointing Griffon Mix",
        "1ddc909e-d7ed-11ea-994d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bolognese",
        "1ddbf44d-d7ed-11ea-8b4b-302432eba3ec",
        "BOLOGNESE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bolognese Mix",
        "1ddc909f-d7ed-11ea-a80e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Border Collie",
        "1ddbf44e-d7ed-11ea-98bb-302432eba3ec",
        "BORDER_COLLIE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Border Collie Mix",
        "1ddc90a0-d7ed-11ea-a8e0-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Border Terrier",
        "1ddbf44f-d7ed-11ea-9e94-302432eba3ec",
        "BORDER_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Border Terrier Mix",
        "1ddc90a1-d7ed-11ea-965d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Borzoi",
        "1ddbf450-d7ed-11ea-82a1-302432eba3ec",
        "BORZOI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Borzoi Mix",
        "1ddc90a2-d7ed-11ea-95de-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bosnian Coarse-Haired Hound Mix",
        "1ddc90a3-d7ed-11ea-a0f5-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Boston Terrier",
        "1ddbf452-d7ed-11ea-99a6-302432eba3ec",
        "BOSTON_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Boston Terrier Mix",
        "1ddc90a4-d7ed-11ea-a1b0-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bourbonnais Pointing Dog Mix",
        "1ddc90a5-d7ed-11ea-9bd9-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bouvier des Ardennes",
        "1ddbf454-d7ed-11ea-98a3-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bouvier des Ardennes Mix",
        "1ddc90a6-d7ed-11ea-a30a-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bouvier des Flandres",
        "1ddbf455-d7ed-11ea-9d32-302432eba3ec",
        "BOUVIER_DES_FLANDRES",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bouvier des Flandres Mix",
        "1ddc90a7-d7ed-11ea-96be-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Boxer",
        "1ddbf456-d7ed-11ea-bd2a-302432eba3ec",
        "BOXER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Boxer Mix",
        "1ddc90a8-d7ed-11ea-a8a3-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Boykin Spaniel",
        "1ddc69bf-d7ed-11ea-b64a-302432eba3ec",
        "BOYKIN_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Boykin Spaniel Mix",
        "1ddcdf46-d7ed-11ea-889d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bracco Italiano",
        "1ddbf457-d7ed-11ea-9073-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bracco Italiano Mix",
        "1ddc90a9-d7ed-11ea-b995-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bourbonnais Pointing Dog",
        "1ddbf453-d7ed-11ea-a634-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Brazilian Terrier",
        "1ddbf458-d7ed-11ea-b356-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Brazilian Terrier Mix",
        "1ddc90aa-d7ed-11ea-8d4a-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Briard",
        "1ddbf459-d7ed-11ea-b67e-302432eba3ec",
        "BRIARD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Briard Mix",
        "1ddc90ab-d7ed-11ea-b707-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Briquet Griffon Vendeen",
        "1ddc69d0-d7ed-11ea-99f5-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Briquet Griffon Vendeen Mix",
        "1ddd05c3-d7ed-11ea-ad9c-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Brittany",
        "1ddbf45a-d7ed-11ea-a8bc-302432eba3ec",
        "BRITTANY_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Brittany Mix",
        "1ddc90ac-d7ed-11ea-afc0-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Broholmer",
        "1ddbf45b-d7ed-11ea-b8ca-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Broholmer Mix",
        "1ddc90ad-d7ed-11ea-8ad4-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Brussels Griffon",
        "1ddc1b32-d7ed-11ea-af54-302432eba3ec",
        "BRUSSELS_GRIFFON",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Brussels Griffon Mix",
        "1ddc90ae-d7ed-11ea-8390-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bucovina Shepherd Dog",
        "1ddc699e-d7ed-11ea-a419-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bucovina Shepherd Dog Mix",
        "1ddcdf25-d7ed-11ea-bdf2-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bull Terrier Mix Standard",
        "1ddcdef7-d7ed-11ea-93a0-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bull Terrier Standard",
        "1ddc6970-d7ed-11ea-aeae-302432eba3ec",
        "BULL_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bullmastiff",
        "1ddc1b34-d7ed-11ea-9dbe-302432eba3ec",
        "BULLMASTIFF",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Bullmastiff Mix",
        "1ddc90b0-d7ed-11ea-937f-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Burgos Pointing Dog",
        "1ddc1b35-d7ed-11ea-a1ad-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Burgos Pointing Dog Mix",
        "1ddc90b1-d7ed-11ea-9d66-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cairn Terrier",
        "1ddc1b33-d7ed-11ea-bf8d-302432eba3ec",
        "CAIRN_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cairn Terrier Mix",
        "1ddc90af-d7ed-11ea-b363-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Canaan Dog",
        "1ddc1b37-d7ed-11ea-83b2-302432eba3ec",
        "CANAAN_DOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Canaan Dog Mix",
        "1ddc90b3-d7ed-11ea-9cb2-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Canadian Eskimo Dog",
        "1ddc1b38-d7ed-11ea-90e3-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Canadian Eskimo Dog Mix",
        "1ddc90b4-d7ed-11ea-b786-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Canarian Warren Hound",
        "1ddc1b39-d7ed-11ea-92b3-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Canarian Warren Hound Mix",
        "1ddc90b5-d7ed-11ea-844d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cane corso",
        "1ddc1b3a-d7ed-11ea-86a8-302432eba3ec",
        "CANE_CORSO",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cane corso Mix",
        "1ddc90b6-d7ed-11ea-945f-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cantabrian Water Dog",
        "1ddc69c5-d7ed-11ea-b691-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cantabrian Water Dog Mix",
        "1ddcdf4c-d7ed-11ea-8089-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cao Fila de Sao Miguel",
        "1ddc1b3b-d7ed-11ea-8ff5-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cao Fila de Sao Miguel Mix",
        "1ddc90b7-d7ed-11ea-9e57-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Corgi Mix Cardigan",
        "1ddcdf10-d7ed-11ea-9dde-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Carolina Dog",
        "ca4fcd6c-8dc9-11ed-995f-302432eba3ec",
        "CAROLINA_DOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Carolina Dog Mix",
        "ca51a216-8dc9-11ed-8000-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Carpathian Shepherd Dog",
        "1ddc699f-d7ed-11ea-a137-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Carpathian Shepherd Dog Mix",
        "1ddcdf26-d7ed-11ea-9d04-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Castro Laboreiro Dog",
        "1ddc1b3c-d7ed-11ea-ac0e-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Castro Laboreiro Dog Mix",
        "1ddc90b8-d7ed-11ea-ad72-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Maltese Mix",
        "f74b4041-1cad-11ec-8265-302432eba3e9",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Catahoula Leopard Dog",
        "b3874d6c-1cad-11ec-89c7-302432eba3e9",
        "CATAHOULA_LEOPARD_DOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Catalan Sheepdog",
        "1ddc1b3d-d7ed-11ea-84f6-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Catalan Sheepdog Mix",
        "1ddc90b9-d7ed-11ea-8690-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Caucasian Shepherd Dog",
        "1ddbf43d-d7ed-11ea-92a6-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Caucasian Shepherd Dog Mix",
        "1ddc908f-d7ed-11ea-8f44-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cavalier King Charles Spaniel",
        "1ddc1b3f-d7ed-11ea-bae7-302432eba3ec",
        "CAVALIER_KING_CHARLES_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cavalier King Charles Spaniel Mix",
        "1ddc90bb-d7ed-11ea-b434-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Central Asia Shepherd Dog",
        "1ddbf43e-d7ed-11ea-b90f-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Central Asia Shepherd Dog Mix",
        "1ddc9090-d7ed-11ea-9e75-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cesky Terrier",
        "1ddc1b36-d7ed-11ea-b52a-302432eba3ec",
        "CESKY_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cesky Terrier Mix",
        "1ddc90b2-d7ed-11ea-a032-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cheasapeake Bay Retriever",
        "1ddc1b42-d7ed-11ea-9fdc-302432eba3ec",
        "CHESAPEAKE_BAY_RETRIEVER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cheasapeake Bay Retriever Mix",
        "1ddc90be-d7ed-11ea-839c-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chihuahua",
        "1ddc1b43-d7ed-11ea-a698-302432eba3ec",
        "CHIHUAHUA",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chihuahua Mix",
        "1ddc90bf-d7ed-11ea-9e65-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chilean Terrier",
        "1ddc69ad-d7ed-11ea-8b38-302432eba3ec",
        "CHIHUAHUA",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chilean Terrier Mix",
        "1ddcdf34-d7ed-11ea-9f45-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chinese Crested",
        "1ddc1b46-d7ed-11ea-9990-302432eba3ec",
        "CHINESE_CRESTED",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chinese Crested Hairless",
        "1ddc1b47-d7ed-11ea-acf0-302432eba3ec",
        "CHINESE_CRESTED",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chinese Crested Mix",
        "1ddc90c2-d7ed-11ea-ad96-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chinese Crested Powderpuff",
        "1ddc1b48-d7ed-11ea-82ec-302432eba3ec",
        "CHINESE_CRESTED",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chinook",
        "ca5315e1-8dc9-11ed-90c7-302432eba3ec",
        "CHINOOK",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chinook Mix",
        "ca544e63-8dc9-11ed-b87f-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chow Chow",
        "1ddc1b49-d7ed-11ea-bcff-302432eba3ec",
        "CHOW_CHOW",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chow Chow Mix",
        "1ddc90c5-d7ed-11ea-af06-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cirneco dell'Etna",
        "1ddc1b4a-d7ed-11ea-b3ff-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cirneco dell'Etna Mix",
        "1ddc90c6-d7ed-11ea-bc36-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Clumber Spaniel",
        "1ddc1b4b-d7ed-11ea-8963-302432eba3ec",
        "CLUMBER_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Clumber Spaniel Mix",
        "1ddc90c7-d7ed-11ea-b1a3-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cockapoo",
        "1ddc1b4c-d7ed-11ea-a4ce-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Cockapoo Mix",
        "1ddc90c8-d7ed-11ea-abdf-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Continental Toy Spaniel Mix Papillon",
        "1ddc90cb-d7ed-11ea-ba6f-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Continental Toy Spaniel Papillon",
        "1ddc1b4f-d7ed-11ea-90e1-302432eba3ec",
        "PAPILLON",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Coonhound",
        "ca56985b-8dc9-11ed-82da-302432eba3ec",
        "COONHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Coonhound Mix",
        "ca584877-8dc9-11ed-8c56-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Coton de TulÃ©ar",
        "1ddc1b51-d7ed-11ea-b6e3-302432eba3ec",
        "COTON_DE_TULEAR",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Coton de TulÃ©ar Mix",
        "1ddc90cd-d7ed-11ea-a20d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Croatian Sheepdog",
        "1ddc1b52-d7ed-11ea-ac30-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Croatian Sheepdog Mix",
        "1ddc90ce-d7ed-11ea-af7e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Crossbred",
        "1ddc1b53-d7ed-11ea-984b-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Crossbred Mix",
        "1ddc90cf-d7ed-11ea-94c4-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Curly Coated Retriever",
        "1ddc1b54-d7ed-11ea-8d0c-302432eba3ec",
        "CURLY_COATED_RETRIEVER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Curly Coated Retriever Mix",
        "1ddc90d0-d7ed-11ea-a638-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Czechoslovakian Wolfdog",
        "1ddc1b55-d7ed-11ea-b718-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Czechoslovakian Wolfdog Mix",
        "1ddc90d1-d7ed-11ea-a8a6-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund",
        "1ddc1b56-d7ed-11ea-bc76-302432eba3ec",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix",
        "1ddc90d2-d7ed-11ea-b4fe-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Long-haired Miniature",
        "1ddc1b5d-d7ed-11ea-a14c-302432eba3ec",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dalmatian",
        "1ddc1b63-d7ed-11ea-bd2a-302432eba3ec",
        "DALMATION",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dalmatian Mix",
        "1ddc90df-d7ed-11ea-b529-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dandie Dinmont Terrier",
        "1ddc1b41-d7ed-11ea-84b9-302432eba3ec",
        "DANDIE_DINMONT_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dandie Dinmont Terrier Mix",
        "1ddc90bd-d7ed-11ea-8021-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Danish-Swedish Farmdog",
        "1ddc1b65-d7ed-11ea-9a4a-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Danish-Swedish Farmdog Mix",
        "1ddc90e1-d7ed-11ea-80df-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Deutsch Stichelhaar",
        "746a86d4-edf2-11ed-a05b-0242ac120003",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Deutsch Stichelhaar Mix",
        "746a87f6-edf2-11ed-a05b-0242ac120003",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Doberman Pinscher",
        "1ddc1b66-d7ed-11ea-a1e2-302432eba3ec",
        "DOBERMAN_PINSCHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Doberman Pinscher Mix",
        "1ddc90e2-d7ed-11ea-866d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dogo Argentino",
        "1ddc1b67-d7ed-11ea-863d-302432eba3ec",
        "ARGENTINO_DOGO",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dogo Argentino Mix",
        "1ddc90e3-d7ed-11ea-913f-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dogo Canario",
        "1ddc1b68-d7ed-11ea-8cef-302432eba3ec",
        "PERRO_DE_PRESA_CANARIO",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dogo Canario Mix",
        "1ddc90e4-d7ed-11ea-b1aa-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dogue De Bordeaux",
        "1ddc1b69-d7ed-11ea-ba8a-302432eba3ec",
        "DOGUE_DE_BORDEAUX",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dogue De Bordeaux Mix",
        "1ddc90e5-d7ed-11ea-a520-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Canis lupus familiaris",
        "e7e22593-59a3-11eb-85a2-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Drentse Partridge Dog",
        "1ddc1b6a-d7ed-11ea-aa9d-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Drentse Partridge Dog Mix",
        "1ddc90e6-d7ed-11ea-8f58-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Drever",
        "1ddc1b6b-d7ed-11ea-8ff5-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Drever Mix",
        "1ddc90e7-d7ed-11ea-9ff9-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dunker Hound",
        "1ddc1b6c-d7ed-11ea-906e-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dunker Hound Mix",
        "1ddc90e8-d7ed-11ea-95d8-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dutch Shepherd Dog",
        "1ddc1b96-d7ed-11ea-9a30-302432eba3ec",
        "DUTCH_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dutch Shepherd Dog Mix",
        "1ddc9112-d7ed-11ea-80bd-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "East European Shepherd",
        "1ddc69a0-d7ed-11ea-9bec-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "East European Shepherd Mix",
        "1ddcdf27-d7ed-11ea-956f-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "East Siberian LaÃ¯ka",
        "1ddc1b71-d7ed-11ea-bddd-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "East Siberian LaÃ¯ka Mix",
        "1ddc90ed-d7ed-11ea-b936-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Elo Dog",
        "1ddc1b72-d7ed-11ea-9426-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Elo Mix",
        "1ddc90ee-d7ed-11ea-aaec-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Bulldog",
        "1ddc1b73-d7ed-11ea-9087-302432eba3ec",
        "BULLDOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Bulldog Mix",
        "1ddc90ef-d7ed-11ea-821e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Cocker Spaniel",
        "1ddc1b74-d7ed-11ea-b918-302432eba3ec",
        "ENGLISH_COCKER_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Cocker Spaniel Mix",
        "1ddc90f0-d7ed-11ea-ae7f-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Coonhound",
        "ca5980f7-8dc9-11ed-842a-302432eba3ec",
        "REDTICK_COONHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Coonhound Mix",
        "ca5b2ea8-8dc9-11ed-8e17-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Foxhound",
        "1ddc1b75-d7ed-11ea-bd90-302432eba3ec",
        "ENGLISH_FOXHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Foxhound Mix",
        "1ddc90f1-d7ed-11ea-a54d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Mastiff",
        "1ddc4264-d7ed-11ea-bb55-302432eba3ec",
        "MASTIFF",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Mastiff Mix",
        "1ddcb7e4-d7ed-11ea-953d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Pointer",
        "1ddc1b76-d7ed-11ea-b737-302432eba3ec",
        "POINTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Pointer Mix",
        "1ddc90f2-d7ed-11ea-bdbe-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Setter",
        "1ddc1b77-d7ed-11ea-affa-302432eba3ec",
        "ENGLISH_SETTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Setter Mix",
        "1ddc90f3-d7ed-11ea-8375-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Shepherd",
        "1ddc69a1-d7ed-11ea-a897-302432eba3ec",
        "ENGLISH_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Shepherd Mix",
        "1ddcdf28-d7ed-11ea-88d3-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Springer Spaniel",
        "1ddc1b78-d7ed-11ea-bff2-302432eba3ec",
        "ENGLISH_SPRINGER_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Springer Spaniel Mix",
        "1ddc90f4-d7ed-11ea-a835-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Toy Spaniel",
        "1ddc69c3-d7ed-11ea-8a52-302432eba3ec",
        "ENGLISH_TOY_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Toy Spaniel Mix",
        "1ddcdf4a-d7ed-11ea-ae4a-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Toy Terrier",
        "1ddc1b64-d7ed-11ea-8bb0-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "English Toy Terrier Mix",
        "1ddc90e0-d7ed-11ea-aaf9-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Entlebuch Mountain Dog Mix",
        "1ddc90f6-d7ed-11ea-81ab-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Entlebuch Mountain Dog",
        "1ddc1b7a-d7ed-11ea-8a12-302432eba3ec",
        "ENTLEBUCHER_MOUNTAIN_DOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Estonian Hound",
        "1ddc1b7b-d7ed-11ea-8476-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Estonian Hound Mix",
        "1ddc90f7-d7ed-11ea-abe5-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Estrela Mountain Dog",
        "1ddc1b7c-d7ed-11ea-af52-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Estrela Mountain Dog Mix",
        "1ddc90f8-d7ed-11ea-af1a-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Eurasian",
        "1ddc1b7d-d7ed-11ea-9438-302432eba3ec",
        "EURASIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Eurasian Mix",
        "1ddc90f9-d7ed-11ea-bce8-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Landseer Mix European Continental type",
        "1ddcb7de-d7ed-11ea-bd2b-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "European German Shepherd Dog",
        "1ddbf44b-d7ed-11ea-a302-302432eba3ec",
        "GERMAN_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "European German Shepherd Dog Mix",
        "1ddc909d-d7ed-11ea-a1e4-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fawn Brittany Basset",
        "1ddc1b7e-d7ed-11ea-892a-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fawn Brittany Basset Mix",
        "1ddc90fa-d7ed-11ea-9f79-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fawn Brittany Griffon",
        "1ddc1b7f-d7ed-11ea-b2ca-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fawn Brittany Griffon Mix",
        "1ddc90fb-d7ed-11ea-be6c-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Feist",
        "ca67c600-8dc9-11ed-9a9d-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Feist Mix",
        "ca694ca9-8dc9-11ed-87e0-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Field Spaniel",
        "1ddc1b80-d7ed-11ea-80f7-302432eba3ec",
        "FIELD_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Field Spaniel Mix",
        "1ddc90fc-d7ed-11ea-96e6-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fila Brasileiro",
        "1ddc1b81-d7ed-11ea-a2c4-302432eba3ec",
        "FILA_BRASILEIRO",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fila Brasileiro Mix",
        "1ddc90fd-d7ed-11ea-a6aa-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Finnish Hound",
        "1ddc1b82-d7ed-11ea-b83d-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Finnish Hound Mix",
        "1ddc90fe-d7ed-11ea-99f3-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Finnish Lapphund",
        "1ddc1b83-d7ed-11ea-aed7-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Finnish Lapphund Mix",
        "1ddc90ff-d7ed-11ea-ade7-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Finnish Spitz",
        "1ddc1b84-d7ed-11ea-bf54-302432eba3ec",
        "FINNISH_SPITZ",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Finnish Spitz Mix",
        "1ddc9100-d7ed-11ea-931b-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Flat Coated Retriever",
        "1ddc1b85-d7ed-11ea-aaf3-302432eba3ec",
        "FLAT_COATED_RETRIEVER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Flat Coated Retriever Mix",
        "1ddc9101-d7ed-11ea-816d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fox Terrier",
        "1ddc69be-d7ed-11ea-a4b1-302432eba3ec",
        "FOX_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fox Terrier Mix",
        "1ddcdf45-d7ed-11ea-938a-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Bulldog",
        "1ddc1b88-d7ed-11ea-a5b0-302432eba3ec",
        "FRENCH_BULLDOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Bulldog Mix",
        "1ddc9104-d7ed-11ea-a432-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Hound Mix Tricolour",
        "1ddc9109-d7ed-11ea-a51b-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Hound Mix White and Black",
        "1ddc910a-d7ed-11ea-99db-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Hound Mix White and Orange",
        "1ddc910b-d7ed-11ea-ac0d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Hound Tricolour",
        "1ddc1b8d-d7ed-11ea-b836-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Hound White and Black",
        "1ddc1b8e-d7ed-11ea-bb6b-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Hound White and Orange",
        "1ddc1b8f-d7ed-11ea-bb22-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Pointing Dog",
        "1ddc1b89-d7ed-11ea-bc49-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Pointing Dog Gascogne",
        "1ddc1b8a-d7ed-11ea-b7b0-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Pointing Dog Mix",
        "1ddc9105-d7ed-11ea-a81d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Pointing Dog Pyrenean",
        "1ddc1b8b-d7ed-11ea-85db-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Spaniel",
        "1ddc1b8c-d7ed-11ea-aea2-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Spaniel Mix",
        "1ddc9108-d7ed-11ea-8a6e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Wire-haired Korthals Pointing Griffon",
        "1ddc1b90-d7ed-11ea-af9a-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Wire-haired Korthals Pointing Griffon Mix",
        "1ddc910c-d7ed-11ea-a7e6-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Galician Shepherd Dog",
        "1ddc69a2-d7ed-11ea-aaa8-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Galician Shepherd Dog Mix",
        "1ddcdf29-d7ed-11ea-8c86-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Garafian Shepherd",
        "1ddc69a3-d7ed-11ea-bf6e-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Garafian Shepherd Mix",
        "1ddcdf2a-d7ed-11ea-bfce-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Pointing Dog Mix Gascogne",
        "1ddc9106-d7ed-11ea-8c2b-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Gascon Saintongeois",
        "1ddc1b91-d7ed-11ea-aae1-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Gascon Saintongeois Mix",
        "1ddc910d-d7ed-11ea-bbed-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Georgian Shepherd",
        "1ddc69a4-d7ed-11ea-a97e-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Georgian Shepherd Mix",
        "1ddcdf2b-d7ed-11ea-afaa-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Hound",
        "1ddc1b92-d7ed-11ea-98b1-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Hound Mix",
        "1ddc910e-d7ed-11ea-97da-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Hunting Terrier",
        "1ddc1b79-d7ed-11ea-96cd-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Hunting Terrier Mix",
        "1ddc90f5-d7ed-11ea-8241-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Long-haired Pointer",
        "1ddc1b94-d7ed-11ea-9193-302432eba3ec",
        "POINTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Long-haired Pointer Mix",
        "1ddc9110-d7ed-11ea-8bde-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Pinscher",
        "1ddc1b95-d7ed-11ea-abc9-302432eba3ec",
        "GERMAN_PINSCHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Pinscher Mix",
        "1ddc9111-d7ed-11ea-be99-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Shepherd Dog",
        "1ddc1b3e-d7ed-11ea-a4cd-302432eba3ec",
        "GERMAN_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Shepherd Dog Mix",
        "1ddc90ba-d7ed-11ea-881a-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Shepherd Dog Mix Short-haired",
        "1ddcdf01-d7ed-11ea-a8b7-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Short-haired Pointer",
        "1ddc1b9a-d7ed-11ea-8144-302432eba3ec",
        "GERMAN_SHORTHAIRED_POINTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Short-haired Pointer Mix",
        "1ddcb795-d7ed-11ea-b9cd-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spaniel",
        "1ddc1b9b-d7ed-11ea-a8f4-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spaniel Mix",
        "1ddcb796-d7ed-11ea-8c2e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spitz",
        "1ddc1b9c-d7ed-11ea-86cd-302432eba3ec",
        "GERMAN_SPITZ",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spitz Gross",
        "1ddc1b9d-d7ed-11ea-ad0d-302432eba3ec",
        "GERMAN_SPITZ",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spitz Mix",
        "1ddcb797-d7ed-11ea-b1da-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spitz Mix Pomeranian",
        "1ddcb79a-d7ed-11ea-a6c8-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spitz Mix Gross",
        "1ddcb798-d7ed-11ea-9c42-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spitz Mix Miniature",
        "1ddcb799-d7ed-11ea-ae4b-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spitz Mix Mittel",
        "1ddd05c2-d7ed-11ea-a055-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spitz Pomeranian",
        "1ddc1b9f-d7ed-11ea-b60f-302432eba3ec",
        "POMERANIAN",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spitz Miniature",
        "1ddc1b9e-d7ed-11ea-befd-302432eba3ec",
        "GERMAN_SPITZ",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pointer German Wire-Haired",
        "1ddc1ba0-d7ed-11ea-9c88-302432eba3ec",
        "GERMAN_WIREHAIRED_POINTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Wire-Haired Pointer Mix",
        "1ddcb79b-d7ed-11ea-a048-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ghadrejani Dog",
        "0d290cc6-63f8-11ec-9c73-7085c2a1b8e0",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ghadrejani Mix",
        "46578df8-63f8-11ec-a061-7085c2a1b8e0",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Glen of Imaal Terrier",
        "1ddc69af-d7ed-11ea-8977-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Glen of Imaal Terrier Mix",
        "1ddcdf36-d7ed-11ea-a8a9-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Golden Retriever",
        "1ddc1ba2-d7ed-11ea-9c46-302432eba3ec",
        "GOLDEN_RETRIEVER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Golden Retriever Mix",
        "1ddcb79d-d7ed-11ea-bf40-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Goldendoodle",
        "734e4977-3bf8-11ec-84ee-7085c2a1b8e0",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Goldendoodle Mix",
        "73c13018-3bf8-11ec-9e98-7085c2a1b8e0",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Gordon Setter",
        "1ddc1ba3-d7ed-11ea-8bd7-302432eba3ec",
        "GORDON_SETTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Gordon Setter Mix",
        "1ddcb79e-d7ed-11ea-89f5-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Grand Basset Griffon Vendeen",
        "1ddc1ba4-d7ed-11ea-8003-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Grand Basset Griffon Vendeen Mix",
        "1ddcb79f-d7ed-11ea-a219-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Grand Griffon Vendeen",
        "1ddc1ba5-d7ed-11ea-b43b-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Grand Griffon Vendeen Mix",
        "1ddcb7a0-d7ed-11ea-ae47-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Anglo-French Tricolour Hound",
        "1ddc1ba6-d7ed-11ea-9dd0-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Anglo-French Tricolour Hound Mix",
        "1ddcb7a1-d7ed-11ea-b895-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Anglo-French White and Black Hound",
        "1ddc1ba7-d7ed-11ea-bb0f-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Anglo-French White and Black Hound Mix",
        "1ddcb7a2-d7ed-11ea-846c-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Anglo-French White and Orange Hound",
        "1ddc1ba8-d7ed-11ea-abfa-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Anglo-French White and Orange Hound Mix",
        "1ddcb7a3-d7ed-11ea-8140-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Dane",
        "1ddc1ba9-d7ed-11ea-91ed-302432eba3ec",
        "GREAT_DANE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Dane Mix",
        "1ddcb7a4-d7ed-11ea-a49f-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Gascony Hound",
        "1ddc1baa-d7ed-11ea-b388-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Gascony Hound Mix",
        "1ddcb7a5-d7ed-11ea-8c85-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Pyrenees Pyrenean Mountain Dog",
        "1ddc1bab-d7ed-11ea-8d0b-302432eba3ec",
        "GREAT_PYRENEES",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Pyrenees Pyrenean Mountain Dog Mix",
        "1ddcb7a6-d7ed-11ea-b751-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Swiss Mountain Dog",
        "1ddc1bac-d7ed-11ea-9da3-302432eba3ec",
        "SWISS_MOUNTAIN_DOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Great Swiss Mountain Dog Mix",
        "1ddcb7a7-d7ed-11ea-939c-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Greek Shepherd",
        "1ddc69a5-d7ed-11ea-8e81-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Greek Shepherd Mix",
        "1ddcdf2c-d7ed-11ea-bc97-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Greenland Dog",
        "1ddc1bad-d7ed-11ea-aca8-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Greenland Dog Mix",
        "1ddcb7a8-d7ed-11ea-96aa-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Elkhound Mix grey",
        "1ddcb7ff-d7ed-11ea-946f-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Greyhound",
        "1ddc1bae-d7ed-11ea-bc95-302432eba3ec",
        "GREYHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Greyhound Mix",
        "1ddcb7a9-d7ed-11ea-9ded-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Griffon Nivernais",
        "1ddc1baf-d7ed-11ea-a870-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Griffon Nivernais Mix",
        "1ddcb7aa-d7ed-11ea-8c94-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Shepherd Dog Mix Groenendael",
        "1ddc90bc-d7ed-11ea-acc3-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Shepherd Dog Mix Groenendael",
        "7f71a626-7bc2-11eb-930c-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Gull Terrier",
        "1ddc69b0-d7ed-11ea-a93c-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Gull Terrier Mix",
        "1ddcdf37-d7ed-11ea-a0c0-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "HÃ¤lleforshund",
        "1ddc1bb1-d7ed-11ea-9b75-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "HÃ¤lleforshund Mix",
        "1ddcb7ac-d7ed-11ea-8998-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chinese Crested Mix Hairless",
        "1ddc90c3-d7ed-11ea-94f6-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Halden Hound",
        "1ddc1bb0-d7ed-11ea-94f2-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Halden Hound Mix",
        "1ddcb7ab-d7ed-11ea-93c0-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hamilton Hound",
        "1ddc1bb2-d7ed-11ea-8604-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hamilton Hound Mix",
        "1ddcb7ad-d7ed-11ea-b6ce-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hanoverian Scenthound",
        "1ddc1bb3-d7ed-11ea-b6d2-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hanoverian Scenthound Mix",
        "1ddcb7ae-d7ed-11ea-9faa-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Harrier",
        "1ddc1bb4-d7ed-11ea-9a0b-302432eba3ec",
        "HARRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Harrier Mix",
        "1ddcb7af-d7ed-11ea-96ae-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Havanese",
        "1ddc1bb5-d7ed-11ea-89f1-302432eba3ec",
        "HAVANESE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Havanese Mix",
        "1ddcb7b0-d7ed-11ea-aeea-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hellenic Hound",
        "1ddc1bb6-d7ed-11ea-8092-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hellenic Hound Mix",
        "1ddcb7b1-d7ed-11ea-a749-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Himalayan Sheepdog",
        "1ddc69c7-d7ed-11ea-a196-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Himalayan Sheepdog Mix",
        "1ddcdf4e-d7ed-11ea-a394-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hokkaido",
        "1ddc1bb7-d7ed-11ea-91da-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hokkaido Mix",
        "1ddcb7b2-d7ed-11ea-a4b7-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hollandse Smoushond",
        "1ddc1bb8-d7ed-11ea-89f7-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hollandse Smoushond Mix",
        "1ddcb7b3-d7ed-11ea-85ba-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hound Dog",
        "ca6d4440-8dc9-11ed-9a90-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hound Dog Mix",
        "ca6e7cfc-8dc9-11ed-89e9-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hovawart",
        "1ddc1bb9-d7ed-11ea-98ed-302432eba3ec",
        "HOVAWART",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hovawart Mix",
        "1ddcb7b4-d7ed-11ea-b446-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hungarian Greyhound",
        "1ddc1bba-d7ed-11ea-9292-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hungarian Greyhound Mix",
        "1ddcb7b5-d7ed-11ea-8f77-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hygen Hound",
        "1ddc1bbd-d7ed-11ea-acf8-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hygen Hound Mix",
        "1ddcb7b8-d7ed-11ea-ad4e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ibizan Hound",
        "1ddc1bbe-d7ed-11ea-bdd7-302432eba3ec",
        "HOUND_IBIZAN",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ibizan Hound Mix",
        "1ddcb7b9-d7ed-11ea-b9d7-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ibizan Hound rough-haired",
        "1ddc1bbf-d7ed-11ea-ac76-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ibizan Hound smooth-haired",
        "1ddc1bc0-d7ed-11ea-a675-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Icelandic Sheepdog",
        "1ddc1bc1-d7ed-11ea-9ecd-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Icelandic Sheepdog Mix",
        "1ddcb7bc-d7ed-11ea-ad3c-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Indian Spitz",
        "1ddc69ce-d7ed-11ea-8db4-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Indian Spitz Mix",
        "1ddd05c1-d7ed-11ea-aa54-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Glen of Imaal Terrier",
        "1ddc1b86-d7ed-11ea-ac05-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Glen of Imaal Terrier Mix",
        "1ddc9102-d7ed-11ea-bf52-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Red and White Setter",
        "1ddc1bc3-d7ed-11ea-bc0e-302432eba3ec",
        "IRISH_SETTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Red and White Setter Mix",
        "1ddcb7be-d7ed-11ea-9333-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Red Setter",
        "1ddc1bc4-d7ed-11ea-b937-302432eba3ec",
        "IRISH_SETTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Red Setter Mix",
        "1ddcb7bf-d7ed-11ea-a63e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Softcoated Wheaten Terrier",
        "1ddc1b87-d7ed-11ea-a40b-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Softcoated Wheaten Terrier Mix",
        "1ddc9103-d7ed-11ea-aee6-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Terrier",
        "1ddc1b93-d7ed-11ea-a2f7-302432eba3ec",
        "IRISH_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Terrier Mix",
        "1ddc910f-d7ed-11ea-9509-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Water Spaniel",
        "1ddc4241-d7ed-11ea-b745-302432eba3ec",
        "IRISH_WATER_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Water Spaniel Mix",
        "1ddcb7c2-d7ed-11ea-9b9c-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Wolfhound",
        "1ddc4242-d7ed-11ea-9d68-302432eba3ec",
        "IRISH_WOLFHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Irish Wolfhound Mix",
        "1ddcb7c3-d7ed-11ea-ad6e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Istrian Coarse-haired Hound",
        "66935571-8dcb-11ed-9220-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Istrian Coarse-haired Hound Mix",
        "6854db1b-8dcb-11ed-993d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Istrian Shorthaired Hound",
        "ca6fdc9e-8dc9-11ed-acce-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Istrian Shorthaired Hound Mix",
        "ca7101f4-8dc9-11ed-8546-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Italian Greyhound",
        "1ddc4243-d7ed-11ea-9b9f-302432eba3ec",
        "ITALIAN_GREYHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Italian Greyhound Mix",
        "1ddcb7c4-d7ed-11ea-af8f-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Italian Hound Coarse-haired",
        "1ddc4245-d7ed-11ea-8a08-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Italian Hound Mix Coarse-haired",
        "1ddcb7c6-d7ed-11ea-a799-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Italian Hound Mix Short-haired",
        "1ddcb7c5-d7ed-11ea-9649-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Italian Hound Short-haired",
        "1ddc4246-d7ed-11ea-878f-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Italian Spinone",
        "1ddc4247-d7ed-11ea-81a9-302432eba3ec",
        "SPINONE_ITALIANO",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Italian Spinone Mix",
        "1ddcb7c7-d7ed-11ea-8dbf-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Jack Russell Terrier",
        "1ddc1bc2-d7ed-11ea-aee5-302432eba3ec",
        "JACK_RUSSEL_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Jack Russell Terrier Mix",
        "1ddcb7bd-d7ed-11ea-8615-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Jagdterrier dog",
        "1ddc69b1-d7ed-11ea-8a17-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Jagdterrier dog Mix",
        "1ddcdf38-d7ed-11ea-9090-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Japanese Akita",
        "1ddc4249-d7ed-11ea-8de7-302432eba3ec",
        "AKITA",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Japanese Akita Mix",
        "1ddcb7c9-d7ed-11ea-b6f5-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Japanese Chin",
        "1ddc424a-d7ed-11ea-8c8f-302432eba3ec",
        "JAPANESE_CHIN",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Japanese Chin Mix",
        "1ddcb7ca-d7ed-11ea-a8cd-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Japanese Spitz",
        "1ddc424b-d7ed-11ea-9800-302432eba3ec",
        "JAPANESE_SPITZ",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Japanese Spitz Mix",
        "1ddcb7cb-d7ed-11ea-8c3a-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Japanese Terrier",
        "1ddc1bc5-d7ed-11ea-86f4-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Japanese Terrier Mix",
        "1ddcb7c0-d7ed-11ea-bf30-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Jura Hound",
        "1ddc424d-d7ed-11ea-a0c6-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Jura Hound Mix",
        "1ddcb7cd-d7ed-11ea-a6e5-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kai",
        "1ddc424e-d7ed-11ea-aece-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kai Mix",
        "1ddcb7ce-d7ed-11ea-a6ed-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kangal Shepherd Dog",
        "1ddc1b6d-d7ed-11ea-8299-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kangal Shepherd Dog Mix",
        "1ddc90e9-d7ed-11ea-81db-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Karelian Bear Dog",
        "1ddc424f-d7ed-11ea-b268-302432eba3ec",
        "KARELIAN_BEAR_DOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Karelian Bear Dog Mix",
        "1ddcb7cf-d7ed-11ea-9d1e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Karst Shepherd Dog",
        "1ddc1b6e-d7ed-11ea-a073-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Karst Shepherd Dog Mix",
        "1ddc90ea-d7ed-11ea-b405-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Keeshond",
        "6761857c-a169-11ec-94b4-7085c2a1b8e0",
        "KEESHOND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Keeshond Mix",
        "c6b49ac4-a169-11ec-8ae8-7085c2a1b8e0",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kerry Blue Terrier",
        "1ddc4240-d7ed-11ea-8b27-302432eba3ec",
        "KERRY_BLUE_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kerry Blue Terrier Mix",
        "1ddcb7c1-d7ed-11ea-b84d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "King Charles Spaniel",
        "1ddc4252-d7ed-11ea-93ca-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "King Charles Spaniel Mix",
        "1ddcb7d2-d7ed-11ea-a41f-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "King Shepherd",
        "1ddc69a6-d7ed-11ea-bdb8-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "King Shepherd Mix",
        "1ddcdf2d-d7ed-11ea-95fe-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kintamani-Bali Dog",
        "1ddc4253-d7ed-11ea-86e4-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kintamani-Bali Dog Mix",
        "1ddcb7d3-d7ed-11ea-af20-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kishu Ken",
        "1ddc4254-d7ed-11ea-8da4-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kishu Ken Mix",
        "1ddcb7d4-d7ed-11ea-9ab4-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Komondor",
        "1ddc4255-d7ed-11ea-834d-302432eba3ec",
        "KOMONDOR",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Komondor Mix",
        "1ddcb7d5-d7ed-11ea-8b60-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Korea Jindo Dog",
        "1ddc4256-d7ed-11ea-8001-302432eba3ec",
        "KOREA_JINDO_DOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Korea Jindo Dog Mix",
        "1ddcb7d6-d7ed-11ea-8630-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "KromfohrlÃ¤nder",
        "1ddc4257-d7ed-11ea-ac19-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "KromfohrlÃ¤nder Mix",
        "1ddcb7d7-d7ed-11ea-90ce-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kumaon Mastiff",
        "1ddc426b-d7ed-11ea-b339-302432eba3ec",
        "MASTIFF",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kumaon Mastiff Mix",
        "1ddcb7eb-d7ed-11ea-b687-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kuvasz",
        "1ddc4258-d7ed-11ea-aa00-302432eba3ec",
        "KUVASZ",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Kuvasz Mix",
        "1ddcb7d8-d7ed-11ea-a0bd-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "LÃ¶wchen",
        "1ddc4263-d7ed-11ea-b800-302432eba3ec",
        "LOWCHEN",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "LÃ¶wchen Mix",
        "1ddcb7e3-d7ed-11ea-a278-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Labradoodle",
        "1ddc4259-d7ed-11ea-82c1-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Labradoodle Mix",
        "1ddcb7d9-d7ed-11ea-a5e6-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Labrador Retriever",
        "1ddc425a-d7ed-11ea-a641-302432eba3ec",
        "LABRADOR_RETRIEVER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Labrador Retriever Mix",
        "1ddcb7da-d7ed-11ea-8904-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Shepherd Dog Laekenois",
        "1ddc1b6f-d7ed-11ea-82c8-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Shepherd Dog Mix Laekenois",
        "1ddc90eb-d7ed-11ea-8343-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Lagotto romagnolo",
        "1ddc425b-d7ed-11ea-af08-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Lagotto romagnolo Mix",
        "1ddcb7db-d7ed-11ea-8d54-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Lakeland Terrier",
        "1ddc4248-d7ed-11ea-acbb-302432eba3ec",
        "LAKELAND_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Lakeland Terrier Mix",
        "1ddcb7c8-d7ed-11ea-aa89-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Lancashire Heeler",
        "1ddc425d-d7ed-11ea-83ab-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Lancashire Heeler Mix",
        "1ddcb7dd-d7ed-11ea-a3f9-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Landseer European Continental type",
        "1ddc425e-d7ed-11ea-b00b-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Lapponian Herder",
        "ca6a8522-8dc9-11ed-9e69-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Lapponian Herder Mix",
        "ca6be4b9-8dc9-11ed-8c89-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Large MÃ¼nsterlander",
        "1ddc4260-d7ed-11ea-af86-302432eba3ec",
        "MUNSTERLANDER_POINTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Large MÃ¼nsterlander Mix",
        "1ddcb7e0-d7ed-11ea-9a7b-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Peruvian Hairless Dog Mix Large",
        "1ddcb80a-d7ed-11ea-b4bc-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Leonberger",
        "1ddc4261-d7ed-11ea-9b43-302432eba3ec",
        "LEONBERGER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Leonberger Mix",
        "1ddcb7e1-d7ed-11ea-967c-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Lhasa Apso",
        "1ddc4262-d7ed-11ea-b52b-302432eba3ec",
        "LHASA_APSO",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Lhasa Apso Mix",
        "1ddcb7e2-d7ed-11ea-9c08-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Majorcan Shepherd Dog long haired",
        "1ddc1b70-d7ed-11ea-b8a0-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Majorcan Shepherd Dog Mix long haired",
        "1ddc90ec-d7ed-11ea-a8bf-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chihuahua Long-haired",
        "1ddc1b45-d7ed-11ea-8310-302432eba3ec",
        "CHIHUAHUA",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chihuahua Mix Long-haired",
        "1ddc90c1-d7ed-11ea-96d5-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dutch Shepherd Dog Long-haired",
        "1ddc1b97-d7ed-11ea-923a-302432eba3ec",
        "DUTCH_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dutch Shepherd Dog Mix Long-haired",
        "1ddcb792-d7ed-11ea-a1bf-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Shepherd Dog Long-haired",
        "1ddc1b98-d7ed-11ea-a88c-302432eba3ec",
        "GERMAN_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Shepherd Dog Mix Long-haired",
        "1ddcb793-d7ed-11ea-9be3-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Long-haired Miniature",
        "1ddc90d9-d7ed-11ea-a19e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pyrenean Sheepdog Long-haired",
        "1ddc42ad-d7ed-11ea-af23-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pyrenean Sheepdog Mix Long-haired",
        "1ddcdec0-d7ed-11ea-b737-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Long-haired Rabbit Hunting",
        "1ddc1b59-d7ed-11ea-a01d-302432eba3ec",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Long-haired Rabbit Hunting",
        "1ddc90d5-d7ed-11ea-af5d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Toy Long-haired",
        "1ddc42b7-d7ed-11ea-b67f-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Toy Mix Long-haired",
        "1ddcdeca-d7ed-11ea-afce-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saint Bernard Dog Long-haired",
        "1ddc42bc-d7ed-11ea-97d4-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saint Bernard Dog Mix Long-haired",
        "1ddcdecf-d7ed-11ea-a094-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Long-haired Standard",
        "1ddc1b5c-d7ed-11ea-b8b8-302432eba3ec",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Long-haired Standard",
        "1ddc90d8-d7ed-11ea-8bc8-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Weimaraner Long-haired",
        "1ddc6988-d7ed-11ea-bbc7-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Weimaraner Mix Long-haired",
        "1ddcdf0e-d7ed-11ea-8282-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Majorca Mastiff",
        "1ddc4277-d7ed-11ea-a05e-302432eba3ec",
        "MASTIFF",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Majorca Mastiff Mix",
        "1ddcb7f7-d7ed-11ea-ad27-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Majorcan Shepherd Dog",
        "1ddc1b99-d7ed-11ea-9375-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Majorcan Shepherd Dog Mix",
        "1ddcb794-d7ed-11ea-87ba-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Belgian Shepherd Dog Mix Malinois",
        "1ddcb7d0-d7ed-11ea-8380-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Maltese",
        "1ddc4268-d7ed-11ea-a936-302432eba3ec",
        "MALTESE_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Maltese Mix",
        "1ddcb7e8-d7ed-11ea-a103-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Maltipoo",
        "1ddc69d9-d7ed-11ea-be0b-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Maltipoo Mix",
        "1ddd05cc-d7ed-11ea-b65a-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Manchester Terrier",
        "1ddc424c-d7ed-11ea-801d-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Manchester Terrier Mix",
        "1ddcb7cc-d7ed-11ea-9161-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Maremma and Abruzzes Sheepdog",
        "1ddc426a-d7ed-11ea-88ed-302432eba3ec",
        "MAREMMA_SHEEPDOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Maremma and Abruzzes Sheepdog Mix",
        "1ddcb7ea-d7ed-11ea-a15e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mastiff Dog",
        "1ddc42ab-d7ed-11ea-a0ad-302432eba3ec",
        "MASTIFF",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mastiff Mix",
        "1ddcdebe-d7ed-11ea-bb62-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Medium Griffon Vendeen",
        "1ddc426c-d7ed-11ea-915c-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Medium Griffon Vendeen Mix",
        "1ddcb7ec-d7ed-11ea-8c5b-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Medium-Sized Anglo-French Hound",
        "1ddc426d-d7ed-11ea-bfb7-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Medium-Sized Anglo-French Hound Mix",
        "1ddcb7ed-d7ed-11ea-816b-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mexican Hairless Dog Mix Medium-Sized",
        "1ddcb7ee-d7ed-11ea-8f7c-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mexican Hairless Dog",
        "1ddc69d3-d7ed-11ea-8341-302432eba3ec",
        "MEXICAN_HAIRLESS",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mexican Hairless Dog Medium-Sized",
        "1ddc426e-d7ed-11ea-b3ae-302432eba3ec",
        "MEXICAN_HAIRLESS",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mexican Hairless Dog Miniature",
        "1ddc426f-d7ed-11ea-9c8b-302432eba3ec",
        "MEXICAN_HAIRLESS",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mexican Hairless Dog Mix",
        "1ddd05c6-d7ed-11ea-b796-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mexican Hairless Dog Mix Miniature",
        "1ddcb7ef-d7ed-11ea-86ca-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mexican Hairless Dog Standard",
        "1ddc4270-d7ed-11ea-a58a-302432eba3ec",
        "MEXICAN_HAIRLESS",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Miniature American Shepherd",
        "1ddc4265-d7ed-11ea-b0d8-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Miniature American Shepherd Mix",
        "1ddcb7e5-d7ed-11ea-b653-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Miniature Bull Terrier",
        "1ddc4251-d7ed-11ea-81e8-302432eba3ec",
        "BULL_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Miniature Bull Terrier Mix",
        "1ddcb7d1-d7ed-11ea-87f0-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Miniature",
        "1ddc1b57-d7ed-11ea-b7c7-302432eba3ec",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Miniature",
        "1ddc90d3-d7ed-11ea-8e4d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Miniature Fox Terrier",
        "1ddc69b2-d7ed-11ea-84e9-302432eba3ec",
        "FOX_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Miniature Fox Terrier Mix",
        "1ddcdf39-d7ed-11ea-9c42-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Miniature Pinscher",
        "1ddc4273-d7ed-11ea-8094-302432eba3ec",
        "PINSCHER_MINIATURE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Miniature Pinscher Mix",
        "1ddcb7f3-d7ed-11ea-8b10-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Miniature",
        "e452cd9c-7bc1-11eb-8966-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shar Pei Miniature",
        "1ddc69db-d7ed-11ea-810b-302432eba3ec",
        "SHAR_PEI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shar Pei Mix Miniature",
        "1ddd05ce-d7ed-11ea-b8a8-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Spitz Mittel",
        "1ddc69cf-d7ed-11ea-8891-302432eba3ec",
        "GERMAN_SPITZ",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mixed Breed Dog",
        "f689dbd6-9964-11eb-9f44-7085c2a1b8e0",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Montenegrin Mountain Hound",
        "1ddc4275-d7ed-11ea-a1db-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Montenegrin Mountain Hound Mix",
        "1ddcb7f5-d7ed-11ea-a26f-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mountain Cur",
        "6d9a2d01-e46f-11ed-978e-106fd9dd20e8",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mountain Cur Mix",
        "8f50bdb6-52a5-11ee-be56-0242ac120002",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mudi Dog",
        "1ddc4276-d7ed-11ea-8add-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mudi Mix",
        "1ddcb7f6-d7ed-11ea-ac99-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Munsterlander",
        "1ddc69dc-d7ed-11ea-9276-302432eba3ec",
        "MUNSTERLANDER_POINTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Munsterlander Mix",
        "1ddd05cf-d7ed-11ea-a682-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Neapolitan Mastiff",
        "1ddc696c-d7ed-11ea-9b2b-302432eba3ec",
        "NEAPOLITAN_MASTIFF",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Neapolitan Mastiff Mix",
        "1ddcdef3-d7ed-11ea-8317-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Nederlandse Kooikerhondje",
        "1ddc4278-d7ed-11ea-a88c-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Nederlandse Kooikerhondje Mix",
        "1ddcb7f8-d7ed-11ea-933d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Newfoundland",
        "1ddc4279-d7ed-11ea-82e6-302432eba3ec",
        "NEWFOUNDLAND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Newfoundland Mix",
        "1ddcb7f9-d7ed-11ea-b401-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norfolk Terrier",
        "1ddc425c-d7ed-11ea-a383-302432eba3ec",
        "NORFOLK_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norfolk Terrier Mix",
        "1ddcb7dc-d7ed-11ea-96ba-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norrbottenspitz",
        "1ddc427b-d7ed-11ea-ad80-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norrbottenspitz Mix",
        "1ddcb7fb-d7ed-11ea-953f-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Buhund",
        "1ddc427c-d7ed-11ea-9a91-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Buhund Mix",
        "1ddcb7fc-d7ed-11ea-913d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Elkhound",
        "1ddc427d-d7ed-11ea-a14c-302432eba3ec",
        "NORWEGIAN_ELKHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Elkhound black",
        "1ddc427e-d7ed-11ea-b413-302432eba3ec",
        "NORWEGIAN_ELKHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Elkhound grey",
        "1ddc427f-d7ed-11ea-a23d-302432eba3ec",
        "NORWEGIAN_ELKHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Elkhound Mix",
        "1ddcb7fd-d7ed-11ea-99e6-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Lundehund",
        "1ddc4280-d7ed-11ea-8461-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Lundehund Mix",
        "1ddcb800-d7ed-11ea-930d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwich Terrier",
        "1ddc4269-d7ed-11ea-8292-302432eba3ec",
        "NORWICH_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Norwich Terrier Mix",
        "1ddcb7e9-d7ed-11ea-811e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Nova Scotia Duck Tolling Retriever",
        "1ddc4282-d7ed-11ea-814b-302432eba3ec",
        "NOVA_SCOTIA_DUCK_TOLLING_RETRIEVER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Nova Scotia Duck Tolling Retriever Mix",
        "1ddcb802-d7ed-11ea-bb8a-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Old Danish Pointing Dog",
        "1ddc4283-d7ed-11ea-92db-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Old Danish Pointing Dog Mix",
        "1ddcb803-d7ed-11ea-8d32-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Old English Sheepdog",
        "1ddc4284-d7ed-11ea-9e05-302432eba3ec",
        "OLD_ENGLISH_SHEEPDOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Old English Sheepdog Mix",
        "1ddcb804-d7ed-11ea-9834-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Old English Terrier",
        "1ddc69b3-d7ed-11ea-b9a5-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Old English Terrier Mix",
        "1ddcdf3a-d7ed-11ea-b1db-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Old German Shepherd Dog",
        "1ddc4266-d7ed-11ea-b1f7-302432eba3ec",
        "GERMAN_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Old German Shepherd Dog Mix",
        "1ddcb7e6-d7ed-11ea-9e8f-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Other dog Mix",
        "1ddcb806-d7ed-11ea-a5b0-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Otterhound",
        "1ddc4286-d7ed-11ea-9d65-302432eba3ec",
        "OTTERHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Otterhound Mix",
        "1ddcb807-d7ed-11ea-a36e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Parson Russell Terrier",
        "1ddc69b4-d7ed-11ea-83c6-302432eba3ec",
        "PARSON_RUSSELL_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Parson Russell Terrier Mix",
        "1ddcb7f2-d7ed-11ea-bf46-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Patterdale Terrier",
        "1ddc69b5-d7ed-11ea-b5df-302432eba3ec",
        "PATTERDALE_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Patterdale Terrier Mix",
        "1ddcdf3c-d7ed-11ea-ab0d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Peekapoo",
        "1ddc69da-d7ed-11ea-b7c6-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Peekapoo Mix",
        "1ddd05cd-d7ed-11ea-8635-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pekingese Dog",
        "1ddc4288-d7ed-11ea-8b6b-302432eba3ec",
        "PEKINGESE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pekingese Mix",
        "1ddcb809-d7ed-11ea-ae9e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Corgi Mix Pembroke",
        "1ddcdf11-d7ed-11ea-a114-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Peruvian Hairless Dog Large",
        "1ddc4289-d7ed-11ea-89bc-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Peruvian Hairless Dog medium-sized",
        "1ddc428a-d7ed-11ea-a4b9-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Peruvian Hairless Dog miniature",
        "1ddc428b-d7ed-11ea-80cb-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Peruvian Hairless Dog Mix medium-sized",
        "1ddcb80b-d7ed-11ea-988e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Peruvian Hairless Dog Mix miniature",
        "1ddcb80c-d7ed-11ea-9d9e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Peruvian Inca Orchid",
        "746a8486-edf2-11ed-a05b-0242ac120003",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Peruvian Inca Orchid Mix",
        "746a85b2-edf2-11ed-a05b-0242ac120003",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Petit Basset Griffon Vendeen",
        "1ddc428c-d7ed-11ea-ab1a-302432eba3ec",
        "PETIT_BASSET_GRIFFON_VENDEEN",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Petit Basset Griffon Vendeen Mix",
        "1ddcb80d-d7ed-11ea-b114-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Continental Toy Spaniel PhalÃ¨ne",
        "1ddc1b50-d7ed-11ea-9468-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Continental Toy Spaniel Mix PhalÃ¨ne",
        "1ddc90cc-d7ed-11ea-bd99-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pharaoh Hound",
        "1ddc428d-d7ed-11ea-bc7b-302432eba3ec",
        "HOUND_PHARAOH",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pharaoh Hound Mix",
        "1ddcb80e-d7ed-11ea-9c9a-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Picardy Spaniel",
        "1ddc428e-d7ed-11ea-a51c-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Picardy Spaniel Mix",
        "1ddcb80f-d7ed-11ea-91a9-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pinscher dog",
        "1ddc6997-d7ed-11ea-8858-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pinscher dog Mix",
        "1ddcdf1e-d7ed-11ea-bbc0-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Plott Dog",
        "1ddc428f-d7ed-11ea-9ce4-302432eba3ec",
        "PLOTT_HOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Plott Mix",
        "1ddcb810-d7ed-11ea-a70d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Plummer Terrier",
        "1ddc69b6-d7ed-11ea-85e2-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Plummer Terrier Mix",
        "1ddcdf3d-d7ed-11ea-a6d1-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poitevin Dog",
        "1ddc4290-d7ed-11ea-8eb8-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poitevin Mix",
        "1ddcb811-d7ed-11ea-9c00-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Polish Greyhound",
        "1ddc4291-d7ed-11ea-884b-302432eba3ec",
        "CHART_POLSKI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Polish Greyhound Mix",
        "1ddcb812-d7ed-11ea-b336-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Polish Hound",
        "1ddc4292-d7ed-11ea-b68f-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Polish Hound Mix",
        "1ddcb813-d7ed-11ea-ae2f-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Polish Hunting Dog",
        "1ddc4293-d7ed-11ea-9ad2-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Polish Hunting Dog Mix",
        "1ddcb814-d7ed-11ea-9473-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Polish Lowland Sheepdog",
        "1ddc4294-d7ed-11ea-bdef-302432eba3ec",
        "POLISH_LOWLAND_SHEEPDOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Polish Lowland Sheepdog Mix",
        "1ddcb815-d7ed-11ea-82e0-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Polish Tatra Sheepdog",
        "1ddc69c8-d7ed-11ea-9fd0-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Polish Tatra Sheepdog Mix",
        "1ddcdf4f-d7ed-11ea-a9f2-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pont-Audemer Spaniel",
        "1ddc6969-d7ed-11ea-ba1e-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pont-Audemer Spaniel Mix",
        "1ddcdef0-d7ed-11ea-ade4-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poodle Dog",
        "1ddc4295-d7ed-11ea-8d33-302432eba3ec",
        "POODLE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poodle Medium",
        "1ddc4296-d7ed-11ea-b8ad-302432eba3ec",
        "POODLE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poodle Miniature",
        "1ddc4297-d7ed-11ea-969c-302432eba3ec",
        "POODLE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poodle Mix",
        "1ddcb816-d7ed-11ea-9f4a-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poodle Mix Medium",
        "1ddcb817-d7ed-11ea-93ea-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poodle Mix Miniature",
        "1ddcb818-d7ed-11ea-b18c-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poodle Mix Standard",
        "1ddcb819-d7ed-11ea-8cc5-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poodle Mix Toy",
        "1ddcb81a-d7ed-11ea-bcb1-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poodle Toy",
        "1ddc4299-d7ed-11ea-ae0b-302432eba3ec",
        "POODLE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Porcelain",
        "1ddc429a-d7ed-11ea-b20e-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Porcelain Mix",
        "1ddcb81b-d7ed-11ea-b9e0-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo",
        "1ddc429c-d7ed-11ea-878f-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Mix",
        "1ddcb81c-d7ed-11ea-b9a7-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Pointing Dog",
        "1ddc42a3-d7ed-11ea-b2c8-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Pointing Dog Mix",
        "1ddcb823-d7ed-11ea-a4fc-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Sheepdog",
        "1ddc42a4-d7ed-11ea-821b-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Sheepdog Mix",
        "1ddcb824-d7ed-11ea-9642-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Water Dog",
        "1ddc42a5-d7ed-11ea-96e5-302432eba3ec",
        "PORTUGUESE_WATER_DOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Water Dog Mix",
        "1ddcb825-d7ed-11ea-a7d9-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Posavaz Hound",
        "1ddc429b-d7ed-11ea-8735-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Posavaz Hound Mix",
        "8f50c2ca-52a5-11ee-be56-0242ac120002",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chinese Crested Mix Powderpuff",
        "1ddc90c4-d7ed-11ea-bd2f-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Prague Ratter",
        "1ddc42a6-d7ed-11ea-8985-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Prague Ratter Mix",
        "1ddcb826-d7ed-11ea-ab4e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pudelpointer",
        "1ddc42a7-d7ed-11ea-85b5-302432eba3ec",
        "PUDELPOINTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pudelpointer Mix",
        "1ddcb827-d7ed-11ea-a4c3-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pug Dog",
        "1ddc42a8-d7ed-11ea-8334-302432eba3ec",
        "PUG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pug Mix",
        "1ddcdebb-d7ed-11ea-8a50-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Puli Dog",
        "1ddc42a9-d7ed-11ea-82f8-302432eba3ec",
        "PULI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Puli Mix",
        "1ddcdebc-d7ed-11ea-b286-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pumi Dog",
        "1ddc42aa-d7ed-11ea-a83b-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pumi Mix",
        "1ddcdebd-d7ed-11ea-856b-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "French Pointing Dog Mix Pyrenean",
        "1ddc9107-d7ed-11ea-9df8-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pyrenean Mastiff",
        "1ddc697f-d7ed-11ea-9ca9-302432eba3ec",
        "MASTIFF",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pyrenean Mastiff Mix",
        "1ddcdf05-d7ed-11ea-b6e8-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pyrenean Sheepdog",
        "1ddc42ac-d7ed-11ea-bdfa-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pyrenean Sheepdog Mix",
        "1ddcdebf-d7ed-11ea-a1de-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pyrenean Shepherd",
        "1ddc69a7-d7ed-11ea-9fc3-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pyrenean Shepherd Mix",
        "1ddcdf2e-d7ed-11ea-b26b-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Rabbit Hunting",
        "1ddc1b60-d7ed-11ea-8ba8-302432eba3ec",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Rabbit Hunting",
        "1ddc90dc-d7ed-11ea-a022-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Rafeiro of Alentejo",
        "1ddc42af-d7ed-11ea-9836-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Rafeiro of Alentejo Mix",
        "1ddcdec2-d7ed-11ea-afd4-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Rat Terrier",
        "1ddc69b7-d7ed-11ea-add5-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Rat Terrier Mix",
        "1ddcdf3e-d7ed-11ea-854c-302432eba3ec",
        "RAT_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Redbone Coonhound",
        "ca5c6728-8dc9-11ed-b439-302432eba3ec",
        "REDBONE_COONHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Redbone Coonhound Mix",
        "ca63f584-8dc9-11ed-a665-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Retriever Dog",
        "1ddc69d2-d7ed-11ea-8aa1-302432eba3ec",
        "RETRIEVER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Retriever Dog Mix",
        "1ddd05c5-d7ed-11ea-963b-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Rhodesian Ridgeback",
        "1ddc42b0-d7ed-11ea-861d-302432eba3ec",
        "RHODESIAN_RIDGEBACK",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Rhodesian Ridgeback Mix",
        "1ddcdec3-d7ed-11ea-b42f-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Romanian Bucovina Shepherd Dog",
        "1ddc4267-d7ed-11ea-b650-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Romanian Bucovina Shepherd Dog Mix",
        "1ddcb7e7-d7ed-11ea-a268-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Romanian Carpathian Shepherd Dog",
        "1ddc4271-d7ed-11ea-a610-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Romanian Carpathian Shepherd Dog Mix",
        "1ddcb7f1-d7ed-11ea-b3fa-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Romanian Mioritic Shepherd Dog",
        "1ddc42b1-d7ed-11ea-950e-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Romanian Mioritic Shepherd Dog Mix",
        "1ddcdec4-d7ed-11ea-88ab-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Rottweiler Dog",
        "1ddc42b4-d7ed-11ea-93d8-302432eba3ec",
        "ROTTWEILER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Rottweiler Mix",
        "1ddcdec7-d7ed-11ea-bc61-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Collie Rough-coated",
        "1ddc1b4d-d7ed-11ea-ae6d-302432eba3ec",
        "COLLIE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Collie Mix Rough-coated",
        "1ddc90c9-d7ed-11ea-98dc-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dutch Shepherd Dog rough-haired",
        "1ddc42b2-d7ed-11ea-a67e-302432eba3ec",
        "DUTCH_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dutch Shepherd Dog Mix rough-haired",
        "1ddcdec5-d7ed-11ea-82cb-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ibizan Hound Mix rough-haired",
        "1ddcb7ba-d7ed-11ea-94f6-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Black Terrier",
        "1ddc427a-d7ed-11ea-bae5-302432eba3ec",
        "BLACK_RUSSIAN_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Black Terrier Mix",
        "1ddcb7fa-d7ed-11ea-8f84-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Spaniel",
        "1ddc69c0-d7ed-11ea-848e-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Spaniel Mix",
        "1ddcdf47-d7ed-11ea-9f8d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Spotted Hound",
        "1ddc42b6-d7ed-11ea-a4c0-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Spotted Hound Mix",
        "1ddcdec9-d7ed-11ea-988e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Tsvetnaya Bolonka",
        "ca7b6232-8dc9-11ed-bc22-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Tsvetnaya Bolonka Mix",
        "ca7c9ab4-8dc9-11ed-997d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian-European LaÃ¯ka",
        "1ddc42b9-d7ed-11ea-9440-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian-European LaÃ¯ka Mix",
        "1ddcdecc-d7ed-11ea-8d0e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saarloos Wolfdog",
        "1ddc42ba-d7ed-11ea-bc34-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saarloos Wolfdog Mix",
        "1ddcdecd-d7ed-11ea-a12a-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saint Bernard Dog",
        "1ddc42bb-d7ed-11ea-9a6a-302432eba3ec",
        "SAINT_BERNARD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saint Bernard Dog Mix",
        "1ddcdece-d7ed-11ea-8790-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saint-Usuge Spaniel",
        "1ddc69c1-d7ed-11ea-84aa-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saint-Usuge Spaniel Mix",
        "1ddcdf48-d7ed-11ea-a60f-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saluki Dog",
        "1ddc42be-d7ed-11ea-ae2d-302432eba3ec",
        "SALUKI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saluki Mix",
        "1ddcded1-d7ed-11ea-ba7e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Samoyed Dog",
        "1ddc42bf-d7ed-11ea-b5b2-302432eba3ec",
        "SAMOYED",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Samoyed Mix",
        "1ddcded2-d7ed-11ea-8198-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Sarabi dog",
        "8932edd8-63f5-11ec-9db7-7085c2a1b8e0",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Sarabi dog mix",
        "817ce663-63f5-11ec-b68f-7085c2a1b8e0",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Save Valley Scenthound",
        "1ddc42c0-d7ed-11ea-8d21-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Save Valley Scenthound Mix",
        "1ddcded3-d7ed-11ea-827d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schapendoes",
        "1ddc42c1-d7ed-11ea-950a-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schapendoes Mix",
        "1ddcded4-d7ed-11ea-8701-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schiller Hound",
        "1ddc42c2-d7ed-11ea-bcfe-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schiller Hound Mix",
        "1ddcded5-d7ed-11ea-9fb2-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schipperke",
        "1ddc42c3-d7ed-11ea-aa5e-302432eba3ec",
        "SCHIPPERKE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schipperke Mix",
        "1ddcded6-d7ed-11ea-a51c-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schnauzer Dog",
        "1ddc42c5-d7ed-11ea-ab75-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schnauzer Giant",
        "1ddc1ba1-d7ed-11ea-bb48-302432eba3ec",
        "SCHNAUZER_GIANT",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schnauzer Miniature",
        "1ddc4274-d7ed-11ea-9a40-302432eba3ec",
        "SCHNAUZER_MINIATURE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schnauzer Mix",
        "1ddcded8-d7ed-11ea-bc36-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schnauzer Mix Giant",
        "1ddcb79c-d7ed-11ea-851d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schnauzer Mix Miniature",
        "1ddcb7f4-d7ed-11ea-ae04-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schnoodle",
        "1ddc69d7-d7ed-11ea-8978-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schnoodle Mix",
        "1ddd05ca-d7ed-11ea-bf04-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swiss Hound Schwyz",
        "1ddc6979-d7ed-11ea-b24c-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Scottish Deerhound",
        "1ddc42c6-d7ed-11ea-b0fd-302432eba3ec",
        "SCOTTISH_DEERHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Scottish Deerhound Mix",
        "1ddcded9-d7ed-11ea-a121-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Scottish Terrier",
        "1ddc4281-d7ed-11ea-972a-302432eba3ec",
        "SCOTTISH_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Scottish Terrier Mix",
        "1ddcb801-d7ed-11ea-b08f-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Sealyham Terrier",
        "1ddc4287-d7ed-11ea-a606-302432eba3ec",
        "SEALYLHAM_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Sealyham Terrier Mix",
        "1ddcb808-d7ed-11ea-8ec4-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Segugio Maremmano",
        "1ddc42c9-d7ed-11ea-af79-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Segugio Maremmano Mix",
        "1ddcdedc-d7ed-11ea-aabc-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Serbian Hound",
        "1ddc42ca-d7ed-11ea-92f7-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Serbian Hound Mix",
        "1ddcdedd-d7ed-11ea-9c14-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Serbian Tricolour Hound",
        "1ddc42cb-d7ed-11ea-b67e-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Serbian Tricolour Hound Mix",
        "1ddcdede-d7ed-11ea-830f-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Setter dog",
        "1ddc69cd-d7ed-11ea-b2b1-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Setter dog Mix",
        "1ddd05c0-d7ed-11ea-84e5-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shar Pei",
        "1ddc42cc-d7ed-11ea-9055-302432eba3ec",
        "SHAR_PEI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shar Pei Mix",
        "1ddcdedf-d7ed-11ea-af8d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shepherd",
        "ca7dd3a7-8dc9-11ed-9b49-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shepherd Mix",
        "ca7f5a44-8dc9-11ed-81a9-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shetland Sheepdog",
        "1ddc42cd-d7ed-11ea-8801-302432eba3ec",
        "SHETLAND_SHEEPDOG",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shetland Sheepdog Mix",
        "1ddcdee0-d7ed-11ea-9fda-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shiba Dog",
        "1ddc42ce-d7ed-11ea-93a8-302432eba3ec",
        "SHIBA_INU",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shiba Mix",
        "1ddcdee1-d7ed-11ea-b863-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shih Tzu",
        "1ddc42cf-d7ed-11ea-a604-302432eba3ec",
        "SHIH_TZU",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shih Tzu Mix",
        "1ddcdee3-d7ed-11ea-baa0-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shikoku Dog",
        "1ddc42d0-d7ed-11ea-9ccb-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shikoku Mix",
        "1ddcdee4-d7ed-11ea-9946-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shiloh Shepherd",
        "1ddc69a8-d7ed-11ea-b7f7-302432eba3ec",
        "SHILOH_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Shiloh Shepherd Mix",
        "1ddcdf2f-d7ed-11ea-9972-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Majorcan Shepherd Dog Mix short haired",
        "1ddcdec6-d7ed-11ea-a56a-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dutch Shepherd Dog Short-haired",
        "1ddc6968-d7ed-11ea-8a5d-302432eba3ec",
        "DUTCH_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dutch Shepherd Dog Mix Short-haired",
        "1ddcdeef-d7ed-11ea-b9cf-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "German Shepherd Dog Short-haired",
        "1ddc697b-d7ed-11ea-84d5-302432eba3ec",
        "GERMAN_SHEPHERD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hungarian Vizsla Short-haired",
        "1ddc1bbb-d7ed-11ea-b0fe-302432eba3ec",
        "VIZSLA",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hungarian Vizsla Mix Short-haired",
        "1ddcb7b6-d7ed-11ea-95b6-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Majorcan Shepherd Dog short haired",
        "1ddc42b3-d7ed-11ea-9a90-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saint Bernard Dog Short-haired",
        "1ddc42bd-d7ed-11ea-8e0d-302432eba3ec",
        "SAINT_BERNARD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Saint Bernard Dog Mix Short-haired",
        "1ddcded0-d7ed-11ea-8639-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Weimaraner Short-haired",
        "1ddc6989-d7ed-11ea-b877-302432eba3ec",
        "WEIMARANER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Weimaraner Mix Short-haired",
        "1ddcdf0f-d7ed-11ea-872e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Siberian Husky",
        "1ddc42d1-d7ed-11ea-b56e-302432eba3ec",
        "SIBERIAN_HUSKY",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Siberian Husky Mix",
        "1ddcdee5-d7ed-11ea-ab99-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Silky Terrier",
        "1ddc69b8-d7ed-11ea-907d-302432eba3ec",
        "SILKY_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Silky Terrier Mix",
        "1ddcdf3f-d7ed-11ea-8f93-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Skye Terrier",
        "1ddc42b5-d7ed-11ea-a5cc-302432eba3ec",
        "SKYE_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Skye Terrier Mix",
        "1ddcdec8-d7ed-11ea-962b-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Sloughi Dog",
        "1ddc42d3-d7ed-11ea-bfa0-302432eba3ec",
        "SLOUGHI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Sloughi Mix",
        "1ddcdee7-d7ed-11ea-adc3-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Slovakian Chuvach",
        "1ddc42d4-d7ed-11ea-b033-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Slovakian Chuvach Mix",
        "1ddcdee8-d7ed-11ea-82dd-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Slovakian Hound",
        "1ddc6962-d7ed-11ea-b3f9-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Slovakian Hound Mix",
        "1ddcdee9-d7ed-11ea-8901-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Slovakian Rough-haired Pointer",
        "1ddc69c4-d7ed-11ea-b61b-302432eba3ec",
        "POINTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Slovakian Rough-haired Pointer Mix",
        "1ddcdf4b-d7ed-11ea-8426-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Slovakian Wire-haired Pointer",
        "1ddc6963-d7ed-11ea-a25f-302432eba3ec",
        "POINTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Slovakian Wire-haired Pointer Mix",
        "1ddcdeea-d7ed-11ea-b8b3-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "SmÃ¥land Hound",
        "1ddc6964-d7ed-11ea-bc68-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "SmÃ¥land Hound Mix",
        "1ddcdeeb-d7ed-11ea-8972-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Small Blue Gascony Hound",
        "1ddc6965-d7ed-11ea-8264-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Small Blue Gascony Hound Mix",
        "1ddcdeec-d7ed-11ea-8249-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Small Brabant Griffon",
        "1ddc6966-d7ed-11ea-8b42-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Small Brabant Griffon Mix",
        "1ddcdeed-d7ed-11ea-9ed1-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Small MÃ¼nsterlÃ¤nder",
        "1ddc6967-d7ed-11ea-a315-302432eba3ec",
        "MUNSTERLANDER_POINTER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Small MÃ¼nsterlÃ¤nder Mix",
        "1ddcdeee-d7ed-11ea-8f46-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Mix Small",
        "f694d8b2-7bc1-11eb-bc05-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Collie Smooth-coated",
        "1ddc1b4e-d7ed-11ea-a6fb-302432eba3ec",
        "COLLIE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Collie Mix Smooth-coated",
        "1ddc90ca-d7ed-11ea-9e92-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pyrenean Sheepdog Smooth-faced",
        "1ddc42ae-d7ed-11ea-b997-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Pyrenean Sheepdog Mix Smooth-faced",
        "1ddcdec1-d7ed-11ea-8390-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chihuahua Smooth-haired",
        "1ddc1b44-d7ed-11ea-aef7-302432eba3ec",
        "CHIHUAHUA",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Chihuahua Mix Smooth-haired",
        "1ddc90c0-d7ed-11ea-ab9a-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fox Terrier smooth",
        "1ddc42c7-d7ed-11ea-bbe4-302432eba3ec",
        "FOX_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fox Terrier Mix smooth",
        "1ddcdeda-d7ed-11ea-a577-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Ibizan Hound Mix smooth-haired",
        "1ddcb7bb-d7ed-11ea-9f54-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Smooth-Haired Large",
        "1ddc429d-d7ed-11ea-bd2b-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Mix Smooth-Haired Large",
        "1ddcb81d-d7ed-11ea-87c9-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Smooth-Haired Medium-Sized",
        "1ddc429e-d7ed-11ea-b0b8-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Mix Smooth-Haired Medium-Sized",
        "1ddcb81e-d7ed-11ea-94c7-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Smooth-Haired Miniature",
        "1ddc1b5e-d7ed-11ea-8beb-302432eba3ec",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Smooth-Haired Miniature",
        "1ddc90da-d7ed-11ea-8bd8-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Smooth-Haired Miniature",
        "1ddc429f-d7ed-11ea-ac17-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Mix Smooth-Haired Miniature",
        "1ddcb81f-d7ed-11ea-a50e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Smooth-haired Rabbit Hunting",
        "1ddc1b5a-d7ed-11ea-bce5-302432eba3ec",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Smooth-haired Rabbit Hunting",
        "1ddc90d6-d7ed-11ea-9bbf-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Toy smooth-haired",
        "1ddc42b8-d7ed-11ea-a73c-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Toy Mix Smooth-haired",
        "1ddcdecb-d7ed-11ea-9ad4-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Smooth-Haired Standard",
        "1ddc1b61-d7ed-11ea-a93e-302432eba3ec",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Smooth-Haired Standard",
        "1ddc90dd-d7ed-11ea-b5ab-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Soft-Coated Wheaten Terrier",
        "1ddc42c8-d7ed-11ea-85fe-302432eba3ec",
        "SOFT_COATED_WHEATEN_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Soft-Coated Wheaten Terrier Mix",
        "1ddcdedb-d7ed-11ea-8ac1-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "South Russian Shepherd Dog",
        "1ddc6993-d7ed-11ea-ac8b-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "South Russian Shepherd Dog Mix",
        "1ddcdf19-d7ed-11ea-ab8b-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Spaniel dog",
        "1ddc69c2-d7ed-11ea-9780-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Spaniel dog Mix",
        "1ddcdf49-d7ed-11ea-a267-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Spanish Greyhound",
        "1ddc696a-d7ed-11ea-ab66-302432eba3ec",
        "SPANISH_GREYHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Spanish Greyhound Mix",
        "1ddcdef1-d7ed-11ea-84fd-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Spanish Hound",
        "1ddc696b-d7ed-11ea-a559-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Spanish Hound Mix",
        "1ddcdef2-d7ed-11ea-b1a5-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Spanish Mastiff",
        "1ddc69ca-d7ed-11ea-ace2-302432eba3ec",
        "MASTIFF",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Spanish Mastiff Mix",
        "1ddd05bd-d7ed-11ea-bbde-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Spanish Water Dog",
        "1ddc69c6-d7ed-11ea-aa34-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Spanish Water Dog Mix",
        "1ddcdf4d-d7ed-11ea-ac73-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Sporting Lucas Terrier",
        "1ddc69b9-d7ed-11ea-a4cb-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Sporting Lucas Terrier Mix",
        "1ddcdf40-d7ed-11ea-bb68-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "St. Germain Pointing Dog",
        "1ddc696e-d7ed-11ea-b3a1-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "St. Germain Pointing Dog Mix",
        "1ddcdef5-d7ed-11ea-acd6-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Stabyhoun Dog",
        "1ddc696f-d7ed-11ea-8f4d-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Stabyhoun Mix",
        "1ddcdef6-d7ed-11ea-aefc-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Staffordshire Bull terrier",
        "1ddc42d2-d7ed-11ea-8199-302432eba3ec",
        "STAFFORDSHIRE_BULL_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Staffordshire Bull terrier Mix",
        "1ddcdee6-d7ed-11ea-8e55-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Standard",
        "1ddc1b58-d7ed-11ea-a558-302432eba3ec",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Standard",
        "1ddc90d4-d7ed-11ea-8ff7-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Mexican Hairless Dog Mix Standard",
        "1ddcb7f0-d7ed-11ea-8a8d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Poodle Standard",
        "1ddc4298-d7ed-11ea-97c6-302432eba3ec",
        "POODLE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schnauzer Standard",
        "1ddc42c4-d7ed-11ea-8421-302432eba3ec",
        "SCHNAUZER_STANDARD",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Schnauzer Mix Standard",
        "1ddcded7-d7ed-11ea-8d92-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Styrian Coarse-haired Hound",
        "1ddc6971-d7ed-11ea-8ed9-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Styrian Coarse-haired Hound Mix",
        "1ddcdef8-d7ed-11ea-a318-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Sussex Spaniel",
        "1ddc6972-d7ed-11ea-a454-302432eba3ec",
        "SUSSEX_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Sussex Spaniel Mix",
        "1ddcdef9-d7ed-11ea-b2d7-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swedish Elkhound",
        "1ddc6973-d7ed-11ea-a476-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swedish Elkhound Mix",
        "1ddcdefa-d7ed-11ea-b038-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swedish Lapphund",
        "1ddc6974-d7ed-11ea-ad90-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swedish Lapphund Mix",
        "1ddcdefb-d7ed-11ea-b40a-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swedish Vallhund",
        "1ddc6975-d7ed-11ea-a23a-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swedish Vallhund Mix",
        "1ddcdefc-d7ed-11ea-8d6d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swedish White Elkhound",
        "1ddc6976-d7ed-11ea-afe5-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swedish White Elkhound Mix",
        "1ddcdefd-d7ed-11ea-b9a4-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swiss Hound",
        "1ddc6977-d7ed-11ea-8be9-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swiss Hound Lucerne",
        "1ddc6978-d7ed-11ea-9f4b-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swiss Hound Lucerne Hound Mix",
        "1ddcdefe-d7ed-11ea-92ce-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swiss Hound Mix",
        "ad67768a-71c0-11ed-88d8-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Swiss Hound Schwyz Hound Mix",
        "1ddcdeff-d7ed-11ea-8be6-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Taiwan Dog",
        "1ddc697a-d7ed-11ea-ac25-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Taiwan Dog Mix",
        "1ddcdf00-d7ed-11ea-9cbc-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tatra Shepherd Dog",
        "1ddc6996-d7ed-11ea-9b04-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tatra Shepherd Dog Mix",
        "1ddcdf1d-d7ed-11ea-9ffa-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Teddy Roosevelt Terrier",
        "1ddc69ba-d7ed-11ea-ab13-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Teddy Roosevelt Terrier Mix",
        "1ddcdf41-d7ed-11ea-a781-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tenterfield Terrier",
        "1ddc697c-d7ed-11ea-9409-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tenterfield Terrier Mix",
        "1ddcdf02-d7ed-11ea-874e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Terceira Mastiff",
        "1ddc69cb-d7ed-11ea-9af9-302432eba3ec",
        "MASTIFF",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Terceira Mastiff Mix",
        "1ddd05be-d7ed-11ea-bf0b-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Terrier Mix",
        "081b788d-ba32-11eb-a230-302432eba3e9",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Thai Bangkaew Dog",
        "1ddc697d-d7ed-11ea-8951-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Thai Bangkaew Dog Mix",
        "1ddcdf03-d7ed-11ea-b535-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Thai Ridgeback dog",
        "1ddc697e-d7ed-11ea-818f-302432eba3ec",
        "THAI_RIDGEBACK",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Thai Ridgeback dog Mix",
        "1ddcdf04-d7ed-11ea-a295-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tibetan Mastiff",
        "1ddc69cc-d7ed-11ea-b98a-302432eba3ec",
        "TIBETAN_MASTIFF",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tibetan Mastiff Mix",
        "1ddd05bf-d7ed-11ea-8ce2-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tibetan Spaniel",
        "1ddc6980-d7ed-11ea-a24f-302432eba3ec",
        "TIBETAN_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tibetan Spaniel Mix",
        "1ddcdf06-d7ed-11ea-9b23-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tibetan Terrier",
        "1ddc6981-d7ed-11ea-886e-302432eba3ec",
        "TIBETAN_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tibetan Terrier Mix",
        "1ddcdf07-d7ed-11ea-af00-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tornjak",
        "1ddc6982-d7ed-11ea-b369-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tornjak Mix",
        "1ddcdf08-d7ed-11ea-a4ed-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tosa",
        "1ddc6983-d7ed-11ea-aa80-302432eba3ec",
        "TOSA",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tosa Mix",
        "1ddcdf09-d7ed-11ea-bb5e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Toy Fox Terrier",
        "1ddc69bb-d7ed-11ea-af38-302432eba3ec",
        "FOX_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Toy Fox Terrier Mix",
        "1ddcdf42-d7ed-11ea-853b-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Toy Manchester Terrier",
        "1ddc69bc-d7ed-11ea-8f54-302432eba3ec",
        "MANCHESTER_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Toy Manchester Terrier Mix",
        "1ddcdf43-d7ed-11ea-846d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Transylvanian Hound",
        "1ddc6984-d7ed-11ea-a170-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Transylvanian Hound Mix",
        "1ddcdf0a-d7ed-11ea-b370-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Treeing Cur",
        "ca886f16-8dc9-11ed-b6c3-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Treeing Cur Mix",
        "ca89a798-8dc9-11ed-b458-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Treeing Feist",
        "746a8a62-edf2-11ed-a05b-0242ac120003",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Treeing Feist Mix",
        "746a8b8e-edf2-11ed-a05b-0242ac120003",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Treeing Tennessee Brindle",
        "ca910f2d-8dc9-11ed-b1cc-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Treeing Tennessee Brindle Mix",
        "ca93802b-8dc9-11ed-905b-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Treeing Walker Coonhound",
        "ca652df1-8dc9-11ed-a041-302432eba3ec",
        "TREEING_WALKER_COONHOUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Treeing Walker Coonhound Mix",
        "ca666671-8dc9-11ed-a275-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tyrolean Hound",
        "1ddc6985-d7ed-11ea-af0b-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Tyrolean Hound Mix",
        "1ddcdf0b-d7ed-11ea-b65a-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Uruguayan Cimarron",
        "1ddc6986-d7ed-11ea-a3c9-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Uruguayan Cimarron Mix",
        "1ddcdf0c-d7ed-11ea-8bba-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Valencian rat hunting dog",
        "c497fcd7-9648-11ec-ba9c-7085c2a1b8e0",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Valencian rat hunting dog Mix",
        "38a5b9cc-4d26-11ee-96f0-106fd9dd20e8",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Volpino Italiano",
        "1ddc6987-d7ed-11ea-872b-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Volpino Italiano Mix",
        "1ddcdf0d-d7ed-11ea-a338-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Corgi",
        "1ddc69d4-d7ed-11ea-9f47-302432eba3ec",
        "WELSH_CORGI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Corgi Cardigan",
        "1ddc698a-d7ed-11ea-907b-302432eba3ec",
        "CARDIGAN_WELSH_CORGI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Corgi Mix",
        "1ddd05c7-d7ed-11ea-8482-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Corgi Pembroke",
        "1ddc698b-d7ed-11ea-9282-302432eba3ec",
        "PEMBROKE_WELSH_CORGI",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Sheepdog",
        "1ddc69c9-d7ed-11ea-9c4e-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Sheepdog Mix",
        "1ddcdf50-d7ed-11ea-8546-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Springer Spaniel",
        "1ddc698c-d7ed-11ea-9cc0-302432eba3ec",
        "WELSH_SPRINGER_SPANIEL",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Springer Spaniel Mix",
        "1ddcdf12-d7ed-11ea-a9e6-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Terrier",
        "1ddc698d-d7ed-11ea-bd8b-302432eba3ec",
        "WELSH_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Welsh Terrier Mix",
        "1ddcdf13-d7ed-11ea-bf29-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "West Highland White Terrier",
        "1ddc698e-d7ed-11ea-abb6-302432eba3ec",
        "WEST_HIGHLAND_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "West Highland White Terrier Mix",
        "1ddcdf14-d7ed-11ea-b02d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "West Siberian LaÃ¯ka",
        "1ddc698f-d7ed-11ea-971b-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "West Siberian LaÃ¯ka Mix",
        "1ddcdf15-d7ed-11ea-a7a5-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Westphalian Dachsbracke",
        "1ddc6990-d7ed-11ea-b0b3-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Westphalian Dachsbracke Mix",
        "1ddcdf16-d7ed-11ea-a585-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Wetterhoun",
        "1ddc6991-d7ed-11ea-a92d-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Wetterhoun Mix",
        "1ddcdf17-d7ed-11ea-868d-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Whippet",
        "1ddc6992-d7ed-11ea-ae01-302432eba3ec",
        "WHIPPET",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Whippet Mix",
        "1ddcdf18-d7ed-11ea-b66e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "White Shepherd",
        "1ddc69a9-d7ed-11ea-a296-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "White Shepherd Mix",
        "1ddcdf30-d7ed-11ea-8842-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "White Swiss Shepherd Dog",
        "1ddc6999-d7ed-11ea-9fd8-302432eba3ec",
        "BERGER_BLANC_SUISSE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "White Swiss Shepherd Dog Mix",
        "1ddcdf20-d7ed-11ea-81ac-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fox Terrier wire",
        "1ddc6995-d7ed-11ea-9edb-302432eba3ec",
        "FOX_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Fox Terrier Mix wire",
        "1ddcdf1c-d7ed-11ea-88e7-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hungarian Vizsla Wire-haired",
        "1ddc1bbc-d7ed-11ea-b799-302432eba3ec",
        "VIZSLA",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Hungarian Vizsla Mix Wire-haired",
        "1ddcb7b7-d7ed-11ea-956c-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Wire-Haired Large",
        "1ddc42a0-d7ed-11ea-90bc-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Mix Wire-Haired Large",
        "1ddcb820-d7ed-11ea-9ef2-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Wire-Haired Medium-Sized",
        "1ddc42a1-d7ed-11ea-bafc-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Mix Wire-Haired Medium-Sized",
        "1ddcb821-d7ed-11ea-bd5c-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Wire-Haired Miniature",
        "1ddc1b5f-d7ed-11ea-b5d7-302432eba3ec",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Wire-Haired Miniature",
        "1ddc90db-d7ed-11ea-bcab-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Wire-Haired Miniature",
        "1ddc42a2-d7ed-11ea-93cf-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Portuguese Podengo Mix Wire-Haired Miniature",
        "1ddcb822-d7ed-11ea-b244-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Wire-haired Rabbit Hunting",
        "1ddc1b5b-d7ed-11ea-abd5-302432eba3ec",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Wire-haired Rabbit Hunting",
        "1ddc90d7-d7ed-11ea-a8ff-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Wire-Haired Standard",
        "1ddc1b62-d7ed-11ea-8bc2-302432eba3ec",
        "DACHSHUND",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Dachshund Mix Wire-Haired Standard",
        "1ddc90de-d7ed-11ea-94c1-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Wolf Mix",
        "1ddcdf1a-d7ed-11ea-ab2d-302432eba3ec",
        "WOLF_HYBRID",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Yakutian Laika",
        "1ddc6994-d7ed-11ea-be75-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Yakutian Laika Mix",
        "1ddcdf1b-d7ed-11ea-b94e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Yorkipoo",
        "1ddc69d5-d7ed-11ea-8f35-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Yorkipoo Mix",
        "1ddd05c8-d7ed-11ea-b97e-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Yorkshire Terrier",
        "1ddc69aa-d7ed-11ea-bb69-302432eba3ec",
        "YORKSHIRE_TERRIER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Yorkshire Terrier Mix",
        "1ddcdf31-d7ed-11ea-b667-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Yugoslavian Shepherd Dog-Sharplanina",
        "1ddc699a-d7ed-11ea-85bd-302432eba3ec",
        "CANINE_OTHER",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Yugoslavian Shepherd Dog-Sharplanina Mix",
        "1ddcdf21-d7ed-11ea-89ff-302432eba3ec",
        "MIXED_BREED_CANINE",
        "CANINE",
        "breed",
        "idexx"
    ],
    [
        "Abyssinian Cat",
        "1ddd05d2-d7ed-11ea-b586-302432eba3ec",
        "ABYSSINIAN_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Abyssinian Cat Mix",
        "1ddd2cdc-d7ed-11ea-a16a-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Aegean Cat",
        "1ddd05d3-d7ed-11ea-b566-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Aegean Cat Mix",
        "1ddd2cdd-d7ed-11ea-82d5-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Bobtail",
        "1ddd05d4-d7ed-11ea-b144-302432eba3ec",
        "BOBTAIL_AMERICAN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Bobtail Longhair",
        "1ddd05d5-d7ed-11ea-8e87-302432eba3ec",
        "BOBTAIL_AMERICAN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Bobtail Longhair Mix",
        "1ddd2cdf-d7ed-11ea-8fde-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Bobtail Mix",
        "1ddd2cde-d7ed-11ea-b856-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Bobtail Shorthair",
        "1ddd05d6-d7ed-11ea-b8df-302432eba3ec",
        "BOBTAIL_AMERICAN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Bobtail Shorthair Mix",
        "1ddd2ce0-d7ed-11ea-8c3d-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Curl",
        "1ddd05d7-d7ed-11ea-a2e4-302432eba3ec",
        "AMERICAN_CURL",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Curl Mix",
        "1ddd2ce1-d7ed-11ea-b493-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Curl Longhair",
        "1ddd05d8-d7ed-11ea-9de2-302432eba3ec",
        "AMERICAN_CURL",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Curl Longhair Mix",
        "1ddd2ce2-d7ed-11ea-9053-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Curl Shorthair",
        "1ddd05d9-d7ed-11ea-ab8c-302432eba3ec",
        "AMERICAN_CURL",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Curl Shorthair Mix",
        "1ddd2ce3-d7ed-11ea-8bd1-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Domestic Long-haired cat",
        "9a0a77e7-8de7-11ed-af65-302432eba3ec",
        "DOMESTIC_LONGHAIR",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Domestic Medium-haired cat",
        "87a38adf-8de7-11ed-bd5c-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Domestic Short-haired cat",
        "d51f6cb0-8de6-11ed-bfb8-302432eba3ec",
        "DOMESTIC_SHORTHAIR",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Long-haired Purebred cat",
        "1ddd05da-d7ed-11ea-b4a4-302432eba3ec",
        "AMERICAN_LONGHAIR",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Medium-haired Purebred cat",
        "862eab3c-8dd1-11ed-b123-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Short-haired Purebred cat",
        "1ddd05db-d7ed-11ea-84f4-302432eba3ec",
        "AMERICAN_SHORTHAIR",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Wire-haired",
        "1ddd05dc-d7ed-11ea-9e1e-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "American Wire-haired Mix",
        "1ddd2ce4-d7ed-11ea-a874-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Aphrodite Giant",
        "1ddd05dd-d7ed-11ea-b116-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Aphrodite Giant Mix",
        "1ddd2ce5-d7ed-11ea-9c32-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Arabian Mau",
        "1ddd05de-d7ed-11ea-9ff1-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Arabian Mau Mix",
        "1ddd2ce6-d7ed-11ea-a4f6-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Asian Cat",
        "1ddd05df-d7ed-11ea-9363-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Asian Cat Mix",
        "1ddd2ce7-d7ed-11ea-9189-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Asian Cat Long-haired",
        "1ddd05e0-d7ed-11ea-a96b-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Asian Cat Long-haired Mix",
        "1ddd2ce8-d7ed-11ea-8e1b-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Asian Cat Semi-Long-hair",
        "1ddd05e1-d7ed-11ea-b83f-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Asian Cat Semi-Long-hair Mix",
        "1ddd2ce9-d7ed-11ea-a80b-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Asian Cat Shorthair",
        "1ddd05e2-d7ed-11ea-b49b-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Asian Cat Shorthair Mix",
        "1ddd2cea-d7ed-11ea-8589-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Mist",
        "1ddd05e3-d7ed-11ea-ae8b-302432eba3ec",
        "AUSTRALIAN_MIST",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Australian Mist Mix",
        "1ddd2ceb-d7ed-11ea-845b-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Balinese Cat",
        "1ddd05e4-d7ed-11ea-b040-302432eba3ec",
        "BALINESE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Balinese Cat Mix",
        "1ddd2cec-d7ed-11ea-8b56-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Bambino Cat",
        "1ddd05e5-d7ed-11ea-8de0-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Bambino Cat Mix",
        "1ddd2ced-d7ed-11ea-8aa0-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Bengal Cat",
        "1ddd05e6-d7ed-11ea-bee1-302432eba3ec",
        "BENGAL",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Bengal Cat Mix",
        "1ddd2cee-d7ed-11ea-9bc1-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Birman Cat",
        "1ddd05e7-d7ed-11ea-82c5-302432eba3ec",
        "BIRMAN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Birman Cat Mix",
        "1ddd2cef-d7ed-11ea-9d22-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Bohemian Rex",
        "1ddd05e8-d7ed-11ea-a2d6-302432eba3ec",
        "REX_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Bohemian Rex Mix",
        "1ddd2cf0-d7ed-11ea-b0b9-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Bombay Cat",
        "1ddd05e9-d7ed-11ea-8f23-302432eba3ec",
        "BOMBAY",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Bombay Cat Mix",
        "1ddd2cf1-d7ed-11ea-a4e7-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Brazilian Shorthair",
        "1ddd05ea-d7ed-11ea-a5a9-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "British Blue Cat",
        "1ddd05eb-d7ed-11ea-913a-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "British Blue Cat Mix",
        "1ddd2cf2-d7ed-11ea-a1a5-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "British Cat",
        "1ddd05ec-d7ed-11ea-986d-302432eba3ec",
        "BRITISH_SHORTHAIR",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "British Cat Mix",
        "1ddd2cf3-d7ed-11ea-930a-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "British Longhair",
        "1ddd05ed-d7ed-11ea-92ef-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "British Shorthair",
        "1ddd05ee-d7ed-11ea-98ef-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Burmese Cat",
        "1ddd05ef-d7ed-11ea-93f9-302432eba3ec",
        "BURMESE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Burmese Cat Mix",
        "1ddd2cf4-d7ed-11ea-b239-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Burmilla Cat",
        "1ddd05f0-d7ed-11ea-998b-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Burmilla Cat Mix",
        "1ddd2cf5-d7ed-11ea-be59-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "California Spangled",
        "1ddd05f1-d7ed-11ea-bc41-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "California Spangled Mix",
        "1ddd2cf6-d7ed-11ea-ba6e-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Chantilly-Tiffany Cat",
        "1ddd05f2-d7ed-11ea-aabf-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Chantilly-Tiffany Cat Mix",
        "1ddd2cf7-d7ed-11ea-96ec-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Chartreuse Cat",
        "1ddd05f3-d7ed-11ea-b4d2-302432eba3ec",
        "CHARTREUX",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Chartreuse Cat Mix",
        "1ddd2cf8-d7ed-11ea-ae0d-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Chausie Cat",
        "1ddd05f4-d7ed-11ea-92d8-302432eba3ec",
        "CHAUSIE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Chausie Cat Mix",
        "1ddd2cf9-d7ed-11ea-a9c2-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Colourpoint Shorthair",
        "1ddd05f5-d7ed-11ea-acee-302432eba3ec",
        "COLORPOINT_SHORTHAIR",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Colourpoint Shorthair Mix",
        "1ddd2cfa-d7ed-11ea-887e-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Cornish Rex",
        "1ddd05f6-d7ed-11ea-b309-302432eba3ec",
        "REX_CORNISH",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Cornish Rex Mix",
        "1ddd2cfb-d7ed-11ea-a402-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Crossbred",
        "1ddd05f7-d7ed-11ea-81b2-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Crossbred Mix",
        "1ddd2cfc-d7ed-11ea-86db-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Cymric",
        "1ddd05f8-d7ed-11ea-82bd-302432eba3ec",
        "CYMRIC",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Cymric Long-haired",
        "1ddd05f9-d7ed-11ea-89d9-302432eba3ec",
        "CYMRIC",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Cymric Long-haired Mix",
        "1ddd2cfe-d7ed-11ea-bf3b-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Cymric Mix",
        "1ddd2cfd-d7ed-11ea-be92-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Cyprus Cat",
        "1ddd05fa-d7ed-11ea-b440-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Cyprus Cat Mix",
        "1ddd2cff-d7ed-11ea-9dce-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Devon Rex",
        "1ddd05fb-d7ed-11ea-808d-302432eba3ec",
        "REX_DEVON",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Devon Rex Mix",
        "1ddd2d00-d7ed-11ea-82cf-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Donskoy Cat",
        "1ddd05fc-d7ed-11ea-a61c-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Donskoy Cat Mix",
        "1ddd2d01-d7ed-11ea-9b3e-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Dragon Li",
        "1ddd05fd-d7ed-11ea-bb88-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Dragon Li Mix",
        "1ddd2d02-d7ed-11ea-837a-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Dwelf Cat",
        "1ddd05fe-d7ed-11ea-bfaa-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Dwelf Cat Mix",
        "1ddd2d03-d7ed-11ea-94f4-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Egyptian Mau",
        "1ddd05ff-d7ed-11ea-a69f-302432eba3ec",
        "EGYPTIAN_MAU",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Egyptian Mau Mix",
        "1ddd2d04-d7ed-11ea-bd26-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "European Burmese Cat",
        "8e4caf5c-e54e-11ed-b5ea-0242ac120002",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "European Burmese Cat Mix",
        "8e4cb0b0-e54e-11ed-b5ea-0242ac120002",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "European Cat",
        "1ddd0600-d7ed-11ea-b17c-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "European Cat Mix",
        "1ddd2d05-d7ed-11ea-bd40-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "European Shorthair",
        "1ddd0601-d7ed-11ea-8983-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "European Shorthair Mix",
        "1ddd2d06-d7ed-11ea-ae29-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Exotic Cat",
        "8e4cab1a-e54e-11ed-b5ea-0242ac120002",
        "EXOTIC",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Exotic Cat Mix",
        "8e4cac82-e54e-11ed-b5ea-0242ac120002",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Felis catus",
        "e7e6443a-59a3-11eb-ae9d-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Foldex Cat",
        "1ddd0602-d7ed-11ea-8492-302432eba3ec",
        "SCOTTISH_FOLD",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Foldex Cat Mix",
        "1ddd2d07-d7ed-11ea-8a58-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "German Rex",
        "1ddd0603-d7ed-11ea-8a0d-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "German Rex Mix",
        "1ddd2d08-d7ed-11ea-a5d5-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Havana Brown",
        "1ddd0604-d7ed-11ea-8096-302432eba3ec",
        "HAVANA_BROWN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Havana Brown Mix",
        "1ddd2d09-d7ed-11ea-a826-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Highlander Cat",
        "1ddd0605-d7ed-11ea-b271-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Highlander Cat Mix",
        "1ddd2d0a-d7ed-11ea-b415-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Himalayan Cat",
        "1ddd0606-d7ed-11ea-8b63-302432eba3ec",
        "HIMALAYAN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Himalayan Cat Mix",
        "1ddd2d0b-d7ed-11ea-b5f9-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Japanese Bobtail",
        "1ddd0607-d7ed-11ea-a085-302432eba3ec",
        "JAPANESE_BOBTAIL",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Japanese Bobtail Mix",
        "1ddd2d0c-d7ed-11ea-b12d-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Javanese Cat",
        "1ddd0608-d7ed-11ea-9e87-302432eba3ec",
        "JAVANESE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Javanese Cat Mix",
        "1ddd2d0d-d7ed-11ea-8715-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Jungle Curl",
        "1ddd0609-d7ed-11ea-a1de-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Jungle Curl Mix",
        "1ddd2d0e-d7ed-11ea-8c03-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Khao Manee",
        "1ddd060a-d7ed-11ea-8d43-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Khao Manee Mix",
        "1ddd2d0f-d7ed-11ea-a842-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Korat Cat",
        "1ddd060b-d7ed-11ea-8925-302432eba3ec",
        "KORAT",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Korat Cat Mix",
        "1ddd2d10-d7ed-11ea-98d6-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Korean Bobtail",
        "1ddd060c-d7ed-11ea-9b97-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Korean Bobtail Mix",
        "1ddd2d11-d7ed-11ea-9951-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Korn Ja",
        "1ddd060d-d7ed-11ea-ab9c-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Korn Ja Mix",
        "1ddd2d12-d7ed-11ea-886b-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Kurilean Bobtail Long-haired",
        "1ddd060e-d7ed-11ea-b946-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Kurilean Bobtail Long-haired Mix",
        "1ddd2d13-d7ed-11ea-98ec-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Kurilean Bobtail Short-haired",
        "1ddd060f-d7ed-11ea-bcfc-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Kurilean Bobtail Short-haired Mix",
        "1ddd2d14-d7ed-11ea-a5a5-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Kurilian Bobtail",
        "1ddd0610-d7ed-11ea-a624-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Kurilian Bobtail Mix",
        "1ddd2d15-d7ed-11ea-8507-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "LaPerm Cat",
        "1ddd0611-d7ed-11ea-803e-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "LaPerm Cat Mix",
        "1ddd2d16-d7ed-11ea-8aba-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "LaPerm Longhair",
        "1ddd0612-d7ed-11ea-9789-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "LaPerm Longhair Mix",
        "1ddd2d17-d7ed-11ea-8577-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "LaPerm Shorthair",
        "1ddd0613-d7ed-11ea-8a33-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "LaPerm Shorthair Mix",
        "1ddd2d18-d7ed-11ea-90fe-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Lykoi Cat",
        "1ddd0614-d7ed-11ea-a797-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Lykoi Cat Mix",
        "1ddd2d19-d7ed-11ea-a769-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Lynx Point Siamese",
        "1ddd0615-d7ed-11ea-b2dc-302432eba3ec",
        "SIAMESE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Lynx Point Siamese Mix",
        "1ddd2d1a-d7ed-11ea-87f6-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Maine Coon",
        "1ddd0616-d7ed-11ea-b92a-302432eba3ec",
        "MAINE_COON_CAT",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Maine Coon Mix",
        "1ddd2d1b-d7ed-11ea-8a62-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Manx Cat",
        "1ddd0617-d7ed-11ea-9358-302432eba3ec",
        "MANX",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Manx Cat Mix",
        "1ddd2d1c-d7ed-11ea-a28d-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Mekong Bobtail",
        "1ddd0618-d7ed-11ea-9d7b-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Mekong Bobtail Mix",
        "1ddd2d1d-d7ed-11ea-b6d1-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Minskin Cat",
        "1ddd0619-d7ed-11ea-98b6-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Minskin Cat Mix",
        "1ddd2d1e-d7ed-11ea-82aa-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Modern Persian",
        "1ddd061a-d7ed-11ea-8dd4-302432eba3ec",
        "PERSIAN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Modern Persian Mix",
        "1ddd2d1f-d7ed-11ea-bc51-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Modern Siamese Cat",
        "1ddd061b-d7ed-11ea-8580-302432eba3ec",
        "SIAMESE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Modern Siamese Cat Mix",
        "1ddd2d20-d7ed-11ea-a835-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Munchkin Cat",
        "1ddd061c-d7ed-11ea-ab32-302432eba3ec",
        "MUNCHKIN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Munchkin Cat Mix",
        "1ddd2d21-d7ed-11ea-8979-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Napoleon Cat",
        "1ddd061d-d7ed-11ea-82a3-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Napoleon Cat Mix",
        "1ddd2d22-d7ed-11ea-bc68-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Nebelung Cat",
        "1ddd061f-d7ed-11ea-9bfd-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Nebelung Cat Mix",
        "1ddd2d24-d7ed-11ea-b293-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Neva Masquerade",
        "1ddd0620-d7ed-11ea-b026-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Neva Masquerade Mix",
        "1ddd2d25-d7ed-11ea-a91c-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Forest Cat",
        "1ddd0621-d7ed-11ea-b2bb-302432eba3ec",
        "NORWEGIAN_FOREST_CAT",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Norwegian Forest Cat Mix",
        "1ddd2d26-d7ed-11ea-9ce1-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Ocicat Cat",
        "1ddd0622-d7ed-11ea-a09e-302432eba3ec",
        "OCICAT",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Ocicat Cat Mix",
        "1ddd2d27-d7ed-11ea-8dc4-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Ojos Azules",
        "1ddd0623-d7ed-11ea-895d-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Ojos Azules Mix",
        "1ddd2d28-d7ed-11ea-b923-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Oregon Rex",
        "1ddd0624-d7ed-11ea-b975-302432eba3ec",
        "REX_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Oregon Rex Mix",
        "1ddd2d29-d7ed-11ea-b0e4-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Oriental Bicolor",
        "1ddd0625-d7ed-11ea-bcb2-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Oriental Bicolor Mix",
        "1ddd2d2a-d7ed-11ea-b2f7-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Oriental Cat",
        "1ddd0626-d7ed-11ea-ba51-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Oriental Cat Mix",
        "1ddd2d2b-d7ed-11ea-9579-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Oriental Long-haired",
        "1ddd0627-d7ed-11ea-860c-302432eba3ec",
        "ORIENTAL_LONGHAIR",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Oriental Long-haired Mix",
        "1ddd2d2c-d7ed-11ea-9b3a-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Oriental Short-haired",
        "1ddd0628-d7ed-11ea-a861-302432eba3ec",
        "ORIENTAL_SHORTHAIR",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Oriental Short-haired Mix",
        "1ddd2d2d-d7ed-11ea-8947-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Persian Cat",
        "1ddd0629-d7ed-11ea-bbc7-302432eba3ec",
        "PERSIAN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Persian Cat Mix",
        "1ddd2d2e-d7ed-11ea-ae61-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Peterbald Cat",
        "1ddd062a-d7ed-11ea-8941-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Peterbald Cat Mix",
        "1ddd2d2f-d7ed-11ea-a161-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Pixie-bob Cat",
        "1ddd062b-d7ed-11ea-9dbe-302432eba3ec",
        "PIXIE_BOB",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Pixie-bob Cat Mix",
        "1ddd2d30-d7ed-11ea-a1da-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Raas Cat",
        "1ddd062c-d7ed-11ea-99a9-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Raas Cat Mix",
        "1ddd2d31-d7ed-11ea-8b8c-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Ragamuffin Cat",
        "1ddd062d-d7ed-11ea-a4dd-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Ragamuffin Cat Mix",
        "1ddd2d32-d7ed-11ea-921d-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Ragdoll Cat",
        "1ddd062e-d7ed-11ea-adbd-302432eba3ec",
        "RAG_DOLL",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Ragdoll Cat Mix",
        "1ddd2d33-d7ed-11ea-ae73-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Black",
        "1ddd0630-d7ed-11ea-a733-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Black Mix",
        "1ddd2d35-d7ed-11ea-98cb-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Blue",
        "1ddd0631-d7ed-11ea-8799-302432eba3ec",
        "RUSSIAN_BLUE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Blue Mix",
        "1ddd2d36-d7ed-11ea-aad8-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Cat",
        "1ddd062f-d7ed-11ea-9a82-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Cat Mix",
        "1ddd2d34-d7ed-11ea-8130-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Tabby",
        "1ddd0632-d7ed-11ea-bcf7-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Russian Tabby Mix",
        "1ddd2d37-d7ed-11ea-9528-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Russian White",
        "1ddd0633-d7ed-11ea-ac8e-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Russian White Mix",
        "1ddd2d38-d7ed-11ea-9cfa-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Sam sawet",
        "1ddd0634-d7ed-11ea-a6ec-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Sam sawet Mix",
        "1ddd2d39-d7ed-11ea-921e-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Savannah Cat",
        "1ddd0635-d7ed-11ea-ac42-302432eba3ec",
        "SAVANNAH",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Savannah Cat Mix",
        "1ddd2d3a-d7ed-11ea-9986-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Scottish Fold",
        "1ddd0636-d7ed-11ea-8865-302432eba3ec",
        "SCOTTISH_FOLD",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Scottish Fold Longhair",
        "1ddd0637-d7ed-11ea-a10f-302432eba3ec",
        "SCOTTISH_FOLD",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Scottish Fold Longhair Mix",
        "1ddd2d3c-d7ed-11ea-8999-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Scottish Fold Mix",
        "1ddd2d3b-d7ed-11ea-a7fe-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Scottish Fold Shorthair",
        "1ddd0638-d7ed-11ea-bea2-302432eba3ec",
        "SCOTTISH_FOLD",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Scottish Fold Shorthair Mix",
        "1ddd2d3d-d7ed-11ea-9954-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Selkirk Rex",
        "1ddd0639-d7ed-11ea-bd34-302432eba3ec",
        "REX_SELKIRK",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Selkirk Rex Mix",
        "1ddd2d3e-d7ed-11ea-af51-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Serengeti Cat",
        "1ddd063a-d7ed-11ea-946e-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Serengeti Cat Mix",
        "1ddd2d3f-d7ed-11ea-914a-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Serrade Petit",
        "1ddd063b-d7ed-11ea-a2ea-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Serrade Petit Mix",
        "1ddd2d40-d7ed-11ea-9890-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Siamese",
        "1ddd063c-d7ed-11ea-a884-302432eba3ec",
        "SIAMESE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Siamese Mix",
        "1ddd2d41-d7ed-11ea-9289-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Siberian Cat",
        "1ddd063d-d7ed-11ea-974a-302432eba3ec",
        "SIBERIAN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Siberian Cat Mix",
        "1ddd2d42-d7ed-11ea-9a97-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Singapura Cat",
        "1ddd063e-d7ed-11ea-b280-302432eba3ec",
        "SINGAPURA",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Singapura Cat Mix",
        "1ddd2d43-d7ed-11ea-86d9-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Snowshoe Cat",
        "1ddd063f-d7ed-11ea-ba3f-302432eba3ec",
        "SNOWSHOE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Snowshoe Cat Mix",
        "1ddd2d44-d7ed-11ea-aeb3-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Sokoke Cat",
        "1ddd0640-d7ed-11ea-a020-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Sokoke Cat Mix",
        "1ddd2d45-d7ed-11ea-88e5-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Somali Cat",
        "1ddd0641-d7ed-11ea-96e6-302432eba3ec",
        "SOMALI",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Somali Cat Mix",
        "1ddd2d46-d7ed-11ea-8529-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "South African Blue Cat",
        "1ddd0642-d7ed-11ea-b06c-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "South African Blue Cat Mix",
        "1ddd2d47-d7ed-11ea-9766-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Sphynx Cat",
        "1ddd0643-d7ed-11ea-b71c-302432eba3ec",
        "SPHYNX",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Sphynx Cat Mix",
        "1ddd2d48-d7ed-11ea-b82b-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Standardized Siamese Cat",
        "1ddd0644-d7ed-11ea-a3a7-302432eba3ec",
        "SIAMESE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Standardized Siamese Cat Mix",
        "1ddd2d49-d7ed-11ea-ac5c-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Suphalak Cat",
        "1ddd0645-d7ed-11ea-bec8-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Suphalak Cat Mix",
        "1ddd2d4a-d7ed-11ea-863d-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Thai Cat",
        "1ddd0646-d7ed-11ea-80c5-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Thai Cat Mix",
        "1ddd2d4b-d7ed-11ea-bdcb-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Tonkinese Cat",
        "1ddd0647-d7ed-11ea-bdb0-302432eba3ec",
        "TONKINESE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Tonkinese Cat Mix",
        "1ddd2d4c-d7ed-11ea-8040-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Tortie Lynx Point Siamese Cat",
        "1ddd0648-d7ed-11ea-9b9c-302432eba3ec",
        "SIAMESE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Tortie Lynx Point Siamese Cat Mix",
        "1ddd2d4d-d7ed-11ea-9191-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Tortie Point Siamese",
        "1ddd0649-d7ed-11ea-b8e1-302432eba3ec",
        "SIAMESE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Tortie Point Siamese Mix",
        "1ddd2d4e-d7ed-11ea-8548-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Toyger Cat",
        "1ddd064a-d7ed-11ea-8ddd-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Toyger Cat Mix",
        "1ddd2d4f-d7ed-11ea-bfb9-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Traditional Persian",
        "1ddd064b-d7ed-11ea-a430-302432eba3ec",
        "PERSIAN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Traditional Persian Mix",
        "1ddd2d50-d7ed-11ea-a782-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Turkish Angora",
        "1ddd064c-d7ed-11ea-9418-302432eba3ec",
        "TURKISH_ANGORA",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Turkish Angora Mix",
        "1ddd2d51-d7ed-11ea-8bba-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Turkish Van",
        "1ddd064d-d7ed-11ea-8d05-302432eba3ec",
        "TURKISH_VAN",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Turkish Van Mix",
        "1ddd2d52-d7ed-11ea-b41d-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Ukrainian Levkoy",
        "1ddd2cd9-d7ed-11ea-8805-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Ukrainian Levkoy Mix",
        "1ddd2d53-d7ed-11ea-81f6-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Unknown Feline",
        "20e0d4fb-d80a-11ea-a1cd-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Wila Krungthep",
        "1ddd2cda-d7ed-11ea-ac89-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Wila Krungthep Mix",
        "1ddd2d54-d7ed-11ea-86c0-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "York Chocolate",
        "1ddd2cdb-d7ed-11ea-b8b9-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "York Chocolate Mix",
        "1ddd2d55-d7ed-11ea-9f4c-302432eba3ec",
        "MIXED_BREED_FELINE",
        "FELINE",
        "breed",
        "idexx"
    ],
    [
        "Feline",
        "29944158-bd6b-11eb-8276-302432eba3e9",
        "FELINE",
        null,
        "species",
        "heska"
    ],
    [
        "Canine",
        "36c3cde0-bd6b-11eb-9610-302432eba3e9",
        "CANINE",
        null,
        "species",
        "heska"
    ],
    [
        "Abyssinian Cat",
        "1ddd05d2-d7ed-11ea-b586-302432eba3ec",
        "ABYSS",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Abyssinian Cat Mix",
        "1ddd2cdc-d7ed-11ea-a16a-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Aegean Cat",
        "1ddd05d3-d7ed-11ea-b566-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Aegean Cat Mix",
        "1ddd2cdd-d7ed-11ea-82d5-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Bobtail",
        "1ddd05d4-d7ed-11ea-b144-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Bobtail Longhair",
        "1ddd05d5-d7ed-11ea-8e87-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Bobtail Longhair Mix",
        "1ddd2cdf-d7ed-11ea-8fde-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Bobtail Mix",
        "1ddd2cde-d7ed-11ea-b856-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Bobtail Shorthair",
        "1ddd05d6-d7ed-11ea-b8df-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Bobtail Shorthair Mix",
        "1ddd2ce0-d7ed-11ea-8c3d-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Curl",
        "1ddd05d7-d7ed-11ea-a2e4-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Curl Mix",
        "1ddd2ce1-d7ed-11ea-b493-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Curl Longhair",
        "1ddd05d8-d7ed-11ea-9de2-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Curl Longhair Mix",
        "1ddd2ce2-d7ed-11ea-9053-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Curl Shorthair",
        "1ddd05d9-d7ed-11ea-ab8c-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Curl Shorthair Mix",
        "1ddd2ce3-d7ed-11ea-8bd1-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Domestic Long-haired cat",
        "9a0a77e7-8de7-11ed-af65-302432eba3ec",
        "DLH",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Domestic Medium-haired cat",
        "87a38adf-8de7-11ed-bd5c-302432eba3ec",
        "DMH",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Domestic Short-haired cat",
        "d51f6cb0-8de6-11ed-bfb8-302432eba3ec",
        "DSH",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Long-haired Purebred",
        "1ddd05da-d7ed-11ea-b4a4-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Medium-haired Purebred",
        "862eab3c-8dd1-11ed-b123-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Short-haired Purebred",
        "1ddd05db-d7ed-11ea-84f4-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Wire-haired",
        "1ddd05dc-d7ed-11ea-9e1e-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "American Wire-haired Mix",
        "1ddd2ce4-d7ed-11ea-a874-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Aphrodite Giant",
        "1ddd05dd-d7ed-11ea-b116-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Aphrodite Giant Mix",
        "1ddd2ce5-d7ed-11ea-9c32-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Arabian Mau",
        "1ddd05de-d7ed-11ea-9ff1-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Arabian Mau Mix",
        "1ddd2ce6-d7ed-11ea-a4f6-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Asian Cat",
        "1ddd05df-d7ed-11ea-9363-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Asian Cat Mix",
        "1ddd2ce7-d7ed-11ea-9189-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Asian Cat Long-haired",
        "1ddd05e0-d7ed-11ea-a96b-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Asian Cat Long-haired Mix",
        "1ddd2ce8-d7ed-11ea-8e1b-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Asian Cat Semi-Long-hair",
        "1ddd05e1-d7ed-11ea-b83f-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Asian Cat Semi-Long-hair Mix",
        "1ddd2ce9-d7ed-11ea-a80b-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Asian Cat Shorthair",
        "1ddd05e2-d7ed-11ea-b49b-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Asian Cat Shorthair Mix",
        "1ddd2cea-d7ed-11ea-8589-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Australian Mist",
        "1ddd05e3-d7ed-11ea-ae8b-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Australian Mist Mix",
        "1ddd2ceb-d7ed-11ea-845b-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Balinese Cat",
        "1ddd05e4-d7ed-11ea-b040-302432eba3ec",
        "BALIN",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Balinese Cat Mix",
        "1ddd2cec-d7ed-11ea-8b56-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Bambino Cat",
        "1ddd05e5-d7ed-11ea-8de0-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Bambino Cat Mix",
        "1ddd2ced-d7ed-11ea-8aa0-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Bengal Cat",
        "1ddd05e6-d7ed-11ea-bee1-302432eba3ec",
        "BENGA",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Bengal Cat Mix",
        "1ddd2cee-d7ed-11ea-9bc1-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Birman Cat",
        "1ddd05e7-d7ed-11ea-82c5-302432eba3ec",
        "BIRMA",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Birman Cat Mix",
        "1ddd2cef-d7ed-11ea-9d22-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Bohemian Rex",
        "1ddd05e8-d7ed-11ea-a2d6-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Bohemian Rex Mix",
        "1ddd2cf0-d7ed-11ea-b0b9-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Bombay Cat",
        "1ddd05e9-d7ed-11ea-8f23-302432eba3ec",
        "BOMBA",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Bombay Cat Mix",
        "1ddd2cf1-d7ed-11ea-a4e7-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Brazilian Shorthair",
        "1ddd05ea-d7ed-11ea-a5a9-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "British Blue Cat",
        "1ddd05eb-d7ed-11ea-913a-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "British Blue Cat Mix",
        "1ddd2cf2-d7ed-11ea-a1a5-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "British Cat",
        "1ddd05ec-d7ed-11ea-986d-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "British Cat Mix",
        "1ddd2cf3-d7ed-11ea-930a-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "British Longhair",
        "1ddd05ed-d7ed-11ea-92ef-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "British Shorthair",
        "1ddd05ee-d7ed-11ea-98ef-302432eba3ec",
        "BRISH",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Burmese Cat",
        "1ddd05ef-d7ed-11ea-93f9-302432eba3ec",
        "BURME",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Burmese Cat Mix",
        "1ddd2cf4-d7ed-11ea-b239-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Burmilla Cat",
        "1ddd05f0-d7ed-11ea-998b-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Burmilla Cat Mix",
        "1ddd2cf5-d7ed-11ea-be59-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "California Spangled",
        "1ddd05f1-d7ed-11ea-bc41-302432eba3ec",
        "CALSP",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "California Spangled Mix",
        "1ddd2cf6-d7ed-11ea-ba6e-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Chantilly-Tiffany Cat",
        "1ddd05f2-d7ed-11ea-aabf-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Chantilly-Tiffany Cat Mix",
        "1ddd2cf7-d7ed-11ea-96ec-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Chartreuse Cat",
        "1ddd05f3-d7ed-11ea-b4d2-302432eba3ec",
        "CHART",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Chartreuse Cat Mix",
        "1ddd2cf8-d7ed-11ea-ae0d-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Chausie Cat",
        "1ddd05f4-d7ed-11ea-92d8-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Chausie Cat Mix",
        "1ddd2cf9-d7ed-11ea-a9c2-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Colourpoint Shorthair",
        "1ddd05f5-d7ed-11ea-acee-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Colourpoint Shorthair Mix",
        "1ddd2cfa-d7ed-11ea-887e-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Cornish Rex",
        "1ddd05f6-d7ed-11ea-b309-302432eba3ec",
        "REXCO",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Cornish Rex Mix",
        "1ddd2cfb-d7ed-11ea-a402-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Crossbred",
        "1ddd05f7-d7ed-11ea-81b2-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Crossbred Mix",
        "1ddd2cfc-d7ed-11ea-86db-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Cymric",
        "1ddd05f8-d7ed-11ea-82bd-302432eba3ec",
        "CYMRI",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Cymric Long-haired",
        "1ddd05f9-d7ed-11ea-89d9-302432eba3ec",
        "CYMRI",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Cymric Long-haired Mix",
        "1ddd2cfe-d7ed-11ea-bf3b-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Cymric Mix",
        "1ddd2cfd-d7ed-11ea-be92-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Cyprus Cat",
        "1ddd05fa-d7ed-11ea-b440-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Cyprus Cat Mix",
        "1ddd2cff-d7ed-11ea-9dce-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Devon Rex",
        "1ddd05fb-d7ed-11ea-808d-302432eba3ec",
        "REXDE",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Devon Rex Mix",
        "1ddd2d00-d7ed-11ea-82cf-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Donskoy Cat",
        "1ddd05fc-d7ed-11ea-a61c-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Donskoy Cat Mix",
        "1ddd2d01-d7ed-11ea-9b3e-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Dragon Li",
        "1ddd05fd-d7ed-11ea-bb88-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Dragon Li Mix",
        "1ddd2d02-d7ed-11ea-837a-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Dwelf Cat",
        "1ddd05fe-d7ed-11ea-bfaa-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Dwelf Cat Mix",
        "1ddd2d03-d7ed-11ea-94f4-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Egyptian Mau",
        "1ddd05ff-d7ed-11ea-a69f-302432eba3ec",
        "EGYMA",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Egyptian Mau Mix",
        "1ddd2d04-d7ed-11ea-bd26-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "European Burmese Cat",
        "8e4caf5c-e54e-11ed-b5ea-0242ac120002",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "European Burmese Cat Mix",
        "8e4cb0b0-e54e-11ed-b5ea-0242ac120002",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "European Cat",
        "1ddd0600-d7ed-11ea-b17c-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "European Cat Mix",
        "1ddd2d05-d7ed-11ea-bd40-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "European Shorthair",
        "1ddd0601-d7ed-11ea-8983-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "European Shorthair Mix",
        "1ddd2d06-d7ed-11ea-ae29-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Exotic Cat",
        "8e4cab1a-e54e-11ed-b5ea-0242ac120002",
        "EXOSH",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Exotic Cat Mix",
        "8e4cac82-e54e-11ed-b5ea-0242ac120002",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Felis catus",
        "e7e6443a-59a3-11eb-ae9d-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Foldex Cat",
        "1ddd0602-d7ed-11ea-8492-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Foldex Cat Mix",
        "1ddd2d07-d7ed-11ea-8a58-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "German Rex",
        "1ddd0603-d7ed-11ea-8a0d-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "German Rex Mix",
        "1ddd2d08-d7ed-11ea-a5d5-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Havana Brown",
        "1ddd0604-d7ed-11ea-8096-302432eba3ec",
        "HAVAN",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Havana Brown Mix",
        "1ddd2d09-d7ed-11ea-a826-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Highlander Cat",
        "1ddd0605-d7ed-11ea-b271-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Highlander Cat Mix",
        "1ddd2d0a-d7ed-11ea-b415-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Himalayan Cat",
        "1ddd0606-d7ed-11ea-8b63-302432eba3ec",
        "HIMAL",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Himalayan Cat Mix",
        "1ddd2d0b-d7ed-11ea-b5f9-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Japanese Bobtail",
        "1ddd0607-d7ed-11ea-a085-302432eba3ec",
        "JAPBO",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Japanese Bobtail Mix",
        "1ddd2d0c-d7ed-11ea-b12d-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Javanese Cat",
        "1ddd0608-d7ed-11ea-9e87-302432eba3ec",
        "JAVAN",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Javanese Cat Mix",
        "1ddd2d0d-d7ed-11ea-8715-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Jungle Curl",
        "1ddd0609-d7ed-11ea-a1de-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Jungle Curl Mix",
        "1ddd2d0e-d7ed-11ea-8c03-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Khao Manee",
        "1ddd060a-d7ed-11ea-8d43-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Khao Manee Mix",
        "1ddd2d0f-d7ed-11ea-a842-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Korat Cat",
        "1ddd060b-d7ed-11ea-8925-302432eba3ec",
        "KORET",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Korat Cat Mix",
        "1ddd2d10-d7ed-11ea-98d6-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Korean Bobtail",
        "1ddd060c-d7ed-11ea-9b97-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Korean Bobtail Mix",
        "1ddd2d11-d7ed-11ea-9951-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Korn Ja",
        "1ddd060d-d7ed-11ea-ab9c-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Korn Ja Mix",
        "1ddd2d12-d7ed-11ea-886b-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Kurilean Bobtail Long-haired",
        "1ddd060e-d7ed-11ea-b946-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Kurilean Bobtail Long-haired Mix",
        "1ddd2d13-d7ed-11ea-98ec-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Kurilean Bobtail Short-haired",
        "1ddd060f-d7ed-11ea-bcfc-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Kurilean Bobtail Short-haired Mix",
        "1ddd2d14-d7ed-11ea-a5a5-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Kurilian Bobtail",
        "1ddd0610-d7ed-11ea-a624-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Kurilian Bobtail Mix",
        "1ddd2d15-d7ed-11ea-8507-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "LaPerm Cat",
        "1ddd0611-d7ed-11ea-803e-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "LaPerm Cat Mix",
        "1ddd2d16-d7ed-11ea-8aba-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "LaPerm Longhair",
        "1ddd0612-d7ed-11ea-9789-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "LaPerm Longhair Mix",
        "1ddd2d17-d7ed-11ea-8577-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "LaPerm Shorthair",
        "1ddd0613-d7ed-11ea-8a33-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "LaPerm Shorthair Mix",
        "1ddd2d18-d7ed-11ea-90fe-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Lykoi Cat",
        "1ddd0614-d7ed-11ea-a797-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Lykoi Cat Mix",
        "1ddd2d19-d7ed-11ea-a769-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Lynx Point Siamese",
        "1ddd0615-d7ed-11ea-b2dc-302432eba3ec",
        "SIAME",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Lynx Point Siamese Mix",
        "1ddd2d1a-d7ed-11ea-87f6-302432eba3ec",
        "SIAMX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Maine Coon",
        "1ddd0616-d7ed-11ea-b92a-302432eba3ec",
        "MAICO",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Maine Coon Mix",
        "1ddd2d1b-d7ed-11ea-8a62-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Manx Cat",
        "1ddd0617-d7ed-11ea-9358-302432eba3ec",
        "MANX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Manx Cat Mix",
        "1ddd2d1c-d7ed-11ea-a28d-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Mekong Bobtail",
        "1ddd0618-d7ed-11ea-9d7b-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Mekong Bobtail Mix",
        "1ddd2d1d-d7ed-11ea-b6d1-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Minskin Cat",
        "1ddd0619-d7ed-11ea-98b6-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Minskin Cat Mix",
        "1ddd2d1e-d7ed-11ea-82aa-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Modern Persian",
        "1ddd061a-d7ed-11ea-8dd4-302432eba3ec",
        "PERSI",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Modern Persian Mix",
        "1ddd2d1f-d7ed-11ea-bc51-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Modern Siamese Cat",
        "1ddd061b-d7ed-11ea-8580-302432eba3ec",
        "SIAME",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Modern Siamese Cat Mix",
        "1ddd2d20-d7ed-11ea-a835-302432eba3ec",
        "SIAMX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Munchkin Cat",
        "1ddd061c-d7ed-11ea-ab32-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Munchkin Cat Mix",
        "1ddd2d21-d7ed-11ea-8979-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Napoleon Cat",
        "1ddd061d-d7ed-11ea-82a3-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Napoleon Cat Mix",
        "1ddd2d22-d7ed-11ea-bc68-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Nebelung Cat",
        "1ddd061f-d7ed-11ea-9bfd-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Nebelung Cat Mix",
        "1ddd2d24-d7ed-11ea-b293-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Neva Masquerade",
        "1ddd0620-d7ed-11ea-b026-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Neva Masquerade Mix",
        "1ddd2d25-d7ed-11ea-a91c-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Forest Cat",
        "1ddd0621-d7ed-11ea-b2bb-302432eba3ec",
        "NORFO",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Forest Cat Mix",
        "1ddd2d26-d7ed-11ea-9ce1-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Ocicat Cat",
        "1ddd0622-d7ed-11ea-a09e-302432eba3ec",
        "OCICA",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Ocicat Cat Mix",
        "1ddd2d27-d7ed-11ea-8dc4-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Ojos Azules",
        "1ddd0623-d7ed-11ea-895d-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Ojos Azules Mix",
        "1ddd2d28-d7ed-11ea-b923-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Oregon Rex",
        "1ddd0624-d7ed-11ea-b975-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Oregon Rex Mix",
        "1ddd2d29-d7ed-11ea-b0e4-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Oriental Bicolor",
        "1ddd0625-d7ed-11ea-bcb2-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Oriental Bicolor Mix",
        "1ddd2d2a-d7ed-11ea-b2f7-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Oriental Cat",
        "1ddd0626-d7ed-11ea-ba51-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Oriental Cat Mix",
        "1ddd2d2b-d7ed-11ea-9579-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Oriental Long-haired",
        "1ddd0627-d7ed-11ea-860c-302432eba3ec",
        "ORILO",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Oriental Long-haired Mix",
        "1ddd2d2c-d7ed-11ea-9b3a-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Oriental Short-haired",
        "1ddd0628-d7ed-11ea-a861-302432eba3ec",
        "ORISH",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Oriental Short-haired Mix",
        "1ddd2d2d-d7ed-11ea-8947-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Persian Cat",
        "1ddd0629-d7ed-11ea-bbc7-302432eba3ec",
        "PERSI",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Persian Cat Mix",
        "1ddd2d2e-d7ed-11ea-ae61-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Peterbald Cat",
        "1ddd062a-d7ed-11ea-8941-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Peterbald Cat Mix",
        "1ddd2d2f-d7ed-11ea-a161-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Pixie-bob Cat",
        "1ddd062b-d7ed-11ea-9dbe-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Pixie-bob Cat Mix",
        "1ddd2d30-d7ed-11ea-a1da-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Raas Cat",
        "1ddd062c-d7ed-11ea-99a9-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Raas Cat Mix",
        "1ddd2d31-d7ed-11ea-8b8c-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Ragamuffin Cat",
        "1ddd062d-d7ed-11ea-a4dd-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Ragamuffin Cat Mix",
        "1ddd2d32-d7ed-11ea-921d-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Ragdoll Cat",
        "1ddd062e-d7ed-11ea-adbd-302432eba3ec",
        "RAGDO",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Ragdoll Cat Mix",
        "1ddd2d33-d7ed-11ea-ae73-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Russian Black",
        "1ddd0630-d7ed-11ea-a733-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Russian Black Mix",
        "1ddd2d35-d7ed-11ea-98cb-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Russian Blue",
        "1ddd0631-d7ed-11ea-8799-302432eba3ec",
        "RUSBL",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Russian Blue Mix",
        "1ddd2d36-d7ed-11ea-aad8-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Russian Cat",
        "1ddd062f-d7ed-11ea-9a82-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Russian Cat Mix",
        "1ddd2d34-d7ed-11ea-8130-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Russian Tabby",
        "1ddd0632-d7ed-11ea-bcf7-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Russian Tabby Mix",
        "1ddd2d37-d7ed-11ea-9528-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Russian White",
        "1ddd0633-d7ed-11ea-ac8e-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Russian White Mix",
        "1ddd2d38-d7ed-11ea-9cfa-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Sam sawet",
        "1ddd0634-d7ed-11ea-a6ec-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Sam sawet Mix",
        "1ddd2d39-d7ed-11ea-921e-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Savannah Cat",
        "1ddd0635-d7ed-11ea-ac42-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Savannah Cat Mix",
        "1ddd2d3a-d7ed-11ea-9986-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Scottish Fold",
        "1ddd0636-d7ed-11ea-8865-302432eba3ec",
        "SCOFO",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Scottish Fold Longhair",
        "1ddd0637-d7ed-11ea-a10f-302432eba3ec",
        "SCOFO",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Scottish Fold Longhair Mix",
        "1ddd2d3c-d7ed-11ea-8999-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Scottish Fold Mix",
        "1ddd2d3b-d7ed-11ea-a7fe-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Scottish Fold Shorthair",
        "1ddd0638-d7ed-11ea-bea2-302432eba3ec",
        "SCOFO",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Scottish Fold Shorthair Mix",
        "1ddd2d3d-d7ed-11ea-9954-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Selkirk Rex",
        "1ddd0639-d7ed-11ea-bd34-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Selkirk Rex Mix",
        "1ddd2d3e-d7ed-11ea-af51-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Serengeti Cat",
        "1ddd063a-d7ed-11ea-946e-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Serengeti Cat Mix",
        "1ddd2d3f-d7ed-11ea-914a-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Serrade Petit",
        "1ddd063b-d7ed-11ea-a2ea-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Serrade Petit Mix",
        "1ddd2d40-d7ed-11ea-9890-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Siamese",
        "1ddd063c-d7ed-11ea-a884-302432eba3ec",
        "SIAME",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Siamese Mix",
        "1ddd2d41-d7ed-11ea-9289-302432eba3ec",
        "SIAMX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Siberian Cat",
        "1ddd063d-d7ed-11ea-974a-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Siberian Cat Mix",
        "1ddd2d42-d7ed-11ea-9a97-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Singapura Cat",
        "1ddd063e-d7ed-11ea-b280-302432eba3ec",
        "SINGA",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Singapura Cat Mix",
        "1ddd2d43-d7ed-11ea-86d9-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Snowshoe Cat",
        "1ddd063f-d7ed-11ea-ba3f-302432eba3ec",
        "SNOWS",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Snowshoe Cat Mix",
        "1ddd2d44-d7ed-11ea-aeb3-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Sokoke Cat",
        "1ddd0640-d7ed-11ea-a020-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Sokoke Cat Mix",
        "1ddd2d45-d7ed-11ea-88e5-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Somali Cat",
        "1ddd0641-d7ed-11ea-96e6-302432eba3ec",
        "SOMAL",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Somali Cat Mix",
        "1ddd2d46-d7ed-11ea-8529-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "South African Blue Cat",
        "1ddd0642-d7ed-11ea-b06c-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "South African Blue Cat Mix",
        "1ddd2d47-d7ed-11ea-9766-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Sphynx Cat",
        "1ddd0643-d7ed-11ea-b71c-302432eba3ec",
        "SPHYN",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Sphynx Cat Mix",
        "1ddd2d48-d7ed-11ea-b82b-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Standardized Siamese Cat",
        "1ddd0644-d7ed-11ea-a3a7-302432eba3ec",
        "SIAME",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Standardized Siamese Cat Mix",
        "1ddd2d49-d7ed-11ea-ac5c-302432eba3ec",
        "SIAMX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Suphalak Cat",
        "1ddd0645-d7ed-11ea-bec8-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Suphalak Cat Mix",
        "1ddd2d4a-d7ed-11ea-863d-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Thai Cat",
        "1ddd0646-d7ed-11ea-80c5-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Thai Cat Mix",
        "1ddd2d4b-d7ed-11ea-bdcb-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Tonkinese Cat",
        "1ddd0647-d7ed-11ea-bdb0-302432eba3ec",
        "TONKI",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Tonkinese Cat Mix",
        "1ddd2d4c-d7ed-11ea-8040-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Tortie Lynx Point Siamese Cat",
        "1ddd0648-d7ed-11ea-9b9c-302432eba3ec",
        "SIAME",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Tortie Lynx Point Siamese Cat Mix",
        "1ddd2d4d-d7ed-11ea-9191-302432eba3ec",
        "SIAMX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Tortie Point Siamese",
        "1ddd0649-d7ed-11ea-b8e1-302432eba3ec",
        "SIAME",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Tortie Point Siamese Mix",
        "1ddd2d4e-d7ed-11ea-8548-302432eba3ec",
        "SIAMX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Toyger Cat",
        "1ddd064a-d7ed-11ea-8ddd-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Toyger Cat Mix",
        "1ddd2d4f-d7ed-11ea-bfb9-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Traditional Persian",
        "1ddd064b-d7ed-11ea-a430-302432eba3ec",
        "PERSI",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Traditional Persian Mix",
        "1ddd2d50-d7ed-11ea-a782-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Turkish Angora",
        "1ddd064c-d7ed-11ea-9418-302432eba3ec",
        "TURAN",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Turkish Angora Mix",
        "1ddd2d51-d7ed-11ea-8bba-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Turkish Van",
        "1ddd064d-d7ed-11ea-8d05-302432eba3ec",
        "TURVA",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Turkish Van Mix",
        "1ddd2d52-d7ed-11ea-b41d-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Ukrainian Levkoy",
        "1ddd2cd9-d7ed-11ea-8805-302432eba3ec",
        "PERSI",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Ukrainian Levkoy Mix",
        "1ddd2d53-d7ed-11ea-81f6-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Unknown Feline",
        "20e0d4fb-d80a-11ea-a1cd-302432eba3ec",
        "UNK",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Wila Krungthep",
        "1ddd2cda-d7ed-11ea-ac89-302432eba3ec",
        "PERSI",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Wila Krungthep Mix",
        "1ddd2d54-d7ed-11ea-86c0-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "York Chocolate",
        "1ddd2cdb-d7ed-11ea-b8b9-302432eba3ec",
        "PERSI",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "York Chocolate Mix",
        "1ddd2d55-d7ed-11ea-9f4c-302432eba3ec",
        "MIX",
        "FELINE",
        "breed",
        "heska"
    ],
    [
        "Affenpinscher",
        "1ddbf413-d7ed-11ea-87e2-302432eba3ec",
        "AFFEN",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Affenpinscher Mix",
        "1ddc69df-d7ed-11ea-9a16-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Afghan Hound",
        "1ddbf414-d7ed-11ea-8e57-302432eba3ec",
        "AFGHO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Afghan Hound Mix",
        "1ddc69e0-d7ed-11ea-8621-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Afghan Shepherd",
        "1ddc699b-d7ed-11ea-9b8c-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Afghan Shepherd Mix",
        "1ddcdf22-d7ed-11ea-8a6e-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Airedale Terrier",
        "1ddbf415-d7ed-11ea-b281-302432eba3ec",
        "AIRED",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Airedale Terrier Mix",
        "1ddc69e1-d7ed-11ea-9c19-302432eba3ec",
        "AIRTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Akbash",
        "1f9348b9-8d3b-11ed-b601-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Akbash Mix",
        "8f50afec-52a5-11ee-be56-0242ac120002",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Alaskan Klee Kai",
        "ca437109-8dc9-11ed-9ceb-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Alaskan Klee Kai Mix",
        "ca45bae3-8dc9-11ed-b01e-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Alaskan Malamute",
        "1ddbf416-d7ed-11ea-8f92-302432eba3ec",
        "ALAMA",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Alaskan Malamute Mix",
        "1ddc69e2-d7ed-11ea-98d3-302432eba3ec",
        "ALAMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Alpine Dachsbracke",
        "1ddbf417-d7ed-11ea-9148-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Alpine Dachsbracke Mix",
        "1ddc69e3-d7ed-11ea-9e2a-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Akita",
        "1ddbf418-d7ed-11ea-a8a2-302432eba3ec",
        "AKITA",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Akita Mix",
        "1ddc69e4-d7ed-11ea-8fb6-302432eba3ec",
        "AKITX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Bulldog",
        "1ddbf419-d7ed-11ea-971b-302432eba3ec",
        "BULAM",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Bulldog Mix",
        "1ddc69e5-d7ed-11ea-999d-302432eba3ec",
        "BULLX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Cocker Spaniel",
        "1ddbf41a-d7ed-11ea-b0b3-302432eba3ec",
        "COCSP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Cocker Spaniel Mix",
        "1ddc69e6-d7ed-11ea-bfe5-302432eba3ec",
        "COCSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Eskimo Dog",
        "1ddbf41b-d7ed-11ea-bff4-302432eba3ec",
        "AMEES",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Eskimo Dog Mix",
        "1ddc69e7-d7ed-11ea-8c38-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Foxhound",
        "1ddbf41c-d7ed-11ea-bd3d-302432eba3ec",
        "AMEFH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Foxhound Mix",
        "1ddc69e8-d7ed-11ea-8c93-302432eba3ec",
        "FOXHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American German Shepherd Dog",
        "1ddbf41f-d7ed-11ea-ab2c-302432eba3ec",
        "GERSH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American German Shepherd Dog Mix",
        "1ddc69eb-d7ed-11ea-9454-302432eba3ec",
        "GERSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Hairless Terrier",
        "1ddc69ab-d7ed-11ea-ae8c-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Hairless Terrier Mix",
        "1ddcdf32-d7ed-11ea-a2f3-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Indian Dog",
        "746a8ca6-edf2-11ed-a05b-0242ac120003",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Indian Dog Mix",
        "746a8db4-edf2-11ed-a05b-0242ac120003",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Leopard Hound",
        "ca72618a-8dc9-11ed-b20b-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Leopard Hound Mix",
        "ca739a06-8dc9-11ed-b0c1-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Pit Bull Terrier",
        "ca836606-8dc9-11ed-ab7b-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Pit Bull Terrier Mix",
        "ca849e83-8dc9-11ed-956f-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Staffordshire Terrier",
        "1ddbf41d-d7ed-11ea-bdaf-302432eba3ec",
        "AMSTT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Staffordshire Terrier Mix",
        "1ddc69e9-d7ed-11ea-9552-302432eba3ec",
        "AMSTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Water Spaniel",
        "1ddbf41e-d7ed-11ea-8345-302432eba3ec",
        "AMEWS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "American Water Spaniel Mix",
        "1ddc69ea-d7ed-11ea-af0f-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Anatolian Shepherd Dog",
        "1ddc699c-d7ed-11ea-9cb1-302432eba3ec",
        "ANASH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Anatolian Shepherd Dog Mix",
        "1ddcdf23-d7ed-11ea-96ce-302432eba3ec",
        "Shepherd Mix",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Anglo-FranÃ§ais de Moyen VÃ©nerie",
        "ca4d5c24-8dc9-11ed-bafe-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Anglo-FranÃ§ais de Moyen VÃ©nerie Mix",
        "ca4ebba6-8dc9-11ed-9325-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Anglo-FranÃ§ais de Petite VÃ©nerie",
        "ca946a60-8dc9-11ed-95d3-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Anglo-FranÃ§ais de Petite VÃ©nerie Mix",
        "ca95a2e0-8dc9-11ed-bcca-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Appenzell Cattle Dog",
        "1ddbf420-d7ed-11ea-b48a-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Appenzell Cattle Dog Mix",
        "1ddc69ec-d7ed-11ea-a2db-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ariege Hound",
        "1ddbf421-d7ed-11ea-950c-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ariege Hound Mix",
        "1ddc69ed-d7ed-11ea-82c2-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ariege Pointing Dog",
        "1ddbf422-d7ed-11ea-acdb-302432eba3ec",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ariege Pointing Dog Mix",
        "1ddc69ee-d7ed-11ea-b3e3-302432eba3ec",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Artesian-Norman Basset",
        "1ddbf423-d7ed-11ea-9b30-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Artesian-Norman Basset Mix",
        "1ddc69ef-d7ed-11ea-952e-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Artois Hound",
        "1ddbf424-d7ed-11ea-94f6-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Artois Hound Mix",
        "1ddc69f0-d7ed-11ea-9ddf-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Atlas Shepherd Dog",
        "1ddbf425-d7ed-11ea-a8fc-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Atlas Shepherd Dog Mix",
        "1ddc69f1-d7ed-11ea-9da4-302432eba3ec",
        "Shepherd Mix",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Cattle Dog",
        "1ddbf426-d7ed-11ea-ac5b-302432eba3ec",
        "AUSCD",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Cattle Dog Mix",
        "1ddc69f2-d7ed-11ea-b863-302432eba3ec",
        "AUSCX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Kelpie",
        "1ddbf427-d7ed-11ea-b2bf-302432eba3ec",
        "AUSKE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Kelpie Mix",
        "1ddc69f3-d7ed-11ea-b540-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Shepherd",
        "1ddbf428-d7ed-11ea-8e47-302432eba3ec",
        "AUSSH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Shepherd Mix",
        "1ddc69f4-d7ed-11ea-8725-302432eba3ec",
        "AUSSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Silky Terrier",
        "1ddbf429-d7ed-11ea-b05e-302432eba3ec",
        "SILTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Silky Terrier Mix",
        "1ddc69f5-d7ed-11ea-a453-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Stumpy Tail Cattle Dog",
        "1ddbf42a-d7ed-11ea-9fe5-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Stumpy Tail Cattle Dog Mix",
        "1ddc69f6-d7ed-11ea-afe0-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Terrier",
        "1ddbf42b-d7ed-11ea-bda7-302432eba3ec",
        "AUSTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian Terrier Mix",
        "1ddc69f7-d7ed-11ea-8cb7-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian working kelpie",
        "1ddbf42c-d7ed-11ea-9660-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Australian working kelpie Mix",
        "1ddc907e-d7ed-11ea-9a10-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Austrian Black and Tan Hound",
        "1ddbf42d-d7ed-11ea-8268-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Austrian Black and Tan Hound Mix",
        "1ddc907f-d7ed-11ea-9111-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Austrian Pinscher",
        "1ddbf42e-d7ed-11ea-8e5c-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Austrian Pinscher Mix",
        "1ddc9080-d7ed-11ea-8dc0-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Auvergne Pointing Dog",
        "1ddbf42f-d7ed-11ea-ae59-302432eba3ec",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Auvergne Pointing Dog Mix",
        "1ddc9081-d7ed-11ea-b05d-302432eba3ec",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Azawakh",
        "1ddbf430-d7ed-11ea-9f2f-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Azawakh Mix",
        "1ddc9082-d7ed-11ea-bc0b-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Barbet",
        "1ddbf431-d7ed-11ea-bde6-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Barbet Mix",
        "1ddc9083-d7ed-11ea-aff4-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Basenji",
        "1ddbf432-d7ed-11ea-a3ab-302432eba3ec",
        "BASEN",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Basenji Mix",
        "1ddc9084-d7ed-11ea-b8f5-302432eba3ec",
        "BASMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Basque Shepherd Dog",
        "1ddc699d-d7ed-11ea-9cb7-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Basque Shepherd Dog Mix",
        "1ddcdf24-d7ed-11ea-aa13-302432eba3ec",
        "Shepherd Mix",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Basset Griffon Vendeen",
        "1ddc69d1-d7ed-11ea-b72b-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Basset Griffon Vendeen Mix",
        "1ddd05c4-d7ed-11ea-a8a8-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Basset Hound",
        "1ddbf433-d7ed-11ea-bff4-302432eba3ec",
        "BASHO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Basset Hound Mix",
        "1ddc9085-d7ed-11ea-b6c5-302432eba3ec",
        "BASHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bavarian Mountain Scenthound",
        "1ddbf434-d7ed-11ea-8322-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bavarian Mountain Scenthound Mix",
        "1ddc9086-d7ed-11ea-94ed-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Beagle",
        "1ddbf435-d7ed-11ea-ae96-302432eba3ec",
        "BEAGL",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Beagle Mix",
        "1ddc9087-d7ed-11ea-a90d-302432eba3ec",
        "BEAGX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Beagle-Harrier",
        "1ddbf436-d7ed-11ea-80e2-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Beagle-Harrier Mix",
        "1ddc9088-d7ed-11ea-bf85-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bearded Collie",
        "1ddbf437-d7ed-11ea-963b-302432eba3ec",
        "BEACO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bearded Collie Mix",
        "1ddc9089-d7ed-11ea-8e3b-302432eba3ec",
        "COLLX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Beauceron",
        "1ddbf438-d7ed-11ea-bb65-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Beauceron Mix",
        "1ddc908a-d7ed-11ea-986a-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bedlington Terrier",
        "1ddbf439-d7ed-11ea-aaf2-302432eba3ec",
        "BEDTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bedlington Terrier Mix",
        "1ddc908b-d7ed-11ea-8733-302432eba3ec",
        "BEDTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Griffon",
        "1ddbf43a-d7ed-11ea-85b1-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Griffon Mix",
        "1ddc908c-d7ed-11ea-8cf6-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Shepherd Dog",
        "5c24eb8c-d5bd-11ea-83fb-302432eba3ec",
        "BELSH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Shepherd Dog Mix",
        "8e4c9d64-e54e-11ed-b5ea-0242ac120002",
        "Shepherd Mix",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Shepherd Dog Mix Groenendael",
        "1ddc90bc-d7ed-11ea-acc3-302432eba3ec",
        "Shepherd Mix",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Shepherd Dog Mix Groenendael",
        "7f71a626-7bc2-11eb-930c-302432eba3ec",
        "Shepherd Mix",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Shepherd Dog Mix Laekenois",
        "1ddc90eb-d7ed-11ea-8343-302432eba3ec",
        "Shepherd Mix",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Shepherd Dog Mix Malinois",
        "1ddcb7d0-d7ed-11ea-8380-302432eba3ec",
        "BELMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Shepherd Dog Mix Tervuren",
        "1ddcdf1f-d7ed-11ea-b2e1-302432eba3ec",
        "Shepherd Mix",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Shepherd Dog Groenendael",
        "1ddc1b40-d7ed-11ea-aba5-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Shepherd Dog Laekenois",
        "1ddc1b6f-d7ed-11ea-82c8-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Shepherd Dog Malinois",
        "1ddc4250-d7ed-11ea-beb5-302432eba3ec",
        "BELMA",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Belgian Shepherd Dog Tervuren",
        "1ddc6998-d7ed-11ea-9afd-302432eba3ec",
        "BELTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bergamasco Shepherd Dog",
        "1ddbf43b-d7ed-11ea-b8e4-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bergamasco Shepherd Dog Mix",
        "1ddc908d-d7ed-11ea-8a94-302432eba3ec",
        "Shepherd Mix",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Berger Picard",
        "1ddbf440-d7ed-11ea-a229-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Berger Picard Mix",
        "1ddc9092-d7ed-11ea-a544-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bernadoodle",
        "1ddc69d8-d7ed-11ea-8316-302432eba3ec",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bernadoodle Mix",
        "1ddd05cb-d7ed-11ea-9d60-302432eba3ec",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bernese Hound",
        "1ddbf441-d7ed-11ea-b1d3-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bernese Hound Mix",
        "1ddc9093-d7ed-11ea-b86f-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bernese Mountain Dog",
        "1ddbf442-d7ed-11ea-aa83-302432eba3ec",
        "BERMD",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bernese Mountain Dog Mix",
        "1ddc9094-d7ed-11ea-bcc9-302432eba3ec",
        "BERMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bichon Frise",
        "1ddbf443-d7ed-11ea-9447-302432eba3ec",
        "BICFR",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bichon Frise Mix",
        "1ddc9095-d7ed-11ea-91dd-302432eba3ec",
        "BICFX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Biewer Terrier",
        "ca85fe25-8dc9-11ed-bf42-302432eba3ec",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Biewer Terrier Mix",
        "ca873696-8dc9-11ed-ac76-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Billy",
        "1ddbf444-d7ed-11ea-bd70-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Billy Mix",
        "1ddc9096-d7ed-11ea-9927-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Black Mouth Cur",
        "ca80a707-8dc9-11ed-9265-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Black Mouth Cur Mix",
        "ca820673-8dc9-11ed-8c6d-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Black Russian Terrier",
        "1ddc69ac-d7ed-11ea-995e-302432eba3ec",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Black Russian Terrier Mix",
        "1ddcdf33-d7ed-11ea-bcd9-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Black and Tan Coonhound",
        "1ddbf445-d7ed-11ea-897f-302432eba3ec",
        "COOBT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Black and Tan Coonhound Mix",
        "1ddc9097-d7ed-11ea-a889-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Black and Tan English Toy Terrier",
        "1ddc69ae-d7ed-11ea-b889-302432eba3ec",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Black and Tan English Toy Terrier Mix",
        "1ddcdf35-d7ed-11ea-aaf7-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bloodhound",
        "1ddbf446-d7ed-11ea-a5ec-302432eba3ec",
        "BLOOD",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bloodhound Mix",
        "1ddc9098-d7ed-11ea-b80d-302432eba3ec",
        "BLOOX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Blue Gascony Basset",
        "1ddbf447-d7ed-11ea-9336-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Blue Gascony Basset Mix",
        "1ddc9099-d7ed-11ea-bda2-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Blue Gascony Griffon",
        "1ddbf448-d7ed-11ea-b2ad-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Blue Gascony Griffon Mix",
        "1ddc909a-d7ed-11ea-9333-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Blue Picardy Spaniel",
        "1ddbf449-d7ed-11ea-8452-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Blue Picardy Spaniel Mix",
        "1ddc909b-d7ed-11ea-8960-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bluetick Coonhound",
        "1ddbf44a-d7ed-11ea-9789-302432eba3ec",
        "BLUHO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bluetick Coonhound Mix",
        "1ddc909c-d7ed-11ea-9f4b-302432eba3ec",
        "COONX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Boerboel",
        "746a8044-edf2-11ed-a05b-0242ac120003",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Boerboel Mix",
        "746a8346-edf2-11ed-a05b-0242ac120003",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bohemian Shepherd",
        "1ddbf43c-d7ed-11ea-a955-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bohemian Shepherd Mix",
        "1ddc908e-d7ed-11ea-8d42-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bohemian Wire-haired Pointing Griffon",
        "1ddbf44c-d7ed-11ea-9732-302432eba3ec",
        "GRIWP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bohemian Wire-haired Pointing Griffon Mix",
        "1ddc909e-d7ed-11ea-994d-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bolognese",
        "1ddbf44d-d7ed-11ea-8b4b-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bolognese Mix",
        "1ddc909f-d7ed-11ea-a80e-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Border Collie",
        "1ddbf44e-d7ed-11ea-98bb-302432eba3ec",
        "BORCO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Border Collie Mix",
        "1ddc90a0-d7ed-11ea-a8e0-302432eba3ec",
        "BORCX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Border Terrier",
        "1ddbf44f-d7ed-11ea-9e94-302432eba3ec",
        "BORTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Border Terrier Mix",
        "1ddc90a1-d7ed-11ea-965d-302432eba3ec",
        "BORTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Borzoi",
        "1ddbf450-d7ed-11ea-82a1-302432eba3ec",
        "BORZO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Borzoi Mix",
        "1ddc90a2-d7ed-11ea-95de-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bosnian Coarse-Haired Hound",
        "1ddbf451-d7ed-11ea-b28b-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bosnian Coarse-Haired Hound Mix",
        "1ddc90a3-d7ed-11ea-a0f5-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Boston Terrier",
        "1ddbf452-d7ed-11ea-99a6-302432eba3ec",
        "BOSTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Boston Terrier Mix",
        "1ddc90a4-d7ed-11ea-a1b0-302432eba3ec",
        "BOSTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bourbonnais Pointing Dog",
        "1ddbf453-d7ed-11ea-a634-302432eba3ec",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bourbonnais Pointing Dog Mix",
        "1ddc90a5-d7ed-11ea-9bd9-302432eba3ec",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bouvier des Ardennes",
        "1ddbf454-d7ed-11ea-98a3-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bouvier des Ardennes Mix",
        "1ddc90a6-d7ed-11ea-a30a-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bouvier des Flandres",
        "1ddbf455-d7ed-11ea-9d32-302432eba3ec",
        "BOUDF",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bouvier des Flandres Mix",
        "1ddc90a7-d7ed-11ea-96be-302432eba3ec",
        "BOUDX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Boxer",
        "1ddbf456-d7ed-11ea-bd2a-302432eba3ec",
        "BOXER",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Boxer Mix",
        "1ddc90a8-d7ed-11ea-a8a3-302432eba3ec",
        "BOXEX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Boykin Spaniel",
        "1ddc69bf-d7ed-11ea-b64a-302432eba3ec",
        "BOYSP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Boykin Spaniel Mix",
        "1ddcdf46-d7ed-11ea-889d-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bracco Italiano",
        "1ddbf457-d7ed-11ea-9073-302432eba3ec",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bracco Italiano Mix",
        "1ddc90a9-d7ed-11ea-b995-302432eba3ec",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Brazilian Terrier",
        "1ddbf458-d7ed-11ea-b356-302432eba3ec",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Brazilian Terrier Mix",
        "1ddc90aa-d7ed-11ea-8d4a-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Briard",
        "1ddbf459-d7ed-11ea-b67e-302432eba3ec",
        "BRIAR",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Briard Mix",
        "1ddc90ab-d7ed-11ea-b707-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Briquet Griffon Vendeen",
        "1ddc69d0-d7ed-11ea-99f5-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Briquet Griffon Vendeen Mix",
        "1ddd05c3-d7ed-11ea-ad9c-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Brittany",
        "1ddbf45a-d7ed-11ea-a8bc-302432eba3ec",
        "BRITT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Brittany Mix",
        "1ddc90ac-d7ed-11ea-afc0-302432eba3ec",
        "BRITX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Broholmer",
        "1ddbf45b-d7ed-11ea-b8ca-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Broholmer Mix",
        "1ddc90ad-d7ed-11ea-8ad4-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Brussels Griffon",
        "1ddc1b32-d7ed-11ea-af54-302432eba3ec",
        "GRIBR",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Brussels Griffon Mix",
        "1ddc90ae-d7ed-11ea-8390-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bucovina Shepherd Dog",
        "1ddc699e-d7ed-11ea-a419-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bucovina Shepherd Dog Mix",
        "1ddcdf25-d7ed-11ea-bdf2-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bull Terrier Mix Standard",
        "1ddcdef7-d7ed-11ea-93a0-302432eba3ec",
        "BULTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bull Terrier Standard",
        "1ddc6970-d7ed-11ea-aeae-302432eba3ec",
        "BULTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bullmastiff",
        "1ddc1b34-d7ed-11ea-9dbe-302432eba3ec",
        "BULMA",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Bullmastiff Mix",
        "1ddc90b0-d7ed-11ea-937f-302432eba3ec",
        "MASTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Burgos Pointing Dog",
        "1ddc1b35-d7ed-11ea-a1ad-302432eba3ec",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Burgos Pointing Dog Mix",
        "1ddc90b1-d7ed-11ea-9d66-302432eba3ec",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cairn Terrier",
        "1ddc1b33-d7ed-11ea-bf8d-302432eba3ec",
        "CAITE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cairn Terrier Mix",
        "1ddc90af-d7ed-11ea-b363-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Canaan Dog",
        "1ddc1b37-d7ed-11ea-83b2-302432eba3ec",
        "CANDO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Canaan Dog Mix",
        "1ddc90b3-d7ed-11ea-9cb2-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Canadian Eskimo Dog",
        "1ddc1b38-d7ed-11ea-90e3-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Canadian Eskimo Dog Mix",
        "1ddc90b4-d7ed-11ea-b786-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Canarian Warren Hound",
        "1ddc1b39-d7ed-11ea-92b3-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Canarian Warren Hound Mix",
        "1ddc90b5-d7ed-11ea-844d-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cane corso",
        "1ddc1b3a-d7ed-11ea-86a8-302432eba3ec",
        "CANEC",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cane corso Mix",
        "1ddc90b6-d7ed-11ea-945f-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Canis lupus familiaris",
        "e7e22593-59a3-11eb-85a2-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cantabrian Water Dog",
        "1ddc69c5-d7ed-11ea-b691-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cantabrian Water Dog Mix",
        "1ddcdf4c-d7ed-11ea-8089-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cao Fila de Sao Miguel",
        "1ddc1b3b-d7ed-11ea-8ff5-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cao Fila de Sao Miguel Mix",
        "1ddc90b7-d7ed-11ea-9e57-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Carolina Dog",
        "ca4fcd6c-8dc9-11ed-995f-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Carolina Dog Mix",
        "ca51a216-8dc9-11ed-8000-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Carpathian Shepherd Dog",
        "1ddc699f-d7ed-11ea-a137-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Carpathian Shepherd Dog Mix",
        "1ddcdf26-d7ed-11ea-9d04-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Castro Laboreiro Dog",
        "1ddc1b3c-d7ed-11ea-ac0e-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Castro Laboreiro Dog Mix",
        "1ddc90b8-d7ed-11ea-ad72-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Catahoula Leopard Dog",
        "b3874d6c-1cad-11ec-89c7-302432eba3e9",
        "CATLD",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Catahoula Leopard Dog Mix",
        "f74b4041-1cad-11ec-8265-302432eba3e9",
        "CATLDX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Catalan Sheepdog",
        "1ddc1b3d-d7ed-11ea-84f6-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Catalan Sheepdog Mix",
        "1ddc90b9-d7ed-11ea-8690-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Caucasian Shepherd Dog",
        "1ddbf43d-d7ed-11ea-92a6-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Caucasian Shepherd Dog Mix",
        "1ddc908f-d7ed-11ea-8f44-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cavalier King Charles Spaniel",
        "1ddc1b3f-d7ed-11ea-bae7-302432eba3ec",
        "KINCS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cavalier King Charles Spaniel Mix",
        "1ddc90bb-d7ed-11ea-b434-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Central Asia Shepherd Dog",
        "1ddbf43e-d7ed-11ea-b90f-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Central Asia Shepherd Dog Mix",
        "1ddc9090-d7ed-11ea-9e75-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cesky Terrier",
        "1ddc1b36-d7ed-11ea-b52a-302432eba3ec",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cesky Terrier Mix",
        "1ddc90b2-d7ed-11ea-a032-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cheasapeake Bay Retriever",
        "1ddc1b42-d7ed-11ea-9fdc-302432eba3ec",
        "CHEBR",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cheasapeake Bay Retriever Mix",
        "1ddc90be-d7ed-11ea-839c-302432eba3ec",
        "CHEBX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chihuahua",
        "1ddc1b43-d7ed-11ea-a698-302432eba3ec",
        "CHIHU",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chihuahua Mix",
        "1ddc90bf-d7ed-11ea-9e65-302432eba3ec",
        "CHIHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chihuahua Mix Long-haired",
        "1ddc90c1-d7ed-11ea-96d5-302432eba3ec",
        "CHIHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chihuahua Mix Smooth-haired",
        "1ddc90c0-d7ed-11ea-ab9a-302432eba3ec",
        "CHIHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chihuahua Long-haired",
        "1ddc1b45-d7ed-11ea-8310-302432eba3ec",
        "CHIHU",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chihuahua Smooth-haired",
        "1ddc1b44-d7ed-11ea-aef7-302432eba3ec",
        "CHIHU",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chilean Terrier",
        "1ddc69ad-d7ed-11ea-8b38-302432eba3ec",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chilean Terrier Mix",
        "1ddcdf34-d7ed-11ea-9f45-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chinese Crested",
        "1ddc1b46-d7ed-11ea-9990-302432eba3ec",
        "CHICR",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chinese Crested Mix",
        "1ddc90c2-d7ed-11ea-ad96-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chinese Crested Mix Hairless",
        "1ddc90c3-d7ed-11ea-94f6-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chinese Crested Mix Powderpuff",
        "1ddc90c4-d7ed-11ea-bd2f-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chinese Crested Hairless",
        "1ddc1b47-d7ed-11ea-acf0-302432eba3ec",
        "CHICR",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chinese Crested Powderpuff",
        "1ddc1b48-d7ed-11ea-82ec-302432eba3ec",
        "CHICR",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chinook",
        "ca5315e1-8dc9-11ed-90c7-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chinook Mix",
        "ca544e63-8dc9-11ed-b87f-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chow Chow",
        "1ddc1b49-d7ed-11ea-bcff-302432eba3ec",
        "CHOW",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Chow Chow Mix",
        "1ddc90c5-d7ed-11ea-af06-302432eba3ec",
        "CHOWX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cirneco dell'Etna",
        "1ddc1b4a-d7ed-11ea-b3ff-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cirneco dell'Etna Mix",
        "1ddc90c6-d7ed-11ea-bc36-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Clumber Spaniel",
        "1ddc1b4b-d7ed-11ea-8963-302432eba3ec",
        "CLUSP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Clumber Spaniel Mix",
        "1ddc90c7-d7ed-11ea-b1a3-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cockapoo",
        "1ddc1b4c-d7ed-11ea-a4ce-302432eba3ec",
        "COCKA",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Cockapoo Mix",
        "1ddc90c8-d7ed-11ea-abdf-302432eba3ec",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Collie Mix Rough-coated",
        "1ddc90c9-d7ed-11ea-98dc-302432eba3ec",
        "COLLX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Collie Mix Smooth-coated",
        "1ddc90ca-d7ed-11ea-9e92-302432eba3ec",
        "COLLX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Collie Rough-coated",
        "1ddc1b4d-d7ed-11ea-ae6d-302432eba3ec",
        "COLLI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Collie Smooth-coated",
        "1ddc1b4e-d7ed-11ea-a6fb-302432eba3ec",
        "COLLI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Continental Toy Spaniel Mix Papillon",
        "1ddc90cb-d7ed-11ea-ba6f-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Continental Toy Spaniel Mix PhalÃ¨ne",
        "1ddc90cc-d7ed-11ea-bd99-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Continental Toy Spaniel Papillon",
        "1ddc1b4f-d7ed-11ea-90e1-302432eba3ec",
        "PAPIL",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Continental Toy Spaniel PhalÃ¨ne",
        "1ddc1b50-d7ed-11ea-9468-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Coonhound",
        "ca56985b-8dc9-11ed-82da-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Coonhound Mix",
        "ca584877-8dc9-11ed-8c56-302432eba3ec",
        "COONX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Coton de TulÃ©ar",
        "1ddc1b51-d7ed-11ea-b6e3-302432eba3ec",
        "COTDT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Coton de TulÃ©ar Mix",
        "1ddc90cd-d7ed-11ea-a20d-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Croatian Sheepdog",
        "1ddc1b52-d7ed-11ea-ac30-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Croatian Sheepdog Mix",
        "1ddc90ce-d7ed-11ea-af7e-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Crossbred",
        "1ddc1b53-d7ed-11ea-984b-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Crossbred Mix",
        "1ddc90cf-d7ed-11ea-94c4-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Curly Coated Retriever",
        "1ddc1b54-d7ed-11ea-8d0c-302432eba3ec",
        "CURCR",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Curly Coated Retriever Mix",
        "1ddc90d0-d7ed-11ea-a638-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Czechoslovakian Wolfdog",
        "1ddc1b55-d7ed-11ea-b718-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Czechoslovakian Wolfdog Mix",
        "1ddc90d1-d7ed-11ea-a8a6-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund",
        "1ddc1b56-d7ed-11ea-bc76-302432eba3ec",
        "DACHS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix",
        "1ddc90d2-d7ed-11ea-b4fe-302432eba3ec",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Long-haired Miniature",
        "1ddc90d9-d7ed-11ea-a19e-302432eba3ec",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Long-haired Rabbit Hunting",
        "1ddc90d5-d7ed-11ea-af5d-302432eba3ec",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Long-haired Standard",
        "1ddc90d8-d7ed-11ea-8bc8-302432eba3ec",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Miniature",
        "1ddc90d3-d7ed-11ea-8e4d-302432eba3ec",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Rabbit Hunting",
        "1ddc90dc-d7ed-11ea-a022-302432eba3ec",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Smooth-Haired Miniature",
        "1ddc90da-d7ed-11ea-8bd8-302432eba3ec",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Smooth-Haired Standard",
        "1ddc90dd-d7ed-11ea-b5ab-302432eba3ec",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Smooth-haired Rabbit Hunting",
        "1ddc90d6-d7ed-11ea-9bbf-302432eba3ec",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Standard",
        "1ddc90d4-d7ed-11ea-8ff7-302432eba3ec",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Wire-Haired Miniature",
        "1ddc90db-d7ed-11ea-bcab-302432eba3ec",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Wire-Haired Standard",
        "1ddc90de-d7ed-11ea-94c1-302432eba3ec",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Mix Wire-haired Rabbit Hunting",
        "1ddc90d7-d7ed-11ea-a8ff-302432eba3ec",
        "DACHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Long-haired Miniature",
        "1ddc1b5d-d7ed-11ea-a14c-302432eba3ec",
        "DACMI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Long-haired Rabbit Hunting",
        "1ddc1b59-d7ed-11ea-a01d-302432eba3ec",
        "DACHS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Long-haired Standard",
        "1ddc1b5c-d7ed-11ea-b8b8-302432eba3ec",
        "DACHS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Miniature",
        "1ddc1b57-d7ed-11ea-b7c7-302432eba3ec",
        "DACMI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Rabbit Hunting",
        "1ddc1b60-d7ed-11ea-8ba8-302432eba3ec",
        "DACHS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Smooth-Haired Miniature",
        "1ddc1b5e-d7ed-11ea-8beb-302432eba3ec",
        "DACMI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Smooth-Haired Standard",
        "1ddc1b61-d7ed-11ea-a93e-302432eba3ec",
        "DACHS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Smooth-haired Rabbit Hunting",
        "1ddc1b5a-d7ed-11ea-bce5-302432eba3ec",
        "DACHS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Standard",
        "1ddc1b58-d7ed-11ea-a558-302432eba3ec",
        "DACHS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Wire-Haired Miniature",
        "1ddc1b5f-d7ed-11ea-b5d7-302432eba3ec",
        "DACMI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Wire-Haired Standard",
        "1ddc1b62-d7ed-11ea-8bc2-302432eba3ec",
        "DACHS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dachshund Wire-haired Rabbit Hunting",
        "1ddc1b5b-d7ed-11ea-abd5-302432eba3ec",
        "DACHS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dalmatian",
        "1ddc1b63-d7ed-11ea-bd2a-302432eba3ec",
        "DALMA",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dalmatian Mix",
        "1ddc90df-d7ed-11ea-b529-302432eba3ec",
        "DALMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dandie Dinmont Terrier",
        "1ddc1b41-d7ed-11ea-84b9-302432eba3ec",
        "DANDT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dandie Dinmont Terrier Mix",
        "1ddc90bd-d7ed-11ea-8021-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Danish-Swedish Farmdog",
        "1ddc1b65-d7ed-11ea-9a4a-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Danish-Swedish Farmdog Mix",
        "1ddc90e1-d7ed-11ea-80df-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Deutsch Stichelhaar",
        "746a86d4-edf2-11ed-a05b-0242ac120003",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Deutsch Stichelhaar Mix",
        "746a87f6-edf2-11ed-a05b-0242ac120003",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Doberman Pinscher",
        "1ddc1b66-d7ed-11ea-a1e2-302432eba3ec",
        "DOBPI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Doberman Pinscher Mix",
        "1ddc90e2-d7ed-11ea-866d-302432eba3ec",
        "DOBPX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dogo Argentino",
        "1ddc1b67-d7ed-11ea-863d-302432eba3ec",
        "DOGAR",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dogo Argentino Mix",
        "1ddc90e3-d7ed-11ea-913f-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dogo Canario",
        "1ddc1b68-d7ed-11ea-8cef-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dogo Canario Mix",
        "1ddc90e4-d7ed-11ea-b1aa-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dogue De Bordeaux",
        "1ddc1b69-d7ed-11ea-ba8a-302432eba3ec",
        "DOGUE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dogue De Bordeaux Mix",
        "1ddc90e5-d7ed-11ea-a520-302432eba3ec",
        "m",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Drentse Partridge Dog",
        "1ddc1b6a-d7ed-11ea-aa9d-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Drentse Partridge Dog Mix",
        "1ddc90e6-d7ed-11ea-8f58-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Drever",
        "1ddc1b6b-d7ed-11ea-8ff5-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Drever Mix",
        "1ddc90e7-d7ed-11ea-9ff9-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dunker Hound",
        "1ddc1b6c-d7ed-11ea-906e-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dunker Hound Mix",
        "1ddc90e8-d7ed-11ea-95d8-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dutch Shepherd Dog",
        "1ddc1b96-d7ed-11ea-9a30-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dutch Shepherd Dog Mix",
        "1ddc9112-d7ed-11ea-80bd-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dutch Shepherd Dog Mix Long-haired",
        "1ddcb792-d7ed-11ea-a1bf-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dutch Shepherd Dog Mix Short-haired",
        "1ddcdeef-d7ed-11ea-b9cf-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dutch Shepherd Dog Mix rough-haired",
        "1ddcdec5-d7ed-11ea-82cb-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dutch Shepherd Dog Long-haired",
        "1ddc1b97-d7ed-11ea-923a-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dutch Shepherd Dog Short-haired",
        "1ddc6968-d7ed-11ea-8a5d-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dutch Shepherd Dog rough-haired",
        "1ddc42b2-d7ed-11ea-a67e-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "East European Shepherd",
        "1ddc69a0-d7ed-11ea-9bec-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "East European Shepherd Mix",
        "1ddcdf27-d7ed-11ea-956f-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "East Siberian LaÃ¯ka",
        "1ddc1b71-d7ed-11ea-bddd-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "East Siberian LaÃ¯ka Mix",
        "1ddc90ed-d7ed-11ea-b936-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Elo Dog",
        "1ddc1b72-d7ed-11ea-9426-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Elo Mix",
        "1ddc90ee-d7ed-11ea-aaec-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Bulldog",
        "1ddc1b73-d7ed-11ea-9087-302432eba3ec",
        "BULEN",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Bulldog Mix",
        "1ddc90ef-d7ed-11ea-821e-302432eba3ec",
        "BULLX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Cocker Spaniel",
        "1ddc1b74-d7ed-11ea-b918-302432eba3ec",
        "COCSE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Cocker Spaniel Mix",
        "1ddc90f0-d7ed-11ea-ae7f-302432eba3ec",
        "COCSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Coonhound",
        "ca5980f7-8dc9-11ed-842a-302432eba3ec",
        "REDTH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Coonhound Mix",
        "ca5b2ea8-8dc9-11ed-8e17-302432eba3ec",
        "COONX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Foxhound",
        "1ddc1b75-d7ed-11ea-bd90-302432eba3ec",
        "FOXEN",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Foxhound Mix",
        "1ddc90f1-d7ed-11ea-a54d-302432eba3ec",
        "FOXHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Mastiff",
        "1ddc4264-d7ed-11ea-bb55-302432eba3ec",
        "MASTI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Mastiff Mix",
        "1ddcb7e4-d7ed-11ea-953d-302432eba3ec",
        "MASTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Pointer",
        "1ddc1b76-d7ed-11ea-b737-302432eba3ec",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Pointer Mix",
        "1ddc90f2-d7ed-11ea-bdbe-302432eba3ec",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Setter",
        "1ddc1b77-d7ed-11ea-affa-302432eba3ec",
        "ENGSE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Setter Mix",
        "1ddc90f3-d7ed-11ea-8375-302432eba3ec",
        "ENGSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Shepherd",
        "1ddc69a1-d7ed-11ea-a897-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Shepherd Mix",
        "1ddcdf28-d7ed-11ea-88d3-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Springer Spaniel",
        "1ddc1b78-d7ed-11ea-bff2-302432eba3ec",
        "ENGSS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Springer Spaniel Mix",
        "1ddc90f4-d7ed-11ea-a835-302432eba3ec",
        "SPRSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Toy Spaniel",
        "1ddc69c3-d7ed-11ea-8a52-302432eba3ec",
        "ENGTS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Toy Spaniel Mix",
        "1ddcdf4a-d7ed-11ea-ae4a-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Toy Terrier",
        "1ddc1b64-d7ed-11ea-8bb0-302432eba3ec",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "English Toy Terrier Mix",
        "1ddc90e0-d7ed-11ea-aaf9-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Entlebuch Mountain Dog",
        "1ddc1b7a-d7ed-11ea-8a12-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Entlebuch Mountain Dog Mix",
        "1ddc90f6-d7ed-11ea-81ab-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Estonian Hound",
        "1ddc1b7b-d7ed-11ea-8476-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Estonian Hound Mix",
        "1ddc90f7-d7ed-11ea-abe5-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Estrela Mountain Dog",
        "1ddc1b7c-d7ed-11ea-af52-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Estrela Mountain Dog Mix",
        "1ddc90f8-d7ed-11ea-af1a-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Eurasian",
        "1ddc1b7d-d7ed-11ea-9438-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Eurasian Mix",
        "1ddc90f9-d7ed-11ea-bce8-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "European German Shepherd Dog",
        "1ddbf44b-d7ed-11ea-a302-302432eba3ec",
        "GERSH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "European German Shepherd Dog Mix",
        "1ddc909d-d7ed-11ea-a1e4-302432eba3ec",
        "GERSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fawn Brittany Basset",
        "1ddc1b7e-d7ed-11ea-892a-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fawn Brittany Basset Mix",
        "1ddc90fa-d7ed-11ea-9f79-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fawn Brittany Griffon",
        "1ddc1b7f-d7ed-11ea-b2ca-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fawn Brittany Griffon Mix",
        "1ddc90fb-d7ed-11ea-be6c-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Feist",
        "ca67c600-8dc9-11ed-9a9d-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Feist Mix",
        "ca694ca9-8dc9-11ed-87e0-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Field Spaniel",
        "1ddc1b80-d7ed-11ea-80f7-302432eba3ec",
        "FIESP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Field Spaniel Mix",
        "1ddc90fc-d7ed-11ea-96e6-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fila Brasileiro",
        "1ddc1b81-d7ed-11ea-a2c4-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fila Brasileiro Mix",
        "1ddc90fd-d7ed-11ea-a6aa-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Finnish Hound",
        "1ddc1b82-d7ed-11ea-b83d-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Finnish Hound Mix",
        "1ddc90fe-d7ed-11ea-99f3-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Finnish Lapphund",
        "1ddc1b83-d7ed-11ea-aed7-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Finnish Lapphund Mix",
        "1ddc90ff-d7ed-11ea-ade7-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Finnish Spitz",
        "1ddc1b84-d7ed-11ea-bf54-302432eba3ec",
        "SPITZ",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Finnish Spitz Mix",
        "1ddc9100-d7ed-11ea-931b-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Flat Coated Retriever",
        "1ddc1b85-d7ed-11ea-aaf3-302432eba3ec",
        "FLACR",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Flat Coated Retriever Mix",
        "1ddc9101-d7ed-11ea-816d-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fox Terrier",
        "1ddc69be-d7ed-11ea-a4b1-302432eba3ec",
        "FOXTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fox Terrier Mix",
        "1ddcdf45-d7ed-11ea-938a-302432eba3ec",
        "FOXTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fox Terrier Mix smooth",
        "1ddcdeda-d7ed-11ea-a577-302432eba3ec",
        "FOXTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fox Terrier Mix wire",
        "1ddcdf1c-d7ed-11ea-88e7-302432eba3ec",
        "FOXTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fox Terrier smooth",
        "1ddc42c7-d7ed-11ea-bbe4-302432eba3ec",
        "FOXTS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Fox Terrier wire",
        "1ddc6995-d7ed-11ea-9edb-302432eba3ec",
        "FOXTW",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Bulldog",
        "1ddc1b88-d7ed-11ea-a5b0-302432eba3ec",
        "BULLF",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Bulldog Mix",
        "1ddc9104-d7ed-11ea-a432-302432eba3ec",
        "BULLX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Hound Mix Tricolour",
        "1ddc9109-d7ed-11ea-a51b-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Hound Mix White and Black",
        "1ddc910a-d7ed-11ea-99db-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Hound Mix White and Orange",
        "1ddc910b-d7ed-11ea-ac0d-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Hound Tricolour",
        "1ddc1b8d-d7ed-11ea-b836-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Hound White and Black",
        "1ddc1b8e-d7ed-11ea-bb6b-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Hound White and Orange",
        "1ddc1b8f-d7ed-11ea-bb22-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Pointing Dog",
        "1ddc1b89-d7ed-11ea-bc49-302432eba3ec",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Pointing Dog Mix",
        "1ddc9105-d7ed-11ea-a81d-302432eba3ec",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Pointing Dog Mix Gascogne",
        "1ddc9106-d7ed-11ea-8c2b-302432eba3ec",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Pointing Dog Mix Pyrenean",
        "1ddc9107-d7ed-11ea-9df8-302432eba3ec",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Pointing Dog Gascogne",
        "1ddc1b8a-d7ed-11ea-b7b0-302432eba3ec",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Pointing Dog Pyrenean",
        "1ddc1b8b-d7ed-11ea-85db-302432eba3ec",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Spaniel",
        "1ddc1b8c-d7ed-11ea-aea2-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Spaniel Mix",
        "1ddc9108-d7ed-11ea-8a6e-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Wire-haired Korthals Pointing Griffon",
        "1ddc1b90-d7ed-11ea-af9a-302432eba3ec",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "French Wire-haired Korthals Pointing Griffon Mix",
        "1ddc910c-d7ed-11ea-a7e6-302432eba3ec",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Galician Shepherd Dog",
        "1ddc69a2-d7ed-11ea-aaa8-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Galician Shepherd Dog Mix",
        "1ddcdf29-d7ed-11ea-8c86-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Garafian Shepherd",
        "1ddc69a3-d7ed-11ea-bf6e-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Garafian Shepherd Mix",
        "1ddcdf2a-d7ed-11ea-bfce-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Gascon Saintongeois",
        "1ddc1b91-d7ed-11ea-aae1-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Gascon Saintongeois Mix",
        "1ddc910d-d7ed-11ea-bbed-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Georgian Shepherd",
        "1ddc69a4-d7ed-11ea-a97e-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Georgian Shepherd Mix",
        "1ddcdf2b-d7ed-11ea-afaa-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Hound",
        "1ddc1b92-d7ed-11ea-98b1-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Hound Mix",
        "1ddc910e-d7ed-11ea-97da-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Hunting Terrier",
        "1ddc1b79-d7ed-11ea-96cd-302432eba3ec",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Hunting Terrier Mix",
        "1ddc90f5-d7ed-11ea-8241-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Long-haired Pointer",
        "1ddc1b94-d7ed-11ea-9193-302432eba3ec",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Long-haired Pointer Mix",
        "1ddc9110-d7ed-11ea-8bde-302432eba3ec",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Pinscher",
        "1ddc1b95-d7ed-11ea-abc9-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Pinscher Mix",
        "1ddc9111-d7ed-11ea-be99-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Shepherd Dog",
        "1ddc1b3e-d7ed-11ea-a4cd-302432eba3ec",
        "GERSH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Shepherd Dog Mix",
        "1ddc90ba-d7ed-11ea-881a-302432eba3ec",
        "GERSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Shepherd Dog Mix Long-haired",
        "1ddcb793-d7ed-11ea-9be3-302432eba3ec",
        "GERSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Shepherd Dog Mix Short-haired",
        "1ddcdf01-d7ed-11ea-a8b7-302432eba3ec",
        "GERSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Shepherd Dog Long-haired",
        "1ddc1b98-d7ed-11ea-a88c-302432eba3ec",
        "GERSH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Shepherd Dog Short-haired",
        "1ddc697b-d7ed-11ea-84d5-302432eba3ec",
        "GERSH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Short-haired Pointer",
        "1ddc1b9a-d7ed-11ea-8144-302432eba3ec",
        "POIGS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Short-haired Pointer Mix",
        "1ddcb795-d7ed-11ea-b9cd-302432eba3ec",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spaniel",
        "1ddc1b9b-d7ed-11ea-a8f4-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spaniel Mix",
        "1ddcb796-d7ed-11ea-8c2e-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spitz",
        "1ddc1b9c-d7ed-11ea-86cd-302432eba3ec",
        "SPITZ",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spitz Mix",
        "1ddcb797-d7ed-11ea-b1da-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spitz Mix Gross",
        "1ddcb798-d7ed-11ea-9c42-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spitz Mix Miniature",
        "1ddcb799-d7ed-11ea-ae4b-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spitz Mix Mittel",
        "1ddd05c2-d7ed-11ea-a055-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spitz Mix Pomeranian",
        "1ddcb79a-d7ed-11ea-a6c8-302432eba3ec",
        "POMEX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spitz Gross",
        "1ddc1b9d-d7ed-11ea-ad0d-302432eba3ec",
        "SPITZ",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spitz Miniature",
        "1ddc1b9e-d7ed-11ea-befd-302432eba3ec",
        "SPITZ",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spitz Mittel",
        "1ddc69cf-d7ed-11ea-8891-302432eba3ec",
        "SPITZ",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Spitz Pomeranian",
        "1ddc1b9f-d7ed-11ea-b60f-302432eba3ec",
        "POMER",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Wire-Haired Pointer Mix",
        "1ddcb79b-d7ed-11ea-a048-302432eba3ec",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ghadrejani Dog",
        "0d290cc6-63f8-11ec-9c73-7085c2a1b8e0",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ghadrejani Dog Mix",
        "46578df8-63f8-11ec-a061-7085c2a1b8e0",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Glen of Imaal Terrier",
        "1ddc69af-d7ed-11ea-8977-302432eba3ec",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Glen of Imaal Terrier Mix",
        "1ddcdf36-d7ed-11ea-a8a9-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Golden Retriever",
        "1ddc1ba2-d7ed-11ea-9c46-302432eba3ec",
        "GOLRE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Golden Retriever Mix",
        "1ddcb79d-d7ed-11ea-bf40-302432eba3ec",
        "GOLRX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Goldendoodle",
        "734e4977-3bf8-11ec-84ee-7085c2a1b8e0",
        "GLDOO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Goldendoodle Mix",
        "73c13018-3bf8-11ec-9e98-7085c2a1b8e0",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Gordon Setter",
        "1ddc1ba3-d7ed-11ea-8bd7-302432eba3ec",
        "GORSE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Gordon Setter Mix",
        "1ddcb79e-d7ed-11ea-89f5-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Grand Basset Griffon Vendeen",
        "1ddc1ba4-d7ed-11ea-8003-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Grand Basset Griffon Vendeen Mix",
        "1ddcb79f-d7ed-11ea-a219-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Grand Griffon Vendeen",
        "1ddc1ba5-d7ed-11ea-b43b-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Grand Griffon Vendeen Mix",
        "1ddcb7a0-d7ed-11ea-ae47-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Anglo-French Tricolour Hound",
        "1ddc1ba6-d7ed-11ea-9dd0-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Anglo-French Tricolour Hound Mix",
        "1ddcb7a1-d7ed-11ea-b895-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Anglo-French White and Black Hound",
        "1ddc1ba7-d7ed-11ea-bb0f-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Anglo-French White and Black Hound Mix",
        "1ddcb7a2-d7ed-11ea-846c-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Anglo-French White and Orange Hound",
        "1ddc1ba8-d7ed-11ea-abfa-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Anglo-French White and Orange Hound Mix",
        "1ddcb7a3-d7ed-11ea-8140-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Dane",
        "1ddc1ba9-d7ed-11ea-91ed-302432eba3ec",
        "GREDA",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Dane Mix",
        "1ddcb7a4-d7ed-11ea-a49f-302432eba3ec",
        "GREDX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Gascony Hound",
        "1ddc1baa-d7ed-11ea-b388-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Gascony Hound Mix",
        "1ddcb7a5-d7ed-11ea-8c85-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Pyrenees Pyrenean Mountain Dog",
        "1ddc1bab-d7ed-11ea-8d0b-302432eba3ec",
        "GREPY",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Pyrenees Pyrenean Mountain Dog Mix",
        "1ddcb7a6-d7ed-11ea-b751-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Swiss Mountain Dog",
        "1ddc1bac-d7ed-11ea-9da3-302432eba3ec",
        "SWIMD",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Great Swiss Mountain Dog Mix",
        "1ddcb7a7-d7ed-11ea-939c-302432eba3ec",
        "SWIMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Greek Shepherd",
        "1ddc69a5-d7ed-11ea-8e81-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Greek Shepherd Mix",
        "1ddcdf2c-d7ed-11ea-bc97-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Greenland Dog",
        "1ddc1bad-d7ed-11ea-aca8-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Greenland Dog Mix",
        "1ddcb7a8-d7ed-11ea-96aa-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Greyhound",
        "1ddc1bae-d7ed-11ea-bc95-302432eba3ec",
        "GREYH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Greyhound Mix",
        "1ddcb7a9-d7ed-11ea-9ded-302432eba3ec",
        "GREYX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Griffon Nivernais",
        "1ddc1baf-d7ed-11ea-a870-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Griffon Nivernais Mix",
        "1ddcb7aa-d7ed-11ea-8c94-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Gull Terrier",
        "1ddc69b0-d7ed-11ea-a93c-302432eba3ec",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Gull Terrier Mix",
        "1ddcdf37-d7ed-11ea-a0c0-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Halden Hound",
        "1ddc1bb0-d7ed-11ea-94f2-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Halden Hound Mix",
        "1ddcb7ab-d7ed-11ea-93c0-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hamilton Hound",
        "1ddc1bb2-d7ed-11ea-8604-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hamilton Hound Mix",
        "1ddcb7ad-d7ed-11ea-b6ce-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hanoverian Scenthound",
        "1ddc1bb3-d7ed-11ea-b6d2-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hanoverian Scenthound Mix",
        "1ddcb7ae-d7ed-11ea-9faa-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Harrier",
        "1ddc1bb4-d7ed-11ea-9a0b-302432eba3ec",
        "HARRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Harrier Mix",
        "1ddcb7af-d7ed-11ea-96ae-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Havanese",
        "1ddc1bb5-d7ed-11ea-89f1-302432eba3ec",
        "HAVAN",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Havanese Mix",
        "1ddcb7b0-d7ed-11ea-aeea-302432eba3ec",
        "HAVMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hellenic Hound",
        "1ddc1bb6-d7ed-11ea-8092-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hellenic Hound Mix",
        "1ddcb7b1-d7ed-11ea-a749-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Himalayan Sheepdog",
        "1ddc69c7-d7ed-11ea-a196-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Himalayan Sheepdog Mix",
        "1ddcdf4e-d7ed-11ea-a394-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hokkaido",
        "1ddc1bb7-d7ed-11ea-91da-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hokkaido Mix",
        "1ddcb7b2-d7ed-11ea-a4b7-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hollandse Smoushond",
        "1ddc1bb8-d7ed-11ea-89f7-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hollandse Smoushond Mix",
        "1ddcb7b3-d7ed-11ea-85ba-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hound Dog",
        "ca6d4440-8dc9-11ed-9a90-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hound Dog Mix",
        "ca6e7cfc-8dc9-11ed-89e9-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hovawart",
        "1ddc1bb9-d7ed-11ea-98ed-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hovawart Mix",
        "1ddcb7b4-d7ed-11ea-b446-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hungarian Greyhound",
        "1ddc1bba-d7ed-11ea-9292-302432eba3ec",
        "GREYH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hungarian Greyhound Mix",
        "1ddcb7b5-d7ed-11ea-8f77-302432eba3ec",
        "GREYX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hungarian Vizsla Mix Short-haired",
        "1ddcb7b6-d7ed-11ea-95b6-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hungarian Vizsla Mix Wire-haired",
        "1ddcb7b7-d7ed-11ea-956c-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hungarian Vizsla Short-haired",
        "1ddc1bbb-d7ed-11ea-b0fe-302432eba3ec",
        "VIZSL",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hungarian Vizsla Wire-haired",
        "1ddc1bbc-d7ed-11ea-b799-302432eba3ec",
        "VIZSL",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hygen Hound",
        "1ddc1bbd-d7ed-11ea-acf8-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Hygen Hound Mix",
        "1ddcb7b8-d7ed-11ea-ad4e-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "HÃ¤lleforshund",
        "1ddc1bb1-d7ed-11ea-9b75-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "HÃ¤lleforshund Mix",
        "1ddcb7ac-d7ed-11ea-8998-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ibizan Hound",
        "1ddc1bbe-d7ed-11ea-bdd7-302432eba3ec",
        "IBIHO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ibizan Hound Mix",
        "1ddcb7b9-d7ed-11ea-b9d7-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ibizan Hound Mix rough-haired",
        "1ddcb7ba-d7ed-11ea-94f6-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ibizan Hound Mix smooth-haired",
        "1ddcb7bb-d7ed-11ea-9f54-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ibizan Hound rough-haired",
        "1ddc1bbf-d7ed-11ea-ac76-302432eba3ec",
        "IBIHO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Ibizan Hound smooth-haired",
        "1ddc1bc0-d7ed-11ea-a675-302432eba3ec",
        "IBIHO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Icelandic Sheepdog",
        "1ddc1bc1-d7ed-11ea-9ecd-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Icelandic Sheepdog Mix",
        "1ddcb7bc-d7ed-11ea-ad3c-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Indian Spitz",
        "1ddc69ce-d7ed-11ea-8db4-302432eba3ec",
        "SPITZ",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Indian Spitz Mix",
        "1ddd05c1-d7ed-11ea-aa54-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Glen of Imaal Terrier",
        "1ddc1b86-d7ed-11ea-ac05-302432eba3ec",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Glen of Imaal Terrier Mix",
        "1ddc9102-d7ed-11ea-bf52-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Red Setter",
        "1ddc1bc4-d7ed-11ea-b937-302432eba3ec",
        "IRISE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Red Setter Mix",
        "1ddcb7bf-d7ed-11ea-a63e-302432eba3ec",
        "IRISX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Red and White Setter",
        "1ddc1bc3-d7ed-11ea-bc0e-302432eba3ec",
        "IRISE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Red and White Setter Mix",
        "1ddcb7be-d7ed-11ea-9333-302432eba3ec",
        "IRISX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Softcoated Wheaten Terrier",
        "1ddc1b87-d7ed-11ea-a40b-302432eba3ec",
        "WHETS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Softcoated Wheaten Terrier Mix",
        "1ddc9103-d7ed-11ea-aee6-302432eba3ec",
        "WHETX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Terrier",
        "1ddc1b93-d7ed-11ea-a2f7-302432eba3ec",
        "IRITE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Terrier Mix",
        "1ddc910f-d7ed-11ea-9509-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Water Spaniel",
        "1ddc4241-d7ed-11ea-b745-302432eba3ec",
        "IRIWS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Water Spaniel Mix",
        "1ddcb7c2-d7ed-11ea-9b9c-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Wolfhound",
        "1ddc4242-d7ed-11ea-9d68-302432eba3ec",
        "IRIWO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Irish Wolfhound Mix",
        "1ddcb7c3-d7ed-11ea-ad6e-302432eba3ec",
        "IRIWX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Istrian Coarse-haired Hound",
        "66935571-8dcb-11ed-9220-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Istrian Coarse-haired Hound Mix",
        "6854db1b-8dcb-11ed-993d-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Istrian Shorthaired Hound",
        "ca6fdc9e-8dc9-11ed-acce-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Istrian Shorthaired Hound Mix",
        "ca7101f4-8dc9-11ed-8546-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Italian Greyhound",
        "1ddc4243-d7ed-11ea-9b9f-302432eba3ec",
        "GREIT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Italian Greyhound Mix",
        "1ddcb7c4-d7ed-11ea-af8f-302432eba3ec",
        "GREYX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Italian Hound Mix Coarse-haired",
        "1ddcb7c6-d7ed-11ea-a799-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Italian Hound Mix Short-haired",
        "1ddcb7c5-d7ed-11ea-9649-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Italian Hound Coarse-haired",
        "1ddc4245-d7ed-11ea-8a08-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Italian Hound Short-haired",
        "1ddc4246-d7ed-11ea-878f-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Italian Spinone",
        "1ddc4247-d7ed-11ea-81a9-302432eba3ec",
        "ITISP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Italian Spinone Mix",
        "1ddcb7c7-d7ed-11ea-8dbf-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Jack Russell Terrier",
        "1ddc1bc2-d7ed-11ea-aee5-302432eba3ec",
        "JACRU",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Jack Russell Terrier Mix",
        "1ddcb7bd-d7ed-11ea-8615-302432eba3ec",
        "JACRUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Jagdterrier dog",
        "1ddc69b1-d7ed-11ea-8a17-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Jagdterrier dog Mix",
        "1ddcdf38-d7ed-11ea-9090-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Japanese Akita",
        "1ddc4249-d7ed-11ea-8de7-302432eba3ec",
        "AKITA",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Japanese Akita Mix",
        "1ddcb7c9-d7ed-11ea-b6f5-302432eba3ec",
        "AKITX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Japanese Chin",
        "1ddc424a-d7ed-11ea-8c8f-302432eba3ec",
        "JAPCH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Japanese Chin Mix",
        "1ddcb7ca-d7ed-11ea-a8cd-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Japanese Spitz",
        "1ddc424b-d7ed-11ea-9800-302432eba3ec",
        "SPITZ",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Japanese Spitz Mix",
        "1ddcb7cb-d7ed-11ea-8c3a-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Japanese Terrier",
        "1ddc1bc5-d7ed-11ea-86f4-302432eba3ec",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Japanese Terrier Mix",
        "1ddcb7c0-d7ed-11ea-bf30-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Jura Hound",
        "1ddc424d-d7ed-11ea-a0c6-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Jura Hound Mix",
        "1ddcb7cd-d7ed-11ea-a6e5-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kai",
        "1ddc424e-d7ed-11ea-aece-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kai Mix",
        "1ddcb7ce-d7ed-11ea-a6ed-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kangal Shepherd Dog",
        "1ddc1b6d-d7ed-11ea-8299-302432eba3ec",
        "ANASH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kangal Shepherd Dog Mix",
        "1ddc90e9-d7ed-11ea-81db-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Karelian Bear Dog",
        "1ddc424f-d7ed-11ea-b268-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Karelian Bear Dog Mix",
        "1ddcb7cf-d7ed-11ea-9d1e-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Karst Shepherd Dog",
        "1ddc1b6e-d7ed-11ea-a073-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Karst Shepherd Dog Mix",
        "1ddc90ea-d7ed-11ea-b405-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Keeshond",
        "6761857c-a169-11ec-94b4-7085c2a1b8e0",
        "KEESH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Keeshond Mix",
        "c6b49ac4-a169-11ec-8ae8-7085c2a1b8e0",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kerry Blue Terrier",
        "1ddc4240-d7ed-11ea-8b27-302432eba3ec",
        "KERBT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kerry Blue Terrier Mix",
        "1ddcb7c1-d7ed-11ea-b84d-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "King Charles Spaniel",
        "1ddc4252-d7ed-11ea-93ca-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "King Charles Spaniel Mix",
        "1ddcb7d2-d7ed-11ea-a41f-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "King Shepherd",
        "1ddc69a6-d7ed-11ea-bdb8-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "King Shepherd Mix",
        "1ddcdf2d-d7ed-11ea-95fe-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kintamani-Bali Dog",
        "1ddc4253-d7ed-11ea-86e4-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kintamani-Bali Dog Mix",
        "1ddcb7d3-d7ed-11ea-af20-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kishu Ken",
        "1ddc4254-d7ed-11ea-8da4-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kishu Ken Mix",
        "1ddcb7d4-d7ed-11ea-9ab4-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Komondor",
        "1ddc4255-d7ed-11ea-834d-302432eba3ec",
        "KOMON",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Komondor Mix",
        "1ddcb7d5-d7ed-11ea-8b60-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Korea Jindo Dog",
        "1ddc4256-d7ed-11ea-8001-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Korea Jindo Dog Mix",
        "1ddcb7d6-d7ed-11ea-8630-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "KromfohrlÃ¤nder",
        "1ddc4257-d7ed-11ea-ac19-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "KromfohrlÃ¤nder Mix",
        "1ddcb7d7-d7ed-11ea-90ce-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kumaon Mastiff",
        "1ddc426b-d7ed-11ea-b339-302432eba3ec",
        "MASTI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kumaon Mastiff Mix",
        "1ddcb7eb-d7ed-11ea-b687-302432eba3ec",
        "MASTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kuvasz",
        "1ddc4258-d7ed-11ea-aa00-302432eba3ec",
        "KUVAS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Kuvasz Mix",
        "1ddcb7d8-d7ed-11ea-a0bd-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Labradoodle",
        "1ddc4259-d7ed-11ea-82c1-302432eba3ec",
        "LABOO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Labradoodle Mix",
        "1ddcb7d9-d7ed-11ea-a5e6-302432eba3ec",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Labrador Retriever",
        "1ddc425a-d7ed-11ea-a641-302432eba3ec",
        "LABRE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Labrador Retriever Mix",
        "1ddcb7da-d7ed-11ea-8904-302432eba3ec",
        "LABRX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Lagotto romagnolo",
        "1ddc425b-d7ed-11ea-af08-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Lagotto romagnolo Mix",
        "1ddcb7db-d7ed-11ea-8d54-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Lakeland Terrier",
        "1ddc4248-d7ed-11ea-acbb-302432eba3ec",
        "LAKTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Lakeland Terrier Mix",
        "1ddcb7c8-d7ed-11ea-aa89-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Lancashire Heeler",
        "1ddc425d-d7ed-11ea-83ab-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Lancashire Heeler Mix",
        "1ddcb7dd-d7ed-11ea-a3f9-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Landseer Mix European Continental type",
        "1ddcb7de-d7ed-11ea-bd2b-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Landseer European Continental type",
        "1ddc425e-d7ed-11ea-b00b-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Lapponian Herder",
        "ca6a8522-8dc9-11ed-9e69-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Lapponian Herder Mix",
        "ca6be4b9-8dc9-11ed-8c89-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Large MÃ¼nsterlander",
        "1ddc4260-d7ed-11ea-af86-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Large MÃ¼nsterlander Mix",
        "1ddcb7e0-d7ed-11ea-9a7b-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Leonberger",
        "1ddc4261-d7ed-11ea-9b43-302432eba3ec",
        "LEONB",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Leonberger Mix",
        "1ddcb7e1-d7ed-11ea-967c-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Lhasa Apso",
        "1ddc4262-d7ed-11ea-b52b-302432eba3ec",
        "LHAAP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Lhasa Apso Mix",
        "1ddcb7e2-d7ed-11ea-9c08-302432eba3ec",
        "LHAAX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "LÃ¶wchen",
        "1ddc4263-d7ed-11ea-b800-302432eba3ec",
        "LOWCH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "LÃ¶wchen Mix",
        "1ddcb7e3-d7ed-11ea-a278-302432eba3ec",
        "LOWCH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Majorca Mastiff",
        "1ddc4277-d7ed-11ea-a05e-302432eba3ec",
        "MASTI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Majorca Mastiff Mix",
        "1ddcb7f7-d7ed-11ea-ad27-302432eba3ec",
        "MASTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Majorcan Shepherd Dog",
        "1ddc1b99-d7ed-11ea-9375-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Majorcan Shepherd Dog Mix",
        "1ddcb794-d7ed-11ea-87ba-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Majorcan Shepherd Dog Mix long haired",
        "1ddc90ec-d7ed-11ea-a8bf-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Majorcan Shepherd Dog Mix short haired",
        "1ddcdec6-d7ed-11ea-a56a-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Majorcan Shepherd Dog long haired",
        "1ddc1b70-d7ed-11ea-b8a0-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Majorcan Shepherd Dog short haired",
        "1ddc42b3-d7ed-11ea-9a90-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Maltese",
        "1ddc4268-d7ed-11ea-a936-302432eba3ec",
        "MALTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Maltese Mix",
        "1ddcb7e8-d7ed-11ea-a103-302432eba3ec",
        "MALTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Maltipoo",
        "1ddc69d9-d7ed-11ea-be0b-302432eba3ec",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Maltipoo Mix",
        "1ddd05cc-d7ed-11ea-b65a-302432eba3ec",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Manchester Terrier",
        "1ddc424c-d7ed-11ea-801d-302432eba3ec",
        "MANTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Manchester Terrier Mix",
        "1ddcb7cc-d7ed-11ea-9161-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Maremma and Abruzzes Sheepdog",
        "1ddc426a-d7ed-11ea-88ed-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Maremma and Abruzzes Sheepdog Mix",
        "1ddcb7ea-d7ed-11ea-a15e-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mastiff Dog",
        "1ddc42ab-d7ed-11ea-a0ad-302432eba3ec",
        "MASTI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mastiff Mix",
        "1ddcdebe-d7ed-11ea-bb62-302432eba3ec",
        "MASTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Medium Griffon Vendeen",
        "1ddc426c-d7ed-11ea-915c-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Medium Griffon Vendeen Mix",
        "1ddcb7ec-d7ed-11ea-8c5b-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Medium-Sized Anglo-French Hound",
        "1ddc426d-d7ed-11ea-bfb7-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Medium-Sized Anglo-French Hound Mix",
        "1ddcb7ed-d7ed-11ea-816b-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mexican Hairless Dog",
        "1ddc69d3-d7ed-11ea-8341-302432eba3ec",
        "XOLO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mexican Hairless Dog Mix",
        "1ddd05c6-d7ed-11ea-b796-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mexican Hairless Dog Mix Medium-Sized",
        "1ddcb7ee-d7ed-11ea-8f7c-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mexican Hairless Dog Mix Miniature",
        "1ddcb7ef-d7ed-11ea-86ca-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mexican Hairless Dog Mix Standard",
        "1ddcb7f0-d7ed-11ea-8a8d-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mexican Hairless Dog Medium-Sized",
        "1ddc426e-d7ed-11ea-b3ae-302432eba3ec",
        "XOLO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mexican Hairless Dog Miniature",
        "1ddc426f-d7ed-11ea-9c8b-302432eba3ec",
        "XOLO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mexican Hairless Dog Standard",
        "1ddc4270-d7ed-11ea-a58a-302432eba3ec",
        "XOLO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Miniature American Shepherd",
        "1ddc4265-d7ed-11ea-b0d8-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Miniature American Shepherd Mix",
        "1ddcb7e5-d7ed-11ea-b653-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Miniature Bull Terrier",
        "1ddc4251-d7ed-11ea-81e8-302432eba3ec",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Miniature Bull Terrier Mix",
        "1ddcb7d1-d7ed-11ea-87f0-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Miniature Fox Terrier",
        "1ddc69b2-d7ed-11ea-84e9-302432eba3ec",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Miniature Fox Terrier Mix",
        "1ddcdf39-d7ed-11ea-9c42-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Miniature Pinscher",
        "1ddc4273-d7ed-11ea-8094-302432eba3ec",
        "MINPI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Miniature Pinscher Mix",
        "1ddcb7f3-d7ed-11ea-8b10-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mixed Breed Dog",
        "f689dbd6-9964-11eb-9f44-7085c2a1b8e0",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Montenegrin Mountain Hound",
        "1ddc4275-d7ed-11ea-a1db-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Montenegrin Mountain Hound Mix",
        "1ddcb7f5-d7ed-11ea-a26f-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mountain Cur",
        "6d9a2d01-e46f-11ed-978e-106fd9dd20e8",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mountain Cur Mix",
        "8f50bdb6-52a5-11ee-be56-0242ac120002",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mudi Dog",
        "1ddc4276-d7ed-11ea-8add-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Mudi Mix",
        "1ddcb7f6-d7ed-11ea-ac99-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Munsterlander",
        "1ddc69dc-d7ed-11ea-9276-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Munsterlander Mix",
        "1ddd05cf-d7ed-11ea-a682-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Neapolitan Mastiff",
        "1ddc696c-d7ed-11ea-9b2b-302432eba3ec",
        "MASTI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Neapolitan Mastiff Mix",
        "1ddcdef3-d7ed-11ea-8317-302432eba3ec",
        "MASTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Nederlandse Kooikerhondje",
        "1ddc4278-d7ed-11ea-a88c-302432eba3ec",
        "SPITZ",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Nederlandse Kooikerhondje Mix",
        "1ddcb7f8-d7ed-11ea-933d-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Newfoundland",
        "1ddc4279-d7ed-11ea-82e6-302432eba3ec",
        "NEWFO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Newfoundland Mix",
        "1ddcb7f9-d7ed-11ea-b401-302432eba3ec",
        "NEWFX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norfolk Terrier Mix",
        "1ddcb7dc-d7ed-11ea-96ba-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norrbottenspitz",
        "1ddc427b-d7ed-11ea-ad80-302432eba3ec",
        "SPITZ",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norrbottenspitz Mix",
        "1ddcb7fb-d7ed-11ea-953f-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Buhund",
        "1ddc427c-d7ed-11ea-9a91-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Buhund Mix",
        "1ddcb7fc-d7ed-11ea-913d-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Elkhound",
        "1ddc427d-d7ed-11ea-a14c-302432eba3ec",
        "NOREL",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Elkhound Mix",
        "1ddcb7fd-d7ed-11ea-99e6-302432eba3ec",
        "NOREX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Elkhound Mix black",
        "1ddcb7fe-d7ed-11ea-9015-302432eba3ec",
        "NOREX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Elkhound Mix grey",
        "1ddcb7ff-d7ed-11ea-946f-302432eba3ec",
        "NOREX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Elkhound black",
        "1ddc427e-d7ed-11ea-b413-302432eba3ec",
        "NOREL",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Elkhound grey",
        "1ddc427f-d7ed-11ea-a23d-302432eba3ec",
        "NOREL",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Lundehund",
        "1ddc4280-d7ed-11ea-8461-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwegian Lundehund Mix",
        "1ddcb800-d7ed-11ea-930d-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwich Terrier",
        "1ddc4269-d7ed-11ea-8292-302432eba3ec",
        "NORTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Norwich Terrier Mix",
        "1ddcb7e9-d7ed-11ea-811e-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Nova Scotia Duck Tolling Retriever",
        "1ddc4282-d7ed-11ea-814b-302432eba3ec",
        "NSDTR",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Nova Scotia Duck Tolling Retriever Mix",
        "1ddcb802-d7ed-11ea-bb8a-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Old Danish Pointing Dog",
        "1ddc4283-d7ed-11ea-92db-302432eba3ec",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Old Danish Pointing Dog Mix",
        "1ddcb803-d7ed-11ea-8d32-302432eba3ec",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Old English Sheepdog",
        "1ddc4284-d7ed-11ea-9e05-302432eba3ec",
        "OLDES",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Old English Sheepdog Mix",
        "1ddcb804-d7ed-11ea-9834-302432eba3ec",
        "OLDEX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Old English Terrier",
        "1ddc69b3-d7ed-11ea-b9a5-302432eba3ec",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Old English Terrier Mix",
        "1ddcdf3a-d7ed-11ea-b1db-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Old German Shepherd Dog",
        "1ddc4266-d7ed-11ea-b1f7-302432eba3ec",
        "GERSH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Old German Shepherd Dog Mix",
        "1ddcb7e6-d7ed-11ea-9e8f-302432eba3ec",
        "GERSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Other dog Mix",
        "1ddcb806-d7ed-11ea-a5b0-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Otterhound",
        "1ddc4286-d7ed-11ea-9d65-302432eba3ec",
        "OTTER",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Otterhound Mix",
        "1ddcb807-d7ed-11ea-a36e-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Parson Russell Terrier",
        "1ddc69b4-d7ed-11ea-83c6-302432eba3ec",
        "RUSTP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Parson Russell Terrier Mix",
        "1ddcb7f2-d7ed-11ea-bf46-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Patterdale Terrier",
        "1ddc69b5-d7ed-11ea-b5df-302432eba3ec",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Patterdale Terrier Mix",
        "1ddcdf3c-d7ed-11ea-ab0d-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Peekapoo",
        "1ddc69da-d7ed-11ea-b7c6-302432eba3ec",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Peekapoo Mix",
        "1ddd05cd-d7ed-11ea-8635-302432eba3ec",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pekingese Dog",
        "1ddc4288-d7ed-11ea-8b6b-302432eba3ec",
        "PEKIN",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pekingese Mix",
        "1ddcb809-d7ed-11ea-ae9e-302432eba3ec",
        "PEKINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Peruvian Hairless Dog Mix Large",
        "1ddcb80a-d7ed-11ea-b4bc-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Peruvian Hairless Dog Mix medium-sized",
        "1ddcb80b-d7ed-11ea-988e-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Peruvian Hairless Dog Mix miniature",
        "1ddcb80c-d7ed-11ea-9d9e-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Peruvian Hairless Dog Large",
        "1ddc4289-d7ed-11ea-89bc-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Peruvian Hairless Dog medium-sized",
        "1ddc428a-d7ed-11ea-a4b9-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Peruvian Hairless Dog miniature",
        "1ddc428b-d7ed-11ea-80cb-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Peruvian Inca Orchid",
        "746a8486-edf2-11ed-a05b-0242ac120003",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Peruvian Inca Orchid Mix",
        "746a85b2-edf2-11ed-a05b-0242ac120003",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Petit Basset Griffon Vendeen",
        "1ddc428c-d7ed-11ea-ab1a-302432eba3ec",
        "PETBG",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Petit Basset Griffon Vendeen Mix",
        "1ddcb80d-d7ed-11ea-b114-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pharaoh Hound",
        "1ddc428d-d7ed-11ea-bc7b-302432eba3ec",
        "PHAHO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pharaoh Hound Mix",
        "1ddcb80e-d7ed-11ea-9c9a-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Picardy Spaniel",
        "1ddc428e-d7ed-11ea-a51c-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Picardy Spaniel Mix",
        "1ddcb80f-d7ed-11ea-91a9-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pinscher dog",
        "1ddc6997-d7ed-11ea-8858-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pinscher dog Mix",
        "1ddcdf1e-d7ed-11ea-bbc0-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Plott Dog",
        "1ddc428f-d7ed-11ea-9ce4-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Plott Mix",
        "1ddcb810-d7ed-11ea-a70d-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Plummer Terrier",
        "1ddc69b6-d7ed-11ea-85e2-302432eba3ec",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Plummer Terrier Mix",
        "1ddcdf3d-d7ed-11ea-a6d1-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "German Wire-Haired Pointer",
        "1ddc1ba0-d7ed-11ea-9c88-302432eba3ec",
        "POIGW",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poitevin Dog",
        "1ddc4290-d7ed-11ea-8eb8-302432eba3ec",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poitevin Mix",
        "1ddcb811-d7ed-11ea-9c00-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Polish Greyhound",
        "1ddc4291-d7ed-11ea-884b-302432eba3ec",
        "GREYH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Polish Greyhound Mix",
        "1ddcb812-d7ed-11ea-b336-302432eba3ec",
        "GREYX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Polish Hound",
        "1ddc4292-d7ed-11ea-b68f-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Polish Hound Mix",
        "1ddcb813-d7ed-11ea-ae2f-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Polish Hunting Dog",
        "1ddc4293-d7ed-11ea-9ad2-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Polish Hunting Dog Mix",
        "1ddcb814-d7ed-11ea-9473-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Polish Lowland Sheepdog",
        "1ddc4294-d7ed-11ea-bdef-302432eba3ec",
        "PLSHEP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Polish Lowland Sheepdog Mix",
        "1ddcb815-d7ed-11ea-82e0-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Polish Tatra Sheepdog",
        "1ddc69c8-d7ed-11ea-9fd0-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Polish Tatra Sheepdog Mix",
        "1ddcdf4f-d7ed-11ea-a9f2-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pont-Audemer Spaniel",
        "1ddc6969-d7ed-11ea-ba1e-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pont-Audemer Spaniel Mix",
        "1ddcdef0-d7ed-11ea-ade4-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poodle Dog",
        "1ddc4295-d7ed-11ea-8d33-302432eba3ec",
        "POODL",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poodle Mix",
        "1ddcb816-d7ed-11ea-9f4a-302432eba3ec",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poodle Mix Medium",
        "1ddcb817-d7ed-11ea-93ea-302432eba3ec",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poodle Mix Miniature",
        "1ddcb818-d7ed-11ea-b18c-302432eba3ec",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poodle Mix Standard",
        "1ddcb819-d7ed-11ea-8cc5-302432eba3ec",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poodle Mix Toy",
        "1ddcb81a-d7ed-11ea-bcb1-302432eba3ec",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poodle Medium",
        "1ddc4296-d7ed-11ea-b8ad-302432eba3ec",
        "POODL",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poodle Miniature",
        "1ddc4297-d7ed-11ea-969c-302432eba3ec",
        "POOMI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poodle Standard",
        "1ddc4298-d7ed-11ea-97c6-302432eba3ec",
        "POOST",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Poodle Toy",
        "1ddc4299-d7ed-11ea-ae0b-302432eba3ec",
        "POOTO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Porcelain",
        "1ddc429a-d7ed-11ea-b20e-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Porcelain Mix",
        "1ddcb81b-d7ed-11ea-b9e0-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo",
        "1ddc429c-d7ed-11ea-878f-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Mix",
        "1ddcb81c-d7ed-11ea-b9a7-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Mix Small",
        "f694d8b2-7bc1-11eb-bc05-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Mix Smooth-Haired Large",
        "1ddcb81d-d7ed-11ea-87c9-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Mix Smooth-Haired Medium-Sized",
        "1ddcb81e-d7ed-11ea-94c7-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Mix Smooth-Haired Miniature",
        "1ddcb81f-d7ed-11ea-a50e-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Mix Wire-Haired Large",
        "1ddcb820-d7ed-11ea-9ef2-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Mix Wire-Haired Medium-Sized",
        "1ddcb821-d7ed-11ea-bd5c-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Mix Wire-Haired Miniature",
        "1ddcb822-d7ed-11ea-b244-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Miniature",
        "e452cd9c-7bc1-11eb-8966-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Smooth-Haired Large",
        "1ddc429d-d7ed-11ea-bd2b-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Smooth-Haired Medium-Sized",
        "1ddc429e-d7ed-11ea-b0b8-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Smooth-Haired Miniature",
        "1ddc429f-d7ed-11ea-ac17-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Wire-Haired Large",
        "1ddc42a0-d7ed-11ea-90bc-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Wire-Haired Medium-Sized",
        "1ddc42a1-d7ed-11ea-bafc-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Podengo Wire-Haired Miniature",
        "1ddc42a2-d7ed-11ea-93cf-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Pointing Dog",
        "1ddc42a3-d7ed-11ea-b2c8-302432eba3ec",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Pointing Dog Mix",
        "1ddcb823-d7ed-11ea-a4fc-302432eba3ec",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Sheepdog",
        "1ddc42a4-d7ed-11ea-821b-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Sheepdog Mix",
        "1ddcb824-d7ed-11ea-9642-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Water Dog",
        "1ddc42a5-d7ed-11ea-96e5-302432eba3ec",
        "PORWD",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Portuguese Water Dog Mix",
        "1ddcb825-d7ed-11ea-a7d9-302432eba3ec",
        "PORWX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Posavaz Hound",
        "1ddc429b-d7ed-11ea-8735-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Posavaz Hound Mix",
        "8f50c2ca-52a5-11ee-be56-0242ac120002",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Prague Ratter",
        "1ddc42a6-d7ed-11ea-8985-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Prague Ratter Mix",
        "1ddcb826-d7ed-11ea-ab4e-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pudelpointer",
        "1ddc42a7-d7ed-11ea-85b5-302432eba3ec",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pudelpointer Mix",
        "1ddcb827-d7ed-11ea-a4c3-302432eba3ec",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pug Dog",
        "1ddc42a8-d7ed-11ea-8334-302432eba3ec",
        "PUG",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pug Mix",
        "1ddcdebb-d7ed-11ea-8a50-302432eba3ec",
        "PUGX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Puli Dog",
        "1ddc42a9-d7ed-11ea-82f8-302432eba3ec",
        "PULI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Puli Mix",
        "1ddcdebc-d7ed-11ea-b286-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pumi Dog",
        "1ddc42aa-d7ed-11ea-a83b-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pumi Mix",
        "1ddcdebd-d7ed-11ea-856b-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pyrenean Mastiff",
        "1ddc697f-d7ed-11ea-9ca9-302432eba3ec",
        "MASTI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pyrenean Mastiff Mix",
        "1ddcdf05-d7ed-11ea-b6e8-302432eba3ec",
        "MASTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pyrenean Sheepdog",
        "1ddc42ac-d7ed-11ea-bdfa-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pyrenean Sheepdog Mix",
        "1ddcdebf-d7ed-11ea-a1de-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pyrenean Sheepdog Mix Long-haired",
        "1ddcdec0-d7ed-11ea-b737-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pyrenean Sheepdog Mix Smooth-faced",
        "1ddcdec1-d7ed-11ea-8390-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pyrenean Sheepdog Long-haired",
        "1ddc42ad-d7ed-11ea-af23-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pyrenean Sheepdog Smooth-faced",
        "1ddc42ae-d7ed-11ea-b997-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pyrenean Shepherd",
        "1ddc69a7-d7ed-11ea-9fc3-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Pyrenean Shepherd Mix",
        "1ddcdf2e-d7ed-11ea-b26b-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Rafeiro of Alentejo",
        "1ddc42af-d7ed-11ea-9836-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Rafeiro of Alentejo Mix",
        "1ddcdec2-d7ed-11ea-afd4-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Rat Terrier",
        "1ddc69b7-d7ed-11ea-add5-302432eba3ec",
        "RATTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Rat Terrier Mix",
        "1ddcdf3e-d7ed-11ea-854c-302432eba3ec",
        "RATTEX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Redbone Coonhound",
        "ca5c6728-8dc9-11ed-b439-302432eba3ec",
        "REDHO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Redbone Coonhound Mix",
        "ca63f584-8dc9-11ed-a665-302432eba3ec",
        "COONX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Retriever Dog",
        "1ddc69d2-d7ed-11ea-8aa1-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Retriever Dog Mix",
        "1ddd05c5-d7ed-11ea-963b-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Rhodesian Ridgeback",
        "1ddc42b0-d7ed-11ea-861d-302432eba3ec",
        "RHORI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Rhodesian Ridgeback Mix",
        "1ddcdec3-d7ed-11ea-b42f-302432eba3ec",
        "RHORX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Romanian Bucovina Shepherd Dog",
        "1ddc4267-d7ed-11ea-b650-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Romanian Bucovina Shepherd Dog Mix",
        "1ddcb7e7-d7ed-11ea-a268-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Romanian Carpathian Shepherd Dog",
        "1ddc4271-d7ed-11ea-a610-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Romanian Carpathian Shepherd Dog Mix",
        "1ddcb7f1-d7ed-11ea-b3fa-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Romanian Mioritic Shepherd Dog",
        "1ddc42b1-d7ed-11ea-950e-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Romanian Mioritic Shepherd Dog Mix",
        "1ddcdec4-d7ed-11ea-88ab-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Rottweiler Dog",
        "1ddc42b4-d7ed-11ea-93d8-302432eba3ec",
        "ROTTW",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Rottweiler Mix",
        "1ddcdec7-d7ed-11ea-bc61-302432eba3ec",
        "ROTTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Black Terrier",
        "1ddc427a-d7ed-11ea-bae5-302432eba3ec",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Black Terrier Mix",
        "1ddcb7fa-d7ed-11ea-8f84-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Spaniel",
        "1ddc69c0-d7ed-11ea-848e-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Spaniel Mix",
        "1ddcdf47-d7ed-11ea-9f8d-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Spotted Hound",
        "1ddc42b6-d7ed-11ea-a4c0-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Spotted Hound Mix",
        "1ddcdec9-d7ed-11ea-988e-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Toy Mix Long-haired",
        "1ddcdeca-d7ed-11ea-afce-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Toy Mix Smooth-haired",
        "1ddcdecb-d7ed-11ea-9ad4-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Toy Long-haired",
        "1ddc42b7-d7ed-11ea-b67f-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Toy smooth-haired",
        "1ddc42b8-d7ed-11ea-a73c-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Tsvetnaya Bolonka",
        "ca7b6232-8dc9-11ed-bc22-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian Tsvetnaya Bolonka Mix",
        "ca7c9ab4-8dc9-11ed-997d-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian-European LaÃ¯ka",
        "1ddc42b9-d7ed-11ea-9440-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Russian-European LaÃ¯ka Mix",
        "1ddcdecc-d7ed-11ea-8d0e-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saarloos Wolfdog",
        "1ddc42ba-d7ed-11ea-bc34-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saarloos Wolfdog Mix",
        "1ddcdecd-d7ed-11ea-a12a-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saint Bernard Dog",
        "1ddc42bb-d7ed-11ea-9a6a-302432eba3ec",
        "SAIBE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saint Bernard Dog Mix",
        "1ddcdece-d7ed-11ea-8790-302432eba3ec",
        "SAIBX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saint Bernard Dog Mix Long-haired",
        "1ddcdecf-d7ed-11ea-a094-302432eba3ec",
        "SAIBX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saint Bernard Dog Mix Short-haired",
        "1ddcded0-d7ed-11ea-8639-302432eba3ec",
        "SAIBX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saint Bernard Dog Long-haired",
        "1ddc42bc-d7ed-11ea-97d4-302432eba3ec",
        "SAIBE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saint Bernard Dog Short-haired",
        "1ddc42bd-d7ed-11ea-8e0d-302432eba3ec",
        "SAIBE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saint-Usuge Spaniel",
        "1ddc69c1-d7ed-11ea-84aa-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saint-Usuge Spaniel Mix",
        "1ddcdf48-d7ed-11ea-a60f-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saluki Dog",
        "1ddc42be-d7ed-11ea-ae2d-302432eba3ec",
        "SALUK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Saluki Mix",
        "1ddcded1-d7ed-11ea-ba7e-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Samoyed Dog",
        "1ddc42bf-d7ed-11ea-b5b2-302432eba3ec",
        "SAMOY",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Samoyed Mix",
        "1ddcded2-d7ed-11ea-8198-302432eba3ec",
        "SAMOX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Sarabi Dog",
        "8932edd8-63f5-11ec-9db7-7085c2a1b8e0",
        "MASTI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Sarabi Dog Mix",
        "817ce663-63f5-11ec-b68f-7085c2a1b8e0",
        "MASTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Save Valley Scenthound",
        "1ddc42c0-d7ed-11ea-8d21-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Save Valley Scenthound Mix",
        "1ddcded3-d7ed-11ea-827d-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schapendoes",
        "1ddc42c1-d7ed-11ea-950a-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schapendoes Mix",
        "1ddcded4-d7ed-11ea-8701-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schiller Hound",
        "1ddc42c2-d7ed-11ea-bcfe-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schiller Hound Mix",
        "1ddcded5-d7ed-11ea-9fb2-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schipperke",
        "1ddc42c3-d7ed-11ea-aa5e-302432eba3ec",
        "SCHIP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schipperke Mix",
        "1ddcded6-d7ed-11ea-a51c-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schnauzer Dog",
        "1ddc42c5-d7ed-11ea-ab75-302432eba3ec",
        "SCHNA",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schnauzer Mix",
        "1ddcded8-d7ed-11ea-bc36-302432eba3ec",
        "SCHNX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schnauzer Mix Giant",
        "1ddcb79c-d7ed-11ea-851d-302432eba3ec",
        "SCHNX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schnauzer Mix Miniature",
        "1ddcb7f4-d7ed-11ea-ae04-302432eba3ec",
        "SCHNX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schnauzer Mix Standard",
        "1ddcded7-d7ed-11ea-8d92-302432eba3ec",
        "SCHNX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schnauzer Giant",
        "1ddc1ba1-d7ed-11ea-bb48-302432eba3ec",
        "SCHGI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schnauzer Miniature",
        "1ddc4274-d7ed-11ea-9a40-302432eba3ec",
        "SCHMI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schnauzer Standard",
        "1ddc42c4-d7ed-11ea-8421-302432eba3ec",
        "SCHST",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schnoodle",
        "1ddc69d7-d7ed-11ea-8978-302432eba3ec",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Schnoodle Mix",
        "1ddd05ca-d7ed-11ea-bf04-302432eba3ec",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Scottish Deerhound",
        "1ddc42c6-d7ed-11ea-b0fd-302432eba3ec",
        "SCODE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Scottish Deerhound Mix",
        "1ddcded9-d7ed-11ea-a121-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Scottish Terrier",
        "1ddc4281-d7ed-11ea-972a-302432eba3ec",
        "SCOTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Scottish Terrier Mix",
        "1ddcb801-d7ed-11ea-b08f-302432eba3ec",
        "SCOTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Sealyham Terrier",
        "1ddc4287-d7ed-11ea-a606-302432eba3ec",
        "SEATE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Sealyham Terrier Mix",
        "1ddcb808-d7ed-11ea-8ec4-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Segugio Maremmano",
        "1ddc42c9-d7ed-11ea-af79-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Segugio Maremmano Mix",
        "1ddcdedc-d7ed-11ea-aabc-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Serbian Hound",
        "1ddc42ca-d7ed-11ea-92f7-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Serbian Hound Mix",
        "1ddcdedd-d7ed-11ea-9c14-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Serbian Tricolour Hound",
        "1ddc42cb-d7ed-11ea-b67e-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Serbian Tricolour Hound Mix",
        "1ddcdede-d7ed-11ea-830f-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Setter dog",
        "1ddc69cd-d7ed-11ea-b2b1-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Setter dog Mix",
        "1ddd05c0-d7ed-11ea-84e5-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shar Pei",
        "1ddc42cc-d7ed-11ea-9055-302432eba3ec",
        "SHAPE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shar Pei Mix",
        "1ddcdedf-d7ed-11ea-af8d-302432eba3ec",
        "SHAPX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shar Pei Mix Miniature",
        "1ddd05ce-d7ed-11ea-b8a8-302432eba3ec",
        "SHAPX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shar Pei Miniature",
        "1ddc69db-d7ed-11ea-810b-302432eba3ec",
        "SHAPE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shepherd",
        "ca7dd3a7-8dc9-11ed-9b49-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shepherd Mix",
        "ca7f5a44-8dc9-11ed-81a9-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shetland Sheepdog",
        "1ddc42cd-d7ed-11ea-8801-302432eba3ec",
        "SHESH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shetland Sheepdog Mix",
        "1ddcdee0-d7ed-11ea-9fda-302432eba3ec",
        "SHESX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shiba Dog",
        "1ddc42ce-d7ed-11ea-93a8-302432eba3ec",
        "SHIIN",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shiba Mix",
        "1ddcdee1-d7ed-11ea-b863-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shih Tzu",
        "1ddc42cf-d7ed-11ea-a604-302432eba3ec",
        "SHIH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shih Tzu Mix",
        "1ddcdee3-d7ed-11ea-baa0-302432eba3ec",
        "SHITX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shikoku Dog",
        "1ddc42d0-d7ed-11ea-9ccb-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shikoku Mix",
        "1ddcdee4-d7ed-11ea-9946-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shiloh Shepherd",
        "1ddc69a8-d7ed-11ea-b7f7-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Shiloh Shepherd Mix",
        "1ddcdf2f-d7ed-11ea-9972-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Siberian Husky",
        "1ddc42d1-d7ed-11ea-b56e-302432eba3ec",
        "SIBHU",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Siberian Husky Mix",
        "1ddcdee5-d7ed-11ea-ab99-302432eba3ec",
        "SIBHX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Silky Terrier",
        "1ddc69b8-d7ed-11ea-907d-302432eba3ec",
        "SILTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Silky Terrier Mix",
        "1ddcdf3f-d7ed-11ea-8f93-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Skye Terrier",
        "1ddc42b5-d7ed-11ea-a5cc-302432eba3ec",
        "SKYTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Skye Terrier Mix",
        "1ddcdec8-d7ed-11ea-962b-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Sloughi Dog",
        "1ddc42d3-d7ed-11ea-bfa0-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Sloughi Mix",
        "1ddcdee7-d7ed-11ea-adc3-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Slovakian Chuvach",
        "1ddc42d4-d7ed-11ea-b033-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Slovakian Chuvach Mix",
        "1ddcdee8-d7ed-11ea-82dd-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Slovakian Hound",
        "1ddc6962-d7ed-11ea-b3f9-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Slovakian Hound Mix",
        "1ddcdee9-d7ed-11ea-8901-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Slovakian Rough-haired Pointer",
        "1ddc69c4-d7ed-11ea-b61b-302432eba3ec",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Slovakian Rough-haired Pointer Mix",
        "1ddcdf4b-d7ed-11ea-8426-302432eba3ec",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Slovakian Wire-haired Pointer",
        "1ddc6963-d7ed-11ea-a25f-302432eba3ec",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Slovakian Wire-haired Pointer Mix",
        "1ddcdeea-d7ed-11ea-b8b3-302432eba3ec",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Small Blue Gascony Hound",
        "1ddc6965-d7ed-11ea-8264-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Small Blue Gascony Hound Mix",
        "1ddcdeec-d7ed-11ea-8249-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Small Brabant Griffon",
        "1ddc6966-d7ed-11ea-8b42-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Small Brabant Griffon Mix",
        "1ddcdeed-d7ed-11ea-9ed1-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Small MÃ¼nsterlÃ¤nder",
        "1ddc6967-d7ed-11ea-a315-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Small MÃ¼nsterlÃ¤nder Mix",
        "1ddcdeee-d7ed-11ea-8f46-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "SmÃ¥land Hound",
        "1ddc6964-d7ed-11ea-bc68-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "SmÃ¥land Hound Mix",
        "1ddcdeeb-d7ed-11ea-8972-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Soft-Coated Wheaten Terrier",
        "1ddc42c8-d7ed-11ea-85fe-302432eba3ec",
        "WHETS",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Soft-Coated Wheaten Terrier Mix",
        "1ddcdedb-d7ed-11ea-8ac1-302432eba3ec",
        "WHETX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "South Russian Shepherd Dog",
        "1ddc6993-d7ed-11ea-ac8b-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "South Russian Shepherd Dog Mix",
        "1ddcdf19-d7ed-11ea-ab8b-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Spaniel dog",
        "1ddc69c2-d7ed-11ea-9780-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Spaniel dog Mix",
        "1ddcdf49-d7ed-11ea-a267-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Spanish Greyhound",
        "1ddc696a-d7ed-11ea-ab66-302432eba3ec",
        "GREYH",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Spanish Greyhound Mix",
        "1ddcdef1-d7ed-11ea-84fd-302432eba3ec",
        "GREYX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Spanish Hound",
        "1ddc696b-d7ed-11ea-a559-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Spanish Hound Mix",
        "1ddcdef2-d7ed-11ea-b1a5-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Spanish Mastiff",
        "1ddc69ca-d7ed-11ea-ace2-302432eba3ec",
        "MASTI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Spanish Mastiff Mix",
        "1ddd05bd-d7ed-11ea-bbde-302432eba3ec",
        "MASTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Spanish Water Dog",
        "1ddc69c6-d7ed-11ea-aa34-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Spanish Water Dog Mix",
        "1ddcdf4d-d7ed-11ea-ac73-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Sporting Lucas Terrier",
        "1ddc69b9-d7ed-11ea-a4cb-302432eba3ec",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Sporting Lucas Terrier Mix",
        "1ddcdf40-d7ed-11ea-bb68-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "St. Germain Pointing Dog",
        "1ddc696e-d7ed-11ea-b3a1-302432eba3ec",
        "POINT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "St. Germain Pointing Dog Mix",
        "1ddcdef5-d7ed-11ea-acd6-302432eba3ec",
        "POINX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Stabyhoun Dog",
        "1ddc696f-d7ed-11ea-8f4d-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Stabyhoun Mix",
        "1ddcdef6-d7ed-11ea-aefc-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Staffordshire Bull terrier",
        "1ddc42d2-d7ed-11ea-8199-302432eba3ec",
        "STABT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Staffordshire Bull terrier Mix",
        "1ddcdee6-d7ed-11ea-8e55-302432eba3ec",
        "STABX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Styrian Coarse-haired Hound",
        "1ddc6971-d7ed-11ea-8ed9-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Styrian Coarse-haired Hound Mix",
        "1ddcdef8-d7ed-11ea-a318-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Sussex Spaniel",
        "1ddc6972-d7ed-11ea-a454-302432eba3ec",
        "SUSSP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Sussex Spaniel Mix",
        "1ddcdef9-d7ed-11ea-b2d7-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swedish Elkhound",
        "1ddc6973-d7ed-11ea-a476-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swedish Elkhound Mix",
        "1ddcdefa-d7ed-11ea-b038-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swedish Lapphund",
        "1ddc6974-d7ed-11ea-ad90-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swedish Lapphund Mix",
        "1ddcdefb-d7ed-11ea-b40a-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swedish Vallhund",
        "1ddc6975-d7ed-11ea-a23a-302432eba3ec",
        "SPITZ",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swedish Vallhund Mix",
        "1ddcdefc-d7ed-11ea-8d6d-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swedish White Elkhound",
        "1ddc6976-d7ed-11ea-afe5-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swedish White Elkhound Mix",
        "1ddcdefd-d7ed-11ea-b9a4-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swiss Hound",
        "1ddc6977-d7ed-11ea-8be9-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swiss Hound Lucerne Hound Mix",
        "1ddcdefe-d7ed-11ea-92ce-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swiss Hound Mix",
        "ad67768a-71c0-11ed-88d8-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swiss Hound Schwyz Hound Mix",
        "1ddcdeff-d7ed-11ea-8be6-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swiss Hound Lucerne",
        "1ddc6978-d7ed-11ea-9f4b-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Swiss Hound Schwyz",
        "1ddc6979-d7ed-11ea-b24c-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Taiwan Dog",
        "1ddc697a-d7ed-11ea-ac25-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Taiwan Dog Mix",
        "1ddcdf00-d7ed-11ea-9cbc-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tatra Shepherd Dog",
        "1ddc6996-d7ed-11ea-9b04-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tatra Shepherd Dog Mix",
        "1ddcdf1d-d7ed-11ea-9ffa-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Teddy Roosevelt Terrier",
        "1ddc69ba-d7ed-11ea-ab13-302432eba3ec",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Teddy Roosevelt Terrier Mix",
        "1ddcdf41-d7ed-11ea-a781-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tenterfield Terrier",
        "1ddc697c-d7ed-11ea-9409-302432eba3ec",
        "TERRI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tenterfield Terrier Mix",
        "1ddcdf02-d7ed-11ea-874e-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Terceira Mastiff",
        "1ddc69cb-d7ed-11ea-9af9-302432eba3ec",
        "MASTI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Terceira Mastiff Mix",
        "1ddd05be-d7ed-11ea-bf0b-302432eba3ec",
        "MASTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Terrier Mix",
        "081b788d-ba32-11eb-a230-302432eba3e9",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Thai Bangkaew Dog",
        "1ddc697d-d7ed-11ea-8951-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Thai Bangkaew Dog Mix",
        "1ddcdf03-d7ed-11ea-b535-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Thai Ridgeback dog",
        "1ddc697e-d7ed-11ea-818f-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Thai Ridgeback dog Mix",
        "1ddcdf04-d7ed-11ea-a295-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tibetan Mastiff",
        "1ddc69cc-d7ed-11ea-b98a-302432eba3ec",
        "MASTI",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tibetan Mastiff Mix",
        "1ddd05bf-d7ed-11ea-8ce2-302432eba3ec",
        "MASTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tibetan Spaniel",
        "1ddc6980-d7ed-11ea-a24f-302432eba3ec",
        "TIBSP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tibetan Spaniel Mix",
        "1ddcdf06-d7ed-11ea-9b23-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tibetan Terrier",
        "1ddc6981-d7ed-11ea-886e-302432eba3ec",
        "TIBTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tibetan Terrier Mix",
        "1ddcdf07-d7ed-11ea-af00-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tornjak",
        "1ddc6982-d7ed-11ea-b369-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tornjak Mix",
        "1ddcdf08-d7ed-11ea-a4ed-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tosa",
        "1ddc6983-d7ed-11ea-aa80-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tosa Mix",
        "1ddcdf09-d7ed-11ea-bb5e-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Toy Fox Terrier",
        "1ddc69bb-d7ed-11ea-af38-302432eba3ec",
        "FOXTT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Toy Fox Terrier Mix",
        "1ddcdf42-d7ed-11ea-853b-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Toy Manchester Terrier",
        "1ddc69bc-d7ed-11ea-8f54-302432eba3ec",
        "MANTT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Toy Manchester Terrier Mix",
        "1ddcdf43-d7ed-11ea-846d-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Transylvanian Hound",
        "1ddc6984-d7ed-11ea-a170-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Transylvanian Hound Mix",
        "1ddcdf0a-d7ed-11ea-b370-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Treeing Cur",
        "ca886f16-8dc9-11ed-b6c3-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Treeing Cur Mix",
        "ca89a798-8dc9-11ed-b458-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Treeing Feist",
        "746a8a62-edf2-11ed-a05b-0242ac120003",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Treeing Feist Mix",
        "746a8b8e-edf2-11ed-a05b-0242ac120003",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Treeing Tennessee Brindle",
        "ca910f2d-8dc9-11ed-b1cc-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Treeing Tennessee Brindle Mix",
        "ca93802b-8dc9-11ed-905b-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Treeing Walker Coonhound",
        "ca652df1-8dc9-11ed-a041-302432eba3ec",
        "TREWC",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Treeing Walker Coonhound Mix",
        "ca666671-8dc9-11ed-a275-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tyrolean Hound",
        "1ddc6985-d7ed-11ea-af0b-302432eba3ec",
        "HOUND",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Tyrolean Hound Mix",
        "1ddcdf0b-d7ed-11ea-b65a-302432eba3ec",
        "HOUX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Uruguayan Cimarron",
        "1ddc6986-d7ed-11ea-a3c9-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Uruguayan Cimarron Mix",
        "1ddcdf0c-d7ed-11ea-8bba-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Valencian rat hunting dog",
        "c497fcd7-9648-11ec-ba9c-7085c2a1b8e0",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Valencian rat hunting dog Mix",
        "38a5b9cc-4d26-11ee-96f0-106fd9dd20e8",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Volpino Italiano",
        "1ddc6987-d7ed-11ea-872b-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Volpino Italiano Mix",
        "1ddcdf0d-d7ed-11ea-a338-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Weimaraner Mix Long-haired",
        "1ddcdf0e-d7ed-11ea-8282-302432eba3ec",
        "WEIMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Weimaraner Mix Short-haired",
        "1ddcdf0f-d7ed-11ea-872e-302432eba3ec",
        "WEIMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Weimaraner Long-haired",
        "1ddc6988-d7ed-11ea-bbc7-302432eba3ec",
        "WEIMA",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Weimaraner Short-haired",
        "1ddc6989-d7ed-11ea-b877-302432eba3ec",
        "WEIMA",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Corgi",
        "1ddc69d4-d7ed-11ea-9f47-302432eba3ec",
        "WELCO",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Corgi Mix",
        "1ddd05c7-d7ed-11ea-8482-302432eba3ec",
        "WELCX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Corgi Mix Cardigan",
        "1ddcdf10-d7ed-11ea-9dde-302432eba3ec",
        "WELCX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Corgi Mix Pembroke",
        "1ddcdf11-d7ed-11ea-a114-302432eba3ec",
        "WELCX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Corgi Cardigan",
        "1ddc698a-d7ed-11ea-907b-302432eba3ec",
        "WELCC",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Corgi Pembroke",
        "1ddc698b-d7ed-11ea-9282-302432eba3ec",
        "WELCP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Sheepdog",
        "1ddc69c9-d7ed-11ea-9c4e-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Sheepdog Mix",
        "1ddcdf50-d7ed-11ea-8546-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Springer Spaniel",
        "1ddc698c-d7ed-11ea-9cc0-302432eba3ec",
        "SPRSW",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Springer Spaniel Mix",
        "1ddcdf12-d7ed-11ea-a9e6-302432eba3ec",
        "SPRSX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Terrier",
        "1ddc698d-d7ed-11ea-bd8b-302432eba3ec",
        "WELTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Welsh Terrier Mix",
        "1ddcdf13-d7ed-11ea-bf29-302432eba3ec",
        "TERRIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "West Highland White Terrier",
        "1ddc698e-d7ed-11ea-abb6-302432eba3ec",
        "WEHWT",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "West Highland White Terrier Mix",
        "1ddcdf14-d7ed-11ea-b02d-302432eba3ec",
        "WEHWX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "West Siberian LaÃ¯ka",
        "1ddc698f-d7ed-11ea-971b-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "West Siberian LaÃ¯ka Mix",
        "1ddcdf15-d7ed-11ea-a7a5-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Westphalian Dachsbracke",
        "1ddc6990-d7ed-11ea-b0b3-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Westphalian Dachsbracke Mix",
        "1ddcdf16-d7ed-11ea-a585-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Wetterhoun",
        "1ddc6991-d7ed-11ea-a92d-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Wetterhoun Mix",
        "1ddcdf17-d7ed-11ea-868d-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Whippet",
        "1ddc6992-d7ed-11ea-ae01-302432eba3ec",
        "WHIPP",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Whippet Mix",
        "1ddcdf18-d7ed-11ea-b66e-302432eba3ec",
        "WHIPX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "White Shepherd",
        "1ddc69a9-d7ed-11ea-a296-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "White Shepherd Mix",
        "1ddcdf30-d7ed-11ea-8842-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "White Swiss Shepherd Dog",
        "1ddc6999-d7ed-11ea-9fd8-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "White Swiss Shepherd Dog Mix",
        "1ddcdf20-d7ed-11ea-81ac-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Wolf Mix",
        "1ddcdf1a-d7ed-11ea-ab2d-302432eba3ec",
        "WOLHY",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Yakutian Laika",
        "1ddc6994-d7ed-11ea-be75-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Yakutian Laika Mix",
        "1ddcdf1b-d7ed-11ea-b94e-302432eba3ec",
        "MIX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Yorkipoo",
        "1ddc69d5-d7ed-11ea-8f35-302432eba3ec",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Yorkipoo Mix",
        "1ddd05c8-d7ed-11ea-b97e-302432eba3ec",
        "POODX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Yorkshire Terrier",
        "1ddc69aa-d7ed-11ea-bb69-302432eba3ec",
        "YORTE",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Yorkshire Terrier Mix",
        "1ddcdf31-d7ed-11ea-b667-302432eba3ec",
        "YORTX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Yugoslavian Shepherd Dog-Sharplanina",
        "1ddc699a-d7ed-11ea-85bd-302432eba3ec",
        "UNK",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Yugoslavian Shepherd Dog-Sharplanina Mix",
        "1ddcdf21-d7ed-11ea-89ff-302432eba3ec",
        "SHPMX",
        "CANINE",
        "breed",
        "heska"
    ],
    [
        "Dog",
        "36c3cde0-bd6b-11eb-9610-302432eba3e9",
        "DOG",
        null,
        "species",
        "zoetis"
    ],
    [
        "Cat",
        "29944158-bd6b-11eb-8276-302432eba3e9",
        "CAT",
        null,
        "species",
        "zoetis"
    ],
    [
        "Affenpinscher",
        "1ddbf413-d7ed-11ea-87e2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Affenpinscher Mix",
        "1ddc69df-d7ed-11ea-9a16-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Afghan Hound",
        "1ddbf414-d7ed-11ea-8e57-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Afghan Hound Mix",
        "1ddc69e0-d7ed-11ea-8621-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Afghan Shepherd",
        "1ddc699b-d7ed-11ea-9b8c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Afghan Shepherd Mix",
        "1ddcdf22-d7ed-11ea-8a6e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Airedale Terrier",
        "1ddbf415-d7ed-11ea-b281-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Airedale Terrier Mix",
        "1ddc69e1-d7ed-11ea-9c19-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Akbash",
        "1f9348b9-8d3b-11ed-b601-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Akbash Mix",
        "8f50afec-52a5-11ee-be56-0242ac120002",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Alaskan Klee Kai",
        "ca437109-8dc9-11ed-9ceb-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Alaskan Klee Kai Mix",
        "ca45bae3-8dc9-11ed-b01e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Alaskan Malamute",
        "1ddbf416-d7ed-11ea-8f92-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Alaskan Malamute Mix",
        "1ddc69e2-d7ed-11ea-98d3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Alpine Dachsbracke",
        "1ddbf417-d7ed-11ea-9148-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Alpine Dachsbracke Mix",
        "1ddc69e3-d7ed-11ea-9e2a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Akita",
        "1ddbf418-d7ed-11ea-a8a2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Akita Mix",
        "1ddc69e4-d7ed-11ea-8fb6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Bulldog",
        "1ddbf419-d7ed-11ea-971b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Bulldog Mix",
        "1ddc69e5-d7ed-11ea-999d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Cocker Spaniel",
        "1ddbf41a-d7ed-11ea-b0b3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Cocker Spaniel Mix",
        "1ddc69e6-d7ed-11ea-bfe5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Eskimo Dog",
        "1ddbf41b-d7ed-11ea-bff4-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Eskimo Dog Mix",
        "1ddc69e7-d7ed-11ea-8c38-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Foxhound",
        "1ddbf41c-d7ed-11ea-bd3d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Foxhound Mix",
        "1ddc69e8-d7ed-11ea-8c93-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American German Shepherd Dog",
        "1ddbf41f-d7ed-11ea-ab2c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American German Shepherd Dog Mix",
        "1ddc69eb-d7ed-11ea-9454-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Hairless Terrier",
        "1ddc69ab-d7ed-11ea-ae8c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Hairless Terrier Mix",
        "1ddcdf32-d7ed-11ea-a2f3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Indian Dog",
        "746a8ca6-edf2-11ed-a05b-0242ac120003",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Indian Dog Mix",
        "746a8db4-edf2-11ed-a05b-0242ac120003",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Leopard Hound",
        "ca72618a-8dc9-11ed-b20b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Leopard Hound Mix",
        "ca739a06-8dc9-11ed-b0c1-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Pit Bull Terrier",
        "ca836606-8dc9-11ed-ab7b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Pit Bull Terrier Mix",
        "ca849e83-8dc9-11ed-956f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Staffordshire Terrier",
        "1ddbf41d-d7ed-11ea-bdaf-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Staffordshire Terrier Mix",
        "1ddc69e9-d7ed-11ea-9552-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Water Spaniel",
        "1ddbf41e-d7ed-11ea-8345-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "American Water Spaniel Mix",
        "1ddc69ea-d7ed-11ea-af0f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Anatolian Shepherd Dog",
        "1ddc699c-d7ed-11ea-9cb1-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Anatolian Shepherd Dog Mix",
        "1ddcdf23-d7ed-11ea-96ce-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Anglo-FranÃ§ais de Moyen VÃ©nerie",
        "ca4d5c24-8dc9-11ed-bafe-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Anglo-FranÃ§ais de Moyen VÃ©nerie Mix",
        "ca4ebba6-8dc9-11ed-9325-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Anglo-FranÃ§ais de Petite VÃ©nerie",
        "ca946a60-8dc9-11ed-95d3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Anglo-FranÃ§ais de Petite VÃ©nerie Mix",
        "ca95a2e0-8dc9-11ed-bcca-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Appenzell Cattle Dog",
        "1ddbf420-d7ed-11ea-b48a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Appenzell Cattle Dog Mix",
        "1ddc69ec-d7ed-11ea-a2db-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ariege Hound",
        "1ddbf421-d7ed-11ea-950c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ariege Hound Mix",
        "1ddc69ed-d7ed-11ea-82c2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ariege Pointing Dog",
        "1ddbf422-d7ed-11ea-acdb-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ariege Pointing Dog Mix",
        "1ddc69ee-d7ed-11ea-b3e3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Artesian-Norman Basset",
        "1ddbf423-d7ed-11ea-9b30-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Artesian-Norman Basset Mix",
        "1ddc69ef-d7ed-11ea-952e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Artois Hound",
        "1ddbf424-d7ed-11ea-94f6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Artois Hound Mix",
        "1ddc69f0-d7ed-11ea-9ddf-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Atlas Shepherd Dog",
        "1ddbf425-d7ed-11ea-a8fc-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Atlas Shepherd Dog Mix",
        "1ddc69f1-d7ed-11ea-9da4-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Cattle Dog",
        "1ddbf426-d7ed-11ea-ac5b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Cattle Dog Mix",
        "1ddc69f2-d7ed-11ea-b863-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Kelpie",
        "1ddbf427-d7ed-11ea-b2bf-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Kelpie Mix",
        "1ddc69f3-d7ed-11ea-b540-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Shepherd",
        "1ddbf428-d7ed-11ea-8e47-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Shepherd Mix",
        "1ddc69f4-d7ed-11ea-8725-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Silky Terrier",
        "1ddbf429-d7ed-11ea-b05e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Silky Terrier Mix",
        "1ddc69f5-d7ed-11ea-a453-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Stumpy Tail Cattle Dog",
        "1ddbf42a-d7ed-11ea-9fe5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Stumpy Tail Cattle Dog Mix",
        "1ddc69f6-d7ed-11ea-afe0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Terrier",
        "1ddbf42b-d7ed-11ea-bda7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian Terrier Mix",
        "1ddc69f7-d7ed-11ea-8cb7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian working kelpie",
        "1ddbf42c-d7ed-11ea-9660-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Australian working kelpie Mix",
        "1ddc907e-d7ed-11ea-9a10-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Austrian Black and Tan Hound",
        "1ddbf42d-d7ed-11ea-8268-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Austrian Black and Tan Hound Mix",
        "1ddc907f-d7ed-11ea-9111-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Austrian Pinscher",
        "1ddbf42e-d7ed-11ea-8e5c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Austrian Pinscher Mix",
        "1ddc9080-d7ed-11ea-8dc0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Auvergne Pointing Dog",
        "1ddbf42f-d7ed-11ea-ae59-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Auvergne Pointing Dog Mix",
        "1ddc9081-d7ed-11ea-b05d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Azawakh",
        "1ddbf430-d7ed-11ea-9f2f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Azawakh Mix",
        "1ddc9082-d7ed-11ea-bc0b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bosnian Coarse-Haired Hound",
        "1ddbf451-d7ed-11ea-b28b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Barbet",
        "1ddbf431-d7ed-11ea-bde6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Barbet Mix",
        "1ddc9083-d7ed-11ea-aff4-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Basenji",
        "1ddbf432-d7ed-11ea-a3ab-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Basenji Mix",
        "1ddc9084-d7ed-11ea-b8f5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Basque Shepherd Dog",
        "1ddc699d-d7ed-11ea-9cb7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Basque Shepherd Dog Mix",
        "1ddcdf24-d7ed-11ea-aa13-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Basset Griffon Vendeen",
        "1ddc69d1-d7ed-11ea-b72b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Basset Griffon Vendeen Mix",
        "1ddd05c4-d7ed-11ea-a8a8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Basset Hound",
        "1ddbf433-d7ed-11ea-bff4-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Basset Hound Mix",
        "1ddc9085-d7ed-11ea-b6c5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bavarian Mountain Scenthound",
        "1ddbf434-d7ed-11ea-8322-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bavarian Mountain Scenthound Mix",
        "1ddc9086-d7ed-11ea-94ed-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Beagle",
        "1ddbf435-d7ed-11ea-ae96-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Beagle Mix",
        "1ddc9087-d7ed-11ea-a90d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Beagle-Harrier",
        "1ddbf436-d7ed-11ea-80e2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Beagle-Harrier Mix",
        "1ddc9088-d7ed-11ea-bf85-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bearded Collie",
        "1ddbf437-d7ed-11ea-963b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bearded Collie Mix",
        "1ddc9089-d7ed-11ea-8e3b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Beauceron",
        "1ddbf438-d7ed-11ea-bb65-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Beauceron Mix",
        "1ddc908a-d7ed-11ea-986a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bedlington Terrier",
        "1ddbf439-d7ed-11ea-aaf2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bedlington Terrier Mix",
        "1ddc908b-d7ed-11ea-8733-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Griffon",
        "1ddbf43a-d7ed-11ea-85b1-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Griffon Mix",
        "1ddc908c-d7ed-11ea-8cf6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Shepherd Dog",
        "5c24eb8c-d5bd-11ea-83fb-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Shepherd Dog Groenendael",
        "1ddc1b40-d7ed-11ea-aba5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Shepherd Dog Malinois",
        "1ddc4250-d7ed-11ea-beb5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Shepherd Dog Mix",
        "8e4c9d64-e54e-11ed-b5ea-0242ac120002",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Shepherd Dog Mix Tervuren",
        "1ddcdf1f-d7ed-11ea-b2e1-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Shepherd Dog Tervuren",
        "1ddc6998-d7ed-11ea-9afd-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bergamasco Shepherd Dog",
        "1ddbf43b-d7ed-11ea-b8e4-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bergamasco Shepherd Dog Mix",
        "1ddc908d-d7ed-11ea-8a94-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Berger Picard",
        "1ddbf440-d7ed-11ea-a229-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Berger Picard Mix",
        "1ddc9092-d7ed-11ea-a544-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bernadoodle",
        "1ddc69d8-d7ed-11ea-8316-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bernadoodle Mix",
        "1ddd05cb-d7ed-11ea-9d60-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bernese Hound",
        "1ddbf441-d7ed-11ea-b1d3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bernese Hound Mix",
        "1ddc9093-d7ed-11ea-b86f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bernese Mountain Dog",
        "1ddbf442-d7ed-11ea-aa83-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bernese Mountain Dog Mix",
        "1ddc9094-d7ed-11ea-bcc9-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bichon Frise",
        "1ddbf443-d7ed-11ea-9447-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bichon Frise Mix",
        "1ddc9095-d7ed-11ea-91dd-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Biewer Terrier",
        "ca85fe25-8dc9-11ed-bf42-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Biewer Terrier Mix",
        "ca873696-8dc9-11ed-ac76-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Billy",
        "1ddbf444-d7ed-11ea-bd70-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Billy Mix",
        "1ddc9096-d7ed-11ea-9927-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Black Mouth Cur",
        "ca80a707-8dc9-11ed-9265-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Black Mouth Cur Mix",
        "ca820673-8dc9-11ed-8c6d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Elkhound Mix black",
        "1ddcb7fe-d7ed-11ea-9015-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Black Russian Terrier",
        "1ddc69ac-d7ed-11ea-995e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Black Russian Terrier Mix",
        "1ddcdf33-d7ed-11ea-bcd9-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Black and Tan Coonhound",
        "1ddbf445-d7ed-11ea-897f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Black and Tan Coonhound Mix",
        "1ddc9097-d7ed-11ea-a889-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Black and Tan English Toy Terrier",
        "1ddc69ae-d7ed-11ea-b889-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Black and Tan English Toy Terrier Mix",
        "1ddcdf35-d7ed-11ea-aaf7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bloodhound",
        "1ddbf446-d7ed-11ea-a5ec-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bloodhound Mix",
        "1ddc9098-d7ed-11ea-b80d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Blue Gascony Basset",
        "1ddbf447-d7ed-11ea-9336-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Blue Gascony Basset Mix",
        "1ddc9099-d7ed-11ea-bda2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Blue Gascony Griffon",
        "1ddbf448-d7ed-11ea-b2ad-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Blue Gascony Griffon Mix",
        "1ddc909a-d7ed-11ea-9333-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Blue Picardy Spaniel",
        "1ddbf449-d7ed-11ea-8452-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Blue Picardy Spaniel Mix",
        "1ddc909b-d7ed-11ea-8960-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bluetick Coonhound",
        "1ddbf44a-d7ed-11ea-9789-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bluetick Coonhound Mix",
        "1ddc909c-d7ed-11ea-9f4b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Boerboel",
        "746a8044-edf2-11ed-a05b-0242ac120003",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Boerboel Mix",
        "746a8346-edf2-11ed-a05b-0242ac120003",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bohemian Shepherd",
        "1ddbf43c-d7ed-11ea-a955-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bohemian Shepherd Mix",
        "1ddc908e-d7ed-11ea-8d42-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bohemian Wire-haired Pointing Griffon",
        "1ddbf44c-d7ed-11ea-9732-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bohemian Wire-haired Pointing Griffon Mix",
        "1ddc909e-d7ed-11ea-994d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bolognese",
        "1ddbf44d-d7ed-11ea-8b4b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bolognese Mix",
        "1ddc909f-d7ed-11ea-a80e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Border Collie",
        "1ddbf44e-d7ed-11ea-98bb-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Border Collie Mix",
        "1ddc90a0-d7ed-11ea-a8e0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Border Terrier",
        "1ddbf44f-d7ed-11ea-9e94-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Border Terrier Mix",
        "1ddc90a1-d7ed-11ea-965d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Borzoi",
        "1ddbf450-d7ed-11ea-82a1-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Borzoi Mix",
        "1ddc90a2-d7ed-11ea-95de-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bosnian Coarse-Haired Hound Mix",
        "1ddc90a3-d7ed-11ea-a0f5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Boston Terrier",
        "1ddbf452-d7ed-11ea-99a6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Boston Terrier Mix",
        "1ddc90a4-d7ed-11ea-a1b0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bourbonnais Pointing Dog Mix",
        "1ddc90a5-d7ed-11ea-9bd9-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bouvier des Ardennes",
        "1ddbf454-d7ed-11ea-98a3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bouvier des Ardennes Mix",
        "1ddc90a6-d7ed-11ea-a30a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bouvier des Flandres",
        "1ddbf455-d7ed-11ea-9d32-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bouvier des Flandres Mix",
        "1ddc90a7-d7ed-11ea-96be-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Boxer",
        "1ddbf456-d7ed-11ea-bd2a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Boxer Mix",
        "1ddc90a8-d7ed-11ea-a8a3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Boykin Spaniel",
        "1ddc69bf-d7ed-11ea-b64a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Boykin Spaniel Mix",
        "1ddcdf46-d7ed-11ea-889d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bracco Italiano",
        "1ddbf457-d7ed-11ea-9073-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bracco Italiano Mix",
        "1ddc90a9-d7ed-11ea-b995-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bourbonnais Pointing Dog",
        "1ddbf453-d7ed-11ea-a634-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Brazilian Terrier",
        "1ddbf458-d7ed-11ea-b356-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Brazilian Terrier Mix",
        "1ddc90aa-d7ed-11ea-8d4a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Briard",
        "1ddbf459-d7ed-11ea-b67e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Briard Mix",
        "1ddc90ab-d7ed-11ea-b707-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Briquet Griffon Vendeen",
        "1ddc69d0-d7ed-11ea-99f5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Briquet Griffon Vendeen Mix",
        "1ddd05c3-d7ed-11ea-ad9c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Brittany",
        "1ddbf45a-d7ed-11ea-a8bc-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Brittany Mix",
        "1ddc90ac-d7ed-11ea-afc0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Broholmer",
        "1ddbf45b-d7ed-11ea-b8ca-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Broholmer Mix",
        "1ddc90ad-d7ed-11ea-8ad4-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Brussels Griffon",
        "1ddc1b32-d7ed-11ea-af54-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Brussels Griffon Mix",
        "1ddc90ae-d7ed-11ea-8390-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bucovina Shepherd Dog",
        "1ddc699e-d7ed-11ea-a419-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bucovina Shepherd Dog Mix",
        "1ddcdf25-d7ed-11ea-bdf2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bull Terrier Mix Standard",
        "1ddcdef7-d7ed-11ea-93a0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bull Terrier Standard",
        "1ddc6970-d7ed-11ea-aeae-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bullmastiff",
        "1ddc1b34-d7ed-11ea-9dbe-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Bullmastiff Mix",
        "1ddc90b0-d7ed-11ea-937f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Burgos Pointing Dog",
        "1ddc1b35-d7ed-11ea-a1ad-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Burgos Pointing Dog Mix",
        "1ddc90b1-d7ed-11ea-9d66-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cairn Terrier",
        "1ddc1b33-d7ed-11ea-bf8d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cairn Terrier Mix",
        "1ddc90af-d7ed-11ea-b363-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Canaan Dog",
        "1ddc1b37-d7ed-11ea-83b2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Canaan Dog Mix",
        "1ddc90b3-d7ed-11ea-9cb2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Canadian Eskimo Dog",
        "1ddc1b38-d7ed-11ea-90e3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Canadian Eskimo Dog Mix",
        "1ddc90b4-d7ed-11ea-b786-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Canarian Warren Hound",
        "1ddc1b39-d7ed-11ea-92b3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Canarian Warren Hound Mix",
        "1ddc90b5-d7ed-11ea-844d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cane corso",
        "1ddc1b3a-d7ed-11ea-86a8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cane corso Mix",
        "1ddc90b6-d7ed-11ea-945f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cantabrian Water Dog",
        "1ddc69c5-d7ed-11ea-b691-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cantabrian Water Dog Mix",
        "1ddcdf4c-d7ed-11ea-8089-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cao Fila de Sao Miguel",
        "1ddc1b3b-d7ed-11ea-8ff5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cao Fila de Sao Miguel Mix",
        "1ddc90b7-d7ed-11ea-9e57-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Corgi Mix Cardigan",
        "1ddcdf10-d7ed-11ea-9dde-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Carolina Dog",
        "ca4fcd6c-8dc9-11ed-995f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Carolina Dog Mix",
        "ca51a216-8dc9-11ed-8000-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Carpathian Shepherd Dog",
        "1ddc699f-d7ed-11ea-a137-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Carpathian Shepherd Dog Mix",
        "1ddcdf26-d7ed-11ea-9d04-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Castro Laboreiro Dog",
        "1ddc1b3c-d7ed-11ea-ac0e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Castro Laboreiro Dog Mix",
        "1ddc90b8-d7ed-11ea-ad72-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Catahoula Leopard Dog",
        "b3874d6c-1cad-11ec-89c7-302432eba3e9",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Catahoula Leopard Dog Mix",
        "f74b4041-1cad-11ec-8265-302432eba3e9",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Catalan Sheepdog",
        "1ddc1b3d-d7ed-11ea-84f6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Catalan Sheepdog Mix",
        "1ddc90b9-d7ed-11ea-8690-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Caucasian Shepherd Dog",
        "1ddbf43d-d7ed-11ea-92a6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Caucasian Shepherd Dog Mix",
        "1ddc908f-d7ed-11ea-8f44-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cavalier King Charles Spaniel",
        "1ddc1b3f-d7ed-11ea-bae7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cavalier King Charles Spaniel Mix",
        "1ddc90bb-d7ed-11ea-b434-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Central Asia Shepherd Dog",
        "1ddbf43e-d7ed-11ea-b90f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Central Asia Shepherd Dog Mix",
        "1ddc9090-d7ed-11ea-9e75-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cesky Terrier",
        "1ddc1b36-d7ed-11ea-b52a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cesky Terrier Mix",
        "1ddc90b2-d7ed-11ea-a032-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cheasapeake Bay Retriever",
        "1ddc1b42-d7ed-11ea-9fdc-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cheasapeake Bay Retriever Mix",
        "1ddc90be-d7ed-11ea-839c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chihuahua",
        "1ddc1b43-d7ed-11ea-a698-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chihuahua Mix",
        "1ddc90bf-d7ed-11ea-9e65-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chilean Terrier",
        "1ddc69ad-d7ed-11ea-8b38-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chilean Terrier Mix",
        "1ddcdf34-d7ed-11ea-9f45-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chinese Crested",
        "1ddc1b46-d7ed-11ea-9990-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chinese Crested Hairless",
        "1ddc1b47-d7ed-11ea-acf0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chinese Crested Mix",
        "1ddc90c2-d7ed-11ea-ad96-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chinese Crested Powderpuff",
        "1ddc1b48-d7ed-11ea-82ec-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chinook",
        "ca5315e1-8dc9-11ed-90c7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chinook Mix",
        "ca544e63-8dc9-11ed-b87f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chow Chow",
        "1ddc1b49-d7ed-11ea-bcff-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chow Chow Mix",
        "1ddc90c5-d7ed-11ea-af06-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cirneco dell'Etna",
        "1ddc1b4a-d7ed-11ea-b3ff-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cirneco dell'Etna Mix",
        "1ddc90c6-d7ed-11ea-bc36-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Clumber Spaniel",
        "1ddc1b4b-d7ed-11ea-8963-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Clumber Spaniel Mix",
        "1ddc90c7-d7ed-11ea-b1a3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cockapoo",
        "1ddc1b4c-d7ed-11ea-a4ce-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Cockapoo Mix",
        "1ddc90c8-d7ed-11ea-abdf-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Continental Toy Spaniel Mix Papillon",
        "1ddc90cb-d7ed-11ea-ba6f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Continental Toy Spaniel Papillon",
        "1ddc1b4f-d7ed-11ea-90e1-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Coonhound",
        "ca56985b-8dc9-11ed-82da-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Coonhound Mix",
        "ca584877-8dc9-11ed-8c56-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Coton de TulÃ©ar",
        "1ddc1b51-d7ed-11ea-b6e3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Coton de TulÃ©ar Mix",
        "1ddc90cd-d7ed-11ea-a20d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Croatian Sheepdog",
        "1ddc1b52-d7ed-11ea-ac30-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Croatian Sheepdog Mix",
        "1ddc90ce-d7ed-11ea-af7e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Crossbred",
        "1ddc1b53-d7ed-11ea-984b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Crossbred Mix",
        "1ddc90cf-d7ed-11ea-94c4-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Curly Coated Retriever",
        "1ddc1b54-d7ed-11ea-8d0c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Curly Coated Retriever Mix",
        "1ddc90d0-d7ed-11ea-a638-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Czechoslovakian Wolfdog",
        "1ddc1b55-d7ed-11ea-b718-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Czechoslovakian Wolfdog Mix",
        "1ddc90d1-d7ed-11ea-a8a6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund",
        "1ddc1b56-d7ed-11ea-bc76-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix",
        "1ddc90d2-d7ed-11ea-b4fe-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Long-haired Miniature",
        "1ddc1b5d-d7ed-11ea-a14c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dalmatian",
        "1ddc1b63-d7ed-11ea-bd2a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dalmatian Mix",
        "1ddc90df-d7ed-11ea-b529-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dandie Dinmont Terrier",
        "1ddc1b41-d7ed-11ea-84b9-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dandie Dinmont Terrier Mix",
        "1ddc90bd-d7ed-11ea-8021-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Danish-Swedish Farmdog",
        "1ddc1b65-d7ed-11ea-9a4a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Danish-Swedish Farmdog Mix",
        "1ddc90e1-d7ed-11ea-80df-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Deutsch Stichelhaar",
        "746a86d4-edf2-11ed-a05b-0242ac120003",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Deutsch Stichelhaar Mix",
        "746a87f6-edf2-11ed-a05b-0242ac120003",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Doberman Pinscher",
        "1ddc1b66-d7ed-11ea-a1e2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Doberman Pinscher Mix",
        "1ddc90e2-d7ed-11ea-866d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dogo Argentino",
        "1ddc1b67-d7ed-11ea-863d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dogo Argentino Mix",
        "1ddc90e3-d7ed-11ea-913f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dogo Canario",
        "1ddc1b68-d7ed-11ea-8cef-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dogo Canario Mix",
        "1ddc90e4-d7ed-11ea-b1aa-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dogue De Bordeaux",
        "1ddc1b69-d7ed-11ea-ba8a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dogue De Bordeaux Mix",
        "1ddc90e5-d7ed-11ea-a520-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Drentse Partridge Dog",
        "1ddc1b6a-d7ed-11ea-aa9d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Drentse Partridge Dog Mix",
        "1ddc90e6-d7ed-11ea-8f58-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Drever",
        "1ddc1b6b-d7ed-11ea-8ff5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Drever Mix",
        "1ddc90e7-d7ed-11ea-9ff9-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dunker Hound",
        "1ddc1b6c-d7ed-11ea-906e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dunker Hound Mix",
        "1ddc90e8-d7ed-11ea-95d8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dutch Shepherd Dog",
        "1ddc1b96-d7ed-11ea-9a30-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dutch Shepherd Dog Mix",
        "1ddc9112-d7ed-11ea-80bd-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "East European Shepherd",
        "1ddc69a0-d7ed-11ea-9bec-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "East European Shepherd Mix",
        "1ddcdf27-d7ed-11ea-956f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "East Siberian LaÃ¯ka",
        "1ddc1b71-d7ed-11ea-bddd-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "East Siberian LaÃ¯ka Mix",
        "1ddc90ed-d7ed-11ea-b936-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Elo Dog",
        "1ddc1b72-d7ed-11ea-9426-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Elo Mix",
        "1ddc90ee-d7ed-11ea-aaec-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Bulldog",
        "1ddc1b73-d7ed-11ea-9087-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Bulldog Mix",
        "1ddc90ef-d7ed-11ea-821e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Cocker Spaniel",
        "1ddc1b74-d7ed-11ea-b918-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Cocker Spaniel Mix",
        "1ddc90f0-d7ed-11ea-ae7f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Coonhound",
        "ca5980f7-8dc9-11ed-842a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Coonhound Mix",
        "ca5b2ea8-8dc9-11ed-8e17-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Foxhound",
        "1ddc1b75-d7ed-11ea-bd90-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Foxhound Mix",
        "1ddc90f1-d7ed-11ea-a54d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Mastiff",
        "1ddc4264-d7ed-11ea-bb55-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Mastiff Mix",
        "1ddcb7e4-d7ed-11ea-953d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Pointer",
        "1ddc1b76-d7ed-11ea-b737-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Pointer Mix",
        "1ddc90f2-d7ed-11ea-bdbe-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Setter",
        "1ddc1b77-d7ed-11ea-affa-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Setter Mix",
        "1ddc90f3-d7ed-11ea-8375-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Shepherd",
        "1ddc69a1-d7ed-11ea-a897-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Shepherd Mix",
        "1ddcdf28-d7ed-11ea-88d3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Springer Spaniel",
        "1ddc1b78-d7ed-11ea-bff2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Springer Spaniel Mix",
        "1ddc90f4-d7ed-11ea-a835-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Toy Spaniel",
        "1ddc69c3-d7ed-11ea-8a52-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Toy Spaniel Mix",
        "1ddcdf4a-d7ed-11ea-ae4a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Toy Terrier",
        "1ddc1b64-d7ed-11ea-8bb0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "English Toy Terrier Mix",
        "1ddc90e0-d7ed-11ea-aaf9-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Entlebuch Mountain Dog Mix",
        "1ddc90f6-d7ed-11ea-81ab-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Entlebuch Mountain Dog",
        "1ddc1b7a-d7ed-11ea-8a12-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Estonian Hound",
        "1ddc1b7b-d7ed-11ea-8476-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Estonian Hound Mix",
        "1ddc90f7-d7ed-11ea-abe5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Estrela Mountain Dog",
        "1ddc1b7c-d7ed-11ea-af52-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Estrela Mountain Dog Mix",
        "1ddc90f8-d7ed-11ea-af1a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Eurasian",
        "1ddc1b7d-d7ed-11ea-9438-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Eurasian Mix",
        "1ddc90f9-d7ed-11ea-bce8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Landseer Mix European Continental type",
        "1ddcb7de-d7ed-11ea-bd2b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "European German Shepherd Dog",
        "1ddbf44b-d7ed-11ea-a302-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "European German Shepherd Dog Mix",
        "1ddc909d-d7ed-11ea-a1e4-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fawn Brittany Basset",
        "1ddc1b7e-d7ed-11ea-892a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fawn Brittany Basset Mix",
        "1ddc90fa-d7ed-11ea-9f79-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fawn Brittany Griffon",
        "1ddc1b7f-d7ed-11ea-b2ca-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fawn Brittany Griffon Mix",
        "1ddc90fb-d7ed-11ea-be6c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Feist",
        "ca67c600-8dc9-11ed-9a9d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Feist Mix",
        "ca694ca9-8dc9-11ed-87e0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Field Spaniel",
        "1ddc1b80-d7ed-11ea-80f7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Field Spaniel Mix",
        "1ddc90fc-d7ed-11ea-96e6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fila Brasileiro",
        "1ddc1b81-d7ed-11ea-a2c4-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fila Brasileiro Mix",
        "1ddc90fd-d7ed-11ea-a6aa-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Finnish Hound",
        "1ddc1b82-d7ed-11ea-b83d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Finnish Hound Mix",
        "1ddc90fe-d7ed-11ea-99f3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Finnish Lapphund",
        "1ddc1b83-d7ed-11ea-aed7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Finnish Lapphund Mix",
        "1ddc90ff-d7ed-11ea-ade7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Finnish Spitz",
        "1ddc1b84-d7ed-11ea-bf54-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Finnish Spitz Mix",
        "1ddc9100-d7ed-11ea-931b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Flat Coated Retriever",
        "1ddc1b85-d7ed-11ea-aaf3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Flat Coated Retriever Mix",
        "1ddc9101-d7ed-11ea-816d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fox Terrier",
        "1ddc69be-d7ed-11ea-a4b1-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fox Terrier Mix",
        "1ddcdf45-d7ed-11ea-938a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Bulldog",
        "1ddc1b88-d7ed-11ea-a5b0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Bulldog Mix",
        "1ddc9104-d7ed-11ea-a432-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Hound Mix Tricolour",
        "1ddc9109-d7ed-11ea-a51b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Hound Mix White and Black",
        "1ddc910a-d7ed-11ea-99db-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Hound Mix White and Orange",
        "1ddc910b-d7ed-11ea-ac0d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Hound Tricolour",
        "1ddc1b8d-d7ed-11ea-b836-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Hound White and Black",
        "1ddc1b8e-d7ed-11ea-bb6b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Hound White and Orange",
        "1ddc1b8f-d7ed-11ea-bb22-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Pointing Dog",
        "1ddc1b89-d7ed-11ea-bc49-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Pointing Dog Gascogne",
        "1ddc1b8a-d7ed-11ea-b7b0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Pointing Dog Mix",
        "1ddc9105-d7ed-11ea-a81d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Pointing Dog Pyrenean",
        "1ddc1b8b-d7ed-11ea-85db-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Spaniel",
        "1ddc1b8c-d7ed-11ea-aea2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Spaniel Mix",
        "1ddc9108-d7ed-11ea-8a6e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Wire-haired Korthals Pointing Griffon",
        "1ddc1b90-d7ed-11ea-af9a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Wire-haired Korthals Pointing Griffon Mix",
        "1ddc910c-d7ed-11ea-a7e6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Galician Shepherd Dog",
        "1ddc69a2-d7ed-11ea-aaa8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Galician Shepherd Dog Mix",
        "1ddcdf29-d7ed-11ea-8c86-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Garafian Shepherd",
        "1ddc69a3-d7ed-11ea-bf6e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Garafian Shepherd Mix",
        "1ddcdf2a-d7ed-11ea-bfce-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Pointing Dog Mix Gascogne",
        "1ddc9106-d7ed-11ea-8c2b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Gascon Saintongeois",
        "1ddc1b91-d7ed-11ea-aae1-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Gascon Saintongeois Mix",
        "1ddc910d-d7ed-11ea-bbed-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Georgian Shepherd",
        "1ddc69a4-d7ed-11ea-a97e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Georgian Shepherd Mix",
        "1ddcdf2b-d7ed-11ea-afaa-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Hound",
        "1ddc1b92-d7ed-11ea-98b1-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Hound Mix",
        "1ddc910e-d7ed-11ea-97da-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Hunting Terrier",
        "1ddc1b79-d7ed-11ea-96cd-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Hunting Terrier Mix",
        "1ddc90f5-d7ed-11ea-8241-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Long-haired Pointer",
        "1ddc1b94-d7ed-11ea-9193-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Long-haired Pointer Mix",
        "1ddc9110-d7ed-11ea-8bde-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Pinscher",
        "1ddc1b95-d7ed-11ea-abc9-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Pinscher Mix",
        "1ddc9111-d7ed-11ea-be99-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Shepherd Dog",
        "1ddc1b3e-d7ed-11ea-a4cd-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Shepherd Dog Mix",
        "1ddc90ba-d7ed-11ea-881a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Shepherd Dog Mix Short-haired",
        "1ddcdf01-d7ed-11ea-a8b7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Short-haired Pointer",
        "1ddc1b9a-d7ed-11ea-8144-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Short-haired Pointer Mix",
        "1ddcb795-d7ed-11ea-b9cd-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spaniel",
        "1ddc1b9b-d7ed-11ea-a8f4-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spaniel Mix",
        "1ddcb796-d7ed-11ea-8c2e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spitz",
        "1ddc1b9c-d7ed-11ea-86cd-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spitz Gross",
        "1ddc1b9d-d7ed-11ea-ad0d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spitz Mix",
        "1ddcb797-d7ed-11ea-b1da-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spitz Mix Pomeranian",
        "1ddcb79a-d7ed-11ea-a6c8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spitz Mix Gross",
        "1ddcb798-d7ed-11ea-9c42-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spitz Mix Miniature",
        "1ddcb799-d7ed-11ea-ae4b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spitz Mix Mittel",
        "1ddd05c2-d7ed-11ea-a055-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spitz Pomeranian",
        "1ddc1b9f-d7ed-11ea-b60f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spitz Miniature",
        "1ddc1b9e-d7ed-11ea-befd-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Wire-Haired Pointer",
        "1ddc1ba0-d7ed-11ea-9c88-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Wire-Haired Pointer Mix",
        "1ddcb79b-d7ed-11ea-a048-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ghadrejani Dog",
        "0d290cc6-63f8-11ec-9c73-7085c2a1b8e0",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ghadrejani Dog Mix",
        "46578df8-63f8-11ec-a061-7085c2a1b8e0",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Glen of Imaal Terrier",
        "1ddc69af-d7ed-11ea-8977-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Glen of Imaal Terrier Mix",
        "1ddcdf36-d7ed-11ea-a8a9-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Golden Retriever",
        "1ddc1ba2-d7ed-11ea-9c46-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Golden Retriever Mix",
        "1ddcb79d-d7ed-11ea-bf40-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Goldendoodle",
        "734e4977-3bf8-11ec-84ee-7085c2a1b8e0",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Goldendoodle Mix",
        "73c13018-3bf8-11ec-9e98-7085c2a1b8e0",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Gordon Setter",
        "1ddc1ba3-d7ed-11ea-8bd7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Gordon Setter Mix",
        "1ddcb79e-d7ed-11ea-89f5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Grand Basset Griffon Vendeen",
        "1ddc1ba4-d7ed-11ea-8003-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Grand Basset Griffon Vendeen Mix",
        "1ddcb79f-d7ed-11ea-a219-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Grand Griffon Vendeen",
        "1ddc1ba5-d7ed-11ea-b43b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Grand Griffon Vendeen Mix",
        "1ddcb7a0-d7ed-11ea-ae47-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Anglo-French White and Orange Hound",
        "1ddc1ba8-d7ed-11ea-abfa-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Anglo-French Tricolour Hound",
        "1ddc1ba6-d7ed-11ea-9dd0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Anglo-French Tricolour Hound Mix",
        "1ddcb7a1-d7ed-11ea-b895-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Anglo-French White and Black Hound",
        "1ddc1ba7-d7ed-11ea-bb0f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Anglo-French White and Black Hound Mix",
        "1ddcb7a2-d7ed-11ea-846c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Anglo-French White and Orange Hound Mix",
        "1ddcb7a3-d7ed-11ea-8140-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Dane",
        "1ddc1ba9-d7ed-11ea-91ed-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Dane Mix",
        "1ddcb7a4-d7ed-11ea-a49f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Gascony Hound",
        "1ddc1baa-d7ed-11ea-b388-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Gascony Hound Mix",
        "1ddcb7a5-d7ed-11ea-8c85-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Pyrenees Pyrenean Mountain Dog",
        "1ddc1bab-d7ed-11ea-8d0b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Pyrenees Pyrenean Mountain Dog Mix",
        "1ddcb7a6-d7ed-11ea-b751-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Swiss Mountain Dog",
        "1ddc1bac-d7ed-11ea-9da3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Great Swiss Mountain Dog Mix",
        "1ddcb7a7-d7ed-11ea-939c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Greek Shepherd",
        "1ddc69a5-d7ed-11ea-8e81-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Greek Shepherd Mix",
        "1ddcdf2c-d7ed-11ea-bc97-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Greenland Dog",
        "1ddc1bad-d7ed-11ea-aca8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Greenland Dog Mix",
        "1ddcb7a8-d7ed-11ea-96aa-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Elkhound Mix grey",
        "1ddcb7ff-d7ed-11ea-946f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Greyhound",
        "1ddc1bae-d7ed-11ea-bc95-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Greyhound Mix",
        "1ddcb7a9-d7ed-11ea-9ded-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Griffon Nivernais",
        "1ddc1baf-d7ed-11ea-a870-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Griffon Nivernais Mix",
        "1ddcb7aa-d7ed-11ea-8c94-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Shepherd Dog Mix Groenendael",
        "1ddc90bc-d7ed-11ea-acc3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Shepherd Dog Mix Groenendael",
        "7f71a626-7bc2-11eb-930c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Gull Terrier",
        "1ddc69b0-d7ed-11ea-a93c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Gull Terrier Mix",
        "1ddcdf37-d7ed-11ea-a0c0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chinese Crested Mix Hairless",
        "1ddc90c3-d7ed-11ea-94f6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Halden Hound",
        "1ddc1bb0-d7ed-11ea-94f2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Halden Hound Mix",
        "1ddcb7ab-d7ed-11ea-93c0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hamilton Hound",
        "1ddc1bb2-d7ed-11ea-8604-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hamilton Hound Mix",
        "1ddcb7ad-d7ed-11ea-b6ce-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hanoverian Scenthound",
        "1ddc1bb3-d7ed-11ea-b6d2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hanoverian Scenthound Mix",
        "1ddcb7ae-d7ed-11ea-9faa-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Harrier",
        "1ddc1bb4-d7ed-11ea-9a0b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Harrier Mix",
        "1ddcb7af-d7ed-11ea-96ae-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Havanese",
        "1ddc1bb5-d7ed-11ea-89f1-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Havanese Mix",
        "1ddcb7b0-d7ed-11ea-aeea-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hellenic Hound",
        "1ddc1bb6-d7ed-11ea-8092-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hellenic Hound Mix",
        "1ddcb7b1-d7ed-11ea-a749-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Himalayan Sheepdog",
        "1ddc69c7-d7ed-11ea-a196-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Himalayan Sheepdog Mix",
        "1ddcdf4e-d7ed-11ea-a394-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hokkaido",
        "1ddc1bb7-d7ed-11ea-91da-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hokkaido Mix",
        "1ddcb7b2-d7ed-11ea-a4b7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hollandse Smoushond",
        "1ddc1bb8-d7ed-11ea-89f7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hollandse Smoushond Mix",
        "1ddcb7b3-d7ed-11ea-85ba-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hound Dog",
        "ca6d4440-8dc9-11ed-9a90-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hound Dog Mix",
        "ca6e7cfc-8dc9-11ed-89e9-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hovawart",
        "1ddc1bb9-d7ed-11ea-98ed-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hovawart Mix",
        "1ddcb7b4-d7ed-11ea-b446-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hungarian Greyhound",
        "1ddc1bba-d7ed-11ea-9292-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hungarian Greyhound Mix",
        "1ddcb7b5-d7ed-11ea-8f77-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hygen Hound",
        "1ddc1bbd-d7ed-11ea-acf8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hygen Hound Mix",
        "1ddcb7b8-d7ed-11ea-ad4e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "HÃ¤lleforshund",
        "1ddc1bb1-d7ed-11ea-9b75-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "HÃ¤lleforshund Mix",
        "1ddcb7ac-d7ed-11ea-8998-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ibizan Hound",
        "1ddc1bbe-d7ed-11ea-bdd7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ibizan Hound Mix",
        "1ddcb7b9-d7ed-11ea-b9d7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ibizan Hound rough-haired",
        "1ddc1bbf-d7ed-11ea-ac76-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ibizan Hound smooth-haired",
        "1ddc1bc0-d7ed-11ea-a675-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Icelandic Sheepdog",
        "1ddc1bc1-d7ed-11ea-9ecd-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Icelandic Sheepdog Mix",
        "1ddcb7bc-d7ed-11ea-ad3c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Indian Spitz",
        "1ddc69ce-d7ed-11ea-8db4-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Indian Spitz Mix",
        "1ddd05c1-d7ed-11ea-aa54-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Glen of Imaal Terrier",
        "1ddc1b86-d7ed-11ea-ac05-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Glen of Imaal Terrier Mix",
        "1ddc9102-d7ed-11ea-bf52-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Red Setter",
        "1ddc1bc4-d7ed-11ea-b937-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Red Setter Mix",
        "1ddcb7bf-d7ed-11ea-a63e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Red and White Setter",
        "1ddc1bc3-d7ed-11ea-bc0e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Red and White Setter Mix",
        "1ddcb7be-d7ed-11ea-9333-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Softcoated Wheaten Terrier",
        "1ddc1b87-d7ed-11ea-a40b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Softcoated Wheaten Terrier Mix",
        "1ddc9103-d7ed-11ea-aee6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Terrier",
        "1ddc1b93-d7ed-11ea-a2f7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Terrier Mix",
        "1ddc910f-d7ed-11ea-9509-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Water Spaniel",
        "1ddc4241-d7ed-11ea-b745-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Water Spaniel Mix",
        "1ddcb7c2-d7ed-11ea-9b9c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Wolfhound",
        "1ddc4242-d7ed-11ea-9d68-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Irish Wolfhound Mix",
        "1ddcb7c3-d7ed-11ea-ad6e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Istrian Coarse-haired Hound",
        "66935571-8dcb-11ed-9220-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Istrian Coarse-haired Hound Mix",
        "6854db1b-8dcb-11ed-993d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Istrian Shorthaired Hound",
        "ca6fdc9e-8dc9-11ed-acce-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Istrian Shorthaired Hound Mix",
        "ca7101f4-8dc9-11ed-8546-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Italian Greyhound",
        "1ddc4243-d7ed-11ea-9b9f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Italian Greyhound Mix",
        "1ddcb7c4-d7ed-11ea-af8f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Italian Hound Coarse-haired",
        "1ddc4245-d7ed-11ea-8a08-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Italian Hound Mix Coarse-haired",
        "1ddcb7c6-d7ed-11ea-a799-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Italian Hound Mix Short-haired",
        "1ddcb7c5-d7ed-11ea-9649-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Italian Hound Short-haired",
        "1ddc4246-d7ed-11ea-878f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Italian Spinone",
        "1ddc4247-d7ed-11ea-81a9-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Italian Spinone Mix",
        "1ddcb7c7-d7ed-11ea-8dbf-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Jack Russell Terrier",
        "1ddc1bc2-d7ed-11ea-aee5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Jack Russell Terrier Mix",
        "1ddcb7bd-d7ed-11ea-8615-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Jagdterrier dog",
        "1ddc69b1-d7ed-11ea-8a17-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Jagdterrier dog Mix",
        "1ddcdf38-d7ed-11ea-9090-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Japanese Akita",
        "1ddc4249-d7ed-11ea-8de7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Japanese Akita Mix",
        "1ddcb7c9-d7ed-11ea-b6f5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Japanese Chin",
        "1ddc424a-d7ed-11ea-8c8f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Japanese Chin Mix",
        "1ddcb7ca-d7ed-11ea-a8cd-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Japanese Spitz",
        "1ddc424b-d7ed-11ea-9800-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Japanese Spitz Mix",
        "1ddcb7cb-d7ed-11ea-8c3a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Japanese Terrier",
        "1ddc1bc5-d7ed-11ea-86f4-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Japanese Terrier Mix",
        "1ddcb7c0-d7ed-11ea-bf30-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Jura Hound",
        "1ddc424d-d7ed-11ea-a0c6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Jura Hound Mix",
        "1ddcb7cd-d7ed-11ea-a6e5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kai",
        "1ddc424e-d7ed-11ea-aece-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kai Mix",
        "1ddcb7ce-d7ed-11ea-a6ed-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kangal Shepherd Dog",
        "1ddc1b6d-d7ed-11ea-8299-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kangal Shepherd Dog Mix",
        "1ddc90e9-d7ed-11ea-81db-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Karelian Bear Dog",
        "1ddc424f-d7ed-11ea-b268-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Karelian Bear Dog Mix",
        "1ddcb7cf-d7ed-11ea-9d1e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Karst Shepherd Dog",
        "1ddc1b6e-d7ed-11ea-a073-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Karst Shepherd Dog Mix",
        "1ddc90ea-d7ed-11ea-b405-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Keeshond",
        "6761857c-a169-11ec-94b4-7085c2a1b8e0",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Keeshond Mix",
        "c6b49ac4-a169-11ec-8ae8-7085c2a1b8e0",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kerry Blue Terrier",
        "1ddc4240-d7ed-11ea-8b27-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kerry Blue Terrier Mix",
        "1ddcb7c1-d7ed-11ea-b84d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "King Charles Spaniel",
        "1ddc4252-d7ed-11ea-93ca-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "King Charles Spaniel Mix",
        "1ddcb7d2-d7ed-11ea-a41f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "King Shepherd",
        "1ddc69a6-d7ed-11ea-bdb8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "King Shepherd Mix",
        "1ddcdf2d-d7ed-11ea-95fe-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kintamani-Bali Dog",
        "1ddc4253-d7ed-11ea-86e4-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kintamani-Bali Dog Mix",
        "1ddcb7d3-d7ed-11ea-af20-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kishu Ken",
        "1ddc4254-d7ed-11ea-8da4-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kishu Ken Mix",
        "1ddcb7d4-d7ed-11ea-9ab4-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Komondor",
        "1ddc4255-d7ed-11ea-834d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Komondor Mix",
        "1ddcb7d5-d7ed-11ea-8b60-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Korea Jindo Dog",
        "1ddc4256-d7ed-11ea-8001-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Korea Jindo Dog Mix",
        "1ddcb7d6-d7ed-11ea-8630-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "KromfohrlÃ¤nder",
        "1ddc4257-d7ed-11ea-ac19-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "KromfohrlÃ¤nder Mix",
        "1ddcb7d7-d7ed-11ea-90ce-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kumaon Mastiff",
        "1ddc426b-d7ed-11ea-b339-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kumaon Mastiff Mix",
        "1ddcb7eb-d7ed-11ea-b687-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kuvasz",
        "1ddc4258-d7ed-11ea-aa00-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Kuvasz Mix",
        "1ddcb7d8-d7ed-11ea-a0bd-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Labradoodle",
        "1ddc4259-d7ed-11ea-82c1-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Labradoodle Mix",
        "1ddcb7d9-d7ed-11ea-a5e6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Labrador Retriever",
        "1ddc425a-d7ed-11ea-a641-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Labrador Retriever Mix",
        "1ddcb7da-d7ed-11ea-8904-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Shepherd Dog Laekenois",
        "1ddc1b6f-d7ed-11ea-82c8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Shepherd Dog Mix Laekenois",
        "1ddc90eb-d7ed-11ea-8343-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Lagotto romagnolo",
        "1ddc425b-d7ed-11ea-af08-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Lagotto romagnolo Mix",
        "1ddcb7db-d7ed-11ea-8d54-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Lakeland Terrier",
        "1ddc4248-d7ed-11ea-acbb-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Lakeland Terrier Mix",
        "1ddcb7c8-d7ed-11ea-aa89-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Lancashire Heeler",
        "1ddc425d-d7ed-11ea-83ab-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Lancashire Heeler Mix",
        "1ddcb7dd-d7ed-11ea-a3f9-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Landseer European Continental type",
        "1ddc425e-d7ed-11ea-b00b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Lapponian Herder",
        "ca6a8522-8dc9-11ed-9e69-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Lapponian Herder Mix",
        "ca6be4b9-8dc9-11ed-8c89-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Large MÃ¼nsterlander",
        "1ddc4260-d7ed-11ea-af86-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Large MÃ¼nsterlander Mix",
        "1ddcb7e0-d7ed-11ea-9a7b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Peruvian Hairless Dog Mix Large",
        "1ddcb80a-d7ed-11ea-b4bc-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Leonberger",
        "1ddc4261-d7ed-11ea-9b43-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Leonberger Mix",
        "1ddcb7e1-d7ed-11ea-967c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Lhasa Apso",
        "1ddc4262-d7ed-11ea-b52b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Lhasa Apso Mix",
        "1ddcb7e2-d7ed-11ea-9c08-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Majorcan Shepherd Dog long haired",
        "1ddc1b70-d7ed-11ea-b8a0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Majorcan Shepherd Dog Mix long haired",
        "1ddc90ec-d7ed-11ea-a8bf-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chihuahua Long-haired",
        "1ddc1b45-d7ed-11ea-8310-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chihuahua Mix Long-haired",
        "1ddc90c1-d7ed-11ea-96d5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dutch Shepherd Dog Long-haired",
        "1ddc1b97-d7ed-11ea-923a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dutch Shepherd Dog Mix Long-haired",
        "1ddcb792-d7ed-11ea-a1bf-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Shepherd Dog Long-haired",
        "1ddc1b98-d7ed-11ea-a88c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Shepherd Dog Mix Long-haired",
        "1ddcb793-d7ed-11ea-9be3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Long-haired Miniature",
        "1ddc90d9-d7ed-11ea-a19e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pyrenean Sheepdog Long-haired",
        "1ddc42ad-d7ed-11ea-af23-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pyrenean Sheepdog Mix Long-haired",
        "1ddcdec0-d7ed-11ea-b737-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Long-haired Rabbit Hunting",
        "1ddc1b59-d7ed-11ea-a01d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Long-haired Rabbit Hunting",
        "1ddc90d5-d7ed-11ea-af5d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Toy Long-haired",
        "1ddc42b7-d7ed-11ea-b67f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Toy Mix Long-haired",
        "1ddcdeca-d7ed-11ea-afce-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saint Bernard Dog Long-haired",
        "1ddc42bc-d7ed-11ea-97d4-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saint Bernard Dog Mix Long-haired",
        "1ddcdecf-d7ed-11ea-a094-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Long-haired Standard",
        "1ddc1b5c-d7ed-11ea-b8b8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Long-haired Standard",
        "1ddc90d8-d7ed-11ea-8bc8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Weimaraner Long-haired",
        "1ddc6988-d7ed-11ea-bbc7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Weimaraner Mix Long-haired",
        "1ddcdf0e-d7ed-11ea-8282-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "LÃ¶wchen",
        "1ddc4263-d7ed-11ea-b800-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "LÃ¶wchen Mix",
        "1ddcb7e3-d7ed-11ea-a278-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Majorca Mastiff",
        "1ddc4277-d7ed-11ea-a05e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Majorca Mastiff Mix",
        "1ddcb7f7-d7ed-11ea-ad27-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Majorcan Shepherd Dog",
        "1ddc1b99-d7ed-11ea-9375-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Majorcan Shepherd Dog Mix",
        "1ddcb794-d7ed-11ea-87ba-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Belgian Shepherd Dog Mix Malinois",
        "1ddcb7d0-d7ed-11ea-8380-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Maltese",
        "1ddc4268-d7ed-11ea-a936-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Maltese Mix",
        "1ddcb7e8-d7ed-11ea-a103-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Maltipoo",
        "1ddc69d9-d7ed-11ea-be0b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Maltipoo Mix",
        "1ddd05cc-d7ed-11ea-b65a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Manchester Terrier",
        "1ddc424c-d7ed-11ea-801d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Manchester Terrier Mix",
        "1ddcb7cc-d7ed-11ea-9161-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Maremma and Abruzzes Sheepdog",
        "1ddc426a-d7ed-11ea-88ed-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Maremma and Abruzzes Sheepdog Mix",
        "1ddcb7ea-d7ed-11ea-a15e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mastiff Dog",
        "1ddc42ab-d7ed-11ea-a0ad-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mastiff Mix",
        "1ddcdebe-d7ed-11ea-bb62-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Medium Griffon Vendeen",
        "1ddc426c-d7ed-11ea-915c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Medium Griffon Vendeen Mix",
        "1ddcb7ec-d7ed-11ea-8c5b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Medium-Sized Anglo-French Hound",
        "1ddc426d-d7ed-11ea-bfb7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mexican Hairless Dog Mix Medium-Sized",
        "1ddcb7ee-d7ed-11ea-8f7c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Medium-Sized Anglo-French Hound Mix",
        "1ddcb7ed-d7ed-11ea-816b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mexican Hairless Dog",
        "1ddc69d3-d7ed-11ea-8341-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mexican Hairless Dog Medium-Sized",
        "1ddc426e-d7ed-11ea-b3ae-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mexican Hairless Dog Miniature",
        "1ddc426f-d7ed-11ea-9c8b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mexican Hairless Dog Mix",
        "1ddd05c6-d7ed-11ea-b796-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mexican Hairless Dog Mix Miniature",
        "1ddcb7ef-d7ed-11ea-86ca-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mexican Hairless Dog Standard",
        "1ddc4270-d7ed-11ea-a58a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Miniature American Shepherd",
        "1ddc4265-d7ed-11ea-b0d8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Miniature American Shepherd Mix",
        "1ddcb7e5-d7ed-11ea-b653-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Miniature Bull Terrier",
        "1ddc4251-d7ed-11ea-81e8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Miniature Bull Terrier Mix",
        "1ddcb7d1-d7ed-11ea-87f0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Miniature",
        "1ddc1b57-d7ed-11ea-b7c7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Miniature",
        "1ddc90d3-d7ed-11ea-8e4d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Miniature Fox Terrier",
        "1ddc69b2-d7ed-11ea-84e9-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Miniature Fox Terrier Mix",
        "1ddcdf39-d7ed-11ea-9c42-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Miniature Pinscher",
        "1ddc4273-d7ed-11ea-8094-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Miniature Pinscher Mix",
        "1ddcb7f3-d7ed-11ea-8b10-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Miniature",
        "e452cd9c-7bc1-11eb-8966-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shar Pei Miniature",
        "1ddc69db-d7ed-11ea-810b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shar Pei Mix Miniature",
        "1ddd05ce-d7ed-11ea-b8a8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Spitz Mittel",
        "1ddc69cf-d7ed-11ea-8891-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mixed Breed Dog",
        "f689dbd6-9964-11eb-9f44-7085c2a1b8e0",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Montenegrin Mountain Hound",
        "1ddc4275-d7ed-11ea-a1db-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Montenegrin Mountain Hound Mix",
        "1ddcb7f5-d7ed-11ea-a26f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mountain Cur",
        "6d9a2d01-e46f-11ed-978e-106fd9dd20e8",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mountain Cur Mix",
        "8f50bdb6-52a5-11ee-be56-0242ac120002",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mudi Dog",
        "1ddc4276-d7ed-11ea-8add-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mudi Mix",
        "1ddcb7f6-d7ed-11ea-ac99-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Munsterlander",
        "1ddc69dc-d7ed-11ea-9276-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Munsterlander Mix",
        "1ddd05cf-d7ed-11ea-a682-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Neapolitan Mastiff",
        "1ddc696c-d7ed-11ea-9b2b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Neapolitan Mastiff Mix",
        "1ddcdef3-d7ed-11ea-8317-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Nederlandse Kooikerhondje",
        "1ddc4278-d7ed-11ea-a88c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Nederlandse Kooikerhondje Mix",
        "1ddcb7f8-d7ed-11ea-933d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Newfoundland Mix",
        "1ddcb7f9-d7ed-11ea-b401-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Newfoundland",
        "1ddc4279-d7ed-11ea-82e6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norfolk Terrier",
        "1ddc425c-d7ed-11ea-a383-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norfolk Terrier Mix",
        "1ddcb7dc-d7ed-11ea-96ba-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norrbottenspitz",
        "1ddc427b-d7ed-11ea-ad80-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norrbottenspitz Mix",
        "1ddcb7fb-d7ed-11ea-953f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Buhund",
        "1ddc427c-d7ed-11ea-9a91-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Buhund Mix",
        "1ddcb7fc-d7ed-11ea-913d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Elkhound",
        "1ddc427d-d7ed-11ea-a14c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Elkhound Mix",
        "1ddcb7fd-d7ed-11ea-99e6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Elkhound black",
        "1ddc427e-d7ed-11ea-b413-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Elkhound grey",
        "1ddc427f-d7ed-11ea-a23d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Lundehund",
        "1ddc4280-d7ed-11ea-8461-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Lundehund Mix",
        "1ddcb800-d7ed-11ea-930d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwich Terrier",
        "1ddc4269-d7ed-11ea-8292-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Norwich Terrier Mix",
        "1ddcb7e9-d7ed-11ea-811e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Nova Scotia Duck Tolling Retriever",
        "1ddc4282-d7ed-11ea-814b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Nova Scotia Duck Tolling Retriever Mix",
        "1ddcb802-d7ed-11ea-bb8a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Old Danish Pointing Dog",
        "1ddc4283-d7ed-11ea-92db-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Old Danish Pointing Dog Mix",
        "1ddcb803-d7ed-11ea-8d32-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Old English Sheepdog",
        "1ddc4284-d7ed-11ea-9e05-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Old English Sheepdog Mix",
        "1ddcb804-d7ed-11ea-9834-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Old English Terrier",
        "1ddc69b3-d7ed-11ea-b9a5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Old English Terrier Mix",
        "1ddcdf3a-d7ed-11ea-b1db-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Old German Shepherd Dog",
        "1ddc4266-d7ed-11ea-b1f7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Old German Shepherd Dog Mix",
        "1ddcb7e6-d7ed-11ea-9e8f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Other dog Mix",
        "1ddcb806-d7ed-11ea-a5b0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Otterhound",
        "1ddc4286-d7ed-11ea-9d65-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Otterhound Mix",
        "1ddcb807-d7ed-11ea-a36e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Parson Russell Terrier",
        "1ddc69b4-d7ed-11ea-83c6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Parson Russell Terrier Mix",
        "1ddcb7f2-d7ed-11ea-bf46-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Patterdale Terrier",
        "1ddc69b5-d7ed-11ea-b5df-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Patterdale Terrier Mix",
        "1ddcdf3c-d7ed-11ea-ab0d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Peekapoo",
        "1ddc69da-d7ed-11ea-b7c6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Peekapoo Mix",
        "1ddd05cd-d7ed-11ea-8635-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pekingese Dog",
        "1ddc4288-d7ed-11ea-8b6b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pekingese Mix",
        "1ddcb809-d7ed-11ea-ae9e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Corgi Mix Pembroke",
        "1ddcdf11-d7ed-11ea-a114-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Peruvian Hairless Dog Large",
        "1ddc4289-d7ed-11ea-89bc-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Peruvian Hairless Dog Mix medium-sized",
        "1ddcb80b-d7ed-11ea-988e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Peruvian Hairless Dog Mix miniature",
        "1ddcb80c-d7ed-11ea-9d9e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Peruvian Hairless Dog medium-sized",
        "1ddc428a-d7ed-11ea-a4b9-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Peruvian Hairless Dog miniature",
        "1ddc428b-d7ed-11ea-80cb-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Peruvian Inca Orchid",
        "746a8486-edf2-11ed-a05b-0242ac120003",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Peruvian Inca Orchid Mix",
        "746a85b2-edf2-11ed-a05b-0242ac120003",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Petit Basset Griffon Vendeen",
        "1ddc428c-d7ed-11ea-ab1a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Petit Basset Griffon Vendeen Mix",
        "1ddcb80d-d7ed-11ea-b114-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Continental Toy Spaniel PhalÃ¨ne",
        "1ddc1b50-d7ed-11ea-9468-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Continental Toy Spaniel Mix PhalÃ¨ne",
        "1ddc90cc-d7ed-11ea-bd99-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pharaoh Hound",
        "1ddc428d-d7ed-11ea-bc7b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pharaoh Hound Mix",
        "1ddcb80e-d7ed-11ea-9c9a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Picardy Spaniel",
        "1ddc428e-d7ed-11ea-a51c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Picardy Spaniel Mix",
        "1ddcb80f-d7ed-11ea-91a9-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pinscher dog",
        "1ddc6997-d7ed-11ea-8858-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pinscher dog Mix",
        "1ddcdf1e-d7ed-11ea-bbc0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Plott Dog",
        "1ddc428f-d7ed-11ea-9ce4-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Plott Mix",
        "1ddcb810-d7ed-11ea-a70d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Plummer Terrier",
        "1ddc69b6-d7ed-11ea-85e2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Plummer Terrier Mix",
        "1ddcdf3d-d7ed-11ea-a6d1-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poitevin Dog",
        "1ddc4290-d7ed-11ea-8eb8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poitevin Mix",
        "1ddcb811-d7ed-11ea-9c00-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Polish Greyhound",
        "1ddc4291-d7ed-11ea-884b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Polish Greyhound Mix",
        "1ddcb812-d7ed-11ea-b336-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Polish Hound",
        "1ddc4292-d7ed-11ea-b68f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Polish Hound Mix",
        "1ddcb813-d7ed-11ea-ae2f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Polish Hunting Dog",
        "1ddc4293-d7ed-11ea-9ad2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Polish Hunting Dog Mix",
        "1ddcb814-d7ed-11ea-9473-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Polish Lowland Sheepdog",
        "1ddc4294-d7ed-11ea-bdef-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Polish Lowland Sheepdog Mix",
        "1ddcb815-d7ed-11ea-82e0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Polish Tatra Sheepdog",
        "1ddc69c8-d7ed-11ea-9fd0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Polish Tatra Sheepdog Mix",
        "1ddcdf4f-d7ed-11ea-a9f2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pont-Audemer Spaniel",
        "1ddc6969-d7ed-11ea-ba1e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pont-Audemer Spaniel Mix",
        "1ddcdef0-d7ed-11ea-ade4-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poodle Dog",
        "1ddc4295-d7ed-11ea-8d33-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poodle Medium",
        "1ddc4296-d7ed-11ea-b8ad-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poodle Miniature",
        "1ddc4297-d7ed-11ea-969c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poodle Mix",
        "1ddcb816-d7ed-11ea-9f4a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poodle Mix Medium",
        "1ddcb817-d7ed-11ea-93ea-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poodle Mix Miniature",
        "1ddcb818-d7ed-11ea-b18c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poodle Mix Standard",
        "1ddcb819-d7ed-11ea-8cc5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poodle Mix Toy",
        "1ddcb81a-d7ed-11ea-bcb1-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poodle Toy",
        "1ddc4299-d7ed-11ea-ae0b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Porcelain",
        "1ddc429a-d7ed-11ea-b20e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Porcelain Mix",
        "1ddcb81b-d7ed-11ea-b9e0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo",
        "1ddc429c-d7ed-11ea-878f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Mix",
        "1ddcb81c-d7ed-11ea-b9a7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Pointing Dog",
        "1ddc42a3-d7ed-11ea-b2c8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Pointing Dog Mix",
        "1ddcb823-d7ed-11ea-a4fc-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Sheepdog",
        "1ddc42a4-d7ed-11ea-821b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Sheepdog Mix",
        "1ddcb824-d7ed-11ea-9642-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Water Dog",
        "1ddc42a5-d7ed-11ea-96e5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Water Dog Mix",
        "1ddcb825-d7ed-11ea-a7d9-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Posavaz Hound",
        "1ddc429b-d7ed-11ea-8735-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Posavaz Hound Mix",
        "8f50c2ca-52a5-11ee-be56-0242ac120002",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chinese Crested Mix Powderpuff",
        "1ddc90c4-d7ed-11ea-bd2f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Prague Ratter",
        "1ddc42a6-d7ed-11ea-8985-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Prague Ratter Mix",
        "1ddcb826-d7ed-11ea-ab4e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pudelpointer",
        "1ddc42a7-d7ed-11ea-85b5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pudelpointer Mix",
        "1ddcb827-d7ed-11ea-a4c3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pug Dog",
        "1ddc42a8-d7ed-11ea-8334-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pug Mix",
        "1ddcdebb-d7ed-11ea-8a50-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Puli Dog",
        "1ddc42a9-d7ed-11ea-82f8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Puli Mix",
        "1ddcdebc-d7ed-11ea-b286-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pumi Dog",
        "1ddc42aa-d7ed-11ea-a83b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pumi Mix",
        "1ddcdebd-d7ed-11ea-856b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "French Pointing Dog Mix Pyrenean",
        "1ddc9107-d7ed-11ea-9df8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pyrenean Mastiff",
        "1ddc697f-d7ed-11ea-9ca9-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pyrenean Mastiff Mix",
        "1ddcdf05-d7ed-11ea-b6e8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pyrenean Sheepdog",
        "1ddc42ac-d7ed-11ea-bdfa-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pyrenean Sheepdog Mix",
        "1ddcdebf-d7ed-11ea-a1de-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pyrenean Shepherd",
        "1ddc69a7-d7ed-11ea-9fc3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pyrenean Shepherd Mix",
        "1ddcdf2e-d7ed-11ea-b26b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Rabbit Hunting",
        "1ddc1b60-d7ed-11ea-8ba8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Rabbit Hunting",
        "1ddc90dc-d7ed-11ea-a022-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Rafeiro of Alentejo",
        "1ddc42af-d7ed-11ea-9836-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Rafeiro of Alentejo Mix",
        "1ddcdec2-d7ed-11ea-afd4-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Rat Terrier",
        "1ddc69b7-d7ed-11ea-add5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Rat Terrier Mix",
        "1ddcdf3e-d7ed-11ea-854c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Redbone Coonhound",
        "ca5c6728-8dc9-11ed-b439-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Redbone Coonhound Mix",
        "ca63f584-8dc9-11ed-a665-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Retriever Dog",
        "1ddc69d2-d7ed-11ea-8aa1-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Retriever Dog Mix",
        "1ddd05c5-d7ed-11ea-963b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Rhodesian Ridgeback",
        "1ddc42b0-d7ed-11ea-861d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Rhodesian Ridgeback Mix",
        "1ddcdec3-d7ed-11ea-b42f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Romanian Bucovina Shepherd Dog",
        "1ddc4267-d7ed-11ea-b650-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Romanian Bucovina Shepherd Dog Mix",
        "1ddcb7e7-d7ed-11ea-a268-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Romanian Carpathian Shepherd Dog",
        "1ddc4271-d7ed-11ea-a610-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Romanian Carpathian Shepherd Dog Mix",
        "1ddcb7f1-d7ed-11ea-b3fa-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Romanian Mioritic Shepherd Dog",
        "1ddc42b1-d7ed-11ea-950e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Romanian Mioritic Shepherd Dog Mix",
        "1ddcdec4-d7ed-11ea-88ab-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Rottweiler Dog",
        "1ddc42b4-d7ed-11ea-93d8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Rottweiler Mix",
        "1ddcdec7-d7ed-11ea-bc61-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Collie Rough-coated",
        "1ddc1b4d-d7ed-11ea-ae6d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Collie Mix Rough-coated",
        "1ddc90c9-d7ed-11ea-98dc-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dutch Shepherd Dog rough-haired",
        "1ddc42b2-d7ed-11ea-a67e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dutch Shepherd Dog Mix rough-haired",
        "1ddcdec5-d7ed-11ea-82cb-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ibizan Hound Mix rough-haired",
        "1ddcb7ba-d7ed-11ea-94f6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Black Terrier",
        "1ddc427a-d7ed-11ea-bae5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Black Terrier Mix",
        "1ddcb7fa-d7ed-11ea-8f84-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Spaniel",
        "1ddc69c0-d7ed-11ea-848e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Spaniel Mix",
        "1ddcdf47-d7ed-11ea-9f8d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Spotted Hound",
        "1ddc42b6-d7ed-11ea-a4c0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Spotted Hound Mix",
        "1ddcdec9-d7ed-11ea-988e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Tsvetnaya Bolonka",
        "ca7b6232-8dc9-11ed-bc22-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Tsvetnaya Bolonka Mix",
        "ca7c9ab4-8dc9-11ed-997d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian-European LaÃ¯ka",
        "1ddc42b9-d7ed-11ea-9440-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian-European LaÃ¯ka Mix",
        "1ddcdecc-d7ed-11ea-8d0e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saarloos Wolfdog",
        "1ddc42ba-d7ed-11ea-bc34-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saarloos Wolfdog Mix",
        "1ddcdecd-d7ed-11ea-a12a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saint Bernard Dog",
        "1ddc42bb-d7ed-11ea-9a6a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saint Bernard Dog Mix",
        "1ddcdece-d7ed-11ea-8790-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saint-Usuge Spaniel",
        "1ddc69c1-d7ed-11ea-84aa-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saint-Usuge Spaniel Mix",
        "1ddcdf48-d7ed-11ea-a60f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saluki Dog",
        "1ddc42be-d7ed-11ea-ae2d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saluki Mix",
        "1ddcded1-d7ed-11ea-ba7e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Samoyed Dog",
        "1ddc42bf-d7ed-11ea-b5b2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Samoyed Mix",
        "1ddcded2-d7ed-11ea-8198-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Sarabi Dog",
        "8932edd8-63f5-11ec-9db7-7085c2a1b8e0",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Sarabi Dog Mix",
        "817ce663-63f5-11ec-b68f-7085c2a1b8e0",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Save Valley Scenthound",
        "1ddc42c0-d7ed-11ea-8d21-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Save Valley Scenthound Mix",
        "1ddcded3-d7ed-11ea-827d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schapendoes",
        "1ddc42c1-d7ed-11ea-950a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schapendoes Mix",
        "1ddcded4-d7ed-11ea-8701-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schiller Hound",
        "1ddc42c2-d7ed-11ea-bcfe-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schiller Hound Mix",
        "1ddcded5-d7ed-11ea-9fb2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schipperke",
        "1ddc42c3-d7ed-11ea-aa5e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schipperke Mix",
        "1ddcded6-d7ed-11ea-a51c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schnauzer Dog",
        "1ddc42c5-d7ed-11ea-ab75-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schnauzer Giant",
        "1ddc1ba1-d7ed-11ea-bb48-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schnauzer Miniature",
        "1ddc4274-d7ed-11ea-9a40-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schnauzer Mix",
        "1ddcded8-d7ed-11ea-bc36-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schnauzer Mix Giant",
        "1ddcb79c-d7ed-11ea-851d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schnauzer Mix Miniature",
        "1ddcb7f4-d7ed-11ea-ae04-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schnoodle",
        "1ddc69d7-d7ed-11ea-8978-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schnoodle Mix",
        "1ddd05ca-d7ed-11ea-bf04-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swiss Hound Schwyz",
        "1ddc6979-d7ed-11ea-b24c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Scottish Deerhound",
        "1ddc42c6-d7ed-11ea-b0fd-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Scottish Deerhound Mix",
        "1ddcded9-d7ed-11ea-a121-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Scottish Terrier",
        "1ddc4281-d7ed-11ea-972a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Scottish Terrier Mix",
        "1ddcb801-d7ed-11ea-b08f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Sealyham Terrier",
        "1ddc4287-d7ed-11ea-a606-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Sealyham Terrier Mix",
        "1ddcb808-d7ed-11ea-8ec4-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Segugio Maremmano",
        "1ddc42c9-d7ed-11ea-af79-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Segugio Maremmano Mix",
        "1ddcdedc-d7ed-11ea-aabc-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Serbian Hound",
        "1ddc42ca-d7ed-11ea-92f7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Serbian Hound Mix",
        "1ddcdedd-d7ed-11ea-9c14-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Serbian Tricolour Hound",
        "1ddc42cb-d7ed-11ea-b67e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Serbian Tricolour Hound Mix",
        "1ddcdede-d7ed-11ea-830f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Setter dog",
        "1ddc69cd-d7ed-11ea-b2b1-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Setter dog Mix",
        "1ddd05c0-d7ed-11ea-84e5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shar Pei",
        "1ddc42cc-d7ed-11ea-9055-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shar Pei Mix",
        "1ddcdedf-d7ed-11ea-af8d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shepherd",
        "ca7dd3a7-8dc9-11ed-9b49-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shepherd Mix",
        "ca7f5a44-8dc9-11ed-81a9-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shetland Sheepdog",
        "1ddc42cd-d7ed-11ea-8801-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shetland Sheepdog Mix",
        "1ddcdee0-d7ed-11ea-9fda-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shiba Dog",
        "1ddc42ce-d7ed-11ea-93a8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shiba Mix",
        "1ddcdee1-d7ed-11ea-b863-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shih Tzu",
        "1ddc42cf-d7ed-11ea-a604-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shih Tzu Mix",
        "1ddcdee3-d7ed-11ea-baa0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shikoku Dog",
        "1ddc42d0-d7ed-11ea-9ccb-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shikoku Mix",
        "1ddcdee4-d7ed-11ea-9946-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shiloh Shepherd",
        "1ddc69a8-d7ed-11ea-b7f7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Shiloh Shepherd Mix",
        "1ddcdf2f-d7ed-11ea-9972-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Majorcan Shepherd Dog Mix short haired",
        "1ddcdec6-d7ed-11ea-a56a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dutch Shepherd Dog Short-haired",
        "1ddc6968-d7ed-11ea-8a5d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dutch Shepherd Dog Mix Short-haired",
        "1ddcdeef-d7ed-11ea-b9cf-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "German Shepherd Dog Short-haired",
        "1ddc697b-d7ed-11ea-84d5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hungarian Vizsla Short-haired",
        "1ddc1bbb-d7ed-11ea-b0fe-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hungarian Vizsla Mix Short-haired",
        "1ddcb7b6-d7ed-11ea-95b6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Majorcan Shepherd Dog short haired",
        "1ddc42b3-d7ed-11ea-9a90-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saint Bernard Dog Short-haired",
        "1ddc42bd-d7ed-11ea-8e0d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Saint Bernard Dog Mix Short-haired",
        "1ddcded0-d7ed-11ea-8639-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Weimaraner Short-haired",
        "1ddc6989-d7ed-11ea-b877-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Weimaraner Mix Short-haired",
        "1ddcdf0f-d7ed-11ea-872e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Siberian Husky",
        "1ddc42d1-d7ed-11ea-b56e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Siberian Husky Mix",
        "1ddcdee5-d7ed-11ea-ab99-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Silky Terrier",
        "1ddc69b8-d7ed-11ea-907d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Silky Terrier Mix",
        "1ddcdf3f-d7ed-11ea-8f93-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Skye Terrier",
        "1ddc42b5-d7ed-11ea-a5cc-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Skye Terrier Mix",
        "1ddcdec8-d7ed-11ea-962b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Sloughi Dog",
        "1ddc42d3-d7ed-11ea-bfa0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Sloughi Mix",
        "1ddcdee7-d7ed-11ea-adc3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Slovakian Chuvach",
        "1ddc42d4-d7ed-11ea-b033-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Slovakian Chuvach Mix",
        "1ddcdee8-d7ed-11ea-82dd-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Slovakian Hound",
        "1ddc6962-d7ed-11ea-b3f9-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Slovakian Hound Mix",
        "1ddcdee9-d7ed-11ea-8901-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Slovakian Rough-haired Pointer",
        "1ddc69c4-d7ed-11ea-b61b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Slovakian Rough-haired Pointer Mix",
        "1ddcdf4b-d7ed-11ea-8426-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Slovakian Wire-haired Pointer Mix",
        "1ddcdeea-d7ed-11ea-b8b3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Slovakian Wire-haired Pointer",
        "1ddc6963-d7ed-11ea-a25f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Small Blue Gascony Hound",
        "1ddc6965-d7ed-11ea-8264-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Small Blue Gascony Hound Mix",
        "1ddcdeec-d7ed-11ea-8249-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Small Brabant Griffon",
        "1ddc6966-d7ed-11ea-8b42-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Small Brabant Griffon Mix",
        "1ddcdeed-d7ed-11ea-9ed1-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Small MÃ¼nsterlÃ¤nder",
        "1ddc6967-d7ed-11ea-a315-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Small MÃ¼nsterlÃ¤nder Mix",
        "1ddcdeee-d7ed-11ea-8f46-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Mix Small",
        "f694d8b2-7bc1-11eb-bc05-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Mix Smooth-Haired Large",
        "1ddcb81d-d7ed-11ea-87c9-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Smooth-Haired Medium-Sized",
        "1ddc429e-d7ed-11ea-b0b8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Mix Smooth-Haired Medium-Sized",
        "1ddcb81e-d7ed-11ea-94c7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Smooth-Haired Miniature",
        "1ddc429f-d7ed-11ea-ac17-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Mix Smooth-Haired Miniature",
        "1ddcb81f-d7ed-11ea-a50e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Collie Smooth-coated",
        "1ddc1b4e-d7ed-11ea-a6fb-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Collie Mix Smooth-coated",
        "1ddc90ca-d7ed-11ea-9e92-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pyrenean Sheepdog Smooth-faced",
        "1ddc42ae-d7ed-11ea-b997-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Pyrenean Sheepdog Mix Smooth-faced",
        "1ddcdec1-d7ed-11ea-8390-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chihuahua Smooth-haired",
        "1ddc1b44-d7ed-11ea-aef7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Chihuahua Mix Smooth-haired",
        "1ddc90c0-d7ed-11ea-ab9a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fox Terrier smooth",
        "1ddc42c7-d7ed-11ea-bbe4-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fox Terrier Mix smooth",
        "1ddcdeda-d7ed-11ea-a577-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Ibizan Hound Mix smooth-haired",
        "1ddcb7bb-d7ed-11ea-9f54-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Smooth-Haired Large",
        "1ddc429d-d7ed-11ea-bd2b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Smooth-Haired Miniature",
        "1ddc1b5e-d7ed-11ea-8beb-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Smooth-Haired Miniature",
        "1ddc90da-d7ed-11ea-8bd8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Smooth-haired Rabbit Hunting",
        "1ddc1b5a-d7ed-11ea-bce5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Smooth-haired Rabbit Hunting",
        "1ddc90d6-d7ed-11ea-9bbf-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Toy smooth-haired",
        "1ddc42b8-d7ed-11ea-a73c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Russian Toy Mix Smooth-haired",
        "1ddcdecb-d7ed-11ea-9ad4-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Smooth-Haired Standard",
        "1ddc1b61-d7ed-11ea-a93e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Smooth-Haired Standard",
        "1ddc90dd-d7ed-11ea-b5ab-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "SmÃ¥land Hound",
        "1ddc6964-d7ed-11ea-bc68-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "SmÃ¥land Hound Mix",
        "1ddcdeeb-d7ed-11ea-8972-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Soft-Coated Wheaten Terrier",
        "1ddc42c8-d7ed-11ea-85fe-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Soft-Coated Wheaten Terrier Mix",
        "1ddcdedb-d7ed-11ea-8ac1-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "South Russian Shepherd Dog",
        "1ddc6993-d7ed-11ea-ac8b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "South Russian Shepherd Dog Mix",
        "1ddcdf19-d7ed-11ea-ab8b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Spaniel dog",
        "1ddc69c2-d7ed-11ea-9780-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Spaniel dog Mix",
        "1ddcdf49-d7ed-11ea-a267-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Spanish Greyhound",
        "1ddc696a-d7ed-11ea-ab66-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Spanish Greyhound Mix",
        "1ddcdef1-d7ed-11ea-84fd-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Spanish Hound",
        "1ddc696b-d7ed-11ea-a559-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Spanish Hound Mix",
        "1ddcdef2-d7ed-11ea-b1a5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Spanish Mastiff",
        "1ddc69ca-d7ed-11ea-ace2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Spanish Mastiff Mix",
        "1ddd05bd-d7ed-11ea-bbde-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Spanish Water Dog",
        "1ddc69c6-d7ed-11ea-aa34-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Spanish Water Dog Mix",
        "1ddcdf4d-d7ed-11ea-ac73-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Sporting Lucas Terrier",
        "1ddc69b9-d7ed-11ea-a4cb-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Sporting Lucas Terrier Mix",
        "1ddcdf40-d7ed-11ea-bb68-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "St. Germain Pointing Dog",
        "1ddc696e-d7ed-11ea-b3a1-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "St. Germain Pointing Dog Mix",
        "1ddcdef5-d7ed-11ea-acd6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Stabyhoun Dog",
        "1ddc696f-d7ed-11ea-8f4d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Stabyhoun Mix",
        "1ddcdef6-d7ed-11ea-aefc-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Staffordshire Bull terrier",
        "1ddc42d2-d7ed-11ea-8199-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Staffordshire Bull terrier Mix",
        "1ddcdee6-d7ed-11ea-8e55-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Standard",
        "1ddc1b58-d7ed-11ea-a558-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Standard",
        "1ddc90d4-d7ed-11ea-8ff7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Mexican Hairless Dog Mix Standard",
        "1ddcb7f0-d7ed-11ea-8a8d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Poodle Standard",
        "1ddc4298-d7ed-11ea-97c6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schnauzer Standard",
        "1ddc42c4-d7ed-11ea-8421-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Schnauzer Mix Standard",
        "1ddcded7-d7ed-11ea-8d92-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Styrian Coarse-haired Hound",
        "1ddc6971-d7ed-11ea-8ed9-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Styrian Coarse-haired Hound Mix",
        "1ddcdef8-d7ed-11ea-a318-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Sussex Spaniel",
        "1ddc6972-d7ed-11ea-a454-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Sussex Spaniel Mix",
        "1ddcdef9-d7ed-11ea-b2d7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swedish Elkhound",
        "1ddc6973-d7ed-11ea-a476-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swedish Elkhound Mix",
        "1ddcdefa-d7ed-11ea-b038-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swedish Lapphund",
        "1ddc6974-d7ed-11ea-ad90-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swedish Lapphund Mix",
        "1ddcdefb-d7ed-11ea-b40a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swedish Vallhund",
        "1ddc6975-d7ed-11ea-a23a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swedish Vallhund Mix",
        "1ddcdefc-d7ed-11ea-8d6d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swedish White Elkhound",
        "1ddc6976-d7ed-11ea-afe5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swedish White Elkhound Mix",
        "1ddcdefd-d7ed-11ea-b9a4-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swiss Hound",
        "1ddc6977-d7ed-11ea-8be9-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swiss Hound Lucerne",
        "1ddc6978-d7ed-11ea-9f4b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swiss Hound Lucerne Hound Mix",
        "1ddcdefe-d7ed-11ea-92ce-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swiss Hound Mix",
        "ad67768a-71c0-11ed-88d8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Swiss Hound Schwyz Hound Mix",
        "1ddcdeff-d7ed-11ea-8be6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Taiwan Dog",
        "1ddc697a-d7ed-11ea-ac25-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Taiwan Dog Mix",
        "1ddcdf00-d7ed-11ea-9cbc-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tatra Shepherd Dog",
        "1ddc6996-d7ed-11ea-9b04-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tatra Shepherd Dog Mix",
        "1ddcdf1d-d7ed-11ea-9ffa-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Teddy Roosevelt Terrier",
        "1ddc69ba-d7ed-11ea-ab13-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Teddy Roosevelt Terrier Mix",
        "1ddcdf41-d7ed-11ea-a781-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tenterfield Terrier",
        "1ddc697c-d7ed-11ea-9409-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tenterfield Terrier Mix",
        "1ddcdf02-d7ed-11ea-874e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Terceira Mastiff",
        "1ddc69cb-d7ed-11ea-9af9-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Terceira Mastiff Mix",
        "1ddd05be-d7ed-11ea-bf0b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Terrier Mix",
        "081b788d-ba32-11eb-a230-302432eba3e9",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Thai Bangkaew Dog",
        "1ddc697d-d7ed-11ea-8951-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Thai Bangkaew Dog Mix",
        "1ddcdf03-d7ed-11ea-b535-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Thai Ridgeback dog",
        "1ddc697e-d7ed-11ea-818f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Thai Ridgeback dog Mix",
        "1ddcdf04-d7ed-11ea-a295-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tibetan Mastiff",
        "1ddc69cc-d7ed-11ea-b98a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tibetan Mastiff Mix",
        "1ddd05bf-d7ed-11ea-8ce2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tibetan Spaniel",
        "1ddc6980-d7ed-11ea-a24f-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tibetan Spaniel Mix",
        "1ddcdf06-d7ed-11ea-9b23-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tibetan Terrier",
        "1ddc6981-d7ed-11ea-886e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tibetan Terrier Mix",
        "1ddcdf07-d7ed-11ea-af00-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tornjak",
        "1ddc6982-d7ed-11ea-b369-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tornjak Mix",
        "1ddcdf08-d7ed-11ea-a4ed-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tosa",
        "1ddc6983-d7ed-11ea-aa80-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tosa Mix",
        "1ddcdf09-d7ed-11ea-bb5e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Toy Fox Terrier",
        "1ddc69bb-d7ed-11ea-af38-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Toy Fox Terrier Mix",
        "1ddcdf42-d7ed-11ea-853b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Toy Manchester Terrier",
        "1ddc69bc-d7ed-11ea-8f54-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Toy Manchester Terrier Mix",
        "1ddcdf43-d7ed-11ea-846d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Transylvanian Hound",
        "1ddc6984-d7ed-11ea-a170-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Transylvanian Hound Mix",
        "1ddcdf0a-d7ed-11ea-b370-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Treeing Cur",
        "ca886f16-8dc9-11ed-b6c3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Treeing Cur Mix",
        "ca89a798-8dc9-11ed-b458-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Treeing Feist",
        "746a8a62-edf2-11ed-a05b-0242ac120003",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Treeing Feist Mix",
        "746a8b8e-edf2-11ed-a05b-0242ac120003",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Treeing Tennessee Brindle",
        "ca910f2d-8dc9-11ed-b1cc-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Treeing Tennessee Brindle Mix",
        "ca93802b-8dc9-11ed-905b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Treeing Walker Coonhound",
        "ca652df1-8dc9-11ed-a041-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Treeing Walker Coonhound Mix",
        "ca666671-8dc9-11ed-a275-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tyrolean Hound",
        "1ddc6985-d7ed-11ea-af0b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Tyrolean Hound Mix",
        "1ddcdf0b-d7ed-11ea-b65a-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Uruguayan Cimarron",
        "1ddc6986-d7ed-11ea-a3c9-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Uruguayan Cimarron Mix",
        "1ddcdf0c-d7ed-11ea-8bba-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Valencian rat hunting dog",
        "c497fcd7-9648-11ec-ba9c-7085c2a1b8e0",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Valencian rat hunting dog Mix",
        "38a5b9cc-4d26-11ee-96f0-106fd9dd20e8",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Volpino Italiano",
        "1ddc6987-d7ed-11ea-872b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Volpino Italiano Mix",
        "1ddcdf0d-d7ed-11ea-a338-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Corgi",
        "1ddc69d4-d7ed-11ea-9f47-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Corgi Cardigan",
        "1ddc698a-d7ed-11ea-907b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Corgi Mix",
        "1ddd05c7-d7ed-11ea-8482-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Corgi Pembroke",
        "1ddc698b-d7ed-11ea-9282-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Sheepdog",
        "1ddc69c9-d7ed-11ea-9c4e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Sheepdog Mix",
        "1ddcdf50-d7ed-11ea-8546-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Springer Spaniel",
        "1ddc698c-d7ed-11ea-9cc0-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Springer Spaniel Mix",
        "1ddcdf12-d7ed-11ea-a9e6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Terrier",
        "1ddc698d-d7ed-11ea-bd8b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Welsh Terrier Mix",
        "1ddcdf13-d7ed-11ea-bf29-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "West Highland White Terrier",
        "1ddc698e-d7ed-11ea-abb6-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "West Highland White Terrier Mix",
        "1ddcdf14-d7ed-11ea-b02d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "West Siberian LaÃ¯ka",
        "1ddc698f-d7ed-11ea-971b-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "West Siberian LaÃ¯ka Mix",
        "1ddcdf15-d7ed-11ea-a7a5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Westphalian Dachsbracke",
        "1ddc6990-d7ed-11ea-b0b3-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Westphalian Dachsbracke Mix",
        "1ddcdf16-d7ed-11ea-a585-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Wetterhoun",
        "1ddc6991-d7ed-11ea-a92d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Wetterhoun Mix",
        "1ddcdf17-d7ed-11ea-868d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Whippet",
        "1ddc6992-d7ed-11ea-ae01-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Whippet Mix",
        "1ddcdf18-d7ed-11ea-b66e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "White Shepherd",
        "1ddc69a9-d7ed-11ea-a296-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "White Shepherd Mix",
        "1ddcdf30-d7ed-11ea-8842-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "White Swiss Shepherd Dog",
        "1ddc6999-d7ed-11ea-9fd8-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "White Swiss Shepherd Dog Mix",
        "1ddcdf20-d7ed-11ea-81ac-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fox Terrier wire",
        "1ddc6995-d7ed-11ea-9edb-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Fox Terrier Mix wire",
        "1ddcdf1c-d7ed-11ea-88e7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Wire-Haired Large",
        "1ddc42a0-d7ed-11ea-90bc-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Mix Wire-Haired Large",
        "1ddcb820-d7ed-11ea-9ef2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Wire-Haired Medium-Sized",
        "1ddc42a1-d7ed-11ea-bafc-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Mix Wire-Haired Medium-Sized",
        "1ddcb821-d7ed-11ea-bd5c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Wire-Haired Miniature",
        "1ddc42a2-d7ed-11ea-93cf-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Portuguese Podengo Mix Wire-Haired Miniature",
        "1ddcb822-d7ed-11ea-b244-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hungarian Vizsla Wire-haired",
        "1ddc1bbc-d7ed-11ea-b799-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Hungarian Vizsla Mix Wire-haired",
        "1ddcb7b7-d7ed-11ea-956c-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Wire-Haired Miniature",
        "1ddc1b5f-d7ed-11ea-b5d7-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Wire-Haired Miniature",
        "1ddc90db-d7ed-11ea-bcab-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Wire-haired Rabbit Hunting",
        "1ddc1b5b-d7ed-11ea-abd5-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Wire-haired Rabbit Hunting",
        "1ddc90d7-d7ed-11ea-a8ff-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Wire-Haired Standard",
        "1ddc1b62-d7ed-11ea-8bc2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Dachshund Mix Wire-Haired Standard",
        "1ddc90de-d7ed-11ea-94c1-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Wolf Mix",
        "1ddcdf1a-d7ed-11ea-ab2d-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Yakutian Laika",
        "1ddc6994-d7ed-11ea-be75-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Yakutian Laika Mix",
        "1ddcdf1b-d7ed-11ea-b94e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Yorkipoo",
        "1ddc69d5-d7ed-11ea-8f35-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Yorkipoo Mix",
        "1ddd05c8-d7ed-11ea-b97e-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Yorkshire Terrier",
        "1ddc69aa-d7ed-11ea-bb69-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Yorkshire Terrier Mix",
        "1ddcdf31-d7ed-11ea-b667-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Yugoslavian Shepherd Dog-Sharplanina",
        "1ddc699a-d7ed-11ea-85bd-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Yugoslavian Shepherd Dog-Sharplanina Mix",
        "1ddcdf21-d7ed-11ea-89ff-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Canis lupus familiaris",
        "e7e22593-59a3-11eb-85a2-302432eba3ec",
        null,
        "DOG",
        "breed",
        "zoetis"
    ],
    [
        "Unknown Feline",
        "20e0d4fb-d80a-11ea-a1cd-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Abyssinian Cat",
        "1ddd05d2-d7ed-11ea-b586-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Abyssinian Cat Mix",
        "1ddd2cdc-d7ed-11ea-a16a-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Aegean Cat",
        "1ddd05d3-d7ed-11ea-b566-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Aegean Cat Mix",
        "1ddd2cdd-d7ed-11ea-82d5-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Bobtail",
        "1ddd05d4-d7ed-11ea-b144-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Bobtail Mix",
        "1ddd2cde-d7ed-11ea-b856-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Bobtail Shorthair Mix",
        "1ddd2ce0-d7ed-11ea-8c3d-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Curl",
        "1ddd05d7-d7ed-11ea-a2e4-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Curl Mix",
        "1ddd2ce1-d7ed-11ea-b493-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Bobtail Longhair",
        "1ddd05d5-d7ed-11ea-8e87-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Bobtail Longhair Mix",
        "1ddd2cdf-d7ed-11ea-8fde-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Curl Longhair",
        "1ddd05d8-d7ed-11ea-9de2-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Long-haired Purebred cat",
        "1ddd05da-d7ed-11ea-b4a4-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Medium-haired Purebred cat",
        "862eab3c-8dd1-11ed-b123-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Bobtail Shorthair",
        "1ddd05d6-d7ed-11ea-b8df-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Curl Shorthair",
        "1ddd05d9-d7ed-11ea-ab8c-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Curl Shorthair Mix",
        "1ddd2ce3-d7ed-11ea-8bd1-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Short-haired Purebred cat",
        "1ddd05db-d7ed-11ea-84f4-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Wire-haired",
        "1ddd05dc-d7ed-11ea-9e1e-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Wire-haired Mix",
        "1ddd2ce4-d7ed-11ea-a874-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Aphrodite Giant",
        "1ddd05dd-d7ed-11ea-b116-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Aphrodite Giant Mix",
        "1ddd2ce5-d7ed-11ea-9c32-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Arabian Mau",
        "1ddd05de-d7ed-11ea-9ff1-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Arabian Mau Mix",
        "1ddd2ce6-d7ed-11ea-a4f6-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Asian Cat",
        "1ddd05df-d7ed-11ea-9363-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Asian Cat Mix",
        "1ddd2ce7-d7ed-11ea-9189-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Asian Cat Long-haired",
        "1ddd05e0-d7ed-11ea-a96b-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Asian Cat Long-haired Mix",
        "1ddd2ce8-d7ed-11ea-8e1b-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Asian Cat Semi-Long-hair",
        "1ddd05e1-d7ed-11ea-b83f-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Asian Cat Shorthair",
        "1ddd05e2-d7ed-11ea-b49b-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Asian Cat Semi-Long-hair Mix",
        "1ddd2ce9-d7ed-11ea-a80b-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Asian Cat Shorthair Mix",
        "1ddd2cea-d7ed-11ea-8589-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Australian Mist",
        "1ddd05e3-d7ed-11ea-ae8b-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Australian Mist Mix",
        "1ddd2ceb-d7ed-11ea-845b-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Balinese Cat",
        "1ddd05e4-d7ed-11ea-b040-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Balinese Cat Mix",
        "1ddd2cec-d7ed-11ea-8b56-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Bambino Cat",
        "1ddd05e5-d7ed-11ea-8de0-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Bambino Cat Mix",
        "1ddd2ced-d7ed-11ea-8aa0-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Bengal Cat",
        "1ddd05e6-d7ed-11ea-bee1-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Bengal Cat Mix",
        "1ddd2cee-d7ed-11ea-9bc1-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Birman Cat",
        "1ddd05e7-d7ed-11ea-82c5-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Birman Cat Mix",
        "1ddd2cef-d7ed-11ea-9d22-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Ojos Azules",
        "1ddd0623-d7ed-11ea-895d-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Bohemian Rex",
        "1ddd05e8-d7ed-11ea-a2d6-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Bohemian Rex Mix",
        "1ddd2cf0-d7ed-11ea-b0b9-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Bombay Cat",
        "1ddd05e9-d7ed-11ea-8f23-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Bombay Cat Mix",
        "1ddd2cf1-d7ed-11ea-a4e7-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Brazilian Shorthair",
        "1ddd05ea-d7ed-11ea-a5a9-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "British Blue Cat",
        "1ddd05eb-d7ed-11ea-913a-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "British Blue Cat Mix",
        "1ddd2cf2-d7ed-11ea-a1a5-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "British Cat",
        "1ddd05ec-d7ed-11ea-986d-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "British Cat Mix",
        "1ddd2cf3-d7ed-11ea-930a-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "British Longhair",
        "1ddd05ed-d7ed-11ea-92ef-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Burmese Cat",
        "1ddd05ef-d7ed-11ea-93f9-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Burmese Cat Mix",
        "1ddd2cf4-d7ed-11ea-b239-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Burmilla Cat",
        "1ddd05f0-d7ed-11ea-998b-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Burmilla Cat Mix",
        "1ddd2cf5-d7ed-11ea-be59-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "California Spangled",
        "1ddd05f1-d7ed-11ea-bc41-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "California Spangled Mix",
        "1ddd2cf6-d7ed-11ea-ba6e-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Chantilly-Tiffany Cat",
        "1ddd05f2-d7ed-11ea-aabf-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Chantilly-Tiffany Cat Mix",
        "1ddd2cf7-d7ed-11ea-96ec-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Chartreuse Cat",
        "1ddd05f3-d7ed-11ea-b4d2-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Chartreuse Cat Mix",
        "1ddd2cf8-d7ed-11ea-ae0d-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Chausie Cat",
        "1ddd05f4-d7ed-11ea-92d8-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Chausie Cat Mix",
        "1ddd2cf9-d7ed-11ea-a9c2-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Javanese Cat",
        "1ddd0608-d7ed-11ea-9e87-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Colourpoint Shorthair",
        "1ddd05f5-d7ed-11ea-acee-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Colourpoint Shorthair Mix",
        "1ddd2cfa-d7ed-11ea-887e-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Cornish Rex",
        "1ddd05f6-d7ed-11ea-b309-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Cornish Rex Mix",
        "1ddd2cfb-d7ed-11ea-a402-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Crossbred",
        "1ddd05f7-d7ed-11ea-81b2-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Kurilian Bobtail",
        "1ddd0610-d7ed-11ea-a624-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Kurilian Bobtail Mix",
        "1ddd2d15-d7ed-11ea-8507-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Cymric",
        "1ddd05f8-d7ed-11ea-82bd-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Cymric Long-haired Mix",
        "1ddd2cfe-d7ed-11ea-bf3b-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Cymric Mix",
        "1ddd2cfd-d7ed-11ea-be92-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Cyprus Cat",
        "1ddd05fa-d7ed-11ea-b440-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Cyprus Cat Mix",
        "1ddd2cff-d7ed-11ea-9dce-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Devon Rex",
        "1ddd05fb-d7ed-11ea-808d-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Devon Rex Mix",
        "1ddd2d00-d7ed-11ea-82cf-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Felis catus",
        "e7e6443a-59a3-11eb-ae9d-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Domestic Long-haired cat",
        "9a0a77e7-8de7-11ed-af65-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Domestic Medium-haired cat",
        "87a38adf-8de7-11ed-bd5c-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Domestic Short-haired cat",
        "d51f6cb0-8de6-11ed-bfb8-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "British Shorthair",
        "1ddd05ee-d7ed-11ea-98ef-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Donskoy Cat",
        "1ddd05fc-d7ed-11ea-a61c-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Donskoy Cat Mix",
        "1ddd2d01-d7ed-11ea-9b3e-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Dragon Li",
        "1ddd05fd-d7ed-11ea-bb88-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Dragon Li Mix",
        "1ddd2d02-d7ed-11ea-837a-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Dwelf Cat",
        "1ddd05fe-d7ed-11ea-bfaa-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Dwelf Cat Mix",
        "1ddd2d03-d7ed-11ea-94f4-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Egyptian Mau",
        "1ddd05ff-d7ed-11ea-a69f-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Egyptian Mau Mix",
        "1ddd2d04-d7ed-11ea-bd26-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "European Cat",
        "1ddd0600-d7ed-11ea-b17c-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "European Burmese Cat",
        "8e4caf5c-e54e-11ed-b5ea-0242ac120002",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "European Burmese Cat Mix",
        "8e4cb0b0-e54e-11ed-b5ea-0242ac120002",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "European Cat Mix",
        "1ddd2d05-d7ed-11ea-bd40-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "European Shorthair",
        "1ddd0601-d7ed-11ea-8983-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "European Shorthair Mix",
        "1ddd2d06-d7ed-11ea-ae29-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Exotic Cat",
        "8e4cab1a-e54e-11ed-b5ea-0242ac120002",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Exotic Cat Mix",
        "8e4cac82-e54e-11ed-b5ea-0242ac120002",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Crossbred Mix",
        "1ddd2cfc-d7ed-11ea-86db-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Foldex Cat",
        "1ddd0602-d7ed-11ea-8492-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Foldex Cat Mix",
        "1ddd2d07-d7ed-11ea-8a58-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "German Rex",
        "1ddd0603-d7ed-11ea-8a0d-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "German Rex Mix",
        "1ddd2d08-d7ed-11ea-a5d5-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Havana Brown",
        "1ddd0604-d7ed-11ea-8096-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Havana Brown Mix",
        "1ddd2d09-d7ed-11ea-a826-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Highlander Cat",
        "1ddd0605-d7ed-11ea-b271-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Highlander Cat Mix",
        "1ddd2d0a-d7ed-11ea-b415-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Himalayan Cat",
        "1ddd0606-d7ed-11ea-8b63-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Himalayan Cat Mix",
        "1ddd2d0b-d7ed-11ea-b5f9-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Japanese Bobtail",
        "1ddd0607-d7ed-11ea-a085-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Japanese Bobtail Mix",
        "1ddd2d0c-d7ed-11ea-b12d-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Javanese Cat Mix",
        "1ddd2d0d-d7ed-11ea-8715-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Jungle Curl",
        "1ddd0609-d7ed-11ea-a1de-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Jungle Curl Mix",
        "1ddd2d0e-d7ed-11ea-8c03-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Khao Manee",
        "1ddd060a-d7ed-11ea-8d43-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Khao Manee Mix",
        "1ddd2d0f-d7ed-11ea-a842-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Korat Cat",
        "1ddd060b-d7ed-11ea-8925-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Korat Cat Mix",
        "1ddd2d10-d7ed-11ea-98d6-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Korean Bobtail",
        "1ddd060c-d7ed-11ea-9b97-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Korean Bobtail Mix",
        "1ddd2d11-d7ed-11ea-9951-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Korn Ja",
        "1ddd060d-d7ed-11ea-ab9c-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Korn Ja Mix",
        "1ddd2d12-d7ed-11ea-886b-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "LaPerm Cat",
        "1ddd0611-d7ed-11ea-803e-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "LaPerm Longhair",
        "1ddd0612-d7ed-11ea-9789-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "LaPerm Longhair Mix",
        "1ddd2d17-d7ed-11ea-8577-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "LaPerm Cat Mix",
        "1ddd2d16-d7ed-11ea-8aba-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "LaPerm Shorthair",
        "1ddd0613-d7ed-11ea-8a33-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "LaPerm Shorthair Mix",
        "1ddd2d18-d7ed-11ea-90fe-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Modern Siamese Cat",
        "1ddd061b-d7ed-11ea-8580-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "American Curl Longhair Mix",
        "1ddd2ce2-d7ed-11ea-9053-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Cymric Long-haired",
        "1ddd05f9-d7ed-11ea-89d9-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Kurilean Bobtail Long-haired",
        "1ddd060e-d7ed-11ea-b946-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Kurilean Bobtail Long-haired Mix",
        "1ddd2d13-d7ed-11ea-98ec-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Scottish Fold Longhair",
        "1ddd0637-d7ed-11ea-a10f-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Scottish Fold Longhair Mix",
        "1ddd2d3c-d7ed-11ea-8999-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Lykoi Cat",
        "1ddd0614-d7ed-11ea-a797-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Lykoi Cat Mix",
        "1ddd2d19-d7ed-11ea-a769-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Lynx Point Siamese",
        "1ddd0615-d7ed-11ea-b2dc-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Lynx Point Siamese Mix",
        "1ddd2d1a-d7ed-11ea-87f6-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Maine Coon",
        "1ddd0616-d7ed-11ea-b92a-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Maine Coon Mix",
        "1ddd2d1b-d7ed-11ea-8a62-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Manx Cat",
        "1ddd0617-d7ed-11ea-9358-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Manx Cat Mix",
        "1ddd2d1c-d7ed-11ea-a28d-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Mekong Bobtail",
        "1ddd0618-d7ed-11ea-9d7b-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Mekong Bobtail Mix",
        "1ddd2d1d-d7ed-11ea-b6d1-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Minskin Cat",
        "1ddd0619-d7ed-11ea-98b6-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Minskin Cat Mix",
        "1ddd2d1e-d7ed-11ea-82aa-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Modern Persian",
        "1ddd061a-d7ed-11ea-8dd4-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Modern Persian Mix",
        "1ddd2d1f-d7ed-11ea-bc51-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Modern Siamese Cat Mix",
        "1ddd2d20-d7ed-11ea-a835-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Munchkin Cat",
        "1ddd061c-d7ed-11ea-ab32-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Munchkin Cat Mix",
        "1ddd2d21-d7ed-11ea-8979-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Napoleon Cat",
        "1ddd061d-d7ed-11ea-82a3-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Napoleon Cat Mix",
        "1ddd2d22-d7ed-11ea-bc68-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Nebelung Cat",
        "1ddd061f-d7ed-11ea-9bfd-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Nebelung Cat Mix",
        "1ddd2d24-d7ed-11ea-b293-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Neva Masquerade",
        "1ddd0620-d7ed-11ea-b026-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Neva Masquerade Mix",
        "1ddd2d25-d7ed-11ea-a91c-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Forest Cat",
        "1ddd0621-d7ed-11ea-b2bb-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Norwegian Forest Cat Mix",
        "1ddd2d26-d7ed-11ea-9ce1-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Ocicat Cat",
        "1ddd0622-d7ed-11ea-a09e-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Ocicat Cat Mix",
        "1ddd2d27-d7ed-11ea-8dc4-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Ojos Azules Mix",
        "1ddd2d28-d7ed-11ea-b923-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Oregon Rex",
        "1ddd0624-d7ed-11ea-b975-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Oregon Rex Mix",
        "1ddd2d29-d7ed-11ea-b0e4-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Oriental Bicolor",
        "1ddd0625-d7ed-11ea-bcb2-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Oriental Bicolor Mix",
        "1ddd2d2a-d7ed-11ea-b2f7-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Oriental Cat",
        "1ddd0626-d7ed-11ea-ba51-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Oriental Cat Mix",
        "1ddd2d2b-d7ed-11ea-9579-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Oriental Long-haired",
        "1ddd0627-d7ed-11ea-860c-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Oriental Long-haired Mix",
        "1ddd2d2c-d7ed-11ea-9b3a-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Oriental Short-haired",
        "1ddd0628-d7ed-11ea-a861-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Oriental Short-haired Mix",
        "1ddd2d2d-d7ed-11ea-8947-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Persian Cat",
        "1ddd0629-d7ed-11ea-bbc7-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Persian Cat Mix",
        "1ddd2d2e-d7ed-11ea-ae61-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Peterbald Cat",
        "1ddd062a-d7ed-11ea-8941-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Peterbald Cat Mix",
        "1ddd2d2f-d7ed-11ea-a161-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Pixie-bob Cat",
        "1ddd062b-d7ed-11ea-9dbe-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Pixie-bob Cat Mix",
        "1ddd2d30-d7ed-11ea-a1da-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Raas Cat",
        "1ddd062c-d7ed-11ea-99a9-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Raas Cat Mix",
        "1ddd2d31-d7ed-11ea-8b8c-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Ragamuffin Cat",
        "1ddd062d-d7ed-11ea-a4dd-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Ragamuffin Cat Mix",
        "1ddd2d32-d7ed-11ea-921d-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Ragdoll Cat",
        "1ddd062e-d7ed-11ea-adbd-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Ragdoll Cat Mix",
        "1ddd2d33-d7ed-11ea-ae73-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Russian Black",
        "1ddd0630-d7ed-11ea-a733-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Russian Black Mix",
        "1ddd2d35-d7ed-11ea-98cb-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Russian Blue",
        "1ddd0631-d7ed-11ea-8799-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Russian Blue Mix",
        "1ddd2d36-d7ed-11ea-aad8-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Russian Cat",
        "1ddd062f-d7ed-11ea-9a82-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Russian Cat Mix",
        "1ddd2d34-d7ed-11ea-8130-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Russian Tabby",
        "1ddd0632-d7ed-11ea-bcf7-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Russian Tabby Mix",
        "1ddd2d37-d7ed-11ea-9528-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Russian White",
        "1ddd0633-d7ed-11ea-ac8e-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Russian White Mix",
        "1ddd2d38-d7ed-11ea-9cfa-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Sam sawet",
        "1ddd0634-d7ed-11ea-a6ec-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Sam sawet Mix",
        "1ddd2d39-d7ed-11ea-921e-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Savannah Cat",
        "1ddd0635-d7ed-11ea-ac42-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Savannah Cat Mix",
        "1ddd2d3a-d7ed-11ea-9986-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Scottish Fold",
        "1ddd0636-d7ed-11ea-8865-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Scottish Fold Mix",
        "1ddd2d3b-d7ed-11ea-a7fe-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Selkirk Rex",
        "1ddd0639-d7ed-11ea-bd34-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Selkirk Rex Mix",
        "1ddd2d3e-d7ed-11ea-af51-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Serengeti Cat",
        "1ddd063a-d7ed-11ea-946e-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Serengeti Cat Mix",
        "1ddd2d3f-d7ed-11ea-914a-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Serrade Petit",
        "1ddd063b-d7ed-11ea-a2ea-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Serrade Petit Mix",
        "1ddd2d40-d7ed-11ea-9890-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Kurilean Bobtail Short-haired",
        "1ddd060f-d7ed-11ea-bcfc-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Kurilean Bobtail Short-haired Mix",
        "1ddd2d14-d7ed-11ea-a5a5-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Scottish Fold Shorthair",
        "1ddd0638-d7ed-11ea-bea2-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Scottish Fold Shorthair Mix",
        "1ddd2d3d-d7ed-11ea-9954-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Siamese",
        "1ddd063c-d7ed-11ea-a884-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Siamese Mix",
        "1ddd2d41-d7ed-11ea-9289-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Siberian Cat",
        "1ddd063d-d7ed-11ea-974a-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Siberian Cat Mix",
        "1ddd2d42-d7ed-11ea-9a97-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Singapura Cat",
        "1ddd063e-d7ed-11ea-b280-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Singapura Cat Mix",
        "1ddd2d43-d7ed-11ea-86d9-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Snowshoe Cat",
        "1ddd063f-d7ed-11ea-ba3f-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Snowshoe Cat Mix",
        "1ddd2d44-d7ed-11ea-aeb3-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Sokoke Cat",
        "1ddd0640-d7ed-11ea-a020-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Sokoke Cat Mix",
        "1ddd2d45-d7ed-11ea-88e5-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Somali Cat",
        "1ddd0641-d7ed-11ea-96e6-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Somali Cat Mix",
        "1ddd2d46-d7ed-11ea-8529-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "South African Blue Cat",
        "1ddd0642-d7ed-11ea-b06c-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "South African Blue Cat Mix",
        "1ddd2d47-d7ed-11ea-9766-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Sphynx Cat",
        "1ddd0643-d7ed-11ea-b71c-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Sphynx Cat Mix",
        "1ddd2d48-d7ed-11ea-b82b-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Standardized Siamese Cat",
        "1ddd0644-d7ed-11ea-a3a7-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Standardized Siamese Cat Mix",
        "1ddd2d49-d7ed-11ea-ac5c-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Suphalak Cat",
        "1ddd0645-d7ed-11ea-bec8-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Suphalak Cat Mix",
        "1ddd2d4a-d7ed-11ea-863d-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Thai Cat",
        "1ddd0646-d7ed-11ea-80c5-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Tonkinese Cat",
        "1ddd0647-d7ed-11ea-bdb0-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Tonkinese Cat Mix",
        "1ddd2d4c-d7ed-11ea-8040-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Tortie Lynx Point Siamese Cat",
        "1ddd0648-d7ed-11ea-9b9c-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Tortie Lynx Point Siamese Cat Mix",
        "1ddd2d4d-d7ed-11ea-9191-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Tortie Point Siamese",
        "1ddd0649-d7ed-11ea-b8e1-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Tortie Point Siamese Mix",
        "1ddd2d4e-d7ed-11ea-8548-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Toyger Cat",
        "1ddd064a-d7ed-11ea-8ddd-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Toyger Cat Mix",
        "1ddd2d4f-d7ed-11ea-bfb9-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Traditional Persian",
        "1ddd064b-d7ed-11ea-a430-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Traditional Persian Mix",
        "1ddd2d50-d7ed-11ea-a782-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Thai Cat Mix",
        "1ddd2d4b-d7ed-11ea-bdcb-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Turkish Angora",
        "1ddd064c-d7ed-11ea-9418-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Turkish Angora Mix",
        "1ddd2d51-d7ed-11ea-8bba-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Turkish Van",
        "1ddd064d-d7ed-11ea-8d05-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Turkish Van Mix",
        "1ddd2d52-d7ed-11ea-b41d-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Ukrainian Levkoy",
        "1ddd2cd9-d7ed-11ea-8805-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Ukrainian Levkoy Mix",
        "1ddd2d53-d7ed-11ea-81f6-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Wila Krungthep",
        "1ddd2cda-d7ed-11ea-ac89-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "Wila Krungthep Mix",
        "1ddd2d54-d7ed-11ea-86c0-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "York Chocolate",
        "1ddd2cdb-d7ed-11ea-b8b9-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ],
    [
        "York Chocolate Mix",
        "1ddd2d55-d7ed-11ea-9f4c-302432eba3ec",
        null,
        "CAT",
        "breed",
        "zoetis"
    ]
]
export class MapAPIRef1696004970920 implements MigrationInterface {

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM `provider_ref`')
        await queryRunner.query('DELETE FROM `ref`')
        await queryRunner.query("ALTER TABLE provider_ref MODIFY COLUMN code VARCHAR(255) NULL")
        let ref
        const uniqueCodes = new Set<string>()

        for (const ref of refs) {
            await queryRunner.query(`INSERT INTO \`ref\` (\`id\`, \`name\`, \`code\`, \`species\`, \`type\`)
                  VALUES (?, ?, ?, ?, ?)`, [ref.id, ref.name, ref.code, ref.species, ref.type])
            uniqueCodes.add(ref.code)
        }
        for (const providerRef of providerRefs) {
            await queryRunner.query(`INSERT INTO \`provider_ref\` (\`id\`, \`code\`, \`name\`, \`species\`, \`type\`, \`provider\`, \`refId\`)
                  VALUES (?, ?, ?, ?, ?, ?, ?)`, [providerRef.id, providerRef.code, providerRef.name, providerRef.species, providerRef.type, providerRef.provider, providerRef.ref])
        }

        for (const line of mappings) {
            const [name, APICode, code, species, type, provider] = line
            if (!APICode) continue
            const trimmedProvider = provider ? provider.replace(/\n/g, '').trim() : ''
            if (!uniqueCodes.has(APICode)) {
                uniqueCodes.add(APICode)
                const formattedRef = {
                    name: name,
                    code: APICode,
                    species: mapSpecies(species),
                    type: 'breed',
                }
                const newBreed = await queryRunner.query(`INSERT INTO \`ref\` (\`name\`, \`code\`, \`species\`, \`type\`)
                  VALUES (?, ?, ?, ?)`, [formattedRef.name, formattedRef.code, formattedRef.species, formattedRef.type])
                ref = newBreed.insertId
            } else {
                const existingBreed = await queryRunner.query('SELECT `id` FROM `ref` WHERE `code` = ?',
                    [APICode])
                ref = existingBreed[0].id
            }
            await queryRunner.query(`
            INSERT INTO provider_ref (name, code, species, type, provider, refId)
            VALUES (?, ?, ?, ?, ?, ?)`, [name, code, species, type, trimmedProvider, ref])
        }

        function mapSpecies (species: string | number | null) {
            if (species === '41' || species === 'CANINE' || species === 'DOG') {
                return '36c3cde0-bd6b-11eb-9610-302432eba3e9'
            } else if (species === '42' || species === 'FELINE' || species === 'CAT') {
                return '29944158-bd6b-11eb-8276-302432eba3e9'
            }
        }
    }


    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM `provider_ref`')
        await queryRunner.query('DELETE FROM `ref`')
        await queryRunner.query("ALTER TABLE provider_ref MODIFY COLUMN code VARCHAR(255) NOT NULL")
    }
}
