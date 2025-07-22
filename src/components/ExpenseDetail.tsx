
import { formatDate } from '../helpers'
import { useBudget } from '../hooks/useBudget'
import type { Expense } from '../types'
import AmountDisplay from './AmountDisplay'
import { categories } from './data/categories'
import { useMemo } from 'react'

import { LeadingActions, SwipeAction,SwipeableList,SwipeableListItem,TrailingActions } from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"

type ExpenseDetailProps = {
    expense: Expense
}

export default function ExpenseDetail({expense} : ExpenseDetailProps) {

    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0] ,[expense])
    const {dispatch} = useBudget()

 
        
    // cuando lleva () es un return implicito y con {} no es return implicito
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => dispatch({type: 'get-expense-by-id', payload: {id: expense.id}})}>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={() => dispatch({type: 'remove-expense', payload: {id: expense.id}})}
                destructive={true}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

  return (
    <SwipeableList>
        <SwipeableListItem
            maxSwipe={3}
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
        >
            <div className="bg-white cursor-pointer shadow-lg p-5 w-full border-b  border-gray-200 flex gap-5 items-center">
                <div>
                    <img
                        src={`/icono_${categoryInfo.icon}.svg`}
                        alt='icono gasto'
                        className='w-20'
                    />
                </div>
                <div className='space-y-1'>
                    <p className='text-sm font-bld uppercase text-slate-500'>{categoryInfo.name}</p>
                    <p>{expense.expenseName}</p>
                    <p className='text-slate-600 text-sm'>{formatDate(expense.date!.toString())}</p>
                </div>
                <div className='ml-auto'>
                    <AmountDisplay amount={expense.amount} />
                </div>
            </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}
