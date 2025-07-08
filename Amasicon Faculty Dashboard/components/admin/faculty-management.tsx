"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"

interface Faculty {
  id: string
  name: string
  email: string
  mobile: string
  city: string
  institution: string
  photo: string
  totalSessions: number
  confirmedSessions: number
  pendingSessions: number
  declinedSessions: number
  status: "active" | "inactive"
  lastLogin: string
}

export function FacultyManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null)

  // Mock faculty data
  const [facultyList] = useState<Faculty[]>([
    {
      id: "1",
      name: "Dr. Priya Hazrah",
      email: "priyahazrah@gmail.com",
      mobile: "9873506336",
      city: "Delhi",
      institution: "AIIMS Delhi",
      photo: "/placeholder.svg?height=40&width=40&text=PH",
      totalSessions: 3,
      confirmedSessions: 2,
      pendingSessions: 1,
      declinedSessions: 0,
      status: "active",
      lastLogin: "2025-01-07",
    },
    {
      id: "2",
      name: "Dr. Rajesh Kumar",
      email: "rajesh.kumar@hospital.com",
      mobile: "9876543210",
      city: "Mumbai",
      institution: "KEM Hospital",
      photo: "/placeholder.svg?height=40&width=40&text=RK",
      totalSessions: 2,
      confirmedSessions: 1,
      pendingSessions: 0,
      declinedSessions: 1,
      status: "active",
      lastLogin: "2025-01-06",
    },
    {
      id: "3",
      name: "Dr. Sunita Sharma",
      email: "sunita.sharma@medical.edu",
      mobile: "9988776655",
      city: "Bangalore",
      institution: "NIMHANS",
      photo: "/placeholder.svg?height=40&width=40&text=SS",
      totalSessions: 4,
      confirmedSessions: 4,
      pendingSessions: 0,
      declinedSessions: 0,
      status: "active",
      lastLogin: "2025-01-08",
    },
  ])

  const filteredFaculty = facultyList.filter(
    (faculty) =>
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.city.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (confirmed: number, pending: number, declined: number) => {
    if (pending > 0) return "bg-yellow-100 text-yellow-800"
    if (declined > 0) return "bg-red-100 text-red-800"
    if (confirmed > 0) return "bg-green-100 text-green-800"
    return "bg-gray-100 text-gray-800"
  }

  const getStatusText = (confirmed: number, pending: number, declined: number) => {
    if (pending > 0) return "Pending Response"
    if (declined > 0) return "Has Declined"
    if (confirmed > 0) return "All Confirmed"
    return "No Sessions"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Faculty Management</CardTitle>
              <CardDescription>Manage conference faculty members and their session assignments</CardDescription>
            </div>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Add Faculty
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
                placeholder="Search faculty by name, email, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Faculty Table */}
      <Card>
        <CardHeader>
          <CardTitle>Faculty List ({filteredFaculty.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Faculty</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Sessions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFaculty.map((faculty) => (
                <TableRow key={faculty.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={faculty.photo || "/placeholder.svg"} alt={faculty.name} />
                        <AvatarFallback>
                          {faculty.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{faculty.name}</p>
                        <p className="text-sm text-gray-500">{faculty.city}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1 text-sm">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span>{faculty.email}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span>{faculty.mobile}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-sm">{faculty.institution}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Total: {faculty.totalSessions}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>{faculty.confirmedSessions}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3 text-yellow-500" />
                          <span>{faculty.pendingSessions}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <XCircle className="w-3 h-3 text-red-500" />
                          <span>{faculty.declinedSessions}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={getStatusColor(
                        faculty.confirmedSessions,
                        faculty.pendingSessions,
                        faculty.declinedSessions,
                      )}
                    >
                      {getStatusText(faculty.confirmedSessions, faculty.pendingSessions, faculty.declinedSessions)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-500">{new Date(faculty.lastLogin).toLocaleDateString()}</span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedFaculty(faculty)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Faculty
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove Faculty
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

      {/* Faculty Details Dialog */}
      <Dialog open={!!selectedFaculty} onOpenChange={() => setSelectedFaculty(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Faculty Details</DialogTitle>
            <DialogDescription>Complete information about the faculty member</DialogDescription>
          </DialogHeader>
          {selectedFaculty && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedFaculty.photo || "/placeholder.svg"} alt={selectedFaculty.name} />
                  <AvatarFallback className="text-lg">
                    {selectedFaculty.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedFaculty.name}</h3>
                  <p className="text-gray-600">{selectedFaculty.institution}</p>
                  <p className="text-sm text-gray-500">{selectedFaculty.city}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{selectedFaculty.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{selectedFaculty.mobile}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Session Statistics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Sessions:</span>
                      <span className="font-medium">{selectedFaculty.totalSessions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-green-600">Confirmed:</span>
                      <span className="font-medium">{selectedFaculty.confirmedSessions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-yellow-600">Pending:</span>
                      <span className="font-medium">{selectedFaculty.pendingSessions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-red-600">Declined:</span>
                      <span className="font-medium">{selectedFaculty.declinedSessions}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Faculty
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
