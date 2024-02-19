import Table from '../../Custom_Components/Table'
import React, { useEffect, useState } from 'react'
import { columns } from '../../Orders/columns'
import { getOrders } from '../../Services/OrderService'

const RSOTable = () => {

    const [data, setData] = useState([])

    const getAllOrders = async () => {
        const response = await getOrders().then((response) => {
            setData(response);
        }).catch((err) => {
            console.log(err);
        });
    }
  
    useEffect(() => {
        getAllOrders();
    }, [])

    return (
        <>
            {data !== null && (<Table columns={columns} data={data} filterField={"status"}/>)}
        </>
  );
}

export default RSOTable