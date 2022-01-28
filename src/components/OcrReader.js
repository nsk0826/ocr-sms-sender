import { useState } from "react"
import { createWorker } from "tesseract.js"

// 画像のOCR処理ステータス
const STATUSES = {
  IDLE: "",
  FAILED: "OCR処理に失敗しました。",
  PENDING: "OCR処理中...",
  SUCCEEDED: "OCR処理完了",
}

function OcrReader({onReadOcrData, onRemoveClicked}){
  const [selectedImage, setSelectedImage]  = useState(null)
  const [ocrState, setOcrState] = useState(STATUSES.IDLE)
  const worker = createWorker()

  // 画像のOCR処理
  const readImageText = async() => {
    setOcrState(STATUSES.PENDING)
    try {
      await worker.load()
      // OCRで読み取りたい言語の設定
      await worker.loadLanguage("jpn")
      await worker.initialize("jpn")
      const { data: { text } } = await worker.recognize(selectedImage)
      await worker.terminate()

      // 日本語テキストはスペースが入ることがあるのでスペースを削除
      const strippedText = text.replace(/\s+/g, "")
      onReadOcrData(strippedText)
      setOcrState(STATUSES.SUCCEEDED)
    } catch (err) {
      setOcrState(STATUSES.FAILED)
    }
  }
}

export default OcrReader