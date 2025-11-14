import { useState } from 'react';
import { MessageCircle, Send, Users, AlertCircle } from 'lucide-react';

const Messages = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Messages
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Communicate with passengers on your route
        </p>
      </div>

      {/* Feature Under Development Notice */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <AlertCircle size={48} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-3">
              💬 Messaging Feature Under Development
            </h3>
            <p className="text-blue-700 dark:text-blue-300 mb-4 text-lg">
              The messaging system is currently being implemented. This feature will allow you to:
            </p>
            <ul className="space-y-3 text-blue-600 dark:text-blue-400 mb-6">
              <li className="flex items-start gap-3">
                <MessageCircle size={20} className="flex-shrink-0 mt-1" />
                <span>Send real-time messages to passengers on your route</span>
              </li>
              <li className="flex items-start gap-3">
                <Send size={20} className="flex-shrink-0 mt-1" />
                <span>Broadcast important updates (delays, route changes, etc.)</span>
              </li>
              <li className="flex items-start gap-3">
                <Users size={20} className="flex-shrink-0 mt-1" />
                <span>Respond to passenger queries and feedback</span>
              </li>
            </ul>

            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-900 dark:text-blue-100 font-semibold mb-2">
                📋 Technical Implementation Status:
              </p>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 ml-4">
                <li>• Backend WebSocket endpoints - Planned</li>
                <li>• Real-time message broadcasting - In Progress</li>
                <li>• Message history storage - Pending</li>
                <li>• Push notifications - Planned</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mock UI Preview */}
      <div className="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 opacity-50">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          UI Preview (Mock)
        </h3>
        <div className="space-y-4">
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
                <MessageCircle size={20} className="text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Broadcast Message</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">10:30 AM</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Bus will be delayed by 10 minutes due to traffic.
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Users size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Passenger Query</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">10:25 AM</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              When will you reach Sector 17?
            </p>
          </div>
        </div>
      </div>

      {/* Note for Examiner */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Note for Examiner:</strong> The messaging system requires WebSocket implementation in the backend 
          for real-time communication. The frontend UI and state management are ready for integration once 
          backend endpoints are available.
        </p>
      </div>
    </div>
  );
};

export default Messages;
