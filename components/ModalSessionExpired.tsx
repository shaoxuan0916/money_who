import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { Dispatch, SetStateAction } from "react"
import Button from "./Button"

interface IModalSessionExpiredProps {}

const ModalSessionExpired: NextPage<IModalSessionExpiredProps> = ({}) => {
  let router = useRouter()

  return (
    <div className="fixed bg-[#333]/75 top-0 bottom-0 left-0 right-0 z-999 max-w-[600px] mx-auto">
      <div className="fixed max-w-[600px] z-1000 m-auto w-full h-[140px] top-0 left-0 bottom-0 right-0 p-6 z-20 shadow-2xl rounded-lg bg-[#fff] ">
        <h3 className="mb-4 text-xl font-semibold text-textColor">
          Session expired. Please log in again :)
        </h3>

        <div className="flex gap-4">
          <div
            className="w-full"
            onClick={() => {
              router.push("/login")
            }}
          >
            <Button text="Log In" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalSessionExpired
