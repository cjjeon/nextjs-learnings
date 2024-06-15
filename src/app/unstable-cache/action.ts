'use server';

import {revalidateTag, unstable_cache} from "next/cache";
import utils from "@/utils";

async function _getCache(value?: string) {
    await utils.sleep(2000);
    if (value) return value
    return new Date().toISOString()
}


export const getCache =
    (value: string, key: string, tag: string) =>
        unstable_cache(() => _getCache(value), [key], {tags: [tag]})()


export async function revalidate(tag: string) {
    await utils.sleep(1000);
    revalidateTag(tag)
}