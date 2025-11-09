import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import ProductPage from "./components/ProductPage";
import TopSellers from "./components/TopSellers";

function App() {
  return (
    <Router>
      <div className="flex h-screen w-full p-2">
        <Sidebar />
        <div className="flex  justify-between w-[85%] ">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>

          <div className="w-[25%]">
            <TopSellers />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
