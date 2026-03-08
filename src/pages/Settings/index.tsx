import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, AlertTriangle } from 'lucide-react';
import { clearAllStorage } from '../../services/storage';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';

export default function Settings() {
  const [showResetModal, setShowResetModal] = useState(false);

  const handleReset = () => {
    clearAllStorage();
    window.location.reload();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
        <p className="text-text-muted text-sm mt-1">Manage your preferences and data.</p>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-bold mb-2">Profile</h3>
        <p className="text-text-secondary text-sm mb-4">Manage your account information.</p>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
            AR
          </div>
          <div>
            <p className="font-semibold">Alex Rivera</p>
            <p className="text-sm text-text-muted">alex.rivera@email.com</p>
            <span className="text-xs text-primary font-medium">Premium Plan</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-danger/20">
        <h3 className="text-lg font-bold text-danger mb-2">Danger Zone</h3>
        <p className="text-text-secondary text-sm mb-4">
          Reset all data to the original mock database values. This cannot be undone.
        </p>
        <button
          onClick={() => setShowResetModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-danger/10 border border-danger/30 text-danger font-semibold rounded-xl text-sm hover:bg-danger/20 transition-colors"
        >
          <Trash2 size={16} />
          Reset All Data
        </button>
      </Card>

      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Reset All Data"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-danger/10 border border-danger/20 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-danger/20 flex items-center justify-center shrink-0">
              <AlertTriangle className="text-danger" size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-danger">Warning: Critical Action</p>
              <p className="text-xs text-text-secondary mt-1">
                This will permanently delete all your transactions, budgets, and settings. This action cannot be undone.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setShowResetModal(false)}
              className="flex-1 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-bg-dark transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleReset}
              className="flex-1 py-3 rounded-xl bg-danger hover:bg-danger/90 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 size={16} />
              Confirm Reset
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
