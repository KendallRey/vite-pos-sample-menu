import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Providers from "./services/providers";
import { MenuPage } from "./pages/menu/page";
import Layout from "./components/layout/Layout";

// TODOS:
// Suspense
// Lazy Components
// Error Boundary

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MenuPage />} />
          </Route>
          <Route path="/about" element={<Layout />}>
            <Route index element={<MenuPage />} />
          </Route>
          <Route path="/contact" element={<Layout />}>
            <Route index element={<MenuPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
