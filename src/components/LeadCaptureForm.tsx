'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';

interface LeadCaptureFormProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function LeadCaptureForm({ 
  title = "Stay Updated", 
  description = "Get the latest insights on carbon markets and climate technology delivered to your inbox.",
  className = ""
}: LeadCaptureFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement actual form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  if (isSubmitted) {
    return (
      <div className={`bg-emerald-50 rounded-2xl p-8 text-center ${className}`}>
        <CheckCircle className="size-12 text-emerald-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Thank you for subscribing!</h3>
        <p className="text-gray-600">We'll send you the latest updates soon.</p>
      </div>
    );
  }

  return (
    <div className={`bg-emerald-50 rounded-2xl p-8 text-center ${className}`}>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Send className="size-4" />
              Subscribe
            </>
          )}
        </button>
      </form>
      
      <p className="text-xs text-gray-500 mt-4">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
}
