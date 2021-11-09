import React, { useState } from 'react'
import { Input } from 'antd';

const { Search } = Input;

function SearchFeature(props) {

    const [SearchTrem, setSearchTrem] = useState("")

    const searchHandler = (event) => {
        setSearchTrem(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }


    return (
        <div>
            <Search
                placeholder="input search text"
                onChange={searchHandler}
                style={{ width: 200 }}
                value={SearchTrem}
            />
        </div>
    )
}

export default SearchFeature
