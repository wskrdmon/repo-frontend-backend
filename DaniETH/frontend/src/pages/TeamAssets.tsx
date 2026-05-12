import { useState } from 'react';

export default function Team() {
  // Le instalamos su propia batería para manejar las pestañas
  const [teamTab, setTeamTab] = useState('security');

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '4px' }}>Team & Assets</h2>
        <div style={{ fontSize: '14px', color: '#8b92a8' }}>Manage team members and workload</div>
      </div>

      {/* Team Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#00d4ff', marginBottom: '8px' }}>24</div>
            <div style={{ fontSize: '13px', color: '#8b92a8' }}>Total Members</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#fb923c', marginBottom: '8px' }}>47</div>
            <div style={{ fontSize: '13px', color: '#8b92a8' }}>Active Tasks</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#ef4444', marginBottom: '8px' }}>5</div>
            <div style={{ fontSize: '13px', color: '#8b92a8' }}>Overloaded</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#10b981', marginBottom: '8px' }}>12</div>
            <div style={{ fontSize: '13px', color: '#8b92a8' }}>Available</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#00d4ff', marginBottom: '8px' }}>2.3d</div>
            <div style={{ fontSize: '13px', color: '#8b92a8' }}>Avg Completion</div>
          </div>
        </div>
      </div>

      {/* Team Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '2px solid #1e2533' }}>
        <div 
          className={`tab ${teamTab === 'security' ? 'active' : ''}`}
          onClick={() => setTeamTab('security')}
          style={{ cursor: 'pointer' }}
        >
          🛡️ Security Engineering
        </div>
        <div 
          className={`tab ${teamTab === 'infrastructure' ? 'active' : ''}`}
          onClick={() => setTeamTab('infrastructure')}
          style={{ cursor: 'pointer' }}
        >
          🖥️ Infrastructure
        </div>
        <div 
          className={`tab ${teamTab === 'application' ? 'active' : ''}`}
          onClick={() => setTeamTab('application')}
          style={{ cursor: 'pointer' }}
        >
          💻 Application Team
        </div>
      </div>

      {/* Security Team */}
      {teamTab === 'security' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">🛡️ Security Engineering Team (10 members)</div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Role</th>
                <th>Tasks Assigned</th>
                <th>Completed</th>
                <th>Avg Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="user-avatar" style={{ width: '32px', height: '32px' }}>JS</div>
                    <div>John Smith</div>
                  </div>
                </td>
                <td>Sr. Security Engineer</td>
                <td><span style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '4px 12px', borderRadius: '6px', color: '#ef4444', fontWeight: 600 }}>7</span></td>
                <td>12</td>
                <td>1.8 days</td>
                <td><span style={{ color: '#10b981' }}>● Online</span></td>
              </tr>
              <tr>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="user-avatar" style={{ width: '32px', height: '32px' }}>SJ</div>
                    <div>Sarah Johnson</div>
                  </div>
                </td>
                <td>Security Analyst</td>
                <td><span style={{ background: 'rgba(251, 146, 60, 0.2)', padding: '4px 12px', borderRadius: '6px', color: '#fb923c', fontWeight: 600 }}>5</span></td>
                <td>15</td>
                <td>2.1 days</td>
                <td><span style={{ color: '#10b981' }}>● Online</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Infrastructure Team */}
      {teamTab === 'infrastructure' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">🖥️ Infrastructure Team (8 members)</div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Role</th>
                <th>Tasks Assigned</th>
                <th>Completed</th>
                <th>Avg Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="user-avatar" style={{ width: '32px', height: '32px' }}>MT</div>
                    <div>Michael Torres</div>
                  </div>
                </td>
                <td>DevOps Engineer</td>
                <td><span style={{ background: 'rgba(251, 146, 60, 0.2)', padding: '4px 12px', borderRadius: '6px', color: '#fb923c', fontWeight: 600 }}>6</span></td>
                <td>10</td>
                <td>2.4 days</td>
                <td><span style={{ color: '#10b981' }}>● Online</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Application Team */}
      {teamTab === 'application' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">💻 Application Team (6 members)</div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Role</th>
                <th>Tasks Assigned</th>
                <th>Completed</th>
                <th>Avg Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="user-avatar" style={{ width: '32px', height: '32px' }}>AP</div>
                    <div>Alex Patel</div>
                  </div>
                </td>
                <td>Full Stack Developer</td>
                <td><span style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '4px 12px', borderRadius: '6px', color: '#f59e0b', fontWeight: 600 }}>4</span></td>
                <td>13</td>
                <td>1.6 days</td>
                <td><span style={{ color: '#10b981' }}>● Online</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}