import { Link } from "react-router-dom"
import SearchInput from "../SearchInput"
import { navLinks } from "./navLinks"

function NavMobileMenu({ open, onClose}) {
  if (!open) return null
  return(
    <div className="md:hidden flex flex-col gap-4 border-t border-zinc-200 px-4 py-4 font-semibold dark:border-zinc-700">
      <SearchInput className="w-full"/>
      
      {navLinks.map(({ to, label, icon}) => (
        <Link
          key={label}
          to={to}
          onClick={onClose}
          className="flex items-center gap-2"
        >
          {icon}{label}
        </Link>
      ))}
    </div>
  )
}

export default NavMobileMenu;