import React, { useState } from 'react'

import { 
    Button,
    Card, 
    CardContent, 
    CardHeader, 
    FormControl, 
    Grid,
    Link,
    TextField,
    Typography
} from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { smd_url } from '../../variable/BaseUrl'
import { red } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil'
import { authentication } from '../../store/Authentication'

function Login() {
    const [auth, setAuth] = useRecoilState(authentication)
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({
            ...data, 
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('email', data.email)
        formData.append('password', data.password)

        await axios.post(smd_url + "login", formData
        ).then((res) => {
            setAuth({
                auth: true,
                user: res.data.success.user
            })
            let data = res.data.success
            localStorage.setItem('token', data.token)
            localStorage.setItem('id', data.user.id)
            localStorage.setItem('employee_id', data.user.employee_id)
            navigate('/dashboard')
        }).catch((err) => {
            let responseError = err.response.data
            if(responseError.error === 'error') {
                setError("invalid email or passwod")
            }
            console.log(responseError)
        })
    }

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" mt={30}>
            <Grid item xs={12} lg={3.5}>
                <Card>
                    <CardHeader 
                        title="Login Now" 
                        sx={{ 
                            textAlign: 'center',
                         }}
                    />
                    <CardContent>
                        <Typography
                            sx={{ 
                                color: red[500],
                                display: 'flex',
                                justifyContent: 'center',
                             }}
                        >
                            {error}
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <FormControl
                                fullWidth
                                required
                                sx={{ 
                                    '& .MuiTextField-root' : { m: 1 }
                                }}
                            >
                                <TextField 
                                    label="email"
                                    type="email"
                                    autoComplete="email"
                                    name="email"
                                    onChange={handleChange}
                                />
                                <TextField 
                                    label="password"
                                    type="password"
                                    autoComplete="current-password"
                                    name="password"
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <Box 
                                sx={{ 
                                    fontSize: 13,
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    m: 1
                                }}
                            >
                                <div>
                                    <Link 
                                        href="#"
                                    >
                                        Forgot Password ?
                                    </Link>
                                </div>
                            </Box>
                            <Button 
                                variant="contained"
                                fullWidth
                                sx={{ m: 1, mt: 2 }}
                                type="submit"
                            >
                                Login
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Login
