const express = require('express');

const routes = express.Router();

const ProdutosController = require('./controllers/ProdutosController');
const PagSeguroController = require('./controllers/PagSeguroController');
const UsersController = require('./controllers/UsersController');
const SalesController = require('./controllers/SalesController');

routes.get('/', function(req, res){
    res.redirect('/produtos');
})
routes.get('/produtos', ProdutosController.index);
routes.get('/item/:id', ProdutosController.item);
routes.post('/novoproduto', ProdutosController.create);
routes.put('/updateproduto', ProdutosController.update);
routes.delete('/remove/:id', ProdutosController.delete);
routes.get('/getId', PagSeguroController.getId);
routes.post('/finish', PagSeguroController.buy);
routes.post('/newuser', UsersController.create);
routes.post('/user', UsersController.index);
routes.put('/purchased', UsersController.purchased);
routes.post('/saveCart', SalesController.saveCart);
routes.post('/getCart', SalesController.getCart);
routes.put('/addCode', SalesController.addCode);
routes.get('/getCode/:id', SalesController.getCode);
routes.get('/getStatus/:code', PagSeguroController.getStatus);

module.exports = routes;