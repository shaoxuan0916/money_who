import React, { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import useAuthStore from "../../store/authStore"
import { auth } from "../../firebase"
import { useRouter } from "next/router"
import AddUserInput from "../../components/AddUserInput"
import Button from "../../components/Button"
import UserCards from "../../components/UserCards"

const HomePage = () => {
  const { userProfile } = useAuthStore()
  const router = useRouter()

  const [newUser, setNewUser] = useState("")

  // console.log("userProfile", userProfile)

  // const currentUid = window.location.pathname.substring(6)

  // useEffect(() => {
  //   // @ts-ignore
  //   if (currentUid !== auth.lastNotifiedUid) {
  //     router.push("/login")
  //   }
  // }, [])

  return (
    <div className="max-w-[600px] mx-auto bg-green2 min-h-[100vh]">
      <Navbar />

      <div className="pt-12 px-4">
        {/* Add New User Input */}
        <AddUserInput value={newUser} setValue={setNewUser} />

        {/* AA Draw Up button */}
        <div className="py-8">
          <Button text="AA Draw Up" />
        </div>

        {/* clear all users */}
        <div
          onClick={() => {}}
          className="cursor-pointer w-full text-right text-lg font-semibold"
        >
          clear
        </div>

        {/* User Card */}
        <UserCards />
      </div>
    </div>
  )
}

export default HomePage
