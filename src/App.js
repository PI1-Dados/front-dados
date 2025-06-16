import { LineChart } from '@mui/x-charts';
import { createExperiment, getExperiment, getExperiments } from './api/routes';
import './App.css';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ExperimentsTable from './components/ExperimentsTable';
function App() {
    const [experimentos, setExperimentos] = useState([]);
    const [dados, setDados] = useState([]);
    const [timestamps, setTimestamps] = useState([]);
    const [distancias, setDistancias] = useState([]);

    useEffect(() => {
        const fetchExperiments = async () => {
            try {
                const response = await getExperiments();
                setExperimentos(response.experimentos);
                console.log(response);
            } catch (err) {
                console.error(err)
            }
        }
        fetchExperiments();

        // função teste:
        const fetchExperiment = async () => {
            try {
                const response = await getExperiment(4);
                setDados(response?.dados_associados);
            } catch (err) {
                console.error(err)
            }
        }
        fetchExperiment()
    }, [])

    useEffect(() => {
        if (timestamps.length <= 0 && distancias.length <= 0 && dados.length <= 0) return;
        const timestampsAux = [];
        const distanciasAux = [];
        // console.log(dados)
        const initTimestamp = Date.parse(dados[0].timestamp);
        dados.forEach(linha => {
            timestampsAux.push(Date.parse(linha.timestamp) - initTimestamp);
        });
        dados.forEach(linha => {
            distanciasAux.push(linha.distancia);
        });
        setDistancias(distanciasAux);
        setTimestamps(timestampsAux);
        // console.log(timestamps)
    }, [dados])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ background: theme.palette.grey }}>
                <Stack direction="row" padding={2} justifyContent="space-between">
                    logo unb
                    <Button variant='contained'>
                        Registrar Lançamento
                    </Button>
                    <Button variant='contained'>
                        Download CSV
                    </Button>
                </Stack>
                <Divider />
                {distancias.length > 0 ? (
                    <LineChart
                        xAxis={[{ data: timestamps }]}
                        series={[
                            {
                                data: distancias,
                            },
                        ]}
                        height={300}
                    />
                ) : (
                    <p>teste</p>
                )}
                <Divider />
                <Stack>
                    <ExperimentsTable experimentos={experimentos}/>
                </Stack>
            </Container>

        </ThemeProvider>
    );
}

export default App;
