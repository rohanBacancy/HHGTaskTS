import { Table, TableContainer, TableHead, TableCell,TableBody,TableRow,Paper, Typography, Button } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useTable,usePagination } from 'react-table';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
const baseURL = process.env.REACT_APP_MOCKAPI_URI; //Getting BaseUrl Fron .env

declare module 'react-table' {
    interface TableState<D extends object = {}>
        extends  UsePaginationState<D> {}
    interface TableInstance<D extends object = {}>
        extends  UsePaginationInstanceProps<D> {}
}

const COLUMNS = [
        {
            Header:'Name',
            accessor:'name'
        },
        {
            Header:'Email',
            accessor:'email'
        },
        {
            Header:'Position',
            accessor:'position',
        },
    ]

type EmployeesTableProps = {
    openForm: boolean,
    setOpenForm: React.Dispatch<React.SetStateAction<boolean>>,
}


const EmployeesTable = ({ openForm,setOpenForm }: EmployeesTableProps) => {

    const [employees, setEmployees] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        if(!openForm){
        setLoading(true);
        axios.get(baseURL + `/users?sortBy=id&order=desc`)
        .then(res => {
            setEmployees(res.data);
            setLoading(false);
        })
        .catch(err => {
            alert(err);
            setLoading(false);
        })
    }}, [openForm])
    
    const columns = useMemo(() => COLUMNS,[]);
    
    const tableInstace = useTable({
        columns:columns,
        data:employees,
        initialState:{pageIndex:0,pageSize:5}
    }, usePagination)
    
    const {
        getTableProps , 
        getTableBodyProps , 
        headerGroups , 
        page , 
        prepareRow,
        nextPage,
        setPageSize,
        state,
        previousPage,
        canNextPage,
        canPreviousPage,
    } = tableInstace;
    
    const { pageIndex } = state;

    return (
        <div>
            <div className={"empListTitle"}><Typography variant={"h4"}>Employees List</Typography></div>

            { loading ? <LoadingSpinner/> : 
            <TableContainer variant={"outlined"} component={Paper} style={{maxWidth:'60vw'}}>
            <Table {...getTableProps()}>
                <TableHead>
                    { headerGroups.map((headerGroup) => 
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => 
                        <TableCell {...column.getHeaderProps()}>
                            <Typography color="primary" variant={"h6"}>{column.render('Header')}</Typography>
                        </TableCell>
                        )}
                    </TableRow>
                    )}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    
                        {page.map((row) => 
                            {prepareRow(row)
                            return(
                                <TableRow {...row.getRowProps()}>
                                    {
                                        row.cells.map((cell) => 
                                        {
                                            return <TableCell {...cell.getCellProps()}><Typography variant={"subtitle1"}>{cell.render('Cell')}</Typography></TableCell>
                                        })
                                    }
                                </TableRow>
                            )}
                        )}                   
                </TableBody>
            </Table>
            </TableContainer>}

                <div className="contentBelowTable">
                    <span>
                        <Button variant={"contained"} color={"primary"} onClick={() => setOpenForm(true)}>+ New</Button> {/* Open Popup Form Toggle */}
                        &nbsp;&nbsp;Results Per Page 
                        <Button onClick={() => setPageSize(5)} color={"secondary"}>5</Button> |  {/* To set size of employee data per page */}
                        <Button onClick={() => setPageSize(15)} color={"secondary"}>15</Button> | 
                        <Button onClick={() => setPageSize(20)} color={'secondary'}>20</Button> 
                    </span>
                    <Button disabled={!canPreviousPage} onClick={() => previousPage()} variant={"outlined"} color={"primary"}>Prev</Button> &nbsp; {pageIndex+1} &nbsp; <Button disabled={!canNextPage} onClick={() => nextPage()} variant={"outlined"} color={"primary"}>Next</Button>
                </div>
        </div>
    )
}

export default EmployeesTable
