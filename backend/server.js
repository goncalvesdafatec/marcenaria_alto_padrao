/*const app = require('./src/app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(` Servidor rodando na porta http://localhost:${PORT}`);
});*/


/*const app = require('./src/app'); // Garante que puxa o app.js correto de dentro da src
const port = 3000;

app.listen(port, () => {
    console.log(` Servidor rodando com sucesso na porta ${port}!`);
    console.log(` Teste os componentes em: http://localhost:${port}/api/componentes`);
});*/

const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('====================================');
    console.log(` Servidor rodando na porta ${PORT}`);
    console.log(` Site: http://localhost:${PORT}`);
    console.log(` API: http://localhost:${PORT}/api`);
    console.log(` Componentes: http://localhost:${PORT}/api/componentes`);
    console.log('====================================');
});