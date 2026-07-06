import Image from "next/image";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        {children}
      </main>
    </div>
  );
}
