import { BrowserRouter, Route, Routes } from "react-router-dom"
import {MainComponent} from "./Components/Maincomponent"
import {Restaurant} from "./Components/Restaurant"
import {Cart} from "./Components/Cart";
import { Search } from "./Components/Search";

function App() {

  return (
    <div >
      <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<MainComponent/>}/>
        <Route path="/restaurant/:resid" element={<Restaurant/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/search" element={<Search/>}/>
   </Routes>
   </BrowserRouter>
    </div>
    
  )
}

export default App
