"Ваш код повинен зробити PATCH-запит до вказаного URL, де {userId} – це ID існуючого користувача."
"Для оновлення користувача передайте в запит нові дані, наприклад, нове ім’я."
"Поверніть відповідь від сервера з оновленими даними користувача."

"https://jsonplaceholder.typicode.com/users - адреса куди робити запит"


const https = require('https');

function updateUser(id, updatedData) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(updatedData);

    const options = {
      hostname: 'jsonplaceholder.typicode.com',
      path: `/users/${id}`,
      method: 'PATCH',
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

updateUser(1, { name: 'New Name' })
  .then(response => console.log(response))
  .catch(error => console.error(error));

module.exports = updateUser;