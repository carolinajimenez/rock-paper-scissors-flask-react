import React, { useState, useEffect } from 'react';

export default function App() {
    const [data, setData] = useState({});

    useEffect(() => {
        fetch("/game", {method: 'GET'}).then(
            (res) => res.json()
        ).then(
            (data) => setData(data)
        ).catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <div>
            {(typeof data.games === 'undefined') ? (
                <p>Loading ...</p>
            ): (
                data.games.map((game, i) => (
                    <p key={i}>{game}</p>
                ))
            )}
        </div>
    )
}
