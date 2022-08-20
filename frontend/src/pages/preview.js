import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { shootFireworks } from '../lib'
import Loader from '../components/Loader'
import { AiOutlineInstagram, AiFillTwitterCircle } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { API_URL, IMG_URL } from '../config/index'
import { download, drawOnCanvas, toDataUrl } from '../lib/canvas'

const Preview = () => {
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState()
  const [lastuserData, setLastuserData] = useState()
  const [bgImage, setBgImage] = useState(null)
  const [heroImage, setHeroImage] = useState(null)
  const ref = useRef(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [mergeImg, setMergeImg] = useState({ src: '', err: '' })
  const params = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    fetchUser()
  }, [])

  var f = new FontFace(
    'Kawak-Bold',
    'url(https://fontcdn-one.vercel.app/fonts/Kawak-Bold.otf)'
  )
  
  f.load().then(function (font) {
    const canvas = document.getElementById('canvas')

    document.fonts.add(font)

    const ctx = canvas.getContext('2d')

    let name = localStorage.getItem('name')

    const width = canvas.width

    const height = canvas.height

    ctx.font = `18px bolder Kawak-Bold`
    ctx.fillStyle = '#0f3214'

    const length = name?.length

    ctx.fillText(name.toUpperCase(), width * 0.3496 - (length * 12) / 2, height * 0.7169);
  })

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth)
    setHeight(ref.current.offsetHeight)
  }, [])

  useEffect(() => {
    if (userData) {
      toDataUrl(`${IMG_URL}${userData?.previmage}`, setHeroImage)
      toDataUrl(`${IMG_URL}${userData?.bgimage}`, setBgImage)
    }
  }, [userData])

  

  useEffect(() => {
    //Display and draw canvas when the neccessary stuff loads
    if (bgImage && heroImage) {
      drawOnCanvas(bgImage, heroImage)

      setTimeout(() => {
        shootFireworks()
        setLoading(false)
      }, 1000)
    }
  }, [bgImage, heroImage])

  const handleDownload = () => {
    if (download()) {
      navigate('/pages/daalu')
    }
  }

  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_URL}/users/${params.id}`, {
        method: 'GET',
      })

      const dataUsers = await res.json()
      setUserData(dataUsers && dataUsers)

      dataUsers?.users?.map((data, i, row) => {
        if (i + 1 === row.length) {
          setLastuserData(data && data)
        } else {
          // Not last one.
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  console.log(userData)

  return (
    <React.Fragment>
      <main className='downloadScreen' ref={ref}>
        {width && (
          <canvas
            id={'canvas'}
            width={`${width}px`}
            height={`${width}px`}
          ></canvas>
        )}

        <div className='footerImg'>
          <div className='container'>
            <ol>
              <li>
                <button onClick={handleDownload}>DOWNLOAD IMAGE</button>
              </li>
              <li>
                <p>
                  Share on social media tagging @herolager and {userData?.name}{' '}
                  {userData?.instagram} on{' '}
                  <AiOutlineInstagram className='icon' /> instagram or{' '}
                  <AiFillTwitterCircle className='icon' /> twitter
                </p>
              </li>
              <li>
                <p>Get a special Hero shoutout</p>
              </li>
            </ol>
          </div>
        </div>
      </main>

      {loading && (
        <div
          style={{
            background: 'yellow',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
          }}
        >
          <Loader title='Breaking Kola...' />{' '}
        </div>
      )}
    </React.Fragment>
  )
}

export default Preview
