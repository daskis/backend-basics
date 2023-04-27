import express from "express"
import mysql from "mysql"
const POST = 5000;

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
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