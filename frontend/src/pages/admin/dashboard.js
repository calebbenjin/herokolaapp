import { useState, useEffect } from 'react'
import axios from 'axios'
import {API_URL} from '../../config/index'

const Dashboard = () => {
  const [user, setUser] = useState()


  useEffect(() => {
    fetchUser()
  },[])

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

  console.log(user?.map(items => items?.users[0]))

  return (
    <div className="table-container">
      <div className="table">
        <table>
          <thead>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>State</th>
              <th>Terms and Condition</th>
          </thead>
          <tbody>
            {/* {user?.map(item => (
              <tr>
                  <td>{item[0]?.firstname}</td>
                  <td>{item[0]?.lastname}</td>
                  <td>{item[0]?.email}</td>
                  <td>{item[0]?.phone}</td>
                  <td>{item[0]?.state}</td>
                  <td>{item[0]?.term}</td>
              </tr>
            ))}   */}
              
          </tbody>
          <tfooter>
          </tfooter>
        </table>
      </div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard
