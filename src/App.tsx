import { useState } from 'react';
import { ApplicantForm } from './components/ApplicantForm';
import { HRDashboard } from './components/HRDashboard';
import { Users, Briefcase } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'applicant' | 'hr'>('applicant');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-gray-900">AI-Powered Interview System</h1>
                <p className="text-sm text-gray-500">NextGen Conversational Agents</p>
              </div>
            </div>
            
            {/* View Switcher */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveView('applicant')}
                className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                  activeView === 'applicant'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Users className="w-4 h-4" />
                Applicant
              </button>
              <button
                onClick={() => setActiveView('hr')}
                className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                  activeView === 'hr'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                HR Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'applicant' ? <ApplicantForm /> : <HRDashboard />}
      </main>

      {/* Footer Note */}
      <footer className="fixed bottom-0 left-0 right-0 bg-blue-50 border-t border-blue-100 py-2">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-blue-800">
          <span className="inline-flex items-center gap-2">
            Powered by <strong>Agora.io</strong> RTC & RTM • AWS Cloud Club Hackathon 2025
          </span>
        </div>
      </footer>
    </div>
  );
}
