const path = require("path")
const express = require("express")
const app = express()

app.use(express.static(path.join(__dirname, "dist")))

app.listen(3000, () => {
    console.log(`listening at port 3000`)
})
