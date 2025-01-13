import { Link } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi"; // Import sun and moon icons

const Header = ({ isDarkMode, setIsDarkMode }) => {

  return (
    <header className="p-4 flex flex-wrap justify-between items-center">
      <Link to="/jobs">
        <h1 className="text-xl font-bold">Job Gap</h1>
      </Link>
      <div className="flex flex-wrap gap-4 mt-4 sm:mt-0">
        <Link
          to="/jobs/saved"
          className="px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-700 transition-all duration-300"
        >
          Saved Jobs
        </Link>
        <button
          onClick={() => setIsDarkMode((prev) => !prev)}
          className="w-10 h-10 flex items-center justify-center p-2 rounded-full text-white bg-blue-500 hover:bg-blue-700 transition-all duration-300"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;