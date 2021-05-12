const express = require('express');
const cors = require('cors');

const app = express();

// connects to mongoDB
// connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes/index'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, err => {
    if (err) console.log(`Error running on port ${PORT}`);
    else console.log(`Server running on port ${PORT}`);
}); 