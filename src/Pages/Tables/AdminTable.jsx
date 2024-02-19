import Table from '../../Custom_Components/Table'
import { getAdmins } from '../../Services/AdminService'
import React, { useEffect, useState } from 'react'
import { columns } from '../../Employee/columns'

const AdminTable = () => {

    const [data, setData] = useState([]);

    const getAllAdmins = async () => {
        await getAdmins().then((response) => {
            setData(response);
        }).catch((err) => {
            console.log(err);
        });
    }
  
    useEffect(() => {
        getAllAdmins();
    }, [])

    return (
        <>
            {data !== null && (<Table columns={columns} data={data} filterField={"name"}/>)}
        </>
  );
}

export default AdminTable