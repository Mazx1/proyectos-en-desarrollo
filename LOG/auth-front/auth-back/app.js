const express = require('express');
const cors = require('cors');
const app = express();
//const moogose = require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/signup", require('./routes/signup'));
app.use("/api/login", require('./routes/login'));
app.use("/api/user", require('./routes/user'));
app.use("/api/todos", require('./routes/todos'));
app.use("/api/refreshToken", require('./routes/refreshToken'));
app.use("/api/signout", require('./routes/signout'));


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
/*
moogose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));*/