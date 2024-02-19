import Table from '../../Custom_Components/Table'
import React, { useEffect, useState } from 'react'
import { columns } from '../../Employee/columns'
import { getSuppliers } from '../../Services/SupplierService'

const SupplierTable = () => {

    const [data, setData] = useState([])

    const getAllSuppliers = () => {
        const response = getSuppliers().then((response) => {
            setData(response);
        }).catch((err) => {
            console.log(err);
        });
    }
  
    useEffect(() => {
        getAllSuppliers();
    }, [])

    return (
        <>
            {data !== null && (<Table columns={columns} data={data}  filterField={"name"}/>)}
        </>
  );
}

export default SupplierTable