// components/NavigationBar.jsx
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const NavigationBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4">
                <div className="navbar-start">
                    <h1 className="text-xl font-bold">.mem</h1>
                </div>

                {/* Desktop */}
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a href="#projects" className="hover:text-primary">Projects</a></li>
                        <li><a href="#about" className="hover:text-primary">About</a></li>
                        <li><a href="#contact" className="hover:text-primary">Contact</a></li>
                        <li>
                            <a href="/resume.pdf" download className="btn btn-primary rounded-2xl">
                                Resume
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Mobile button */}
                <div className="navbar-end lg:hidden">
                    <button className="btn btn-ghost btn-circle" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            {isOpen && (
                <ul className="absolute top-16 left-0 w-full bg-base-100 shadow-lg menu menu-vertical lg:hidden">
                    <li><a href="#projects" onClick={() => setIsOpen(false)}>Projects</a></li>
                    <li><a href="#about" onClick={() => setIsOpen(false)}>About</a></li>
                    <li><a href="#contact" onClick={() => setIsOpen(false)}>Contact</a></li>
                    <li><a href="/resume.pdf" download className="btn btn-primary m-2">Resume</a></li>
                </ul>
            )}
        </nav>
    );
};