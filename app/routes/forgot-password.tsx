import React from 'react';
import type { Route } from './+types/forgot-password';
import { ForgotPasswordProvider } from '../components/ForgotPasswordContext';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "E23 - Forgot Password" },
    { name: "description", content: "Reset your E23 account password" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.VALUE_FROM_NETLIFY };
}

export default function ForgotPassword({}: Route.ComponentProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#CFE3FF] px-4 py-6 sm:px-6 md:px-8">
      <main className="relative w-full max-w-md">
        {/* Background Rectangle */}
        <div 
          className="absolute top-28 left-0 right-0 bottom-0 bg-[#2857F7] rounded-3xl shadow-[0_10px_25px_5px_rgba(0,0,0,0.25)] z-0"
          aria-hidden="true"
        ></div>
        
        {/* Logo */}
        <div className="relative z-10 flex justify-center mb-10">
          <img 
            src="/images/logo.png" 
            alt="E23 Logo" 
            className="h-16 w-auto sm:h-20 drop-shadow-lg"
          />
        </div>
        
        {/* Forgot Password Card */}
        <section 
          className="relative z-10 bg-white rounded-3xl shadow-xl p-6 sm:p-8"
          aria-labelledby="forgot-password-heading"
        >
          <h1 
            id="forgot-password-heading" 
            className="text-2xl sm:text-3xl font-semibold text-[#17197B] mb-6 sm:mb-8 font-open-sans tracking-tight"
          >
            Forgot Password
          </h1>
          
          <ForgotPasswordProvider>
            <ForgotPasswordForm />
          </ForgotPasswordProvider>
        </section>
      </main>
    </div>
  );
} 