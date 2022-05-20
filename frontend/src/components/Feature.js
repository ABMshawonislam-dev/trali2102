import React, { useEffect,useState } from 'react'
import axios from 'axios'
import {Container,Grid,Row,Col } from 'rsuite';
import Product from './Product';
const Feature = () => {

    let [products,setProducts] = useState([])
    let [featureCat,setFeaturecat] = useState([])

    useEffect(()=>{
        async function fetchProduct(){
            let {data} = await axios.get("http://localhost:8000/products")
            let featureCat = await axios.get("http://localhost:8000/feature")
            setFeaturecat(featureCat.data)
            let fetureArr = []
            data.map(item=>{
                if(item.feature){
                    fetureArr.push(item)
                   
                }
            })
            setProducts(fetureArr)

        }

        fetchProduct()
    },[])
  return (
    <Container className='container featureProduct'>

        <Grid>  
            <Row className="show-grid" gutter={30}>
                <Col xs={12}>
                    <h2 >Featured Collections</h2>
                </Col>
            </Row>
        </Grid>

        <Grid>  
            <Row className="show-grid" gutter={30}>
                {featureCat.map(item=>(
                    item.position == "top" &&
                    <Col xs={8} style={{height: "668px"}}>
                    <Grid style={{backgroundImage: `url(${item.img})`}}>
                        <Row gutter={30}>
                                <Col xs={12}>
                                    <div className='box'>
                                            <h2>{item.heading}</h2>
                                            <button >{item.button}</button>
                                    </div>
                                </Col>
                        
                        </Row>
                    </Grid>
       
                
            </Col>
                ))}
            

                {products.map(item=>(

                    <Col xs={8}>
                        <Product img={item.image} heading={item.name} rating={item.rating} brand={item.brand} color={item.colors} size={item.sizes} price={item.price}/>
                    </Col>
                ))}
             {featureCat.map(item=>(
                    item.position == "bottom" &&
                    <Col xs={8} style={{height: "668px"}}>
                    <Grid style={{backgroundImage: `url(${item.img})`}}>
                        <Row gutter={30}>
                                <Col xs={12}>
                                    <div className='box'>
                                            <h2>{item.heading}</h2>
                                            <button >{item.button}</button>
                                    </div>
                                </Col>
                        
                        </Row>
                    </Grid>
       
                
            </Col>
                ))}
            
                
            </Row>
        </Grid>
    </Container>
  )
}

export default Feature