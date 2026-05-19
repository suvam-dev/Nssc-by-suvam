"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, } from "lucide-react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "ABOUT", href: "/about" },
    { name: "EVENTS", href: "/events" },
    { name: "GUEST LECTURES", href: "/guest-lectures" },
    { name: "GALLERY", href: "/gallery" },
    { name: "SCHEDULE", href: "/schedule" },
    { name: "SPONSORS", href: "/sponsors" },
    { name: "TEAM", href: "/teams" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <div className="flex justify-center w-full py-6 px-4">
      <div className="flex items-center justify-between px-6 py-3 bg-black border-light-50 border-2 shadow-[0_0_10px_4px_rgba(59,130,246,0.70)] rounded-full w-full max-w-[1400px] relative z-10">
        <div className="flex items-center">
          <motion.div
            className="flex items-center mr-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src="/assest/logo.png"
              alt="nssc-logo"
              className="h-8 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <div className="hidden text-black font-black tracking-tighter leading-none whitespace-nowrap">
              <span className="text-xl">NSSC</span>
            </div>
          </motion.div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center space-x-6">
          {navLinks.map((item) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <a
                href={item.href}
                className="text-sm text-white hover:text-[#00bfff] hover:underline hover:decoration-[#00bfff] hover:underline-offset-8 transition-all duration-300 font-bold whitespace-nowrap"
              >
                {item.name}
              </a>
            </motion.div>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <motion.div
          className="hidden xl:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <a
            href="/register"
            className="inline-flex items-center justify-center px-6 py-2 text-sm font-bold text-white hover:border-light-100 hover:text-black border-cyan-500 border-2 bg-black rounded-full hover:bg-cyan-500 animate-ease-linear  backdrop-blur-sm transition-all duration-300 whitespace-nowrap"
          >
            REGISTER
          </a>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className="xl:hidden flex items-center justify-center w-8 h-8 rounded-full"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
        >
          <Menu className="h-6 w-6 text-light-50" />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 pt-24 px-6 xl:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute top-6 right-6 p-2"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="h-6 w-6 text-gray-900" />
            </motion.button>
            <div className="flex flex-col items-center space-y-4">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <a
                    href={item.href}
                    className="text-base text-gray-900 font-bold hover:text-[#00bfff] hover:underline hover:decoration-[#00bfff] hover:underline-offset-8 transition-all duration-300"
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-6"
              >
                <a
                  href="/register"
                  className="inline-flex items-center justify-center w-full px-5 py-3 text-base font-bold text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
                  onClick={toggleMenu}
                >
                  REGISTER
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div >
  );
};

export default Navbar;