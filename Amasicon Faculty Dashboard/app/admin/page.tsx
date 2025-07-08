"use client"

import { useState } from "react"
import { AdminLogin } from "@/components/admin/admin-login"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default function AdminPage() {
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
        <AdminDashboard adminUser={adminUser} onLogout={handleLogout} />
      )}
    </div>
  )
}
