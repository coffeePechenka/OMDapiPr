

import React from 'react'
import './Login.css'
import { toast } from 'react-toastify'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../store/firebase'

export default function Login( { setEntered } ) {

  const handleLogin = async(e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const { email, password } = Object.fromEntries(formData)

    if(email != '' || password != ''){
      try{
        await signInWithEmailAndPassword(auth, email, password)
        toast.success("Вы успешно вошли")
      }catch(err){
        console.log(err)
        toast.error(err)
      }
    }else{
      toast.warn("Заполните все поля")
    }
  }

  return (
    <div className="login">
    
    <h1>Войти в систему</h1>
        <form onSubmit={ handleLogin }>
            <input type="email" placeholder="Ваш эмейл" name='email'/>
            <input type="password" placeholder="Ваш пароль" name='password'/>
            <button>Войти</button>
        </form>

    <button onClick={() => setEntered(prev => !prev)}>Еще нет аккаунта?</button>

    </div>
  )
}
