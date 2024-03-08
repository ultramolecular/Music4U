/**
 * Event displaying component that shows data points
 */

const EventDisplay = ({ events }) => {
    if (!events || events.length === 0) {
        return <div>No events to display.</div>
    }
    
    // TODO: add a url for the event and maybe venue location?

    return (
        <div className="event-display-container">
            {events.map((event) => {
                const { name, dates, url, _embedded } = event;
                const { venues, attractions } = _embedded;
                const genre = attractions?.[0]?.classifications?.[0]?.genre?.name;
                const artist = attractions?.map((attraction) => attraction.name).join(', ');
                const venueName = venues?.[0]?.name;
                const eventDate = dates?.start?.localDate;
                const eventTime = dates?.start?.localTime;

                return (
                    <a href={url} target="_blank" rel="noopener noreferrer" key={event.id} className="event-card">
                        <h3>{name}</h3>
                        <p><b>Genre:</b> {genre}</p>
                        <p><b>Artist(s):</b> {artist}</p>
                        <p><b>Date:</b> {eventDate} @ {eventTime}</p>
                        <p><b>Venue:</b> {venueName}</p>
                    </a>
                );
            })}
        </div>
    );
};

export default EventDisplay