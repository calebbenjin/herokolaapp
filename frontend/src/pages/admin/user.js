import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../config/index'
import { useParams } from 'react-router-dom'

const Login = () => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState()
  const [lastuserData, setLastuserData] = useState()
  const params = useParams()

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_URL}/users/${params.id}`, {
        method: 'GET',
      })

      const dataUsers = await res.json()
      setUserData(dataUsers && dataUsers)

      if (res.ok) {
        setLoading(false)
      }

      dataUsers?.users?.map((data, i, row) => {
        if (i + 1 === row.length) {
          setLastuserData(data && data)
        } else {
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  console.log(userData?.users.map((user) => user))

  return (
    <div className="userData">
      <div className='userList'>
      <h1>User Data</h1>
        <div className='table'>
          <table>
            <thead>
              <th>S/N</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>State</th>
              <th>Terms and Condition</th>
            </thead>
            <tbody>
              {userData?.users.map((user, index) => (
              <tr key={user._id}>
                  <td>{index}</td>
                  <td>{user?.firstname}</td>
                  <td>{user?.lastname}</td>
                  <td>{user?.email}</td>
                  <td>{user?.phone}</td>
                  <td>{user?.state}</td>
                  <td>{user?.terms}</td>
              </tr>
            ))}  
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Login
