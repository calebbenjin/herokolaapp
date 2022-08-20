import mongoose from 'mongoose'

const heroSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    bgimage: {
      type: String,
    },
    previmage: {
      type: String,
    },
    image: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },

    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
)

heroSchema.methods.matchPassword = function () {
  return this.password
}

const Hero = mongoose.model('Hero', heroSchema)

export default Hero
