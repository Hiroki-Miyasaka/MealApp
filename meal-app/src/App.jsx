import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Category from './pages/Category/Category';
import Meal from "./pages/Meal/Meal";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register/>}/>
          <Route path="/category" element={<Category/>}/>
          <Route path='/meal/:id' element={<Meal/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
