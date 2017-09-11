var express = require('express');
var app = express();
var cors = require('cors');
var axios = require('axios');
var feed = require("feed-read");
var port = 3000;

app.use(cors());

app.get('/getArticles/:newspapersType', function (req, res) {

	function feedRss(url) {
		feed(url, function(err, articles) {
			if (err) throw err;
			res.send(articles);
		});
	}

	switch (req.params.newspapersType) {
		case "all":
			feedRss("http://www.lexpress.fr/rss/alaune.xml");
			break;
		case "actuFrancelexpress":
			feedRss("http://www.lexpress.fr/rss/alaune.xml");
			break;
		case "actuFranceleMonde":
			feedRss("http://www.lemonde.fr/m-actu/rss_full.xml");
			break;
		case "actuFranceliberation":
			feedRss("http://rss.liberation.fr/rss/latest/");
			break;
		case "actuFranceleFigaro":
			feedRss("http://www.lefigaro.fr/rss/figaro_actualites.xml");
			break;
		case "actuFrancelaCroix":
			feedRss("http://www.la-croix.com/RSS/UNIVERS_WFRA");
			break;
		case "actuFranceleParisien":
			feedRss("http://www.leparisien.fr/actualites-a-la-une.rss.xml#xtor=RSS-1481423633");
			break;
		case "actuFranceleTelegramme":
			feedRss("http://www.letelegramme.fr/france/rss.xml");
			break;
		case "actuMondialelexpress":
			feedRss("http://www.lexpress.fr/rss/monde.xml");
			break;
		case "actuMondialeliberation":
			feedRss("http://rss.liberation.fr/rss/10/");
			break;
		case "actuMondialeleFigaro":
			feedRss("http://www.lefigaro.fr/rss/figaro_international.xml");
			break;
		case "actuMondialelaCroix":
			feedRss("http://www.la-croix.com/RSS/UNIVERS_WMON");
			break;
		case "actuMondialeleParisien":
			feedRss("http://www.leparisien.fr/international/rss.xml#xtor=RSS-1481423633");
			break;
		case "actuMondialeleTelegramme":
			feedRss("http://www.letelegramme.fr/monde/rss.xml");
			break;
		case "sportlexpress":
			feedRss("http://www.lexpress.fr/rss/sport.xml");
			break;
		case "sportliberation":
			feedRss("http://rss.liberation.fr/rss/14/");
			break;
		case "sportsport24":
			feedRss("http://sport24.lefigaro.fr/rssfeeds/sport24-accueil.xml");
			break;
		case "sportlaCroix":
			feedRss("http://www.la-croix.com/RSS/WSPO");
			break;
		case "sportleParisien":
			feedRss("http://www.leparisien.fr/sports/rss.xml#xtor=RSS-1481423633");
			break;
		case "sportleTelegramme":
			feedRss("http://www.letelegramme.fr/sports/rss.xml");
			break;
		case "economieleMonde":
			feedRss("http://www.lemonde.fr/economie/rss_full.xml");
			break;
		case "economieleFigaro":
			feedRss("http://www.lefigaro.fr/rss/figaro_economie.xml");
			break;
		case "economielaCroix":
			feedRss("http://www.la-croix.com/RSS/UNIVERS_WECO");
			break;
		case "economieleParisien":
			feedRss("http://www.leparisien.fr/economie/rss.xml#xtor=RSS-1481423633");
			break;
		case "economieleTelegramme":
			feedRss("http://www.letelegramme.fr/economie/rss.xml");
			break;
		case "technologieleMonde":
			feedRss("http://www.lemonde.fr/technologies/rss_full.xml");
			break;
		case "technologieleFigaro":
			feedRss("http://www.lefigaro.fr/rss/figaro_secteur_high-tech.xml");
			break;
		case "technologieleParisien":
			feedRss("http://www.leparisien.fr/high-tech/rss.xml#xtor=RSS-1481423633");
			break;
		case "politiquelexpress":
			feedRss("http://www.lexpress.fr/rss/politique.xml");
			break;
		case "politiqueliberation":
			feedRss("http://rss.liberation.fr/rss/11/");
			break;
		case "politiqueleFigaro":
			feedRss("http://www.lefigaro.fr/rss/figaro_politique.xml");
			break;
		case "politiquelaCroix":
			feedRss("http://www.la-croix.com/RSS/WFRA-POL");
			break;
		case "politiqueleParisien":
			feedRss("http://www.leparisien.fr/politique/rss.xml#xtor=RSS-1481423633");
			break;
	}

});

app.listen(port, function() {
	console.log("Serveur pret sur le port : " + port);
});