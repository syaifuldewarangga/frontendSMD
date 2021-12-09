import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import { Button, TablePagination } from '@mui/material';

// import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { id: 'name', label: 'Name'},
  { id: 'employee_id', label: 'Employee ID'},
  { id: 'postition', label: 'Position'},
  { id: 'join_date', label: 'Join Date'},
  { id: 'level', label: 'Level'},
  { id: 'status', label: 'Status'},
];

function UsersTable(props) {
    const handleChangePage = (event, newPage) => {
        props.setPage(newPage+1);
    };
    
    const handleChangeRowsPerPage = (event) => {
        props.setRowsPerPage(+event.target.value);
        props.setPage(1);
    };
    console.log(props.data)
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

                    {
                        props.data.length !== 0 &&
                        props.data.data.map((item) => (
                            <TableRow 
                                hover 
                                role="checkbox" 
                                tabIndex={-1}
                                key={item.id}
                            >
                                <TableCell align="left"> {item.first_name} {item.last_name} </TableCell>
                                <TableCell align="left"> {item.employee_id} </TableCell>
                                <TableCell align="left"> {item.job_position} </TableCell>
                                <TableCell align="left"> {item.join_date} </TableCell>
                                <TableCell align="left"> {item.level} </TableCell>
                                <TableCell align="left"> {item.status} </TableCell>
                                <TableCell align="right">
                                    <Box
                                        sx={{ 
                                            display: 'flex'
                                        }}
                                    >
                                        <Button 
                                            variant="outlined" 
                                            color="error" 
                                            sx={{ mr:2 }}
                                            onClick = {() => props.showDialogDelete(item.id)}
                                        >
                                                <DeleteIcon />
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            color="primary"
                                            href={`/master-data/users/edit/${item.id}`}
                                        >
                                                <EditIcon />
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                </Table>
            </TableContainer>
            {
                props.data.length !== 0 &&
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={props.data.total}
                    rowsPerPage={props.data.per_page}
                    page={props.data.current_page-1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            }
        </Paper>
    )
}

export default UsersTable
