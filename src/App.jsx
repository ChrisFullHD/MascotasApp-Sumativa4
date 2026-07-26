import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import MascotasPage from "./pages/MascotasPage";
import MascotasForm from "./components/mascotas/MascotasForm";
import MascotasDetail from "./components/mascotas/MascotasDetail";
import MascotasCrearPage from "./pages/MacotaCrearPage";

function App() {

  return (
    <>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow">
          <div className="container">
          <NavLink className="navbar-brand fw-bold" to={"/mascotas"}>MascotasApp</NavLink>
          </div>
        </nav>

        <Routes>

          <Route path="/mascotas" element={<MascotasPage />} />
          <Route path="/mascotas/:id" element={<MascotasDetail />} />
          <Route path="/mascotas/crear" element={<MascotasCrearPage />} />

          <Route path="/" element={<Navigate to ="/mascotas" replace/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
