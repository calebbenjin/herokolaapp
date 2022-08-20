import bcrypt from 'bcryptjs'

const heros = [
  {
    name: 'Boss',
    twitter: "@twitter",
    instagram: "@instagram",
    image: 'image',
    bgimage: 'image',
    email: 'account@mail.com',
    isAdmin: true,
    password: bcrypt.hashSync('123456', 10)
  },
]

export default heros
