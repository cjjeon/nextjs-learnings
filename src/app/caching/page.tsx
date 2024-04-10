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
      <div className="py-2"/>
      <div>
        For the purpose, the timestamps are fetched with 2 second delay. If you see <span
        className="italic">"Loading..."</span>, you are seeing none cached data and waiting to be fetched.
      </div>
      <div className="py-2"/>
      <div>This is not cached cache:</div>
      <Suspense key={Math.random()} fallback={<div>Loading...</div>}>
        <NotCachedTimestamp/>
      </Suspense>
      <div className="py-2"/>
      <div>This is cache-1 data:</div>
      <Suspense key={Math.random()} fallback={<div>Loading...</div>}>
        <CachedTimestamp tag={'cache-1'}/>
      </Suspense>
      <div className="py-2"/>
      <div>This is cache-2 data:</div>
      <Suspense key={Math.random()} fallback={<div>Loading...</div>}>
        <CachedTimestamp tag={'cache-2'}/>
      </Suspense>

      <div className="py-5"/>
      <RouterRefreshButton/>
      <div className="py-5"/>
      <RevalidateTagButton tag={'cache-1'}/>
      <div className="py-5"/>
      <RevalidateTagButton tag={'cache-2'}/>
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

async function CachedTimestamp(props: {tag: string}) {
  const unixTimestamp = await unstable_cache(
    () => action.getCurrentDateInUnix(),
    [props.tag],
    {tags: [props.tag]}
  )();
  return <>
    <p>
      {unixTimestamp}
    </p>
  </>
}
