"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, LogOut, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { ScheduleView } from "./schedule-view"
import { CommitmentTracker } from "./commitment-tracker"
import { ChangeRequestForm } from "./change-request-form"
import { ProfileSection } from "./profile-section"

interface FacultyDashboardProps {
  facultyEmail: string
  onLogout: () => void
}

interface FacultyData {
  name: string
  email: string
  city: string
  mobile: string
  photo: string
  sessions: SessionData[]
}

interface SessionData {
  date: string
  hall: string
  session: string
  time: string
  topic: string
  role: string
  status: "confirmed" | "pending" | "declined"
}

export function FacultyDashboard({ facultyEmail, onLogout }: FacultyDashboardProps) {
  const [facultyData, setFacultyData] = useState<FacultyData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading faculty data from CSV
    const loadFacultyData = async () => {
      // In a real app, you'd parse the CSV and filter by email
      // For demo, using mock data
      const mockData: FacultyData = {
        name: "Dr. Priya Hazrah",
        email: facultyEmail,
        city: "Delhi",
        mobile: "9873506336",
        photo: "/placeholder.svg?height=100&width=100&text=PH",
        sessions: [
          {
            date: "30.08.2025",
            hall: "Hall G",
            session: "Session 54-4",
            time: "15:00 - 15:15",
            topic: "Detecting AI generated content: Tools & techniques to identify AI created content",
            role: "Judge",
            status: "confirmed",
          },
          {
            date: "29.08.2025",
            hall: "Hall A",
            session: "Session 12-1",
            time: "09:00 - 09:30",
            topic: "Advanced Laparoscopic Techniques in Pediatric Surgery",
            role: "Speaker",
            status: "pending",
          },
        ],
      }

      setTimeout(() => {
        setFacultyData(mockData)
        setLoading(false)
      }, 1000)
    }

    loadFacultyData()
  }, [facultyEmail])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!facultyData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-red-600">Faculty data not found. Please contact the organizers.</p>
            <Button onClick={onLogout} className="mt-4">
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "pending":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case "declined":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "declined":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">A25</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AMASICON 2025</h1>
                <p className="text-sm text-gray-500">Faculty Dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{facultyData.name}</p>
                <p className="text-xs text-gray-500">{facultyData.city}</p>
              </div>
              <Avatar>
                <AvatarImage src={facultyData.photo || "/placeholder.svg"} alt={facultyData.name} />
                <AvatarFallback>
                  {facultyData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="commitments">Commitments</TabsTrigger>
            <TabsTrigger value="requests">Change Requests</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">{facultyData.sessions.length}</p>
                      <p className="text-sm text-gray-600">Total Sessions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">
                        {facultyData.sessions.filter((s) => s.status === "confirmed").length}
                      </p>
                      <p className="text-sm text-gray-600">Confirmed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="text-2xl font-bold">
                        {facultyData.sessions.filter((s) => s.status === "pending").length}
                      </p>
                      <p className="text-sm text-gray-600">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">{new Set(facultyData.sessions.map((s) => s.hall)).size}</p>
                      <p className="text-sm text-gray-600">Halls</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Your Upcoming Sessions</CardTitle>
                <CardDescription>Sessions assigned to you for AMASICON 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {facultyData.sessions.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">{session.session}</Badge>
                          <Badge variant="secondary">{session.role}</Badge>
                          <Badge className={getStatusColor(session.status)}>
                            {getStatusIcon(session.status)}
                            <span className="ml-1 capitalize">{session.status}</span>
                          </Badge>
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">{session.topic}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{session.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{session.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{session.hall}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <ScheduleView sessions={facultyData.sessions} />
          </TabsContent>

          <TabsContent value="commitments">
            <CommitmentTracker
              sessions={facultyData.sessions}
              onStatusChange={(sessionIndex, status) => {
                const updatedSessions = [...facultyData.sessions]
                updatedSessions[sessionIndex].status = status
                setFacultyData({ ...facultyData, sessions: updatedSessions })
              }}
            />
          </TabsContent>

          <TabsContent value="requests">
            <ChangeRequestForm facultyData={facultyData} />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileSection facultyData={facultyData} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
