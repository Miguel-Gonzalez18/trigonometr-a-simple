import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { GlosarioPage } from "./features/glossary/GlosarioPage";
import { Inicio } from "./features/home/Inicio";
import { TemaPage } from "./features/practice/TemaPage";
import { PruebaPage } from "./features/quiz/PruebaPage";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/tema/:temaId" element={<TemaPage />} />
        <Route path="/prueba" element={<PruebaPage />} />
        <Route path="/glosario" element={<GlosarioPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
