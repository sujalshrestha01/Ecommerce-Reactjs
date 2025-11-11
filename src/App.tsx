import { Route, HashRouter  as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import ProductPage from "./components/ProductPage";
import TopSellers from "./components/TopSellers";

function App() {
  return (
    <Router>
      <div className="flex justify-self-center h-screen max-w-[1440px] w-full p-2">
        <Sidebar />

        <div className="sm:ml-[25%] md:ml-[15%]   flex  justify-self-center sm:w-[80%] lg:w-[60%] ">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </div>
          <div className="hidden lg:block ml-8 w-[23%] ">
            <TopSellers />
          </div>
        
      </div>
    </Router>
  );
}

export default App;
