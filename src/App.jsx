import React from 'react';
import FraudSystem from './components/FraudSystem';

export default function App(){
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 text-gray-900">
      <header className="p-4 bg-blue-600 text-white">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Welcome to the Fraud Detection System</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Landing Page</h2>
          <p className="mb-4">Experience our revolutionary fraud detection mechanism.</p>
          <FraudSystem />
        </section>
      </main>
      <footer className="p-4 bg-gray-800 text-white text-center">
        <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
}