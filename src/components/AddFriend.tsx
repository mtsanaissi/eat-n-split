import { useState } from 'react';
import { Friend } from '../models/Friend';

interface AddFriendProps {
  onAddFriend: (friend: Friend) => void;
}

export default function AddFriend({ onAddFriend }: AddFriendProps) {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!name.trim()) return;

        const newFriend: Friend = {
            id: Date.now(), // Simple way to generate unique id
            name: name.trim(),
            imageUrl: imageUrl || 'https://i.pravatar.cc/48', // Default avatar if no image provided
            balance: 0
        };

        onAddFriend(newFriend);

        // Reset form
        setName('');
        setImageUrl('');
        setIsFormOpen(false);
    };

    return (
        <>
            {!isFormOpen ? (
                <button 
                    onClick={() => setIsFormOpen(true)}
                    className="w-full bg-orange-800 hover:bg-orange-700 focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50 rounded-md text-white px-4 py-2"
                >
                    Add Friend
                </button>
            ) : (
                <>
                    <h2 className="text-white text-xl mb-4">Add Friend</h2>
                    <form onSubmit={handleSubmit}>
                        <label className="block">
                            <span className="text-white">Name</span>
                            <input 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" 
                                placeholder="Friend's Name"
                                required 
                            />
                        </label>
                        <label className="block mt-3">
                            <span className="text-white">Image URL</span>
                            <input 
                                type="text" 
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" 
                                placeholder="http..." 
                            />
                        </label>
                        <div className="mt-4 flex gap-2">
                            <button 
                                type="submit"
                                className="flex-1 bg-orange-800 hover:bg-orange-700 focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50 rounded-md text-white px-4 py-2"
                            >
                                Add
                            </button>
                            <button 
                                type="button"
                                onClick={() => setIsFormOpen(false)}
                                className="flex-1 bg-gray-600 hover:bg-gray-500 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 rounded-md text-white px-4 py-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </>
            )}
        </>
    );
}
