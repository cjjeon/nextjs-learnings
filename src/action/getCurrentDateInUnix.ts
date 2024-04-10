'use server'

import utils from "@/utils";

export default async function () {
  console.log('getting Current Date In Unix');
  const date = new Date()
  const unix = new Date(date).getTime()
  await utils.sleep(2000)
  return unix
}
