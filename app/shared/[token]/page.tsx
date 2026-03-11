import { prisma } from "@/lib/prisma"

type PageProps = {
  params: {
    token: string
  }
}

export default async function SharedPage({ params }: PageProps) {

  const share = await prisma.share.findUnique({
    where: { token: params.token }
  })

  if (!share) {
    return <div className="p-8">Invalid share link</div>
  }

  const logs = await prisma.foodLog.findMany({
    where: { userId: share.userId },
    orderBy: { createdAt: "desc" },
    take: 20
  })

  return (
    <div className="p-8">

      <h1 className="text-2xl font-bold mb-6">
        Shared Nutrition Report
      </h1>

      {logs.map(log => (
        <div key={log.id} className="border p-2 rounded mb-2">
          {log.foodName} — {log.calories} kcal
        </div>
      ))}

    </div>
  )
}
