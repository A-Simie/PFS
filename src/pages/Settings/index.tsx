import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { clearAllStorage } from '../../services/storage';
import { Card } from '../../components/ui/Card';

export default function Settings() {
  const handleReset = () => {
    if (window.confirm('This will clear all your data and reset to defaults. Continue?')) {
      clearAllStorage();
      window.location.reload();
    }
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
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-danger/10 border border-danger/30 text-danger font-semibold rounded-xl text-sm hover:bg-danger/20 transition-colors"
        >
          <Trash2 size={16} />
          Reset All Data
        </button>
      </Card>
    </motion.div>
  );
}
