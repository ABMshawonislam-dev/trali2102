import axios from 'axios'
import React, { useEffect, useState,useRef, useMemo, useContext } from 'react'
import { Container,Grid,Row,Col,Sidenav,Nav,Form,Button,ButtonToolbar,SelectPicker,Checkbox,Input } from 'rsuite'
import JoditEditor from "jodit-react";
import {Store} from '../Store'
const Dashboard = ({placeholder}) => {
  let {state} = useContext(Store)
  const [pro,setPro] = useState(true)
  const [brand,setBrand] = useState(false)
  const [cat,setCat] = useState(false)
  const [cupon,setCupon] = useState(false)
  const [productbrand,setProductbrand] = useState('')
  const [productcategory,setProductcategory] = useState('')
  const [brandname,setBrandname] = useState([])
  const [brandnameselect,setBrandnameselect] = useState('')
  const [brandnameid,setBrandnameid] = useState('')
  const [categoryname,setCategoryname] = useState('')
  const [categoryid,setCategoryid] = useState('')
  const [catname,setCatname] = useState([])
  const [productcolor,setProductcolor] = useState([])
  const [productname,setProductname] = useState('')
  const [productprice,setProductprice] = useState('')
  const [productimg,setProductimg] = useState('')
  const [productcolorarr,setProductcolorarr] = useState([])
  const editor = useRef(null)
	const [content, setContent] = useState('')
	const [cuponname, setCuponname] = useState('')
	const [discountamount, setDiscountamount] = useState('')
	const [cuponlist, setCuponlist] = useState([])
  


	// const config = useMemo({
	// 	readonly: false, // all options from https://xdsoft.net/jodit/doc/,
	// 	placeholder: placeholder || 'Start typings...'
	// }, [placeholder])
  let handleBrand = ()=>{
      setPro(false)
      setBrand(true)
      setCat(false)
  }

  let handleCategory = ()=>{
      setPro(false)
      setBrand(false)
      setCat(true)
  }

  let handleCupon = () => {
      setPro(false)
      setBrand(false)
      setCat(false)
      setCupon(true)
  }

  let handleBrandSubmit = async ()=>{
    let {data} = await axios.post('http://localhost:8000/brand',{
      brand: productbrand
    })
    console.log(data)
  }

  // let handleCatSubmit = async ()=>{
  //   let {data} = await axios.post('http://localhost:8000/cat',{
  //     category: productcat
  //   })
  //   console.log(data)
  // }

 

  
  let handleBrandChange = (e) => {
    setBrandnameid(JSON.parse(e.target.value)._id)
    setBrandnameselect(JSON.parse(e.target.value).brand)


  }

  let handleCategoryChange = (e)=>{
    setCategoryname(JSON.parse(e.target.value).category)
    setCategoryid(JSON.parse(e.target.value)._id)
  }

  let sizeArr = []

  let handleSmall = ()=>{
    console.log(sizeArr.includes('sm'))
    if(!sizeArr.includes('sm')){

      sizeArr.push("sm")
    }else{
      if(sizeArr.indexOf('sm') != -1){
        sizeArr.splice(sizeArr.indexOf('sm'),1)
      } 
    }
    console.log(sizeArr)
  }

  let handleMedium = ()=>{
    console.log(sizeArr.includes('md'))
    if(!sizeArr.includes('md')){

      sizeArr.push("md")
    }else{
      if(sizeArr.indexOf('md') != -1){
        sizeArr.splice(sizeArr.indexOf('md'),1)
      } 
    }
    console.log(sizeArr)
  }

  let handleLarge = ()=>{
    console.log(sizeArr.includes('lg'))
    if(!sizeArr.includes('lg')){

      sizeArr.push("lg")
    }else{
      if(sizeArr.indexOf('lg') != -1){
        sizeArr.splice(sizeArr.indexOf('lg'),1)
      } 
    }
    console.log(sizeArr)
  }

  let handleProductColor = (e)=>{
    if(e.split("").includes("#")){
      console.log("# Not allow")
    }else{
      console.log(e.split(","))
      setProductcolorarr(e.split(","))
    }
  }

  let handleProductSubmit = async ()=>{

    const {data} = await axios.post('http://localhost:8000/products',{
      name: productname,
      price: productprice,
      brand: productbrand,
      category: productcategory,
      description: content,
      color:productcolorarr,
      size:sizeArr,
      image: productimg,
      owner: state.userInfo._id
    })

    // console.log(data)
  }


  useEffect(()=>{
   async function brand (){
      let {data} = await axios.get('http://localhost:8000/brand')
      setBrandname(data)
    }
    brand()
  },[])

  useEffect(()=>{
   async function cat (){
      let {data} = await axios.get('http://localhost:8000/cat')
      setCatname(data)
    }
    cat()
  },[])

  let handleCupondetails = () => {
    let {data} = axios.post('http://localhost:8000/cupon',{
      cuponname: cuponname,
      discountamount: discountamount 
    })
  }

  useEffect(()=>{
    async function cuponlist(){
      let {data} = await axios.get('http://localhost:8000/cuponlist')
      setCuponlist(data)
    }
    cuponlist()
  
  },[])
  return (  
            <Row className="show-grid" gutter={30}>
                <Col xs={4}>
                <Nav >
                    <Nav.Item vertical eventKey="home" >
                      Product Upload
                    </Nav.Item> <br/>
                    <Nav.Item eventKey="news" onClick={handleBrand}>Brand upload</Nav.Item><br/>
                    <Nav.Item eventKey="solutions" onClick={handleCategory}>Category Upload</Nav.Item><br/>
                    <Nav.Item eventKey="products">Products</Nav.Item><br/>
                    <Nav.Item onClick={handleCupon} eventKey="about">Cupon</Nav.Item><br/>
                </Nav>     
                </Col>
                <Col xs={20}>
                {pro&&
                  <Form fluid>
              
                  <Form.Group controlId="name-1">
                    <Form.ControlLabel>Product Name</Form.ControlLabel>
                    <Form.Control onChange={(e)=>setProductname(e)} name="name" placeholder="Product Name"/>
                  </Form.Group>
               
                  <Form.Group controlId="name-1">
                    <Form.ControlLabel>Product price</Form.ControlLabel>
                    <Form.Control onChange={(e)=>setProductprice(e)} name="name" placeholder="Product price"/>
                  </Form.Group>
                  <Form.Group controlId="name-1">
                    <Form.ControlLabel>Product Description</Form.ControlLabel>
                    <JoditEditor
                      ref={editor}
                        value={content}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={newContent => {}} 
                    />
                  </Form.Group>
                  <Form.Group controlId="name-1">
                    <Form.ControlLabel>Product Image</Form.ControlLabel>
                    <Form.Control onChange={(e)=>setProductimg(e)} name="name" placeholder="Product Image"/>
                  </Form.Group>
                  <Form.Group controlId="name-1">
                    <Form.ControlLabel>Product Brand</Form.ControlLabel>
                    <Form.Control onChange={(e)=>setProductbrand(e)} name="name" placeholder="Product Brand"/>
                  </Form.Group>
                  <Form.Group controlId="name-1">
                    <Form.ControlLabel>Product Category</Form.ControlLabel>
                    
                    
                    <Form.Control onChange={(e)=>setProductcategory(e)} name="name" placeholder="Product Category"/>
                  </Form.Group>
                  <Form.Group controlId="name-1">
                    <Form.ControlLabel>Product Color</Form.ControlLabel>
                    <Form.Control onChange={handleProductColor} name="name" placeholder="Product Color"/>
                    {productcolorarr.map(item=>(
                      <span style={{width:'20px',height:'20px',background:`#${item}`,display: 'inline-block',margin: '5px'}}></span>
                    ))}
                  </Form.Group>
                  <Form.Group controlId="name-1">
                    <Form.ControlLabel>Product Size</Form.ControlLabel>
                    <Checkbox onChange={handleSmall}> sm</Checkbox>
                    <Checkbox onChange={handleMedium}> md</Checkbox>
                    <Checkbox onChange={handleLarge}> lg</Checkbox>
                    
                  </Form.Group>
                 
                  <Form.Group>
                    <ButtonToolbar>
                      <Button onClick={handleProductSubmit} appearance="primary">Submit Product</Button>
                      <Button appearance="default">Cancel</Button>
                    </ButtonToolbar>
                  </Form.Group>
                </Form>
                }

                {/* {brand &&
                  <Form fluid>
                  <Form.Group controlId="name-1">
                    <Form.ControlLabel>Product Brand</Form.ControlLabel>
                    <Form.Control onChange={(e)=>setProductBrand(e)}  name="name" placeholder="Product Brand"/>
                  </Form.Group>
                  
                 
                  <Form.Group>
                    <ButtonToolbar>
                      <Button appearance="primary" onClick={handleBrandSubmit}>Submit</Button>
                    </ButtonToolbar>
                  </Form.Group>
                </Form>
                } */}

{/* {cat &&
                  <Form fluid>
                  <Form.Group controlId="name-1">
                    <Form.ControlLabel>Product Category</Form.ControlLabel>
                    <Form.Control onChange={(e)=>setProductcat(e)}  name="name" placeholder="Product Category"/>
                  </Form.Group>
                  
                 
                  <Form.Group>
                    <ButtonToolbar>
                      <Button appearance="primary" onClick={handleCatSubmit}>Submit</Button>
                    </ButtonToolbar>
                  </Form.Group>
                </Form>
                } */}

                {cupon&&
                  <>
                    <Input onChange={(e)=>setCuponname(e)} placeholder="Cupon Name" />
                  <Input onChange={(e)=>setDiscountamount(e)} placeholder="Discount amount" />
                  <Button onClick={handleCupondetails} color="violet" appearance="primary">Submit</Button>
                  {cuponlist.map(item=>(
                    <h1>{item.cuponname} --- {item.discountamount}<Button color="red" appearance="primary">Delete</Button></h1>

                  ))}

                  </>
                }
                </Col>
            </Row>
  )
}

export default Dashboard