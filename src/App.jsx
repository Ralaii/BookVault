import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import BookDetailPage from "./pages/BookDetailPage";


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

        <Route
          path="/page/book/:id"
          element={
            <MainLayout>
              <BookDetailPage/>
            </MainLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;