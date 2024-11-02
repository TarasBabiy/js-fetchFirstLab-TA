"Ваш код повинен зробити POST-запит до вказаного URL."
"Для створення нового користувача, передайте в запит наступні дані:"
"name: ваше ім’я"
"email: ваш email"
"Поверніть відповідь від сервера після створення користувача."

"https://jsonplaceholder.typicode.com/users - адреса куди робити запит"


const https = require('https');

function createUser(user) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(user);

    const options = {
      hostname: 'jsonplaceholder.typicode.com',
      path: '/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(responseData));
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

createUser({ name: "Sam", email: "fjsnfkjns2342@gmail.com" })
  .then(response => console.log(response))
  .catch(error => console.error(error));

module.exports = createUser;
