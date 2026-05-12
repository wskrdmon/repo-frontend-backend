import { useState } from 'react';
export default function PatchManagement() {
  // Le ponemos sus propias pilas internas
  const [patchTab, setPatchTab] = useState('network');

  // Funciones simuladas para la demo de mañana
  const showToast = (title: string, message: string) => {
    alert(`Notificación: ${title}\n${message}`);
  };

  const openReassignModal = (patchId: string) => {
    alert(`Abriendo panel para reasignar el parche: ${patchId}\n(Conexión al backend pendiente)`);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '4px' }}>Patch Management</h2>
        <div style={{ fontSize: '14px', color: '#8b92a8' }}>Manage patches across infrastructure</div>
      </div>

      {/* Patch Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '2px solid #1e2533' }}>
        <div 
          className={`tab ${patchTab === 'network' ? 'active' : ''}`}
          onClick={() => setPatchTab('network')}
          style={{ cursor: 'pointer' }}
        >
          🌍 Network & Perimeter
          <span style={{ marginLeft: '8px', fontSize: '12px', padding: '2px 8px', background: patchTab === 'network' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(139, 146, 168, 0.2)', borderRadius: '10px', color: '#ef4444' }}>10</span>
        </div>
        <div 
          className={`tab ${patchTab === 'application' ? 'active' : ''}`}
          onClick={() => setPatchTab('application')}
          style={{ cursor: 'pointer' }}
        >
          🌐 Application Security
          <span style={{ marginLeft: '8px', fontSize: '12px', padding: '2px 8px', background: patchTab === 'application' ? 'rgba(251, 146, 60, 0.2)' : 'rgba(139, 146, 168, 0.2)', borderRadius: '10px', color: '#fb923c' }}>17</span>
        </div>
        <div 
          className={`tab ${patchTab === 'servers' ? 'active' : ''}`}
          onClick={() => setPatchTab('servers')}
          style={{ cursor: 'pointer' }}
        >
          🖥️ Servers & Containers
          <span style={{ marginLeft: '8px', fontSize: '12px', padding: '2px 8px', background: patchTab === 'servers' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(139, 146, 168, 0.2)', borderRadius: '10px', color: '#ef4444' }}>20</span>
        </div>
      </div>

      {/* Network Patches */}
      {patchTab === 'network' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">🌍 Network & Perimeter Patches</div>
            <button className="btn btn-primary" onClick={() => showToast('Auto-Assign', 'Patches distributed to team')}>
              Auto-Assign All
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>CVE</th>
                <th>Asset</th>
                <th>Current → Target</th>
                <th>Severity</th>
                <th>Assigned</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: '#00d4ff', fontWeight: 600 }}>CVE-2024-3094</td>
                <td>Cisco ASA Firewall</td>
                <td>9.14.2 → 9.18.4</td>
                <td><div className="severity-badge severity-critical">CRITICAL</div></td>
                <td>Michael Torres</td>
                <td>
                  <button className="btn btn-secondary" onClick={() => openReassignModal('CVE-2024-3094')}>
                    Reassign
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Application Patches */}
      {patchTab === 'application' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">🌐 Application Security Patches</div>
            <button className="btn btn-primary" onClick={() => showToast('Auto-Assign', 'Patches distributed to team')}>
              Auto-Assign All
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>CVE</th>
                <th>Asset</th>
                <th>Current → Target</th>
                <th>Severity</th>
                <th>Assigned</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: '#00d4ff', fontWeight: 600 }}>CVE-2024-1234</td>
                <td>React Authentication Module</td>
                <td>16.14.0 → 18.2.0</td>
                <td><div className="severity-badge severity-critical">CRITICAL</div></td>
                <td>John Smith</td>
                <td>
                  <button className="btn btn-secondary" onClick={() => openReassignModal('CVE-2024-1234')}>
                    Reassign
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Server Patches */}
      {patchTab === 'servers' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">🖥️ Servers & Containers Patches</div>
            <button className="btn btn-primary" onClick={() => showToast('Auto-Assign', 'Patches distributed to team')}>
              Auto-Assign All
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>CVE</th>
                <th>Asset</th>
                <th>Current → Target</th>
                <th>Severity</th>
                <th>Assigned</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: '#00d4ff', fontWeight: 600 }}>CVE-2024-9012</td>
                <td>Linux Kernel</td>
                <td>5.15.0 → 6.1.0</td>
                <td><div className="severity-badge severity-critical">CRITICAL</div></td>
                <td>Lisa Martinez</td>
                <td>
                  <button className="btn btn-secondary" onClick={() => openReassignModal('CVE-2024-9012')}>
                    Reassign
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}