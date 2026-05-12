import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

// Importamos tus muebles de la misma carpeta
import Sidebar from './Sidebar'; 
import Header from './Header';
// Importamos tu pintura desde la carpeta src
import '../../App.css';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Cerrar el sidebar automáticamente al cambiar de página
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
      
      {/* Fondo oscuro para móvil */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Menú Lateral */}
      <Sidebar 
        isOpen={isSidebarOpen} 
      />

      {/* Contenedor Principal */}
      <div className="main-container">
        <Header onOpenSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <div className="content">
          <Outlet />
        </div>
      </div>

    </div>
  );
}