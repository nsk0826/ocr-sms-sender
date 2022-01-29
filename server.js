import { resolve } from "dotenv"

const express = require("express")
const app = express()
const port = 5000

app.use(express.json())

// Twilioの認証情報
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER
const client = require("twilio")(accountSid, authToken)

// リクエストで受け取った電話番号とテキストをもとにSMSを送信する
app.post("/send-sms", (req, res) => {
  client.messages
    .create({body: req.body.text, from: fromPhoneNumber, to: req.body.to})
    .then(message => {
      res.json({ sid: message.sid })
    })
    .catch(() => res.sendStatus(500))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})