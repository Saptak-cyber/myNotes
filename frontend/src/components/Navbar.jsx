import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import LoginButton from "./LoginButton";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const { isAuthenticated, loading } = useAuth();

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-3xl font-bold text-primary font-mono tracking-tight hover:text-primary/80 transition-colors">
            ThinkBoard
          </Link>
          <div className="flex items-center gap-4">
            {loading ? (
              <div className="skeleton w-20 h-10"></div>
            ) : isAuthenticated ? (
              <>
                <Link to="/create" className="btn btn-primary">
                  <PlusIcon className="size-5" />
                  <span>New Note</span>
                </Link>
                <UserMenu />
              </>
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
