import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useTriviaStore } from "../../services/store";

type Props = {
  close: () => void;
  open: boolean
};

const Modal = ({ close, open }: Props) => {
  const { clearTrivias, clearPoints } = useTriviaStore()
  const navigate = useNavigate();
  const handleClose = () => {
    clearTrivias()
    clearPoints()
    navigate('/')
  }
  return (
    <div className={"absolute bg-black bg-opacity-30 top-0 left-0 w-full h-dvh flex justify-center items-center" + (open ? " block" : " hidden")}>
      <div className="p-10 w-[500px] rounded-xl bg-white border border-text">
        <p className="text-center mb-8 text-xl font-semibold">Are you sure you want to leave?</p>
        <div className="flex gap-10">
          <Button title="Yes" onClick={handleClose} className="transition-all w-1/2 text-lg bg-transparent hover:border-white hover:bg-primary hover:text-white" />
          <Button title="Keep playing" onClick={close} className="transition-all w-1/2 text-lg bg-transparent hover:border-white hover:bg-primary hover:text-white" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
