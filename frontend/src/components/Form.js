import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {API_URL} from '../config/index'
import Demo from './Demo'

const states = [
  "Adamawa",
"Bauchi",
"Benue",
"Borno",
"Gombe",
"Jigawa",
"Kaduna",
"Kano",
"Katsina",
"Kebbi",
"Kogi",
"Kwara",
"Nasarawa",
"Niger",
"Plateau",
"Sokoto",
"Taraba",
"Yobe",
"Zamfara",
"Ekiti",
"Lagos",
"Ogun",
"Ondo",
"Osun",
"Oyo",
"Edo",
"Delta",
"Abia",
"Anambra",
"Akwa Ibom",
"Bayelsa",
"Cross River",
"Ebonyi",
"Enugu",
"Imo",
"Rivers"
]

const Form = ({id, data}) => {

  const [image, setImage] = useState()
  const [imagePath, setImagePath] = useState(null)

  const navigate= useNavigate()


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      image: image
    }
  })

  
  const handleUpload = async (data) => {
    
    const { firstname, lastname, email, state, terms, phone } = data

    localStorage.setItem("name", `${firstname}`)

    try {
      const res = await fetch(`${API_URL}/users/${id}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({firstname, lastname, email, state, terms, phone}),
      })
  
      if(res.ok) {
        const resData = await res.json()
        navigate(`/pages/preview/${resData._id}`)
      } 
    } catch(error){
      console.log(error)
    }  
  }


  return (
    <div className='formContainer signup-form'>
      <Demo image={image} setImage={setImage} setImagePath={setImagePath} user={data} />
      {/* <small className="upload">Upload your photo</small> */}
      <form onSubmit={handleSubmit(handleUpload)}>
        <div className='input-controller'>
          <input
            type='text'
            placeholder='First name'
            {...register('firstname', { required: true })}
          />
          {errors.firstname && <span>Required input</span>}
        </div>

        <div className='input-controller'>
          <input
            type='text'
            placeholder='Last name'
            {...register('lastname', { required: true })}
          />
          {errors.lastname && <span>Required input</span>}
        </div>

        <div className='input-controller'>
          <select {...register('state', { required: true })}>
            <option className="active">Choose State</option>
            {states.map((state, index) => (
              <option key={index}>{state}</option>
            ))}
          </select>
          {errors.state && <span>Required input</span>}
        </div>

        <div className='input-controller'>
          <input
            type='email'
            placeholder='Email'
            {...register('email', { required: true })}
          />
          {errors.email && <span>Required input</span>}
        </div>

        <div className='input-controller'>
          <input
            type='number'
            placeholder='Phone'
            {...register('phone', { required: true })}
          />
          {errors.phone && <span>Required input</span>}
        </div>

        <div className='check-controller'>
          <label htmlFor=''>
            <input
              type='checkbox'
              {...register('terms', { required: true })}
            />
            <small className='terms'><a target="_blank" href="https://docs.google.com/document/d/1zp8e_632JsTS-cc8ucSIO7l0Etf-KBvh/edit?usp=sharing&ouid=100662321730297767116&rtpof=true&sd=true">I agree to the privacy policy</a></small>
          </label>
          {errors.terms && <span>Required input</span>}
        </div>
        
        <div className='input-controller'>
          <button>Break Kola</button>
        </div>
      </form>

      {
        //circular cropping canvas
      }
      <canvas 
        hidden
        id={"upload"}
        width={"500"} 
        height={"500"}>


      </canvas>
      
    </div>
  )
}

export default Form
