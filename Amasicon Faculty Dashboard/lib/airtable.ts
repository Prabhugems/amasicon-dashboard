// Airtable Integration
const AIRTABLE_API_KEY =
  process.env.NEXT_PUBLIC_AIRTABLE_API_KEY ||
  "pat2HkOj7kREHVlec.efdd6d8ab4652102e5a0ebcc9a77a002a32ae9f3ab153b1666e22ff67948949e"
const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || "appXGGABBkN8y4lwq"

const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`

const headers = {
  Authorization: `Bearer ${AIRTABLE_API_KEY}`,
  "Content-Type": "application/json",
}

// Faculty Interface
export interface AirtableFaculty {
  id: string
  fields: {
    Name: string
    Email: string
    Mobile?: string
    City?: string
    Institution?: string
    Status?: string
    "Last Login"?: string
  }
}

// Session Interface
export interface AirtableSession {
  id: string
  fields: {
    "Session ID": string
    Date?: string
    Time?: string
    Hall?: string
    Topic?: string
    Faculty?: string[]
    Role?: string
    Status?: string
  }
}

// Change Request Interface
export interface AirtableChangeRequest {
  id: string
  fields: {
    Faculty: string[]
    Type: string
    Description: string
    Status: string
    "Submitted At": string
  }
}

// Fetch Faculty from Airtable
export async function fetchFaculty(): Promise<AirtableFaculty[]> {
  try {
    const response = await fetch(`${AIRTABLE_API_URL}/Faculty`, {
      headers,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.records || []
  } catch (error) {
    console.error("Error fetching faculty:", error)
    return []
  }
}

// Fetch Sessions from Airtable
export async function fetchSessions(): Promise<AirtableSession[]> {
  try {
    const response = await fetch(`${AIRTABLE_API_URL}/Sessions`, {
      headers,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.records || []
  } catch (error) {
    console.error("Error fetching sessions:", error)
    return []
  }
}

// Fetch Change Requests from Airtable
export async function fetchChangeRequests(): Promise<AirtableChangeRequest[]> {
  try {
    const response = await fetch(`${AIRTABLE_API_URL}/Change%20Requests`, {
      headers,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.records || []
  } catch (error) {
    console.error("Error fetching change requests:", error)
    return []
  }
}

// Update Session Status
export async function updateSessionStatus(recordId: string, status: string): Promise<boolean> {
  try {
    const response = await fetch(`${AIRTABLE_API_URL}/Sessions/${recordId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        fields: {
          Status: status,
        },
      }),
    })

    return response.ok
  } catch (error) {
    console.error("Error updating session status:", error)
    return false
  }
}
