type SelectProps<T> = {
  label: string
  name: string
  id: string
  data: T[]
  valueKey: keyof T      
  labelKey: keyof T   
  value: string | number 
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}


export default function Select<T>({
  label,
  name,
  id,
  data,
  valueKey,
  labelKey,
  value,
  onChange
}: SelectProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xl text-black">
        {label}
      </label>
      <select
        name={name}
        id={id}
        value={value}
        className="bg-slate-100 p-2 rounded-lg border border-sky-200 text-black hover:border-sky-300 focus:outline-none focus:ring-2 focus:border-sky-200 transition"
        onChange={onChange}
      >
        <option value="">-- Seleccione --</option>
        {data.map((item, index) => (
          <option key={index} value={String(item[valueKey])}>
            {String(item[labelKey])}
          </option>
        ))}
      </select>
    </div>
  );
}
