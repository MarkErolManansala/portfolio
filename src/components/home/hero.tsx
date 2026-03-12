import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowBigDown, ArrowDownRight } from "lucide-react";
import { BouncyText } from "../ui/bouncing-letter";

// ── Dot-grid background ───────────────────────────────────────────────────────
export const Grid = () => {
    const spacing = 40;
    const [dims, setDims] = useState({ cols: 0, rows: 0 });

    useEffect(() => {
        const update = () =>
            setDims({
                cols: Math.ceil(window.innerWidth / spacing) + 1,
                rows: Math.ceil(window.innerHeight / spacing) + 1,
            });
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const { cols, rows } = dims;
    const total = cols * rows;

    return (
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${cols}, ${spacing}px)`,
                    gridTemplateRows: `repeat(${rows}, ${spacing}px)`,
                }}
            >
                {Array.from({ length: total }, (_, i) => (
                    <div
                        key={i}
                        style={{
                            width: spacing,
                            height: spacing,
                            borderRight: "0.5px solid rgba(110,140,200,0.10)",
                            borderBottom: "0.5px solid rgba(110,140,200,0.10)",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

// ── Stat chip ─────────────────────────────────────────────────────────────────
const StatChip = ({
    value,
    label,
    delay,
}: {
    value: string;
    label: string;
    delay: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative border border-base-content/10 px-4 py-3 overflow-hidden"
    >
        <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary" />
        <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary" />
        <p className="text-2xl font-black leading-none">{value}</p>
        <p className="font-bold uppercase tracking-widest text-base-content/40 mt-1">
            {label}
        </p>
    </motion.div>
);

// ── Binary marquee — all computed at module level (never during render) ────────
const toBinary = (str: string) =>
    str
        .toUpperCase()
        .split("")
        .flatMap((ch, i, arr) => {
            const bits = ch
                .charCodeAt(0)
                .toString(2)
                .padStart(8, "0")
                .split("")
                .map((b) => (b === "1" ? "-" : "0"));
            return i < arr.length - 1 ? [...bits, "·"] : bits;
        });

const TECHS = toBinary("MARK EROL MANANSALA");
const DOUBLE_TECHS = [...TECHS, ...TECHS];

const RANDOM_VALS = DOUBLE_TECHS.map(() => ({
    duration: 1.5 + Math.random() * 3,
    delay: Math.random() * 2,
    lift: 4 + Math.random() * 10,
}));

// 6 rows — alternating scroll direction, random speed + opacity
const BINARY_ROWS = Array.from({ length: 3 }, (_, i) => ({
    top: `${15 + i * 5}%`,
    direction: (i % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"]) as [string, string],
    duration: 400 + Math.random() * 300,
    opacity: 0.04 + Math.random() * 0.08,
}));

// ── Main Hero ─────────────────────────────────────────────────────────────────
export const Hero = () => {
    return (
        <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-10">
            <Grid />

            {/* Top panel rule */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "left" }}
                className="absolute top-20 left-0 w-full h-px bg-base-content/10"
            />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center gap-10 md:gap-0">

                {/* ── LEFT — TEXT ───────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 flex flex-col items-center md:items-start text-center md:text-left select-none"
                >
                    {/* Chapter label */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <span className="font-black uppercase tracking-[0.3em]">
                            - Chapter 01 -
                        </span>
                    </motion.div>

                    {/* Main heading */}
                    <h2 className="flex flex-col items-center md:items-start leading-[0.9] gap-1">
                        <BouncyText
                            text="HI, I'M"
                            className="text-5xl sm:text-6xl xl:text-7xl font-black uppercase leading-none"
                        />
                        <BouncyText
                            text="Mark Erol"
                            outlined
                            className="text-5xl sm:text-6xl xl:text-7xl font-black uppercase leading-none"
                        />
                        <BouncyText
                            text="Manansala"
                            className="text-5xl sm:text-6xl xl:text-7xl font-black uppercase leading-none"
                        />
                    </h2>

                    {/* Divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        style={{ transformOrigin: "left" }}
                        className="mt-6 w-16 h-0.5 bg-primary"
                    />

                    {/* Role */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-5 font-black tracking-[0.35em] uppercase text-primary"
                    >
                        Full-Stack Web Developer
                    </motion.p>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="mt-5 max-w-sm leading-relaxed text-base-content/60 md:text-base"
                    >
                        I build fast, scalable web apps — CRMs, full-stack platforms,
                        and everything in between. Laravel + React is my weapon of choice.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.85, duration: 0.5 }}
                        className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start"
                    >
                        <a
                            href="#projects"
                            className="btn btn-primary font-black uppercase rounded-none px-8 gap-2"
                        >
                            VIEW WORK
                            <ArrowDownRight size={16} />
                        </a>
                        <a
                            href="#contact"
                            className="btn btn-outline font-black uppercase rounded-none px-8"
                        >
                            CONTACT
                        </a>
                    </motion.div>

                    {/* Stats row */}
                    <div className="mt-10 flex gap-4 flex-wrap justify-center md:justify-start">
                        <StatChip value="3+" label="Years exp." delay={0.95} />
                        <StatChip value="10+" label="Projects" delay={1.05} />
                    </div>
                </motion.div>

                {/* ── RIGHT — IMAGE PANEL ───────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative shrink-0 flex justify-center items-end w-full md:w-auto"
                >
                    <div className="relative overflow-hidden w-72 md:w-80 lg:w-96 h-105 md:h-130 rounded-xl border-2 border-base-300 bg-white ">

                        {/* Binary rain rows — z-10, behind the image */}
                        {BINARY_ROWS.map((row, ri) => (
                            <div
                                key={ri}
                                className="absolute left-0 right-0 z-10 py-2 overflow-hidden pointer-events-none"
                                style={{ top: row.top, opacity: row.opacity }}
                            >
                                <motion.div
                                    animate={{ x: row.direction }}
                                    transition={{ duration: row.duration, repeat: Infinity, ease: "linear" }}
                                    className="flex gap-4 w-max"
                                >
                                    {DOUBLE_TECHS.map((t, i) => (
                                        <motion.span
                                            key={i}
                                            animate={{ y: t === "·" ? 0 : [0, -RANDOM_VALS[i].lift, 0] }}
                                            transition={{
                                                duration: RANDOM_VALS[i].duration,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: RANDOM_VALS[i].delay,
                                            }}
                                            className={`whitespace-nowrap font-black text-sm ${t === "·"
                                                ? "text-primary mx-1"
                                                : t === "-"
                                                    ? "text-base-content"
                                                    : "text-base-content/20"
                                                }`}
                                        >
                                            {t}
                                        </motion.span>
                                    ))}
                                </motion.div>
                            </div>
                        ))}

                        {/* Image — z-20, in front of binary rain */}
                        <img
                            src="/pictures/me.webp"
                            alt="Mark Erol Manansala"
                            className="relative w-full h-full object-contain object-bottom z-20 brightness-105 pointer-events-none"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Bottom panel border */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "right" }}
                className="absolute bottom-0 left-0 w-full h-px bg-base-content/10"
            />

            {/* Scroll hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center gap-1 select-none"
            >
                <span className=" uppercase text-sm text-base-content/40">
                    scroll
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                >
                    <ArrowBigDown size={20} className="text-primary" />
                </motion.div>
            </motion.div>
        </section>
    );
};