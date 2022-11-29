import React, { Dispatch, SetStateAction } from "react"
import Navbar from "../../components/Navbar"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useRouter } from "next/router"
import useAuthStore from "../../store/authStore"
import { NextPage } from "next"

interface IBalanceProps {}

const balance: NextPage<IBalanceProps> = () => {
  const { userProfile } = useAuthStore()
  const tempUsers = ["Jordan", "Iverson", "Kobe", "Lavine", "Carter"]
  const router = useRouter()

  const state = router.query // <-- terminalPayload sent in query parameter

  return (
    <div className="max-w-[600px] mx-auto bg-white min-h-[100vh]">
      <Navbar />

      <div className="mt-12 px-4">
        <div className="flex items-center">
          <div
            onClick={() => router.back()}
            className="cursor-pointer mr-8 text-2xl text-green1 font-bold"
          >
            <AiOutlineArrowLeft />
          </div>
          <h2 className="text-3xl font-bold text-green1">
            {state.selectedUser}
          </h2>
        </div>

        <div className="flex items-center mt-8">
          <p className="text-lg font-semibold">Current Balance :</p>
          <p className="text-errorMsg text-3xl font-bold ml-4">- RM 26.80</p>
        </div>

        <div className="mt-8">
          {tempUsers.map(
            (user) =>
              user !== state.selectedUser && (
                <div
                  key={user}
                  className="my-4 px-4 py-2 bg-green4 flex justify-between rounded-md"
                >
                  <h5 className="text-">{user}</h5>
                  <p className="text-green1">RM 6.30</p>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  )
}

export default balance
