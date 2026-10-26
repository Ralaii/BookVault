import { BsSun } from "react-icons/bs";
import { RiMoonLine } from "react-icons/ri";

function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      className="bg-white text-zinc-700 border border-zinc-300 hover:bg-zinc-200
        p-3 rounded cursor-pointer
        dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-700"
    >
      {isDark ? <BsSun /> : <RiMoonLine />}
    </button>
  );
}

export default ThemeToggle;