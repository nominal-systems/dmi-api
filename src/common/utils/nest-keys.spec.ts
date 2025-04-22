import { nestKeys } from './nest-keys'

describe('nestKeys()', () => {
  it('should nest keys as an array instead of using numeric keys', () => {
    expect(nestKeys({
        'user.name': 'John',
        'user.address.street': '123 Main St',
        'user.profilePics': [
          { 'filename': 'pic1.jpg', 'formats': ['jpg', 'png'] },
          { 'filename': 'pic2.jpg', 'formats': ['jpg', 'png'] }
        ]
      }
    )).toEqual({
      user: {
        name: 'John',
        address: {
          street: '123 Main St'
        },
        profilePics: [
          { 'filename': 'pic1.jpg', formats: ['jpg', 'png'] },
          { 'filename': 'pic2.jpg', formats: ['jpg', 'png'] }
        ]
      }
    })
  })
})
