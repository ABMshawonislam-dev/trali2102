import React, { useEffect,useState,useContext } from 'react'
import {Store} from '../Store'
import { Navbar, Nav, Dropdown,Container,Drawer,List,Button,Message  } from 'rsuite';
import { FaRegUserCircle} from 'react-icons/fa';
import { AiOutlineHeart,AiOutlineShoppingCart} from 'react-icons/ai';
import { BiGitCompare} from 'react-icons/bi';
import axios from 'axios'
import {Link} from 'react-router-dom'
const Menubar = () => {

  const {state,dispatch,cartstate,cartdispatch} = useContext(Store)
  const {cart} = cartstate

  let [logo,setLogo] = useState({}) 
  const [open, setOpen] = React.useState(false);

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

  let handleCartQuantity = (product,quantity)=>{
    cartdispatch({
      type: 'ADD_TO_CART',
      payload: {...product,quantity}

    })

  }

  let handleDelete = (product)=>{
    cartdispatch({
      type: 'REMOVE_TO_CART',
      payload: product

    })
  }

  let handleCartClear = () => {
      cartdispatch({
        type: 'CLEAR_CART',
      })
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
                <Dropdown.Item><Link to="/admin">Go to Dashboard</Link></Dropdown.Item>
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
            <AiOutlineShoppingCart onClick={() => setOpen(true)} className='icon'/>
              <span className='round'>{cart.cartItems.length}</span>
            </span>
            </div>
          </Nav>
      
    
  </Navbar>
  <Drawer open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>Cart Items</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          {cart.cartItems.length > 0 
          
          
          ?
              <List>

                {cart.cartItems.map(item=>(

                  <>
                    <List.Item>
                    <img src={item.image} width="50"/>
                    <h6 style={{display:'inline-block',margin:'0 10px'}}>{item.name}</h6>
                    <h6 style={{display:'inline-block',margin:'0 10px'}}>{item.price}</h6>
                    <h6 style={{display:'inline-block',margin:'0 10px'}}>{item.size}</h6>
                    <h6 style={{display:'inline-block',margin:'0 10px',width:'10px',height:'10px',borderRadius:'50%',background:`#${item.color}`}}></h6>
                    <Button onClick={()=>handleCartQuantity(item,item.quantity+1)} color="violet" appearance="primary">+</Button>
                    <h6 style={{display:'inline-block',margin:'0 10px'}}>{item.quantity}</h6>
                    <Button onClick={()=>handleCartQuantity(item,item.quantity > 1 ? item.quantity-1:item.quantity )} color="violet" appearance="primary">-</Button>
                    <Button onClick={()=>handleDelete(item)} style={{margin:'0 10px'}} color="red" appearance="primary">Delete</Button>
                    <br/>
                  
                  </List.Item>
                  
                  </>

                ))}
                  <Link to="/cart">
                  
                    <Button style={{margin:'10px'}} color="violet" appearance="primary">Go To Cart Page</Button>
                  </Link>
                  <Button onClick={handleCartClear} style={{margin:'10px'}} color="red" appearance="primary">Clear Cart</Button>

              </List>
          :

             <Message type="success">Cart Is Emty</Message>
          }
          
        </Drawer.Body>
      </Drawer>
  </Container>
  )
}

export default Menubar