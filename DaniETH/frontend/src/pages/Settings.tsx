import React from 'react';

interface SettingsProps {
  showToast: (title: string, message: string) => void;
}

export const Settings: React.FC<SettingsProps> = ({ showToast }) => {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '4px' }}>Settings</h2>
        <div style={{ fontSize: '14px', color: '#8b92a8' }}>Configure system preferences and team permissions</div>
      </div>

      {/* General Settings */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div className="card-title">⚙️ General Settings</div>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {/* Theme Selection */}
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Theme</div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div 
                  style={{ 
                    flex: 1,
                    padding: '16px',
                    background: '#1a1f2e',
                    border: '2px solid #00d4ff',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>🌙</div>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>Dark</div>
                  <div style={{ fontSize: '11px', color: '#00d4ff', marginTop: '4px' }}>Active</div>
                </div>
                <div 
                  style={{ 
                    flex: 1,
                    padding: '16px',
                    background: '#1a1f2e',
                    border: '2px solid #2a3144',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                  onClick={() => showToast('Theme', 'Light theme coming soon')}
                >
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>☀️</div>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>Light</div>
                  <div style={{ fontSize: '11px', color: '#8b92a8', marginTop: '4px' }}>Coming Soon</div>
                </div>
              </div>
            </div>

            {/* Language Selection */}
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Language</div>
              <select 
                className="lang-selector" 
                style={{ width: '100%', padding: '12px 16px', fontSize: '14px' }}
                onChange={(e) => showToast('Language Changed', `Language set to ${e.target.options[e.target.selectedIndex].text}`)}
              >
                <option value="en">🇬🇧 English</option>
                <option value="es">🇪🇸 Español</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="de">🇩🇪 Deutsch</option>
                <option value="zh">🇨🇳 中文</option>
              </select>
            </div>

            {/* AI Workers */}
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>
                AI Engine Workers: <span id="worker-display">8</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="16" 
                defaultValue="8"
                style={{ 
                  width: '100%',
                  height: '6px',
                  background: '#1a1f2e',
                  borderRadius: '3px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
                onChange={(e) => {
                  const display = document.getElementById('worker-display');
                  if (display) display.textContent = e.target.value;
                  showToast('Workers Updated', `AI engine now using ${e.target.value} workers`);
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#8b92a8', marginTop: '8px' }}>
                <span>1</span>
                <span>16</span>
              </div>
              <div style={{ fontSize: '12px', color: '#8b92a8', marginTop: '8px' }}>
                More workers = faster scans, higher CPU usage
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Permissions */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">👥 Team Member Permissions</div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Portal Access</th>
              <th>Run Engine</th>
              <th>Receive Alerts</th>
              <th>Alert Channel</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="user-avatar" style={{ width: '36px', height: '36px' }}>JS</div>
                  <div>
                    <div style={{ fontWeight: 600 }}>John Smith</div>
                    <div style={{ fontSize: '13px', color: '#8b92a8' }}>Sr. Security Engineer</div>
                  </div>
                </div>
              </td>
              <td>
                <input 
                  type="checkbox" 
                  defaultChecked 
                  onChange={(e) => showToast('Permission Updated', `Portal access ${e.target.checked ? 'granted' : 'revoked'}`)}
                  style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                />
              </td>
              <td>
                <input 
                  type="checkbox" 
                  defaultChecked
                  onChange={(e) => showToast('Permission Updated', `Engine access ${e.target.checked ? 'granted' : 'revoked'}`)}
                  style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                />
              </td>
              <td>
                <input 
                  type="checkbox" 
                  defaultChecked
                  onChange={(e) => showToast('Permission Updated', `Alerts ${e.target.checked ? 'enabled' : 'disabled'}`)}
                  style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                />
              </td>
              <td>
                <select 
                  className="lang-selector" 
                  style={{ fontSize: '13px', padding: '6px 10px' }}
                  onChange={(e) => showToast('Alert Channel', `Alerts via ${e.target.value}`)}
                >
                  <option value="Email">📧 Email</option>
                  <option value="WhatsApp">💬 WhatsApp</option>
                  <option value="Discord">🎮 Discord</option>
                </select>
              </td>
            </tr>

            <tr>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="user-avatar" style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>SJ</div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Sarah Johnson</div>
                    <div style={{ fontSize: '13px', color: '#8b92a8' }}>Penetration Tester</div>
                  </div>
                </div>
              </td>
              <td>
                <input 
                  type="checkbox" 
                  defaultChecked
                  onChange={(e) => showToast('Permission Updated', `Portal access ${e.target.checked ? 'granted' : 'revoked'}`)}
                  style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                />
              </td>
              <td>
                <input 
                  type="checkbox" 
                  defaultChecked
                  onChange={(e) => showToast('Permission Updated', `Engine access ${e.target.checked ? 'granted' : 'revoked'}`)}
                  style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                />
              </td>
              <td>
                <input 
                  type="checkbox" 
                  defaultChecked
                  onChange={(e) => showToast('Permission Updated', `Alerts ${e.target.checked ? 'enabled' : 'disabled'}`)}
                  style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                />
              </td>
              <td>
                <select 
                  className="lang-selector" 
                  style={{ fontSize: '13px', padding: '6px 10px' }}
                  defaultValue="WhatsApp"
                  onChange={(e) => showToast('Alert Channel', `Alerts via ${e.target.value}`)}
                >
                  <option value="Email">📧 Email</option>
                  <option value="WhatsApp">💬 WhatsApp</option>
                  <option value="Discord">🎮 Discord</option>
                </select>
              </td>
            </tr>

            <tr>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="user-avatar" style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #10b981, #059669)' }}>MQ</div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Max Quinn</div>
                    <div style={{ fontSize: '13px', color: '#8b92a8' }}>Security Analyst</div>
                  </div>
                </div>
              </td>
              <td>
                <input 
                  type="checkbox" 
                  defaultChecked
                  onChange={(e) => showToast('Permission Updated', `Portal access ${e.target.checked ? 'granted' : 'revoked'}`)}
                  style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                />
              </td>
              <td>
                <input 
                  type="checkbox" 
                  onChange={(e) => showToast('Permission Updated', `Engine access ${e.target.checked ? 'granted' : 'revoked'}`)}
                  style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                />
              </td>
              <td>
                <input 
                  type="checkbox" 
                  defaultChecked
                  onChange={(e) => showToast('Permission Updated', `Alerts ${e.target.checked ? 'enabled' : 'disabled'}`)}
                  style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                />
              </td>
              <td>
                <select 
                  className="lang-selector" 
                  style={{ fontSize: '13px', padding: '6px 10px' }}
                  defaultValue="Discord"
                  onChange={(e) => showToast('Alert Channel', `Alerts via ${e.target.value}`)}
                >
                  <option value="Email">📧 Email</option>
                  <option value="WhatsApp">💬 WhatsApp</option>
                  <option value="Discord">🎮 Discord</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Settings;