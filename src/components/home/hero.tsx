import { motion } from "framer-motion";
import { useEffect, useState } from "react";


export const Grid = () => {
    const spacing = 40;
    const [hovered, setHovered] = useState<number | null>(null);
    const [dims, setDims] = useState({ cols: 0, rows: 0 });

    useEffect(() => {
        const update = () => setDims({
            cols: Math.ceil(window.innerWidth / spacing) + 1,
            rows: Math.ceil(window.innerHeight / spacing) + 1,
        });
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const { cols, rows } = dims;
    const total = cols * rows;

    const getAlpha = (i: number) => {
        if (hovered === null) return 0;
        const hCol = hovered % cols;
        const hRow = Math.floor(hovered / cols);
        const col = i % cols;
        const row = Math.floor(i / cols);
        const dist = Math.sqrt((col - hCol) ** 2 + (row - hRow) ** 2);
        return Math.max(0, 1 - dist / 4);
    };

    return (
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
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
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                        style={{
                            width: spacing,
                            height: spacing,
                            borderRight: "0.5px solid rgba(110,140,200,0.12)",
                            borderBottom: "0.5px solid rgba(110,140,200,0.12)",
                            backgroundColor: `rgba(110,140,200,${(getAlpha(i) * 0.08).toFixed(3)})`,
                            transition: "background-color 0.2s ease",
                        }}
                    />
                ))}
            </div>
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background: `
                    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(110,140,200,0.08) 0%, transparent 70%),
                    linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.6) 100%),
                    linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.3) 100%)
                `,
                }}
            />
        </div>
    );
};

export const Hero = () => {
    return (
        <section className="relative w-full flex pt-20  items-center overflow-hidden">
            <Grid />
            <div className="relative z-30 w-full max-w-7xl  mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                <motion.div
                    initial={{ x: 40 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative flex md:hidden justify-center items-end pt-10"
                >
                    <img
                        src="/pictures/me-square.webp"
                        alt="Mark Erol Manansala"
                        className=" w-56 p-4 pb-0 border-2 rounded-2xl object-contain brightness-110  filter-[drop-shadow(0_4px_6px_rgba(0,0,0,1))]"
                    />
                </motion.div>
                {/* LEFT — TEXT CONTENT */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col z-50 items-center md:items-start text-center md:text-left select-none"
                >
                    <h2 className="text-6xl xl:text-8xl font-black uppercase  ">
                        HI, I'M<br />
                        <span className="text-outlined">Mark Erol</span><br />
                        Manansala
                    </h2>

                    <div className="mt-6 w-16 h-0.5 bg-primary" />

                    <p className="mt-6 font-bold tracking-[0.4em] uppercase text-primary mb-4">
                        Full-stack Web Developer
                    </p>

                    <p className="mt-6 max-w-sm leading-relaxed text-base-content/70">
                        I build fast, scalable web apps — CRMs, full-stack platforms, and everything in between.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
                        <button className="btn btn-primary font-black uppercase rounded-none px-10">
                            VIEW WORK+
                        </button>
                        <button className="btn uppercase rounded-none px-10">
                            CONTACT
                        </button>
                    </div>
                </motion.div>

                {/* RIGHT — IMAGE */}
                <motion.div
                    initial={{ x: 40 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative hidden md:flex justify-center items-end "
                >
                    <img
                        src="/pictures/me.webp"
                        alt="Mark Erol Manansala"
                        className="h-full w-auto object-contain brightness-110 scale-x-[-1] filter-[drop-shadow(0_4px_6px_rgba(0,0,0,1))]"
                    />
                </motion.div>

            </div>
        </section>
    );
};