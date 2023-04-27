import express from "express"
const POST = 5000;

const app = express()

app.get("/", (req, res) => {
    return res.status(200).json("Работает")
})

app.listen(POST, () => console.log("success"))