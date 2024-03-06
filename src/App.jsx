import { useState } from 'react'
import Header from './components/Header'
import Buttons from './components/Button'
import SearchInput from './components/SearchInput'
import EventDisplay from './components/EventDisplay'
import './App.css'

function App() {
    // const [events, setEvents] = useState([]);
    const dummyEvents = [];

    // Event handlers
    // const handleSearch = (query) => {
        // TODO: Implement search functionality using Ticketmaster APi
        // console.log('Search for:', query);
        // Example: setEvents(searchedEvents);
    // }

    // ... Other event handlers for buttons

    return (
        <>
            <Header />
            <Buttons
                onFeaturedClick={() => console.log('Featured events clicked')}
                onJustAnnouncedClick={() => console.log('Just announced events clicked')}
                onThisWeekendClick={() => console.log('This weekend events clicked')}
            />
            <SearchInput onSearch={(value) => console.log('Search', value)}/>
            <EventDisplay events={dummyEvents}/>
            {/* Other components will follow here */}
        </>
    );
}

export default App