"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, LogOut, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import {
  fetchFaculty,
  fetchSessions,
  updateSessionStatus,
  type AirtableFaculty,
  type AirtableSession,
} from "@/lib/airtable"

interface AirtableFacultyDashboardProps {
  facultyEmail: string
  onLogout: () => void
}

export function AirtableFacultyDashboard({ facultyEmail, onLogout }: AirtableFacultyDashboardProps) {
  const [facultyData, setFacultyData] = useState<AirtableFaculty | null>(null)
  const [sessions, setSessions] = useState<AirtableSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        // Fetch faculty data
        const facultyList = await fetchFaculty()
        const currentFaculty = facultyList.find((f) => f.fields.Email === facultyEmail)

        if (!currentFaculty) {
          setError("Faculty not found in database")
          return
        }

        setFacultyData(currentFaculty)

        // Fetch sessions for this faculty
        const allSessions = await fetchSessions()
        const facultySessions = allSessions.filter((session) => session.fields.Faculty?.includes(currentFaculty.id))

        setSessions(facultySessions)
      } catch (err) {
        setError("Failed to load data from Airtable")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [facultyEmail])

  const handleStatusChange = async (sessionId: string, status: string) => {
    const success = await updateSessionStatus(sessionId, status)
    if (success) {
      // Refresh sessions
      const allSessions = await fetchSessions()
      const facultySessions = allSessions.filter((session) => session.fields.Faculty?.includes(facultyData?.id || ""))
      setSessions(facultySessions)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading from Airtable...</p>
        </div>
      </div>
    )
  }

  if (error || !facultyData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-red-600">{error || "Faculty data not found"}</p>
            <Button onClick={onLogout} className="mt-4">
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
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
    switch (status?.toLowerCase()) {
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
                <p className="text-sm text-gray-500">Faculty Dashboard (Live Airtable)</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{facultyData.fields.Name}</p>
                <p className="text-xs text-gray-500">{facultyData.fields.City}</p>
              </div>
              <Avatar>
                <AvatarFallback>
                  {facultyData.fields.Name.split(" ")
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">My Sessions</TabsTrigger>
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
                      <p className="text-2xl font-bold">{sessions.length}</p>
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
                        {sessions.filter((s) => s.fields.Status?.toLowerCase() === "confirmed").length}
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
                        {sessions.filter((s) => s.fields.Status?.toLowerCase() === "pending").length}
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
                      <p className="text-2xl font-bold">
                        {new Set(sessions.map((s) => s.fields.Hall).filter(Boolean)).size}
                      </p>
                      <p className="text-sm text-gray-600">Halls</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sessions from Airtable */}
            <Card>
              <CardHeader>
                <CardTitle>Your Sessions (Live from Airtable)</CardTitle>
                <CardDescription>Sessions loaded directly from your Airtable database</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">{session.fields["Session ID"]}</Badge>
                          <Badge variant="secondary">{session.fields.Role}</Badge>
                          <Badge className={getStatusColor(session.fields.Status || "")}>
                            {getStatusIcon(session.fields.Status || "")}
                            <span className="ml-1 capitalize">{session.fields.Status || "Unknown"}</span>
                          </Badge>
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">{session.fields.Topic}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{session.fields.Date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{session.fields.Time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{session.fields.Hall}</span>
                          </div>
                        </div>
                      </div>
                      {session.fields.Status?.toLowerCase() === "pending" && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(session.id, "Confirmed")}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Confirm
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleStatusChange(session.id, "Declined")}
                          >
                            Decline
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <CardTitle>Session Management</CardTitle>
                <CardDescription>Manage your session confirmations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div key={session.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{session.fields.Topic}</h3>
                          <p className="text-sm text-gray-600">
                            {session.fields.Date} • {session.fields.Time} • {session.fields.Hall}
                          </p>
                        </div>
                        <Badge className={getStatusColor(session.fields.Status || "")}>{session.fields.Status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Faculty Profile (From Airtable)</CardTitle>
                <CardDescription>Your information as stored in Airtable</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <p className="text-gray-900">{facultyData.fields.Name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-gray-900">{facultyData.fields.Email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Mobile</label>
                    <p className="text-gray-900">{facultyData.fields.Mobile || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">City</label>
                    <p className="text-gray-900">{facultyData.fields.City || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Institution</label>
                    <p className="text-gray-900">{facultyData.fields.Institution || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <Badge
                      className={
                        facultyData.fields.Status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {facultyData.fields.Status || "Unknown"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
