"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MoreHorizontal,
  Plus,
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle,
  AlertCircle,
  XCircle,
  Edit,
  Trash2,
  Users,
} from "lucide-react"

interface Session {
  id: string
  date: string
  hall: string
  session: string
  time: string
  topic: string
  facultyName: string
  facultyEmail: string
  role: string
  status: "confirmed" | "pending" | "declined" | "unassigned"
}

export function SessionManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterHall, setFilterHall] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  // Mock session data
  const [sessions] = useState<Session[]>([
    {
      id: "1",
      date: "30.08.2025",
      hall: "Hall G",
      session: "Session 54-4",
      time: "15:00 - 15:15",
      topic: "Detecting AI generated content: Tools & techniques to identify AI created content",
      facultyName: "Dr. Priya Hazrah",
      facultyEmail: "priyahazrah@gmail.com",
      role: "Judge",
      status: "confirmed",
    },
    {
      id: "2",
      date: "29.08.2025",
      hall: "Hall A",
      session: "Session 12-1",
      time: "09:00 - 09:30",
      topic: "Advanced Laparoscopic Techniques in Pediatric Surgery",
      facultyName: "Dr. Priya Hazrah",
      facultyEmail: "priyahazrah@gmail.com",
      role: "Speaker",
      status: "pending",
    },
    {
      id: "3",
      date: "28.08.2025",
      hall: "Hall B",
      session: "Session 05-2",
      time: "14:30 - 15:00",
      topic: "Robotic Surgery in Minimal Access Procedures",
      facultyName: "Dr. Rajesh Kumar",
      facultyEmail: "rajesh.kumar@hospital.com",
      role: "Speaker",
      status: "declined",
    },
    {
      id: "4",
      date: "31.08.2025",
      hall: "Hall C",
      session: "Session 78-1",
      time: "11:00 - 11:30",
      topic: "Future of Minimally Invasive Surgery",
      facultyName: "",
      facultyEmail: "",
      role: "",
      status: "unassigned",
    },
  ])

  const halls = ["Hall A", "Hall B", "Hall C", "Hall G"]
  const statuses = ["confirmed", "pending", "declined", "unassigned"]

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.session.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesHall = filterHall === "all" || session.hall === filterHall
    const matchesStatus = filterStatus === "all" || session.status === filterStatus

    return matchesSearch && matchesHall && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "declined":
        return "bg-red-100 text-red-800"
      case "unassigned":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <AlertCircle className="w-4 h-4" />
      case "declined":
        return <XCircle className="w-4 h-4" />
      case "unassigned":
        return <Users className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Session Management</CardTitle>
              <CardDescription>Manage conference sessions, assignments, and scheduling</CardDescription>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Session
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search sessions by topic, faculty, or session ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterHall} onValueChange={setFilterHall}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Halls" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Halls</SelectItem>
                {halls.map((hall) => (
                  <SelectItem key={hall} value={hall}>
                    {hall}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Sessions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sessions ({filteredSessions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Session Details</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Faculty Assignment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{session.session}</Badge>
                        <Badge className={getRoleColor(session.role)}>{session.role || "Unassigned"}</Badge>
                      </div>
                      <h4 className="font-medium">{session.topic}</h4>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span>{session.hall}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {session.facultyName ? (
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3 text-gray-400" />
                          <span className="text-sm font-medium">{session.facultyName}</span>
                        </div>
                        <p className="text-xs text-gray-500">{session.facultyEmail}</p>
                      </div>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">
                        <Users className="w-3 h-3 mr-1" />
                        Unassigned
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(session.status)}>
                      {getStatusIcon(session.status)}
                      <span className="ml-1 capitalize">{session.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Session
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <User className="w-4 h-4 mr-2" />
                          Assign Faculty
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="w-4 h-4 mr-2" />
                          Reschedule
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Session
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {sessions.filter((s) => s.status === "confirmed").length}
                </p>
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
                <p className="text-2xl font-bold text-yellow-600">
                  {sessions.filter((s) => s.status === "pending").length}
                </p>
                <p className="text-sm text-gray-600">Pending</p>
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
                  {sessions.filter((s) => s.status === "declined").length}
                </p>
                <p className="text-sm text-gray-600">Declined</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-2xl font-bold text-gray-600">
                  {sessions.filter((s) => s.status === "unassigned").length}
                </p>
                <p className="text-sm text-gray-600">Unassigned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
