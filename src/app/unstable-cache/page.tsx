import React from 'react';
import Form from "@/app/unstable-cache/form";
import {getCache} from "@/app/unstable-cache/action";

export default async function UnstableCachePage(props: {
    searchParams: { value?: string, key?: string, tag?: string }
}) {
    const {value, key, tag} = props.searchParams;

    let v = value || 'initial value'
    let k = key || 'initial key'
    let t = tag || 'initial tag'

    const cache = await getCache(v, k, t)

    return (
        <div>
            <div>Page Data Is: {cache}</div>
            <Form value={v} keyV={k} tag={t}/>
        </div>
    );
}
