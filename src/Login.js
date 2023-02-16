import React from 'react'
import './css/login.css'
import { auth, provider } from './Firebase'
import { useStateValue } from './StateProvider'
function Login() {
  const [{}, dispatch] = useStateValue();
  const signIn=()=>{
        auth.signInWithPopup(provider).then(result=>{
          dispatch({
            type: "SET_USER",
            user: result.user
          })
        }).catch(error=>alert(error))
  }
  return (
    <div className="login__wrapper">
      <div className="login">
      <img src="https://cdn-icons-png.flaticon.com/512/124/124034.png"/>
      <h2>Sign in to WhatsApp</h2>
      <button onClick={signIn}>Login with gmail</button>
      </div>
    </div>
  )
}

export default Login