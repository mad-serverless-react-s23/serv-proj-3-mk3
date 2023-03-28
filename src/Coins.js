import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
// dummy data test successful
export const Coins = () => {
    const [coins, updateCoins] = useState([]);

    const fetchCoins = async() => {
        const data = await API.get('servproj3mk3api', '/coins');
        updateCoins(data.coins);
    };

    useEffect(() => {
        fetchCoins();
    }, []);

    return (
        <>
        <h2>Coins works?</h2>
        {
            coins.map((coin, index) => (
                <div key={index}>
                    <h2>{coin.name} - "{coin.symbol}"</h2>
                    <h4>${coin.price_usd}</h4>
                </div>
            ))
        }
        </>
        
    );
}