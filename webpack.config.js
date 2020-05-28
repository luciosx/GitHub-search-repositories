module.exports = {
    entry: ['@babel/polyfill','./src/main.js'],//informa qual o arquivo principal da app
    output: {//informa para qual arquivo devo passar o codigo para ser covertido para antes do ES6
        path: __dirname + '/public',
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: __dirname + '/public',//onde ele deve abrir o servidor da app
    },
    module: {
        rules: [//obrigatorio para gerencia das pastas e arquivos da app
            {
                test: /\.js$/,//identifica sempre que é criado um arquivo .js
                exclude: /node_modules/,//para o babel não exucutar nenhum arquivo js de dentro do node_modules
                use: {
                    loader: 'babel-loader',
                }
            }
        ],
    },
}