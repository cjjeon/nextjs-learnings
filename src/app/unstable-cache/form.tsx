'use client'
import React from 'react';
import {usePathname, useRouter} from "next/navigation";
import {revalidate} from "@/app/unstable-cache/action";

function Form(props: { value: string, keyV: string, tag: string }) {
    const router = useRouter();
    const pathname = usePathname()

    const action = (d: FormData) => {
        const value = d.get('value') || 'initial value'
        const key = d.get('key') || 'initial key'
        const tag = d.get('tag') || 'initial tag'
        const isRevalidate = d.get('revalidate') ? true : false;
        if (isRevalidate) {
            return revalidate(tag as string)
        }
        router.push(`${pathname}?key=${key}&value=${value}&tag=${tag}`)
    }

    return (
        <form action={action}>
            <div>
                <div>Value</div>
                <input className="bg-black border" name="value" type="text" defaultValue={props.value}/>
            </div>
            <div>
                <div>Key</div>
                <input className="bg-black border" name="key" type="text" defaultValue={props.keyV}/>
            </div>
            <div>
                <div>Tag</div>
                <input className="bg-black border" name="tag" type="text" defaultValue={props.tag}/>
            </div>
            <div>
                <div>Revalidate</div>
                <input name="revalidate" type="checkbox"/>
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    );
}

export default Form;