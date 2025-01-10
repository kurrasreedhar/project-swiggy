import { BrowserRouter, Route, Routes } from "react-router-dom"
import {MainComponent} from "./Components/Maincomponent"
import {Restaurant} from "./Components/Restaurant"


function App() {

  return (
    <div >
      <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<MainComponent/>}/>
        <Route path="/restaurant/:resid" element={<Restaurant/>}/>
   </Routes>
   </BrowserRouter>
    </div>
    
  )
}

export default App
