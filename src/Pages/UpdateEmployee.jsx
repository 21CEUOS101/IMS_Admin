import { UpdateEmployeeForm } from '../Custom_Components/UpdateEmployeeForm'
import React from 'react'

const UpdateEmployee = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <UpdateEmployeeForm />
        </div>
      </div>
    </div>
  )
}

export default UpdateEmployee;