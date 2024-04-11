import React from 'react';

export default function Tag(props: { children: React.ReactNode }) {
  return (
    <span className="bg-slate-800 rounded p-1 font-semibold">{props.children}</span>
  );
}
