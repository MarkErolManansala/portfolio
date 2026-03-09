import { motion, useMotionValue, useTransform, animate, useSpring } from "framer-motion";
import { useEffect } from "react";

const toRgba = (color: string, opacity: number) => {
    if (color === "white") return `rgba(255,255,255,${opacity})`;
    if (color === "black") return `rgba(0,0,0,${opacity})`;
    return color;
};

// ── Single Comet ──────────────────────────────────────────────────────────────
const Comet = ({ orb }: { orb: typeof ORBS[number] }) => {
    const y = useMotionValue(0);
    const x = useMotionValue(0);

    // Smooth velocity for tail direction
    const smoothY = useSpring(y, { stiffness: 40, damping: 10 });
    // const smoothX = useSpring(x, { stiffness: 40, damping: 10 });

    // Tail stretches when moving fast
    const tailLength = useTransform(smoothY, [-18, 0, 18], [120, 60, 20]);
    const tailOpacity = useTransform(smoothY, [-18, 0, 18], [0.9, 0.4, 0.1]);

    // Tail rotates to point opposite of travel direction
    const tailRotate = useTransform(smoothY, [-18, 0, 18], [170, 180, 190]);

    useEffect(() => {
        const yAnim = animate(y, [-18, 18, -18], {
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "loop",
        });

        // Subtle x drift for organic feel
        const xAnim = animate(x, [-6, 6, -6], {
            duration: orb.duration * 1.3,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "loop",
        });

        return () => {
            yAnim.stop();
            xAnim.stop();
        };
    }, [orb.duration, orb.delay, orb.size, orb.glowSize, orb.color, x, y]);

    return (
        <motion.div
            style={{
                position: "absolute",
                left: orb.x,
                top: orb.y,
                width: orb.size,
                height: orb.size,
                zIndex: orb.z,
                x,
                y,
            }}
        >
            {/* ── Comet tail ── */}
            <motion.div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: orb.size * 0.6,
                    height: tailLength,
                    rotate: tailRotate,
                    transformOrigin: "top center",
                    translateX: "-50%",
                    opacity: tailOpacity,
                    background: `linear-gradient(to bottom,
            ${toRgba(orb.color, 0.9)} 0%,
            ${toRgba(orb.color, 0.4)} 30%,
            transparent 100%
          )`,
                    borderRadius: "0 0 9999px 9999px",
                    filter: `blur(${orb.size * 0.3}px)`,
                }}
            />

            {/* ── Outer glow ── */}
            <motion.div
                style={{
                    position: "absolute",
                    inset: -orb.glowSize / 2,
                    borderRadius: "50%",
                    background: `radial-gradient(circle,
            ${toRgba(orb.color, 0.2)} 0%,
            ${toRgba(orb.color, 0.05)} 40%,
            transparent 70%
          )`,
                    filter: `blur(${orb.glowSize * 0.25}px)`,
                }}
            />

            {/* ── Core dot ── */}
            <div
                style={{
                    width: orb.size,
                    height: orb.size,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, white 0%, ${orb.color} 100%)`,
                    boxShadow: `
            0 0 ${orb.size * 2}px ${orb.size}px ${toRgba(orb.color, 0.8)},
            0 0 ${orb.size * 6}px ${orb.size * 2}px ${toRgba(orb.color, 0.3)}
          `,
                    position: "relative",
                    zIndex: 2,
                }}
            />
        </motion.div>
    );
};

// ── Orb data ──────────────────────────────────────────────────────────────────
const ORBS = [
    { size: 10, x: "65%", y: "25%", duration: 6, delay: 1, glowSize: 100, z: 1, color: "black" },
    { size: 10, x: "68%", y: "27%", duration: 9, delay: 0.5, glowSize: 100, z: 1, color: "black" },
    { size: 10, x: "80%", y: "26%", duration: 3, delay: 0.8, glowSize: 100, z: 1, color: "black" },

    { size: 10, x: "75%", y: "29%", duration: 6, delay: 1, glowSize: 100, z: 1, color: "white" },
    { size: 10, x: "78%", y: "30%", duration: 9, delay: 0.5, glowSize: 100, z: 1, color: "white" },
    { size: 10, x: "60%", y: "31%", duration: 3, delay: 0.8, glowSize: 100, z: 1, color: "white" },
];

// ── Main Export ───────────────────────────────────────────────────────────────
export const FloatingOrbs = ({ className = "" }: { className?: string }) => (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
        {ORBS.map((orb, i) => (
            <Comet key={i} orb={orb} />
        ))}
    </div>
);