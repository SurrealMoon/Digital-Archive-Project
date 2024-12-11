import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ sections, activeSection, setActiveSection }) => {
  return (
    <div>
      {sections.map((section) => (
        <Link
          key={section.name}
          to={section.path}
          onClick={() => setActiveSection(section.name)}
          className={`block px-2 py-3 mb-1 text-sm rounded ${
            activeSection === section.name ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
          }`}
        >
          {section.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
