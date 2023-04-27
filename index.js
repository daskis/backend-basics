import express from "express"
const mysql = require("mysql")
const POST = 5000;

const connection = mysql.createConnection({
    host: "root",
    user: "daskis",
    database: "node_basics",
    password: "Daskis009"
});
const app = express()
app.use(express.json())
app.get("/", (req, res) => {
    return res.status(200).json("Работает")
})

app.listen(POST, () => {
    connection.connect((err) => {
        if (err) {
            console.log(err)
            return err;
        }
        else {
            console.log("success")
        }
    })
})