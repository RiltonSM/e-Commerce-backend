const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response){
        const { password, email } = request.body;
        const hash = crypto.createHmac('sha256', password)
            .digest('hex');
        const user = await connection('users')
            .where('email', email)
            .andWhere('password', hash)
            .select('id', 'email', 'name', 'cpf', 'cep', 'street', 'complement', 'number', 'district', 'city', 'state', 'ddd', 'phone', 'purchases');
        response.json(user)
    },
    async create(request, response){
        const { 
            email,
            password, 
            name, 
            cpf, 
            cep, 
            street, 
            number, 
            complement, 
            district, 
            city, 
            state, 
            ddd, 
            phone 
        } = request.body;
        const hash = crypto.createHmac('sha256', password)
            .digest('hex');
        await connection('users')
            .insert({
                email, 
                name,
                "password": hash, 
                cpf, 
                cep, 
                street, 
                number, 
                complement, 
                district, 
                city, 
                state, 
                ddd, 
                phone,
                "purchases": null
            })
        response.send('create');
    },

    async purchased (request, response){
        const { cpf, codes } = request.body;
        console.log(cpf, codes)
        await connection('users').where("cpf", cpf).update({
            "purchases": codes
        });

        const reply = await connection('users').where('cpf', cpf).select('id', 'email', 'name', 'cpf', 'cep', 'street', 'number', 'complement', 'district', 'city', 'state', 'ddd', 'phone', 'purchases');
        response.json(reply)
    }
}