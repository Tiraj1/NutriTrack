import { prisma } from "@/lib/prisma"

export default async function SharedReport({
  params,
}: {
  params: { token: string }
}) {

  const logs = await prisma.foodLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  })

  return (
    <div className="p-8">

      <h1 className="text-2xl font-bold mb-6">
        Shared Nutrition Report
      </h1>

      {logs.map((log) => (
        <div key={log.id} className="border p-2 rounded mb-2">
          {log.foodName} — {log.calories} kcal
        </div>
      ))}

    </div>
  )
}
