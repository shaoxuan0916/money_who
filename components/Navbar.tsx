import React, { useState } from "react"
import Image from "next/image"
import logo from "../public/logo-no-background.svg"
import { GiHamburgerMenu } from "react-icons/gi"
import { useRouter } from "next/router"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import useAuthStore from "../store/authStore"

const Navbar = () => {
  let router = useRouter()
  const { userProfile, removeUser } = useAuthStore()

  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        removeUser()
        console.log("Sign Out Successfully")
        router.push("/login")
      })
      .catch((error) => {
        console.log("Error")
      })
  }

  return (
    <div className="sticky ">
      <div className="h-[65px] bg-green4 sticky">
        <div className="flex items-center justify-between px-4 pt-4 pb-2 cursor-pointer">
          <div
            onClick={() =>
              // @ts-ignore
              userProfile && router.push(`/home/${userProfile.uid}`)
            }
          >
            <Image src={logo} alt="logo" height={38} />
          </div>
          <div
            className="text-green1 cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          >
            <GiHamburgerMenu size={30} />
          </div>
        </div>

        {showMenu && (
          <div className="bg-green4 text-[#666] py-4">
            <div>
              <div
                className="py-4 text-center cursor-pointer"
                onClick={() => {
                  // @ts-ignore
                  userProfile && router.push(`/home/${userProfile.uid}`)
                  setShowMenu(false)
                }}
              >
                Home
              </div>
              <div
                className="py-4 text-center cursor-pointer"
                onClick={() => {
                  router.push(`/profile`)
                }}
              >
                Profile
              </div>
              <div
                className="py-4 text-center cursor-pointer px-4"
                onClick={() => handleLogout()}
              >
                Log Out
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar