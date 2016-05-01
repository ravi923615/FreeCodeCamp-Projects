'use strict';
module.exports = function(app,db){
	app.route('/:url')
		.get(handleGet);

	app.get('/new/:url',handlePost);

	function handleGet(req,res){
		var url = process.env.APP_URL + req.param.url;
		if(url != process.env.APP_URL + 'favicon.ico'){
			findURL(url,db,res);
		}
	}

	function handlePost(req,res){
		var url = req.url.slice(5);
		var urlObj = {};
		if(validateURL(url)){
			urlObj = {
				"original_url": url,
				"short_url": process.env.APP_URL + newLink()
			};
			res.send(urlObj);
			save(urlObj,db);
		}else{
			urlObj = {
				"error": "Wrong URL format, Please send the corrected format"
			};
			res.send(urlObj);
		}
	}

	function newLink(){
		var number = Math.floor(100000+Math.random()*900000);
		return num.to_string().substring(0,4);
	}

	function save(obj,db){
		var urlsave = db.collection('urlsave');
		urlsave.save(obj,function(err,result){
			if(err) throw err;
			console.log('Saved the url'+result);
		});
	}
}
