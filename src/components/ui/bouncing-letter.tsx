// components/ui/bouncy-text.tsx
import { motion } from "framer-motion";

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
    return (
        <div className="flex">
            {text.split("").map((letter, i) => (
                <motion.span
                    key={i}
                    whileHover={{ y: -lift }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness, damping, mass: 1 }}
                    className={`block cursor-default ${outlined ? "text-outlined" : ""} ${className}`}
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </div>
    );
};