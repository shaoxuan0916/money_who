import React, { useEffect, useState } from "react"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import Input from "../components/Input"
import Image from "next/image"
import logo from "../public/logo-no-background.svg"
import Button from "../components/Button"
import Link from "next/link"
import { auth } from "../firebase"
import { useRouter } from "next/router"
import useAuthStore from "../store/authStore"

const LoginPage = () => {
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { addUser, userProfile } = useAuthStore()

  let router = useRouter()

  // not sure where to use

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     addUser(user)
  //   })
  //   return unsubscribe
  // }, [])

  const handleLogin = (e: any) => {
    e.preventDefault()

    if (email === "" || password === "") {
      setError("Email or Password cannot be empty")
      return
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setError("")
        const user = userCredential.user

        // add user to authStore
        addUser(user)

        // redirect to home page
        router.push(`/home/${user.uid}`)
      })
      .catch((error) => {
        setError("Email or Password is incorrect")
      })
  }

  return (
    <div className=" h-[100vh] ">
      <div className="h-[25%] bg-green4 flex items-center justify-center">
        <div>
          <Image priority src={logo} alt="logo" width={320} height={200} />
        </div>
      </div>

      <div className="bg-white px-8 pt-12 max-w-[600px] mx-auto">
        <h3 className="text-4xl font-semibold">Log In</h3>

        <div className="mt-8">
          {error && <p className="text-errorMsg">{error}</p>}

          <form action="">
            <Input label="Email" placeholder="Your Email" setValue={setEmail} />
            <Input
              type="password"
              label="Password"
              placeholder="Password"
              setValue={setPassword}
            />
          </form>
          <div onClick={handleLogin}>
            <Button text="Log In" />
          </div>
          <div className="pt-2 text-green1">
            <Link href="/signup">Doesn't Have An Account? Sign Up Now</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
