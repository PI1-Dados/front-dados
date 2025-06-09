import { LineChart } from '@mui/x-charts';
import { createExperiment, getExperiment, getExperiments } from './api/routes';
import './App.css';
import { BarChart } from "@mui/x-charts/BarChart"
import { useEffect, useState } from 'react';

function App() {
  const [dados, setDados] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [distancias, setDistancias] = useState([]);

  useEffect(() => {
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
    console.log(dados[0])
    const initTimestamp = Date.parse(dados[0].timestamp);
    dados.forEach(linha => {
      timestampsAux.push(Date.parse(linha.timestamp) - initTimestamp);        
    });
    dados.forEach(linha => {
      distanciasAux.push(linha.distancia);        
    });
    setDistancias(distanciasAux);
    setTimestamps(timestampsAux);
    console.log(timestamps)
  }, [dados])

  return (
    <>
      { distancias.length > 0 ? (
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
    </>
  );
}

export default App;
