import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import PageLayout from "./layout/PageLayout";
import CartPage from "./pages/CartPage";
import MensPage from "./pages/MensPage";
import WomensPage from "./pages/WomensPage";
import ElectronicsPage from "./pages/ElectronicsPage";
import JeweleryPage from "./pages/JeweleryPage";

function App() {
  return (
    <>
      <Router>
        <PageLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/men" element={<MensPage />} />
            <Route path="/women" element={<WomensPage />} />
            <Route path="/electronics" element={<ElectronicsPage />} />
            <Route path="/jewelery" element={<JeweleryPage />} />
          </Routes>
        </PageLayout>
      </Router>
    </>
  );
}

export default App;
