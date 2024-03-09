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
    const [eventType, setEventType] = useState(null);
    const [userCity, setCity] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const toastId = useRef(null);
    const apiKey = import.meta.env.VITE_API_KEY;
    const constEventParams = `classificationName=music&size=10&apikey=${apiKey}`
    const geoOpts = { enableHighAccuracy: true, maximumAge: 0 };
    const eventsURI = `https://app.ticketmaster.com/discovery/v2/events.json?${constEventParams}`;
    const revGeoURI = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

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

            console.log('Fetched events!');
            setEvents(resp.data._embedded.events);
        }
        catch (err) {
            setError(err);
        }
        finally {
            setIsLoading(false);
        }
    };

    /**
     * Fetches featured events that are local to the user from the Ticketmaster API.
     * 
     * @returns {Promise<void>} A promise that resolves when the API call is complete.
     */
    const fetchFeaturedEvents = async () => {
        await fetchEvents({
            params: {
                city: userCity
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
                city: userCity,
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
                city: userCity,
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

    /**
     * When granted permission by user, fetches and sets the state of the user's city.
     * 
     * @param {Object} pos - Object containing raw user location data needed for
     *                       obtaining the user's city. 
     * 
     * @returns {Promise<void>} A promise that resolves when the API call is complete.
     */
    const geoSuccess = async (pos) => {
        const crd = pos.coords;

        try {
            const resp = await axios.get(revGeoURI, {
                params: {
                    latitude: crd.latitude,
                    longitude: crd.longitude
                }
            });

            console.log('User city: ', resp.data.city);

            setCity(resp.data.city);
        }
        catch (err) {
            setError(err)
        }
    };

    /**
     * Sets error state if geolocating the user is denied permission or if
     * something goes wrong.
     * 
     * @param {Object} err - The response error given by geolocation.
     * 
     * @returns {void}
     */
    const geoError = (err) => {
        setError(err)
    };

    /**
     * Attempts to retrieve the user's geolocation information on component mount.
     * Executes geoSuccess if perms are granted, geoError if perms are denied and user is
     * notified with instructions or a request to enable location services.
     * Geolocation availability is checked and a message is logged if the browser does not support it.
     */
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.permissions
            .query({ name: "geolocation" })
            .then(function (result) {

            if (result.state === "granted") {
                console.log('Success, we got your coordinates!');
                navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOpts);
            } else if (result.state === "prompt") {
                navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOpts);
            } else if (result.state === "denied") {
                // TODO: If denied then show instructions to enable location
            }
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    /**
     * Listens for changes to the error state and triggers a toast notification
     * if an error occurs. The notification will not be shown again if it is already
     * active, to prevent duplicates.
     */
    useEffect(() => {
        if (error && !toast.isActive(toastId.current)) {
            // Default message if no useful error message is given by failed API call
            let msg = "Couldn't make that request, please try again or another input! 🤠";

            if (error.response) {
                msg = error.response.data.message;
            } else if (error.description) {
                msg = error.description;
            }

            toastId.current = toast.error(msg);
        }
    }, [error]);

    /**
     * Listens for changes in userCity and eventType; when both have valid values, it 
     * triggers the appropriate fetch API call based on the event type selected by the
     * user. After call is done, event type state is reset to null to prevent duplicate
     * calls being made unintentionally. Mainly a way to ensure that we have the user's
     * location before any calls are made (obtaining location can be slow apparently).
     */
    useEffect(() => {
        if (userCity && eventType) {
            switch (eventType) {
                case 'featured':
                    fetchFeaturedEvents();
                    break;
                case 'justAnnounced':
                    fetchJustAnnounced();
                    break;
                case 'thisWeekend':
                    fetchJustAnnounced();
                    break;
                default:
                    break;
            }

            setEventType(null);
        }
    }, [userCity, eventType]);


    return (
        <>
            <Header />

            <div className="button-container">
                <Button onClickFunc={() => setEventType('featured')}
                        buttonText='Featured Events' />
                <Button onClickFunc={() => setEventType('justAnnounced')}
                        buttonText='Just Announced' />
                <Button onClickFunc={() => setEventType('thisWeekend')}
                        buttonText='This Weekend' />
                <SearchInput onSearch={fetchSearch} />
            </div>

            <EventDisplay events={events} />

            <ToastContainer
                position="bottom-center"
                autoClose={3500}
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