const Header = () => {
  return (
    <header className="w-full bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-foreground">StackIt</h1>
          </div>

          {/* Login Button */}
          <button className="btn btn-active btn-primary rounded-full px-5">Login</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
