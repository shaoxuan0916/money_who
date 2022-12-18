import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import Input from "../../components/Input"
import Navbar from "../../components/Navbar"
import { auth } from "../../firebase"

const ProfilePage = () => {
  const [user] = useAuthState(auth)

  console.log("user", user)
  return (
    <div className="max-w-[600px] mx-auto  min-h-[100vh]">
      <Navbar />
      <div className="mt-12 px-4">
        <h2 className="text-3xl font-bold text-green1 mb-8">Your Profile</h2>

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
