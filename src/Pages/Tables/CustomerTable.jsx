import Table from '../../Custom_Components/Table'
import { getAdmins } from '../../Services/AdminService'
import React, { useEffect, useState } from 'react'
import { columns } from '../../Employee/columns'
import { getCustomers } from '../../Services/CustomerService'

const CustomerTable = () => {

    const [data, setData] = useState([])

    const getAllCustomers = () => {
        const response = getCustomers().then((response) => {
            setData(response);
        }).catch((err) => {
            console.log(err);
        });
    }
  
    useEffect(() => {
        getAllCustomers();
    }, [])

    return (
        <>
            {data !== null && (<Table columns={columns} data={data}  filterField={"name"}/>)}
        </>
  );
}

export default CustomerTable