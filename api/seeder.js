import mongoose from "mongoose";
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import HeroModel from './models/heroModel.js'
import UserModel from './models/userModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await HeroModel.deleteMany()
    // await UserModel.deleteMany()
    await HeroModel.insertMany(users)
    // const createUsers = await HeroModel.insertMany(users)

    // const adminUser = createUsers[0]._id



    console.log("Data imported:".green.inverse)
    process.exit()
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}



const destroyData = async () => {
  try {
    await HeroModel.deleteMany()


    console.log("Data Destroy:".red.inverse)
    process.exit()
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}


if(process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}