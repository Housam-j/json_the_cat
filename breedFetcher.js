const request = require('request');
const arg = process.argv[2];
const fetcher = function(breedName , callback) {
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
fetcher(arg, (error, desc) => {
  if (error) {
    console.log('Error fetch details:', error);
  } else {
    console.log(desc);
  }
});
module.exports = fetcher;