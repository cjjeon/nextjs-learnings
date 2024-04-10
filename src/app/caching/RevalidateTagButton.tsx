'use client';
import action from "@/action";
import {revalidateTag} from "next/cache";
import {useRouter} from "next/navigation";
import React from 'react';

export default function RevalidateTagButton() {

  const onClick = async () => {
    await action.revalidateTag('getCurrentDateInUnix')
  }

  return (
    <>
      <div className="font-semibold">Revalidate Tag And Refresh</div>
      <div>
        This button runs revalidateTag.
      </div>
      <button className="border rounded hover:bg-slate-800 px-2 py-1" onClick={onClick}>
        Revalidate Tag Button
      </button>
    </>
  );
}
