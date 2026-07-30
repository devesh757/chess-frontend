import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Landing } from "./screens/Landing"
import { Game } from "./screens/Game"
import RegisterPage from "./pages/Register"
import LoginPage from "./pages/Login"
import Home from "./pages/Home"
import Sidebar from "./components/Sidebar"

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-zinc-900 text-white">
        <Sidebar />
        <main className="flex-1 lg:ml-64 pb-16 lg:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/game" element={<Game />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
