import { NextPage } from "next"
import React, { Dispatch, SetStateAction } from "react"
import Button from "./Button"

interface IModalClearAllProps {
  setShowModal: Dispatch<SetStateAction<boolean>>
  handleClearMember: () => void
}

const ModalClearAll: NextPage<IModalClearAllProps> = ({
  setShowModal,
  handleClearMember,
}) => {
  return (
    <div className="fixed bg-[#333]/75 top-0 bottom-0 left-0 right-0 z-999 max-w-[600px] mx-auto">
      <div className="fixed max-w-[600px] z-1000 m-auto w-full h-[140px] top-0 left-0 bottom-0 right-0 p-6 z-20 shadow-2xl rounded-lg bg-green4 ">
        <h3 className="mb-4 text-xl font-semibold text-textColor">
          Clear all members ?
        </h3>

        <div className="flex gap-4">
          <div className="w-full" onClick={handleClearMember}>
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
