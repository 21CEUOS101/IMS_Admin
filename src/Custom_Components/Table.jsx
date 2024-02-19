import { DataTable } from '../Employee/data-table'
import React from 'react'

const Table = ({ data , columns , filterField }) => {
  return (
      <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} filterField={filterField}/>
          </div>
          </div>
    </div>
  )
}

export default Table;