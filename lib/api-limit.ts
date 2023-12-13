import { auth } from "@clerk/nextjs"

import prisma from "@/lib/prismadb"

const MAX_FREE_COUNTS = Number(process.env.MAX_FREE_COUNTS)

export async function increaseApiLimits() {
  const { userId } = auth()

  if (!userId) {
    return
  }

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

  if (!userId) {
    return false
  }

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
