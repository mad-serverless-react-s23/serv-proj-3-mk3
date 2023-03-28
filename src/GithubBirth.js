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
            <h1>{born.login} was forged on {born.created_at} and proceeded to alter the internet...</h1>
            <h2>More information about {born.login}:</h2>
            <ul class="theList">
                <li>The alter-ego is {born.name}</li>
                <li>Currently has {born.followers} followers</li>
                <li>Is following {born.following} accounts</li>
                <li>Has {born.public_repos} public repositories</li>
            </ul>
            <p>About {born.login}: {born.bio}</p>
            <p>Profile last updated {born.updated_at}</p>
            <hr/>
        </>        
    )
}