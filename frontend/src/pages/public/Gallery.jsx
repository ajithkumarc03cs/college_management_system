import "./Gallery.css";


function Gallery() {

    const images = [
        {
            id: 1,
            title: "Campus",
            image: null,
        },
        {
            id: 2,
            title: "Library",
            image: null,
        },
        {
            id: 3,
            title: "Computer Lab",
            image: null,
        },
        {
            id: 4,
            title: "Classroom",
            image: null,
        },
        {
            id: 5,
            title: "College Event",
            image: null,
        },
        {
            id: 6,
            title: "Sports",
            image: null,
        },
        {
            id: 7,
            title: "Cultural Event",
            image: null,
        },
        {
            id: 8,
            title: "Students",
            image: null,
        },
    ];


    return (

        <div className="public-gallery">


            <section className="gallery-page-hero">

                <div className="container">

                    <span className="section-label">
                        Campus Life
                    </span>

                    <h1>
                        College Gallery
                    </h1>

                    <p>
                        Explore our campus, facilities,
                        events and student activities.
                    </p>

                </div>

            </section>


            <section className="gallery-list-section">

                <div className="container">

                    <div className="section-heading">

                        <span className="section-label">
                            Our Memories
                        </span>

                        <h2>
                            Campus Gallery
                        </h2>

                    </div>


                    <div className="public-gallery-grid">

                        {images.map((item) => (

                            <div
                                className="public-gallery-card"
                                key={item.id}
                            >

                                {item.image ? (

                                    <img
                                        src={item.image}
                                        alt={item.title}
                                    />

                                ) : (

                                    <div className="gallery-placeholder">
                                        {item.title}
                                    </div>

                                )}

                            </div>

                        ))}

                    </div>

                </div>

            </section>


        </div>

    );

}


export default Gallery;