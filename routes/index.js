var express = require('express');
var router = express.Router();

var soap = require('soap');
//var url = "http://wsf.cdyne.com/WeatherWS/Weather.asmx?wsdl";
var url = "http://192.168.0.101:8080/Calculadora/services/Calculadora?wsdl";
var args;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'WebService', result: '0' });
});

/* Post Calcular. */
router.post('/', function(req, res) {
	args = {n1: req.body.valor1, n2: req.body.valor2};
	soap.createClient(url, function(err, client) { 
		if(req.body.op == "soma"){
			client.soma(args, function(err, result) {
			      // res.send(result.somaReturn); 
			      res.render('index', { title: 'WebService', result: result.somaReturn || '0' });
			});
		} else if(req.body.op == "subtracao") {
			client.sub(args, function(err, result) { 
			      // res.send(result.somaReturn); 
			      res.render('index', { title: 'WebService', result: result.subReturn || '0' }); 
			});
		} else if(req.body.op == "multiplicar") {
			client.multiplicar(args, function(err, result) {
			      // res.send(result.somaReturn); 
			      res.render('index', { title: 'WebService', result: result.multiplicarReturn || '0' }); 
			});
		} else if(req.body.op == "dividir") {
			client.dividir(args, function(err, result) {
			      // res.send(result.somaReturn); 
			      res.render('index', { title: 'WebService', result: result.dividirReturn || '0' });
			});
		}
	}); 
});
module.exports = router;
