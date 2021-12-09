import { Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { Box } from '@mui/system';
import React, { Fragment } from 'react'

const columns = [
    { id: 'employee_id', label: 'Employee ID'},
    { id: 'name', label: 'Name'},
    { id: 'date', label: 'Date'},
    { id: 'time_in', label: 'Time In'},
    { id: 'time_in_image', label: 'Time In Image'},
    { id: 'time_out', label: 'Time Out'},
    { id: 'time_out_image', label: 'Time Out Image'},
    { id: 'status', label: 'Status'},
    { id: 'shift', label: 'Shift'},
    { id: 'schedule_in', label: 'Schedule In'},
    { id: 'schedule_out', label: 'Schedule Out'},
  ];
  
function AttendanceTable(props) {
    const handleChangePage = (event, newPage) => {
        props.setPage(newPage+1);
    };
    
    const handleChangeRowsPerPage = (event) => {
        props.setRowsPerPage(+event.target.value);
        props.setPage(1);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 550 }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                                <Box 
                                    sx={{ 
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    {column.label}
                                    {
                                    //    column.label !== '' ? <SortByAlphaIcon /> : null
                                    }
                                </Box>
                            </TableCell>
                        ))}
                        <TableCell>
                            <Box 
                                sx={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    { props.data.length !== 0 &&
                        props.data.data.map((item) => (
                            <TableRow 
                                hover 
                                role="checkbox" 
                                tabIndex={-1}
                                key={item.id}
                            >
                                <TableCell align="left"> {item.employee_id} </TableCell>
                                <TableCell align="left"> {item.name} </TableCell>
                                <TableCell align="left"> {item.date} </TableCell>
                                <TableCell align="left"> {item.time_in} </TableCell>
                                <TableCell align="left"> 
                                    <Avatar alt={item.name} src={item.image_in_url} />
                                </TableCell>
                                <TableCell align="left"> {item.time_out} </TableCell>
                                <TableCell align="left"> 
                                    <Avatar alt={item.name} src={item.image_out_url} />
                                </TableCell>
                                <TableCell align="left"> {item.status} </TableCell>
                                <TableCell align="left"> {item.shift} </TableCell>
                                <TableCell align="left"> {item.schedule_in} </TableCell>
                                <TableCell align="left"> {item.schedule_out} </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                </Table>
            </TableContainer>
            {
                props.data.length !== 0 &&
                <Fragment>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={props.data.meta.total}
                        rowsPerPage={props.data.meta.per_page}
                        page={props.data.meta.current_page-1}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Fragment>
            }
        </Paper>
    )
}

export default AttendanceTable
