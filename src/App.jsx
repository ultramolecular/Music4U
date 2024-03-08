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
    const constParams = `classificationName=music&size=10&apikey=${apiKey}`
    const eventsURI = `https://app.ticketmaster.com/discovery/v2/events.json?${constParams}`;

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

            setEvents(resp.data._embedded.events);
        }
        catch (err) {
            if (err.response) {
                // Request made but the server responded with an error
                setError(err.response.data);
                console.log('Error data:', error.response.data);
                console.log('Error status:', error.response.status);
                console.log('Error headers:', error.response.headers);
            } else if (err.request) {
                // Request made but no response from server
                setError('The request was made but no response was received.')
                console.log('Error request:', err.request);
            } else {
                setError(err.message);
                console.log('Unexpected error occurred:', error.message);
            }
        }
        finally {
            setIsLoading(false);
        }
    };

    const fetchFeaturedEvents = async () => {
        // TODO: figure out how to get user's location to pass in param instead of hard coding it
        await fetchEvents({
            params: {
                dmaId: 222
            }
        });
    };

    const fetchJustAnnounced = async () => {
        /* We want events that are having their presale live between today and 2
            weeks from .replace(/\.\d{3}/, '')now, this approximates 'just announced' criteria for events */
        const startDate = new Date().toISOString().replace(/\.\d{3}/, '');
        var endDate = new Date();
        endDate.setDate(endDate.getDate() + 14);
        endDate = endDate.toISOString().replace(/\.\d{3}/, '');

        await fetchEvents({
            params: {
                dmaId: 222,
                preSaleDateTime: `${startDate},${endDate}`
            }
        });
    }

    const fetchThisWeekend = async () => {
        await fetchEvents({
            params: {
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

            {/* NOTE: search is just fetchFeaturedEvents with a specific dma */}
            <SearchInput onSearch={(value) => console.log('Search', value)} />

            <EventDisplay events={events} />
        </>
    );
}

export default App