import React, { useEffect,useState,useContext } from 'react'
import {Store} from '../Store'
import { Navbar, Nav, Dropdown,Container  } from 'rsuite';
import { FaRegUserCircle} from 'react-icons/fa';
import { AiOutlineHeart,AiOutlineShoppingCart} from 'react-icons/ai';
import { BiGitCompare} from 'react-icons/bi';
import axios from 'axios'
import {Link} from 'react-router-dom'
const Menubar = () => {

  const {state,dispatch} = useContext(Store)
  console.log("ami menu theke aseci",state)

  let [logo,setLogo] = useState({}) 

  useEffect(()=>{
    async function menu(){
      let data = await axios.get("http://localhost:8000/logo")
      setLogo(data.data.img) 
    }   
    menu()
  },[])

  let handleLogout = ()=>{
    dispatch({type:'USER_LOGOUT'})
    localStorage.removeItem('userInfo')
  }

  return (
    <Container className='container'>
    <Navbar className='menu'>
     

            <Navbar.Brand href="#">
                <img src={logo}/>
                
            </Navbar.Brand>
          <Nav className='menu-item'>
            <Nav.Item >Home</Nav.Item>
            <Nav.Item>Pages</Nav.Item>
            <Nav.Item>Blog</Nav.Item>
            <Nav.Item>Contacts</Nav.Item>
            {!state.userInfo
            &&
            <Nav.Item>
             
              <Link to="/login">Signup / Login</Link>

            </Nav.Item>
            }
            
           
          </Nav>
          <Nav pullRight>
            <div className='navicon'>

              {state.userInfo&&
                <Dropdown title={<FaRegUserCircle className='icon'/>}>
                <Dropdown.Item>{state.userInfo.name}</Dropdown.Item>
                {state.userInfo.isVendor
                ?
                <Dropdown.Item><Link to="/dashboard">Go to Dashboard</Link></Dropdown.Item>
                :
                <Dropdown.Item><Link to="/vendor">Become A Vendor</Link></Dropdown.Item>
                }
                <Dropdown.Item>Download As...</Dropdown.Item>
                <Dropdown.Item>Export PDF</Dropdown.Item>
                <Dropdown.Item>Export HTML</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown>
              }

        
            <AiOutlineHeart className='icon'/>
            <BiGitCompare className='icon'/>
            <span className='cart'>
            <AiOutlineShoppingCart className='icon'/>
              <span className='round'>15</span>
            </span>
            </div>
          </Nav>
      
    
  </Navbar>
  </Container>
  )
}

export default Menubar