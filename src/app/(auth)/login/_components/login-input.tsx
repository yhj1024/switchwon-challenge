interface LoginInputProps {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}

export function LoginInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  autoComplete,
}: LoginInputProps) {
  return (
    <div className="flex w-[31rem] flex-col">
      <label htmlFor={id} className="mb-3 text-[#646F7C]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="mb-8 h-[4.6875rem] w-[31rem] rounded-[0.75rem] border border-[#374553] bg-white px-[1.5rem] text-[1.25rem] font-semibold leading-[133%] placeholder:font-semibold placeholder:text-[1.25rem] placeholder:leading-[133%] placeholder:text-[#646F7C]"
      />
    </div>
  );
}
