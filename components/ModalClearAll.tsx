import { NextPage } from "next"
import React, { Dispatch, SetStateAction, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import Button from "./Button"
import Input from "./Input"

interface IModalClearAllProps {
  setShowModal: Dispatch<SetStateAction<boolean>>
}

const ModalClearAll: NextPage<IModalClearAllProps> = ({ setShowModal }) => {
  return (
    <div className="relative max-w-[600px]">
      <div className="absolute m-auto w-full h-auto top-[20%] left-0 p-6 z-20 shadow-2xl rounded-lg bg-green4 ">
        <h3 className="mb-4 text-xl font-semibold">Clear all users ?</h3>

        <div className="flex gap-4" onClick={() => {}}>
          <div className="w-full">
            <Button text="Yes" />
          </div>
          <div className="w-full" onClick={() => setShowModal(false)}>
            <Button text="No" outline={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalClearAll
