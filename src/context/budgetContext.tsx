import { createContext, useReducer } from "react"
import type { Dispatch, ReactNode } from "react"
import { initialState, budgetReducer } from "../reducers/budget-reducer"
import type { BudgetState, BudgetActions } from "../reducers/budget-reducer"
import { useMemo } from "react"

type BudgetContextProps = {
    state: BudgetState,
    dispatch: Dispatch<BudgetActions>
    remainingBudget: number,
    totalExpenses: number
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState)
    const totalExpenses = useMemo( () => state.expenses.reduce((total, expense) => expense.amount + total, 0) ,[state.expenses])
    const remainingBudget = useMemo(() => {
        const diff = state.budget - totalExpenses;
        return diff > 0 ? diff : 0
    }, [state.budget, totalExpenses]);


    return (
        <BudgetContext.Provider value={{ state, dispatch, totalExpenses , remainingBudget }}>
            {children}
        </BudgetContext.Provider>
    )

}
