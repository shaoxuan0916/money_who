import React, { useState } from "react"
import { BsPlusLg } from "react-icons/bs"
import ModalAdd from "./ModalAdd"
import { useRouter } from "next/router"
import { NextPage } from "next"
import useAuthStore, { CurrencyType } from "../store/authStore"

interface IUserCardsProps {
  membersList: any[]
  path: string
  currency: CurrencyType
}

const UserCards: NextPage<IUserCardsProps> = ({
  membersList,
  path,
  currency,
}) => {
  const { userProfile } = useAuthStore()

  const router = useRouter()

  const [showModal, setShowModal] = useState(false)

  // selected member uid
  const [selectedMember, setSelectedMember] = useState<any>("")
  const [selectedMemberIndex, setSelectedMemberIndex] = useState<any>("")

  return (
    <div className="mt-2 ">
      {membersList &&
        membersList.length !== 0 &&
        Object.keys(membersList).map((member: any, index) => (
          <div key={index} className="flex my-4">
            <div className="w-full cursor-pointer  py-3 px-6 bg-green4 rounded-lg flex items-center justify-between shadow-md">
              <div
                className="w-full"
                onClick={() => {
                  setSelectedMember(membersList[index].uid)
                  router.push({
                    pathname: `/balance/${userProfile.uid}`,
                    query: {
                      selectedMember: membersList[index].uid,
                    },
                  })
                }}
              >
                <h3 className="text-borderColor text-lg ">
                  {membersList[index].name}
                </h3>
              </div>
              <div
                onClick={() => {
                  setShowModal(!showModal)
                  setSelectedMember(membersList[index].uid)
                  setSelectedMemberIndex(index)
                }}
                className="text-green5 ml-4 rounded-full bg-green1 p-3 flex items-center"
              >
                <BsPlusLg />
              </div>
            </div>
          </div>
        ))}

      {showModal && (
        <ModalAdd
          currency={currency}
          path={path}
          selectedMemberIndex={selectedMemberIndex}
          selectedMember={selectedMember}
          setShowModal={setShowModal}
          membersList={membersList}
        />
      )}
    </div>
  )
}

export default UserCards
