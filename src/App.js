import { useState } from "react"
import OcrReader from "./components/OcrReader"
import SmsSender from "./components/SmsSender"
import "./App.css"

function App() {
  const [ocrData, setOcrData] = useState("")

  // 子コンポーネントからOCRデータをPropsとして受け取る
  const onReadOcrData = (ocrData) => {
    setOcrData(ocrData)
  }

  // 子コンポーネントで別の画像が押されたことをPropsで検知
  const onRemoveClicked = () => {
    setOcrData("")
  }

  return (
    <div className="App">
      <header> Welcome OCR App</header>
      <OcrReader
        onReadOcrData={onReadOcrData}
        onRemoveClicked={onRemoveClicked}
      />
      {ocrData && <SmsSender readText={ocrData} />}
    </div>
  );
}

export default App;