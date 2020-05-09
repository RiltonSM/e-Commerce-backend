const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const search = await connection('produtos').select('*');
        return response.json(search);
    },

    async item(request, response){
        let { id } = request.params;
        id = id[0];
        console.log(id);
        const search = await connection('produtos').where('id', id).select('*');
        console.log(search);
        return response.json(search);
    },

    async create(request,response){
        const { nome, valor, valorAnt, promocao, imagem, categoria } = request.body;
        await connection('produtos').insert({
            nome,
            valor,
            valorAnt,
            promocao,
            imagem,
            categoria
        });
        return response.send('create');
    },

    async update(request, response){
        const {id, nome, valor, valorAnt, promocao, imagem, categoria } = request.body;
        await connection('produtos').where('id', id).update({
            nome,
            valor,
            valorAnt,
            promocao,
            imagem,
            categoria
        });
        return response.send('update');
    },

    async delete(request, response){
        const { id } = request.params;

        await connection('produtos').where('id', id).delete();

        response.send('delete');
    },

    async category(request, response){
        const { id } = request.params;
        const products = await connection('produtos').where('categoria', id).select('*');
        return response.json(products);
    }
}