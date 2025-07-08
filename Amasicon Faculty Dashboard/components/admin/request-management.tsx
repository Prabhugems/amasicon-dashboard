"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertCircle, CheckCircle, XCircle, Clock, User } from "lucide-react"

interface ChangeRequest {
  id: string
  facultyName: string
  facultyEmail: string
  type: string
  session: string
  description: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  priority: "low" | "medium" | "high"
  adminNotes?: string
}

export function RequestManagement() {
  const [selectedRequest, setSelectedRequest] = useState<ChangeRequest | null>(null)
  const [adminResponse, setAdminResponse] = useState("")

  // Mock request data
  const [requests, setRequests] = useState<ChangeRequest[]>([
    {
      id: "1",
      facultyName: "Dr. Priya Hazrah",
      facultyEmail: "priyahazrah@gmail.com",
      type: "Time Change",
      session: "Session 54-4",
      description:
        "Request to move session 30 minutes earlier due to flight schedule conflict. I have an international flight at 6 PM and need to reach the airport by 4 PM.",
      status: "pending",
      submittedAt: "2025-01-07T10:30:00Z",
      priority: "high",
    },
    {
      id: "2",
      facultyName: "Dr. Rajesh Kumar",
      facultyEmail: "rajesh.kumar@hospital.com",
      type: "Technical Requirements",
      session: "Session 05-2",
      description:
        "Need additional AV equipment for live surgery demonstration. Require 4K camera setup and streaming capabilities.",
      status: "approved",
      submittedAt: "2025-01-06T14:15:00Z",
      priority: "medium",
      adminNotes: "Approved. AV team has been notified to arrange 4K setup.",
    },
    {
      id: "3",
      facultyName: "Dr. Sunita Sharma",
      facultyEmail: "sunita.sharma@medical.edu",
      type: "Hall Change",
      session: "Session 22-1",
      description: "Request to move to a larger hall as expecting more attendees than initially planned.",
      status: "rejected",
      submittedAt: "2025-01-05T09:20:00Z",
      priority: "low",
      adminNotes: "Unfortunately, larger halls are not available at the requested time slot.",
    },
  ])

  const handleRequestAction = (requestId: string, action: "approved" | "rejected") => {
    setRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: action, adminNotes: adminResponse } : req)),
    )
    setSelectedRequest(null)
    setAdminResponse("")
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
        return <XCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Time Change":
        return "bg-blue-100 text-blue-800"
      case "Hall Change":
        return "bg-purple-100 text-purple-800"
      case "Technical Requirements":
        return "bg-orange-100 text-orange-800"
      case "Topic Change":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const pendingRequests = requests.filter((r) => r.status === "pending")
  const processedRequests = requests.filter((r) => r.status !== "pending")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Request Management</CardTitle>
          <CardDescription>Review and manage faculty change requests for sessions and requirements</CardDescription>
        </CardHeader>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{pendingRequests.length}</p>
                <p className="text-sm text-gray-600">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {requests.filter((r) => r.status === "approved").length}
                </p>
                <p className="text-sm text-gray-600">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {requests.filter((r) => r.status === "rejected").length}
                </p>
                <p className="text-sm text-gray-600">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold text-orange-600">
                  {requests.filter((r) => r.priority === "high").length}
                </p>
                <p className="text-sm text-gray-600">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <span>Pending Requests ({pendingRequests.length})</span>
            </CardTitle>
            <CardDescription>Requests awaiting your review and action</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Faculty & Request</TableHead>
                  <TableHead>Session</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{request.facultyName}</span>
                        </div>
                        <Badge className={getTypeColor(request.type)}>{request.type}</Badge>
                        <p className="text-sm text-gray-600 line-clamp-2">{request.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{request.session}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(request.priority)}>{request.priority.toUpperCase()}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-500">
                        {new Date(request.submittedAt).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" onClick={() => setSelectedRequest(request)}>
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Processed Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Processed Requests</CardTitle>
          <CardDescription>Previously reviewed and actioned requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Faculty & Request</TableHead>
                <TableHead>Session</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Processed</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{request.facultyName}</span>
                      </div>
                      <Badge className={getTypeColor(request.type)}>{request.type}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{request.session}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(request.status)}>
                      {getStatusIcon(request.status)}
                      <span className="ml-1 capitalize">{request.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-500">{new Date(request.submittedAt).toLocaleDateString()}</span>
                  </TableCell>
                  <TableCell>
                    {request.adminNotes && (
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-600 truncate">{request.adminNotes}</p>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Request Review Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Change Request</DialogTitle>
            <DialogDescription>Evaluate and respond to the faculty change request</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Faculty Information</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Name:</strong> {selectedRequest.facultyName}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedRequest.facultyEmail}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Request Details</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Type:</strong> {selectedRequest.type}
                    </p>
                    <p>
                      <strong>Session:</strong> {selectedRequest.session}
                    </p>
                    <p>
                      <strong>Priority:</strong>
                      <Badge className={`ml-2 ${getPriorityColor(selectedRequest.priority)}`}>
                        {selectedRequest.priority.toUpperCase()}
                      </Badge>
                    </p>
                    <p>
                      <strong>Submitted:</strong> {new Date(selectedRequest.submittedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Request Description</h4>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm">{selectedRequest.description}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Admin Response</h4>
                <Textarea
                  placeholder="Add your response or notes for this request..."
                  value={adminResponse}
                  onChange={(e) => setAdminResponse(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={() => handleRequestAction(selectedRequest.id, "approved")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Request
                </Button>
                <Button onClick={() => handleRequestAction(selectedRequest.id, "rejected")} variant="destructive">
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject Request
                </Button>
                <Button onClick={() => setSelectedRequest(null)} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
