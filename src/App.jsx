import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Header from './components/Header'
import Button from './components/Button'
import SearchInput from './components/SearchInput'
import EventDisplay from './components/EventDisplay'
import LoadingImg from './assets/loading.svg?react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const toastId = useRef(null);
    const apiKey = import.meta.env.VITE_API_KEY;
    const constParams = `classificationName=music&size=10&apikey=${apiKey}`
    const eventsURI = `https://app.ticketmaster.com/discovery/v2/events.json?${constParams}`;

    /** 
     * Fetches events from the Ticketmaster API based on given query parameters.
     * Sets the events to the state if successful, or sets an error state upon failure.
     * 
     * @param {Object} options - The options for fetching events.
     * @param {Object} [options.params={}] - The query parameters for the API call.
     * 
     * @returns {Promise<void>} A promise that resolves when the API all is complete.
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
                setError(err.response);
            } else if (err.request) {
                // Request made but no response from server
                setError(err.request);
            } else {
                setError(err.message);
            }
        }
        finally {
            setIsLoading(false);
        }
    };

    /**
     * Fetches featured events that are local to the user from the Ticketmaster API.
     * 
     * @todo Replace hardcoded dmaId with dynamic user location detection.
     * 
     * @returns {Promise<void>} A promise that resolves when the API call is complete.
     */
    const fetchFeaturedEvents = async () => {
        await fetchEvents({
            params: {
                city: "Austin"
            }
        });
    };

    /**
     * Fetches local events that have been just announced within the last week from the 
     * Ticketmaster API.
     * 
     * @returns {Promise<void>} A proimse that resolves when the API call is complete.
     */
    const fetchJustAnnounced = async () => {
        // Get today's date and set it back a week
        var startDate = new Date();
        startDate.setDate(startDate.getDate() - 7)
        // Remove milliseconds from ISO date because TM API doesn't support it
        startDate = startDate.toISOString().replace(/\.\d{3}/, '');

        await fetchEvents({
            params: {
                dmaId: 222,
                publicVisibilityStartDateTime: `${startDate}`
            }
        });
    };

    /**
     * Fetches local events that are coming up in the following weekend(s) from the
     * Ticketmaster API.
     * 
     * @returns {Promise<void>} A promise that resolves when the API call is complete.
     */
    const fetchThisWeekend = async () => {
        // Calculate the start of the weekend (upcoming Friday)
        const today = new Date();
        const nextFriday = new Date(today);
        nextFriday.setDate(today.getDate() + ((7 - today.getDay()) % 7 + 5) % 7);

        // Calculate end of this weekend (upcoming Sunday)
        const nextSunday = new Date(nextFriday);
        nextSunday.setDate(nextFriday.getDate() + 2);

        // Format dates to ISO string and remove milliseconds
        // Only need the date and not specific time so we can use split()
        const startDate = nextFriday.toISOString().split('T')[0];
        const endDate = nextSunday.toISOString().split('T')[0];

        await fetchEvents({
            params: {
                dmaId: 222,
                // Start of Friday
                startDateTime: startDate + "T00:00:00Z",
                // End of Sunday
                endDateTime: endDate + "T23:59:59Z",
                sort: "date,asc"
            }
        });
    };

    /**
     * Fetches the events of a given city as per the user's request from the
     * Ticketmaster APi.
     * 
     * @param {String} cityName - The city requested by user to search.
     * 
     * @returns {Promise<void>} A promise that resolves when the API call is complete.
     */
    const fetchSearch = async (cityName) => {
        await fetchEvents({
            params: {
                city: cityName
            }
        });
    };

    // Using useEffect hook to show the toast when the error state is updated
    useEffect(() => {
        if (error && !toast.isActive(toastId.current)) {
            const msg = error.response
                ? error.response.data.message
                : "Couldn't make that request, please try again or another input! 🤠";

            toastId.current = toast.error(msg);
        }
    }, [error]); // Only re-run the effect if the error state changes


    return (
        <>
            <Header />

            <div className="button-container">
                <Button onClickFunc={fetchFeaturedEvents}
                        buttonText='Featured Events' />
                <Button onClickFunc={fetchJustAnnounced}
                        buttonText='Just Announced' />
                <Button onClickFunc={fetchThisWeekend}
                        buttonText='This Weekend' />
                <SearchInput onSearch={fetchSearch} />
            </div>

            <EventDisplay events={events} />

            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                limit={1}
            />
        </>
    );
}

export default App