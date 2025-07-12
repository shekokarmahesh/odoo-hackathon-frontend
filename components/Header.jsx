import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/all-questions");
  };

  return (
    <header className="w-full bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-foreground">StackIt</h1>
          </div>
          {isAuthenticated ? (
            <>
              <button
                onClick={handleHomeClick}
                className="btn btn-outline btn-sm"
              >
                Home
              </button>

              <span className="text-sm text-base-content/70">
                Welcome, {user?.profile?.firstName || user?.username}
              </span>

              <button
                onClick={()=> logout()}
                className="btn btn-outline btn-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="btn btn-active btn-primary rounded-full px-5"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
