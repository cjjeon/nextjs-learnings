import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        This is to learn how NextJS Works.
      </div>
      <div className="py-2"/>
      <div>
        Go through below exercise:
      </div>
      <div className="py-2"/>
      <div>
        <Link href={'/caching'}>
          <button className="border rounded px-2 py-1 hover:bg-slate-800">
            Learn about caching!
          </button>
        </Link>
      </div>
    </>
  );
}
