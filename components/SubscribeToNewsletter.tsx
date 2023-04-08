import { useState, useEffect } from "react"
import Turnstile from "react-turnstile"

export const SubscribeToNewsletter: React.FC<{
  className?: string
}> = ({ className }) => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState("")

  useEffect(() => {
    const email = localStorage.getItem("email")
    if (email) {
      setEmail(email)
      setIsSubscribed(true)
    }
  }, [])

  const subscribe = async () => {
    setIsLoading(true)
    const res = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: email,
        token: turnstileToken,
      }),
    })
    if (res.status === 200) {
      localStorage.setItem("email", email)
      setIsSubscribed(true)
      setIsLoading(false)
    }
    if (res.status === 500) {
      setIsError(true)
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`p-10 rounded-md shadow-md ${className} border border-gray-200`}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          subscribe()
        }}
      >
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold text-gray-900">
            Subscribe to my newsletter
          </h3>
          <p className="text-gray-600">
            Get notified when I publish new articles.
          </p>
        </div>
        <div className="flex flex-row items-center justify-center mt-6 gap-4">
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="px-4 py-2 text-white bg-pink-500 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 min-w-max"
            type="submit"
          >
            {/* loading state */}
            {isLoading ? (
              <svg
                className="w-5 h-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : // default state
            isSubscribed ? (
              <span>Subscribed</span>
            ) : (
              <span>Subscribe</span>
            )}
          </button>
          <Turnstile
            sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            onVerify={(token) => {
              setTurnstileToken(token)
            }}
          />
        </div>
      </form>
    </div>
  )
}
