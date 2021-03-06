const request = require('request');
const fetchBreedDescription = function(breedName , callback) {
  const url = 'https://api.thecatapi.com/v1/breeds/search';
  const querry = `${url}?q=${breedName}`;
  request(querry , (error, response, body) => {
    console.log("string", body);
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode === 404) {
      return callback(response.statusCode, null);
    }
    const data = JSON.parse(body);
    if (data[0] === undefined) {
      return callback(`${breedName} Not found`, null);
    }
    return callback(null, data[0].description);
  });
};

module.exports = {fetchBreedDescription};