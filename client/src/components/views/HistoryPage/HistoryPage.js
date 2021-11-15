import React from 'react'

function HistoryPage(props) {

    function getFormatDate(real) {
        var date = new Date(real)
        var year = date.getFullYear();
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var day = ('0' + date.getDate()).slice(-2);
        var hours = ('0' + date.getHours()).slice(-2);
        var minutes = ('0' + date.getMinutes()).slice(-2);
        var seconds = ('0' + date.getSeconds()).slice(-2);

        var timeString = hours + ':' + minutes + ':' + seconds;
        var dateString = year + '-' + month + '-' + day;

        var Time = dateString + " " + timeString 

        return Time
    }

    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>History</h1>

            </div>
            <br />
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Date Of Purchase</th>
                    </tr>
                </thead>
                <tbody>
                    {props.user.userData &&
                        props.user.userData.history.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{getFormatDate(item.dateOfPurchase)}</td>
                            </tr>
                        ))}

                </tbody>
            </table>

        </div>
    )
}

export default HistoryPage
