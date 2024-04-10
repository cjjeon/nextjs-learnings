'use server'

import utils from "@/utils";

export default async function () {
  const date = new Date()
  const unix = new Date(date).getTime()
  await utils.sleep(2000)
  return unix
}
