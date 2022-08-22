import React, { useState, useEffect } from 'react'
import Cropper from 'react-cropper'
import { dataUrlToFile, dataUrlToFileUsingFetch } from '../utils'
import 'cropperjs/dist/cropper.css'
import Modal from './Modal'
import axios from 'axios'
import { API_URL } from '../config'
import frame from '../images/FACESHOT.png'
import { loadCropImage } from '../lib/canvas'

export const Demo = ({image, setImage, user, setImagePath}) => {
  const [userImage, setUserImage] = useState()
  const [cropData, setCropData] = useState()
  const [cropper, setCropper] = useState()
  const [showModal, setShowModal] = useState(false)
  const [imageFile, setImageFile] = useState(null)

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


  const uploadImage = async (cropData) => {
      const image = await loadCropImage(cropData)
      console.log("Image", image)
      localStorage.setItem("image", cropData)
      console.log("Crop Data", cropData)
  }
  
  const handleChange = async (e) => {
    
    e.preventDefault()
      let files
      if (e.dataTransfer) {
        files = e.dataTransfer.files
      } else if (e.target) {
        files = e.target.files
      }
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result)
        
        setShowModal(true)
      }
      reader.readAsDataURL(files[0])

  }

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      const crop = cropper.getCroppedCanvas().toDataURL("image/png", 1.0)
      setCropData(crop)
      uploadImage(crop)
      setShowModal(false)
    }
  }

  const handleUpload = async (url) => {
    /**
     * You can also use this async method in place of dataUrlToFile(url) method.
     * const file = await dataUrlToFileUsingFetch(url, 'output.png', 'image/png')
     */

    const file = dataUrlToFile(url, 'output.png')

    console.log(
      `We have File "${file.name}", now we can upload it wherever we want!`
    )
  }

  return (
    <>
      <Modal showModal={showModal} onModalClose={() => setShowModal(false)}>
        <Cropper
          style={{ height: 400}}
          initialAspectRatio={16 / 9}
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          // background={false}
          responsive={true}
          autoCropArea={3}
          aspectRatio={4 / 4}
          checkOrientation={false}
          onInitialized={(instance) => {
            setCropper(instance)
          }}
          guides={true}
        />

        <footer className='modalFooter'>
          <button className='dimissBtn' onClick={() => setShowModal(false)}>
            Dismiss
          </button>
          <button className='saveBtn' onClick={getCropData}>
            Crop Image
          </button>
        </footer>
        
      </Modal>
        
        <div
          className='imageuploader'
        >
       <label htmlFor='upload-button' className='upload-button'>
          <input type='file' id='upload-button'
        style={{ display: 'none' }}  onChange={handleChange} />
          {cropData ? <div className='previewContainer'>
            <img
              src={cropData}
              alt='frame'
              className='previewImg'
            />
          </div> : <div className='frameContainer'>
            <img src={frame} alt='frame' className='frameImg' />
          </div>}
          
      </label>
        </div>
    </>
  )
}

export default Demo


