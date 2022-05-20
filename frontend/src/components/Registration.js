import axios from 'axios';
import React, { useState } from 'react'
import { Container,Form,ButtonToolbar,Button  } from 'rsuite';
const Registration = () => {

        let [name,setName] = useState("")
        let [email,setEmail] = useState("")
        let [password,setPassword] = useState("")


        let handleSubmit = ()=>{
            axios.post("http://localhost:8000/registration",{
                name: name,
                email: email,
                password: password
            })
        }

  return (
    <Container className='container'>
        <div className='reg'>
        <Form>
    <Form.Group controlId="name">
      <Form.ControlLabel>Username</Form.ControlLabel>
      <Form.Control type="text" onChange={(e)=> setName(e)}/>
    
    </Form.Group>
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

    <Form.HelpText>Already Have An Account? Login</Form.HelpText>
  </Form>
        </div>
    </Container>
  )
}

export default Registration