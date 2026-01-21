"use client";

import { useState } from 'react';
import { Upload, Check, Copy, ExternalLink, X, Loader2 } from 'lucide-react';

interface PublishButtonProps {
  personalInfo: any;
  professional: any;
  aiPortfolio: any;
}

export function PublishButton({ personalInfo, professional, aiPortfolio }: PublishButtonProps) {
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    setError(null);

    try {
      const response = await fetch('/api/portfolio/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalInfo,
          professional,
          aiPortfolio,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data. error || 'Failed to publish');
      }

      setPublishedUrl(`${window.location.origin}/p/${data.code}`);
      setShowModal(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleCopy = async () => {
    if (publishedUrl) {
      await navigator.clipboard.writeText(publishedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Publish Button */}
      <button
        onClick={handlePublish}
        disabled={isPublishing}
        className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        {isPublishing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="hidden sm:inline">Publishing...</span>
          </>
        ) : (
          <>
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Publish</span>
          </>
        )}
      </button>

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-4 right-4 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm z-50">
          {error}
        </div>
      )}

      {/* Success Modal */}
      {showModal && publishedUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-500" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-center text-white mb-2">
              Published!  🎉
            </h3>
            <p className="text-gray-400 text-center mb-6">
              Your portfolio is now live.  Share it with the world! 
            </p>

            {/* URL Box */}
            <div className="flex items-center gap-2 p-3 bg-gray-800 rounded-xl border border-gray-700 mb-4">
              <input
                type="text"
                value={publishedUrl}
                readOnly
                className="flex-1 bg-transparent text-white text-sm outline-none truncate"
              />
              <button
                onClick={handleCopy}
                className={`p-2 rounded-lg transition-colors shrink-0 ${
                  copied ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' :  'Copy Link'}
              </button>
              <a
                href={publishedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                View Live
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}