import { useState, useEffect } from "react";
import { File, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const NavigationBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastY, setLastY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setVisible(currentY < lastY || currentY < 10); // show when scrolling up or at top
            setLastY(currentY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastY]);

    return (
        <motion.nav
            animate={{ y: visible ? 0 : "-120%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 z-50 w-full px-4 py-2"
        >
            <div className="relative max-w-7xl mx-auto w-full bg-white border-2 rounded-xl flex items-center justify-between px-4">

                <div className="navbar-start">
                    <h1 className="text-2xl font-bold">.mem</h1>
                </div>

                {/* Desktop */}
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-base">
                        <li><a href="#projects" className="text-base hover:bg-black hover:text-white rounded-sm">Projects</a></li>
                        <li><a href="#about" className="text-base hover:bg-black hover:text-white rounded-sm">About</a></li>
                        <li><a href="#contact" className="text-base hover:bg-black hover:text-white rounded-sm">Contact</a></li>
                        <li>
                            <a href="/resume.pdf" download className="hover:bg-black hover:text-white rounded-sm">
                                Resume <File />
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Mobile button */}
                <div className="navbar-end lg:hidden">
                    <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full mt-2 w-full left-0 right-0 bg-white shadow-lg menu menu-vertical lg:hidden text-base rounded-xl border"
                        >
                            <li><a href="#projects" className="text-base py-3" onClick={() => setIsOpen(false)}>Projects</a></li>
                            <li><a href="#about" className="text-base py-3" onClick={() => setIsOpen(false)}>About</a></li>
                            <li><a href="#contact" className="text-base py-3" onClick={() => setIsOpen(false)}>Contact</a></li>
                            <li><a href="/resume.pdf" download className="btn btn-primary text-base m-2">Resume</a></li>
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};