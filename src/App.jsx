import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
          <MainLayout>
            <Home/>
          </MainLayout>}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;