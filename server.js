import { resolve } from "dotenv"

const express = require("express")
const app = express()
const port = 5000

app.use(express.json())

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})