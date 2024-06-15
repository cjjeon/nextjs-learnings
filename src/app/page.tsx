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
            <div className="py-5"/>
            <div className="flex flex-col gap-4">
                <Link href={'/caching'}>
                    <button className="border rounded px-2 py-1 hover:bg-slate-800">
                        1. Cache
                    </button>
                </Link>
                <Link href={'/cache-dynamic-page'}>
                    <button className="border rounded px-2 py-1 hover:bg-slate-800">
                        2. Cache Dynamic Page
                    </button>
                </Link>
                <Link href={'/unstable-cache'}>
                    <button className="border rounded px-2 py-1 hover:bg-slate-800">
                        3. Unstable Cache
                    </button>
                </Link>
            </div>
        </>
    );
}
