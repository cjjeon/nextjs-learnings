import action from "@/action";
import RevalidateTagButton from "@/app/caching/RevalidateTagButton";
import RouterRefreshButton from "@/app/caching/RouterRefreshButton";
import {unstable_cache} from "next/cache";
import React, {Suspense} from 'react';

export default function Page() {

  return (
    <div>
      <div className="font-semibold text-xl">
        Caching
      </div>
      <div>
        For the purpose, the timestamps are fetched with 2 second delay.
      </div>
      <div className="py-2"/>
      <div>This is not cached timestamp:</div>
      <Suspense key={Math.random()} fallback={<div>Loading...</div>}>
        <NotCachedTimestamp/>
      </Suspense>

      <div>This is cached timestamp:</div>
      <Suspense key={Math.random()} fallback={<div>Loading...</div>}>
        <CachedTimestamp/>
      </Suspense>

      <div className="py-5"/>
      <RouterRefreshButton/>
      <div className="py-5"/>
      <RevalidateTagButton/>
    </div>
  );
}

async function NotCachedTimestamp() {
  const unixTimestamp = await action.getCurrentDateInUnix();
  return <>
    <p>
      {unixTimestamp}
    </p>
  </>
}

async function CachedTimestamp() {
  const unixTimestamp = await unstable_cache(
    () => action.getCurrentDateInUnix(),
    ['getCurrentDateInUnix'],
    {tags: ['getCurrentDateInUnix']}
  )();
  return <>
    <p>
      {unixTimestamp}
    </p>
  </>
}
