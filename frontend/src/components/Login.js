import axios from 'axios';
import React, { useState,useContext } from 'react'
import {Store} from '../Store'
import { Container,Form,ButtonToolbar,Button  } from 'rsuite';
import {useNavigate} from 'react-router-dom'

const Login = () => {
        let navigate = useNavigate()
        let {state,dispatch} = useContext(Store)
        let [email,setEmail] = useState("")
        let [password,setPassword] = useState("")

        let handleSubmit = async ()=>{
           let {data} = await axios.post("http://localhost:8000/login",{
                email: email,
                password: password
            })

            dispatch({type:'USER_LOGIN',payload:data.data})
            localStorage.setItem('userInfo',JSON.stringify(data.data))
            navigate('/')


        }

  return (
    <Container className='container'>
        <div className='reg'>
        <Form>
    
    <Form.Group controlId="email">
      <Form.ControlLabel>Email</Form.ControlLabel>
      <Form.Control name="email" type="email" onChange={(e)=> setEmail(e)}/>
    
    </Form.Group>
    <Form.Group controlId="password">
      <Form.ControlLabel>Password</Form.ControlLabel>
      <Form.Control name="password" type="password" autoComplete="off" onChange={(e)=> setPassword(e)}/>
    </Form.Group>
    <Form.Group>
      <ButtonToolbar>
        <Button onClick={handleSubmit} appearance="primary">Submit</Button>
      </ButtonToolbar>
    </Form.Group>

    <Form.HelpText>Already Have An Account? Sign Up</Form.HelpText>
  </Form>
        </div>
    </Container>
  )
}

export default Login