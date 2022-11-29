import React, { useState } from "react"
import { BsPlusLg } from "react-icons/bs"
import ModalAdd from "./ModalAdd"
import { useRouter } from "next/router"
import useAuthStore from "../store/authStore"

const UserCards = () => {
  const users = ["Jordan", "Iverson", "Kobe", "Lavine", "Carter"]

  const router = useRouter()

  const { userProfile } = useAuthStore()
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState("")

  return (
    <div className="pt-1 relative">
      {users.map((user) => (
        <div key={user} className="flex my-4">
          <div className="w-full cursor-pointer  py-3 px-6 bg-green4 rounded-lg flex items-center justify-between">
            <div
              className="w-full"
              onClick={() => {
                // To Fixed: should be specific user id
                //@ts-ignore
                setSelectedUser(user)
                console.log("selectedUser", user)
                // userProfile && router.push(`/balance/${userProfile.uid}`)
                userProfile &&
                  router.push(
                    {
                      //@ts-ignore
                      pathname: `/balance/${userProfile.uid}`,
                      query: { selectedUser: user },
                    },
                    //@ts-ignore
                    `/balance/${userProfile.uid}`
                  )
              }}
            >
              <h3 className="text-borderColor text-lg ">{user}</h3>
            </div>
            <div
              onClick={() => {
                setShowModal(!showModal)
                setSelectedUser(user)
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
          users={users}
        />
      )}
    </div>
  )
}

export default UserCards
