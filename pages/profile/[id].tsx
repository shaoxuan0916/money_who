import { useRouter } from "next/router"
import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import Input from "../../components/Input"
import Navbar from "../../components/Navbar"
import { auth } from "../../firebase"
import { AiOutlineArrowLeft } from "react-icons/ai"

const ProfilePage = () => {
  const [user] = useAuthState(auth)
  let router = useRouter()

  console.log("user", user)
  return (
    <div className="max-w-[600px] mx-auto  min-h-[100vh]">
      <Navbar />
      <div className="mt-12 px-4">
        <div className="flex items-center mb-8">
          <div
            onClick={() => router.back()}
            className="cursor-pointer mr-8 text-2xl text-green1 font-bold"
          >
            <AiOutlineArrowLeft />
          </div>
          <h2 className="text-3xl font-bold text-green1">Your Profile</h2>
        </div>

        <div className="text-xl">
          <div className="flex">
            <label htmlFor="" className="mr-4 font-semibold">
              Email :{" "}
            </label>
            <p>{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
