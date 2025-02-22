import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="relative min-h-screen flex items-center justify-center">
      {/* Hero Section Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/95 via-purple-600/90 to-blue-900/95" />{" "}
        {/* Adjusted opacity */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />{" "}
        {/* Simplified grid pattern */}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* University Name */}
          <div className="text-center mb-6">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white/90 tracking-wide">
              Daffodil International University
            </h1>
            <div className="h-0.5 w-32 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mt-3" />
          </div>

          {/* Club Name - Smaller size */}
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient bg-300% drop-shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                Computer & Programming Club
              </span>
            </h2>
          </div>

          {/* Description - Improved readability */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-base md:text-lg text-white/85 leading-relaxed px-4">
              DIU CPC is the most primitive and extensive club as well as the
              biggest club in Daffodil International University. We work
              together to explore every field of Computer Science
            </p>
          </div>

          {/* CTA Buttons - Larger size */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-12">
            <a
              href="/about"
              className="group bg-white/95 text-blue-600 px-8 py-3.5 rounded-full font-semibold 
                      transition-all duration-300 hover:scale-105 hover:shadow-lg 
                      hover:shadow-white/20 flex items-center gap-2 text-base"
            >
              <span>Explore More</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </a>
            <a
              href="/join"
              className="group px-8 py-3.5 rounded-full font-semibold 
                      border-2 border-white/80 text-white transition-all duration-300 
                      hover:bg-white/10 hover:scale-105 flex items-center gap-2 text-base"
            >
              <span>Join Us</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </a>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto px-4">
            {[
              { number: 500, label: "Active Members", icon: "👥", suffix: "+" },
              {
                number: 50,
                label: "Events Organized",
                icon: "🎯",
                suffix: "+",
              },
              { number: 100, label: "Workshops", icon: "🔧", suffix: "+" },
              {
                number: 20,
                label: "ICPC Achievements",
                icon: "🏆",
                suffix: "+",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {isVisible && (
                    <CountUp
                      start={0}
                      end={stat.number}
                      duration={2}
                      separator=","
                      suffix={stat.suffix}
                      delay={0.1 + index * 0.1}
                    >
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  )}
                </div>
                <div className="text-white/80 text-xs md:text-sm whitespace-nowrap">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Smaller and more subtle */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <span className="text-white/50 text-xs tracking-wider uppercase">
          Scroll to Discover
        </span>
        <div className="w-5 h-8 border-2 border-white/20 rounded-full p-1">
          <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce mx-auto" />
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
