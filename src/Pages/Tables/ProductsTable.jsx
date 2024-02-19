import Table from '../../Custom_Components/Table'
import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../../Services/ProductService'
import { columns } from '../../Product/product_column'
import { DataTable } from '../../Product/data-table'

const ProductsTable = () => {

    const [data, setData] = useState([])

    const getData = async () => {
        await getAllProducts().then((response) => {
          setData(response);
        }).catch((err) => {
            console.log(err);
        });
    }
  
    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            {data !== null && (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="container mx-auto py-10">
              <DataTable columns={columns} data={data} filterField={"name"} />
            </div>
          </div>
        </div>
      )}
        </>
  );
}

export default ProductsTable