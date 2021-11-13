import React, { useState,useEffect} from 'react'
import Dropzone from 'react-dropzone'
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

function FileUpload(props) {
  console.log(props);
  
  const [Images, setImages] = useState([])

 

    useEffect(() => {
      if(props && props.imagesData) {
        const productId = props.imagesData.match.params.productId
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setImages(response.data[0].images);
            })
            .catch(err => alert(err))}
    }, [])
  
 

  

  const dropHandler = (files) => {

    let formData = new FormData();

    const config = {
      header: { 'content-type': 'multipart/form-data' }
    }
    formData.append("file", files[0])

    axios.post('/api/product/image', formData, config)
      .then(response => {
        if (response.data.success) {
          setImages([...Images, response.data.fileName])
          console.log(response.data.fileName);
          props.refreshFunction([...Images, response.data.fileName])

        } else {
          alert("파일을 저장하는데 실패했습니다.")
        }
      })

  }

  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image);

    let newImages = [...Images];
    newImages.splice(currentIndex, 1)
    setImages(newImages)
    props.refreshFunction(newImages)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (

          <div
            style={{
              width: 300, height: 240, border: '1px solid lightgray',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
            {...getRootProps()}>
            <input {...getInputProps()} />
            <PlusOutlined style={{ fontSize: '72px' }} />
          </div>

        )}
      </Dropzone>


      <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
        {Images.map((image, index) => (
          <div onClick={() => deleteHandler(image)} key={index}>
            <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
              src={`https://frozen-cove-46738.herokuapp.com/uploads/${image}`} alt="delete"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FileUpload
