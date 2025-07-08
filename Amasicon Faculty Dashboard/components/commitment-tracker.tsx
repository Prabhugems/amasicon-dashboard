"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, AlertCircle, MessageSquare } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SessionData {
  date: string
  hall: string
  session: string
  time: string
  topic: string
  role: string
  status: "confirmed" | "pending" | "declined"
}

interface CommitmentTrackerProps {
  sessions: SessionData[]
  onStatusChange: (sessionIndex: number, status: "confirmed" | "pending" | "declined") => void
}

export function CommitmentTracker({ sessions, onStatusChange }: CommitmentTrackerProps) {
  const [selectedSession, setSelectedSession] = useState<number | null>(null)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleStatusChange = async (sessionIndex: number, status: "confirmed" | "declined") => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      onStatusChange(sessionIndex, status)
      setSelectedSession(null)
      setComment("")
      setIsSubmitting(false)
    }, 1000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "pending":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case "declined":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />
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

  const pendingSessions = sessions.filter((s) => s.status === "pending")
  const confirmedSessions = sessions.filter((s) => s.status === "confirmed")
  const declinedSessions = sessions.filter((s) => s.status === "declined")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Session Commitments</CardTitle>
          <CardDescription>
            Please confirm your availability for assigned sessions. Your response helps us finalize the conference
            schedule.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-600">{confirmedSessions.length}</p>
                <p className="text-sm text-gray-600">Confirmed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{pendingSessions.length}</p>
                <p className="text-sm text-gray-600">Pending Response</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-red-600">{declinedSessions.length}</p>
                <p className="text-sm text-gray-600">Declined</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Sessions - Need Response */}
      {pendingSessions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <span>Sessions Awaiting Your Response</span>
            </CardTitle>
            <CardDescription>Please confirm or decline these session assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingSessions.map((session, index) => {
                const sessionIndex = sessions.findIndex((s) => s === session)
                return (
                  <div key={sessionIndex} className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">{session.session}</Badge>
                          <Badge variant="secondary">{session.role}</Badge>
                          <Badge className={getStatusColor(session.status)}>
                            {getStatusIcon(session.status)}
                            <span className="ml-1">Awaiting Response</span>
                          </Badge>
                        </div>

                        <h3 className="font-medium text-gray-900 mb-2">{session.topic}</h3>

                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <span>
                            <strong>Date:</strong> {session.date}
                          </span>
                          <span>
                            <strong>Time:</strong> {session.time}
                          </span>
                          <span>
                            <strong>Hall:</strong> {session.hall}
                          </span>
                        </div>

                        {selectedSession === sessionIndex ? (
                          <div className="space-y-3 mt-4 p-3 bg-white rounded border">
                            <Label htmlFor={`comment-${sessionIndex}`}>Add a comment (optional)</Label>
                            <Textarea
                              id={`comment-${sessionIndex}`}
                              placeholder="Any additional notes or requirements..."
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              rows={3}
                            />
                            <div className="flex space-x-2">
                              <Button
                                onClick={() => handleStatusChange(sessionIndex, "confirmed")}
                                disabled={isSubmitting}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                {isSubmitting ? "Confirming..." : "Confirm"}
                              </Button>
                              <Button
                                onClick={() => handleStatusChange(sessionIndex, "declined")}
                                disabled={isSubmitting}
                                variant="destructive"
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                {isSubmitting ? "Declining..." : "Decline"}
                              </Button>
                              <Button
                                onClick={() => setSelectedSession(null)}
                                variant="outline"
                                disabled={isSubmitting}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex space-x-2 mt-3">
                            <Button onClick={() => setSelectedSession(sessionIndex)} size="sm">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Respond
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Confirmed Sessions */}
      {confirmedSessions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Confirmed Sessions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {confirmedSessions.map((session, index) => (
                <div key={index} className="p-3 border border-green-200 rounded-lg bg-green-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline">{session.session}</Badge>
                        <Badge variant="secondary">{session.role}</Badge>
                      </div>
                      <h4 className="font-medium text-gray-900">{session.topic}</h4>
                      <p className="text-sm text-gray-600">
                        {session.date} • {session.time} • {session.hall}
                      </p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Declined Sessions */}
      {declinedSessions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span>Declined Sessions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {declinedSessions.map((session, index) => (
                <div key={index} className="p-3 border border-red-200 rounded-lg bg-red-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline">{session.session}</Badge>
                        <Badge variant="secondary">{session.role}</Badge>
                      </div>
                      <h4 className="font-medium text-gray-900">{session.topic}</h4>
                      <p className="text-sm text-gray-600">
                        {session.date} • {session.time} • {session.hall}
                      </p>
                    </div>
                    <XCircle className="w-5 h-5 text-red-500" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {pendingSessions.length === 0 && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Great! You've responded to all your session assignments. Thank you for your prompt response.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
