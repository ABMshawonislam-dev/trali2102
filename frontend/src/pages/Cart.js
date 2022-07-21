import axios from 'axios'
import React, { useContext,useEffect, useState } from 'react'
import {Grid,Row,Col,Input,Button} from 'rsuite'
import { Store } from '../Store'

const Cart = () => {
    let {cartstate,cartdispatch} = useContext(Store)
    const {cart} = cartstate
    const [total,setTotal] = useState('')
    const [shipping,setShipping] = useState(50)
    const [cuponcode,setCuponcode] = useState('')
    const [discount,setDiscount] = useState('')

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

      let handleCuponCode = async ()=>{
        let {data} = await axios.get(`http://localhost:8000/cupon/${cuponcode}`)
        setDiscount(data[0].discountamount)
      }

      useEffect(()=>{
        let total = 0
        cart.cartItems.map(item=>{
            total += +item.price * item.quantity
        })
        setTotal(total)
        if(total >= 300){
            setShipping(30)
        }else if(total >= 200){
            setShipping(40)
        }else{
            setShipping(50)
        }
      },[cart.cartItems])
  return (
    <div className='cartpage'>
        <div className='container'>
            <h2>Cart Page</h2>

                <Grid fluid>
                    <Row className="show-grid">
                        <Col xs={16}>
                            <Grid fluid>
                                <Row className="show-grid">
                                    <Col xs={10}>Item</Col>
                                    <Col xs={3}>Price</Col>
                                    <Col xs={6}>Quantity</Col>
                                    <Col xs={4}>Subtotal</Col>
                                    <Col xs={1}></Col>
                                </Row>

                                {cart.cartItems.map(item=>(
                                    <Row className="show-grid" style={{marginTop:'30px'}}>
                                        <Col xs={10}>
                                            <div className='box'>
                                                <div className='img'>
                                                    <img src={item.image} width="124"/>
                                                </div>
                                                <div className='details'>
                                                    <p>{item.brand}</p>
                                                    <h3>{item.name}</h3>
                                                    <h6>Color:<span style={{display:'inline-block',width:'20px',height:'20px',background:`#${item.color}`, borderRadius:'50%'}}></span></h6>
                                                    <h6>Size: {item.size}</h6>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xs={3}>
                                            <h3 style={{margin:'0'}}>${item.price}</h3>
                                        </Col>
                                        <Col xs={6}>
                                            <div className='quantity'>
                                                <span className='operator' onClick={()=>handleCartQuantity(item,item.quantity > 1 ? item.quantity-1:item.quantity )}>-</span>
                                                <span className='number'>{item.quantity}</span>
                                                <span onClick={()=>handleCartQuantity(item,item.quantity+1)} className='operator'>+</span>
                                            </div>
                                        </Col>
                                        <Col xs={4}>
                                        <h3 style={{margin:'0'}}>${item.price * item.quantity}</h3>
                                        </Col>
                                        <Col xs={1}>
                                            <h3 onClick={()=>handleDelete(item)}>x</h3>
                                        </Col>
                                    </Row>
                                ))}

                                <div className='cupon'>
                                    <h4>Coupon Discount</h4>
                                    <Input onChange={(e)=>setCuponcode(e)} placeholder="Cupon Code" />
                                    <Button onClick={handleCuponCode} color="orange" appearance="primary">Submit</Button>
                                </div>
                                
                            </Grid>
                        </Col>
                        <Col xs={8}>
                            <div className='shipping'>
                                <h3>SHIPPING</h3>
                                <Input placeholder="State" />
                                <Input placeholder="Address" />
                                <Input placeholder="Phone Number" />

                                <div className='box'>
                                    <div className='left'>
                                        <h4>Subtotal</h4>
                                    </div>
                                    <div className='right'>
                                        <h4>${total}</h4>
                                    </div>
                                </div>
                                <div className='box'>
                                    <div className='left'>
                                        <h6>Shipping</h6>
                                    </div>
                                    <div className='right'>
                                        <h6>${shipping}</h6>
                                    </div>
                                </div>
                                <div className='box'>
                                    <div className='left'>
                                        <h3>ORDER TOTAL</h3>
                                    </div>
                                    <div className='right'>
                                        <h3>$ {discount?(total+shipping-(((total+shipping)*discount)/100)):total+shipping}</h3>
                                    </div>
                                </div>
                                <Button style={{marginTop:'10px'}} block color="blue" appearance="primary">Procesed to Checkout</Button>
                            </div>
                        </Col>
                    </Row>
                </Grid>


        </div>
    </div>
  )
}

export default Cart