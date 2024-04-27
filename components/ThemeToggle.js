// components/ThemeToggle.js
import { useTheme } from '../context/ThemeContext'; // Adjust the path as necessary
import { IoSunnyOutline, IoSunnySharp, IoMoonOutline, IoMoonSharp } from "react-icons/io5";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    const handleThemeToggle = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button onClick={handleThemeToggle} className="text-lg p-2 rounded-full">
            {theme === 'dark' ? (
                <IoMoonSharp className="text-light-primary" />
            ) : (
                <IoSunnySharp className="text-dark-primary" />
            )}
        </button>
    );
};

export default ThemeToggle;
