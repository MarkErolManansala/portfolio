// components/home/contact.tsx
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { BouncyText } from "../ui/bouncing-letter";
import { Github, Linkedin, Mail, Radio, Send, Lock } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
type Status = "idle" | "encrypting" | "sent";

// ── Noise canvas — static TV effect ──────────────────────────────────────────
const NoiseCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let raf: number;
        const draw = () => {
            const { width, height } = canvas;
            const img = ctx.createImageData(width, height);
            for (let i = 0; i < img.data.length; i += 4) {
                const v = Math.random() > 0.5 ? 255 : 0;
                img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
                img.data[i + 3] = Math.random() * 18;
            }
            ctx.putImageData(img, 0, 0);
            raf = requestAnimationFrame(draw);
        };

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        draw();
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />
    );
};

// ── Signal bars ───────────────────────────────────────────────────────────────
const SignalBars = () => (
    <div className="flex items-end gap-3">
        {[3, 5, 7, 9, 11].map((h, i) => (
            <motion.span
                key={i}
                className="w-1.5 bg-primary block"
                style={{ height: h }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.15, ease: "easeInOut" }}
            />
        ))}
    </div>
);

// ── Glitch text ───────────────────────────────────────────────────────────────
const GlitchText = ({ text }: { text: string }) => {
    const [glitch, setGlitch] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 120);
        }, 3200);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className="relative inline-block">
            <span className={glitch ? "opacity-0" : "opacity-100"}>{text}</span>
            {glitch && (
                <>
                    <span className="absolute inset-0 text-primary" style={{ clipPath: "inset(30% 0 50% 0)", transform: "translateX(-3px)" }}>
                        {text}
                    </span>
                    <span className="absolute inset-0 text-error" style={{ clipPath: "inset(55% 0 20% 0)", transform: "translateX(3px)" }}>
                        {text}
                    </span>
                </>
            )}
        </span>
    );
};

// ── Transmission ID ticker ─────────────────────────────────────────────────────
const TxID = () => {
    const chars = "0123456789ABCDEF";
    const gen = () =>
        Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");

    const [id, setId] = useState(gen); // ✅ lazy initializer — runs once, no effect needed

    useEffect(() => {
        const t = setInterval(() => setId(gen()), 2000);
        return () => clearInterval(t);
    }, []);

    return <span className="tabular-nums text-primary">{id}</span>;
};
// ── Field ─────────────────────────────────────────────────────────────────────
const Field = ({
    label,
    type = "text",
    value,
    placeholder,
    onChange,
    textarea,
}: {
    label: string;
    type?: string;
    value: string;
    placeholder: string;
    onChange: (v: string) => void;
    textarea?: boolean;
}) => {
    const [focused, setFocused] = useState(false);
    const base = "w-full bg-transparent border-b border-neutral-content/15 py-2 pl-1 text-neutral-content placeholder:text-neutral-content/20 focus:outline-none transition-colors duration-200 focus:border-primary resize-none";

    return (
        <div className="relative">
            <div className="flex items-center gap-3 mb-1">
                <span className="text-primary uppercase tracking-widest">{label}</span>
                <motion.span
                    className="h-px flex-1 bg-primary"
                    animate={{ scaleX: focused ? 1 : 0, originX: 0 }}
                    transition={{ duration: 0.3 }}
                />
            </div>
            {textarea ? (
                <textarea
                    rows={4}
                    value={value}
                    placeholder={placeholder}
                    onChange={e => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className={base}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={e => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className={base}
                />
            )}
        </div>
    );
};

// ── Socials ───────────────────────────────────────────────────────────────────
const SOCIALS = [
    { icon: Github, label: "GitHub", href: "#", handle: "@markmanansala" },
    { icon: Linkedin, label: "LinkedIn", href: "#", handle: "Mark Manansala" },
    { icon: Mail, label: "Email", href: "mailto:mark@email.com", handle: "mark@email.com" },
];

// ── Success burst ─────────────────────────────────────────────────────────────
const SuccessBurst = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            {Array.from({ length: 24 }, (_, i) => {
                const angle = (i / 24) * 360;
                const rad = (angle * Math.PI) / 180;
                return (
                    <motion.line
                        key={i}
                        x1="50" y1="50"
                        x2={50 + Math.cos(rad) * 80}
                        y2={50 + Math.sin(rad) * 80}
                        stroke="currentColor"
                        strokeWidth="0.4"
                        className="text-primary"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: [0, 0.3, 0] }}
                        transition={{ duration: 0.8, delay: i * 0.01, ease: "easeOut" }}
                    />
                );
            })}
        </svg>
    </div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
export const Contact = () => {
    const headRef = useRef(null);
    const headInView = useInView(headRef, { once: true });
    const [status, setStatus] = useState<Status>("idle");
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;
        setStatus("encrypting");

        const formData = new FormData();
        formData.append("access_key", "7f46c9ce-4f14-4e1e-8add-f9c934b7f8d7");
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("message", form.message);

        try {
            const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
            const data = await res.json();
            setStatus(data.success ? "sent" : "idle");
        } catch {
            setStatus("idle");
        }
    };
    const canSubmit = form.name && form.email && form.message;

    return (
        <section id="contact" className="relative w-full py-28 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-base-content/10" />

            <div className="max-w-7xl mx-auto px-6 md:px-16">

                {/* ── Heading ── */}
                <motion.div
                    ref={headRef}
                    initial={{ opacity: 0, x: -40 }}
                    animate={headInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16 select-none"
                >
                    <p className="uppercase tracking-widest text-base-content/40">- Chapter 05 -</p>
                    <BouncyText text="OPEN" className="text-8xl md:text-9xl uppercase" />
                    <BouncyText text="COMMS." outlined className="text-8xl md:text-9xl uppercase" />
                    <div className="mt-8 flex items-center gap-5">
                        <div className="h-px w-20 bg-primary" />
                        <p className="uppercase text-base-content/40">Transmission channel active</p>
                    </div>
                </motion.div>

                {/* ── Two manga panels ── */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border border-neutral-content/10">

                    {/* LEFT — codec portrait panel (2 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="relative lg:col-span-2 bg-neutral overflow-hidden border-b lg:border-b-0 lg:border-r border-neutral-content/10"
                        style={{ minHeight: "420px" }}
                    >
                        <NoiseCanvas />

                        {/* Corner marks */}
                        <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary z-20" />
                        <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary z-20" />

                        {/* Status bar top */}
                        <div className="relative z-20 flex items-center justify-between px-5 py-3 border-b border-neutral-content/8">
                            <div className="flex items-center gap-2">
                                <motion.span
                                    className="w-2 h-2 rounded-full bg-primary block"
                                    animate={{ opacity: [1, 0.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 1.0 }}
                                />
                                <span className="uppercase tracking-widest text-neutral-content/40">
                                    LIVE
                                </span>
                            </div>
                            <SignalBars />
                        </div>

                        {/* Portrait placeholder */}
                        <div className="relative z-20 flex flex-col items-center justify-center px-8 py-10 gap-6">
                            {/* Hexagon frame */}
                            <div className="relative w-28 h-28">
                                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                                    <motion.polygon
                                        points="50,3 97,26 97,74 50,97 3,74 3,26"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        className="text-primary"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, ease: "easeInOut" }}
                                    />
                                    <motion.polygon
                                        points="50,3 97,26 97,74 50,97 3,74 3,26"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="0.5"
                                        className="text-primary opacity-30"
                                        strokeDasharray="4 4"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        style={{ transformOrigin: "50px 50px" }}
                                    />
                                </svg>
                                <div className="absolute inset-4 flex items-center justify-center">
                                    <Radio size={32} className="text-primary opacity-60" />
                                </div>
                            </div>

                            {/* Identity block */}
                            <div className="text-center">
                                <p className="uppercase tracking-[0.3em] text-neutral-content/40">
                                    AGENT
                                </p>
                                <p className="uppercase tracking-widest text-neutral-content mt-1">
                                    Mark Manansala
                                </p>
                                <p className="text-primary uppercase tracking-widest mt-1">
                                    Full-Stack Dev
                                </p>
                            </div>

                            {/* TX ID */}
                            <div className="w-full border border-neutral-content/10 px-4 py-3">
                                <p className="uppercase tracking-widest text-neutral-content/30">
                                    TX-ID
                                </p>
                                <p className="uppercase tracking-widest mt-0.5">
                                    <TxID />
                                </p>
                            </div>
                        </div>

                        {/* Socials strip */}
                        <div className="relative z-20 border-t border-neutral-content/8">
                            {SOCIALS.map(({ icon: Icon, label, href, handle }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-5 py-3 border-b border-neutral-content/8 last:border-b-0 group hover:bg-neutral-content/5 transition-colors duration-150"
                                >
                                    <Icon size={14} className="text-primary shrink-0" />
                                    <span className="text-neutral-content/50 group-hover:text-neutral-content transition-colors duration-150 uppercase tracking-wide">
                                        {handle}
                                    </span>
                                    <motion.span
                                        className="ml-auto text-primary opacity-0 group-hover:opacity-100"
                                        animate={{ x: [0, 3, 0] }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                    >
                                        →
                                    </motion.span>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT — transmission form (3 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="relative lg:col-span-3 bg-neutral overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-8 py-3 border-b border-neutral-content/8">
                            <span className="uppercase tracking-widest text-neutral-content/40">
                                <GlitchText text="// COMPOSE TRANSMISSION" />
                            </span>
                            <Lock size={12} className="text-primary" />
                        </div>

                        {/* Form / States */}
                        <AnimatePresence mode="wait">
                            {status === "sent" ? (
                                /* ── SUCCESS ── */
                                <motion.div
                                    key="sent"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="relative flex flex-col items-center justify-center py-24 gap-6 text-center"
                                >
                                    <SuccessBurst />
                                    <motion.p
                                        initial={{ scale: 0.7, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 14 }}
                                        className="text-6xl uppercase tracking-widest text-primary"
                                    >
                                        SENT!
                                    </motion.p>
                                    <motion.p
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="uppercase tracking-widest text-neutral-content/40"
                                    >
                                        Transmission received.<br />Expect a reply within 24h.
                                    </motion.p>
                                </motion.div>
                            ) : (
                                /* ── FORM ── */
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="relative flex flex-col gap-7 px-8 py-8"
                                >
                                    <Field
                                        label="FROM:"
                                        value={form.name}
                                        placeholder="Your name"
                                        onChange={v => setForm(p => ({ ...p, name: v }))}
                                    />
                                    <Field
                                        label="ADDR:"
                                        type="email"
                                        value={form.email}
                                        placeholder="your@email.com"
                                        onChange={v => setForm(p => ({ ...p, email: v }))}
                                    />
                                    <Field
                                        label="MSG:"
                                        value={form.message}
                                        placeholder="Describe your mission..."
                                        onChange={v => setForm(p => ({ ...p, message: v }))}
                                        textarea
                                    />

                                    {/* Submit */}
                                    <div className="flex items-center gap-4 pt-2">
                                        <motion.button
                                            type="submit"
                                            disabled={!canSubmit || status === "encrypting"}
                                            whileHover={canSubmit ? { scale: 1.02 } : {}}
                                            whileTap={canSubmit ? { scale: 0.97 } : {}}
                                            className="btn btn-primary rounded-none uppercase tracking-widest gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            {status === "encrypting" ? (
                                                <>
                                                    <motion.span
                                                        animate={{ rotate: 360 }}
                                                        transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                                                    >
                                                        ◌
                                                    </motion.span>
                                                    Encrypting...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={14} /> Transmit
                                                </>
                                            )}
                                        </motion.button>

                                        {/* Char counter on message */}
                                        {form.message.length > 0 && (
                                            <span className="text-neutral-content/25 uppercase tracking-widest">
                                                {form.message.length} chars
                                            </span>
                                        )}
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-px bg-base-content/10" />
        </section>
    );
};