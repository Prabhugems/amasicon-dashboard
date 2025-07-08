export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full mx-auto flex items-center justify-center">
          <span className="text-white font-bold text-2xl">✓</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AMASICON 2025</h1>
          <p className="text-xl text-gray-600 mb-4">Faculty Dashboard - Deployment Test</p>
          <p className="text-green-600 font-medium">✅ Custom code deployed successfully!</p>
        </div>
        <div className="space-y-2">
          <a href="/" className="block text-blue-600 hover:underline">
            ← Back to Main Dashboard
          </a>
          <a href="/airtable" className="block text-green-600 hover:underline">
            🔗 Live Airtable Integration
          </a>
          <a href="/admin" className="block text-purple-600 hover:underline">
            👨‍💼 Admin Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}
