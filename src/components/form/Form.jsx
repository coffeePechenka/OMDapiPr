import React, { useState } from 'react'
import Register from './register/Register'
import Login from './login/Login'
import "./Form.css"

export default function Form() {

    const [entered, setEntered] = useState(false)

  return (
    <div className="form">

      <div className="imgBlock">
            <img src="/public/registerImg.jpg" alt="" />
      </div>

      <div className="contentBlock">

        {entered 
            ?   <Login setEntered={setEntered}/>  
            :   <Register setEntered={setEntered}/>
        }
      </div>

        


    </div>
  )
}
