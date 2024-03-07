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
                const { name, dates, _embedded } = event;
                const { venues, attractions } = _embedded;
                const genre = attractions?.[0]?.classifications?.[0]?.genre?.name;
                const artist = attractions?.map((attraction) => attraction.name).join(', ');
                const venueName = venues?.[0]?.name;
                const eventDate = dates?.start?.localDate;
                const eventTime = dates?.start?.localTime;

                return (
                    <div key={event.id} className="event-card">
                        <h3>{name}</h3>
                        <p>Genre: {genre}</p>
                        <p>Artist(s): {artist}</p>
                        <p>Date: {eventDate}</p>
                        <p>Venue: {venueName}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default EventDisplay