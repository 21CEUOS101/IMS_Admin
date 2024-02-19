import { AddEmployeeForm } from '../Custom_Components/AddEmployeeForm'
import React from 'react'

const AddEmployee = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <AddEmployeeForm />
        </div>
      </div>
    </div>
  )
}

export default AddEmployee