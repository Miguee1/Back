const express = require('express');
const morgan = require('morgan');
const body = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');

const { mongoose } = require('./database');
//const body_parser = require('body-parser');
//settings
app.set('port', process.env.PORT || 3000);

//middlewares funcines que se ejecutan antes de que lleguen a nuestra rutas
app.use(cors());

//app.use(morgan('dev'));
app.use(express.json());
app.use(body.json());
app.use(body.urlencoded({ extended: true })); // support encoded bodies


//Routers
app.use('/api/task', require('./routers/task.routers'));
//statics files

app.use(express.static(path.join(__dirname, 'public')));
//empezando el servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);

});
