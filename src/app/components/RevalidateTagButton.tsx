'use client';
import action from "@/action";
import React from 'react';

export default function RevalidateTagButton(props: { tag: string; }) {

  const onClick = async () => {
    await action.revalidateTag(props.tag)
  }

  return (
    <>
      <div className="font-semibold">Revalidate {props.tag} Tag</div>
      <div>
        This does <span className="bg-slate-800 rounded p-1 font-semibold">revalidateTag(&apos;{props.tag}&apos;)</span>.
      </div>
      <div className="py-1"/>
      <button className="border rounded hover:bg-slate-800 px-2 py-1" onClick={onClick}>
        Revalidate Tag Button
      </button>
    </>
  );
}
