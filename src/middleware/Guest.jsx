import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useRecoilValue } from 'recoil'
import { authentication } from '../store/Authentication'

function Guest(props) {
    const navigate = useNavigate()
    const { auth } = useRecoilValue(authentication)
    useEffect(() => {
        if(auth) {
            navigate('/dashboard')
        }
    }, [])
    
    return props.children
}

export default Guest
