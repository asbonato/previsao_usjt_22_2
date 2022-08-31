const axios = require("axios");
//sua chave de api
require("dotenv").config();
const appid = process.env.appid;

const q = 'Cuiaba';

const units = 'metric';

const lang = 'pt_BR';

const cnt = 10;

const base_url = 'https://api.openweathermap.org/data/2.5/forecast';

const url = `${base_url}?q=${q}&units=${units}&lang=${lang}&cnt=${cnt}&appid=${appid}`;

//faz a requisição
axios
  .get(url)
  .then((res) => {
    //mostra o resultado e devolve somente a parte de interesse
    console.log(res);
    return res.data;
  })
  .then((res) => {
    //mostra o total e devolve o resultado
    console.log(res.cnt);
    return res;
  })
  .then((res) => {
    //devolve somente a lista de previsões
    console.log("aqui", res);
    return res['list'];
  })
  .then((res) => {
    //para cada resultado, mostra algumas informações
    for(let previsao of res) {
      console.log(`
        ${new Date(previsao.dt * 1000).toLocaleString()},
        ${'Min: ' + previsao.main.temp_min}\u00B0C,
        ${'Max: ' + previsao.main.temp_max}\u00B0C,
        ${'Umd: ' + previsao.main.humidity}%,
        ${previsao.weather[0].description}
      `)
    }
    return res;
  })
  .then((res) => {
    //verifica quantas previsões têm percepção humana
    //de temperatura acima de 30 graus
    const lista = res.filter(r => r.main.feels_like >= 30);
    console.log(`${lista.length} previsões têm percepção humana de temperatura acima de 30 graus`);
  })
  .catch((err) => {
    console.log("Deu erro:", err);
  });

