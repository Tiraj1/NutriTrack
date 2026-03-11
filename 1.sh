bash -c '
set -e

echo "Creating API route..."

mkdir -p app/api/food/log

cat > app/api/food/log/route.ts << "EOF"
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
EOF


echo "Creating food logging UI..."

mkdir -p components/food

cat > components/food/manual-log.tsx << "EOF"
"use client"

import { useState } from "react"

export default function ManualLog(){

 const [food,setFood]=useState("")
 const [cal,setCal]=useState("")
 const [protein,setProtein]=useState("")
 const [carbs,setCarbs]=useState("")
 const [fat,setFat]=useState("")

 async function submit(){

  await fetch("/api/food/log",{
   method:"POST",
   headers:{
    "Content-Type":"application/json"
   },
   body:JSON.stringify({
    userId:"demo-user",
    foodName:food,
    calories:cal,
    protein:protein,
    carbs:carbs,
    fat:fat,
    mealType:"meal"
   })
  })

  alert("Food logged!")

 }

 return(

  <div className="space-y-4 border p-6 rounded">

   <h2 className="font-semibold">
    Log Food
   </h2>

   <input
    className="border p-2 w-full"
    placeholder="Food name"
    onChange={e=>setFood(e.target.value)}
   />

   <input
    className="border p-2 w-full"
    placeholder="Calories"
    onChange={e=>setCal(e.target.value)}
   />

   <input
    className="border p-2 w-full"
    placeholder="Protein"
    onChange={e=>setProtein(e.target.value)}
   />

   <input
    className="border p-2 w-full"
    placeholder="Carbs"
    onChange={e=>setCarbs(e.target.value)}
   />

   <input
    className="border p-2 w-full"
    placeholder="Fat"
    onChange={e=>setFat(e.target.value)}
   />

   <button
    className="bg-black text-white p-2 w-full"
    onClick={submit}
   >
    Save
   </button>

  </div>

 )

}
EOF


echo "Updating log page..."

mkdir -p app/dashboard/log

cat > app/dashboard/log/page.tsx << "EOF"
import ManualLog from "@/components/food/manual-log"

export default function LogPage(){

 return(

  <div className="space-y-6">

   <h1 className="text-2xl font-bold">
    Log Food
   </h1>

   <ManualLog/>

  </div>

 )

}
EOF


echo ""
echo "Food logging pipeline fixed!"
echo ""
echo "Restart the server:"
echo "rm -rf .next && npm run dev"
'
