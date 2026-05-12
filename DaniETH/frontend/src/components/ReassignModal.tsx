import React from 'react';

// Definimos las props (funciones y estados) que necesita este modal para funcionar
interface ReassignModalProps {
  reassignModalOpen: boolean;
  closeReassignModal: () => void;
  selectedAssignee: string | null;
  setSelectedAssignee: (assignee: string) => void;
  confirmReassign: () => void;
}

export const ReassignModal: React.FC<ReassignModalProps> = ({
  reassignModalOpen,
  closeReassignModal,
  selectedAssignee,
  setSelectedAssignee,
  confirmReassign
}) => {
  return (
    <div className={`modal-overlay ${reassignModalOpen ? 'active' : ''}`} onClick={closeReassignModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">Reassign Patch</div>
        </div>
        <div className="modal-body">
          <p style={{ marginBottom: '16px', color: '#8b92a8' }}>Select a team member to reassign this patch:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['john', 'sarah', 'max'].map((person) => (
              <div 
                key={person}
                style={{ 
                  padding: '12px', 
                  background: selectedAssignee === person ? 'rgba(0, 212, 255, 0.2)' : '#1a1f2e', 
                  border: '1px solid ' + (selectedAssignee === person ? '#00d4ff' : '#2a3144'), 
                  borderRadius: '8px', cursor: 'pointer' 
                }}
                onClick={() => setSelectedAssignee(person)}
              >
                <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>{person}</div>
                <div style={{ fontSize: '13px', color: '#8b92a8' }}>Security Team Member</div>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={closeReassignModal}>Cancel</button>
          <button className="btn btn-primary" onClick={confirmReassign}>Confirm Reassignment</button>
        </div>
      </div>
    </div>
  );
};
export default ReassignModal;