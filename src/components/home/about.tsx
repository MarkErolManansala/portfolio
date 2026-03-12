// components/home/about.tsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BouncyText } from "../ui/bouncing-letter";
import { Terminal, Layers, Cpu, Zap } from "lucide-react";

const PanelLabel = ({ children }: { children: string }) => (
    <span className="absolute -top-3 left-4 bg-base-100 px-2 text-xs font-black uppercase tracking-widest text-base-content/30 select-none">
        {children}
    </span>
);

const SpeechBubble = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`relative bg-base-100 border-2 border-base-content/80 px-5 py-3 ${className}`}
    >
        <span className="absolute -bottom-3 left-6 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-12 border-t-base-content/80" />

        <p>{text}</p>
    </motion.div>
);

const Stat = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
    <div className="flex items-center gap-3 border border-base-content/10 px-4 py-3">
        <Icon size={18} className="text-primary shrink-0" />
        <div className="leading-none">
            <p className="text-xs uppercase tracking-widest text-base-content/40 font-black">{label}</p>
            <p className="text-sm font-black mt-0.5">{value}</p>
        </div>
    </div>
);

const TimelineItem = ({ year, role, place, delay }: { year: string; role: string; place: string; delay: number }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative pl-6 border-l-2 border-base-content/10 group"
    >
        <span className="absolute -left-5 top-1.5 w-2 h-2 bg-primary rounded-full group-hover:scale-150 transition-transform duration-200" />
        <p className=" text-primary uppercase tracking-widest">{year}</p>
        <p className=" text-base md:text-lg leading-tight">{role}</p>
        <p className="">{place}</p>
    </motion.div>
);

export const About = () => {
    const headRef = useRef(null);
    const headInView = useInView(headRef, { once: true });

    return (
        <section id="about" className="relative w-full py-28 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-base-content/10" />
            <div className="max-w-7xl mx-auto px-6 md:px-16">
                <motion.div
                    ref={headRef}
                    initial={{ opacity: 0, x: -40 }}
                    animate={headInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-20 select-none"
                >
                    <p className="uppercase text-sm font-black tracking-widest text-base-content/40">- Chapter 03 -</p>
                    <BouncyText text="ABOUT" className="text-8xl md:text-9xl font-black uppercase" />
                    <BouncyText text="ME." outlined className="text-8xl md:text-9xl font-black uppercase" />
                    <div className="mt-8 flex items-center gap-5">
                        <div className="h-px w-20 bg-primary" />
                        <p className="text-base font-black uppercase text-base-content/40">The dev behind the screen</p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-8">
                            <SpeechBubble text="I'm Mark — a Full-Stack Developer who turns complex requirements into elegant, high-performance apps." delay={0.1} />
                            <SpeechBubble text="My weapon of choice? Laravel + React. CRMs, job systems, API gateways — all battle-tested in production." delay={0.25} />
                            <SpeechBubble text="Clean code, fast deploys, zero excuses." />
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="grid grid-cols-2 gap-2 mt-4"
                        >
                            <Stat icon={Zap} label="Experience" value="3+ Years" />
                            <Stat icon={Layers} label="Projects" value="10+ Shipped" />
                            <Stat icon={Cpu} label="Stack" value="Laravel + React" />
                            <Stat icon={Terminal} label="Specialty" value="Full-Stack Apps" />
                        </motion.div>
                    </div>

                    <div className="relative border border-base-content/10 p-8">
                        <PanelLabel>// timeline</PanelLabel>
                        <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary" />
                        <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary" />
                        <div className="flex flex-col gap-8 mt-4">
                            <TimelineItem year="2025 — Present" role="Freelance Full-Stack Developer" place="Remote" delay={0.1} />
                            <TimelineItem year="2023 — 2025" role="Full-Stack Developer" place="Tech Company · Laravel + React" delay={0.2} />
                            <TimelineItem year="2022 — 2023" role="Junior Web Developer" place="Startup · PHP + Vue" delay={0.3} />
                            <TimelineItem year="2019 — 2022" role="B.S. Information Technology" place="University" delay={0.4} />
                        </div>
                        <p className="absolute bottom-4 right-8 font-black text-5xl text-base-content/5 select-none">03</p>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-base-content/10" />
        </section>
    );
};