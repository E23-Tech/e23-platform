import React from 'react';
import type { Route } from './+types/login';
import { LoginProvider } from '../components/LoginContext';
import { LoginForm } from '../components/LoginForm';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "E23 - Login" },
    { name: "description", content: "Login to your E23 account" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.VALUE_FROM_NETLIFY };
}

export default function Login({}: Route.ComponentProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#CFE3FF] px-4 py-6 sm:px-6 md:px-8">
      <main className="relative w-full max-w-md">
        {/* Background Rectangle - Positioned behind the white card */}
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
        
        {/* Login Card */}
        <section 
          className="relative z-10 bg-white rounded-3xl shadow-xl p-6 sm:p-8"
          aria-labelledby="login-heading"
        >
          <h1 
            id="login-heading" 
            className="text-2xl sm:text-3xl font-semibold text-[#17197B] mb-6 sm:mb-8 font-open-sans tracking-tight"
          >
            Login to your account
          </h1>
          
          <LoginProvider>
            <LoginForm />
          </LoginProvider>
        </section>
      </main>
    </div>
  );
} 