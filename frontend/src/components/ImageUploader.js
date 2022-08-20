import { useState, useEffect } from 'react'
import frame from '../images/FACESHOT.png'
import axios from 'axios'
import { API_URL, IMG_URL } from '../config'

const ImageUploader = ({ image, setImage, user }) => {
  const [userImage, setUserImage] = useState()

  useEffect(() => {
    fetchUser()
  })

  const fetchUser = () => {
    user?.users?.map((rank, i, row) => {
      if (i + 1 === row.length) {
        setUserImage(rank)
      } else {
        // Not last one.
      }
    })
  }

  console.log(userImage)

  const handleChange = async (e) => {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0],
    })

    const file = image.raw
    const formData = new FormData()
    formData.append('image', file)

    console.log(file)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post(`${API_URL}/upload`, formData, config)

      console.log(data)

      setImage({ raw: data })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='imageuploader'>
      <label htmlFor='upload-button' className='upload-button'>
        {image.preview ? null : <small className='here'>Click Here!</small>}
        {image.preview ? (
          <div className='previewContainer'>
            <img
              src={user && `${IMG_URL}${image?.preview}`}
              alt='frame'
              className='previewImg'
            />
          </div>
        ) : (
          <div className='frameContainer'>
            <img src={frame} alt='frame' className='frameImg' />
          </div>
        )}
      </label>
      <input
        type='file'
        id='upload-button'
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <br />
    </div>
  )
}

export default ImageUploader
