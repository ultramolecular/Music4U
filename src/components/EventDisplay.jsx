/**
 * Event displaying component that shows data points
 */

const EventDisplay = ({ events }) => {
    return (
        <div className="event-display-container">
            {events.map((event, index) => (
                <div key={index} className="event-card">
                    <h3>{event.name}</h3>
                    <p>{event.date}</p>
                    {/* TODO: add more event details here */}
                </div>
            ))}
        </div>
    );
};

export default EventDisplay