"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Shield,
  LogOut,
  Users,
  Calendar,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import {
  fetchFaculty,
  fetchSessions,
  fetchChangeRequests,
  type AirtableFaculty,
  type AirtableSession,
  type AirtableChangeRequest,
} from "@/lib/airtable"

interface AirtableAdminDashboardProps {
  adminUser: string
  onLogout: () => void
}

export function AirtableAdminDashboard({ adminUser, onLogout }: AirtableAdminDashboardProps) {
  const [facultyList, setFacultyList] = useState<AirtableFaculty[]>([])
  const [sessions, setSessions] = useState<AirtableSession[]>([])
  const [changeRequests, setChangeRequests] = useState<AirtableChangeRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalFaculty: 0,
    totalSessions: 0,
    confirmedSessions: 0,
    pendingSessions: 0,
    declinedSessions: 0,
    pendingRequests: 0,
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        // Fetch all data from Airtable
        const [facultyData, sessionsData, requestsData] = await Promise.all([
          fetchFaculty(),
          fetchSessions(),
          fetchChangeRequests(),
        ])

        setFacultyList(facultyData)
        setSessions(sessionsData)
        setChangeRequests(requestsData)

        // Calculate stats
        const confirmedCount = sessionsData.filter((s) => s.fields.Status?.toLowerCase() === "confirmed").length
        const pendingCount = sessionsData.filter((s) => s.fields.Status?.toLowerCase() === "pending").length
        const declinedCount = sessionsData.filter((s) => s.fields.Status?.toLowerCase() === "declined").length
        const pendingRequestsCount = requestsData.filter((r) => r.fields.Status?.toLowerCase() === "pending").length

        setStats({
          totalFaculty: facultyData.length,
          totalSessions: sessionsData.length,
          confirmedSessions: confirmedCount,
          pendingSessions: pendingCount,
          declinedSessions: declinedCount,
          pendingRequests: pendingRequestsCount,
        })
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "declined":
        return "bg-red-100 text-red-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
      case "active":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "declined":
      case "inactive":
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading admin dashboard from Airtable...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AMASICON 2025 Admin</h1>
                <p className="text-sm text-gray-500">Live Airtable Integration</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Administrator</p>
                <p className="text-xs text-gray-500">{adminUser}</p>
              </div>
              <Avatar>
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  <Shield className="w-4 h-4" />
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="faculty">Faculty</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Live Stats from Airtable */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.totalFaculty}</p>
                      <p className="text-sm text-gray-600">Total Faculty</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.totalSessions}</p>
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
                      <p className="text-2xl font-bold">{stats.confirmedSessions}</p>
                      <p className="text-sm text-gray-600">Confirmed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.pendingSessions}</p>
                      <p className="text-sm text-gray-600">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Live Data from Airtable</CardTitle>
                <CardDescription>Real-time updates from your Airtable base</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm">✅ Connected to Airtable Base: appXGGABBkN8y4lwq</span>
                    <Badge className="bg-green-100 text-green-800">Live</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm">📊 {stats.totalFaculty} Faculty records loaded</span>
                    <Badge className="bg-blue-100 text-blue-800">Synced</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm">🎯 {stats.totalSessions} Sessions loaded</span>
                    <Badge className="bg-purple-100 text-purple-800">Synced</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faculty">
            <Card>
              <CardHeader>
                <CardTitle>Faculty Management (Live from Airtable)</CardTitle>
                <CardDescription>Real-time faculty data from your Airtable base</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Faculty</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Institution</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Sessions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {facultyList.slice(0, 10).map((faculty) => {
                      const facultySessions = sessions.filter((s) => s.fields.Faculty?.includes(faculty.id))
                      return (
                        <TableRow key={faculty.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarFallback>
                                  {faculty.fields.Name.split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{faculty.fields.Name}</p>
                                <p className="text-sm text-gray-500">{faculty.fields.City}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-1 text-sm">
                                <Mail className="w-3 h-3 text-gray-400" />
                                <span>{faculty.fields.Email}</span>
                              </div>
                              {faculty.fields.Mobile && (
                                <div className="flex items-center space-x-1 text-sm">
                                  <Phone className="w-3 h-3 text-gray-400" />
                                  <span>{faculty.fields.Mobile}</span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3 text-gray-400" />
                              <span className="text-sm">{faculty.fields.Institution || "Not specified"}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(faculty.fields.Status || "")}>
                              {getStatusIcon(faculty.fields.Status || "")}
                              <span className="ml-1">{faculty.fields.Status || "Unknown"}</span>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm font-medium">{facultySessions.length} sessions</span>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <CardTitle>Session Management (Live from Airtable)</CardTitle>
                <CardDescription>Real-time session data from your Airtable base</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Session</TableHead>
                      <TableHead>Faculty</TableHead>
                      <TableHead>Schedule</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions.slice(0, 10).map((session) => {
                      const faculty = facultyList.find((f) => session.fields.Faculty?.includes(f.id))
                      return (
                        <TableRow key={session.id}>
                          <TableCell>
                            <div>
                              <Badge variant="outline">{session.fields["Session ID"]}</Badge>
                              <p className="font-medium mt-1">{session.fields.Topic}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {faculty ? (
                              <div>
                                <p className="font-medium">{faculty.fields.Name}</p>
                                <Badge variant="secondary">{session.fields.Role}</Badge>
                              </div>
                            ) : (
                              <Badge variant="outline">Unassigned</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p>{session.fields.Date}</p>
                              <p>{session.fields.Time}</p>
                              <p>{session.fields.Hall}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(session.fields.Status || "")}>
                              {getStatusIcon(session.fields.Status || "")}
                              <span className="ml-1">{session.fields.Status || "Unknown"}</span>
                            </Badge>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Session Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Confirmed</span>
                      <Badge className="bg-green-100 text-green-800">{stats.confirmedSessions}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Pending</span>
                      <Badge className="bg-yellow-100 text-yellow-800">{stats.pendingSessions}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Declined</span>
                      <Badge className="bg-red-100 text-red-800">{stats.declinedSessions}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Faculty Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Active Faculty</span>
                      <Badge className="bg-green-100 text-green-800">
                        {facultyList.filter((f) => f.fields.Status === "Active").length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Total Faculty</span>
                      <Badge className="bg-blue-100 text-blue-800">{stats.totalFaculty}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
