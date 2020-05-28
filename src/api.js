import axios from 'axios';

const api = axios.create({//cria a configuração do axios
    baseURL: 'https://api.github.com',//todas as requisições são feitas automaticamente para esse link
});

export default api;