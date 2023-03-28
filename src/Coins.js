import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';

export const Coins = () => {
    const [coins, updateCoins] = useState([]);

    const fetchCoins = async() => {
        const data = await API.get('serveproj3mk3api', '/coins');
        updateCoins(data.coins);
    };

    useEffect(() => {
        fetchCoins();
    }, []);

    return (
        {
            coins.map((coin, index) => (
                <div key={index}>
                    <h2>{coin.name} - "{coin.symbol}"</h2>
                    <h4>${coin.price_usd}</h4>
                </div>
            ))
        }
    )
}