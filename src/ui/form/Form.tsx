import { useForm } from "react-hook-form";
import { triviaDifficulty } from "../../application/trivia";
import { useConfigStore } from "../../services/store";
import { useNavigate } from "react-router-dom";
import Select from "../components/Select";
import Button from "../components/Button";

type FormInputs = {
  difficulty: string;
  category: string;
};

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const navigate = useNavigate();
  const { categories, loading, setCategory, setDifficulty, error } = useConfigStore();

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDifficulty(event.target.value);
  };
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(parseInt(event.target.value));
  };

  return (
    <form
      onSubmit={handleSubmit(() => navigate("/trivias"))}
      className="flex flex-col items-center gap-10"
    >
      <div className="flex gap-5">
        <Select label="Random Difficulty" register={register("difficulty")} onChange={handleDifficultyChange} options={triviaDifficulty} />
        {errors.difficulty && <span>{errors.difficulty.message}</span>}
        <Select label={loading ? "Loading categories..." : "Random Category"} register={register("category")} onChange={handleCategoryChange} options={categories} />
        {errors.category && <span>{errors.category.message}</span>}
        {error && <span className="text-red-500">{'Error getting categories' + error}</span>}
      </div>
      <Button type="submit" title="PLAY!" className="transition-all w-1/2 text-2xl font-semibold bg-transparent hover:border-white hover:bg-primary hover:text-white" />
    </form>
  );
}

export default Form;
