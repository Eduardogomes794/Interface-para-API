import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importando o axios
//import './App.css'

const PersonagemSelection = () => {
  const [personagens, setPersonagens] = useState([]); // Inicializa como um array vazio
  const [selectedPersonagem, setSelectedPersonagem] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // Estado para armazenar a imagem selecionada
  const [selectedDetails, setSelectedDetails] = useState(null); // Estado para armazenar os detalhes do personagem
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageBlur, setImageBlur] = useState('blur(15px)');
  const [guessedName, setGuessedName] = useState('');

  // Função para buscar os dados da API usando axios
  useEffect(() => {
    const fetchPersonagens = async () => {
      try {
        const response = await axios.get('http://localhost:3000/dados'); // Usando axios para fazer a requisição GET
        const data = response.data; // A resposta vem na propriedade "data"

        // Verifica se a resposta é um array
        if (Array.isArray(data)) {
          // Filtra e transforma os dados para o formato desejado
          const personagensFiltrados = data.map(personagem => ({
            name: personagem.nome,
            race: personagem.raca,
            gender: personagem.genero,
            image: personagem.imagem
          }));
          setPersonagens(personagensFiltrados); // Setando o array filtrado
        } else {
          throw new Error('Dados recebidos não estão no formato esperado');
        }

        setLoading(false);
      } catch (error) {
        setError(error.message); // Em caso de erro, armazena a mensagem de erro
        setLoading(false);
      }
    };

    fetchPersonagens();
  }, []);

  // Exibindo a imagem e os detalhes do personagem
  const ExibirClick = () => {
    if (selectedPersonagem) {
      const personagem = personagens.find(p => p.name === selectedPersonagem);

      setImageBlur('blur(15px)');
      // Atualiza o estado da imagem do personagem selecionado
      setSelectedImage(personagem.image);
      setSelectedDetails({
        name: personagem.name,
        race: personagem.race,
        gender: personagem.gender
      });
    } else {
      alert('Selecione um personagem!');
    }
  };

  const verificarPalpite = () => {
    if (guessedName.toLowerCase() === selectedDetails.name.toLowerCase()){
      setImageBlur('blur(0px)');
    } else{
      alert('O nome está incorreto. Tente novamente!');
    }
  };


  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <>
      <div id="personagem-selection">
        <label htmlFor="personagem" className='titulo'>Escolha um personagem:</label>
        <select
          id="personagem"
          value={selectedPersonagem}
          onChange={(e) => setSelectedPersonagem(e.target.value)}
        >
          <option value="">Selecione um personagem</option>
          {personagens.length > 0 ? (
            personagens.map((personagem, index) => (
              <option key={personagem.name} value={personagem.name}>
                {`Personagem ${index + 1}`} {/* Exibe Personagem 1, Personagem 2, ... */}
                {/*personagem.name*/}
              </option>
            ))
          ) : (
            <option value="">Nenhum personagem disponível</option>
          )}
        </select>
        <button id="exibir" onClick={ExibirClick}>Exibir Personagem</button>
      </div>

      <div id="personagem-selection">
        <div id="character-image">
          {selectedImage && (
            <div>
              <img src={selectedImage} style={{filter: imageBlur}} alt="Personagem Selecionado" />
              <div id="personagem-details">
                {selectedDetails && (
                  <div>
                    <label htmlFor="guess" className='label-nome'>Nome:</label>
                    <input id='guess' type="text" value={guessedName} onChange={(e) => setGuessedName(e.target.value)} />
                    <p className='detail-item'><strong>Raça:</strong> {selectedDetails.race}</p>
                    <p className='detail-item'><strong>Gênero:</strong> {selectedDetails.gender}</p>
                    <button onClick={verificarPalpite}>Verificar</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PersonagemSelection;

/*
Código para resolver o problema de CORS temporariamente: deixa vulnerável (adicionar na API)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Permite todas as origens
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
*/

/*
Para resolver inderteminadamente:

  npm install cors - no terminal

Exemplo para usar na API:

    const express = require('express');
    const cors = require('cors');
    const app = express();
    const PORT = 3000;

    // Habilita CORS para todas as origens
    app.use(cors());

    // Rotas de API
    app.get('/dados', (req, res) => {
      res.json([
        {
          nome: 'Goku',
          raca: 'Saiyan',
          genero: 'Male',
          imagem: 'https://dragonball-api.com/characters/goku_normal.webp',
        },
        // Outros personagens
      ]);
    });

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });



*/