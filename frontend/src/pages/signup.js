import { useState, useEffect } from 'react'
import Bottle from '../components/Bottle'
import Footer from '../components/Footer'
import Form from '../components/Form'
import Header from '../components/Header'
import Loader from '../components/Loader'
import { useParams } from "react-router-dom";
import {API_URL} from '../config/index'

const Signup = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  const params = useParams();

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)

    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_URL}/users/${params.id}`, {
        method: 'GET'
      })
  
      const dataUsers = await res.json()
  
      setData(dataUsers && dataUsers)
    } catch (error) {
      console.log(error)
    }
    
  }

  console.log(data)

  if(loading) return <Loader title="Breaking Kola..." />
  

  return (
    <main className="mobile-screen">
      <Header text="Upload your faceshot" />
      <Form id={params.id} data={data} />
      <Bottle bottleContainer="signupBottleContainer" className="signup-bottle" />
      <Footer />
    </main>
  )
}

export default Signup