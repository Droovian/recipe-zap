import { Route, Router,  Routes, Link } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Login from "./components/Login"
import Recipe from "./components/Recipe"
import NotFound from "./components/NotFound"
import Register from "./components/Register"

function App() {

  return (
    <div>

    <Navbar/>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/add-recipe" element={<Recipe/>}/>
        <Route path="*" element={<NotFound/>}/>
    </Routes>
    </div>
  )
}

export default App
