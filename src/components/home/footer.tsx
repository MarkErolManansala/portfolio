// components/home/footer.tsx
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const SOCIALS = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "mailto:mark@email.com", label: "Email" },
];

const NAV = [
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
];

const ScrollTop = () => (
    <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.93 }}
        className="flex items-center gap-2 border border-white/15 px-4 py-2 text-white/40 hover:text-white hover:border-white/40 transition-colors duration-200 uppercase tracking-widest cursor-pointer text-xs"
    >
        <ArrowUpRight size={14} className="-rotate-45" />
        Back to top
    </motion.button>
);

export const Footer = () => (
    <footer className="relative w-full bg-black text-white overflow-hidden pt-20">
        {/* Top border accent */}
        <div className="w-full h-px bg-white/10" />
        <div className="w-24 h-px bg-primary" />

        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col gap-16">
            {/* Top row — logo + nav + scroll top */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div className="select-none">
                    <p className="text-3xl font-bold tracking-tight text-white">.mem</p>
                    <p className="text-white/30 uppercase tracking-[0.3em] text-[10px] mt-1 font-bold">Mark Manansala</p>
                </div>

                <ul className="flex flex-wrap gap-8">
                    {NAV.map(({ label, href }) => (
                        <li key={label}>
                            <a
                                href={href}
                                className="text-xs text-white/40 hover:text-white uppercase tracking-widest transition-colors duration-200 font-bold"
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>

                <ScrollTop />
            </div>

            {/* Middle row — copyright + socials */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-white/5 pt-12">
                <div className="flex flex-col gap-1">
                    <p className="text-[10px] text-white/25 uppercase tracking-widest font-bold">
                        © {new Date().getFullYear()} Mark Erol Manansala
                    </p>
                    <p className="text-[10px] text-white/15 uppercase tracking-widest font-bold">
                        Built with React · Laravel · ❤
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {SOCIALS.map(({ icon: Icon, href, label }) => (
                        <motion.a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.1)" }}
                            className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-colors duration-200"
                        >
                            <Icon size={16} />
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>

        <div className="relative w-full mt-10 select-none overflow-hidden">
            <motion.h2
                initial={{ y: "20%" }}
                whileInView={{ y: "0%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-[25vw] leading-[0.7] font-black text-center flex justify-center cursor-default"
            >

                <motion.span

                    className="inline-block transition-colors duration-300 text-white/5" // Initial "Black" state (very dark grey)
                >
                    - MEM -
                </motion.span>
            </motion.h2>

        </div>
    </footer>
);