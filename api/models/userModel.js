import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    state: {
      type: String,
    },
    terms: {
      type: Boolean,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)


export default User