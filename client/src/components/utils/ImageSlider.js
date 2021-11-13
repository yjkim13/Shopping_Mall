import React from 'react'
import { Carousel } from 'antd'

function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay>
                {props.images.map((image, index) => (
                    <div key={index}>
                        <img style={{ width: '100%', maxHeight: '150px' }}
                            src={`http://https://frozen-cove-46738.herokuapp.com/uploads/${image}`} alt="description" />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider
