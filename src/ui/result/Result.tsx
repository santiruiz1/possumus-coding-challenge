import { useNavigate } from "react-router-dom";
import { useTriviaStore } from "../../services/store";
import { useEffect, useState } from "react";
import { finalMessage } from "../../application/utils";
import Button from "../components/Button";

function Result() {
  const navigate = useNavigate();
  const { points, clearTrivias } = useTriviaStore();
  const [message, setMessage] = useState("");

  useEffect(()=> {
    setMessage(finalMessage(points))
    return () => clearTrivias()
  }, [])

  const playAgain = () => {
    navigate("/trivias");
  };
  const backHome = () => {
    navigate("/");
  };
  return (
    <div className=" h-full flex flex-col gap-10 justify-center items-center">
      <h1 className="text-6xl font-bold">Your score: {points}</h1>
      <p className="text-xl">{message}</p>
      <p className="text-2xl font-semibold">Thank you for playing!</p>
      <div className="w-1/2 flex justify-evenly">
        <Button className="w-64 text-2xl font-semibold bg-transparent hover:bg-primary hover:border-white hover:text-white" onClick={playAgain} title={'Play Again'} />
        <Button className="w-64 text-2xl font-semibold bg-transparent hover:bg-primary hover:border-white hover:text-white" onClick={backHome} title={'Back to Homepage'} />
      </div>
    </div>
  );
}

export default Result;
