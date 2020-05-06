const connection = require('../database/connection');

module.exports = {
    async saveCart(request, response) {
        const { userId, products, quantity, userHash, total } = request.body;
        await connection('sales').insert({
            userId,
            products,
            quantity,
            userHash,
            total
        });

        const id = await connection('sales')
            .where('userId', userId)
            .andWhere('userHash', userHash)
            .select('id');
        
        console.log(id)

        response.json(id);
    },

    async getCart(request, response){
        const { userId }= request.body;
        console.log(userId);
        const items = await connection('sales').where('userId', userId).select('*');

        response.json(items);
    },

    async addCode(request, response){
        const { code, userHash } = request.body;

        await connection('sales').where('userHash', userHash).update({
            code
        })
        response.send("0")
    },

    async getCode(request, response){
        const { id } = request.params;
        console.log(id);
        const code = await connection('sales').where('id', id).select('*');
        response.json(code);
    }
}