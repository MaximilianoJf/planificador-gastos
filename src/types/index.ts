export type Category = {
  id: string
  name: string
  icon: string
}

export type Expense = {
  id: string
  expenseName: string
  amount: number
  category:string
  date: Value
}

//Utility type omit para decirle que quiqere todo excepto...
export type DraftExpense = Omit<Expense, 'id'>

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]