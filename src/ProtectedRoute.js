import React from 'react'
import {useSelector} from 'react-redux'
import {Route,Redirect} from 'react-router-dom'
const ProtectedRoute=({component:Component, auth,...rest})=>(
    <Route {...rest} render={(props)=>(
        auth===true
        ? <Component {...props}/>
        : <Redirect to='/login'/>
        
    )} />
       
)

export default ProtectedRoute