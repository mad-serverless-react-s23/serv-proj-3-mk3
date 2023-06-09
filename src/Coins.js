import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';

export const Coins = () => {
    const [coins, updateCoins] = useState([]);

    const [input, updateInput] = useState({ limit: 5, start: 0});

    const updateInputValues = (type, value) => updateInput(
        { ...input, [type]: value }
    );

    const [loading, updateLoading] = useState(true);

    const fetchCoins = async() => {
        updateLoading(true);
    const { start, limit } = input;
        const data = await API.get('servproj3mk3api', `/coins?start=${start}&limit=${limit}`);
        updateCoins(data.coins);
        updateLoading(false);
    };

    useEffect(() => {
        fetchCoins();
    }, []);

    return (
        <>
            <h2>Want to know how badly cryptocurrency is going?</h2>
            <input
            onChange={e => updateInputValues('start', e.target.value)}
            placeholder="start"
            />
            <hr/>
            <input
                onChange={e => updateInputValues('limit', e.target.value)}
                placeholder="limit"
            />
            <hr/>
            <button
                onClick={fetchCoins}
            >Fetch Coins</button>
            <hr/>
            {loading && <h2>Loading your request...</h2>}
            {
                !loading && coins.map((coin, index) => (
                    <div key={index}>
                        <h2>{coin.name} - "{coin.symbol}"</h2>
                        <h4>${coin.price_usd}</h4>
                    </div>
                ))
            }
        </>        
    );
}