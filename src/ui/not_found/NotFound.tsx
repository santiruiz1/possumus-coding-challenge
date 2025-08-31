import { useNavigate } from "react-router-dom"
import Button from "../components/Button"

const NotFound = () => {
  const navigate = useNavigate()
  return <div className="h-full flex flex-col gap-10 justify-center items-center">
    <h1 className="text-7xl font-bold">404 NOT FOUND</h1>
    <p className="text-xl">Sorry! This page doesn't exist.</p>
    <Button title={'Back to Home'} onClick={()=>navigate('/')} className="transition-all text-2xl font-semibold bg-transparent hover:border-white hover:bg-primary hover:text-white" />
  </div>
}

export default NotFound