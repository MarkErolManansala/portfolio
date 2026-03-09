// components/home/projects.tsx
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { BouncyText } from "../ui/bouncing-letter";


// ── Manga Corners ─────────────────────────────────────────────────────────────
const MangaCorners = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
    const s = size === "sm" ? "w-4 h-4" : size === "lg" ? "w-8 h-8" : "w-6 h-6";
    const b = size === "sm" ? "border-t border-l" : "border-t-2 border-l-2";
    return (
        <>
            <span className={`absolute top-0 left-0 ${s} ${b} border-base-content/30`} />
            <span className={`absolute top-0 right-0 ${s} border-t-2 border-r-2 border-base-content/30`} />
            <span className={`absolute bottom-0 left-0 ${s} border-b-2 border-l-2 border-base-content/30`} />
            <span className={`absolute bottom-0 right-0 ${s} border-b-2 border-r-2 border-base-content/30`} />
        </>
    );
};

// ── Speed Lines ───────────────────────────────────────────────────────────────
const SpeedLines = () => (
    <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
    >
        {Array.from({ length: 32 }, (_, i) => {
            const angle = (i / 32) * 360;
            const rad = (angle * Math.PI) / 180;
            return (
                <line
                    key={i}
                    x1="50" y1="50"
                    x2={50 + Math.cos(rad) * 90}
                    y2={50 + Math.sin(rad) * 90}
                    stroke="currentColor"
                    strokeWidth="0.3"
                />
            );
        })}
    </svg>
);

// ── Types & Data ──────────────────────────────────────────────────────────────
interface Project {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    github?: string;
    live?: string;
    accent: string;
    span: "wide" | "tall" | "normal";
    image?: string;
}

const PROJECTS: Project[] = [
    {
        id: 1,
        title: "CRM NEXUS",
        subtitle: "Full-Stack CRM Platform",
        description:
            "A battle-hardened CRM built with Laravel + Inertia.js. Pipeline management, cron-driven automation, and Eloquent-powered analytics.",
        tags: ["Laravel", "React", "Inertia.js", "MySQL"],
        github: "#",
        live: "#",
        accent: "bg-primary/10",
        span: "normal",
    },
    {
        id: 2,
        title: "QUEUE DEMON",
        subtitle: "Background Job Orchestrator",
        description:
            "Tames thousands of async jobs via Laravel Queues + Redis. Visual dashboard to monitor, retry, and kill jobs in real-time.",
        tags: ["Laravel", "Redis", "React", "Horizon"],
        github: "#",
        accent: "bg-secondary/10",
        span: "normal",
    },
    {
        id: 3,
        title: "INVOKEFORM",
        subtitle: "Dynamic Form Builder",
        description:
            "Drag-and-drop form builder. Zod schemas auto-generated on the backend — React Hook Form + TypeScript on the front.",
        tags: ["React", "TypeScript", "Zod", "Laravel"],
        live: "#",
        accent: "bg-accent/10",
        span: "normal",
    },
    {
        id: 4,
        title: "SHADOW API",
        subtitle: "RESTful API Gateway",
        description:
            "High-performance API layer: rate limiting, JWT auth, webhook delivery. Handles 10k+ req/min with zero-downtime deploys.",
        tags: ["Laravel", "Docker", "Redis", "CI/CD"],
        github: "#",
        live: "#",
        accent: "bg-primary/10",
        span: "normal",
    },
];

// ── Project Card ──────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    const [hovered, setHovered] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 50, skewY: 1.5 }}
            animate={inView ? { opacity: 1, y: 0, skewY: 0 } : {}}
            transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`relative overflow-hidden border border-base-content/10 bg-base-100 cursor-pointer group
        ${project.span === "wide" ? "md:col-span-2" : ""}
        ${project.span === "tall" ? "md:row-span-2" : ""}
      `}
        >
            {project.image && (
                <motion.div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${project.image})` }}
                    animate={{ filter: hovered ? "grayscale(0%)" : "grayscale(100%)" }}
                    transition={{ duration: 0.4 }}
                />
            )}
            {/* Ink flood */}
            <motion.div
                className={`absolute inset-0 ${project.accent}`}
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.4 }}
            />

            {/* Speed lines */}
            <motion.div
                className="absolute inset-0 text-base-content"
                animate={{ opacity: hovered ? 0.04 : 0 }}
                transition={{ duration: 1 }}
            >
                <SpeedLines />
            </motion.div>

            <MangaCorners />

            {/* Issue tag */}
            <div className="absolute top-5 right-6 font-black text-sm text-base-content/15  uppercase select-none">
                #{String(project.id).padStart(2, "0")}
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-between min-h-70">
                <div>
                    {/* Title */}
                    <motion.h3
                        animate={{ x: hovered ? 6 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-4xl md:text-5xl font-black uppercase  leading-none"
                    >
                        {project.title}
                    </motion.h3>

                    {/* Subtitle */}
                    <p className="mt-3 text-sm md:text-base font-bold  uppercase text-primary">
                        {project.subtitle}
                    </p>

                    {/* Divider */}
                    <div className="mt-4 h-px w-12 bg-base-content/20" />

                    {/* Description */}
                    <p className="mt-4 text-base md:text-lg text-base-content/60 leading-relaxed max-w-lg">
                        {project.description}
                    </p>
                </div>

                <div className="mt-8 flex flex-col gap-5">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs md:text-sm font-black uppercase  px-3 py-1 border border-base-content/15 text-base-content/40"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* CTA buttons */}
                    <div className="flex gap-3">
                        {project.github && (
                            <motion.a
                                href={project.github}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                className="btn btn-sm md:btn-md btn-ghost gap-2 rounded-none border border-base-content/15 uppercase font-black"
                            >
                                <Github size={16} /> Code
                            </motion.a>
                        )}
                        {project.live && (
                            <motion.a
                                href={project.live}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                className="btn btn-sm md:btn-md btn-primary gap-2 rounded-none uppercase font-black"
                            >
                                Live <ArrowUpRight size={16} />
                            </motion.a>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom sweep bar */}
            <motion.div
                className="absolute bottom-0 left-0 h-0.75 bg-primary"
                style={{ transformOrigin: "left" }}
                animate={{ scaleX: hovered ? 1 : 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
        </motion.article>
    );
};

// ── Main Section ──────────────────────────────────────────────────────────────
export const Projects = () => {
    const headRef = useRef(null);
    const headInView = useInView(headRef, { once: true });

    return (
        <section id="projects" className="relative w-full min-h-screen py-28 overflow-hidden">

            {/* ── Section heading ── */}
            <div className="max-w-7xl mx-auto px-6 md:px-16">
                <motion.div
                    ref={headRef}
                    initial={{ opacity: 0, x: -40 }}
                    animate={headInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-20 select-none"
                >
                    <p className="text-sm font-black  uppercase text-primary mb-4">
                        — Chapter 02 —
                    </p>

                    {/* Heading + Dragon side by side */}
                    <BouncyText text="MY" className="text-9xl font-black uppercase" />
                    <BouncyText text="WORKS" outlined className="text-9xl font-black uppercase" />

                    <div className="mt-8 flex items-center gap-5">
                        <div className="h-px w-20 bg-primary" />
                        <p className="text-base font-black uppercase  text-base-content/40">
                            Selected projects
                        </p>
                    </div>
                </motion.div>

                {/* ── Panel grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-auto">
                    {PROJECTS.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>

                {/* ── View all ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mt-16 flex justify-center"
                >
                    <button className="btn btn-lg btn-outline rounded-none uppercase font-black  px-16 gap-3">
                        View All Projects
                        <ArrowUpRight size={20} />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};