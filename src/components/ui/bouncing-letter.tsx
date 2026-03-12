// components/ui/bouncing-letter.tsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BouncyTextProps {
    text: string;
    outlined?: boolean;
    className?: string;
    stiffness?: number;
    damping?: number;
    lift?: number;
}

export const BouncyText = ({
    text,
    outlined = false,
    className = "",
    stiffness = 400,
    damping = 7,
    lift = 16,
}: BouncyTextProps) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <div ref={ref} className="flex flex-wrap">
            {text.split("").map((letter, i) => (
                <motion.span
                    key={i}
                    // ── scroll-in bounce ──
                    initial={{ y: 20, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{
                        type: "spring",
                        stiffness,
                        damping,
                        mass: 1,
                        delay: i * 0.04,
                    }}
                    // ── hover bounce ──
                    whileHover={{ y: -lift }}
                    className={`block cursor-default ${outlined ? "text-outlined" : ""} ${className}`}
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </div>
    );
};