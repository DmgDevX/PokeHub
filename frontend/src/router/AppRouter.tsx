import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PokemonDetailPage from "../pages/PokemonDetailPage";
import PokemonListPage from "../pages/PokemonListPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonListPage />} />
        <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}