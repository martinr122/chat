import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
        <Image
          src="/logo.png"
          alt="UPJŠ"
          width={50}
          height={50}
          style={{ width: "50px", height: "auto" }}
        />

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Univerzita Pavla Jozefa Šafárika v Košiciach
          </p>
          <h1 className="text-lg font-semibold text-slate-800">
            Virtuálny asistent UPJŠ
          </h1>
        </div>
      </div>
    </header>
  );
}
