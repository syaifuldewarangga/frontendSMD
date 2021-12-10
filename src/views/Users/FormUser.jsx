import { 
    Button, 
    Card, 
    CardContent,
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    Grid, 
    MenuItem,
    Radio, 
    RadioGroup, 
    TextField, 
} from '@mui/material'
import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { smd_url } from '../../variable/BaseUrl'

function FormUser(props) {
    const [errorData, setErrorData] = useState('')
    const [data, setData] = useState('')
    const [position, setPosition] = useState([])
    const [admin, setAdmin] = useState([])
    const [department, setDepartment] = useState([])
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { id } = useParams()
    
    const getDepartment = async () => {
        await axios.get(smd_url + 'departments', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            setDepartment(res.data)
        })
    }

    const getPosition = async () => {
        await axios.get(smd_url + 'positions', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            setPosition(res.data)
        })
    }

    const getAdmin = async () => {
        await axios.get(smd_url + 'users/admin', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            setAdmin(res.data)
        })
    }

    const getUser = async () => {
        await axios.get(`${smd_url}users/get/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            setData(res.data)
        })
    }

    useEffect(() => {
        getPosition()
        getAdmin()
        getDepartment()
        if(props.type === 'edit') {
            getUser()
        }
    }, [])

    const onChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if(props.type === 'add') {
            let formData = new FormData()
            formData.append('username', data.username)
            formData.append('email', data.email)
            formData.append('password', data.password)
            formData.append('c_password', data.c_password)
            formData.append('admin', data.admin)
            formData.append('basic_salary', data.basic_salary)
            formData.append('company_name', 'Dewarangga')
            formData.append('department', data.department)
            formData.append('employee_id', data.employee_id)
            formData.append('job_position', data.job_position)
            formData.append('join_date', data.join_date)
            formData.append('level', data.level)
            formData.append('allowance_1', data.allowance_1)
            formData.append('allowance_2', data.allowance_2)
            formData.append('first_name', data.first_name)
            formData.append('last_name', data.last_name)

            await axios.post(smd_url + 'users/create', formData, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(() => {
                navigate('/master-data/users')
            }).catch((err) => {
                console.log(err.response)
            })
        } else if(props.type === 'edit') {
            await axios.put(`${smd_url}users/update/${data.id}`, {
                username: data.username,
                email: data.email,
                admin: data.admin,
                basic_salary: data.basic_salary,
                company_name: 'Dewarangga',
                department: data.department,
                employee_id: data.employee_id,
                job_position: data.job_position,
                join_date: data.join_date,
                level: data.level,
                allowance_1: data.allowance_1,
                allowance_2: data.allowance_2,
                first_name: data.first_name,
                last_name: data.last_name,
            }, 
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(() => {
                navigate('/master-data/users')
            }).catch((err) => {
                console.log(err.response.data.errors.location)
                setErrorData(err.response.data.errors.location)
            })
        }
    }
    console.log(errorData.email)
     return (
        <Card>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                autoFocus
                                required
                                error={errorData.first_name !== undefined ? true : false}
                                helperText={errorData.first_name !== undefined ? errorData.first_name[0] : null}
                                margin="normal"
                                id="first_name"
                                label="First Name"
                                type="text"
                                name="first_name"
                                onChange={onChange}
                                value={data.first_name !== undefined ? data.first_name : ''}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                autoFocus
                                error={errorData.last_name !== undefined ? true : false}
                                helperText={errorData.last_name !== undefined ? errorData.last_name[0] : null}
                                margin="normal"
                                id="last_name"
                                label="Last Name"
                                type="text"
                                name="last_name"
                                onChange={onChange}
                                value={data.last_name !== undefined ? data.last_name : ''}
                            />
                        </Grid>
                    </Grid>

                    <TextField
                        fullWidth
                        autoFocus
                        required
                        error={errorData.username !== undefined ? true : false}
                        helperText={errorData.username !== undefined ? errorData.username[0] : null}
                        margin="normal"
                        id="username"
                        label="Username"
                        type="text"
                        name="username"
                        onChange={onChange}
                        value={data.username !== undefined ? data.username : ''}
                    />

                    <TextField
                        fullWidth
                        autoFocus
                        required
                        error={errorData.email !== undefined ? true : false}
                        helperText={errorData.email !== undefined ? errorData.email[0] : null}
                        margin="normal"
                        id="email"
                        label="Email"
                        type="email"
                        name="email"
                        onChange={onChange}
                        value={data.email !== undefined ? data.email : ''}
                    />

                    <TextField
                        fullWidth
                        autoFocus
                        required
                        error={errorData.employee_id !== undefined ? true : false}
                        helperText={errorData.employee_id !== undefined ? errorData.email[0] : null}
                        margin="normal"
                        id="employeeID"
                        label="Employee ID"
                        type="text"
                        name="employee_id"
                        onChange={onChange}
                        value={data.employee_id !== undefined ? data.employee_id : ''}
                    />

                    <TextField
                        fullWidth
                        autoFocus
                        required
                        select
                        error={errorData.department !== undefined ? true : false}
                        helperText={errorData.department !== undefined ? errorData.department[0] : null}
                        id="department"
                        label="Department"
                        margin="normal"
                        name="department"
                        value={data.department !== undefined ? data.department : ''}
                        onChange={onChange}
                    >
                        {
                            department.map((item) => (
                                <MenuItem 
                                    value={item.department_name}
                                    key={item.id}
                                >
                                    {item.department_name}
                                </MenuItem>
                            ))
                        }
                    </TextField>

                    <TextField
                        fullWidth
                        autoFocus
                        required
                        select
                        error={errorData.job_position !== undefined ? true : false}
                        helperText={errorData.job_position !== undefined ? errorData.job_position[0] : null}
                        id="job_position"
                        label="Job Position"
                        margin="normal"
                        name="job_position"
                        onChange={onChange}
                        value={data.job_position !== undefined ? data.job_position : ''}
                    >
                        {
                            position.map((item) => (
                                <MenuItem 
                                    key={item.id}
                                    value={item.position_name}
                                >
                                    {item.position_name}
                                </MenuItem>
                            ))
                        }
                    </TextField>

                    <TextField
                        fullWidth
                        autoFocus
                        required
                        error={errorData.join_date !== undefined ? true : false}
                        helperText={errorData.join_date !== undefined ? errorData.email[0] : null}
                        margin="normal"
                        id="join_date"
                        label="Join Date"
                        type="date"
                        name="join_date"
                        onChange={onChange}
                        value={data.join_date !== undefined ? data.join_date : ''}
                    />

                    <TextField
                        fullWidth
                        autoFocus
                        required
                        error={errorData.basic_salary !== undefined ? true : false}
                        helperText={errorData.basic_salary !== undefined ? errorData.basic_salary[0] : null}
                        margin="normal"
                        id="basic_salary"
                        label="Basic Salary"
                        type="number"
                        min="0"
                        name="basic_salary"
                        onChange={onChange}
                        value={data.basic_salary !== undefined ? data.basic_salary : ''}
                    />

                    <TextField
                        fullWidth
                        autoFocus
                        error={errorData.allowance_1 !== undefined ? true : false}
                        helperText={errorData.allowance_1 !== undefined ? errorData.allowance_1[0] : null}
                        margin="normal"
                        id="allowance_1"
                        label="Allowance 1"
                        type="number"
                        min="0"
                        name="allowance_1"
                        onChange={onChange}
                        value={data.allowance_1 !== undefined ? data.allowance_1 : ''}
                    />

                    <TextField
                        fullWidth
                        autoFocus
                        error={errorData.allowance_1 !== undefined ? true : false}
                        helperText={errorData.allowance_1 !== undefined ? errorData.allowance_1[0] : null}
                        margin="normal"
                        id="allowance_2"
                        label="Allowance 2"
                        type="number"
                        min="0"
                        name="allowance_2"
                        onChange={onChange}
                        value={data.allowance_2 !== undefined ? data.allowance_2 : ''}
                    />

                    <FormControl 
                        component="fieldset"
                        sx={{ marginY: 2 }}
                    >
                        <FormLabel component="legend">Level</FormLabel>
                        <RadioGroup 
                            row 
                            required
                            aria-label="level" 
                            name="level"
                            value={data.level !== undefined ? data.level : ''}
                            onChange={onChange}
                        >
                            <FormControlLabel value="0" control={<Radio />} label="Employee" />
                            <FormControlLabel value="1" control={<Radio />} label="Admin" />
                        </RadioGroup>
                    </FormControl>

                    <TextField
                        fullWidth
                        autoFocus
                        required
                        select
                        error={errorData.admin !== undefined ? true : false}
                        helperText={errorData.admin !== undefined ? errorData.admin[0] : null}
                        id="admin"
                        label="Choose Admin"
                        margin="normal"
                        name="admin"
                        onChange={onChange}
                        value={data.admin !== undefined ? data.admin : ''}
                    >
                        {
                            admin.map((item, index) => (
                                <MenuItem 
                                    key={index}
                                    value={item.username}
                                >
                                    {item.username}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                    {
                        props.type === 'add' ? 
                            <Fragment>
                                <TextField
                                    fullWidth
                                    autoFocus
                                    required
                                    error={errorData.password !== undefined ? true : false}
                                    helperText={errorData.password !== undefined ? errorData.password[0] : null}
                                    margin="normal"
                                    id="password"
                                    label="password"
                                    type="password"
                                    name="password"
                                    onChange={onChange}
                                />
            
                                <TextField
                                    fullWidth
                                    autoFocus
                                    required
                                    error={errorData.c_password !== undefined ? true : false}
                                    helperText={errorData.c_password !== undefined ? errorData.c_password[0] : null}
                                    margin="normal"
                                    id="c_password"
                                    label="Confirm Password"
                                    type="password"
                                    name="c_password"
                                    onChange={onChange}
                                />
                            </Fragment>
                        : null
                    }


                    <Grid 
                        container
                        spacing={2}
                        mt={3}
                    >
                        <Grid 
                            item
                            xs={6}
                        >
                            <Button 
                                variant="outlined"
                                fullWidth
                                href="/master-data/users"
                            >
                                Back
                            </Button>
                        </Grid>
                        <Grid 
                            item
                            xs={6}
                        >
                            <Button 
                                variant="contained"
                                fullWidth
                                type="submit"
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    )
}

export default FormUser
