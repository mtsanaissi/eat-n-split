import { useState } from 'react';
import { Friend } from '../models/Friend';

interface SplitBillProps {
    friend: Friend | null;
    onSetFriendBalance: (id: number, balance: number) => void;
    onBack: () => void;
}

export default function SplitBill({ friend, onSetFriendBalance, onBack }: SplitBillProps) {
    const [billValue, setBillValue] = useState('');
    const [userExpense, setUserExpense] = useState('');
    const [whoIsPaying, setWhoIsPaying] = useState<'user' | 'friend'>('user');

    if (!friend) {
        return (
            <div className="text-white text-center p-4">
                Please select a friend to split a bill with
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!billValue || !userExpense) return;

        const bill = Number(billValue);
        const userPaid = Number(userExpense);
        const friendPaid = bill - userPaid;

        let balanceChange: number;
        if (whoIsPaying === 'user') {
            balanceChange = friendPaid;
        } else {
            balanceChange = -userPaid;
        }

        // Update the friend's balance
        onSetFriendBalance(friend.id, friend.balance + balanceChange);

        // Reset form
        setBillValue('');
        setUserExpense('');
        setWhoIsPaying('user');
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-white text-xl">Split Bill with {friend.name}</h2>

            <div>
                <label className="block text-white mb-2">
                    💰 Bill value
                </label>
                <input
                    type="number"
                    value={billValue}
                    onChange={(e) => setBillValue(e.target.value)}
                    className="w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder="0"
                    required
                />
            </div>

            <div>
                <label className="block text-white mb-2">
                    🧍‍♂️ Your expense
                </label>
                <input
                    type="number"
                    value={userExpense}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value <= Number(billValue)) {
                            setUserExpense(e.target.value);
                        }
                    }}
                    className="w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder="0"
                    required
                />
            </div>

            <div>
                <label className="block text-white mb-2">
                    👫 {friend.name}'s expense
                </label>
                <input
                    type="number"
                    value={billValue && userExpense ? Number(billValue) - Number(userExpense) : ''}
                    className="w-full rounded-md bg-gray-200 border-transparent focus:ring-0"
                    disabled
                />
            </div>

            <div>
                <label className="block text-white mb-2">
                    🤑 Who is paying the bill?
                </label>
                <select
                    value={whoIsPaying}
                    onChange={(e) => setWhoIsPaying(e.target.value as 'user' | 'friend')}
                    className="w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                >
                    <option value="user">You</option>
                    <option value="friend">{friend.name}</option>
                </select>
            </div>

            <div className='flex space-x-5 md:space-x-0'>
            <button onClick={onBack}
                className="md:hidden bg-orange-800 hover:bg-orange-700 text-white font-bold py-2 px-7 rounded-md
                focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50
                disabled:bg-gray-400 disabled:cursor-not-allowed">
                Back
            </button>
            <button
                type="submit"
                className="flex-1 bg-orange-800 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md
                          focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50
                          disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={!billValue || !userExpense}
            >
                Split Bill
            </button>
            </div>
        </form>
    );
}
