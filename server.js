// const express = require('express');
// const bodyParser = require('body-parser');
// const jsonServer = require('json-server');

// const server = express();
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();
// const PORT = 3000;

// server.use(bodyParser.json());
// server.use(middlewares);

// server.post('/registro', (req, res) => {
//   const usuario = req.body;
//   router.db.get('usuarios').push(usuario).write();
//   res.json({ message: 'Usuario registrado correctamente' });
// });

// server.use(router);

// server.listen(PORT, () => {
//   console.log(`JSON Server is running on port ${PORT}`);
// });
