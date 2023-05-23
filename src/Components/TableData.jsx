import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useTheme } from '../ContextFiles/ThemeContext'
function TableData({ data }) {
    const { theme } = useTheme()
    const styles = { color: theme.textColor, textAlign: 'center' }
    return (
        <div className='table'>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={styles}>WPS</TableCell>
                            <TableCell style={styles}>Accuracy</TableCell>
                            <TableCell style={styles}>Characters</TableCell>
                            <TableCell style={styles}>Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((i,ind) =>
                        (<TableRow key={ind}>
                            <TableCell style={styles}>{i.wpm}</TableCell>
                            <TableCell style={styles}>{i.Accuracy}</TableCell>
                            <TableCell style={styles}>{i.character}</TableCell>
                            <TableCell style={styles}>{i.timeStamp.toDate().toLocaleString()}</TableCell>
                        </TableRow>)
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default TableData