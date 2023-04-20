import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Category from './pages/Category/Category';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/category" element={<Category/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
