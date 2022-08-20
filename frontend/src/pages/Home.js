import { useState, useEffect } from 'react'
import Bottle from '../components/Bottle';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Loader from '../components/Loader';
import {API_URL} from '../config/index'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState()

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)

    fetchUser()
  },[])

  const fetchUser = async () => {
    const res = await fetch(`${API_URL}/users`, {
      method: 'GET'
    })

    const dataUsers = await res.json()

    console.log(dataUsers &&  dataUsers)
    setUserData(dataUsers && dataUsers)
  }

  // if(loading) return <Loader />

  return (
    <main>
      <Hero data={userData &&  userData} />
    </main>
  )
}

export default Home
