"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Shield,
  LogOut,
  Users,
  Calendar,
  FileText,
  BarChart3,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
} from "lucide-react"
import { FacultyManagement } from "./faculty-management"
import { SessionManagement } from "./session-management"
import { RequestManagement } from "./request-management"
import { AnalyticsDashboard } from "./analytics-dashboard"
import { CommunicationHub } from "./communication-hub"

interface AdminDashboardProps {
  adminUser: string
  onLogout: () => void
}

interface DashboardStats {
  totalFaculty: number
  totalSessions: number
  pendingRequests: number
  confirmedSessions: number
  pendingConfirmations: number
  declinedSessions: number
}

export function AdminDashboard({ adminUser, onLogout }: AdminDashboardProps) {
  const [stats, setStats] = useState<DashboardStats>({
    totalFaculty: 0,
    totalSessions: 0,
    pendingRequests: 0,
    confirmedSessions: 0,
    pendingConfirmations: 0,
    declinedSessions: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading dashboard stats
    const loadStats = async () => {
      // In real app, fetch from API
      const mockStats: DashboardStats = {
        totalFaculty: 156,
        totalSessions: 284,
        pendingRequests: 12,
        confirmedSessions: 198,
        pendingConfirmations: 67,
        declinedSessions: 19,
      }

      setTimeout(() => {
        setStats(mockStats)
        setLoading(false)
      }, 1000)
    }

    loadStats()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
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
                <p className="text-sm text-gray-500">Conference Management Dashboard</p>
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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="faculty">Faculty</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
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
                    <FileText className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.pendingRequests}</p>
                      <p className="text-sm text-gray-600">Pending Requests</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">
                        {Math.round((stats.confirmedSessions / stats.totalSessions) * 100)}%
                      </p>
                      <p className="text-sm text-gray-600">Confirmation Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Session Status Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Session Confirmation Status</CardTitle>
                  <CardDescription>Current status of faculty session confirmations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-medium">Confirmed</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">{stats.confirmedSessions}</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-yellow-500" />
                        <span className="font-medium">Pending</span>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">{stats.pendingConfirmations}</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <span className="font-medium">Declined</span>
                      </div>
                      <Badge className="bg-red-100 text-red-800">{stats.declinedSessions}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates and actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium">Dr. Priya Hazrah confirmed Session 54-4</p>
                        <p className="text-gray-500">2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium">New change request from Dr. Kumar</p>
                        <p className="text-gray-500">4 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <Users className="w-4 h-4 text-green-500 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium">5 new faculty members added</p>
                        <p className="text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Users className="w-6 h-6" />
                    <span>Add Faculty</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                    <Calendar className="w-6 h-6" />
                    <span>Create Session</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                    <FileText className="w-6 h-6" />
                    <span>Send Announcement</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faculty">
            <FacultyManagement />
          </TabsContent>

          <TabsContent value="sessions">
            <SessionManagement />
          </TabsContent>

          <TabsContent value="requests">
            <RequestManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard stats={stats} />
          </TabsContent>

          <TabsContent value="communication">
            <CommunicationHub />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
