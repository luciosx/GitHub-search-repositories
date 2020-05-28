import api from './api';

class Api {
    constructor() {
        this.repositories = [];//vai receber todos os repositorios da busca

        this.formEl = document.querySelector('form#repo-form');
        this.inputEl = document.querySelector('input[name=repository]');
        this.listEl = document.querySelector('ul#repo-list');

        this.registerHandlers();
    }

    registerHandlers() {//registra os eventos (ouve os eventos)
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true) {
        if(loading === true) {
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando...'));
            loadingEl.setAttribute('id', 'loading');

            this.formEl.appendChild(loadingEl);
        } else {
            document.getElementById('loading').remove();
        }
    }

    async addRepository(event) {
        event.preventDefault();//impede a pagina de regarregar a cada interação

        const repoInput = this.inputEl.value;//pega o valor vindo do input

        if(repoInput.length === 0)//testa se veio algum valor no input
            return;//serve para para a função se o input tiver vazio

        this.setLoading();

        try{
            const response = await api.get(`/repos/${repoInput}`);//requisição a api

            //desestruturação de objetos
            const { name, description, html_url, owner: {avatar_url} } = response.data;

            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url,
            });

            this.inputEl.value = '';

            this.render();

        } catch(err) {
            alert('O repositório não existe!');
        }

        this.setLoading(false);
        
    }

    render() {//apaga todos os elementos da lista e renderiza tudo outra vez
        this.listEl.innerHTML = '';

        this.repositories.forEach(repo => {//percorre todo o repositorio
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));
            
            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);
        });
    }
}

new Api();