import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Clothing from "./pages/Clothing";
// import Customize from "./pages/Customize";
import Accessories from "./pages/Accessories";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/clothing" element={<Clothing />} />
        {/* <Route path="/customize" element={<Customize />} /> */}
        <Route path="/accessories" element={<Accessories />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
