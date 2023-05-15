import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react'

export function useAuthStatus() {
    const [loggedIn, SetLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user)=>{
            if(user){
                SetLoggedIn(true)
            }
            setCheckingStatus(false)
        })
    })
  return {loggedIn, checkingStatus}
}
