'use client';
import action from "@/action";
import React from 'react';

export default function RevalidateTagButton(props: {tag: string;}) {

  const onClick = async () => {
    await action.revalidateTag(props.tag)
  }

  return (
    <>
      <div className="font-semibold">Revalidate Tag And Refresh</div>
      <div>
        This button runs revalidateTag for: {props.tag}
      </div>
      <button className="border rounded hover:bg-slate-800 px-2 py-1" onClick={onClick}>
        Revalidate Tag Button
      </button>
    </>
  );
}
