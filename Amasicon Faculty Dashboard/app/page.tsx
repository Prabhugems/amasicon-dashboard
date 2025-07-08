"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { FacultyDashboard } from "@/components/faculty-dashboard"

export default function Home() {
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
      {/* Navigation Links */}
      <div className="absolute top-4 right-4 flex gap-2">
        <a
          href="/airtable"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Live Airtable Dashboard
        </a>
        <a
          href="/admin"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 2.676-1.332 6-6.031 6-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          Admin Access
        </a>
      </div>

      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <FacultyDashboard facultyEmail={facultyEmail} onLogout={handleLogout} />
      )}
    </div>
  )
}
