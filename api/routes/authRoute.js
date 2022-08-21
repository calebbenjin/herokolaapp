import express from "express";
import { getUsers, registerHero, getUsersById } from '../controllers/authUserController.js'
import { createUser } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'
import cors from 'cors';
import path from 'path'
import multer from 'multer'
import asyncHandler from 'express-async-handler'


const router = express.Router()

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads')
  },
  filename: function(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  return cb(null, true)
  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}


const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})



router.post('/upload', cors(), upload.single('image'), asyncHandler(async (req, res) => {
  console.log(req.file.path)
  res.send(`/${req.file.path}`)
}))




router.route('/users',).get( cors(), getUsers)
router.route('/users/:id').get(cors(), getUsersById)
router.post('/register', cors(), registerHero)
router.post('/users/:id/signup', cors(), createUser)


export default router