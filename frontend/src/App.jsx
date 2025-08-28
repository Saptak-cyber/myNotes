import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css'
import CreatePage from "./pages/CreatePage"
import HomePage from "./pages/HomePage"
import NoteDetailPage from "./pages/NoteDetailPage"
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <div className="relative h-full w-full">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />

        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/create" element={
            <ProtectedRoute>
              <CreatePage/>
            </ProtectedRoute>
          }></Route>
          <Route path="/note/:id" element={
            <ProtectedRoute>
              <NoteDetailPage/>
            </ProtectedRoute>
          }></Route>
        </Routes>
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#00FF9D',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </AuthProvider>
  )
}

export default App
