"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { FileText, Send, Clock, CheckCircle } from "lucide-react"

interface FacultyData {
  name: string
  email: string
  city: string
  mobile: string
  photo: string
  sessions: any[]
}

interface ChangeRequestFormProps {
  facultyData: FacultyData
}

interface ChangeRequest {
  id: string
  type: string
  session: string
  description: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
}

export function ChangeRequestForm({ facultyData }: ChangeRequestFormProps) {
  const [requestType, setRequestType] = useState("")
  const [selectedSession, setSelectedSession] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Mock previous requests
  const [previousRequests] = useState<ChangeRequest[]>([
    {
      id: "1",
      type: "Time Change",
      session: "Session 54-4",
      description: "Request to move session 30 minutes earlier due to flight schedule",
      status: "pending",
      submittedAt: "2025-01-07",
    },
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setRequestType("")
      setSelectedSession("")
      setDescription("")

      // Hide success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000)
    }, 1000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />
      case "rejected":
        return <FileText className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Requests</CardTitle>
          <CardDescription>
            Submit requests for changes to your session schedule, topics, or other requirements
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Submit New Request */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Send className="w-5 h-5 text-blue-500" />
            <span>Submit New Request</span>
          </CardTitle>
          <CardDescription>Please provide detailed information about the change you're requesting</CardDescription>
        </CardHeader>
        <CardContent>
          {submitSuccess && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Your change request has been submitted successfully. The organizing committee will review it and get
                back to you soon.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="request-type">Request Type</Label>
                <Select value={requestType} onValueChange={setRequestType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select request type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="time-change">Time Change</SelectItem>
                    <SelectItem value="date-change">Date Change</SelectItem>
                    <SelectItem value="hall-change">Hall Change</SelectItem>
                    <SelectItem value="topic-change">Topic Modification</SelectItem>
                    <SelectItem value="role-change">Role Change</SelectItem>
                    <SelectItem value="technical-requirements">Technical Requirements</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="session">Related Session</Label>
                <Select value={selectedSession} onValueChange={setSelectedSession} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select session" />
                  </SelectTrigger>
                  <SelectContent>
                    {facultyData.sessions.map((session, index) => (
                      <SelectItem key={index} value={session.session}>
                        {session.session} - {session.topic.substring(0, 50)}...
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Request Description</Label>
              <Textarea
                id="description"
                placeholder="Please provide detailed information about your request, including reasons and any specific requirements..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact Information (Optional)</Label>
              <Input id="contact" placeholder="Alternative contact method if different from registered email/phone" />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? "Submitting Request..." : "Submit Request"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Previous Requests */}
      {previousRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-gray-500" />
              <span>Your Previous Requests</span>
            </CardTitle>
            <CardDescription>Track the status of your submitted change requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {previousRequests.map((request) => (
                <div key={request.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{request.type}</Badge>
                      <Badge variant="secondary">{request.session}</Badge>
                      <Badge className={getStatusColor(request.status)}>
                        {getStatusIcon(request.status)}
                        <span className="ml-1 capitalize">{request.status}</span>
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500">
                      Submitted: {new Date(request.submittedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-2">{request.description}</p>

                  {request.status === "pending" && (
                    <p className="text-sm text-yellow-600">
                      Your request is being reviewed by the organizing committee.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Guidelines */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Request Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Please submit requests at least 7 days before the conference when possible</li>
            <li>• Emergency requests will be handled on a case-by-case basis</li>
            <li>• All requests are subject to availability and conference logistics</li>
            <li>• You will receive email confirmation once your request is reviewed</li>
            <li>• For urgent matters, please contact the organizing committee directly</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
