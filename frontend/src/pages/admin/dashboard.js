import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../config/index'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [user, setUser] = useState()
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.get(`${API_URL}/users`, config)

      setUser(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleShow = (id) => {
    const userID = user?.map((hero) => hero.users)
    // for (let i = 0; i < userID.length; i++) {
    //   const users = userID[i]
    //   for (let i = 0; i < users.length; i++) {

    //     console.log(users[i]?._id)
    //     if(id) {
    //       setShowAll(!showAll)
    //     }
    //   }
    // }
  }

  // console.log(user?.map((items) => items._id))

  return (
    <div className='table-container'>
      <div className='mainContainer'>
        <h1>Dashboard</h1>
        <div className='flexContainer'>
          {user?.map((hero) => (
            <div className='breadcrumb' key={hero._id}>
              <div className='card'>
                <h4>{hero.name}</h4>
                <h5>{hero.users.length} Customers</h5>
                
              </div>
              <Link to={`/admin/${hero?._id}`}>
                <button>
                  {showAll ? 'Show less' : 'See all customers'}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
