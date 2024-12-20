
import React, { useEffect } from 'react'
import { useStore } from '../../store/store'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../store/firebase'

export default function AdminPanel() {

    const { currentUser } = useStore()

    

  return (
    <div>
      <img src={currentUser.avatar} alt="" />
        <h1>Welcome to admin panel, {currentUser.nickname} </h1>
    </div>
  )
}
