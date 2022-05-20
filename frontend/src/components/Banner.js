import React,{useState,useEffect} from 'react'
import { Carousel } from 'rsuite';
import axios from 'axios';
import { Container  } from 'rsuite';

const Banner = () => {
     let [banner,setBanner] = useState([]) 

  useEffect(()=>{
     async function banner(){
          let data = await axios.get("http://localhost:8000/banner")
     
          setBanner(data.data)
      }
    banner()
    
  },[])
  return (
    <Carousel className="custom-slider">
         {banner.map(item=>(
              
                      <div className='sliderItem' >
                              <div className="bannerimg" style={{backgroundImage: `url(${item.img})`}}>
                                   <Container className='container'>
                                        <h3>{item.subheading}</h3>
                                        <h1>{item.heading}</h1>
                                        <button>{item.button}</button>
                                        
                                   </Container>
                              </div>
                      </div>
             
             
         ))}
       
     
  </Carousel>
  )
}

export default Banner