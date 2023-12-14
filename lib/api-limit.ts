import { auth } from "@clerk/nextjs"

import prisma from "@/lib/prismadb"
import { MAX_FREE_COUNTS } from "@/constants"

export async function increaseApiLimits() {
  const { userId } = auth()

  if (!userId) return

  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userId,
    },
  })

  if (userApiLimit) {
    await prisma.userApiLimit.update({
      where: {
        userId,
      },
      data: {
        count: userApiLimit.count + 1,
      },
    })
  } else {
    await prisma.userApiLimit.create({
      data: { userId, count: 1 },
    })
  }
}

export async function checkApiLimits() {
  const { userId } = auth()

  if (!userId) return false

  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userId,
    },
  })

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true
  }

  return false
}

export async function getApiLimitCount() {
  const { userId } = auth()

  if (!userId) return 0

  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userId,
    },
  })

  if (!userApiLimit) return 0

  return userApiLimit.count
}
