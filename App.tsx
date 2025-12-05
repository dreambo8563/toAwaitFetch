import React from 'react';
import { HashRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import Home from './pages/Home';
import Configuration from './pages/Configuration';
import BestPractices from './pages/BestPractices';
import ErrorHandling from './pages/ErrorHandling';
import SearchBox from './components/SearchBox';

const Navbar = () => {
  const location = useLocation();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false);
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 flex items-center justify-center border-b border-white/10 bg-background-dark/80 backdrop-blur-sm">
      <nav className="flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-4 text-white group">
          <div className="size-6 text-primary transition-transform group-hover:scale-110">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="hidden sm:block text-white text-lg font-bold">toAwaitFetch</h2>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/config" className={`text-sm font-medium transition-colors ${isActive('/config') ? 'text-white' : 'text-slate-300 hover:text-white'}`}>配置详解</Link>
          <Link to="/practices" className={`text-sm font-medium transition-colors ${isActive('/practices') ? 'text-white' : 'text-slate-300 hover:text-white'}`}>最佳实践</Link>
          <Link to="/debug" className={`text-sm font-medium transition-colors ${isActive('/debug') ? 'text-white font-bold relative' : 'text-slate-300 hover:text-white'}`}>
            错误调试
            {isActive('/debug') && <span className="absolute -bottom-6 left-0 right-0 h-0.5 bg-primary rounded-full"></span>}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* 桌面端搜索 */}
          <SearchBox className="hidden sm:block" />
          
          {/* 移动端搜索按钮 */}
          <button
            onClick={() => setIsMobileSearchOpen(true)}
            className="sm:hidden p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="搜索"
          >
            <span className="material-symbols-outlined text-xl">search</span>
          </button>
        </div>
      </nav>
      
      {/* 移动端搜索覆盖层 */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 z-50 bg-background-dark/95 backdrop-blur-sm sm:hidden">
          <div className="flex items-center gap-4 p-4 border-b border-white/10">
            <button
              onClick={() => setIsMobileSearchOpen(false)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>
            <SearchBox className="flex-1" />
          </div>
          <div className="p-4 text-center text-slate-400 text-sm">
            <p>使用 Ctrl+K 或 / 键快速搜索</p>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = () => (
  <footer className="flex justify-center border-t border-white/10 bg-background-dark mt-auto">
    <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
      <p className="text-sm text-slate-400">© 2024 toAwaitFetch. All rights reserved.</p>
      <div className="flex items-center gap-6">
        <Link to="/config" className="text-sm text-slate-300 transition-colors hover:text-white">文档</Link>
        <a href="#" className="text-sm text-slate-300 transition-colors hover:text-white">社区</a>
        <a href="#" className="text-sm text-slate-300 transition-colors hover:text-white">关于</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <HashRouter>
      <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark font-sans text-slate-200 selection:bg-primary/30">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/config" element={<Configuration />} />
            <Route path="/practices" element={<BestPractices />} />
            <Route path="/debug" element={<ErrorHandling />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}