import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Providers from "./services/providers";
import { MenuPage } from "./pages/menu/page";
import Layout from "./components/layout/Layout";
import { ROUTE } from "./constant/route";
import CategoryPage from "./pages/category/page";

// TODOS:
// Suspense
// Lazy Components
// Error Boundary

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTE.HOME.HREF} element={<Layout />}>
            <Route index element={<MenuPage />} />
          </Route>
          <Route path={ROUTE.CATEGORY.HREF} element={<Layout />}>
            <Route index element={<CategoryPage />} />
          </Route>
          <Route path={ROUTE.ACTION_LOGS.HREF} element={<Layout />}>
            <Route index element={<div>Contact</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
