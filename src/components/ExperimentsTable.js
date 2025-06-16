import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
const ExperimentsTable = ({ experimentos }) => {

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID EXPERIMENTO</TableCell>
                        <TableCell>META</TableCell>
                        <TableCell>DATA</TableCell>
                        <TableCell>HORÁRIO</TableCell>
                        <TableCell>STATUS</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {experimentos.map((experimento) => (
                        <TableRow hover key={experimento.id}>
                            <TableCell>{experimento.id}</TableCell>
                            <TableCell>{experimento.distancia_alvo}m</TableCell>
                            <TableCell>{experimento.data}</TableCell>
                            <TableCell>-</TableCell>
                            <TableCell>-</TableCell>
                            <Button>Ver</Button>
                            <Button>Editar</Button>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ExperimentsTable;