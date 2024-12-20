import React, { useState } from 'react'
import './Register.css'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../../store/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import upload from '../../../store/upload'

export default function Register( { setEntered } ) {


  const [avatar, setAvatar] = useState({
    file: null,
    url: ''
  })


  const handleAvatar = (e) => {
    if(e.target.files[0]){
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
  }


  const handleRegister = async(e) => {
    e.preventDefault()

    const formData = new FormData(e.target)   // суем данные формы в массив formData
    const {nickname, email, password, repassword, userType} = Object.fromEntries(formData) // Превращаем массив в объекты

    if( nickname == '' || email == '' || password == '' || repassword == '' ){
      toast.warn("Пожалуйста, заполните все поля")
    } 
    else{
      if(password == repassword){
        try{
          const res = await createUserWithEmailAndPassword(auth, email, password)

          const imgUrl = await upload(avatar.file)

          await setDoc(doc(db, 'users', res.user.uid), {
            nickname,
            email,
            password,
            avatar: imgUrl,
            id: res.user.uid,
            isAdmin: userType
          })
          toast.success("Аккаунт был зарегистрирован")
        }catch(err)
        {
          console.log(err)
          toast.error(err)
        }
      }
      else{
        toast.warn(" Пароли не совпадают ")
      }
    }

  }

  return (
    <div className="register">

        <h1>Регистрация</h1>
        <form onSubmit={ handleRegister }>

            <div className="avatar">
              <img src={avatar.url || "/public/no_avatar.jpg"} alt="" />
              
              <div className="changeAvatar">
                  <input type="file" id='avatar' onChange={handleAvatar}/>
                  <label htmlFor="avatar">
                    <MdOutlineAddPhotoAlternate />
                  </label>
              </div>
            </div>
            
            
            <div className="firstRow">

              <input type="text" placeholder="Ваш никнейм" name='nickname'/>
              <input type="email" placeholder="Ваш эмейл" name='email'/>

            </div>

            <div className="secondRow">

              <input type="password" placeholder="Ваш пароль" name='password'/>
              <input type="password" placeholder="Повторите пароль" name='repassword'/>

            </div>
            
            <div className="isAdmin">

              <input type="checkbox" id="isAdmin" name='userType'/>
              <label htmlFor="isAdmin">Is Admin?</label>

            </div>

            <button>Зарегистрироваться</button>
        </form>

        <button onClick={() => setEntered(prev => !prev)}>Уже есть аккаунт</button>

        

    </div>
  )
}
