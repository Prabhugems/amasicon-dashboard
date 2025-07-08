"use client"

import { useState } from "react"
import { AdminLogin } from "@/components/admin/admin-login"
import { AirtableAdminDashboard } from "@/components/admin/airtable-admin-dashboard"

export default function AdminAirtablePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [adminUser, setAdminUser] = useState("")

  const handleLogin = (username: string) => {
    setAdminUser(username)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setAdminUser("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {!isLoggedIn ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <AirtableAdminDashboard adminUser={adminUser} onLogout={handleLogout} />
      )}
    </div>
  )
}
