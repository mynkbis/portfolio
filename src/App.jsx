import { useState } from 'react'
import './App.css'
import AppRoutes from './routing/AppRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  {/* <div className="h-screen flex justify-center items-center">
      <h1 className="text-lg font-bold text-red-500">Hello, Tailwind with Vite!</h1>
    </div> */}
    <AppRoutes/>
    </>
  )
}

export default App
