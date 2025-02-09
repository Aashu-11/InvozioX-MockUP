import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const Welcome = () => {
  const typingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const texts = [
      'Automate Your GST Invoicing',
      'Powered by AI',
      'Built for Growth'
    ];
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const currentText = texts[currentTextIndex];
      
      if (typingRef.current) {
        if (!isDeleting) {
          typingRef.current.textContent = currentText.substring(0, currentCharIndex + 1);
          currentCharIndex++;

          if (currentCharIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause before deleting
          }
        } else {
          typingRef.current.textContent = currentText.substring(0, currentCharIndex - 1);
          currentCharIndex--;

          if (currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % texts.length;
            typingSpeed = 100;
          }
        }
      }

      setTimeout(type, typingSpeed);
    };

    type();
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#00FFFF1A,#FF00FF1A)] opacity-20">
        <div className="absolute inset-0 animate-wave bg-[linear-gradient(45deg,#00FFFF,#FF00FF)]" 
             style={{ filter: 'blur(100px)' }} />
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] animate-pulse" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] text-transparent bg-clip-text">
            InvozioX
          </h1>
        </div>

        <h2 className="text-5xl font-bold mb-4 min-h-[60px]">
          <span ref={typingRef} className="bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] text-transparent bg-clip-text">
            Automate Your GST Invoicing
          </span>
        </h2>

        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Experience the future of GST invoicing with AI-powered automation, 
          real-time insights, and seamless compliance management.
        </p>

        <div className="flex items-center justify-center gap-6">
          <Link to="/register">
            <Button size="lg" className="group inline-flex items-center gap-2 px-8 py-3 text-lg">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { title: '10,000+', subtitle: 'Active Users' },
            { title: '₹100Cr+', subtitle: 'Invoices Generated' },
            { title: '99.9%', subtitle: 'GST Compliance' }
          ].map((stat, index) => (
            <div key={index} className="p-6 rounded-xl bg-[#1E1E1E]/50 backdrop-blur-lg hover:bg-[#1E1E1E]/70 transition-all duration-300">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] text-transparent bg-clip-text">
                {stat.title}
              </h3>
              <p className="text-gray-400">{stat.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome;