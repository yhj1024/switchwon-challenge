interface InputProps {
  id: string;
  label: string;
  type?: "text" | "email" | "password" | "number";
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  readOnly?: boolean;
  suffix?: string;
  suffixColor?: string;
  min?: string;
  step?: string;
  fullWidth?: boolean;
  variant?: "login" | "exchange";
  labelClassName?: string;
  textAlign?: "left" | "right";
}

export function Input({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  autoComplete,
  readOnly = false,
  suffix,
  suffixColor,
  min,
  step,
  fullWidth = false,
  variant = "login",
  labelClassName,
  textAlign = "left",
}: InputProps) {
  const containerClassName = fullWidth
    ? "flex flex-col"
    : "flex w-[31rem] flex-col";

  const inputClassName =
    variant === "exchange"
      ? `w-full rounded-[0.75rem] border border-[#E5E8EB] px-[1.5rem] py-[1rem] text-[1rem] placeholder:text-[#8899AA] focus:border-[#3479EB] focus:outline-none ${
          textAlign === "right" ? "text-right" : ""
        } ${readOnly ? "bg-[#F7F8F9] text-[#F04438]" : "bg-white"}`
      : fullWidth
        ? "mb-8 h-[4.6875rem] w-full rounded-[0.75rem] border border-[#374553] bg-white px-[1.5rem] text-[1.25rem] font-semibold leading-[133%] placeholder:font-semibold placeholder:text-[1.25rem] placeholder:leading-[133%] placeholder:text-[#646F7C]"
        : "mb-8 h-[4.6875rem] w-[31rem] rounded-[0.75rem] border border-[#374553] bg-white px-[1.5rem] text-[1.25rem] font-semibold leading-[133%] placeholder:font-semibold placeholder:text-[1.25rem] placeholder:leading-[133%] placeholder:text-[#646F7C]";

  const defaultLabelClassName =
    variant === "exchange"
      ? "mb-[0.5rem] block text-[1.25rem] font-medium leading-[133%] text-[#646F7C]"
      : "mb-3 text-[#646F7C]";

  return (
    <div className={containerClassName}>
      <label htmlFor={id} className={labelClassName || defaultLabelClassName}>
        {label}
      </label>
      {variant === "exchange" && suffix ? (
        <div
          className={`flex items-center gap-[0.5rem] rounded-[0.75rem] border border-[#E5E8EB] px-[1.5rem] py-[1rem] ${
            readOnly ? "bg-[#F7F8F9]" : "bg-white"
          } ${textAlign === "right" ? "justify-end" : "justify-start"}`}
        >
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange ? (e) => onChange(e.target.value) : undefined}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
            readOnly={readOnly}
            min={min}
            step={step}
            className={`flex-1 min-w-0 border-0 bg-transparent text-[1rem] placeholder:text-[#8899AA] focus:outline-none ${
              textAlign === "right" ? "text-right" : ""
            } ${readOnly ? "text-[#F04438]" : ""} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          />
          <span
            className="whitespace-nowrap text-[1rem] font-medium"
            style={{ color: suffixColor || "#8899AA" }}
          >
            {suffix}
          </span>
        </div>
      ) : (
        <div className="relative">
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange ? (e) => onChange(e.target.value) : undefined}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
            readOnly={readOnly}
            min={min}
            step={step}
            className={inputClassName}
          />
          {suffix && (
            <span
              className="pointer-events-none absolute right-[1.5rem] top-1/2 -translate-y-1/2 text-[1rem] font-medium"
              style={{ color: suffixColor || "#8899AA" }}
            >
              {suffix}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
