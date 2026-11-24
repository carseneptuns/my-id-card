import { Link, useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    `px-3 py-1.5 rounded-full text-sm font-heading font-medium transition-colors ${
      location.pathname === path
        ? "bg-pink text-inkblack"
        : "text-cream hover:bg-white/10"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-forest/90 backdrop-blur border-b-2 border-black/10">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-cream font-heading font-bold text-lg">
          <FaStar className="text-softpink" />
          My ID Card
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/create" className={linkClass("/create")}>Create My ID</Link>
          <Link to="/my-cards" className={linkClass("/my-cards")}>My Cards</Link>
        </div>
      </div>
    </nav>
  );
}
