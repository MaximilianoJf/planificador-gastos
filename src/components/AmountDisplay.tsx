import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label?: string
    amount: number
}

export default function AmountDisplay({label, amount} : AmountDisplayProps) {
  return (
    <div className="w-full">
        <p className="text-2xl flex justify-between w-full text-gray-500 font-bold">
            {label && `${label}`} {''}
            <span className="font-black text-black text-lg">{formatCurrency(amount)}</span>
        </p>
    </div>
  )
}
