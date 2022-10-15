const express = require('express');
const routes = require('./routes');
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(3030, () => console.log("Server listening on port 3030"));
