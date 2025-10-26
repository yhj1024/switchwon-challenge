import { ReactNode } from "react";

interface ContainerProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function Container({ title, description, children }: ContainerProps) {
  return (
    <main className="px-[5rem] py-[2.5rem]">
      <header className="mb-[2rem]">
        <h1 className="mb-[0.5rem] text-[2rem] font-bold text-[#374553]">
          {title}
        </h1>
        <p className="text-[1rem] text-[#646F7C]">{description}</p>
      </header>
      {children}
    </main>
  );
}
