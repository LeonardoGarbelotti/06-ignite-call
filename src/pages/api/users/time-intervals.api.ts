import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // if method is not POST, throw 405 error and end connection
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  // if there is no session, user is not logged in. Throw 401 error and end connection
  if (!session) {
    return res.status(401).end()
  }

  const { intervals } = timeIntervalsBodySchema.parse(req.body)

  // workaround because SQLite doesn't support createMany
  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeInMinutes,
          time_end_in_minutes: interval.endTimeInMinutes,
          user_id: session.user?.id,
        },
      })
    }),
  )

  // SQLite doesn't support createMany. After changing to Postgres or SQL, use:
  // await prisma.userTimeInterval.createMany({
  //   data: intervals.map((interval) => ({
  //     week_day: interval.weekDay,
  //     time_start_in_minutes: interval.startTimeInMinutes,
  //     time_end_in_minutes: interval.endTimeInMinutes,
  //     user_id: session.user?.id,
  //   })),
  // })

  return res.status(201).end()
}
