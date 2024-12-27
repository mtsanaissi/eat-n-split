import FriendListItem from "./FriendListItem";
import { Friend } from "../models/Friend";

interface FriendListProps {
    friends: Friend[];
    selectedFriend: Friend | null;
    onSelect: (friend: Friend) => void;
    onDelete: (id: number) => void;
}

export default function FriendList({ 
    friends, 
    selectedFriend, 
    onSelect, 
    onDelete 
}: FriendListProps) {
    if (friends.length === 0) {
        return (
            <div className="text-white text-center p-4">
                No friends added yet. Add your first friend!
            </div>
        );
    }

    return (
        <>
            <h2 className="text-white text-xl mb-4">Friends List</h2>
            <ul className="space-y-4">
                {friends.map((friend) => (
                    <FriendListItem 
                        key={friend.id} 
                        friend={friend}
                        isSelected={selectedFriend?.id === friend.id}
                        onSelect={onSelect}
                        onDelete={onDelete}
                    />
                ))}
            </ul>
        </>
    );
}
