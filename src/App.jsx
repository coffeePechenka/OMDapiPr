
import { useEffect } from 'react'
import './App.css'
import Form from './components/form/Form'
import Notification from './components/notifications/Notification'
import { useStore } from './store/store'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './store/firebase'
import AdminPanel from './components/admin/AdminPanel'

function App() {

  const { currentUser, fetchUser } = useStore()
  
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
        fetchUser(user?.uid)
    })
    return () => {
        unSub()
    }
}, [fetchUser])

  return (
    <>
      {!currentUser && 
        <>
          <Form/>
          <Notification/>
        </>
      }
      {currentUser &&
        <AdminPanel/>
      }
    </>
  )
}

export default App
