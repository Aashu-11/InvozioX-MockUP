import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Upload, Check, Loader2, Shield, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

const steps = [
  {
    title: 'Basic Information',
    fields: ['name', 'email', 'phone', 'password'],
  },
  {
    title: 'Business Details',
    fields: ['businessName', 'businessType', 'address'],
  },
  {
    title: 'GST Verification',
    fields: ['gstin'],
  },
  {
    title: 'Document Upload',
    fields: ['documents'],
  },
  {
    title: 'Summary Review',
    fields: [],
  },
];

const Register = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    password: string;
    businessName: string;
    businessType: string;
    address: string;
    gstin: string;
    documents: File[];
  }>({
    name: '',
    email: '',
    phone: '',
    password: '',
    businessName: '',
    businessType: '',
    address: '',
    gstin: '',
    documents: [],
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        documents: [...prev.documents, ...Array.from(e.target.files!)],
      }));
    }
  };

  const verifyGSTIN = async () => {
    setIsVerifying(true);
    setVerificationStatus('loading');
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setVerificationStatus('success');
    setIsVerifying(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Navigate to Dashboard on completion
      setRegistrationSuccess(true);
      setTimeout(() => {
        login();
        navigate('/dashboard');
      }, 3000);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRegister = () => {
    // ...existing registration logic...
    setRegistrationSuccess(true);
    setTimeout(() => {
      login(); // Set authentication state to true
      navigate('/dashboard');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#121212] flex">
      {/* Left Panel - Progress */}
      <div className="hidden lg:flex w-1/3 bg-[#1E1E1E] flex-col p-8 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00FFFF]/5 to-[#FF00FF]/5" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#00FFFF0A,#FF00FF0A)] animate-pulse" />
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white mb-12 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          <div className="flex-1">
            {steps.map((step, index) => (
              <div key={index} className="relative mb-8">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                      index <= currentStep
                        ? 'bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] text-white scale-110'
                        : 'bg-[#2A2A2A] text-gray-400'
                    }`}
                  >
                    {index < currentStep ? (
                      <Check className="w-5 h-5 animate-in fade-in duration-300" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div>
                    <h3
                      className={`font-medium transition-colors duration-300 ${
                        index <= currentStep ? 'text-white' : 'text-gray-400'
                      }`}
                    >
                      {step.title}
                    </h3>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute left-4 ml-[3px] h-12 w-[2px] transition-all duration-500 ${
                      index < currentStep
                        ? 'bg-gradient-to-b from-[#00FFFF] to-[#FF00FF]'
                        : 'bg-[#2A2A2A]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Shield className="w-5 h-5 text-[#00FFFF]" />
              <span>Bank-grade security</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Lock className="w-5 h-5 text-[#FF00FF]" />
              <span>End-to-end encryption</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] text-transparent bg-clip-text mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-400">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>

          <div className="space-y-6">
            {currentStep === 0 && (
              <div className="space-y-6 animate-in slide-in-from-right duration-500">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-[#1E1E1E] border border-[#2A2A2A] text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-[#1E1E1E] border border-[#2A2A2A] text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-[#1E1E1E] border border-[#2A2A2A] text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-[#1E1E1E] border border-[#2A2A2A] text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right duration-500">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-[#1E1E1E] border border-[#2A2A2A] text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
                    placeholder="Acme Inc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Business Type
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-[#1E1E1E] border border-[#2A2A2A] text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
                  >
                    <option value="">Select business type</option>
                    <option value="sole_proprietorship">Sole Proprietorship</option>
                    <option value="partnership">Partnership</option>
                    <option value="llp">LLP</option>
                    <option value="private_limited">Private Limited</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Business Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg bg-[#1E1E1E] border border-[#2A2A2A] text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
                    placeholder="Enter your business address"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="animate-in slide-in-from-right duration-500">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    GSTIN
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="gstin"
                      value={formData.gstin}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-2 rounded-lg bg-[#1E1E1E] border border-[#2A2A2A] text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
                      placeholder="Enter your GSTIN"
                    />
                    <Button
                      onClick={verifyGSTIN}
                      disabled={isVerifying || !formData.gstin}
                      className="w-32"
                    >
                      {isVerifying ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : verificationStatus === 'success' ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        'Verify'
                      )}
                    </Button>
                  </div>
                  {verificationStatus === 'success' && (
                    <p className="mt-2 text-sm text-[#00FFFF] flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      GSTIN verified successfully
                    </p>
                  )}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="animate-in slide-in-from-right duration-500">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Upload Documents
                  </label>
                  <div className="border-2 border-dashed border-[#2A2A2A] rounded-lg p-8 text-center hover:border-[#00FFFF] transition-all duration-200">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="w-12 h-12 text-gray-400 mb-4" />
                      <p className="text-gray-400 mb-2">
                        Drag and drop your documents here, or click to browse
                      </p>
                      <p className="text-sm text-gray-500">
                        Supported formats: PDF, JPG, PNG (Max 10MB each)
                      </p>
                    </label>
                  </div>
                  {formData.documents.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.documents.map((doc: File, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg bg-[#1E1E1E] animate-in slide-in-from-bottom"
                        >
                          <span className="text-sm text-gray-400">{doc.name}</span>
                          <Check className="w-5 h-5 text-[#00FFFF]" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="animate-in slide-in-from-right duration-500">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-[#2A2A2A]">
                    <h4 className="font-medium mb-2 text-white">Basic Information</h4>
                    <p className="text-sm text-white">Name: {formData.name}</p>
                    <p className="text-sm text-white">Email: {formData.email}</p>
                    <p className="text-sm text-white">Phone: {formData.phone}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-[#2A2A2A]">
                    <h4 className="font-medium mb-2 text-white">Business Details</h4>
                    <p className="text-sm text-white">Business Name: {formData.businessName}</p>
                    <p className="text-sm text-white">Business Type: {formData.businessType}</p>
                    <p className="text-sm text-white">Address: {formData.address}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-[#2A2A2A]">
                    <h4 className="font-medium mb-2 text-white">GST Verification</h4>
                    <p className="text-sm text-white">GSTIN: {formData.gstin}</p>
                    {verificationStatus === 'success' && (
                      <p className="text-sm text-[#00FFFF] flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        GSTIN verified successfully
                      </p>
                    )}
                  </div>
                  <div className="p-4 rounded-lg bg-[#2A2A2A]">
                    <h4 className="font-medium mb-2 text-white">Uploaded Documents</h4>
                    {formData.documents.length > 0 ? (
                      formData.documents.map((doc: File, index) => (
                        <p key={index} className="text-sm text-white">{doc.name}</p>
                      ))
                    ) : (
                      <p className="text-sm text-white">No documents uploaded</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="secondary"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back
            </Button>
            <Button onClick={currentStep === steps.length - 1 ? handleRegister : handleNext} className="group">
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;