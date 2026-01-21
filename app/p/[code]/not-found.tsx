import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Portfolio Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          This portfolio doesn&apos;t exist or may have been removed. 
        </p>
        <Link
          href="/"
          className="inline-flex px-6 py-3 bg-linear-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}