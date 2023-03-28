import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';

export const GithubBirth = () => {
    const [birth, updateBirth] = useState([]);

    const fetchBirth = async() => {
        const info = await API.get('servproj3mk3', '/born');
        updateBirth(info.birth);
    };

    useEffect(() => {
        fetchBirth();
    }, []);

    return (
        <>
            <h2>GithubBirth works?</h2>
            {
                birth.map((born) => (
                    <h3>{born.name} was forged on {born.day} and proceeded to alter the internet...</h3>
                ))
            }
        </>        
    )
}