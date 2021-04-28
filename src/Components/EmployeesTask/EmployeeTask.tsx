import React, { useState } from 'react'
import EmployeesTable from './EmployeesTable'
import './EmployeesTask.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormDialogue from './FormDialogue';

const EmployeeTask = () => {

    const [openForm,setOpenForm] = useState(false);
    const notify: () => React.ReactText = () => toast.success("Employee Added Successfully");
    const handleClose: () => void = () => setOpenForm(false);

    return (
        <div className="empListDiv">
                <EmployeesTable openForm={openForm} setOpenForm={setOpenForm}/>
                <FormDialogue openForm={openForm} handleClose={handleClose} notify={notify}/>
                <ToastContainer />
        </div>
    )
}

export default EmployeeTask
