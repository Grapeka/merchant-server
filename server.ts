const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
import authRoute from './routes/authRoute';
import menuRoute from './routes/menuRoute';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/menu', menuRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
