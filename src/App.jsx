import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import Buttons from './components/Button'
import SearchInput from './components/SearchInput'
import EventDisplay from './components/EventDisplay'
import LoadingImg from './assets/loading.svg?react'
import './App.css'

function App() {
    const [events, setEvents] = useState([]);
    const apiKey = import.meta.env.VITE_API_KEY;

    // Event handlers
    // const handleSearch = (query) => {
        // TODO: Implement search functionality using Ticketmaster APi
        // console.log('Search for:', query);
        // Example: setEvents(searchedEvents);
    // }

    // ... Other event handlers for buttons

    // TODO: Test API call from here; figure out how to store API keys and secrets using .env
    useEffect(() =>  {
        axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=222&size=1&apikey=${apiKey}`)
        .then(response => {
            setEvents(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    // TODO: Implement button api logic
    return (
        <>
            <Header />
            <Buttons
                onFeaturedClick={() => console.log('Featured events clicked')}
                onJustAnnouncedClick={() => console.log('Just announced events clicked')}
                onThisWeekendClick={() => console.log('This weekend events clicked')}
            />
            <SearchInput onSearch={(value) => console.log('Search', value)}/>
            <EventDisplay events={events}/>

            {/* Other components will follow here */}
        </>
    );
}

export default App