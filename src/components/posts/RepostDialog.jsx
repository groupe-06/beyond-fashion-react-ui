import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

const RepostDialog = ({ isOpen, onClose, onRepost }) => {
  const [showRepostNote, setShowRepostNote] = useState(false);
  const [repostNote, setRepostNote] = useState('');

  const handleRepost = (withNote) => {
    if (withNote) {
      setShowRepostNote(true);
    } else {
      onRepost();
      onClose();
    }
  };

  const handleRepostWithNote = () => {
    onRepost(repostNote);
    onClose();
    setShowRepostNote(false);
    setRepostNote('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Republier</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-4">
          {!showRepostNote ? (
            <>
              <button
                onClick={() => handleRepost(true)}
                className="w-full p-3 bg-gray-100 rounded-lg text-left"
              >
                Republier avec notes
              </button>
              <button
                onClick={() => handleRepost(false)}
                className="w-full p-3 bg-gray-100 rounded-lg text-left"
              >
                Republier
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <textarea
                value={repostNote}
                onChange={(e) => setRepostNote(e.target.value)}
                placeholder="Ajouter une note..."
                className="w-full p-3 rounded-lg border min-h-[100px]"
              />
              <button
                onClick={handleRepostWithNote}
                className="w-full p-3 bg-blue-500 text-white rounded-lg"
              >
                Publier
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RepostDialog;