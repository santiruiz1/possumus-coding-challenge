import Form from "../form/Form"

const Home = () => {

  return <div className="h-full flex flex-col gap-10 justify-center items-center">
    <h1 className="text-7xl font-bold">Possumus Trivias Challenge</h1>
    <p className="text-xl">Welcome!!! This app was made following the instructions provided by Possumus as part of my coding challenge.</p>
    <p className="text-xl">You can choose a difficulty and category for your trivias, or make them random.</p>
    <Form />
  </div>
}

export default Home