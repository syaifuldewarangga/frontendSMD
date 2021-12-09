import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { Fragment } from 'react'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';

const columns = [
    {
        id: 'departement',
        label: 'Departement',
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

function DepartementTable() {
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
                            <TableRow hover role="checkbox" tabIndex={-1} >
                                <TableCell align="">
                                    Departement
                                </TableCell>
                                <TableCell align="right">
                                    <Box
                                        sx={{ 
                                            display: 'flex'
                                        }}
                                    >
                                        <Button variant="outlined" color="error" sx={{ mr:2 }}>
                                                <DeleteIcon />
                                        </Button>
                                        <Button variant="outlined" color="primary">
                                                <EditIcon />
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Fragment>
    )
}

export default DepartementTable
