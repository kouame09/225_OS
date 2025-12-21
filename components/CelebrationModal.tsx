import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PartyPopper, Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CelebrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectName: string;
}

const CelebrationModal: React.FC<CelebrationModalProps> = ({
    isOpen,
    onClose,
    projectName
}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            // Fire multiple bursts of confetti
            const duration = 3000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

            const randomInRange = (min: number, max: number) => {
                return Math.random() * (max - min) + min;
            };

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                // since particles fall down, start a bit higher than random
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-500">
            <div
                className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-2 border-emerald-500/50 transform scale-100 animate-in zoom-in-95 slide-in-from-bottom-5 duration-500 relative overflow-hidden"
            >
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 z-0"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/30 rounded-full blur-3xl"></div>
                <div className="absolute top-20 -left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl"></div>

                <div className="relative z-10 p-8 text-center">
                    {/* Icon */}
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/40 animate-bounce">
                        <PartyPopper size={48} className="text-white" />
                    </div>

                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        Félicitations ! 🎉
                    </h2>
                    <h3 className="text-xl font-medium text-emerald-600 dark:text-emerald-400 mb-6 font-handwriting">
                        Bienvenue dans le club des créateurs
                    </h3>

                    <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg leading-relaxed">
                        Vous venez de publier votre tout premier projet <span className="font-bold text-slate-900 dark:text-white">"{projectName}"</span> sur la plateforme. C'est le début d'une grande aventure open-source ! 🚀
                    </p>

                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group"
                    >
                        <span>Admirer mon Dashboard</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CelebrationModal;
