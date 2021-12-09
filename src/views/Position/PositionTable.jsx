import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { Fragment } from 'react'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';

const columns = [
    {
        id: 'position',
        label: 'Position',
        minWidth: 170,
        scope: "row"
    },
    {
        id: 'action',
        label: '',
        minWidth: 170,
        align: 'right'
    }
]

function PositionTable(props) {
    return (
        <Fragment>
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
                                        scope={column.scope}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.data.map((item) => (
                                    <TableRow 
                                        hover 
                                        role="checkbox" 
                                        tabIndex={-1}
                                        key={item.id}
                                    >
                                        <TableCell align="">
                                            { item.position_name }
                                        </TableCell>
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
                                                    onClick={() => props.showDialogDelete(item.id)}
                                                >
                                                        <DeleteIcon />
                                                </Button>
                                                <Button 
                                                    variant="outlined" 
                                                    color="primary"
                                                    onClick={() => props.showDialogUpdate(item.id)}
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
            </Paper>
        </Fragment>
    )
}

export default PositionTable
