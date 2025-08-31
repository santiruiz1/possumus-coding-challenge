import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useConfigStore } from "./services/store";

function App() {
  const { setCategories, setToken } = useConfigStore();
  useEffect(() => {
    setCategories();
    setToken();
  }, []);
  return (
    <main className="w-full h-dvh font-mulish text-text  bg-gradient-to-r from-white from-15% via-primary to-primary flex flex-col">
      <Routes>
        <Route path="/" element={<div>HOLA</div>} />
        <Route path="/trivias" element={<div>HELLO</div>} />
        <Route path="/result" element={<div>CIAO</div>} />
        <Route path="*" element={<div>NOT FOUND</div>} />
      </Routes>
      <footer className="">Made by Santiago Ruiz♥️</footer>
    </main>
  );
}

export default App;
