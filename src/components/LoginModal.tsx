import React, { useState } from 'react';
import { X, ShieldCheck, Sparkles } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: { name: string; email: string }) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  if (!isOpen) return null;

  const [inputVal, setInputVal] = useState('');
  const [nameVal, setNameVal] = useState('');
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal) return;
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = nameVal.trim() || 'Rajesh Sharma';
    const email = inputVal.includes('@') ? inputVal : `${inputVal}@flipkartuser.com`;
    onLogin({ name: finalName, email });
    onClose();
  };

  const handleQuickDemo = () => {
    onLogin({
      name: 'Rajesh Sharma',
      email: 'rajesh.sharma@example.com',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 z-10 p-1 rounded"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Blue Banner */}
        <div className="bg-[#2874f0] text-white p-6 md:p-8 md:w-2/5 flex flex-col justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-black">
              {step === 'input' ? 'Login' : 'Verification'}
            </h3>
            <p className="text-xs text-blue-100 mt-3 leading-relaxed">
              Get access to your Orders, Wishlist, Plus Benefits and personalized Recommendations.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-blue-400/30 flex items-center gap-2 text-xs text-yellow-300">
            <Sparkles className="w-4 h-4" />
            <span className="font-semibold">Flipkart Plus Exclusive Access</span>
          </div>
        </div>

        {/* Right Form Area */}
        <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-center">
          {step === 'input' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Enter Email / Mobile Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 9876543210 or user@example.com"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="w-full px-3 py-2 text-xs border-b-2 border-gray-300 focus:border-[#2874f0] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Your Full Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rajesh Sharma"
                  value={nameVal}
                  onChange={(e) => setNameVal(e.target.value)}
                  className="w-full px-3 py-2 text-xs border-b-2 border-gray-300 focus:border-[#2874f0] focus:outline-none transition-colors"
                />
              </div>

              <p className="text-[11px] text-gray-500 leading-normal">
                By continuing, you agree to Flipkart's{' '}
                <span className="text-[#2874f0] underline cursor-pointer">Terms of Use</span> and{' '}
                <span className="text-[#2874f0] underline cursor-pointer">Privacy Policy</span>.
              </p>

              <button
                type="submit"
                className="w-full bg-[#fb641b] hover:bg-orange-600 text-white font-bold py-2.5 rounded-xs text-xs tracking-wide shadow-md transition-colors cursor-pointer"
              >
                Request OTP
              </button>

              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-gray-200 w-full" />
                <span className="bg-white px-2 text-[10px] uppercase font-bold text-gray-400 absolute">
                  OR
                </span>
              </div>

              <button
                type="button"
                onClick={handleQuickDemo}
                className="w-full border border-blue-600 text-[#2874f0] hover:bg-blue-50 font-bold py-2 rounded-xs text-xs transition-colors cursor-pointer"
              >
                1-Click Demo Login (Rajesh Sharma)
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <p className="text-xs text-gray-600">
                Please enter the OTP sent to <strong className="text-gray-900">{inputVal}</strong>.
              </p>

              <div className="flex justify-center gap-2 my-4">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[idx] = e.target.value;
                      setOtp(newOtp);
                      if (e.target.value && e.target.nextElementSibling) {
                        (e.target.nextElementSibling as HTMLInputElement).focus();
                      }
                    }}
                    className="w-10 h-12 text-center text-lg font-bold border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-[#fb641b] hover:bg-orange-600 text-white font-bold py-2.5 rounded-xs text-xs shadow-md transition-colors"
              >
                Verify &amp; Sign In
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="text-xs text-[#2874f0] hover:underline"
                >
                  Change Email or Number
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 flex items-center justify-center gap-1 text-[11px] text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure 256-Bit Verification</span>
          </div>
        </div>
      </div>
    </div>
  );
};
