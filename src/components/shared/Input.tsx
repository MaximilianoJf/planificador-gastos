type InputProps = {
  label: string
  name: string
  placeHolder: string
  id: string
  type:string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}


export default function Input({ label, name,type, placeHolder, id,value, onChange }: InputProps) {
  return (
  
     <div className="flex flex-col gap-2">
        <label className="text-xl text-black" htmlFor={id}>
          {label}:
        </label>
        <input
          type={type}
          id={id}
          name={name}
          onChange={onChange}
          placeholder={placeHolder}
          value={value}
          className="bg-slate-100 p-2 rounded-lg border border-sky-200 text-black hover:border-sky-300 focus:outline-none focus:ring-2 focus:border-sky-200 transition"
        />
      </div>
    
  );
}