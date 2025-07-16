'use client'

import { Button } from "@/shared/ui/button";
import { useEffect } from "react";


export default function Home() {
  useEffect(() => {
    const obj1 = { name: 'Anton', age: 30 }
    const obj2 = { location: 'Minsk', job: 'front-end' }

    const mergeObj = <Obj1 extends object, Obj2>(obj1: Obj1, obj2: Obj2): Obj1 & Obj2 => {
      return {...obj1, ...obj2}
    }

    console.log(mergeObj(obj1, obj2))
  }, [])

  return (
    <div className="flex justify-center items-center gap-2 min-h-screen">
      <Button>
        На борт!
      </Button>
      <Button to='/auth'>
        Логин
      </Button>
    </div>
  );
}
