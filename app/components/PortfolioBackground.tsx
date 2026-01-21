"use client";

export function PortfolioBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-3/4 -right-32 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-linear-to-r from-purple-600/5 to-cyan-600/5 rounded-full blur-3xl"></div>

      <div className="particle particle-1"></div>
      <div className="particle particle-2"></div>
      <div className="particle particle-3"></div>
      <div className="particle particle-4"></div>
      <div className="particle particle-5"></div>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-5deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation:  float-delayed 8s ease-in-out infinite;
          animation-delay: 1s;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background:  rgba(139, 92, 246, 0.5);
          border-radius: 50%;
          animation: particle-float 15s infinite;
        }

        .particle-1 {
          left: 10%;
          top:  20%;
          animation-delay: 0s;
        }
        .particle-2 {
          left: 20%;
          top: 80%;
          animation-delay: 2s;
        }
        .particle-3 {
          left: 70%;
          top: 30%;
          animation-delay: 4s;
        }
        .particle-4 {
          left: 80%;
          top: 70%;
          animation-delay: 6s;
        }
        .particle-5 {
          left: 50%;
          top: 50%;
          animation-delay: 8s;
        }

        @keyframes particle-float {
          0%,
          100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          50% {
            transform: translateY(-100px) translateX(50px) scale(1.5);
          }
        }
      `}</style>
    </div>
  );
}