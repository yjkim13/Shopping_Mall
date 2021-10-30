import React,{useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import RocketOutlined from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import {Col, Row , Card} from 'antd'
import ImageSlider from '../../utils/ImageSlider';

function LandingPage() {

    const [Products, setProducts] = useState([])
    useEffect(() => {

     
        axios.post('/api/product/products')
        .then(response =>{
            if(response.data.success){
                console.log(response.data)
                setProducts(response.data.productInfo)
            }else {
                alert("상품을 가져오는데 실패했습니다.")
            }
        })
        
    }, [])

    const renderCards = Products.map((product,index)=> {
        return <Col lg={6} md={8} sx={24} key = {index}>
        <Card
       
            cover={<ImageSlider images={product.images}/>}
        >
            <Meta 
                title={product.title}
                description={`$${product.price}`}
            />
        </Card>
        </Col>
    })
  
   


    return (
   <div style = {{ width: '75%', margin: '3rem auto'}}>
       <div style= {{ textAlign: 'center'}}>
           <h2>이제 모두 여행을 떠나요!<RocketOutlined/></h2>
       </div>
            {/* Filter */}

            {/* Search */}

            {/* Cards */}
        <Row gutter= '16'>
        {renderCards}

        </Row>
            



       <div style= {{display: 'flex', justifyContent: 'center'}}>
           <button>더보기</button>
       </div>

   </div>
    )
}

export default LandingPage
