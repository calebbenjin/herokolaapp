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
      let croppedImageCanvas = cropper.getCroppedCanvas()
      const scaleImage = calculateCanvasScale(croppedImageCanvas);
      if (scaleImage < 1) {
        croppedImageCanvas = downScaleCanvas(croppedImageCanvas, scaleImage)
      }
      const croppedImage = croppedImageCanvas.toDataURL("image/png", 1.0)
      setCroppedImage(croppedImage)
      uploadImage(croppedImage)
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

function calculateCanvasScale(cv) {
  const maxWidth = 1024;
  const maxHeight = 1024;
  const scaleW = maxWidth / cv.width;
  const scaleH = maxHeight / cv.height;
  return Math.max(scaleW, scaleH);
}

function downScaleCanvas(cv, scale) {
  var sqScale = scale * scale; // square scale = area of source pixel within target
  var sw = cv.width; // source image width
  var sh = cv.height; // source image height
  var tw = Math.floor(sw * scale); // target image width
  var th = Math.floor(sh * scale); // target image height
  var sx = 0, sy = 0, sIndex = 0; // source x,y, index within source array
  var tx = 0, ty = 0, yIndex = 0, tIndex = 0; // target x,y, x,y index within target array
  var tX = 0, tY = 0; // rounded tx, ty
  var w = 0, nw = 0, wx = 0, nwx = 0, wy = 0, nwy = 0; // weight / next weight x / y
  // weight is weight of current source point within target.
  // next weight is weight of current source point within next target's point.
  var crossX = false; // does scaled px cross its current px right border ?
  var crossY = false; // does scaled px cross its current px bottom border ?
  var sBuffer = cv.getContext('2d').getImageData(0, 0, sw, sh).data; // source buffer 8 bit rgba
  var tBuffer = new Float32Array(3 * tw * th); // target buffer Float32 rgb
  var sR = 0, sG = 0,  sB = 0; // source's current point r,g,b
  /* untested !
  var sA = 0;  //source alpha  */    

  for (sy = 0; sy < sh; sy++) {
      ty = sy * scale; // y src position within target
      tY = 0 | ty;     // rounded : target pixel's y
      yIndex = 3 * tY * tw;  // line index within target array
      crossY = (tY != (0 | ty + scale)); 
      if (crossY) { // if pixel is crossing botton target pixel
          wy = (tY + 1 - ty); // weight of point within target pixel
          nwy = (ty + scale - tY - 1); // ... within y+1 target pixel
      }
      for (sx = 0; sx < sw; sx++, sIndex += 4) {
          tx = sx * scale; // x src position within target
          tX = 0 |  tx;    // rounded : target pixel's x
          tIndex = yIndex + tX * 3; // target pixel index within target array
          crossX = (tX != (0 | tx + scale));
          if (crossX) { // if pixel is crossing target pixel's right
              wx = (tX + 1 - tx); // weight of point within target pixel
              nwx = (tx + scale - tX - 1); // ... within x+1 target pixel
          }
          sR = sBuffer[sIndex    ];   // retrieving r,g,b for curr src px.
          sG = sBuffer[sIndex + 1];
          sB = sBuffer[sIndex + 2];

          /* !! untested : handling alpha !!
             sA = sBuffer[sIndex + 3];
             if (!sA) continue;
             if (sA != 0xFF) {
                 sR = (sR * sA) >> 8;  // or use /256 instead ??
                 sG = (sG * sA) >> 8;
                 sB = (sB * sA) >> 8;
             }
          */
          if (!crossX && !crossY) { // pixel does not cross
              // just add components weighted by squared scale.
              tBuffer[tIndex    ] += sR * sqScale;
              tBuffer[tIndex + 1] += sG * sqScale;
              tBuffer[tIndex + 2] += sB * sqScale;
          } else if (crossX && !crossY) { // cross on X only
              w = wx * scale;
              // add weighted component for current px
              tBuffer[tIndex    ] += sR * w;
              tBuffer[tIndex + 1] += sG * w;
              tBuffer[tIndex + 2] += sB * w;
              // add weighted component for next (tX+1) px                
              nw = nwx * scale
              tBuffer[tIndex + 3] += sR * nw;
              tBuffer[tIndex + 4] += sG * nw;
              tBuffer[tIndex + 5] += sB * nw;
          } else if (crossY && !crossX) { // cross on Y only
              w = wy * scale;
              // add weighted component for current px
              tBuffer[tIndex    ] += sR * w;
              tBuffer[tIndex + 1] += sG * w;
              tBuffer[tIndex + 2] += sB * w;
              // add weighted component for next (tY+1) px                
              nw = nwy * scale
              tBuffer[tIndex + 3 * tw    ] += sR * nw;
              tBuffer[tIndex + 3 * tw + 1] += sG * nw;
              tBuffer[tIndex + 3 * tw + 2] += sB * nw;
          } else { // crosses both x and y : four target points involved
              // add weighted component for current px
              w = wx * wy;
              tBuffer[tIndex    ] += sR * w;
              tBuffer[tIndex + 1] += sG * w;
              tBuffer[tIndex + 2] += sB * w;
              // for tX + 1; tY px
              nw = nwx * wy;
              tBuffer[tIndex + 3] += sR * nw;
              tBuffer[tIndex + 4] += sG * nw;
              tBuffer[tIndex + 5] += sB * nw;
              // for tX ; tY + 1 px
              nw = wx * nwy;
              tBuffer[tIndex + 3 * tw    ] += sR * nw;
              tBuffer[tIndex + 3 * tw + 1] += sG * nw;
              tBuffer[tIndex + 3 * tw + 2] += sB * nw;
              // for tX + 1 ; tY +1 px
              nw = nwx * nwy;
              tBuffer[tIndex + 3 * tw + 3] += sR * nw;
              tBuffer[tIndex + 3 * tw + 4] += sG * nw;
              tBuffer[tIndex + 3 * tw + 5] += sB * nw;
          }
      } // end for sx 
  } // end for sy

  // create result canvas
  var resCV = document.createElement('canvas');
  resCV.width = tw;
  resCV.height = th;
  var resCtx = resCV.getContext('2d');
  var imgRes = resCtx.getImageData(0, 0, tw, th);
  var tByteBuffer = imgRes.data;
  // convert float32 array into a UInt8Clamped Array
  var pxIndex = 0; //  
  for (sIndex = 0, tIndex = 0; pxIndex < tw * th; sIndex += 3, tIndex += 4, pxIndex++) {
      tByteBuffer[tIndex] = Math.ceil(tBuffer[sIndex]);
      tByteBuffer[tIndex + 1] = Math.ceil(tBuffer[sIndex + 1]);
      tByteBuffer[tIndex + 2] = Math.ceil(tBuffer[sIndex + 2]);
      tByteBuffer[tIndex + 3] = 255;
  }
  // writing result to canvas.
  resCtx.putImageData(imgRes, 0, 0);
  return resCV;
}
