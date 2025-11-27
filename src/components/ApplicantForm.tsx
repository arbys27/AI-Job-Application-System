import { useState } from 'react';
import { Upload, FileText, Phone, Mail, User, Briefcase, X, Send, Loader2 } from 'lucide-react';

interface FormData {
  applicantId: string;
  name: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  department: string;
  resume: File | null;
  coverLetter: string;
  workingSetup: 'onsite' | 'remote' | 'hybrid' | '';
  agreedToTerms: boolean;
}

export function ApplicantForm() {
  const [formData, setFormData] = useState<FormData>({
    applicantId: `APP-${Date.now()}`,
    name: '',
    email: '',
    phoneCountryCode: '+63',
    phoneNumber: '',
    department: '',
    resume: null,
    coverLetter: '',
    workingSetup: '',
    agreedToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAICallSimulation, setShowAICallSimulation] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, resume: file }));
  };

  const handleClear = () => {
    setFormData({
      applicantId: `APP-${Date.now()}`,
      name: '',
      email: '',
      phoneCountryCode: '+63',
      phoneNumber: '',
      department: '',
      resume: null,
      coverLetter: '',
      workingSetup: '',
      agreedToTerms: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.phoneNumber || 
        !formData.department || !formData.resume || !formData.workingSetup || 
        !formData.agreedToTerms) {
      alert('Please fill in all required fields and agree to terms and conditions.');
      return;
    }

    setIsSubmitting(true);

    // Prepare JSON output for backend
    const applicationData = {
      applicantId: formData.applicantId,
      name: formData.name,
      email: formData.email,
      phone: `${formData.phoneCountryCode}${formData.phoneNumber}`,
      department: formData.department,
      resumeFileName: formData.resume.name,
      coverLetter: formData.coverLetter,
      workingSetup: formData.workingSetup,
      submittedAt: new Date().toISOString(),
      status: 'pending_ai_interview',
    };

    console.log('📤 Application Data (JSON for Backend):', JSON.stringify(applicationData, null, 2));

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setShowAICallSimulation(true);
      
      // Simulate AI agent call after 2 seconds
      setTimeout(() => {
        alert('✅ Application submitted successfully! Our AI agent will call you shortly for a pre-interview screening.');
        setShowAICallSimulation(false);
        handleClear();
      }, 3000);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Job Description Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-gray-900 mb-2">Senior Software Engineer</h2>
            <p className="text-gray-600 mb-4">Tech Solutions Inc. • Full-time • Remote/Hybrid</p>
            <p className="text-gray-700 mb-4">
              We're looking for an experienced software engineer to join our growing team. 
              You'll work on cutting-edge cloud solutions using AWS services and AI technologies.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">React</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">AWS</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Node.js</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">AI/ML</span>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <FileText className="w-6 h-6 text-blue-600" />
          <h2 className="text-gray-900">Job Application Form</h2>
        </div>

        <div className="space-y-6">
          {/* Applicant ID (Auto-generated) */}
          <div>
            <label className="block text-gray-700 mb-2">
              Applicant ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="applicantId"
              value={formData.applicantId}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
            <p className="text-sm text-gray-500 mt-1">Auto-generated unique identifier</p>
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john.doe@example.com"
                className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              <div className="relative w-32">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  name="phoneCountryCode"
                  value={formData.phoneCountryCode}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="+63">🇵🇭 +63</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+65">🇸🇬 +65</option>
                  <option value="+86">🇨🇳 +86</option>
                </select>
              </div>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="9123456789"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">AI agent will call this number for pre-interview</p>
          </div>

          {/* Department */}
          <div>
            <label className="block text-gray-700 mb-2">
              Department/Position <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                required
              >
                <option value="">Select a department</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Data Science">Data Science</option>
                <option value="DevOps">DevOps</option>
                <option value="Product Management">Product Management</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-gray-700 mb-2">
              Resume/CV <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="file"
                id="resume"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
                required
              />
              <label
                htmlFor="resume"
                className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                {formData.resume ? (
                  <div className="text-center">
                    <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-700">{formData.resume.name}</p>
                    <p className="text-sm text-gray-500 mt-1">Click to change file</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-700">Click to upload resume</p>
                    <p className="text-sm text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-gray-700 mb-2">
              Cover Letter <span className="text-gray-500">(Optional)</span>
            </label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              placeholder="Tell us why you're a great fit for this position..."
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Working Setup */}
          <div>
            <label className="block text-gray-700 mb-2">
              Preferred Working Setup <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              <label className={`flex items-center justify-center px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
                formData.workingSetup === 'onsite'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-blue-300'
              }`}>
                <input
                  type="radio"
                  name="workingSetup"
                  value="onsite"
                  checked={formData.workingSetup === 'onsite'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <span>Onsite</span>
              </label>
              <label className={`flex items-center justify-center px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
                formData.workingSetup === 'remote'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-blue-300'
              }`}>
                <input
                  type="radio"
                  name="workingSetup"
                  value="remote"
                  checked={formData.workingSetup === 'remote'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <span>Remote</span>
              </label>
              <label className={`flex items-center justify-center px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
                formData.workingSetup === 'hybrid'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-blue-300'
              }`}>
                <input
                  type="radio"
                  name="workingSetup"
                  value="hybrid"
                  checked={formData.workingSetup === 'hybrid'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <span>Hybrid</span>
              </label>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                required
              />
              <span className="text-sm text-gray-700">
                I agree to the <strong>Terms and Conditions</strong> and <strong>Data Privacy Policy</strong>. 
                I consent to the collection and processing of my personal data for recruitment purposes, 
                including AI-powered interview screening via Agora.io voice calls.
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Application
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={isSubmitting}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <X className="w-5 h-5" />
              Clear
            </button>
          </div>
        </div>
      </form>

      {/* AI Call Simulation Modal */}
      {showAICallSimulation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
            <h3 className="text-gray-900 mb-2">AI Agent Calling...</h3>
            <p className="text-gray-600 mb-4">
              Our AI-powered interview agent is initiating a call to {formData.phoneCountryCode}{formData.phoneNumber}
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
              <p className="mb-2"><strong>Agora.io RTC Integration Point:</strong></p>
              <p className="text-xs text-gray-600">
                // Initialize Agora RTC client<br/>
                // Join voice channel<br/>
                // Enable AI voice agent<br/>
                // Conduct pre-interview screening
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
