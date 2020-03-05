const express = require("express");
const morgan = require("morgan");
const body = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { mongoose } = require("./database");

const accessTokenSecret = "HOLA_ESTA_ES_MI_CONTRASE;A";

//const body_parser = require('body-parser');
//settings
app.set("port", process.env.PORT || 3000);

//middlewares funcines que se ejecutan antes de que lleguen a nuestra rutas
app.use(cors());

//app.use(morgan('dev'));
app.use(express.json());
app.use(body.json());
app.use(body.urlencoded({ extended: true })); // support encoded bodies

//Routers

const users = [
  {
    username: "migue",
    password: "123",
    role: "admin"
  },
  {
    username: "anna",
    password: "123",
    role: "member"
  }
];

// endpoint para logearse
app.post("/login", (req, res) => {
  // SE DEBE ENVIAR UN USUARIO CONTRASE;A
  const { username, password } = req.body;

  //VALIDAR QUE EL USUARIO EXISTA EN LA BASE DE DATOS
  const user = users.find(u => {
    return u.username === username && u.password === password;
  });

  // SI EL USUARIO EXISTE GENERAR EL TOKEN
  if (user) {
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      accessTokenSecret
    );

    res.json({
      accessToken
    });
  } else {
    // SI NO EXISTE MANDAR EL MENSAJE DE QUE LOS DATOS SON INCORRECTOS
    res.send("Username or password incorrect");
  }
});

app.use("/api/task", require("./routers/task.routers"));
//statics files

app.use(express.static(path.join(__dirname, "public")));
//empezando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
