import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';

export const GithubBirth = () => {
    const [born, updateBorn] = useState([]);

    const fetchBorn = async() => {
        const data = await API.get('servproj3mk3api', '/born');
        updateBorn(data.born);
    };

    useEffect(() => {
        fetchBorn();
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