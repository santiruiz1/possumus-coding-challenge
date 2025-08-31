import { useEffect, useState } from "react";
import { useConfigStore, useTriviaStore } from "../../services/store";
import loadingImg from "../../assets/loading.png";
import { sleep } from "../../application/utils";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Modal from "../components/Modal";

function Trivias() {
  const {
    trivias,
    incPoints,
    currentTriviaIndex,
    setCurrentTriviaIndex,
    setTrivias,
    clearPoints,
    loading,
    error,
  } = useTriviaStore();
  const navigate = useNavigate();
  const { choosenCategory, choosenDifficulty } = useConfigStore();
  const [response, setResponse] = useState<string | null>(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setCurrentTriviaIndex(0);
    clearPoints();
    setTrivias(choosenDifficulty, choosenCategory);
  }, []);

  useEffect(() => {
    const checkAnwser = async () => {
      if (response && trivias[currentTriviaIndex]) {
        if (response === trivias[currentTriviaIndex].correct_answer) {
          incPoints();
        }
        await sleep(2000); // Give time for animations
        nextTrivia();
      }
    };
    checkAnwser();
  }, [response, trivias, currentTriviaIndex]);

  const nextTrivia = () => {
    setResponse(null);
    if (trivias.length > currentTriviaIndex + 1) {
      setCurrentTriviaIndex(currentTriviaIndex + 1);
    } else {
      navigate("/result");
    }
  };

  return (
    <div className="h-full w-full flex flex-col gap-20 items-center justify-center">
      <Button title="Leave" className="absolute top-5 left-5 bg-transparent border-2 border-text hover:border-white hover:bg-primary hover:text-white" onClick={() => setModal(true)} />
      <Modal open={modal} close={()=>setModal(false)} />
      <h1 className="text-4xl w-2/3 text-center font-semibold">{!loading && trivias[currentTriviaIndex]?.question}</h1>
      <div className="flex gap-20 justify-around">
        {loading && <img src={loadingImg} className="w-20 animate-spin" alt="Loading..." />}
        {error && !loading && trivias.length == 0 && <span className="text-red-500 text-2xl">{error}</span>}
        {!loading && trivias.length > 0 && trivias[currentTriviaIndex]?.shuffledAnswers?.map((answer) => (
          <Button
            key={answer}
            className={
              "transition-all p-4 text-2xl font-semibold rounded-lg bg-transparent border-text border-2 shadow-md hover:border-white hover:bg-primary hover:text-white" +
              (response && answer === trivias[currentTriviaIndex].correct_answer
                ? " hover:bg-green-500 !bg-green-500 animate-pulse outline-green-700 outline-4 text-white"
                : (response === answer && " hover:bg-red-500 !bg-red-500 animate-pulse outline-red-700 outline-4 text-white") || "")
            }
            onClick={() => setResponse(answer)}
            title={answer}
          />
        ))}
      </div>
    </div>
  );
}

export default Trivias;
