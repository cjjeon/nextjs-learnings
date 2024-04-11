import action from "@/action";
import RevalidateTagButton from "@/app/caching/RevalidateTagButton";
import RouterRefreshButton from "@/app/caching/RouterRefreshButton";
import Tag from "@/components/tag";
import {unstable_cache} from "next/cache";
import Link from "next/link";
import React, {Suspense} from 'react';

export default function Page() {

  return (
    <div>
      <Link href="/">
        <button className="text-blue-500 hover:underline text-sm">
          Go back
        </button>
      </Link>
      <div className="py-1"/>
      <div className="font-semibold text-xl">
        Caching
      </div>
      <div className="py-2"/>
      <div>
        NextJS caching is one subject that it confuses a lot of people. The data fetched in the page is somewhat cached.
        And, there are multiple ways to re-fetch the data.
      </div>
      <div className="py-5"/>
      <div>
        For this example, there are mainly three data you are seeing now:
      </div>
      <div className="py-2"/>
      <div>Unix Timestamp fetched directly without caching:</div>
      <Suspense fallback={<div>Loading...</div>}>
        <NotCachedTimestamp/>
      </Suspense>
      <div className="py-2"/>
      <div>Unix Timestamp fetched using <Tag>unstable_cache</Tag> with
        tag <Tag>cache-1</Tag>:
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <CachedTimestamp tag={'cache-1'}/>
      </Suspense>
      <div className="py-2"/>
      <div>Unix Timestamp fetched using <Tag>unstable_cache</Tag> with
        tag <Tag>cache-2</Tag>:
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <CachedTimestamp tag={'cache-2'}/>
      </Suspense>
      <div className="py-5"/>
      <RouterRefreshButton/>
      <div className="py-2"/>
      <RevalidateTagButton tag={'cache-1'}/>
      <div className="py-2"/>
      <RevalidateTagButton tag={'cache-2'}/>
      <div className="py-5"/>
      <div className="font-bold underline">
        Observation
      </div>
      <div>
        This page behave very differently from <Tag>dev</Tag> and <Tag>prod</Tag>.
      </div>
      <div>
        Router Refresh
      </div>
      <div>
        Router refresh fetches the data after an update. In dev environment, the first timestamp will be refreshed all
        the time. However, in production, this value will not be changed after it&apos;s fetched once.
      </div>
      <div>
        Revalidate Tag
      </div>
      <div>
        This behaves the same in both dev and prod. The data will be updated for specific tagged and non-tagged data.
      </div>
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

async function CachedTimestamp(props: { tag: string }) {
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
