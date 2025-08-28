// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CreatePage from "./pages/CreatePage"
import HomePage from "./pages/HomePage"
import NoteDetailPage from "./pages/NoteDetailPage"
// import toast from 'react-hot-toast'

function App() {
  // const [count, setCount] = useState(0)

  // <div data-theme="forest">
    {/* <button onClick={()=>toast.success("congrats")} className='text-red-500 p-4 bg-pink-300'>Click me</button> */}
    {/* <button onClick={()=>toast.success("congrats")} className='btn btn-primary'>Click me</button> */}
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />

      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/create" element={<CreatePage/>}></Route>
        <Route path="/note/:id" element={<NoteDetailPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App
