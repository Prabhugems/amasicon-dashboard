"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { AirtableFacultyDashboard } from "@/components/airtable-faculty-dashboard"

export default function AirtablePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [facultyEmail, setFacultyEmail] = useState("")

  const handleLogin = (email: string) => {
    setFacultyEmail(email)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setFacultyEmail("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="absolute top-4 left-4">
        <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-md">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Airtable Integration
        </div>
      </div>

      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <AirtableFacultyDashboard facultyEmail={facultyEmail} onLogout={handleLogout} />
      )}
    </div>
  )
}
