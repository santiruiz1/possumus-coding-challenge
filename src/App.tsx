import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useConfigStore } from "./services/store";
import Home from "./ui/home/Home";
import Trivias from "./ui/trivia/Trivia";
import Result from "./ui/result/Result";
import NotFound from "./ui/not_found/NotFound";

function App() {
  const { setCategories, setToken } = useConfigStore();
  useEffect(() => {
    setCategories();
    setToken();
  }, []);
  return (
    <main className="w-full h-dvh font-mulish text-text  bg-gradient-to-r from-white from-15% via-primary to-primary flex flex-col">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trivias" element={<Trivias />} />
        <Route path="/result" element={<Result />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className="">Made by Santiago Ruiz♥️</footer>
    </main>
  );
}

export default App;
