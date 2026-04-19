interface ModalActionsProps {
    onClose: () => void;
    canSubmit: boolean;
    submitting: boolean;
}

const ModalActions = ({ onClose, canSubmit, submitting }: ModalActionsProps) => (
    <div className="flex gap-3 pt-1">
        <button type="button" onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-border text-sand text-sm font-semibold hover:text-cream transition-all">
            Cancel
        </button>
        <button type="submit" disabled={!canSubmit}
            className="flex-1 py-2.5 rounded-xl bg-lime text-black text-sm font-bold hover:bg-lime-light transition-all disabled:opacity-40 disabled:cursor-not-allowed">
            {submitting ? 'Logging…' : 'Add Meal'}
        </button>
    </div>
);

export default ModalActions;