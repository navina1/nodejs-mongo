const express = require("express");
const app = express();

app.use(express.json());

const db = require("./models");
db.mongoose
    .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
        console.log(err);
        process.exit()
    });
//---------simple route----------------------   
app.get("/", (req, res) => {
    return res.status(234).send("Welcome to My Application")
})

require("./Routes/book.routes")(app);
const PORT =8080;
app.listen(PORT, () => { console.log('Server is running on port 8080') });