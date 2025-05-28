import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';
import ApproveAccessTrigger from './AxiosApproveAccessTrigger';

const AccessRequestDialog = ({ visible, onHide, requests, onApprove, onReject }) => {
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [approvedIndexes, setApprovedIndexes] = useState([]);

  const toggleExpand = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <Dialog
      header=" new Access Requests"
      visible={visible}
      style={{ width: '45vw' }}
      onHide={onHide}
      draggable={false}
    >
      {requests.length === 0 ? (
        <p>אין בקשות גישה כרגע.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {requests.map((req, idx) => {
            const isOpen = expandedIndexes.includes(idx);
            return (
              <motion.div
                key={idx}
                layout
                initial={{ borderRadius: 12 }}
                transition={{ layout: { duration: 0.3, type: 'spring' } }}
              >
                <Card
                  style={{
                    backgroundColor: '#f0f8ff',
                    boxShadow: isOpen
                      ? '0 4px 20px rgba(0,0,0,0.15)'
                      : '0 2px 6px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease-in-out',
                    cursor: 'pointer'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: isOpen ? '1rem' : 0
                    }}
                    onClick={() => toggleExpand(idx)}
                  >
                    <div>
                      <strong>Type Access :</strong> {req.accessType || '—'}
                    </div>
                    <Button
                      icon={isOpen ? 'pi pi-minus' : 'pi pi-plus'}
                      rounded
                      text
                      aria-label="פתח פרטים"
                      style={{
                        transform: isOpen ? 'scale(1.2)' : 'scale(1)',
                        transition: 'transform 0.2s'
                      }}
                    />
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div style={{ marginBottom: '0.5rem' }}>
                          <strong>Member ID:</strong> {req.memberId || 'Unknown'}
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                          <strong>Request Date:</strong>{' '}
                          {new Date(req.dateRequested).toLocaleString('he-IL') || '���'}
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                          <strong>Message:</strong> {req.text || '���'}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                          <button
                            onClick={() => setApprovedIndexes((prev) => [...prev, idx])}
                            style={{
                              border: 'none',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(0, 128, 0, 0.1)',
                              color: 'green',
                              width: '36px',
                              height: '36px',
                              fontSize: '1rem',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease-in-out'
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.backgroundColor = 'rgba(0, 128, 0, 0.3)')
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.backgroundColor = 'rgba(0, 128, 0, 0.1)')
                            }
                          >
                            <FaCheck />
                          </button>
                    
                        </div>

                        {approvedIndexes.includes(idx) && (
                          <ApproveAccessTrigger
                            request={req}
                            onFinish={(success) => {
                              if (success) {
                                setApprovedIndexes((prev) =>
                                  prev.filter((i) => i !== idx)
                                );
                                onApprove(req); // מחיקה מהמערך החיצוני
                              }
                            }}
                          />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </Dialog>
  );
};

export default AccessRequestDialog;
