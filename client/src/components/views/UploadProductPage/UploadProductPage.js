import React,{useState} from 'react'
import {Typography, Button, Form, Input} from 'antd';
import FileUpload from '../../utils/FileUpload';

//const {Title} = Typography;
const {TextArea} = Input;

const Continents = [
    {Key: 1, value : "Africa"},
    {Key: 2, value : "Europe"},
    {Key: 3, value : "Asia"},
    {Key: 4, value : "North America"},
    {Key: 5, value : "South America"},
    {Key: 6, value : "Australia"},
    {Key: 7, value : "Antarctica"},
    
]

function UploadProductPage() {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Continent, setContinent] = useState(1)
    const [Image, setImage] = useState([])

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) =>{
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const continentChangeHandler = (event) => {
        setContinent(event.currentTarget.value)
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{ textAlign:'center', marginBottom: '2rem'}}>
                <h2> 여행 상품 업로드</h2>
        </div>
        <Form>
            {/*Drop Zone */}

            <FileUpload/>
        
        <br/>
        <br/>
        <label>이름</label>
        <Input onChange={titleChangeHandler} value={Title}/>
        <br/>
        <br/>
        <label>설명</label>
        <TextArea onChange={descriptionChangeHandler} value={Description}/>
        <br/>
        <br/>
        <label>가격($)</label>
        <Input type="number" onChange={priceChangeHandler} value={Price}/>
        <br/>
        <br/>
        <select onChange={continentChangeHandler} value={Continent}>
            {Continents.map(item => (
                 <option key={item.key} value={item.key}> {item.value} </option>
            ))}
        </select>
        <br/>
        <br/>
        <Button>
            확인
        </Button>
        </Form>
        </div>
    )
}

export default UploadProductPage
