import { useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import Buttons from './components/Button'
import SearchInput from './components/SearchInput'
import EventDisplay from './components/EventDisplay'
import LoadingImg from './assets/loading.svg?react'
import './App.css'

function App() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const apiKey = import.meta.env.VITE_API_KEY;
    const eventsURI = "https://app.ticketmaster.com/discovery/v2/events.json";


    const fetchEvents = async ({ params = {}} = {}) => {
        /** 
         * TODO: this will be the main fetch function that takes in query
         * parameters as arguments to tailor the request.
         */
        setIsLoading(true);
        setError(null);

        try {
            const resp = await axios.get(eventsURI, {
                params: {
                    ...params
                }
            });

            setEvents(resp.data._embedded.events);
        }
        catch (error) {
            setError(error.response ? error.response.data : "An unexpected error occurred...");
        }
        finally {
            setIsLoading(false);
        }
    };

    const fetchFeaturedEvents = async () => {
        await fetchEvents();
    };

    const fetchJustAnnounced = async () => {
        await fetchEvents({/* INSERT query params for just announced events */});
    }

    const fetchThisWeekend = async () => {
        await fetchEvents({/* INSERT query params for this weekend events */});
    }

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