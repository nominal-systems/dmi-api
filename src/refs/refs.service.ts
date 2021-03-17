import { Injectable } from '@nestjs/common'

@Injectable()
export class RefsService {
  async getDataStatus () {
    return {
      genders:
        '3C9D81688CB8DCA51997239264F7073706A3B827649B1F0390FA2F771D5ACA38',
      species:
        '3C9D81688CB8DCA51997239264F7073706A3B827649B1F0390FA2F771D5ACA38',
      breeds:
        '3C9D81688CB8DCA51997239264F7073706A3B827649B1F0390FA2F771D5ACA38',
    }
  }

  async getBreeds () {
    return {
      items: [
        {
          id: 'GERMAN_SHEPHERD',
          name: 'German Shepherd',
          speciesId: 'CANIS_LUPUS',
        },
        {
          id: 'SHIBA_INU',
          name: 'Shiba Inu',
          speciesId: 'CANIS_LUPUS',
        },
        {
          id: 'BRITISH_SHORTHAIR',
          name: 'British Shorthair',
          speciesId: 'FELIS_CATUS',
        },
        {
          id: 'SIAMESE',
          name: 'Siamese',
          speciesId: 'FELIS_CATUS',
        },
      ],
      hash: 'MowjFjNaDxyCSxBwyowM0AMN0Q4MDwMN',
    }
  }

  async getGenders () {
    return {
      items: [
        {
          id: 'MALE_INTACT',
          name: 'Male',
        },
        {
          id: 'FEMALE_INTACT',
          name: 'Female',
        },
        {
          id: 'UNKNOWN',
          name: 'Unknown',
        },
        {
          id: 'MALE_NEUTERED',
          name: 'Male Neutered',
        },
        {
          id: 'FEMALE_SPAYED',
          name: 'Female Spayed',
        },
      ],
      hash: 'MjAxNS0wNy0yNFQxMjowMDowMC4wMDBa',
    }
  }

  async getSpecies () {
    return [
      {
        items: [
          {
            id: 'CANIS_LUPUS',
            name: 'Canis Lupus',
          },
          {
            id: 'FELIS_CATUS',
            name: 'Felis Catus',
          },
        ],
        hash: 'xw0yAMQMSDoB0wjoF4NMwxNCMNDMjwya',
      },
    ]
  }
}
