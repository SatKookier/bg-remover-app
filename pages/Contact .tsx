// pages/Contact.tsx

import React from 'reacr';
import { XIcon } from '../components/IconLib';

interface Props {
  onClose: () => void;
}

export const Contact: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl h-[90vh] flex flex-col p-2 sm:p-3">
        <div className="flex justify-end pr-2 pt-2">
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors z-10">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-grow h-full w-full -mt-10">
          {/* ▼▼▼ この下に、Googleフォームからコピーした<iframe>コードを貼り付け ▼▼▼ */}
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScT_4D1LQuNk3KF3uXjaVJ-eUnVZll7NRQhtVlbX_I_EoRGCw/viewform?embedded=true" width="640" height="864" frameborder="0" marginheight="0" marginwidth="0">読み込んでいます…</iframe>" 
          {/* ▲▲▲ ここまで ▲▲▲ */}
        </div>
      </div>
    </div>
  );
};