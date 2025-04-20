import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiBell, FiUser, FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDoctorDropdownOpen, setIsDoctorDropdownOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, text: "New appointment available", read: false },
    { id: 2, text: "Health check reminder", read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { 
      name: "Books", 
      path: "/doctors",
      dropdown: [
        { name: "Adventure", path: "/doctors/find" },
        { name: "Science", path: "/doctors/specialties" },
        { name: "Story", path: "/doctors/appointment" },
      ]
    },
    { name: "About", path: "/about" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 p-5 left-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-orange-300 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-around p-10 h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-orange-300 ">
                Libria
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div 
                key={item.name}
                className="relative group"
                onMouseEnter={() => item.dropdown && setIsDoctorDropdownOpen(true)}
                onMouseLeave={() => item.dropdown && setIsDoctorDropdownOpen(false)}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center  text-[15px] font-medium transition-colors 
                    ${isActive ? 'text-orange-300' : 'text-white hover:text-orange-300'}`
                  }
                >
                  {item.name}
                  {item.dropdown && <FiChevronDown className="ml-1 h-4 w-4" />}
                </NavLink>

                {item.dropdown && isDoctorDropdownOpen && (
                  <div className="absolute top-full left-0 w-48 mt-2 bg-white rounded-lg shadow-xl border border-gray-100">
                    {item.dropdown.map((subItem) => (
                      <NavLink
                        key={subItem.name}
                        to={subItem.path}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                      >
                        {subItem.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-600 hover:text-blue-600 relative rounded-lg hover:bg-gray-50 transition-colors"
            >

            </button>
            <div className="hidden md:flex items-center space-x-4">
              <NavLink
                to="/login"
                className="px-6 py-2.5 text-sm font-semibold text-orange-300 hover:bg-blue-50 rounded-full transition-colors"
              >
                More
              </NavLink>
              <NavLink
                to="/register"
                className="px-6 py-2.5 text-sm font-semibold border border-orange-300 text-white duration-700 hover:bg-orange-400  rounded-full hover:shadow-lg transition-all transform hover:scale-105"
              >
            Book now
              </NavLink>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-50"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-20 inset-x-0 bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 pt-4 pb-6 space-y-4">
              {navItems.map((item) => (
                <div key={item.name} className="border-b border-gray-100">
                  <NavLink
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => 
                      `block px-4 py-3 text-base font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'}`
                    }
                  >
                    {item.name}
                  </NavLink>
                  {item.dropdown && item.dropdown.map((subItem) => (
                    <NavLink
                      key={subItem.name}
                      to={subItem.path}
                      onClick={() => setIsOpen(false)}
                      className="block pl-8 pr-4 py-2 text-sm text-gray-500 hover:text-blue-600"
                    >
                      {subItem.name}
                    </NavLink>
                  ))}
                </div>
              ))}
              <div className="pt-4 space-y-3">
                <NavLink
                  to="/login"
                  className="block w-full px-4 py-3 text-center text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  className="block w-full px-4 py-3 text-center text-white bg-gradient-to-r from-blue-600 to-teal-500 rounded-full hover:shadow-lg"
                >
                  Get Started
                </NavLink>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute right-4 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                >
                  <p className="text-sm text-gray-700">{notification.text}</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;