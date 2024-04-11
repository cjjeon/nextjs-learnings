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
      <div className="font-semibold">Router Refresh Button</div>
      <div>
        This does <span className="bg-slate-800 rounded p-1 font-semibold">router.refresh()</span>.
      </div>
      <div className="py-1"/>
      <button className="border rounded hover:bg-slate-800 px-2 py-1" onClick={onClick}>
        Router Refresh Button
      </button>
    </>
  );
}
