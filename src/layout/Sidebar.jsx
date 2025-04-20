import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

 function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar Toggle Button */}
      <button
        className="p-3 text-white bg-blue-600 fixed top-4 left-4 rounded-md z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed left-0 top-0 h-full w-60 bg-blue-700 text-white p-5 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6">Menu</h2>
        <ul className="space-y-4">
          <li className="hover:text-gray-300 cursor-pointer">Dashboard</li>
          <li className="hover:text-gray-300 cursor-pointer">Profile</li>
          <li className="hover:text-gray-300 cursor-pointer">Settings</li>
          <li className="hover:text-gray-300 cursor-pointer">Logout</li>
        </ul>
      </motion.div>
    </div>
  );
}
export default Sidebar;