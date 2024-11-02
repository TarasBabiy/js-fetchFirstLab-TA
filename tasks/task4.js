"Ваш код повинен зробити DELETE-запит до вказаного URL, де {userId} – це ID користувача, якого потрібно видалити."
"Поверніть статус відповіді сервера після видалення."

"https://jsonplaceholder.typicode.com/users - адреса куди робити запит"


const https = require('https');

function deleteUser(id) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'jsonplaceholder.typicode.com',
      path: `/users/${id}`,
      method: 'DELETE',
    };

    const req = https.request(options, (res) => {
      resolve({ status: res.statusCode }); // Повертаємо об'єкт з полем status
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

deleteUser(1)
  .then(response => console.log(response.status))
  .catch(error => console.error(error));

module.exports = deleteUser;
