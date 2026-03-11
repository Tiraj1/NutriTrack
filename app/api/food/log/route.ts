import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {

 const body = await req.json()

 try {

  const log = await prisma.foodLog.create({
   data:{
    userId: body.userId ?? "demo-user",
    foodName: body.foodName,
    calories: Number(body.calories),
    protein: Number(body.protein),
    carbs: Number(body.carbs),
    fat: Number(body.fat),
    mealType: body.mealType ?? "meal",
    date: new Date()
   }
  })

  return Response.json(log)

 } catch(e){

  return Response.json(
   {error:"Failed to log food"},
   {status:500}
  )

 }

}
