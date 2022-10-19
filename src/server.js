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

const port = process.env.PORT || 3030
app.listen(port, () => console.log("Server listening on port "+ port));
