import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container,Grid,Row,Col } from 'rsuite';

const Deal = () => {

    let [deal,setDeal] = useState([])


    useEffect( ()=>{
       async function deal(){
          let data = await axios.get("http://localhost:8000/deal")
          setDeal(data.data)
       }
       deal()
    },[])

  return (
    <Container className='container deal-part'>
        <Grid>
             <Row className="show-grid" gutter={30}>
                 {deal.map((item,index)=>(
                    <Col xs={12}>
                        <div className='dealbox ' style={{backgroundImage: `url(${item.img})`}}>
                                <h5>{item.subheading}</h5>
                                <h2>{item.heading}</h2>
                                <button className={`dealbtn${index}`}>{item.button}</button>
                        </div>
                    </Col>
                 ))}
            </Row>
         </Grid>
    </Container>
  )
}

export default Deal