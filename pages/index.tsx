import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import Button from "../components/Button"
import logo from "../public/logo-no-background.svg"

export default function Home() {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>Money Who</title>
        <meta
          name="description"
          content="Easiest way to share expenses with friends and family and stop stressing about “who owes who.”"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;600;800&display=swap"
          rel="stylesheet"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      {/* body */}
      <div className="min-h-[100vh] bg-green4 max-w-[600px] mx-auto px-8">
        <div className="">
          <div className="py-16">
            <Image
              src={logo}
              style={{ width: "auto", height: "auto" }}
              alt="logo"
            />
          </div>

          <div className="text-textColor">
            <p className="text-xl text-left">
              Easiest way to share expenses with friends and family and stop
              stressing about <i className="font-semibold">"who owes who"</i> .
            </p>

            <div className="flex flex-col gap-2 my-12">
              <div onClick={() => router.push("/signup")}>
                <Button text="Sign Up" />
              </div>
              <div onClick={() => router.push("/login")}>
                <Button text="Log In" outline={true} />
              </div>
            </div>

            <div className="text-xl text-center fixed bottom-0 left-0 right-0 mb-8">
              <p className="">No pen or paper needed.</p>
              <p>
                Just <b className="text-green1">MONEY.WHO</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
