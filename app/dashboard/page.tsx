"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import { logout } from '@/actions/logout'

const page = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center text-white text-lg">
      <div className="flex flex-col items-center justify-center text-lg font-bold">
     Amber Hasan's app Dashboard
      <Button className="p-5! cursor-pointer m-7" variant="destructive" onClick={() => logout()} >Logout</Button>
      </div>
    </div>
  )
}

export default page
