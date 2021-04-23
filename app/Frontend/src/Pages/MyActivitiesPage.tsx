import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import {UserContext} from '../Context/UserContext';

export default function MyActivitiesPage() {
    const userContext = useContext(UserContext);
    const params = { 'id' : userContext.user.user_id};
    // const params = { 'id' : '---userId---'};
    useEffect(() => {
        axios.get('http://143.198.208.245:9000/api/orders/queue/customer',{params}).then((res) => console.log('res :',res))
    }, [])
    return (
        <div>
            My act
        </div>
    )
}
