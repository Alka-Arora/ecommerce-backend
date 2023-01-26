const express = require("express");
const app = express();
var cors = require('cors')
require("./db/conn");
const port = process.env.PORT || 8000;
const registerRouter=require("./routers/registerRouter")
const itemRouter=require("./routers/itemRouter")
const categoryRouter=require("./routers/categoryRouter")
const cartRouter=require("./routers/cartRouter")
const corsOptions ={
    origin:'http://localhost:8000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(express.json());
app.use(registerRouter);
app.use(itemRouter);
app.use(categoryRouter);
app.use(cartRouter);
app.use(cors())

app.listen(port, () => {
    console.log(`connection is succesful on ${port}`)
});