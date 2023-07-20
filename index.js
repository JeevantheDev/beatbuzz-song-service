require('dotenv').config();

const app = require('./src/server');

const PORT = process.env.PORT || 7997;

app.listen(PORT, console.log(`Song service is running on PORT ${PORT}`));
