import { useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import Button from './components/Button'
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

    /** 
     * This will be the main fetch function that takes in query
     * parameters as arguments to tailor the request.
     * 
     * TODO: handle errors correctly; log detailed errors
     */
    const fetchEvents = async ({ params = {} } = {}) => {
        setIsLoading(true);
        setError(null);

        try {
            const resp = await axios.get(eventsURI, { params });

            /** 
             * Artists are in: data._embedded.events._embedded.attractions
             * Genres are in: data._embedded.events._embedded.attractions.classifications.genre.name
             * Date is in: data._embedded.events.dates.start.localDate,
             *             data._embedded.events.dates.start.localTime
             * Venues are in: data._embedded.events._embedded.venues.name
             */
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
        // TODO: figure out how to get user's location to pass in param instead of hard coding it
        await fetchEvents({
            params: {
                dmaId: 222,
                classificationName: "music",
                size: 1
            }
        });
    };

    const fetchJustAnnounced = async () => {
        await fetchEvents({
            params: {
                classificationName: "music"
            }
        });
    }

    const fetchThisWeekend = async () => {
        await fetchEvents({
            params: {
                classificationName: "music"
            }
        });
    }

    return (
        <>
            <Header />

            <div className="button-container">
                <Button onClickFunc={fetchFeaturedEvents}
                        buttonText={'Featured Events'} />
                <Button onClickFunc={fetchJustAnnounced}
                        buttonText={'Just Announced'} />
                <Button onClickFunc={fetchThisWeekend}
                        buttonText={'This Weekend'} />
            </div>

            <SearchInput onSearch={(value) => console.log('Search', value)} />

            <EventDisplay events={events} />
        </>
    );
}

export default App