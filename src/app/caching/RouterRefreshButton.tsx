'use client';
import {useRouter} from "next/navigation";
import React from 'react';

export default function RouterRefreshButton() {
  const router = useRouter();

  const onClick = () => {
    router.refresh();
  }

  return (
    <>
      <div className="font-semibold">Router Refresh</div>
      <div>
        This is router refresh button. It's just calling NextJS navigation router.refresh() function.
      </div>
      <button className="border rounded hover:bg-slate-800 px-2 py-1" onClick={onClick}>
        Router Refresh Button
      </button>
    </>
  );
}
