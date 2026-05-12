import React from 'react';

interface ReportsProps {
  showToast: (title: string, message: string) => void;
}

export const Reports: React.FC<ReportsProps> = ({ showToast }) => {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '4px' }}>Reports</h2>
        <div style={{ fontSize: '14px', color: '#8b92a8' }}>Generate comprehensive security reports</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        {/* Vulnerability Report */}
        <div className="card" style={{ cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00d4ff'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e2533'}>
          <div className="card-body">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Vulnerability Report</h3>
            <p style={{ fontSize: '14px', color: '#8b92a8', marginBottom: '16px' }}>
              Detailed listing of vulnerabilities with AI actions and tool results
            </p>
            <button className="btn btn-primary" onClick={() => showToast('Generating Report', 'Vulnerability report is being created...')}>
              Generate Report
            </button>
          </div>
        </div>

        {/* Patches by Technology */}
        <div className="card" style={{ cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00d4ff'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e2533'}>
          <div className="card-body">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔧</div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Patches by Technology</h3>
            <p style={{ fontSize: '14px', color: '#8b92a8', marginBottom: '16px' }}>
              Organized by technology stack showing all pending patches
            </p>
            <button className="btn btn-primary" onClick={() => showToast('Generating Report', 'Patch report is being created...')}>
              Generate Report
            </button>
          </div>
        </div>

        {/* Patches by Server */}
        <div className="card" style={{ cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00d4ff'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e2533'}>
          <div className="card-body">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🖥️</div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Patches by Server</h3>
            <p style={{ fontSize: '14px', color: '#8b92a8', marginBottom: '16px' }}>
              Organized by infrastructure showing patches per server
            </p>
            <button className="btn btn-primary" onClick={() => showToast('Generating Report', 'Server patch report is being created...')}>
              Generate Report
            </button>
          </div>
        </div>

        {/* Risk Heatmap */}
        <div className="card" style={{ cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00d4ff'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e2533'}>
          <div className="card-body">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗺️</div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Risk Heatmap</h3>
            <p style={{ fontSize: '14px', color: '#8b92a8', marginBottom: '16px' }}>
              Visual risk exposure map by asset type and severity
            </p>
            <button className="btn btn-primary" onClick={() => showToast('Generating Report', 'Heatmap report is being created...')}>
              Generate Report
            </button>
          </div>
        </div>

        {/* Personnel Report */}
        <div className="card" style={{ cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00d4ff'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e2533'}>
          <div className="card-body">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>👥</div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Personnel & Assignments</h3>
            <p style={{ fontSize: '14px', color: '#8b92a8', marginBottom: '16px' }}>
              Team workload analysis with completion metrics
            </p>
            <button className="btn btn-primary" onClick={() => showToast('Generating Report', 'Personnel report is being created...')}>
              Generate Report
            </button>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="card" style={{ cursor: 'pointer', transition: 'all 0.2s', gridColumn: 'span 2' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00d4ff'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e2533'}>
          <div className="card-body">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Executive Summary</h3>
            <p style={{ fontSize: '14px', color: '#8b92a8', marginBottom: '16px' }}>
              Comprehensive report consolidating all security metrics and trends for leadership
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <select className="lang-selector">
                <option>Last Week</option>
                <option>Last Month</option>
                <option>Last Quarter</option>
              </select>
              <select className="lang-selector">
                <option>PDF</option>
                <option>PowerPoint</option>
                <option>Excel</option>
              </select>
              <button className="btn btn-primary" onClick={() => showToast('Generating Report', 'Executive summary is being created...')}>
                Generate Executive Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Reports;