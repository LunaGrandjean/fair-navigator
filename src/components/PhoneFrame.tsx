import { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary-soft via-background to-primary-soft flex items-center justify-center p-4 sm:p-8">
      <div className="relative w-full max-w-[390px] h-[844px] max-h-[calc(100vh-2rem)] bg-black rounded-[3rem] p-[10px] shadow-[0_30px_80px_-20px_rgba(220,38,38,0.35)]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-20" />
        <div className="relative w-full h-full bg-background rounded-[2.5rem] overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
