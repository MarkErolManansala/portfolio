import { motion } from "framer-motion";

export const Hero = () => {
    return (
        /* FIXED SIZE CONTAINER */
        <section className="relative w-full h-212.5 flex items-center justify-center overflow-hidden bg-[#1a1a1a]">

            {/* LAYER 1: THE BIG BACKGROUND IMAGE */}
            <div className="absolute inset-0 z-0">
                <motion.img
                    /* 
                       initial: starts slightly smaller or at 1
                       animate: scale: 1.2 acts as your 'Max Scale'
                    */
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 0.15 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    src="/pictures/me-bg.svg"
                    alt="background"
                    className="absolute inset-0 w-full  h-full object-cover max-w-7xl mx-auto pointer-events-none"
                />

                {/* Dark overlay to ensure text is readable */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#1a1a1a]/60 to-[#1a1a1a]" />
            </div>

            {/* LAYER 2: THE BACK TEXT (Clipped behind you) */}
            <div className="absolute inset-0 flex items-center justify-center z-10 select-none">
                <motion.h3
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-[20vw] font-black leading-none text-white/5 tracking-tighter uppercase"
                >
                    M E M
                </motion.h3>
            </div>

            <div className="absolute inset-0 flex justify-center items-end z-20 pointer-events-none">
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative h-[90%] w-auto flex justify-center items-end"
                >
                    <img
                        src="/pictures/me.png"
                        alt="Mem"
                        className="h-full w-auto object-contain brightness-110 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                    />

                    <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent" />
                </motion.div>
            </div>

            {/* LAYER 4: FRONT TEXT & BUTTONS (Sandwiching the image) */}
            <div className="relative z-30 flex flex-col items-center justify-center text-center px-4 mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    {/* Main Title overlapping your chest area */}
                    <h2 className="text-5xl md:text-8xl font-black text-white drop-shadow-2xl tracking-tighter uppercase">
                        HI, I'M <span className="text-primary">Mark Erol Manansala</span>
                    </h2>

                    <div className="mt-6 flex flex-col items-center">
                        <p className="max-w-md text-sm md:text-lg font-bold text-white uppercase tracking-[0.2em] bg-black/40 backdrop-blur-md px-6 py-2 border-y border-white/10">
                            Full-stack developer
                        </p>

                        <div className="mt-10 flex gap-6">
                            <button className="btn btn-primary btn-lg rounded-none px-10 shadow-[0_0_30px_rgba(var(--p),0.4)] hover:scale-105 transition-all">
                                VIEW WORK
                            </button>
                            <button className="btn btn-outline btn-lg rounded-none px-10 border-white text-white hover:bg-white hover:text-black transition-all">
                                CONTACT
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Glow Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/20 blur-[150px] rounded-full z-0" />

        </section>
    );
};