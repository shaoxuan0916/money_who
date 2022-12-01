import React, { useEffect, useState } from "react"
import { BsPlusLg } from "react-icons/bs"
import ModalAdd from "./ModalAdd"
import { useRouter } from "next/router"
import useAuthStore from "../store/authStore"
import { NextPage } from "next"

interface IUserCardsProps {
  peopleList: any[]
}

const UserCards: NextPage<IUserCardsProps> = ({ peopleList }) => {
  const router = useRouter()
  const { userProfile } = useAuthStore()
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>("")

  return (
    <div className="pt-1 relative">
      {peopleList &&
        // @ts-ignore
        Object.values(peopleList).map((person: string, index) => (
          <div key={index} className="flex my-4">
            <div className="w-full cursor-pointer  py-3 px-6 bg-green4 rounded-lg flex items-center justify-between">
              <div
                className="w-full"
                onClick={() => {
                  setSelectedUser(person)
                  console.log("selectedUser", person)

                  userProfile &&
                    router.push(
                      {
                        //@ts-ignore
                        pathname: `/balance/${userProfile.uid}`,
                        query: { selectedUser: person },
                      },
                      //@ts-ignore
                      `/balance/${userProfile.uid}`
                    )
                }}
              >
                <h3 className="text-borderColor text-lg ">{person}</h3>
              </div>
              <div
                onClick={() => {
                  setShowModal(!showModal)
                  setSelectedUser(person)
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
          selectedUser={selectedUser}
          setShowModal={setShowModal}
          peopleList={peopleList}
        />
      )}
    </div>
  )
}

export default UserCards
