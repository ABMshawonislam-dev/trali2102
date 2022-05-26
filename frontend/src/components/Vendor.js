import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import React,{useState,useContext,useEffect} from 'react'
import {Button,Checkbox} from 'rsuite'
import {Store} from '../Store'

const Vendor = () => {
    let navigate = useNavigate()

    let {state,dispatch} = useContext(Store)
    let {userInfo} = state
    console.log(userInfo)
    console.log(Boolean(null))
    useEffect(()=>{
        if(!userInfo){
            console.log("user nai")
            navigate('/login')
        }
    },[])
    
    let [accept,setAccept] =useState(false)

    let handleVendor = async ()=>{
        console.log("click vendor")
       let {data} = await axios.put(`http://localhost:8000/vendor/${userInfo._id}`)
       console.log(data)
       dispatch({type: 'USER_LOGIN',payload:data})
       localStorage.removeItem('userInfo')
       localStorage.setItem('userInfo',JSON.stringify(data))
    }


  return (
    <div className='container'>
        <p>The Parties

Recalling the general principles of conservation and sustainable use of natural resources, as reflected in the World Conservation Strategy of the International Union for the Conservation of Nature and Natural Resources, the United Nations Environment Programme, and the World Wide Fund for Nature, and in the report of the World Commission on Environment and Development,

Recognizing that small cetaceans are and should remain an integral part of marine ecosystems,

Aware that the population of harbour porpoises of the Baltic Sea has drastically decreased,

Concerned about the status of small cetaceans in the Baltic and North Seas,

Recognizing that by-catches, habitat deterioration and disturbance may adversely affect these populations,

Convinced that their vulnerable and largely unclear status merits immediate attention in order to improve it and to gather information as a basis for sound decisions on management and conservation,

Confident that activities for that purpose are best coordinated between the States concerned in order to increase efficiency and avoid duplicate work,

Aware of the importance of maintaining maritime activities such as fishing,

Recalling that under the Convention on the Conservation of Migratory Species of Wild Animals (Bonn 1979), Parties are encouraged to conclude agreements on wild animals which periodically cross national jurisdictional boundaries,

Recalling also that under the provisions of the Convention on the Conservation of European wildlife and Natural Habitats (Berne 1979), all small cetaceans regularly present in the Baltic and North Seas are listed in its Appendix II as strictly protected species, and

Referring to the Memorandum of Understanding on Small Cetaceans in the North Sea signed by the Ministers present at the Third International Conference on the Protection of the North Sea,

have agreed as follows:

 

</p>
<Checkbox onChange={()=> setAccept(!accept)}> Accept The Agreement</Checkbox>
<br/>
{accept
?
<Button onClick={handleVendor} color="violet" appearance="primary">Become A Vendor</Button>
:
<Button color="violet" appearance="primary" disabled>Become A Vendor</Button>
}
    </div>
  )
}

export default Vendor