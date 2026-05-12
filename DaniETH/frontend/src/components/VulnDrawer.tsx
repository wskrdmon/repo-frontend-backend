import React from 'react';

interface VulnDrawerProps {
  vulnDrawerOpen: boolean;
  closeVulnDrawer: () => void;
  selectedVuln: string | null;
  showToast: (title: string, message: string) => void;
}

export const VulnDrawer: React.FC<VulnDrawerProps> = ({ 
  vulnDrawerOpen, 
  closeVulnDrawer, 
  selectedVuln, 
  showToast 
}) => {
  return (
    <>
      <div className={`drawer-overlay ${vulnDrawerOpen ? 'active' : ''}`} onClick={closeVulnDrawer}></div>
      <div className={`drawer ${vulnDrawerOpen ? 'active' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-title">{selectedVuln}</div>
          <div className="close-btn" onClick={closeVulnDrawer}>✕</div>
        </div>
        <div className="drawer-content">
          {/* Header Info */}
          <div style={{ marginBottom: '24px' }}>
            <div className="severity-badge severity-critical" style={{ marginBottom: '16px' }}>CRITICAL</div>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
              SQL Injection in Authentication System
            </h2>
            <div style={{ fontSize: '14px', color: '#8b92a8' }}>
              Detected 2 hours ago • CVSS 9.8 • api.company.com/auth
            </div>
          </div>

          {/* Detailed Explanation */}
          <div style={{ marginBottom: '24px', background: '#1a1f2e', padding: '20px', borderRadius: '8px', border: '1px solid #2a3144' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              📖 Detailed Explanation
            </h3>
            <p style={{ fontSize: '14px', color: '#e4e6eb', lineHeight: '1.6', marginBottom: '12px' }}>
              A critical SQL injection vulnerability has been detected in the authentication system at the <code>/api/auth/login</code> endpoint. 
              This vulnerability allows attackers to bypass authentication by injecting malicious SQL queries.
            </p>
            <p style={{ fontSize: '14px', color: '#e4e6eb', lineHeight: '1.6', marginBottom: '12px' }}>
              <strong style={{ color: '#fb923c' }}>Attack Vector:</strong> The application constructs SQL queries using string concatenation without proper input validation. 
              An attacker can submit input like <code style={{ color: '#ef4444' }}>admin' OR '1'='1</code> to manipulate the query logic.
            </p>
            <p style={{ fontSize: '14px', color: '#e4e6eb', lineHeight: '1.6' }}>
              <strong style={{ color: '#fb923c' }}>Impact:</strong> Successful exploitation grants unauthorized access as any user, enables data exfiltration, 
              and potentially allows execution of arbitrary SQL commands.
            </p>
          </div>

          {/* Technical Details */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>🔬 Technical Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: '#1a1f2e', padding: '12px', borderRadius: '6px' }}>
                <div style={{ fontSize: '12px', color: '#8b92a8', marginBottom: '4px' }}>CVSS Score</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#ef4444' }}>9.8 / 10.0</div>
              </div>
              <div style={{ background: '#1a1f2e', padding: '12px', borderRadius: '6px' }}>
                <div style={{ fontSize: '12px', color: '#8b92a8', marginBottom: '4px' }}>Attack Complexity</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#10b981' }}>Low</div>
              </div>
              <div style={{ background: '#1a1f2e', padding: '12px', borderRadius: '6px' }}>
                <div style={{ fontSize: '12px', color: '#8b92a8', marginBottom: '4px' }}>Privileges Required</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#ef4444' }}>None</div>
              </div>
              <div style={{ background: '#1a1f2e', padding: '12px', borderRadius: '6px' }}>
                <div style={{ fontSize: '12px', color: '#8b92a8', marginBottom: '4px' }}>User Interaction</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#ef4444' }}>None</div>
              </div>
            </div>
          </div>

          {/* Remediation Steps */}
          <div style={{ marginBottom: '24px', background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 102, 255, 0.1))', padding: '20px', borderRadius: '8px', border: '1px solid rgba(0, 212, 255, 0.3)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#00d4ff' }}>
              ✅ Remediation Steps
            </h3>
            
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                <div style={{ minWidth: '28px', height: '28px', background: '#00d4ff', color: '#0a0e17', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>1</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px', color: '#e4e6eb' }}>
                    Implement Parameterized Queries (Immediate)
                  </div>
                  <div style={{ fontSize: '13px', color: '#8b92a8', lineHeight: '1.5' }}>
                    Replace all string concatenation with parameterized queries or prepared statements.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                <div style={{ minWidth: '28px', height: '28px', background: '#00d4ff', color: '#0a0e17', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>2</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px', color: '#e4e6eb' }}>
                    Add Input Validation (Within 24h)
                  </div>
                  <div style={{ fontSize: '13px', color: '#8b92a8', lineHeight: '1.5' }}>
                    Implement strict input validation using whitelisting. Validate username format and reject SQL keywords.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                <div style={{ minWidth: '28px', height: '28px', background: '#00d4ff', color: '#0a0e17', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>3</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px', color: '#e4e6eb' }}>
                    Deploy WAF Rules (Within 48h)
                  </div>
                  <div style={{ fontSize: '13px', color: '#8b92a8', lineHeight: '1.5' }}>
                    Configure WAF to block common SQL injection patterns as an additional defense layer.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ minWidth: '28px', height: '28px', background: '#00d4ff', color: '#0a0e17', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>4</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px', color: '#e4e6eb' }}>
                    Verify Fix (After implementation)
                  </div>
                  <div style={{ fontSize: '13px', color: '#8b92a8', lineHeight: '1.5' }}>
                    Re-run automated security scans and conduct manual penetration testing.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button className="btn btn-primary" onClick={() => showToast('Plan Generated', 'Remediation plan created')}>
              🤖 Generate Remediation Plan
            </button>
            <button className="btn btn-secondary" onClick={() => showToast('Ticket Created', 'JIRA ticket VULN-001 created')}>
              📋 Create JIRA Ticket
            </button>
            <button className="btn btn-secondary" onClick={() => showToast('Task Assigned', 'Assigned to John Smith')}>
              👤 Assign to Team Member
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default VulnDrawer;
