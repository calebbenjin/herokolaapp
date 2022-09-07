import React, { useState, useEffect } from 'react'
import Cropper from 'react-cropper'
import { dataUrlToFile, dataUrlToFileUsingFetch } from '../utils'
import 'cropperjs/dist/cropper.css'
import Modal from './Modal'
import axios from 'axios'
import { API_URL } from '../config'
import frame from '../images/FACESHOT.png'
import { loadCropImage } from '../lib/canvas'

export const ImageUploader = ({setImageUploaded, notifyError}) => {
  const [cropper, setCropper] = useState()
  const [showCropModal, toggleShowCropModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState()
  const [croppedImage, setCroppedImage] = useState()

  // uploadImage doesn't really upload the image to a server,
  // because we don't really need to. sessionStorage is just fine.
  const uploadImage = async (cropData) => {
    try {
      sessionStorage.setItem("image", cropData)
      setImageUploaded(true)
    } catch (e) {
      // TODO: Best to try to reduce the image size first to try to
      // prevent this error.
      notifyError('Image size too big. Try selecting a different image.')
      setCroppedImage(null)
      setImageUploaded(false)
    }
  }
  
  const handleChange = async (e) => {
    e.preventDefault()
    let files = []
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    if (files.length == 0) {
      notifyError('No image selected')
      return;
    }
    const reader = new FileReader()
    reader.onload = () => {
      setSelectedImage(reader.result)
      toggleShowCropModal(true)
      e.target.value = '' // to enable re-selecting this file
    }
    reader.readAsDataURL(files[0])
  }

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      const crop = cropper.getCroppedCanvas().toDataURL("image/png", 1.0)
      setCroppedImage(crop)
      uploadImage(crop)
      toggleShowCropModal(false)
    }
  }

  return (
    <>
      <Modal showModal={showCropModal} onModalClose={() => toggleShowCropModal(false)}>
        <Cropper
          style={{ height: 400}}
          initialAspectRatio={16 / 9}
          src={selectedImage}
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
          <button className='dimissBtn' onClick={() => toggleShowCropModal(false)}>
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
          <input type='file' id='upload-button' style={{ display: 'none' }} onChange={handleChange} />
          {croppedImage ? <div className='previewContainer'>
            <img
              src={croppedImage}
              alt='frame'
              className='previewImg'
            />
          </div> : <div className='frameContainer'>
            <img src={frame} alt='frame' className='frameImg' />
            <small className="clickBtn">Click here</small>
          </div>}
          
      </label>
        </div>
    </>
  )
}

export default ImageUploader


