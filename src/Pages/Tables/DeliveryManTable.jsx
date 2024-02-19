import Table from '../../Custom_Components/Table'
import { getAdmins } from '../../Services/AdminService'
import React, { useEffect, useState } from 'react'
import { columns } from '../../Employee/columns'
import { getDeliveryMans } from '../../Services/DeliveryManService'

const DeliveryManTable = () => {

    const [data, setData] = useState([])

    const getAllDeliveryMans = async () => {
        const response = await getDeliveryMans().then((response) => {
            setData(response);
        }).catch((err) => {
            console.log(err);
        });
    }
  
    useEffect(() => {
        getAllDeliveryMans();
    }, [])

    return (
        <>
            {data !== null && (<Table columns={columns} data={data}  filterField={"name"}/>)}
        </>
  );
}

export default DeliveryManTable