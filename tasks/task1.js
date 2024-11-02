"Ваша функція повинна робити GET-запит до вказаного URL і отримати дані."
"Поверніть дані користувачів у форматі масиву"
"Дані мають включати такі поля, як id та name."

"https://jsonplaceholder.typicode.com/users - адреса куди робити запит"

const https = require('https');

function fetchUsers() {
  return new Promise((resolve, reject) => {
    https.get('https://jsonplaceholder.typicode.com/users', (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const users = JSON.parse(data);
          const formattedUsers = users.map(user => ({
            id: user.id,
            name: user.name,
          }));
          resolve(formattedUsers);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

fetchUsers()
  .then(users => console.log(users))
  .catch(error => console.error(error));

module.exports = fetchUsers;