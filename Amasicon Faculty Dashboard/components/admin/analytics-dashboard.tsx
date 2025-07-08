"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  MapPin,
  Award,
} from "lucide-react"

interface DashboardStats {
  totalFaculty: number
  totalSessions: number
  pendingRequests: number
  confirmedSessions: number
  pendingConfirmations: number
  declinedSessions: number
}

interface AnalyticsDashboardProps {
  stats: DashboardStats
}

export function AnalyticsDashboard({ stats }: AnalyticsDashboardProps) {
  const confirmationRate = Math.round((stats.confirmedSessions / stats.totalSessions) * 100)
  const responseRate = Math.round(((stats.confirmedSessions + stats.declinedSessions) / stats.totalSessions) * 100)

  // Mock additional analytics data
  const hallUtilization = [
    { hall: "Hall A", sessions: 45, utilization: 89 },
    { hall: "Hall B", sessions: 38, utilization: 76 },
    { hall: "Hall C", sessions: 42, utilization: 84 },
    { hall: "Hall G", sessions: 35, utilization: 70 },
  ]

  const sessionsByRole = [
    { role: "Speaker", count: 89, percentage: 45 },
    { role: "Judge", count: 67, percentage: 34 },
    { role: "Moderator", count: 28, percentage: 14 },
    { role: "Panelist", count: 14, percentage: 7 },
  ]

  const facultyByCity = [
    { city: "Delhi", count: 34, percentage: 22 },
    { city: "Mumbai", count: 28, percentage: 18 },
    { city: "Bangalore", count: 25, percentage: 16 },
    { city: "Chennai", count: 22, percentage: 14 },
    { city: "Kolkata", count: 18, percentage: 12 },
    { city: "Others", count: 29, percentage: 18 },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Conference Analytics</CardTitle>
          <CardDescription>Comprehensive insights and statistics for AMASICON 2025</CardDescription>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-600">{confirmationRate}%</p>
                <p className="text-sm text-gray-600">Confirmation Rate</p>
              </div>
            </div>
            <Progress value={confirmationRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-blue-600">{responseRate}%</p>
                <p className="text-sm text-gray-600">Response Rate</p>
              </div>
            </div>
            <Progress value={responseRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-purple-600">{stats.totalFaculty}</p>
                <p className="text-sm text-gray-600">Total Faculty</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold text-orange-600">{stats.totalSessions}</p>
                <p className="text-sm text-gray-600">Total Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Session Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Session Status Distribution</CardTitle>
            <CardDescription>Current status of all conference sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Confirmed Sessions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{stats.confirmedSessions}</span>
                  <Badge className="bg-green-100 text-green-800">
                    {Math.round((stats.confirmedSessions / stats.totalSessions) * 100)}%
                  </Badge>
                </div>
              </div>
              <Progress value={(stats.confirmedSessions / stats.totalSessions) * 100} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-yellow-500" />
                  <span>Pending Confirmations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{stats.pendingConfirmations}</span>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    {Math.round((stats.pendingConfirmations / stats.totalSessions) * 100)}%
                  </Badge>
                </div>
              </div>
              <Progress value={(stats.pendingConfirmations / stats.totalSessions) * 100} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span>Declined Sessions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{stats.declinedSessions}</span>
                  <Badge className="bg-red-100 text-red-800">
                    {Math.round((stats.declinedSessions / stats.totalSessions) * 100)}%
                  </Badge>
                </div>
              </div>
              <Progress value={(stats.declinedSessions / stats.totalSessions) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hall Utilization</CardTitle>
            <CardDescription>Session distribution across conference halls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hallUtilization.map((hall) => (
                <div key={hall.hall} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{hall.hall}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{hall.sessions} sessions</span>
                      <Badge variant="outline">{hall.utilization}%</Badge>
                    </div>
                  </div>
                  <Progress value={hall.utilization} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Faculty Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sessions by Role</CardTitle>
            <CardDescription>Distribution of sessions across different faculty roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessionsByRole.map((role) => (
                <div key={role.role} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{role.role}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{role.count} sessions</span>
                      <Badge variant="outline">{role.percentage}%</Badge>
                    </div>
                  </div>
                  <Progress value={role.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Faculty by Location</CardTitle>
            <CardDescription>Geographic distribution of conference faculty</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {facultyByCity.map((location) => (
                <div key={location.city} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{location.city}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{location.count} faculty</span>
                      <Badge variant="outline">{location.percentage}%</Badge>
                    </div>
                  </div>
                  <Progress value={location.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trends and Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
          <CardDescription>Important observations and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-green-600">Positive Trends</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>High confirmation rate of {confirmationRate}% indicates strong faculty engagement</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Balanced distribution of sessions across different halls</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Good geographic diversity with faculty from major cities</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-orange-600">Areas for Attention</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                  <span>{stats.pendingConfirmations} sessions still awaiting faculty confirmation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                  <span>{stats.pendingRequests} change requests need immediate review</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                  <span>Follow up required for declined sessions to find replacements</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
