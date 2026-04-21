import { Icon } from '@iconify/react';

interface Props {
    itemName: string;
    cost: number;
    currentCoins: number;
    onConfirm: () => void;
    onCancel: () => void;
}

const PurchaseConfirmModal = ({ itemName, cost, currentCoins, onConfirm, onCancel }: Props) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full space-y-5">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose/10 border border-rose/20 flex items-center justify-center">
                    <Icon icon="hugeicons:shield-01" className="w-5 h-5 text-rose" />
                </div>
                <div>
                    <h2 className="text-white font-black font-heading">Confirm Purchase</h2>
                    <p className="text-sand text-sm">{itemName}</p>
                </div>
            </div>

            <div className="border-t border-border" />

            <div className="space-y-2 text-sm">
                <div className="flex justify-between text-sand">
                    <span>Cost</span>
                    <span className="text-white font-semibold flex items-center gap-1">
                        <Icon icon="hugeicons:coins-02" className="w-3.5 h-3.5 text-lime" />
                        {cost.toLocaleString()}
                    </span>
                </div>
                <div className="flex justify-between text-sand">
                    <span>Balance after</span>
                    <span className="text-white font-semibold flex items-center gap-1">
                        <Icon icon="hugeicons:coins-02" className="w-3.5 h-3.5 text-lime" />
                        {(currentCoins - cost).toLocaleString()}
                    </span>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={onCancel}
                    className="flex-1 py-2.5 rounded-xl border border-border text-sand text-sm font-semibold hover:bg-surface transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="flex-1 py-2.5 rounded-xl bg-lime text-black text-sm font-black hover:bg-lime/90 active:scale-95 transition-all"
                >
                    Buy Now
                </button>
            </div>
        </div>
    </div>
);

export default PurchaseConfirmModal;
