const Clarifai = require('clarifai');



const app = new Clarifai.App({
 apiKey: '63939f86c9b7496e8735e7adac86845d'
});


const handleApiCall = (req, res) => {
    app.models.initModel({id: 'd02b4508df58432fbb84e800597b8959'})
      .then(faceRecog => {
        return faceRecog.predict(req.body.input);
      }).then(data => {
      	res.json(data);
      })
      .catch(err => res.status(400).json('Could not work with API.'))
}



const handleImagePut = (req, res, db) => {
	const { id } = req.body;
	 db('users').where('id', '=', id)
  	 .increment('entries', 1)
  	 .returning('entries')
  	 .then(entries => {
  	 	res.json(entries[0]);
  	 })
  	 .catch(err => res.status(400).json('Could not find entries'))
  }

  module.exports = {
  	handleImagePut,
  	handleApiCall

  }