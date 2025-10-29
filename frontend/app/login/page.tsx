"use client"
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';

function useAutoFocus() {
  const ref = useRef<HTMLInputElement>(null); 

  useEffect(() => {
    ref.current?.focus(); 
  }, []);

  return ref;
}

const Input = ({
  className,
  type,
  ref,
  ...props 
}: React.InputHTMLAttributes<HTMLInputElement> & {
  ref?: React.Ref<HTMLInputElement>;
}) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn("flex h-10 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm transition-colors duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50", className)}
      {...props}
    />
  );
};

const Login = () => {
  const autoFocusRef = useAutoFocus()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate an API call delay
    setTimeout(() => {
      console.log('Form Submitted!');
      console.log('Email:', email);
      console.log('Password:', password.replace(/./g, '*')); // Mask password in console for safety

      // Reset state and submission status
      setIsSubmitting(false);
      setEmail('');
      setPassword('');

      // Changed alert to console.log as per environment guidelines
      console.log('Login data logged to console! (Simulated submission)');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl p-6 md:p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Log In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <Input
              ref={autoFocusRef}
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email Address"
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              aria-label="Password"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent 
                       rounded-lg shadow-md text-base font-medium text-white 
                       bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 
                       focus:ring-blue-500/50 transition-all duration-150 transform hover:scale-[1.01]
                       disabled:bg-blue-400 disabled:cursor-wait"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;