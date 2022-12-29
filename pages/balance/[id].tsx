import React, { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { RiMore2Fill } from "react-icons/ri"
import { CgMoreO } from "react-icons/cg"
import { useRouter } from "next/router"
import { NextPage } from "next"
import useMembersStore from "../../store/membersStore"
import useAuthStore from "../../store/authStore"
import ModalSettle from "../../components/ModalSettle"
import { toast } from "react-hot-toast"
import {
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore"
import { db } from "../../firebase"
import { useCollectionData } from "react-firebase-hooks/firestore"
import ModalSessionExpired from "../../components/ModalSessionExpired"

interface IBalanceProps {}

const Balance: NextPage<IBalanceProps> = () => {
  const { currency, userProfile } = useAuthStore()

  const path = `users/${userProfile?.uid}/members`

  const router = useRouter()

  // query for react-firebase-hooks, orderby uid
  const memberQuery = query(collection(db, path), orderBy("uid"))

  // from react-firebase-hooks
  const [docs, loading, error] = useCollectionData(memberQuery)

  const [settleBy, setSettleBy] = useState<string>("")
  const [settleByUid, setSettleByUid] = useState<any>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [membersList, setMembersList] = useState<any>()
  const [sessionExpired, setSessionExpired] = useState<boolean>(false)

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

  // handle settle amount

  const handleSettle = async () => {
    const settleTo = selectedMember

    const settleToRef = doc(db, path, `${settleTo}`)
    const settleByRef = doc(db, path, `${settleByUid}`)

    const updateSettleByIndex = Object.values(membersList)?.findIndex(
      (item: any) => item.uid === settleByUid
    )

    console.log("updateSettleByIndex", updateSettleByIndex)

    const updateSettleByArr = membersList[updateSettleByIndex].otherMembers

    const updatedSettleToOtherMembersArr =
      selectedMemberDetails.otherMembers.map((item: any) => {
        if (item.uid === settleByUid) {
          return {
            name: item.name,
            uid: item.uid,
            money: item.money,
            settled: true,
          }
        } else return item
      })

    const updatedSettleByOtherMembersArr = updateSettleByArr.map(
      (item: any) => {
        if (item.uid === Number(settleTo)) {
          return {
            name: item.name,
            uid: item.uid,
            money: item.money,
            settled: true,
          }
        } else return item
      }
    )

    setShowModal(false)

    membersList &&
      (await Promise.all([
        // update addTo
        await updateDoc(settleToRef, {
          otherMembers: updatedSettleToOtherMembersArr,
        }),

        // update addBy
        await updateDoc(settleByRef, {
          otherMembers: updatedSettleByOtherMembersArr,
        }),
      ]))

    toast.success("Settled amount")
  }

  useEffect(() => {
    setMembersList(docs)

    if (!userProfile) {
      setSessionExpired(true)
    }
  }, [userProfile, docs])

  return (
    <div className="max-w-[600px] mx-auto bg-white min-h-[100vh] bg-green3 pb-10">
      <Navbar />

      {sessionExpired && <ModalSessionExpired />}

      {!membersList ? (
        <div className="mt-12 ml-20 text-textColor">Loading...</div>
      ) : (
        <div className="mt-12 px-4">
          <div className="flex items-center">
            <div
              onClick={() => router.back()}
              className="cursor-pointer mr-8 text-2xl text-textColor font-bold"
            >
              <AiOutlineArrowLeft />
            </div>
            <h2 className="text-3xl font-bold text-textColor">
              {selectedMemberDetails?.name}
            </h2>
          </div>

          <div className="flex items-center mt-8">
            <p className="text-lg font-semibold text-textColor ml-4">
              Balance :
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
                  <div className="my-4 " key={index}>
                    <div className=" px-4 py-4 bg-green4 shadow-md flex justify-between rounded-md">
                      <h5 className="text-textColor">
                        {selectedMemberDetails.otherMembers[index].name}
                      </h5>
                      <div className="flex gap-4 items-center">
                        <p
                          className={
                            selectedMemberDetails.otherMembers[index].settled
                              ? "italic text-textColor"
                              : selectedMemberDetails.otherMembers[index]
                                  .money >= 0
                              ? "text-green1"
                              : "text-errorMsg"
                          }
                        >
                          {selectedMemberDetails.otherMembers[index].money >= 0
                            ? `${currency} ${selectedMemberDetails.otherMembers[index].money}`
                            : `- ${currency} ${
                                selectedMemberDetails.otherMembers[index]
                                  .money * -1
                              }`}
                        </p>

                        <div
                          className={
                            selectedMemberDetails.otherMembers[index].settled
                              ? "text-sm font-semibold italic text-[#666]"
                              : "text-sm font-semibold text-green1 cursor-pointer"
                          }
                          onClick={() => {
                            if (
                              !selectedMemberDetails.otherMembers[index].settled
                            ) {
                              setShowModal(!showModal)
                              setSettleBy(
                                selectedMemberDetails.otherMembers[index].name
                              )
                              setSettleByUid(
                                selectedMemberDetails.otherMembers[index].uid
                              )
                            }
                          }}
                        >
                          {selectedMemberDetails.otherMembers[index].settled ? (
                            <p>Settled</p>
                          ) : (
                            <p>Settle</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>

          {showModal && (
            <ModalSettle
              handleSettle={handleSettle}
              setShowModal={setShowModal}
              settleBy={settleBy}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Balance
