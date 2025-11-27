import { useState } from 'react';
import { Calendar, Phone, CheckCircle, XCircle, Eye, Filter, Search } from 'lucide-react';
import { ApplicantReviewModal } from './ApplicantReviewModal';

interface Applicant {
  applicantId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  status: 'pending_review' | 'scheduled' | 'passed' | 'rejected';
  aiInterviewScore?: number;
  aiInterviewStatus?: 'passed' | 'failed';
  submittedAt: string;
  resumeFileName: string;
  coverLetter: string;
  workingSetup: string;
}

// Mock data for demonstration
const MOCK_APPLICANTS: Applicant[] = [
  {
    applicantId: 'APP-1732704001',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '+639123456789',
    department: 'Software Engineering',
    status: 'pending_review',
    aiInterviewScore: 85,
    aiInterviewStatus: 'passed',
    submittedAt: '2025-11-27T09:30:00Z',
    resumeFileName: 'maria_santos_resume.pdf',
    coverLetter: 'I am excited to apply for the Software Engineering position...',
    workingSetup: 'hybrid',
  },
  {
    applicantId: 'APP-1732704102',
    name: 'Juan Dela Cruz',
    email: 'juan.delacruz@email.com',
    phone: '+639987654321',
    department: 'Data Science',
    status: 'pending_review',
    aiInterviewScore: 92,
    aiInterviewStatus: 'passed',
    submittedAt: '2025-11-27T10:15:00Z',
    resumeFileName: 'juan_resume.pdf',
    coverLetter: 'With 5 years of experience in data science and machine learning...',
    workingSetup: 'remote',
  },
  {
    applicantId: 'APP-1732704203',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+639555123456',
    department: 'UI/UX Design',
    status: 'pending_review',
    aiInterviewScore: 78,
    aiInterviewStatus: 'passed',
    submittedAt: '2025-11-27T11:00:00Z',
    resumeFileName: 'sarah_portfolio.pdf',
    coverLetter: 'As a passionate UI/UX designer with expertise in user-centered design...',
    workingSetup: 'onsite',
  },
  {
    applicantId: 'APP-1732704304',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+639444567890',
    department: 'DevOps',
    status: 'scheduled',
    aiInterviewScore: 88,
    aiInterviewStatus: 'passed',
    submittedAt: '2025-11-26T14:30:00Z',
    resumeFileName: 'michael_chen_cv.pdf',
    coverLetter: 'I bring extensive experience in cloud infrastructure and automation...',
    workingSetup: 'remote',
  },
];

const JOBS = [
  { id: 'job-1', title: 'Software Engineering', count: 2 },
  { id: 'job-2', title: 'Data Science', count: 1 },
  { id: 'job-3', title: 'UI/UX Design', count: 1 },
  { id: 'job-4', title: 'DevOps', count: 1 },
  { id: 'job-5', title: 'Product Management', count: 0 },
];

export function HRDashboard() {
  const [applicants, setApplicants] = useState<Applicant[]>(MOCK_APPLICANTS);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedJob, setSelectedJob] = useState<string>('all');

  const handleScheduleInterview = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
  };

  const handleCloseModal = () => {
    setSelectedApplicant(null);
  };

  const handleFinalDecision = (applicantId: string, decision: 'passed' | 'rejected') => {
    setApplicants(prev =>
      prev.map(app =>
        app.applicantId === applicantId
          ? { ...app, status: decision }
          : app
      )
    );
    
    const applicant = applicants.find(app => app.applicantId === applicantId);
    
    // Simulate email notification
    console.log('📧 Email Notification:', {
      to: applicant?.email,
      decision: decision,
      message: decision === 'passed' 
        ? 'Congratulations! You have been selected for the position.'
        : 'Thank you for your application. Unfortunately, we have decided to move forward with other candidates.',
    });
    
    alert(`✅ Decision recorded! Email notification sent to ${applicant?.email}`);
    setSelectedApplicant(null);
  };

  // Filter applicants
  const filteredApplicants = applicants.filter(app => {
    const matchesSearch = 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicantId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesJob = selectedJob === 'all' || app.department === selectedJob;
    
    return matchesSearch && matchesStatus && matchesJob;
  });

  const pendingReviewCount = applicants.filter(app => app.status === 'pending_review').length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl text-gray-900 mt-1">{pendingReviewCount}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Scheduled</p>
              <p className="text-2xl text-gray-900 mt-1">
                {applicants.filter(app => app.status === 'scheduled').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Passed</p>
              <p className="text-2xl text-gray-900 mt-1">
                {applicants.filter(app => app.status === 'passed').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl text-gray-900 mt-1">
                {applicants.filter(app => app.status === 'rejected').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Job Categories Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-gray-900 mb-4">Job Positions</h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedJob('all')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedJob === 'all'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>All Positions</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                    {applicants.length}
                  </span>
                </div>
              </button>
              {JOBS.map(job => (
                <button
                  key={job.id}
                  onClick={() => setSelectedJob(job.title)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedJob === job.title
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{job.title}</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                      {job.count}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Applicants Table */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Filters and Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-11 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="all">All Status</option>
                    <option value="pending_review">Pending Review</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="passed">Passed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                      Applicant ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                      AI Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplicants.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                        No applicants found
                      </td>
                    </tr>
                  ) : (
                    filteredApplicants.map((applicant) => (
                      <tr key={applicant.applicantId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {applicant.applicantId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {applicant.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {applicant.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {applicant.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {applicant.aiInterviewScore && (
                            <div className="flex items-center gap-2">
                              <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${
                                    applicant.aiInterviewScore >= 80
                                      ? 'bg-green-500'
                                      : applicant.aiInterviewScore >= 60
                                      ? 'bg-yellow-500'
                                      : 'bg-red-500'
                                  }`}
                                  style={{ width: `${applicant.aiInterviewScore}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-700">
                                {applicant.aiInterviewScore}
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-sm rounded-full ${
                              applicant.status === 'pending_review'
                                ? 'bg-yellow-100 text-yellow-800'
                                : applicant.status === 'scheduled'
                                ? 'bg-blue-100 text-blue-800'
                                : applicant.status === 'passed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {applicant.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleScheduleInterview(applicant)}
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                          >
                            <Calendar className="w-4 h-4" />
                            Review
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Applicant Review Modal */}
      {selectedApplicant && (
        <ApplicantReviewModal
          applicant={selectedApplicant}
          onClose={handleCloseModal}
          onDecision={handleFinalDecision}
        />
      )}
    </div>
  );
}
