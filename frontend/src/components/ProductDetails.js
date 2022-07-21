import React, { useEffect, useState,useContext } from 'react'
import { Routes, Route, useParams } from 'react-router-dom';
import axios from 'axios'
import { Container,Grid,Row,Col } from 'rsuite';
import {Store} from '../Store'
import Product from './Product';
const ProductDetails = () => {

    let {cartstate,cartdispatch} = useContext(Store)
    const {cart} = cartstate

    console.log(cart)

    const params = useParams();
    console.log(params)

    let [details,setDetails] = useState({})
    let [discount,setDiscount] = useState({})
    let [relatedproduct,setRelatedProduct] = useState([])

    useEffect(()=>{
        async function details(){
            let {data} = await axios.get(`http://localhost:8000/productdetails/${params.id}`)
            console.log("brand",data.brand)
            let rdata = await axios.get(`http://localhost:8000/relatedproduct/${data.brand}`)
            setDetails(data)
            setRelatedProduct(rdata.data)
        }
        details()
    },[])

    useEffect(()=>{
        async function dsicount(){
            let {data} = await axios.get(`http://localhost:8000/cupon/discount`)
            setDiscount(data[0].discountamount)
            console.log(data)
        }
        dsicount()
    },[])
  return (
    <Container className='container deal-part'>
        <Grid>
             <Row className="show-grid" gutter={30}>
                    <Col xs={12}>
                        <div >
                            <img src="assets/images/productimg.png"/>
                        </div>
                    </Col>
                    <Col xs={12}>
                        <div >
                            <h1>{details.name}</h1>
                            <h4>${(details.price*discount)/100}  <del>${details.price}</del></h4>
                            {cart.cartItems.map(item=>(
                                item._id == details._id &&
                                <>
                                    <button>+</button>
                                <span>{item.quantity}</span>
                                <button>-</button>
                                </>
                            ))}
                            
                            
                        </div>
                    </Col>
               
            </Row>
         </Grid>

         <h1>Related Product</h1>
         <Grid>  
            <Row className="show-grid" gutter={30}>
                {/* {products.map(item=>(

                    <Col xs={6}>
                        <Product img={item.image} heading={item.name} rating={item.rating} brand={item.brand} color={item.colors} size={item.sizes} price={item.price}/>
                    </Col>
                ))} */}
              {relatedproduct.map(item=>(
                   <Col xs={6}>
                    <Product product={item} img={item.image} heading={item.name} brand={item.brand} color={item.color} size={item.size} price={item.price}/>
                    {/* <h1>ALSDKJALDS</h1> */}
                    </Col>
              ))}
                
            </Row>
        </Grid>

         
    </Container>
  )
}

export default ProductDetails