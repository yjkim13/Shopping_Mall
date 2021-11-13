import React, { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {

    const [Images, setImages] = useState([])

    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0) {
            let images = []

            props.detail.images.map(item => {
                images.push({
                    original: `http://https://frozen-cove-46738.herokuapp.com/uploads/${item}`,
                    thumbnail: `http://https://frozen-cove-46738.herokuapp.com/uploads/${item}`
                })

            })
            setImages(images)
        }
    }, [props.detail])

    return (
        <div>
            <ImageGallery items={Images} />

        </div>
    )
}

export default ProductImage
