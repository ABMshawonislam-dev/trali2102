import axios from 'axios'
import React, { useEffect, useState,useRef, useMemo, useContext } from 'react'
import { Container,Grid,Row,Col,Sidenav,Nav,Form,Button,ButtonToolbar,SelectPicker,Checkbox } from 'rsuite'
import JoditEditor from "jodit-react";
import {Store} from '../Store'
const Dashboard = ({placeholder}) => {
  let {state} = useContext(Store)
  const [pro,setPro] = useState(true)
  const [brand,setBrand] = useState(false)
  const [cat,setCat] = useState(false)
  const [productbrand,setProductBrand] = useState('')
  const [productcat,setProductcat] = useState('')
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
  const editor = useRef(null)
	const [content, setContent] = useState('')
  


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

  let handleBrandSubmit = async ()=>{
    let {data} = await axios.post('http://localhost:8000/brand',{
      brand: productbrand
    })
    console.log(data)
  }

  let handleCatSubmit = async ()=>{
    let {data} = await axios.post('http://localhost:8000/cat',{
      category: productcat
    })
    console.log(data)
  }

 

  let handleProductSubmit = async ()=>{

    const {data} = await axios.post('http://localhost:8000/products',{
      name: productname,
      price: productprice,
      brand: brandnameid,
      brandname: brandnameselect,
      category: categoryid,
      categoryname: categoryname,
      description: content,
      owner: state.userInfo._id
    })

    // console.log(data)
  }
  let handleBrandChange = (e) => {
    setBrandnameid(JSON.parse(e.target.value)._id)
    setBrandnameselect(JSON.parse(e.target.value).brand)


  }

  let handleCategoryChange = (e)=>{
    setCategoryname(JSON.parse(e.target.value).category)
    setCategoryid(JSON.parse(e.target.value)._id)
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
                    <Nav.Item eventKey="about">About</Nav.Item><br/>
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

                      <select  onChange={handleBrandChange}>
                        {brandname.map(item=>(
                          <option value={JSON.stringify(item)}>{item.brand}</option>

                        ))}
                    
                      </select>
                    {/* <SelectPicker data={brandname} block /> */}
                    {/* <Form.Control name="name" placeholder="Product Brand"/> */}
                  </Form.Group>
                  <Form.Group controlId="name-1">
                    <Form.ControlLabel>Product Category</Form.ControlLabel>
                    
                    <select onChange={handleCategoryChange}>
                        {catname.map(item=>(
                          <option value={JSON.stringify(item)}>{item.category}</option>

                        ))}
                    
                      </select>
                    {/* <Form.Control name="name" placeholder="Product Category"/> */}
                  </Form.Group>
                  <Form.Group controlId="name-1">
                    <Form.ControlLabel>Product Color</Form.ControlLabel>
                    <Form.Control onChange={(e)=>setProductcolor(e)} name="name" placeholder="Product Color"/>
                  </Form.Group>
                  <Form.Group controlId="name-1">
                    <Form.ControlLabel>Product Size</Form.ControlLabel>
                    <Checkbox> sm</Checkbox>
                    <Checkbox> md</Checkbox>
                    <Checkbox> lg</Checkbox>
                    <Checkbox> xl</Checkbox>
                    <Checkbox> xxl</Checkbox>
                    {/* <Form.Control type="text" name="name" placeholder="Product Color"/> */}
                  </Form.Group>
                 
                  <Form.Group>
                    <ButtonToolbar>
                      <Button onClick={handleProductSubmit} appearance="primary">Submit Product</Button>
                      <Button appearance="default">Cancel</Button>
                    </ButtonToolbar>
                  </Form.Group>
                </Form>
                }

                {brand &&
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
                }

{cat &&
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
                }
                </Col>
            </Row>
  )
}

export default Dashboard