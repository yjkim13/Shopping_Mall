import React ,{useState}from 'react'
import { Collapse,Radio  } from 'antd';

const { Panel } = Collapse;

function RadioBox(props) {


    const renderRadioBox = () => (
        props.list && props.list.map(value =>(
            <Radio key={value._id} value> {value.name} </Radio>
        
        ))
    )
    

    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="Price" key="1">
                    {renderRadioBox()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox
