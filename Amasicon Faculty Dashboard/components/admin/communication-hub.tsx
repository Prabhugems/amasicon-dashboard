"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Mail, MessageSquare, CheckCircle, Clock, Eye } from "lucide-react"

interface Message {
  id: string
  subject: string
  content: string
  recipients: string[]
  sentAt: string
  status: "sent" | "draft" | "scheduled"
  readCount: number
  totalRecipients: number
}

export function CommunicationHub() {
  const [messageType, setMessageType] = useState("announcement")
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([])
  const [isSending, setIsSending] = useState(false)

  // Mock message history
  const [messageHistory] = useState<Message[]>([
    {
      id: "1",
      subject: "Welcome to AMASICON 2025 - Important Updates",
      content: "Dear Faculty Members, Welcome to AMASICON 2025...",
      recipients: ["all"],
      sentAt: "2025-01-07T09:00:00Z",
      status: "sent",
      readCount: 142,
      totalRecipients: 156,
    },
    {
      id: "2",
      subject: "Session Confirmation Reminder",
      content: "This is a friendly reminder to confirm your assigned sessions...",
      recipients: ["pending"],
      sentAt: "2025-01-06T14:30:00Z",
      status: "sent",
      readCount: 45,
      totalRecipients: 67,
    },
    {
      id: "3",
      subject: "Technical Requirements Update",
      content: "Updates regarding AV equipment and technical setup...",
      recipients: ["speakers"],
      sentAt: "2025-01-05T11:15:00Z",
      status: "sent",
      readCount: 78,
      totalRecipients: 89,
    },
  ])

  const recipientGroups = [
    { id: "all", label: "All Faculty", count: 156 },
    { id: "confirmed", label: "Confirmed Sessions", count: 89 },
    { id: "pending", label: "Pending Confirmations", count: 67 },
    { id: "speakers", label: "Speakers Only", count: 89 },
    { id: "judges", label: "Judges Only", count: 67 },
    { id: "moderators", label: "Moderators Only", count: 28 },
  ]

  const handleSendMessage = async () => {
    setIsSending(true)

    // Simulate sending message
    setTimeout(() => {
      setIsSending(false)
      setSubject("")
      setContent("")
      setSelectedRecipients([])
      // In real app, would add to message history and show success
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <CheckCircle className="w-4 h-4" />
      case "draft":
        return <MessageSquare className="w-4 h-4" />
      case "scheduled":
        return <Clock className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Communication Hub</CardTitle>
          <CardDescription>Send announcements, reminders, and messages to faculty members</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="compose" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="compose">Compose Message</TabsTrigger>
          <TabsTrigger value="history">Message History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="w-5 h-5 text-blue-500" />
                <span>Compose New Message</span>
              </CardTitle>
              <CardDescription>Create and send messages to faculty members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="message-type">Message Type</Label>
                  <Select value={messageType} onValueChange={setMessageType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select message type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="announcement">General Announcement</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                      <SelectItem value="update">Program Update</SelectItem>
                      <SelectItem value="urgent">Urgent Notice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Recipients</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {recipientGroups.map((group) => (
                      <div key={group.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={group.id}
                          checked={selectedRecipients.includes(group.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedRecipients([...selectedRecipients, group.id])
                            } else {
                              setSelectedRecipients(selectedRecipients.filter((id) => id !== group.id))
                            }
                          }}
                        />
                        <Label htmlFor={group.id} className="text-sm">
                          {group.label} ({group.count})
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Enter message subject..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Message Content</Label>
                <Textarea
                  id="content"
                  placeholder="Type your message here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {selectedRecipients.length > 0 && (
                    <span>
                      Will be sent to{" "}
                      {selectedRecipients.reduce((total, id) => {
                        const group = recipientGroups.find((g) => g.id === id)
                        return total + (group?.count || 0)
                      }, 0)}{" "}
                      recipients
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">Save as Draft</Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!subject || !content || selectedRecipients.length === 0 || isSending}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSending ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-green-500" />
                <span>Message History</span>
              </CardTitle>
              <CardDescription>Previously sent messages and their delivery status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead>Read Rate</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messageHistory.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{message.subject}</p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">{message.content}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {message.recipients.map((recipient) => (
                            <Badge key={recipient} variant="outline" className="text-xs">
                              {recipientGroups.find((g) => g.id === recipient)?.label || recipient}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(message.status)}>
                          {getStatusIcon(message.status)}
                          <span className="ml-1 capitalize">{message.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-500">{new Date(message.sentAt).toLocaleDateString()}</span>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <span className="font-medium">{message.readCount}</span>
                          <span className="text-gray-500">/{message.totalRecipients}</span>
                          <div className="text-xs text-gray-500">
                            {Math.round((message.readCount / message.totalRecipients) * 100)}% read
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-purple-500" />
                <span>Message Templates</span>
              </CardTitle>
              <CardDescription>Pre-built templates for common communications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Session Confirmation Reminder</h4>
                  <p className="text-sm text-gray-600 mb-3">Remind faculty to confirm their assigned sessions</p>
                  <Button size="sm" variant="outline">
                    Use Template
                  </Button>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">Welcome Message</h4>
                  <p className="text-sm text-gray-600 mb-3">Welcome new faculty members to the conference</p>
                  <Button size="sm" variant="outline">
                    Use Template
                  </Button>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">Schedule Change Notice</h4>
                  <p className="text-sm text-gray-600 mb-3">Notify about changes in session timing or venue</p>
                  <Button size="sm" variant="outline">
                    Use Template
                  </Button>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">Technical Requirements</h4>
                  <p className="text-sm text-gray-600 mb-3">Information about AV setup and technical needs</p>
                  <Button size="sm" variant="outline">
                    Use Template
                  </Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
