import { useState } from 'react';
import VulnDrawer from '../components/VulnDrawer';

export default function Dashboard() {
  // 1. Estados para el panel lateral
  const [vulnDrawerOpen, setVulnDrawerOpen] = useState(false);
  const [selectedVuln, setSelectedVuln] = useState<string | null>(null);

  // 2. ESTADO NUEVO: Para las notificaciones azules (Toasts)
  const [toastMessage, setToastMessage] = useState<{ title: string; message: string } | null>(null);

  // 3. Función para abrir el panel
  const openVulnDrawer = (cveId: string) => {
    setSelectedVuln(cveId);
    setVulnDrawerOpen(true);
  };

  // 4. Función para cerrar el panel
  const closeVulnDrawer = () => {
    setVulnDrawerOpen(false);
  };

  // 5. FUNCIÓN AJUSTADA: Ahora sí muestra el Toast en pantalla
  const handleShowToast = (title: string, message: string) => {
    setToastMessage({ title, message });
    // Se borra solo después de 3 segundos como en tu código original
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Risk Score Gauge */}
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Risk Score</h3>
            <div style={{ fontSize: '48px', fontWeight: '700', color: '#fb923c', marginBottom: '8px' }}>
              6.8
            </div>
            <div style={{ fontSize: '14px', color: '#8b92a8' }}>MODERATE</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div className="card">
            <div className="card-body">
              <div style={{ fontSize: '36px', fontWeight: '700', color: '#ef4444', marginBottom: '8px' }}>14</div>
              <div style={{ fontSize: '14px', color: '#8b92a8' }}>Issues Críticos</div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div style={{ fontSize: '36px', fontWeight: '700', color: '#fb923c', marginBottom: '8px' }}>33</div>
              <div style={{ fontSize: '14px', color: '#8b92a8' }}>Alta Prioridad</div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div style={{ fontSize: '36px', fontWeight: '700', color: '#10b981', marginBottom: '8px' }}>142</div>
              <div style={{ fontSize: '14px', color: '#8b92a8' }}>Resueltos Este Mes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Vulnerabilities */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">📋 Vulnerabilidades Recientes</div>
          <button className="btn btn-secondary">Ver Todas</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>CVE ID</th>
              <th>Descripción</th>
              <th>Asset</th>
              <th>Severidad</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ cursor: 'pointer' }} onClick={() => openVulnDrawer('CVE-2024-1234')}>
              <td style={{ fontWeight: 600, color: '#00d4ff' }}>CVE-2024-1234</td>
              <td>SQL Injection en autenticación</td>
              <td>api.company.com</td>
              <td><div className="severity-badge severity-critical">CRITICAL</div></td>
              <td style={{ color: '#fb923c' }}>In Progress</td>
            </tr>
            <tr style={{ cursor: 'pointer' }} onClick={() => openVulnDrawer('CVE-2024-5678')}>
              <td style={{ fontWeight: 600, color: '#00d4ff' }}>CVE-2024-5678</td>
              <td>XSS en perfil de usuario</td>
              <td>portal.company.com</td>
              <td><div className="severity-badge severity-high">HIGH</div></td>
              <td style={{ color: '#ef4444' }}>Open</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Drawer del Panel Lateral */}
      <VulnDrawer 
        vulnDrawerOpen={vulnDrawerOpen}
        closeVulnDrawer={closeVulnDrawer}
        selectedVuln={selectedVuln}
        showToast={handleShowToast}
      />

      {/* 6. TOAST REAL: Copiado del Cuaderno 1 */}
      {toastMessage && (
        <div className="toast">
          <div className="toast-title">{toastMessage.title}</div>
          <div className="toast-message">{toastMessage.message}</div>
        </div>
      )}
    </div>
  );
}