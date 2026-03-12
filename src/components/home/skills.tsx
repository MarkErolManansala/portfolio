// components/home/skills.tsx
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { BouncyText } from "../ui/bouncing-letter";
import { Shield, Sword, Zap, Database, Server, Monitor } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Skill {
    name: string;
    category: string;
    rank: "S" | "A" | "B";
    desc: string;
}

interface Category {
    id: string;
    label: string;
    icon: React.ElementType;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
    { id: "All", label: "All Skills", icon: Zap },
    { id: "Backend", label: "Backend", icon: Server },
    { id: "Frontend", label: "Frontend", icon: Monitor },
    { id: "Database", label: "Database", icon: Database },
    { id: "DevOps", label: "DevOps", icon: Shield },
];

const SKILLS: Skill[] = [
    { name: "Laravel", category: "Backend", rank: "S", desc: "Eloquent ORM, Queues, Events, REST APIs" },
    { name: "PHP", category: "Backend", rank: "S", desc: "OOP, design patterns, package authoring" },
    { name: "Inertia.js", category: "Backend", rank: "A", desc: "SPA without the API — best of both worlds" },
    { name: "React", category: "Frontend", rank: "S", desc: "Hooks, context, custom libs, performance" },
    { name: "TypeScript", category: "Frontend", rank: "A", desc: "Strict typing, generics, Zod schemas" },
    { name: "Tailwind CSS", category: "Frontend", rank: "S", desc: "Utility-first, design systems, animations" },
    { name: "Framer Motion", category: "Frontend", rank: "A", desc: "Complex animations, scroll-driven UI" },
    { name: "MySQL", category: "Database", rank: "A", desc: "Schema design, indexing, query optimization" },
    { name: "Redis", category: "Database", rank: "A", desc: "Caching, pub/sub, Laravel Horizon" },
    { name: "Docker", category: "DevOps", rank: "B", desc: "Containerization, Compose, prod deploys" },
    { name: "CI/CD", category: "DevOps", rank: "B", desc: "GitHub Actions, zero-downtime deploys" },
    { name: "Zod / RHF", category: "Frontend", rank: "A", desc: "End-to-end type-safe form validation" },
];

const RANK_COLORS: Record<string, string> = {
    S: "text-yellow-400 border-yellow-400 bg-yellow-400/10",
    A: "text-primary border-primary bg-primary/10",
    B: "text-neutral-content/50 border-neutral-content/20 bg-neutral-content/5",
};


// ── Rank badge ────────────────────────────────────────────────────────────────
const RankBadge = ({ rank }: { rank: "S" | "A" | "B" }) => (
    <span className={`border px-1.5 py-0.5 leading-none uppercase tracking-widest ${RANK_COLORS[rank]}`}>
        {rank}
    </span>
);

// ── Skill card ────────────────────────────────────────────────────────────────
const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
    const [hovered, setHovered] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.055, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative group cursor-default"
            style={{ zIndex: hovered ? 30 : 1 }}
        >
            {/* Card — fixed height, never grows */}
            <div className="relative bg-neutral border border-neutral-content/10 px-5 py-4 transition-colors duration-300 group-hover:border-primary/40" style={{ minHeight: "3.5rem" }}>

                {/* Glow */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at top left, oklch(var(--p)/0.06), transparent 70%)" }}
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.35 }}
                />


                {/* Header — always visible */}
                <div className="relative z-10 flex items-center justify-between gap-2 bg-white">
                    <div className="flex items-center gap-2 bg-white">
                        <RankBadge rank={skill.rank} />
                        <span className="uppercase text-neutral-content tracking-wide ">
                            {skill.name}
                        </span>
                    </div>
                    <Sword
                        size={12}
                        className="text-primary shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                </div>

                {/* Desc — absolute overlay, floats below header, never shifts layout */}
                <motion.div
                    className="absolute left-0 right-0 z-20 px-5 pb-4 bg-white border border-primary/40"
                    style={{ top: "100%", marginTop: "-1px" }}
                    initial={false}
                    animate={{
                        opacity: hovered ? 1 : 0,
                        y: hovered ? 0 : -4,
                        pointerEvents: hovered ? "auto" : "none",
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                >
                    <p className="text-neutral-content/50 pt-3 leading-relaxed border-t border-neutral-content/10">
                        {skill.desc}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

// ── Category tab ──────────────────────────────────────────────────────────────
const CategoryTab = ({
    cat,
    active,
    count,
    onClick,
}: {
    cat: Category;
    active: boolean;
    count: number;
    onClick: () => void;
}) => {
    const Icon = cat.icon;
    return (
        <button
            onClick={onClick}
            className={`relative flex items-center gap-2 px-4 py-2.5 uppercase tracking-widest border transition-all duration-200 overflow-hidden cursor-pointer
                ${active
                    ? "bg-neutral text-neutral-content border-primary/50"
                    : "border-base-content/10 text-base-content/40 hover:border-base-content/30 hover:text-base-content/70"
                }`}
        >
            {active && (
                <motion.span
                    layoutId="tab-bg"
                    className="absolute inset-0 bg-neutral"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
            )}
            <Icon size={12} className="relative z-10 shrink-0" />
            <span className="relative z-10">{cat.label}</span>
            <span className={`relative z-10 px-1 rounded-sm ${active ? "text-primary" : "text-base-content/30"}`}>
                {count}
            </span>
        </button>
    );
};

// ── Rank legend ───────────────────────────────────────────────────────────────
const RankLegend = () => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex items-center gap-4 flex-wrap"
    >
        <span className="uppercase tracking-widest text-base-content/25">Rank:</span>
        {(["S", "A", "B"] as const).map((r) => (
            <div key={r} className="flex items-center gap-1.5">
                <RankBadge rank={r} />
                <span className="text-base-content/30">
                    {r === "S" ? "Expert" : r === "A" ? "Proficient" : "Competent"}
                </span>
            </div>
        ))}
    </motion.div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
export const Skills = () => {
    const [active, setActive] = useState("All");
    const headRef = useRef(null);
    const headInView = useInView(headRef, { once: true });

    const filtered =
        active === "All" ? SKILLS : SKILLS.filter((s) => s.category === active);

    return (
        <section id="skills" className="relative w-full py-28 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-base-content/10" />

            <div className="max-w-7xl mx-auto px-6 md:px-16">

                {/* Heading */}
                <motion.div
                    ref={headRef}
                    initial={{ opacity: 0, x: -40 }}
                    animate={headInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16 select-none"
                >
                    <p className="uppercase tracking-widest text-base-content/40">- Chapter 04 -</p>
                    <BouncyText text="SKILL" className="text-8xl md:text-9xl uppercase" />
                    <BouncyText text="TREE." outlined className="text-8xl md:text-9xl uppercase" />
                    <div className="mt-8 flex items-center gap-5">
                        <div className="h-px w-20 bg-primary" />
                        <p className="uppercase text-base-content/40">Power levels unlocked</p>
                    </div>
                </motion.div>

                {/* Dark terminal container */}
                <div className="relative bg-neutral border border-neutral-content/10 overflow-hidden">


                    {/* Terminal titlebar */}
                    <div className="flex items-center gap-2 px-6 py-3 border-b border-neutral-content/8">
                        <span className=" uppercase tracking-widest text-neutral-content/25">
                            /manansala/skills
                        </span>
                        <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ repeat: Infinity, duration: 1.1 }}
                            className=" text-primary"
                        >
                            |
                        </motion.span>
                    </div>

                    {/* Filter tabs */}
                    <div className="flex flex-wrap gap-2 px-6 py-5 border-b border-neutral-content/8">
                        {CATEGORIES.map((cat) => {
                            const count =
                                cat.id === "All"
                                    ? SKILLS.length
                                    : SKILLS.filter((s) => s.category === cat.id).length;
                            return (
                                <CategoryTab
                                    key={cat.id}
                                    cat={cat}
                                    active={active === cat.id}
                                    count={count}
                                    onClick={() => setActive(cat.id)}
                                />
                            );
                        })}
                    </div>

                    {/* Skill grid */}
                    <div className="p-6 md:p-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.25 }}
                                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3"
                            >
                                {filtered.map((skill, i) => (
                                    <SkillCard key={skill.name} skill={skill} index={i} />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-content/8">
                        <RankLegend />
                        <p className="text-4xl text-neutral-content/5 select-none hidden md:block">04</p>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-px bg-base-content/10" />
        </section>
    );
};