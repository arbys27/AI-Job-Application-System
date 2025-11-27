import { X, Phone, CheckCircle, XCircle, FileText, Mail, MapPin, Calendar, Video } from 'lucide-react';
import { useState } from 'react';

interface Applicant {
  applicantId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  status: string;
  aiInterviewScore?: number;
  aiInterviewStatus?: 'passed' | 'failed';
  submittedAt: string;
  resumeFileName: string;
  coverLetter: string;
  workingSetup: string;
}

interface ApplicantReviewModalProps {
  applicant: Applicant;
  onClose: () => void;
  onDecision: (applicantId: string, decision: 'passed' | 'rejected') => void;
}

export function ApplicantReviewModal({ applicant, onClose, onDecision }: ApplicantReviewModalProps) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const handleStartCall = () => {
    setIsCallActive(true);
    
    // Simulate call timer
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    // Cleanup
    setTimeout(() => {
      clearInterval(interval);
    }, 60000);

    // Log Agora integration point
    console.log('🎙️ Agora.io RTC Integration: Initiating HR video/voice call', {
      applicantId: applicant.applicantId,
      hrPhone: 'HR-PHONE-NUMBER',
      applicantPhone: applicant.phone,
    });
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSchedule = () => {
    if (!scheduledDate || !scheduledTime) {
      alert('Please select both date and time for the interview.');
      return;
    }

    const scheduleData = {
      applicantId: applicant.applicantId,
      applicantName: applicant.name,
      applicantEmail: applicant.email,
      applicantPhone: applicant.phone,
      scheduledDateTime: `${scheduledDate}T${scheduledTime}`,
      department: applicant.department,
    };

    console.log('📅 Interview Scheduled (JSON for Backend):', JSON.stringify(scheduleData, null, 2));
    
    // Simulate RTM notification
    console.log('📨 Agora.io RTM Integration: Sending real-time notification', {
      to: applicant.applicantId,
      message: `Interview scheduled for ${scheduledDate} at ${scheduledTime}`,
    });

    alert(`✅ Interview scheduled successfully!\nDate: ${scheduledDate}\nTime: ${scheduledTime}\n\nNotification sent via Agora RTM.`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-gray-900">Applicant Review</h2>
            <p className="text-sm text-gray-600 mt-1">Review application and conduct final interview</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Applicant Info Card */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-gray-900 mb-1">{applicant.name}</h3>
                <p className="text-gray-600">{applicant.department}</p>
              </div>
              {applicant.aiInterviewStatus && (
                <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                  applicant.aiInterviewStatus === 'passed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {applicant.aiInterviewStatus === 'passed' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                  <span className="text-sm">AI Pre-Interview: {applicant.aiInterviewStatus}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-sm">{applicant.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-sm">{applicant.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-sm capitalize">{applicant.workingSetup}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-sm">
                  Applied: {new Date(applicant.submittedAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {applicant.aiInterviewScore && (
              <div className="mt-4 pt-4 border-t border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">AI Interview Score</span>
                  <span className="text-gray-900">{applicant.aiInterviewScore}/100</span>
                </div>
                <div className="w-full h-3 bg-white rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      applicant.aiInterviewScore >= 80
                        ? 'bg-green-500'
                        : applicant.aiInterviewScore >= 60
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${applicant.aiInterviewScore}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Resume and Cover Letter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <h4 className="text-gray-900">Resume</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">{applicant.resumeFileName}</p>
              <button className="w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                View Resume
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-purple-600" />
                <h4 className="text-gray-900">Cover Letter</h4>
              </div>
              <p className="text-sm text-gray-600 line-clamp-3">{applicant.coverLetter}</p>
            </div>
          </div>

          {/* Agora Call Interface */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Video className="w-5 h-5 text-blue-600" />
              <h4 className="text-gray-900">Conduct HR Interview</h4>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                Agora.io RTC
              </span>
            </div>

            {!isCallActive ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-10 h-10 text-blue-600" />
                </div>
                <p className="text-gray-700 mb-4">Start a voice/video call with the applicant</p>
                <button
                  onClick={handleStartCall}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Start Call via Agora RTC
                </button>
                <p className="text-xs text-gray-500 mt-3">
                  This will initiate a real-time call to {applicant.phone}
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Phone className="w-10 h-10 text-green-600" />
                </div>
                <p className="text-gray-900 mb-2">Call in progress with {applicant.name}</p>
                <p className="text-2xl text-gray-700 mb-4">{formatDuration(callDuration)}</p>
                <button
                  onClick={handleEndCall}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors inline-flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  End Call
                </button>
              </div>
            )}
          </div>

          {/* Schedule Interview */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-purple-600" />
              <h4 className="text-gray-900">Schedule Follow-up Interview</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Interview Date</label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Interview Time</label>
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={handleSchedule}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Schedule & Notify via Agora RTM
            </button>
          </div>

          {/* Final Decision */}
          <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
            <h4 className="text-gray-900 mb-4">Final Hiring Decision</h4>
            <p className="text-sm text-gray-600 mb-4">
              After conducting the interview, make your final decision. The applicant will be notified via email automatically.
            </p>
            
            <div className="flex gap-4">
              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to PASS ${applicant.name}?`)) {
                    onDecision(applicant.applicantId, 'passed');
                  }
                }}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Pass & Hire
              </button>
              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to REJECT ${applicant.name}?`)) {
                    onDecision(applicant.applicantId, 'rejected');
                  }
                }}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <XCircle className="w-5 h-5" />
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
