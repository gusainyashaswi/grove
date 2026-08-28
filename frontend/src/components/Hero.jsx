import { useState, useEffect } from "react";
import RepositoryInput from "./RepositoryInput";
import RobotVisual from "./RobotVisual";
import DecorativeGraph from "./DecorativeGraph";
import { Shield, Sparkles, Code2, FileCode, GitBranch, MessageSquare } from "lucide-react";
import GithubIcon from "./common/GithubIcon";

export default function Hero({ onAnalyze, loading, error }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const CAPABILITIES = [
        { icon: GithubIcon, label: "GitHub Context" },
        { icon: FileCode, label: "File Analysis" },
        { icon: GitBranch, label: "Dependencies" },
        { icon: MessageSquare, label: "AI Insights" },
    ];

    return (
        <section className="relative w-full min-h-screen flex flex-col justify-between pt-32 pb-8 px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden">
            {/* Background elements (Decorative Graph) */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <DecorativeGraph />
            </div>

            {/* Main 2-column Hero Content */}
            <div className="relative z-10 max-w-7xl w-full mx-auto flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                
                {/* LEFT COLUMN: Typography & Input */}
                <div className={`w-full lg:w-[50%] xl:w-[45%] flex flex-col items-start text-left transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    
                    {/* Eyebrow */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.04] border border-black/[0.08] mb-6">
                        <Sparkles size={14} className="text-black/60" />
                        <span className="text-[11px] font-bold tracking-wider uppercase text-black/70">
                            AI-Powered Repository Intelligence
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.05] tracking-tight text-black mb-6">
                        Understand any<br />codebase.
                    </h1>

                    {/* Supporting Text */}
                    <p className="text-lg sm:text-[21px] text-black/60 leading-relaxed max-w-[480px] mb-10 font-medium">
                        Grove analyzes GitHub repositories and uses AI to help you explore, understand, and navigate unfamiliar code.
                    </p>

                    {/* Input Container */}
                    <div className="w-full max-w-[480px]">
                        <RepositoryInput onAnalyze={onAnalyze} loading={loading} error={error} />
                        
                        {/* Feature Indicators */}
                        <div className="mt-5 flex items-center gap-5 pl-2 text-[13px] text-black/50 font-medium">
                            <div className="flex items-center gap-1.5">
                                <Shield size={14} />
                                <span>Secure</span>
                            </div>
                            <div className="w-[3px] h-[3px] rounded-full bg-black/20" />
                            <div className="flex items-center gap-1.5">
                                <Sparkles size={14} />
                                <span>AI-Powered</span>
                            </div>
                            <div className="w-[3px] h-[3px] rounded-full bg-black/20" />
                            <div className="flex items-center gap-1.5">
                                <Code2 size={14} />
                                <span>Repository Intelligence</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Robot Visual */}
                <div className={`w-full lg:w-[45%] xl:w-[50%] flex justify-center items-center transition-all duration-1000 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <RobotVisual />
                </div>
            </div>

            {/* BOTTOM: Explore Capabilities Strip */}
            <div className={`relative z-10 w-full max-w-7xl mx-auto mt-16 lg:mt-24 pt-8 border-t border-black/10 transition-all duration-1000 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-black/40">
                        Explore Your Codebase
                    </span>
                    <div className="flex items-center gap-6 sm:gap-10">
                        {CAPABILITIES.map((cap, idx) => {
                            const Icon = cap.icon;
                            return (
                                <div key={idx} className="flex items-center gap-2.5 text-black/40 hover:text-black transition-colors cursor-default">
                                    <Icon size={18} />
                                    <span className="text-[13px] font-medium hidden sm:inline">{cap.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}