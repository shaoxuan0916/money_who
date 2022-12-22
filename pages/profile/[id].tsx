import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import { AiOutlineArrowLeft } from "react-icons/ai"
import useAuthStore from "../../store/authStore"

const ProfilePage = () => {
  const { userProfile } = useAuthStore()
  let router = useRouter()

  const [userInfo, setUserInfo] = useState<any>()
  useEffect(() => {
    setUserInfo(userProfile)

    if (!userProfile) {
      router.push("/login")
    }
  }, [userProfile])

  return (
    <>
      <div className="max-w-[600px] mx-auto  min-h-[100vh] pb-10 bg-green5">
        <Navbar />
        {!userInfo ? (
          <div className="mt-8 px-4 text-textColor">Loading...</div>
        ) : (
          <div className="mt-12 px-4 ">
            <div className="flex items-center mb-8">
              <div
                onClick={() => router.push(`/home/${userInfo?.uid}`)}
                className="cursor-pointer mr-8 text-2xl text-green1 font-bold"
              >
                <AiOutlineArrowLeft />
              </div>
              <h2 className="text-3xl font-bold text-green1">Your Profile</h2>
            </div>

            <div className="text-xl">
              <div className="flex text-textColor">
                <label htmlFor="" className="mr-4 font-semibold text-textColor">
                  Email :{" "}
                </label>
                <p>{userInfo?.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ProfilePage
