import { useState } from "react";
import { File, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";

export const NavigationBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setVisible(false);
        } else {
            setVisible(true);
        }
    });

    return (
        <>
            <div
                className="fixed top-0 left-0 w-full h-4 z-60 pointer-events-auto"
                onMouseEnter={() => setVisible(true)}
            />
            <motion.nav
                // Important: Also set visible to true when hovering the nav itself
                // so it doesn't hide while the user is trying to click a link
                onMouseEnter={() => setVisible(true)}

                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-110%" },
                }}
                animate={visible ? "visible" : "hidden"}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed top-0 z-50 w-full px-4 py-4"
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

        </>
    );
};