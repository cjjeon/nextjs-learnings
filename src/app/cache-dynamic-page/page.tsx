import action from "@/action";
import RevalidateTagButton from "@/app/components/RevalidateTagButton";
import RouterRefreshButton from "@/app/components/RouterRefreshButton";
import Tag from "@/components/tag";
import {unstable_cache} from "next/cache";
import Link from "next/link";
import React, {Suspense} from 'react';

export const dynamic = 'force-dynamic'

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
        Caching in Dynamic Page
      </div>
      <div className="py-2"/>
      <div>
        This is exact same exercise of the data fetched in the <Link href='/caching'><span
        className="text-blue-500 hover:underline">cache page</span></Link>. This means <Tag>const dynamic =
        'force-dynamic'</Tag> is added on the top of the component
      </div>
      <div className="py-2"/>
      <div>
        Unlike caching page without dynamic, <Tag>Router Refresh Button</Tag> will now update
        un-tagged cached data in production.
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
