import React, { useEffect, useState } from 'react';
import { addEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

 
    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if (validateForm()) { // Corrected function call
            const employee = { firstName, lastName, email };
            console.log('Employee:', employee);

            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigate('/employees');
                }).catch(error => {
                    console.error(error);
                });
            } else {
                addEmployee(employee).then(response => {
                    console.log(response.data);
                    navigate('/employees');
                }).catch(error => {
                    console.error(error);
                });
            }  
        }
    }

    function validateForm() {
        let valid = true;
        const errorCopy = { ...errors };

        if (firstName.trim()) {
            errorCopy.firstName = '';
        } else {
            errorCopy.firstName = 'This field is required.';
            valid = false;
        }
        if (lastName.trim()) {
            errorCopy.lastName = '';
        } else {
            errorCopy.lastName = 'This field is required.';
            valid = false;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim()) {
            if (emailPattern.test(email)) {
                errorCopy.email = '';
            } else {
                errorCopy.email = 'Invalid email format.';
                valid = false;
            }
        } else {
            errorCopy.email = 'This field is required.';
            valid = false;
        }
        setErrors(errorCopy);

        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Employee Details</h2>;
        } else {
            return <h2 className='text-center'>Enter Employee Details</h2>;
        }
    }

   

    return (
        <div className='container'>
            <br />
            <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    <div className='card-header'>
                        { pageTitle() }
                    </div>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label htmlFor='firstName' className='form-label'><strong>First Name:</strong></label>
                                <input
                                    placeholder='Enter first name'
                                    type='text'
                                    id='firstName'
                                    name='firstName'
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label htmlFor='lastName' className='form-label'><strong>Last Name:</strong></label>
                                <input
                                    placeholder='Enter last name'
                                    type='text'
                                    id='lastName'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>
                            <div className='form-group mb-3'>
                                <label htmlFor='email' className='form-label'><strong>Email:</strong></label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    placeholder='Enter email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>
                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeComponent;
