import { useState } from 'react'

import AddFriend from './components/AddFriend';
import FriendList from './components/FriendList';
import SplitBill from './components/SplitBill';

import { Friend } from "./models/Friend";

function App() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  const handleAddFriend = (friend: Friend) => {
    setFriends(friends => [...friends, friend]);
  };

  const handleDeleteFriend = (id: number) => {
    setFriends(friends.filter((friend) => friend.id !== id));
    if (selectedFriend?.id === id) {
      setSelectedFriend(null);
    }
  };

  const handleSelectFriend = (friend: Friend) => {
    setSelectedFriend(currentSelected =>
      currentSelected?.id === friend.id ? null : friend
    );
  };

  const handleSetFriendBalance = (id: number, balance: number) => {
    setFriends(friends =>
      friends.map(friend =>
        friend.id === id
          ? { ...friend, balance }
          : friend
      )
    );
    setSelectedFriend(null);
  };

  const handleOnBack = () => {
    setSelectedFriend(null);
  };

  return (
    <>
      <header className='pb-5'>
        <h1 className='text-center'>Eat-n-Split</h1>
      </header>
      <main className='md:grid md:grid-cols-2 gap-4'>
        {/* Left side */}
        <div className={`${selectedFriend ? 'hidden md:block' : ''}`}>
          <div className='bg-orange-900 p-4 mb-4'>
            <FriendList
              friends={friends}
              selectedFriend={selectedFriend}
              onSelect={handleSelectFriend}
              onDelete={handleDeleteFriend}
            />
          </div>
          <div className='bg-orange-900 p-4'>
            <AddFriend onAddFriend={handleAddFriend} />
          </div>
        </div>
  
        {/* Right side */}
        <div className={`${!selectedFriend ? 'hidden md:block' : ''}`}>
          <div className='bg-orange-900 p-4'>
            <SplitBill
              friend={selectedFriend}
              onSetFriendBalance={handleSetFriendBalance}
              onBack={handleOnBack}
            />
          </div>
        </div>
      </main>
    </>
  )  
}

export default App
