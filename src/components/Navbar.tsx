import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { HashLink } from "react-router-hash-link";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    // { name: "Home", path: "/" },
    { name: "Platoons", path: "/#platoons" },
    { name: "Commander's Corner", path: "/#commanders-corner" },
    { name: "Gallantry Awards", path: "/#gallantry-awards" },
    { name: "History", path: "/#history" },
    { name: "Events & News", path: "/#events-news" },
    // { name: "Schedules", path: "/#schedules" },


  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname + location.hash === path;
  };

  return (
    <header className="bg-card border-b border-border shadow-elegant sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://facultytick.com/wp-content/uploads/2022/03/Military-College-Of-Electronics-Mechanical-Engineering.jpg"
              alt="MCEME Logo"
              className="h-12 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-primary">MCEME</h1>
              <p className="text-xs text-muted-foreground">CTW Portal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}   // e.g. "/#history"
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive(item.path) ? "text-primary" : "text-muted-foreground"
                  }`}
              >
                {item.name}
              </a>
            ))}

            <Button asChild variant="hero" size="sm">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild variant="hero" size="sm">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-accent"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${isActive(item.path) ? "text-primary" : "text-muted-foreground"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild variant="hero" size="sm" className="w-fit">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              </Button>
              <Button asChild variant="hero" size="sm" className="w-fit">
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
              </Button>

            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;