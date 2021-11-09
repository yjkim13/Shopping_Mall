import React, { useState } from 'react'
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {
        //누른 것의 index를 구하고
        const currentIndex = Checked.indexOf(value)

        //전체 checked된 State에서 현재 누른 CheckBox가 이미 있다면
        const newChecked = [...Checked]

        if (currentIndex === -1) {
            newChecked.push(value)
            // 빼주고
        } else {
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        props.handleFilters(newChecked)


        //State 넣어준다.
    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox onChange={() => handleToggle(value.name)} checked={Checked.indexOf(value.name) === -1 ? false : true}>
                {value.name}
            </Checkbox>
        </React.Fragment>
    ))

    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="Continents" key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
