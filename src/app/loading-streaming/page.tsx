import React from 'react';
import Link from "next/link";

function Page() {
    return (
        <div>
            <Link href={'/loading-streaming/loading-suspense'}>
                <button className="border rounded px-2 py-1 hover:bg-slate-800">
                    1. Other ways to do suspense
                </button>
            </Link>
        </div>
    );
}

export default Page;