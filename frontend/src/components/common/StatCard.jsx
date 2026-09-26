import { Link } from "react-router-dom";

function StatCard({
    title,
    value,
    icon,
    link,
    description
}) {

    const card = (
        <div className="stat-card">

            <div className="stat-card-top">

                <div>

                    <span className="stat-title">
                        {title}
                    </span>

                    <h2 className="stat-value">
                        {value ?? 0}
                    </h2>

                </div>

                <div className="stat-icon">
                    {icon}
                </div>

            </div>


            {description && (
                <span className="stat-description">
                    {description}
                </span>
            )}

        </div>
    );


    if (link) {

        return (
            <Link
                to={link}
                className="stat-card-link"
            >
                {card}
            </Link>
        );

    }


    return card;
}

export default StatCard;