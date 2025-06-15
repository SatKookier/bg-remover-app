// pages/PrivacyPolicy.tsx

import React from 'react';
import { XIcon } from '../components/IconLib'; // 閉じるボタン用のアイコン

interface Props {
  onClose: () => void;
}

export const PrivacyPolicy: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
          <XIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-sky-400 mb-4">Privacy Policy</h2>
        <div className="text-slate-300 space-y-4 text-sm leading-relaxed">
          <p>We respect your privacy. Below is an explanation of how this service handles your information.</p>
          
          <h3 className="text-lg font-semibold text-sky-500 pt-3">About Image Data</h3>
          <p>All background removal processing is completed entirely within your browser (client-side). Uploaded images are never sent to or stored on our servers.</p>
          
          <h3 className="text-lg font-semibold text-sky-500 pt-3">About Ads</h3>
          <p>This service plans to use third-party advertising services such as Google AdSense. Ad providers may use cookies to display personalized ads based on user interests. For more information on disabling cookies and Google AdSense, please refer to the <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">Advertising – Policies & Terms – Google</a> page.</p>
          
          <h3 className="text-lg font-semibold text-sky-500 pt-3">About Analytics Tools</h3>
          <p>This service may use Google Analytics to improve the service in the future. Google Analytics uses cookies to collect traffic data. This data is collected anonymously and does not identify individuals.</p>

          <h3 className="text-lg font-semibold text-sky-500 pt-3">Disclaimer</h3>
          <p>We are not responsible for any damages arising from the use of this service. The contents of this service may be changed or terminated without notice.</p>

          <h3 className="text-lg font-semibold text-sky-500 pt-3">Effective Date</h3>
          <p>June 15, 2025</p>
        </div>
      </div>
    </div>
  );
};