import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext'; 

interface HeaderProps {
  onOpenSidebar: () => void;
}

export default function Header({ onOpenSidebar }: HeaderProps) {
  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { user, profile, signOut } = useAuth(); 
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Diccionario manual de títulos para que no dependa de archivos externos
  const titles: { [key: string]: string } = {
    '/dashboard': 'Security Dashboard',
    '/vulnerabilities': 'Vulnerability Hub',
    '/ai-pentesting': 'AI Pentesting Engine',
    '/patches': 'Patch Management',
    '/team': 'Team & Assets',
    '/reports': 'Security Reports',
    '/settings': 'Settings'
  };

  const pageTitle = titles[location.pathname] || 'Dani-ETH';
  const currentLang = i18n.language.startsWith('en') ? 'en' : 'es';

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const initial = (
    profile?.name || user?.displayName || user?.email || 'U'
  ).charAt(0).toUpperCase();

  return (
    <header className="fixed top-0 right-0 z-20 left-0 lg:left-[260px] h-16 bg-bg-secondary border-b border-border-primary flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-3 min-w-0">
        <button 
          type="button" 
          onClick={onOpenSidebar} 
          className="lg:hidden w-9 h-9 rounded-md bg-bg-tertiary border border-border-secondary flex items-center justify-center"
        >
          ☰
        </button>
        {/* Aquí es donde forzamos el título */}
        <h2 className="text-lg lg:text-xl font-semibold text-white truncate">
          Dani-ETH / <span className="text-accent-cyan">{pageTitle}</span>
        </h2>
      </div>

      <div className="flex items-center gap-2 lg:gap-3">
        <select 
          value={currentLang} 
          onChange={(e) => i18n.changeLanguage(e.target.value)} 
          className="bg-bg-tertiary border border-border-secondary rounded-md px-2 py-1.5 text-xs text-white outline-none"
        >
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>

        <button 
          type="button" 
          onClick={toggleTheme} 
          className="w-9 h-9 rounded-md bg-bg-tertiary border border-border-secondary flex items-center justify-center"
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>

        <div className="relative">
          <div 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center text-sm font-semibold text-white cursor-pointer"
          >
            {initial}
          </div>

          {isMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)}></div>
              <div className="absolute right-0 mt-2 w-64 bg-bg-secondary border border-border-primary rounded-lg shadow-2xl z-20 py-2">
                <div className="px-4 py-3 border-b border-border-primary">
                  <p className="text-sm font-bold text-white truncate">
                    {profile?.name || user?.displayName || 'Usuario'}
                  </p>
                  <p className="text-xs text-text-secondary truncate">
                    {user?.email}
                  </p>
                </div>
                <div className="p-1">
                  <button 
                    onClick={handleLogout} 
                    className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-md flex items-center gap-2"
                  >
                    <span>🚪</span> Cerrar Sesión
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}