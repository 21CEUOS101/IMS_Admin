import Table from '../../Custom_Components/Table'
import { getAdmins } from '../../Services/AdminService'
import React, { useEffect, useState } from 'react'
import { columns } from '../../Employee/columns'
import { getWMans } from '../../Services/WManagerService'

const WMangerTable = () => {

    const [data, setData] = useState([])

    const getAllWManagers = async () => {
        const response = await getWMans().then((response) => {
            setData(response);
        }).catch((err) => {
            console.log(err);
        });
    }
  
    useEffect(() => {
        getAllWManagers();
    }, [])

    return (
        <>
            {data !== null && (<Table columns={columns} data={data}  filterField={"name"}/>)}
        </>
  );
}

export default WMangerTable