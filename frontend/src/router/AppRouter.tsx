import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import PokemonDetailPage from "../pages/PokemonDetailPage";
import PokemonListPage from "../pages/PokemonListPage";
import TcgCardsPage from "../pages/TcgCardsPage";
import TcgCardDetailPage from "../pages/TcgCardDetailPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<PokemonListPage />} />
          <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
          <Route path="/tcg/cards" element={<TcgCardsPage />} />
          <Route path="/tcg/cards/:id" element={<TcgCardDetailPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}