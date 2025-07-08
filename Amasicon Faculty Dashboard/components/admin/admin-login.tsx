"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Users, Calendar, Settings } from "lucide-react"

interface AdminLoginProps {
  onLogin: (username: string) => void
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate authentication - in real app, verify against admin credentials
    if (username === "admin" && password === "amasicon2025") {
      setTimeout(() => {
        onLogin(username)
        setIsLoading(false)
      }, 1000)
    } else {
      setError("Invalid credentials. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Admin Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full mx-auto flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AMASICON 2025</h1>
            <p className="text-lg text-gray-600">Admin Dashboard</p>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>28-31 Aug 2025</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>Faculty Management</span>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <Card>
          <CardHeader>
            <CardTitle>Administrator Login</CardTitle>
            <CardDescription>Access the conference management dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Settings className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Demo Credentials</span>
            </div>
            <div className="text-sm text-blue-800">
              <p>
                Username: <code className="bg-blue-100 px-1 rounded">admin</code>
              </p>
              <p>
                Password: <code className="bg-blue-100 px-1 rounded">amasicon2025</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
