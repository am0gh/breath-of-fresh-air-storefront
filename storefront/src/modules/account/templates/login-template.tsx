"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"
import ForgotPassword from "@modules/account/components/forgot-password"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
  FORGOT_PASSWORD = "forgot-password",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState(LOGIN_VIEW.SIGN_IN)

  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center py-16 px-8 bg-cream">
      <div className="w-full max-w-sm">
        {currentView === LOGIN_VIEW.SIGN_IN && (
          <Login setCurrentView={setCurrentView} />
        )}
        {currentView === LOGIN_VIEW.REGISTER && (
          <Register setCurrentView={setCurrentView} />
        )}
        {currentView === LOGIN_VIEW.FORGOT_PASSWORD && (
          <ForgotPassword setCurrentView={setCurrentView} />
        )}
      </div>
    </div>
  )
}

export default LoginTemplate
