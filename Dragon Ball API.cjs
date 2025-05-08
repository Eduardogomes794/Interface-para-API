const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

//app.use(express.static('front'))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Permite todas as origens
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

/*app.get('/', (req, res) => {
  res.sendFile(__dirname + '/front/index.html')
})*/

app.get('/dados', async (req, res) => {  
  const response = await axios.get(`https://dragonball-api.com/api/characters?limit=20`)

  const personagens = response.data.items.map((personagem) => {
    let nome = personagem.name;
    if (nome == 'Freezer'){
      nome = 'Freeza';
    }else if (nome == 'Celula'){
      nome = 'Cell';
    }else if (nome == 'Krillin'){
      nome = 'Kuririn';
    }else if (nome == 'Master Roshi'){
      nome = 'Mestre Kame';
    }else if(nome == 'Mr. Satan'){
      nome = 'Mr Satan';
    }

    let raca = personagem.race;
    if (raca == 'Saiyan'){
      raca = 'Saiyajin';
    }else if(raca == 'Namekian'){
      raca = 'Namekuseijin';
    }else if(raca == 'Human'){
      raca = 'Humano';
    }else if(raca == 'Frieza Race'){
      raca = 'Raça Freeza';
    }
    let gen = personagem.gender;
    if(gen = 'Male'){
      gen = 'Masculino';
    }else if(gen == 'Female'){
      gen = 'Feminino';
    }
    const imagem = personagem.image;

    return {
      nome,
      raca,
      genero: gen,
      imagem
    };
  });

  res.json(personagens)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// usar o npm install com o express e o axios url da api: https://web.dragonball-api.com/documentation
