const express =  require("express")
const mysql =  require("mysql")
const bodyParser =  require("body-parser");
const multer =  require("multer");
const cors =  require("cors");
const PORT = 5000;
const upload = multer()
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "node_basics",
    password: "Daskis009"
});
const app = express()
app.use(bodyParser.json())
app.use(upload.array()); 
app.use(express.static('public'));
app.use(cors())
app.post("/", (req, res) => {
    const data = {
        name: false,
        email: false,
        birthYear: false,
        sex: false,
        limbs: false,
        biography: false,
        superpower: false
    }
    const NAME_REGEXT = /^[А-ЯЁ][а-яё]+$/
    const superpower = {
        levitation: false,
        immortality: false,
        passing: false
    }
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if (req.body) {
        if (!NAME_REGEXT.test(req.body.name)) {
            data.name = true;
        } 
        if (!EMAIL_REGEXP.test(req.body.email)) {
            data.email = true;
        }
        if (!req.body.birthYear) {
            data.birthYear = true;
        }
        if (!req.body.sex) {
            data.sex = true;
        }
        if (!req.body.limbs) {
            data.limbs = true;
        }
        if (req.body.superpower) {
            for (let item of req.body.superpower) {
                superpower[item.value] = true
            }
        } 
        if (req.body.superpower.length == 0) {
            data.superpower = true
        }
        if (!req.body.biography) {
            data.biography = true;
        }
        let f = false;
        for (const [key, value] of Object.entries(data)) {
            if (value) {
                f = true
            }
        }
        if (f) {
            return res.json({fail: data})
        } else {
            try {
                const answerData = Object.assign(superpower, req.body)
                delete answerData.superpower
                connection.query(`INSERT INTO peoples (name, email, birthYear, sex, limbs, levitation, immortality, passing, biography)
                    VALUES ("${req.body.name.toString()}", "${req.body.email.toString()}", "${req.body.birthYear.toString()}", "${req.body.sex.toString()}","${req.body.limbs.toString()}",${Boolean(superpower.levitation)},${Boolean(superpower.immortality)},${Boolean(superpower.passing)},"${req.body.biography.toString()}");`)
            return res.json({success: answerData})
            } catch (e) {
                console.log(e)
            }
        }
        
        
    }
})

app.listen(PORT, () => {
    connection.connect((err) => {
        if (err) {
            console.log(err)
        }
    })
})
