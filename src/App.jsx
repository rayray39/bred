import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount((prev) => prev + 1);
  }

  return (
    <>
      <div style={{color:'white'}}>{`this is the current count ${count}`}</div>
      <button type="button" class="btn btn-light" onClick={handleClick}>click me</button>
    </>
  )
}

export default App
