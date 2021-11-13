import React from 'react'
import './ProductBlock.css'

function ProductBlock(props) {


    const renderProductImage = (images) => {
        if (images.length > 0) {
            let image = images[0]
            return `https://frozen-cove-46738.herokuapp.com/uploads/${image}`
        }

    }


    const renderItems = () => (
        props.products && props.products.map((product, index) => (
            <tr key={index}>
                <td>
                    <img style={{ width: '70px' }} alt="product"
                        src={renderProductImage(product.images)} />
                </td>
                <td>
                    {product.title}
                </td>
                <td>
                    {product.continents}
                </td>
                <td>
                    $ {product.price}
                </td>
                <td>
                    <button>
                        {<a href={`/product/products/update/${product._id}`}>UPDATE</a>}
                    </button>
                </td>
                <td>
                    <button onClick={() => props.deleteProduct(`${product._id}`)}>
                        DELETE
                    </button>{/*product id를 넣는 이유는 id로 상품을 찾아서 삭제하기 위해*/}
                </td>
            </tr>
        ))
    )


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Title</th>
                        <th>Product Continent</th>
                        <th>Product Price</th>
                        <th>Product Update</th>
                        <th>Product Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default ProductBlock
