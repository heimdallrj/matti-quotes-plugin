const request = require('request');

function getQuoteOfTheDay() {
  return new Promise(function(resolve, reject) {
    request('http://quotes.rest/qod.json', function (error, response, body) {
      if (!error && response && response.statusCode === 200) {
        const requestBody = JSON.parse(body);
        const quote = (requestBody && requestBody.contents && requestBody.contents.quotes) ? requestBody.contents.quotes[0] : null;
        resolve(quote);
      } else {
        reject(error);
      }
    });
  });  
}

module.exports = (session, message) => {
  getQuoteOfTheDay().then(function(response) {
    session.send(response && `${response.quote} - ${response.author}`);
    return true;
  }).catch(function(error) {
    session.send(error);
    return false;
  });
}
