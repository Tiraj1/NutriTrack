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
