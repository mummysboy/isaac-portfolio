// app/personal/page.tsx
"use client";
import { useState, useEffect } from "react";
import { AuthForm } from "@/components/AuthForm";
import { checkAuthStatus } from "@/utils/client-auth";

export default function PersonalGate() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus().then((authenticated) => {
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    });
  }, []);

  const handleAuthSuccess = () => {
    // Redirect to the protected personal page after successful authentication
    window.location.href = "/personal/ssykq6nfti81tugz42zmlp5d1zqhb5uv";
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex flex-col justify-center items-center p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  if (isAuthenticated) {
    // If already authenticated, redirect to the protected page
    window.location.href = "/personal/ssykq6nfti81tugz42zmlp5d1zqhb5uv";
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Family Access
          </h1>
          <p className="text-gray-600">
            Sign in with your approved phone number to access family content.
          </p>
        </div>
        
        <AuthForm onSuccess={handleAuthSuccess} />
      </div>
    </main>
  );
}
