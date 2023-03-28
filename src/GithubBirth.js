import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';

export const GithubBirth = () => {
    const [born, updateBorn] = useState([]);

    const fetchBirth = async() => {
        const info = await API.get('servproj3mk3', '/born');
        updateBorn(info.born);
    };

    useEffect(() => {
        fetchBirth();
    }, []);

    return (
        <>
            <h2>GithubBirth works?</h2>
            {
                born.map(x => (
                    <h3>{x.name} was forged on {x.day} and proceeded to alter the internet...</h3>
                ))
            }
        </>        
    )
}