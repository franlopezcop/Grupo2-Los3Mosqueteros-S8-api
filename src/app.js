const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors');

app.use(cors());

app.set('views', path.resolve(__dirname, 'views')); 
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname,'../public')));
app.use(express.json()); // para poder trabajar con información que llegue en formato json


const apiMainRouter = require("./routes/apiMainRouter.js")
app.use("/" ,apiMainRouter)


const apiUserRouter = require("./routes/apiUserRouter.js")
app.use("/api/users", apiUserRouter)

// Products
const apiProductRouter = require("./routes/apiProductRouter.js")
app.use("/api/products", apiProductRouter)

const port = process.env.PORT || 3030;


app.listen(port, () => {
    console.log("Servidor corriendo en el puerto " + port);
})


