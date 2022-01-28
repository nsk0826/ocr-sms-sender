import { useState } from "react"
import { createWorker } from "tesseract.js"

// 画像のOCR処理ステータス
const STATUSES = {
  IDLE: "",
  FAILED: "OCR処理に失敗しました。",
  PENDING: "OCR処理中...",
  SUCCEEDED: "OCR処理完了",
}

export default OcrReader