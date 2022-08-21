import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {API_URL} from '../../config/index'
import axios from 'axios'

const Upload = ({id}) => {
  const [bgimage, setBgImage] = useState()
  const [previmage, setPrevImage] = useState()
  const [image, setImage] = useState()
  const navigate= useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({})
  

  const handleChange = async (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post(`${API_URL}/upload`, formData, config)

      setImage(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChangebg = async (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)


    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post(`${API_URL}/upload`, formData, config)

      setBgImage(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChangeprev = async (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post(`${API_URL}/upload`, formData, config)
      setPrevImage(data)
    } catch (error) {
      console.log(error)
    }
  }


  
  const handleUpload = async (data) => {

    const { name, twitter, instagram } = data

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, twitter, instagram, previmage, bgimage, image}),
      })
  
      if(res.ok) {
        navigate(`/home`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='formContainer'>
      <div className="form">
        <div className="formTitle">
          <h2>Add Heros</h2>
          <small className="upload">Upload your photo</small>
        </div>
        <form onSubmit={handleSubmit(handleUpload)}>
          <div className='input-controller'>
            <input
              type='text'
              placeholder='Fullname'
              {...register('name', { required: true })}
            />
            {errors.firstname && <span>Required input</span>}
          </div>
          <div className='input-controller'>
            <input
              type='text'
              placeholder='twitter handle'
              {...register('twitter', { required: true })}
            />
            {errors.twittername && <span>Required input</span>}
          </div>

          <div className='input-controller'>
            <input
              type='text'
              placeholder='Instagram handle'
              {...register('instagram', { required: true })}
            />
            {errors.instagram && <span>Required input</span>}
          </div>
          <div className='input-controller'>
          <label htmlFor="background">ProfileImage</label>
            <input
              type='file'
              id='upload-button'
              onChange={handleChange}
            />
          </div>
          <div className='input-controller'>
            <label htmlFor="background">Background Image</label>
            <input
              type='file'
              id='upload-button'
              onChange={handleChangebg}
            />
          </div>
          <div className='input-controller'>
            <label htmlFor="background">Preview Image</label>
            <input
              type='file'
              onChange={handleChangeprev}
            />
          </div>
          <div className='input-controller'>
            <button>Add Hero</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Upload
