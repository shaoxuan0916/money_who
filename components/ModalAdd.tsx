import { NextPage } from "next"
import React, { Dispatch, SetStateAction } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { db } from "../firebase"

interface IModalAddProps {
  selectedUser: string
  setShowModal: Dispatch<SetStateAction<boolean>>
  peopleList: any[] | null
}

const ModalAdd: NextPage<IModalAddProps> = ({
  selectedUser,
  setShowModal,
  peopleList,
}) => {
  return (
    <div className="absolute m-auto w-full h-auto max-h-[600px] top-0 left-0 p-6 z-20 shadow-lg rounded-lg bg-green4 ">
      {/* Modal Header */}
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">{selectedUser}</h3>
        <div
          onClick={() => setShowModal(false)}
          className="text-2xl font-semibold cursor-pointer"
        >
          <AiOutlineClose />
        </div>
      </div>

      {/* Modal Body */}
      <div className="pt-4">
        {peopleList?.map(
          (person) =>
            person !== selectedUser && (
              <div
                key={person}
                className="text-textColor flex items-center p-2 my-4"
              >
                <h5 className="w-[25%] text-lg">
                  {person} {` `}
                </h5>
                <input
                  type="text"
                  className="py-1 px-2 w-[60%] rounded-md outline-borderColor"
                />

                <div className="ml-2 cursor-pointer bg-green1 text-green5 py-1 px-3 rounded-md">
                  Add
                </div>
              </div>
            )
        )}
      </div>
    </div>
  )
}

export default ModalAdd
