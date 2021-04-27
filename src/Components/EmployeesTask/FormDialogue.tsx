import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import axios from 'axios';
import React, { useState } from 'react'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
const baseURL = process.env.REACT_APP_MOCKAPI_URI; //Getting BaseUrl Fron .env

type FormDialogueProps = {
    openForm: boolean,
    handleClose: () => void,
    notify: () => React.ReactText,
}
const rejexLet = /^[a-zA-Z\s]*$/;

const FormDialogue = ({ openForm,handleClose,notify } : FormDialogueProps) => {

    const [employee, setEmployee] = useState(
        {
            name:'',
            email:'',
            position:'',
        });
    const [loading,setLoading]= useState(false);
    const cleanForm = () => setEmployee({name:'',email:'',position:'',});
    const handleSubmit = (e:React.FormEvent) =>
    {
        e.preventDefault();
        if(employee.name.match(rejexLet) && employee.position.match(rejexLet))
        {
            setLoading(true);
            axios.post(baseURL + "/users",employee)
            .then(res => {
                console.log(res.data);
                cleanForm();
                setLoading(false);
                handleClose();
                notify();
            })
            .catch(err => {
                alert(err);
                setLoading(false);
            })
        }
        else{alert("Form Contains Errors")}
    }

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => setEmployee({...employee,[e.target.name]:e.target.value})

    return (
        <Dialog open={openForm} onClose={handleClose}>
            <DialogTitle>Add Employee</DialogTitle>
                {
                loading ? <LoadingSpinner/>: //If Loading is true then Show Spinner Else Form
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField //Name Input
                            autoFocus
                            name="name"
                            label="Enter Name"
                            type={"text"}
                            error={!employee.name.match(rejexLet)}
                            helperText={!employee.name.match(rejexLet) && "Name Should only Contain Letters"}
                            fullWidth
                            value={employee.name}
                            onChange={handleChange}
                            required
                        />
                        <TextField //Email Input
                            margin="dense"
                            name="email"
                            label="Enter Email"
                            type="email"
                            fullWidth
                            value={employee.email}
                            onChange={handleChange}
                            required
                        />
                        <TextField //Position Input
                            margin="dense"
                            name="position"
                            label="Enter Position"
                            type={"text"}
                            fullWidth
                            value={employee.position}
                            onChange={handleChange}
                            error={!employee.position.match(rejexLet)}
                            helperText={!employee.position.match(rejexLet) && "Position Should only Contain Letters"}
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant={"contained"} color="secondary">
                            Close
                        </Button>
                        <Button type={"submit"} variant={"contained"} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </form>}
      </Dialog>
    )
}

export default FormDialogue
