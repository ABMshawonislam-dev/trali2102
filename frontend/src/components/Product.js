import React, { useContext, useState } from 'react'
import {Panel} from 'rsuite'
import {BsStarFill,BsStar,BsStarHalf,BsBag } from 'react-icons/bs';
import { Store } from '../Store';
import {Link} from 'react-router-dom'

const Product = (props) => {

  const {cartstate,cartdispatch} = useContext(Store)
  const [activeColor,setActivecolor] = useState("")
  const [activeSize,setActivesize] = useState("")
  const {cart} = cartstate

  const handleAddToCart = (product)=>{
    const existingItem = cart.cartItems.find((item)=> item._id === product._id)

    const quantity = existingItem ? existingItem.quantity + 1 : 1
    cartdispatch({
      type: 'ADD_TO_CART',
      payload: {...product,quantity,color:activeColor,size:activeSize}
    })

  }

  console.log()

  return (
    <div className='singleproduct'>
      <Panel  bodyFill style={{ display: 'inline-block', width: "100%" }}>
        <img src={props.img} style={{ width: "100%" }}/>
       <div className="productbox">
         <div className="producticon">
            {props.rating >= 1 ? <BsStarFill className='staricon'/>:props.rating >= .5?<BsStarHalf className='staricon' />: <BsStar className='staricon' />}
            {props.rating >= 2 ? <BsStarFill className='staricon'/>:props.rating >= 1.5?<BsStarHalf className='staricon' />: <BsStar className='staricon' />}
            {props.rating >= 3 ? <BsStarFill className='staricon'/>:props.rating >= 2.5?<BsStarHalf className='staricon' />: <BsStar className='staricon' />}
            {props.rating >= 4 ? <BsStarFill className='staricon'/>:props.rating >= 3.5?<BsStarHalf className='staricon' />: <BsStar className='staricon' />}
            {props.rating >= 5 ? <BsStarFill className='staricon'/>:props.rating >= 4.5?<BsStarHalf className='staricon' />: <BsStar className='staricon' />}
         </div>
         <div className="brand">
            <p className="productBrand">{props.brand}</p>
         </div>
       </div>
        
       
        <Panel>
          <h3>
            
              
            <Link to={`/details/${props.product._id}`}>{props.heading}</Link>
          </h3>
        <div className="productbox">
         <div className="productcolorbox">
            {props.color.map(item=>(
              <span className={activeColor == item?'productColor activeColor':'productColor'} style={{background: `#${item}`}} onClick={()=>setActivecolor(item)}></span>
            ))}
         </div>
         <div className="productsize">
           {props.size.map(item=>(
              <span className={activeSize == item?'productSize productActiveSize':'productSize'} onClick={()=>setActivesize(item)}>{item}</span>
            ))}
         </div>
       </div>

       <span className='cart' onClick={()=>handleAddToCart(props.product)}>
         <BsBag className='productcart'/>
       </span>
       <span className='price'>
         ${props.price}
       </span>
        
        </Panel>
      </Panel>
    </div>
  )
}

export default Product