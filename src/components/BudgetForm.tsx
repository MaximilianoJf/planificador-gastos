import { useState } from "react";
import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";

export default function BudgetForm() {
  const [budget, setBudget] = useState(0);
  const { dispatch } = useBudget();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber);
  };

  //verifica si no es numero, devolvera true cuando no es numero
  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0
  }, [budget])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({type: 'add-budget', payload: {budget}})

  }



  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label htmlFor="budgetID" className="text-4xl text-blue-600 font-bold">
          Definir Presupuesto
        </label>
        <input
          id="budgetID"
          type="number"
          className="w-full bg-white border border-gray-200 rounded-md p-2 text-black focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Define tu presupuesto"
          name="budget"
          value={budget}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        value="Definir Presupuesto"
        className="bg-blue-600 rounded-md hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-30"
        disabled={isValid}
      />
    </form>
  );
}
