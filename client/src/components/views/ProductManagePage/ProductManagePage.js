import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Empty } from 'antd'
import ProductBlock from './Sections/ProductBlock';


function ProductManagePage(props) {


    const [Products, setProducts] = useState([])
    const [TotalList, setTotalList] = useState(0)
    const [ShowList, setShowList] = useState(false)


    useEffect(() => {
        axios.post('/api/product/products/list')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    setProducts(response.data.productInfo)
                    setShowList(true);
                    setTotalList(response.data.productInfo.length);
                } else {
                    alert("상품을 가져오는데 실패했습니다.")
                }
            })
    }, [])

    let removeFromList = (productId) => {
        console.log(productId);
        const body = {
            _id: productId
        }

        axios.post(`/api/product/delete`, body)
            .then(response => {
                if (response.data.success) {
                    alert("상품 삭제에 성공했습니다.")
                    props.history.push('/');
                } else {
                    alert("상품 삭제에 실패했습니다.")
                }

            })

    }

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1> My Product</h1>
            <div>
                <ProductBlock products={Products} deleteProduct={removeFromList} />
            </div>

            {ShowList ?
                <div style={{ marginTop: '3rem' }}>
                    <h2>Total Product: {TotalList} EA</h2>
                </div>
                :
                <>
                    <br />
                    <Empty description={false} />
                    <h2>Total Product: 0 EA</h2>
                </>
            }
        </div>
    )
}

export default ProductManagePage
