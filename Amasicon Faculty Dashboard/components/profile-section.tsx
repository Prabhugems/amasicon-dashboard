"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Mail, Phone, MapPin, Edit, Save, X, Camera, Award, Building, GraduationCap } from "lucide-react"

interface FacultyData {
  name: string
  email: string
  city: string
  mobile: string
  photo: string
  sessions: any[]
}

interface ProfileSectionProps {
  facultyData: FacultyData
}

export function ProfileSection({ facultyData }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState({
    name: facultyData.name,
    mobile: facultyData.mobile,
    city: facultyData.city,
    bio: "Experienced surgeon specializing in minimal access surgery with over 15 years of practice.",
    institution: "All Institute of Medical Sciences",
    designation: "Professor & Head of Department",
    specialization: "Laparoscopic Surgery, Pediatric Surgery",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      setIsEditing(false)

      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 1000)
  }

  const handleCancel = () => {
    setEditedData({
      name: facultyData.name,
      mobile: facultyData.mobile,
      city: facultyData.city,
      bio: "Experienced surgeon specializing in minimal access surgery with over 15 years of practice.",
      institution: "All Institute of Medical Sciences",
      designation: "Professor & Head of Department",
      specialization: "Laparoscopic Surgery, Pediatric Surgery",
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Faculty Profile</CardTitle>
          <CardDescription>Manage your profile information and conference details</CardDescription>
        </CardHeader>
      </Card>

      {saveSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <Save className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">Your profile has been updated successfully!</AlertDescription>
        </Alert>
      )}

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-500" />
              <span>Personal Information</span>
            </CardTitle>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button onClick={handleSave} size="sm" disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save"}
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm" disabled={isSaving}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Photo */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src={facultyData.photo || "/placeholder.svg"} alt={facultyData.name} />
                <AvatarFallback className="text-2xl">
                  {facultyData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
              )}
            </div>

            {/* Basic Information */}
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editedData.name}
                      onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{editedData.name}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{facultyData.email}</span>
                    <Badge variant="secondary" className="text-xs">
                      Verified
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  {isEditing ? (
                    <Input
                      id="mobile"
                      value={editedData.mobile}
                      onChange={(e) => setEditedData({ ...editedData, mobile: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{editedData.mobile}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City/State</Label>
                  {isEditing ? (
                    <Input
                      id="city"
                      value={editedData.city}
                      onChange={(e) => setEditedData({ ...editedData, city: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{editedData.city}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-green-500" />
            <span>Professional Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="institution">Institution</Label>
              {isEditing ? (
                <Input
                  id="institution"
                  value={editedData.institution}
                  onChange={(e) => setEditedData({ ...editedData, institution: e.target.value })}
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-gray-500" />
                  <span>{editedData.institution}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              {isEditing ? (
                <Input
                  id="designation"
                  value={editedData.designation}
                  onChange={(e) => setEditedData({ ...editedData, designation: e.target.value })}
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-gray-500" />
                  <span>{editedData.designation}</span>
                </div>
              )}
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              {isEditing ? (
                <Input
                  id="specialization"
                  value={editedData.specialization}
                  onChange={(e) => setEditedData({ ...editedData, specialization: e.target.value })}
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {editedData.specialization.split(", ").map((spec, index) => (
                    <Badge key={index} variant="outline">
                      {spec}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              {isEditing ? (
                <Textarea
                  id="bio"
                  value={editedData.bio}
                  onChange={(e) => setEditedData({ ...editedData, bio: e.target.value })}
                  rows={4}
                  placeholder="Brief professional biography..."
                />
              ) : (
                <p className="text-gray-700">{editedData.bio}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conference Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Conference Participation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{facultyData.sessions.length}</div>
              <div className="text-sm text-blue-800">Total Sessions</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {facultyData.sessions.filter((s) => s.role === "Speaker").length}
              </div>
              <div className="text-sm text-green-800">Speaking Sessions</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {facultyData.sessions.filter((s) => s.role === "Judge").length}
              </div>
              <div className="text-sm text-purple-800">Judging Sessions</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">4</div>
              <div className="text-sm text-orange-800">Conference Days</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Preferences */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle>Important Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Email address cannot be changed as it's linked to your conference registration</li>
            <li>• Profile changes will be reflected in the conference program and materials</li>
            <li>• For major changes to your professional details, please contact the organizing committee</li>
            <li>• Your profile information will be used for conference badges and networking</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
