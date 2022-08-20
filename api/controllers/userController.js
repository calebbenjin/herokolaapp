import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Hero from '../models/heroModel.js'




// @desc Create New User
// @route POST /api/v1/users/id/signup
// @access Private
const createUser = asyncHandler(async (req, res) => {
  const hero = await Hero.findById(req.params.id)

  if (hero) {
    const users = await User.create(req.body)


    hero.users.push(users)
    hero.save()

    res.json(hero)
  } else {
    res.status(404).json({ message: 'User not found' })
  }
})

export { createUser }
