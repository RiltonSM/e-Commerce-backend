const convert = require('xml-js');
const qs = require('qs');

const api = require('../utils/pagseguro');
const apiV3 = require('../utils/pagseguroV3');
const token = require('../utils/token');

module.exports = {
    async getId(request, response){
        try{
            await api.post(`sessions?email=rilton_moreira@hotmail.com&token=${token}`)
            .then(reply => {
                const json = convert.xml2js(reply.data, {compact: true});
                response.send(json.session.id._text);
                
            });
        } catch (err){
            response.send(err)
        }
        
    },

    async buy(request, response){
        const { payment } = request.body;
        console.log(payment);
        
        await api.post(`transactions?email=rilton_moreira@hotmail.com&token=${token}`, 
                qs.stringify({
                    paymentMode:'default',
                    paymentMethod:'creditCard',
                    currency:'BRL',
                    itemId1: payment.item.id,
                    itemDescription1:"Produtos da Rilton Store",
                    itemAmount1:`${payment.item.amount}`,
                    itemQuantity1:payment.item.quantity,
                    senderName:payment.sender.name,
                    senderCPF:payment.sender.documents.value,
                    senderAreaCode:payment.sender.phone.areaCode,
                    senderPhone:payment.sender.phone.number,
                    senderEmail:payment.sender.email,
                    senderHash:payment.sender.hash,
                    shippingAddressRequired: false,
                    creditCardToken:payment.creditCard.token,
                    installmentQuantity:payment.installment.quantity,
                    installmentValue:payment.installment.value,
                    noInterestInstallmentQuantity:payment.installment.noInterestInstallmentQuantity,
                    creditCardHolderName:payment.holder.name,
                    creditCardHolderCPF:payment.holder.document.value,
                    creditCardHolderBirthDate:payment.holder.birthDate,
                    creditCardHolderAreaCode:payment.holder.phone.areaCode,
                    creditCardHolderPhone:payment.holder.phone.number,
                    billingAddressStreet:payment.billingAddress.street,
                    billingAddressNumber:payment.billingAddress.number,
                    billingAddressComplement:payment.billingAddress.complement,
                    billingAddressDistrict:payment.billingAddress.district,
                    billingAddressPostalCode:payment.billingAddress.postalCode,
                    billingAddressCity:payment.billingAddress.city,
                    billingAddressState:payment.billingAddress.state,
                    billingAddressCountry:'BRA'
                }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=ISO-8859-1'
                }
        }).then(answer => {
            const json = convert.xml2js(answer.data, {compact: true});
            console.log(json);
            response.send(json.transaction);
        }).catch((err) => {
            //const json = convert.xml2js(err.data, {compact: true});
            console.log(err)
            response.send(err);
        })       
    },

    async getStatus(request, response){
        const { code } = request.params;
        console.log(code);
        await apiV3.get(`transactions/${code}?email=rilton_moreira@hotmail.com&token=${token}`)
        .then(answer => {
            const json = convert.xml2js(answer.data, {compact: true});
            console.log(json);
            response.send(json.transaction.status["_text"]);
        })
        .catch((err) => {
            //const json = convert.xml2js(err.data, {compact: true});
            console.log(err)
            response.send('err');
        })
    }
}