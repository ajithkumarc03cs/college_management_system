import { useEffect, useState } from "react";

import api from "../../api/axios";
import "./Events.css";


function Events() {

    const [page, setPage] = useState(null);
    const [events, setEvents] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const loadEvents = async () => {

            try {

                setLoading(true);

                const response = await api.get(
                    "public/events/"
                );

                setPage(response.data.page);
                setEvents(response.data.events || []);

            } catch (err) {

                console.error(
                    "Failed to load events:",
                    err
                );

                setError(
                    "Unable to load events."
                );

            } finally {

                setLoading(false);

            }

        };


        loadEvents();

    }, []);


    if (loading) {

        return (
            <div className="public-events">

                <div className="container">

                    <p>
                        Loading events...
                    </p>

                </div>

            </div>
        );

    }


    if (error) {

        return (
            <div className="public-events">

                <div className="container">

                    <p>
                        {error}
                    </p>

                </div>

            </div>
        );

    }


    if (!page) {
        return null;
    }


    return (

        <div className="public-events">


            <section className="events-page-hero">

                <div className="container">

                    <span className="section-label">
                        {page.hero_label}
                    </span>

                    <h1>
                        {page.hero_title}
                    </h1>

                    <p>
                        {page.hero_description}
                    </p>

                </div>

            </section>


            <section className="events-list-section">

                <div className="container">

                    <div className="section-heading">

                        <span className="section-label">
                            {page.section_label}
                        </span>

                        <h2>
                            {page.section_title}
                        </h2>

                    </div>


                    <div className="public-event-grid">

                        {events.length === 0 ? (

                            <p>
                                No events available.
                            </p>

                        ) : (

                            events.map((event) => (

                                <div
                                    className="public-event-card"
                                    key={event.id}
                                >

                                    <div className="event-page-image">

                                        {event.image ? (

                                            <img
                                                src={event.image}
                                                alt={event.title}
                                            />

                                        ) : (

                                            "Event Image"

                                        )}

                                    </div>


                                    <div className="public-event-content">

                                        <span>
                                            {event.date}
                                        </span>

                                        <h3>
                                            {event.title}
                                        </h3>

                                        <p>
                                            {event.description}
                                        </p>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </div>

            </section>


        </div>

    );

}


export default Events;