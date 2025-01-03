import React, { useEffect, useState } from 'react'
import { listEmployees, deleteEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {

    const [employees, setEmployees] =useState([]);

    const navigate = useNavigate();

    useEffect(() => {
       getAllEmployees();
    }, [])

    function getAllEmployees(){
        listEmployees().then((response) => {
            setEmployees(response.data)
        }).catch(error => {
            console.error(error)
        });
    }

    function addEmployee(){
        navigate('/add-employee')
    }

    function updateEmployee(id){
        navigate(`/edit-employee/${id}`)
    }
    function removeEmployee(id){
        deleteEmployee(id).then((response) => {
            getAllEmployees();
        }).catch(error => {
            console.log(error);
         })
    }

  return (
    <div className='container'>
        <br />
        <h2 className='text-center'>List Of Employees</h2>
        <br />
        <br />
        <button className='btn btn-secondary mb-3' onClick={addEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered table-hover'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee => 
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className='btn btn-primary' onClick={() => updateEmployee(employee.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)} style={{marginLeft: '12px'}}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>

        </table>
    </div>
  )
}

export default ListEmployeeComponent