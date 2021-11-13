import React, { useState, useEffect } from 'react'
import { Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import axios from 'axios';


const { TextArea } = Input;

const Continents = [
    { Key: 0, value: "--------" },
    { Key: 1, value: "Africa" },
    { Key: 2, value: "Europe" },
    { Key: 3, value: "Asia" },
    { Key: 4, value: "North America" },
    { Key: 5, value: "South America" },
    { Key: 6, value: "Australia" },
    { Key: 7, value: "Antarctica" },

]
function UpdateProductPage(props) {

    const productId = props.match.params.productId

    const [Product, setProduct] = useState({})

    useEffect(() => {
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0]);
                setTitle(response.data[0].title);
                setDescription(response.data[0].description);
                setPrice(response.data[0].price);
                setImages(response.data[0].images);

            })
            .catch(err => alert(err))
    }, [])

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [continent, setContinent] = useState("")
    const [images, setImages] = useState([])

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)

    }
    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const continentChangeHandler = (event) => {
        setContinent(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (event) => {


        if (!title || !description || !price || !continent || !images) {
            return alert(" 모든 값을 넣어주셔야 합니다.")
        }
        //서버에 채운 값들을 Request로 보낸다.

        const body = {
            writer: props.user.userData._id,
            _id: Product._id,
            title: title,
            description: description,
            price: price,
            images: images,
            continents: continent
        }
        axios.post("/api/product/update", body)
            .then(response => {
                if (response.data.success) {
                    alert("상품 수정에 성공했습니다.")
                    props.history.push('/product/products/list');
                } else {
                    alert("상품 수정에 실패했습니다.")
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2> 여행 상품 수정</h2>
            </div>
            <Form onSubmit={submitHandler}>
                {/*Drop Zone */}

                <FileUpload imagesData={props} refreshFunction={updateImages} />

                <br />
                <br />
                <label>이름</label>
                <Input type="text" name="title" onChange={titleChangeHandler} value={title} />
                <br />
                <br />
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={description} />
                <br />
                <br />
                <label>가격($)</label>
                <Input type="number" onChange={priceChangeHandler} value={price} />
                <br />
                <br />
                <select onChange={continentChangeHandler} >
                    {Continents.map(item => (
                        <option key={item.Key} value={item.value}> {item.value} </option>
                    ))}
                </select>
                <br />
                <br />
                <Button type="submit" onClick={submitHandler}>
                    확인
                </Button>
            </Form>
        </div>
    )
}

export default UpdateProductPage
