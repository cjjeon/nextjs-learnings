'use server';
import {revalidateTag} from "next/cache";

export default async function (tag: string) {
  revalidateTag(tag);
}
