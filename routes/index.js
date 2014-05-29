var express = require('express');
var router = express.Router();

var soap = require('soap');
//var url = "http://wsf.cdyne.com/WeatherWS/Weather.asmx?wsdl";
var url = __dirname+"/Calculadora.wsdl";
var args;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'WebService' });
});

/* Post Calcular. */
router.post('/', function(req, res) {
	args = {n1: req.body.valor1, n2: req.body.valor2};
	soap.createClient(url, function(err, client) {
		console.log("req    - " + req.body.op);
		if(req.body.op == "soma"){
			client.soma(args, function(err, result) {
			      // res.send(result.somaReturn); 
			      res.render('index', { title: 'WebService', result: result.somaReturn || '0' });
			});
		} else {
			console.log("entrei no else");
			client.sub(args, function(err, result) {
				console.log("entrei na function ");
			      // res.send(result.somaReturn); 
			      res.render('index', { title: 'WebService', result: result.subReturn || '0' });
			      console.log(result);
			});
		}
	}); 
});
module.exports = router;
