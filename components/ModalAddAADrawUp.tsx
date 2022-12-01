import { NextPage } from "next"
import React, { Dispatch, SetStateAction, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import Button from "./Button"
import Input from "./Input"

interface IModalAddAADrawUpProps {
  setShowModal: Dispatch<SetStateAction<boolean>>
}

const ModalAddAADrawUp: NextPage<IModalAddAADrawUpProps> = ({
  setShowModal,
}) => {
  const [owner, setOwner] = useState<string>("")
  const [amount, setAmount] = useState<number>(0)
  return (
    <div className="relative max-w-[600px]">
      <div className="absolute m-auto w-full h-[400px] top-[20%] left-0 p-6 z-20 shadow-lg rounded-lg bg-green4 ">
        {/* Modal Header */}
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold">AA Draw Up</h3>
          <div
            onClick={() => setShowModal(false)}
            className="text-2xl font-semibold cursor-pointer"
          >
            <AiOutlineClose />
          </div>
        </div>

        {/* Modal Body */}
        <div className="pt-4">
          <Input label="Who Pays First :" setValue={setOwner} />
          <Input label="Amount :" setValue={setAmount} />
        </div>

        <div>
          <Button text="Add" />
        </div>
      </div>
    </div>
  )
}

export default ModalAddAADrawUp
