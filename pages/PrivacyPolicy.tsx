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
        <h2 className="text-2xl font-bold text-sky-400 mb-4">プライバシーポリシー</h2>
        <div className="text-slate-300 space-y-4 text-sm leading-relaxed">
          <p>当サイト（以下、本サービス）は、利用者のプライバシーを尊重します。以下に、本サービスがどのように情報を扱うかについて説明します。</p>
          
          <h3 className="text-lg font-semibold text-sky-500 pt-3">画像データについて</h3>
          <p>本サービスで行われる画像の背景除去処理は、すべてお客様のブラウザ内（クライアントサイド）で完結します。お客様がアップロードされた画像データが、本サービスのサーバーに送信または保存されることは一切ありません。</p>
          
          <h3 className="text-lg font-semibold text-sky-500 pt-3">広告配信について</h3>
          <p>本サービスは、第三者配信の広告サービス「Google AdSense」を利用する予定です。広告配信事業者は、ユーザーの興味に応じたパーソナライズ広告を表示するためにCookieを使用することがあります。Cookieを無効にする設定およびGoogle AdSenseに関する詳細は「<a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">広告 - ポリシーと規約 – Google</a>」のページをご確認ください。</p>
          
          <h3 className="text-lg font-semibold text-sky-500 pt-3">アクセス解析ツールについて</h3>
          <p>本サービスは、今後のサービス向上のため、Googleによるアクセス解析ツール「Google Analytics」を利用する可能性があります。Google Analyticsはトラフィックデータの収集のためにCookieを使用します。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。</p>

          <h3 className="text-lg font-semibold text-sky-500 pt-3">免責事項</h3>
          <p>本サービスの利用によって生じたいかなる損害についても、当方は一切の責任を負いません。本サービスの内容は、予告なく変更または終了することがあります。</p>

          <h3 className="text-lg font-semibold text-sky-500 pt-3">制定日</h3>
          <p>2025年6月15日</p>
        </div>
      </div>
    </div>
  );
};