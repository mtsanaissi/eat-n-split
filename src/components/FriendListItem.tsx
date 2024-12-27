import { Friend } from "../models/Friend";

interface FriendListItemProps {
    friend: Friend;
    isSelected: boolean;
    onSelect: (friend: Friend) => void;
    onDelete: (id: number) => void;
}

export default function FriendListItem({ 
    friend, 
    isSelected, 
    onSelect, 
    onDelete 
}: FriendListItemProps) {
    return (
        <li className={`
            grid md:grid-flow-col justify-normal p-4 rounded-lg gap-4
            ${isSelected ? 'bg-orange-800' : 'bg-orange-950'}
        `}>
            <div className="flex gap-4">
                <img 
                    src={friend.imageUrl} 
                    alt={friend.name} 
                    className="w-12 h-12 rounded-full"
                />
                <div>
                    <h3 className="text-white font-medium">{friend.name}</h3>
                    <p className={`
                        ${friend.balance === 0 ? 'text-gray-300' : 
                          friend.balance > 0 ? 'text-green-400' : 'text-red-400'}
                    `}>
                        {friend.balance === 0 
                            ? `You and ${friend.name} are even` 
                            : friend.balance > 0 
                                ? `${friend.name} owes you ${Math.abs(friend.balance)}€`
                                : `You owe ${friend.name} ${Math.abs(friend.balance)}€`
                        }
                    </p>
                </div>
            </div>
            <div className="flex gap-2 justify-center">
                <button
                    onClick={() => onSelect(friend)}
                    className="w-full bg-orange-700 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
                >
                    {isSelected ? 'Close' : 'Select'}
                </button>
                <button
                    onClick={() => onDelete(friend.id)}
                    className="w-full bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md"
                >
                    Delete
                </button>
            </div>
        </li>
    );
}
