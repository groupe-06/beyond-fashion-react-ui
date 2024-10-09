import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

const ReportDialog = ({ isOpen, onClose, onReport }) => {
  const [showOtherReportReason, setShowOtherReportReason] = useState(false);
  const [reportReason, setReportReason] = useState('');

  const reportReasons = [
    "Contenu inapproprié",
    "Spam",
    "Violation des droits d'auteur",
    "Harcèlement",
    "Désinformation",
    "Violence",
    "Autre"
  ];

  const handleReport = (reason) => {
    if (reason === 'Autre') {
      setShowOtherReportReason(true);
    } else {
      onReport(reason);
      onClose();
    }
  };

  const handleReportWithCustomReason = () => {
    onReport(reportReason);
    onClose();
    setShowOtherReportReason(false);
    setReportReason('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Signaler</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 p-4">
          {!showOtherReportReason ? (
            reportReasons.map((reason, index) => (
              <button
                key={index}
                onClick={() => handleReport(reason)}
                className="w-full p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200"
              >
                {reason}
              </button>
            ))
          ) : (
            <div className="space-y-4">
              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="Décrivez la raison du signalement..."
                className="w-full p-3 rounded-lg border min-h-[100px]"
              />
              <button
                onClick={handleReportWithCustomReason}
                className="w-full p-3 bg-blue-500 text-white rounded-lg"
              >
                Envoyer
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;