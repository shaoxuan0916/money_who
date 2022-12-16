import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useRouter } from "next/router"
import { NextPage } from "next"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../../firebase"
import { collection } from "firebase/firestore"

interface IBalanceProps {}

const Balance: NextPage<IBalanceProps> = () => {
  const [user] = useAuthState(auth)

  const path = `users/${user?.uid}/members`

  // query for react-firebase-hooks
  const query = collection(db, path)

  // from react-firebase-hooks
  const [docs, loading, error] = useCollectionData(query)

  const router = useRouter()

  const selectedMember = router.query.selectedMember

  // selected member index
  const selectedMemberIndex = Number(selectedMember) - 1

  // selected member details
  const selectedMemberDetails = docs && docs[selectedMemberIndex]

  // TODO: calculate balance

  return (
    <div className="max-w-[600px] mx-auto bg-white min-h-[100vh]">
      <Navbar />

      {loading ? (
        <div className="mt-12 ml-20">Loading...</div>
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

          {/* <div className="flex items-center mt-8">
            <p className="text-lg font-semibold">Current Balance :</p>
            <p className="text-errorMsg text-3xl font-bold ml-4"></p>
          </div> */}

          <div className="mt-8">
            {selectedMemberDetails &&
              Object.keys(selectedMemberDetails.otherMembers)?.map(
                (index: any) => (
                  <div
                    key={index}
                    className="my-4 px-4 py-4 bg-green4 flex justify-between rounded-md"
                  >
                    <h5 className="text-">
                      {selectedMemberDetails.otherMembers[index].name}
                    </h5>
                    <p
                      className={
                        selectedMemberDetails.otherMembers[index].money >= 0
                          ? "text-green1"
                          : "text-errorMsg"
                      }
                    >
                      {" "}
                      {selectedMemberDetails.otherMembers[index].money}
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
