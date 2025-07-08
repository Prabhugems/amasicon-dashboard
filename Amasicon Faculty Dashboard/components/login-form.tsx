"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, Calendar, Users } from "lucide-react"

interface LoginFormProps {
  onLogin: (email: string) => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate authentication - in real app, verify against your faculty database
    if (email.includes("@")) {
      setTimeout(() => {
        onLogin(email)
        setIsLoading(false)
      }, 1000)
    } else {
      setError("Please enter a valid email address")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Conference Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full mx-auto flex items-center justify-center">
            <Users className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AMASICON 2025</h1>
            <p className="text-lg text-gray-600">Faculty Dashboard</p>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>28-31 Aug 2025</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Jaipur</span>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <Card>
          <CardHeader>
            <CardTitle>Faculty Login</CardTitle>
            <CardDescription>Enter your registered email to access your conference dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

        {/* Welcome Message Preview */}
        <Card className="bg-gradient-to-r from-orange-100 to-pink-100 border-orange-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-700 text-center">
              Welcome to the 20th International Conference of AMASI in the beautiful city of Jaipur! Access your
              personalized schedule, manage sessions, and connect with fellow faculty.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
