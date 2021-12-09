import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardTemplate from '../components/DashboardTemplate'
import Login from '../views/auth/Login'
import Bank from '../views/Bank'
import Dashboard from '../views/Dashboard'
import Departement from '../views/Departement'
import Positon from '../views/Position'
import Shift from '../views/Shift'
import Users from '../views/Users'
import * as Middleware from '../middleware/App'
import FormUser from '../views/Users/FormUser'
import Attendance from '../views/Attendance'

function Router() {
    return (
        <BrowserRouter>            
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <Middleware.Guest>
                            <Login />
                        </Middleware.Guest>
                    } 
                />
                <Route 
                    path="/dashboard" 
                    element={
                        <Middleware.Authenticated>
                            <DashboardTemplate render={<Dashboard />} title="Dashboard" /> 
                        </Middleware.Authenticated>
                    } 
                />
                <Route 
                    path="/master-data/users" 
                    element={
                        <Middleware.Authenticated>
                            <DashboardTemplate render={<Users />} title="Users" /> 
                        </Middleware.Authenticated>
                    }
                />
                <Route 
                    path="/master-data/users/add" 
                    element={
                        <Middleware.Authenticated>
                            <DashboardTemplate 
                                render={
                                    <FormUser type={'add'} />
                                } 
                                title="Add User"
                            /> 
                        </Middleware.Authenticated>
                    }
                />
                <Route 
                    path="/master-data/users/edit/:id" 
                    element={
                        <Middleware.Authenticated>
                            <DashboardTemplate 
                                render={
                                    <FormUser type={'edit'} />
                                } 
                                title="Edit User"
                            /> 
                        </Middleware.Authenticated>
                    }
                />

                <Route 
                    path="/master-data/departement" 
                    element={
                        <Middleware.Authenticated>
                            <DashboardTemplate render={<Departement />} title="Departement" /> 
                        </Middleware.Authenticated>
                    } 
                />
                <Route 
                    path="/master-data/position" 
                    element={
                        <Middleware.Authenticated>
                            <DashboardTemplate render={<Positon />} title="Position" /> 
                        </Middleware.Authenticated>
                    } 
                />
                <Route 
                    path="/master-data/bank" 
                    element={
                        <Middleware.Authenticated>
                            <DashboardTemplate render={<Bank />} title="Bank" /> 
                        </Middleware.Authenticated>
                    } 
                />
                <Route 
                    path="/master-data/shift" 
                    element={
                        <Middleware.Authenticated>
                            <DashboardTemplate render={<Shift />} title="Shift" /> 
                        </Middleware.Authenticated>
                    } 
                />

                <Route 
                    path="/activity/attendance" 
                    element={
                        <Middleware.Authenticated>
                            <DashboardTemplate render={<Attendance />} title="Attendance" /> 
                        </Middleware.Authenticated>
                    } 
                />

            </Routes>
            
        </BrowserRouter>
    )
}

export default Router
