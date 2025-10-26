import { cn } from "@/lib/utils";

interface ExchangeInputProps {
  id: string;
  label: string;
  type?: "text" | "number";
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  suffix: string;
  suffixColor?: string;
  min?: string;
  step?: string;
  textAlign?: "left" | "right";
}

export function ExchangeInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  readOnly = false,
  suffix,
  suffixColor = "#646F7C",
  min,
  step,
  textAlign = "left",
}: ExchangeInputProps) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="mb-[0.5rem] block text-[1.25rem] font-medium leading-[133%] text-[#646F7C]"
      >
        {label}
      </label>
      <div
        className={cn(
          "flex items-center gap-[0.5rem] rounded-[0.75rem] border border-[#E5E8EB] px-[1.5rem] py-[1rem]",
          readOnly ? "bg-[#F7F8F9]" : "bg-white",
          textAlign === "right" ? "justify-end" : "justify-start"
        )}
      >
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          placeholder={placeholder}
          readOnly={readOnly}
          min={min}
          step={step}
          className={cn(
            "flex-1 min-w-0 border-0 bg-transparent text-[1rem] text-[#646F7C] placeholder:text-[#646F7C] focus:outline-none",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            textAlign === "right" && "text-right"
          )}
        />
        <span
          className="whitespace-nowrap text-[1rem] font-medium"
          style={{ color: suffixColor }}
        >
          {suffix}
        </span>
      </div>
    </div>
  );
}
