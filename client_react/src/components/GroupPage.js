import React, { useState, useEffect } from 'react';
import { groups } from '../reducers/group.reducer';



export default function GroupPage({ groupFromGlobalState, fetchGroup }) {
    let group = groupFromGlobalState;
    useEffect(() => {
        const fetch = async () => {
            const action = await fetchGroup();
            group = action.groups;
        };
        fetch();
    }, []);

    return (
        <div>groupPage {group.name}</div>
    )
}