import React, { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useRouter } from "next/router"
import { NextPage } from "next"

import useMembersStore from "../../store/membersStore"
import useAuthStore from "../../store/authStore"

interface IBalanceProps {}

const Balance: NextPage<IBalanceProps> = () => {
  const { allMembers } = useMembersStore()
  const { currency, userProfile } = useAuthStore()

  const router = useRouter()

  const [membersList, setMembersList] = useState<any>()

  const selectedMember = router.query.selectedMember

  // selected member index
  const selectedMemberIndex = Number(selectedMember) - 1

  // selected member details
  const selectedMemberDetails = membersList && membersList[selectedMemberIndex]

  // calculate balance
  let balance: number = 0

  selectedMemberDetails &&
    selectedMemberDetails?.otherMembers.map((item: any) => {
      balance = Number(
        (Number(item.money) + Number(balance ? balance : 0)).toFixed(2)
      )
    })

  useEffect(() => {
    setMembersList(allMembers)

    if (!userProfile) {
      router.push("/login")
    }
  }, [userProfile])

  return (
    <div className="max-w-[600px] mx-auto bg-white min-h-[100vh] bg-green5 pb-10">
      <Navbar />

      {!membersList ? (
        <div className="mt-12 ml-20 text-textColor">Loading...</div>
      ) : (
        <div className="mt-12 px-4">
          <div className="flex items-center">
            <div
              onClick={() => router.back()}
              className="cursor-pointer mr-8 text-2xl text-green1 font-bold"
            >
              <AiOutlineArrowLeft />
            </div>
            <h2 className="text-3xl font-bold text-green1">
              {selectedMemberDetails?.name}
            </h2>
          </div>

          <div className="flex items-center mt-8">
            <p className="text-lg font-semibold text-textColor">
              Current Balance :
            </p>
            <p
              className={
                balance && balance < 0
                  ? "text-errorMsg text-2xl font-bold ml-4"
                  : "text-green1 text-2xl font-bold ml-4"
              }
            >
              {balance >= 0
                ? `${currency} ${balance}`
                : `- ${currency} ${balance * -1}`}
            </p>
          </div>

          <div className="mt-8">
            {selectedMemberDetails &&
              Object.keys(selectedMemberDetails.otherMembers)?.map(
                (index: any) => (
                  <div
                    key={index}
                    className="my-4 px-4 py-4 bg-green3 flex justify-between rounded-md"
                  >
                    <h5 className="text-textColor">
                      {selectedMemberDetails.otherMembers[index].name}
                    </h5>
                    <p
                      className={
                        selectedMemberDetails.otherMembers[index].money >= 0
                          ? "text-green1"
                          : "text-errorMsg"
                      }
                    >
                      {selectedMemberDetails.otherMembers[index].money >= 0
                        ? `${currency} ${selectedMemberDetails.otherMembers[index].money}`
                        : `- ${currency} ${
                            selectedMemberDetails.otherMembers[index].money * -1
                          }`}
                    </p>
                  </div>
                )
              )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Balance
