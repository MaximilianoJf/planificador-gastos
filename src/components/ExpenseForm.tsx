import Input from "./shared/Input"
import { categories } from "./data/categories"
import type { Category, DraftExpense } from "../types"
import Select from "./shared/Select"
import DatePicker from 'react-date-picker';
import { useEffect, useState, type ChangeEvent } from "react";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css'
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ExpenseForm() {
    
    const {dispatch, state, remainingBudget} = useBudget()
    const [error, setError] = useState('')
    const [previousAmount, setPreviousAmount] = useState(0)


    
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    useEffect(() => {
      if(state.editingId){
          const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
          setExpense(editingExpense)
          setPreviousAmount(editingExpense.amount)
      }
      
    }, [state.editingId])

   

    const handleChangeDate = (value : Value) => {
      
        setExpense({
            ...expense,
            date: value
        })
    }
    
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target
        const isAmountField = ['amount'].includes(name)
        
        setExpense({
            ...expense,
            [name] : isAmountField ? +value : value
        })

     
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        // validar
        if(Object.values(expense).includes('')){
            setError('Todos los campos son obligatorios')
            return
        }

        // validar pasar del presupuesto
        if((expense.amount - previousAmount) > remainingBudget){
            setError('Ese gasto se sale del presupuesto')
            return
        }
        

        if(state.editingId){
            dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}})
        }else{
            dispatch({type: 'add-expense', payload: {expense}})
        }

        //reiniciar el expense
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })

        setPreviousAmount(0)

    }


  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend className="uppercase p-1 text-center text-2xl font-black text-black border-b-4">
            {state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto'}
        </legend>

        {error && <ErrorMessage>{error}</ErrorMessage>}
    
        <Input
            type="text"
            label="Nombre del gasto"
            name='expenseName'
            placeHolder="Añade el nombre del gasto"
            id="expenseName"
            value={expense.expenseName}
            onChange={handleChange}
            
        />
        <Input
            type="number"
            label="Cantidad"
            name='amount'
            placeHolder="Añade la cantidad del gasto: ej. 300"
            id="amount"
            value={expense.amount}
            onChange={handleChange}
        />

        <Select<Category>
            label="Categoría"
            name="category"
            id="category"
            data={categories}
            valueKey="id"
            labelKey="name"
            value={expense.category}
            onChange={handleChange}
        />

        
        <div className="flex flex-col gap-2">
            <label className="text-xl text-black">
            Fecha Gasto:
            </label>
            <div>
                <DatePicker onChange={handleChangeDate} value={expense.date} className={'bg-slate-100 p-2 border-0 w-full rounded-lg'} />
            </div>
        </div>

        <input
            type="submit"
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            value={state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto'}
        />
            

          
    </form>
  )
}
