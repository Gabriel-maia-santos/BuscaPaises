import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [response, setResponse] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const BuscarPais = (pais) => {
    axios.get(`https://restcountries.com/v3.1/name/${pais}`)
      .then(response => {
        const data = response.data[0];
        setResponse(data);
        setShowInfo(true);
        console.log('Resposta:', data);
      })
      .catch(error => {
        setShowInfo(false);
        console.error('Erro ao buscar o país:', error);
      });
  }

  
  return (
    <div className="App">
      <input onChange={(e) => BuscarPais(e.target.value)} />
      {showInfo && response && response.name && (
        <div>
          <h1>{response.name.common}</h1>
          <img src={response.flags && response.flags.png} alt={`Bandeira ${response.name.common}`} />
          {response.capital && response.capital[0] && <p><strong>Capital:</strong> {response.capital[0]}</p>}
          {response.languages && response.languages.por && <p><strong>Idioma:</strong> {response.languages.por}</p>}
          {response.currencies && response.currencies.BRL && <p><strong>Moeda:</strong> {response.currencies.BRL.name} ({response.currencies.BRL.symbol})</p>}
          <p><strong>Área:</strong> {response.area} km²</p>
          {response.maps && response.maps.googleMaps && <p><strong>Google Maps:</strong> <a href={response.maps.googleMaps} target="_blank" rel="noopener noreferrer">Link</a></p>}
          <p><strong>Sigla:</strong> {response.cca2}</p>
          <p><strong>Região:</strong> {response.region}</p>
          {response.borders && response.borders.length > 0 && <p><strong>Países que fazem fronteira:</strong> {response.borders.join(', ')}</p>}
        </div>
      )}
      {!showInfo && <p>Nenhum país encontrado.</p>}
    </div>
  );
}

export default App;
