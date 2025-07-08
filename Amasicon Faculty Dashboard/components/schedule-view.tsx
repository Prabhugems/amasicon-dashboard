"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, User } from "lucide-react"

interface SessionData {
  date: string
  hall: string
  session: string
  time: string
  topic: string
  role: string
  status: "confirmed" | "pending" | "declined"
}

interface ScheduleViewProps {
  sessions: SessionData[]
}

export function ScheduleView({ sessions }: ScheduleViewProps) {
  // Group sessions by date
  const sessionsByDate = sessions.reduce(
    (acc, session) => {
      if (!acc[session.date]) {
        acc[session.date] = []
      }
      acc[session.date].push(session)
      return acc
    },
    {} as Record<string, SessionData[]>,
  )

  // Sort dates
  const sortedDates = Object.keys(sessionsByDate).sort()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "declined":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "speaker":
        return "bg-blue-100 text-blue-800"
      case "judge":
        return "bg-purple-100 text-purple-800"
      case "moderator":
        return "bg-green-100 text-green-800"
      case "panelist":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Conference Schedule</CardTitle>
          <CardDescription>Complete schedule of your sessions at AMASICON 2025</CardDescription>
        </CardHeader>
      </Card>

      {sortedDates.map((date) => (
        <Card key={date}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span>
                {new Date(date.split(".").reverse().join("-")).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessionsByDate[date]
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((session, index) => (
                  <div
                    key={index}
                    className={`p-4 border-l-4 rounded-r-lg ${
                      session.status === "confirmed"
                        ? "border-l-green-500 bg-green-50"
                        : session.status === "pending"
                          ? "border-l-yellow-500 bg-yellow-50"
                          : "border-l-red-500 bg-red-50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">{session.session}</Badge>
                          <Badge className={getRoleColor(session.role)}>
                            <User className="w-3 h-3 mr-1" />
                            {session.role}
                          </Badge>
                          <Badge className={getStatusColor(session.status)}>
                            {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                          </Badge>
                        </div>

                        <h3 className="font-semibold text-gray-900 mb-2">{session.topic}</h3>

                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span className="font-medium">{session.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{session.hall}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {sessions.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Sessions Assigned</h3>
            <p className="text-gray-600">
              You don't have any sessions assigned yet. Please contact the organizers if you believe this is an error.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
