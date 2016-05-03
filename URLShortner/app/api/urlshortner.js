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

	function findURL(link,db,res){
		var urlsave = db.collection('urlsave');
		urlsave.findOne({
			"short_url":link
		},function(err,result){
			if (err) throw err;
			if(result){
				res.redirect(result.original_url);
			}else{
				res.send({
					"error":"This URL is not present in DB."
				});
			}
		});
	}

	function validateURL(url){
		var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
		return regex.test(url);
			}

}
