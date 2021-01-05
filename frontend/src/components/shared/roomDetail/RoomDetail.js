import React, {useContext} from 'react';
import './RoomDetail.css';
import {RoomNumberContext} from '../../../App';

const RoomDetail = (props) => {
    const { usernames } = props;

    const roomNumberContext = useContext(RoomNumberContext);

    return (
        <div className="room-details pa2">
            <div>
                <h1>Room Details</h1>
            </div>
            <div className="card-content" style={{width: "100%"}}>
                <p className="fw9">Room Id</p>
                <p>{roomNumberContext.roomNumberState}</p>
                <p className="fw9">Connected Users</p>
                <ul>
                    {usernames.map((username, i) => <li key={i}>{username}</li>)}
                </ul>
            </div>
        </div>
    );
}
    
export default RoomDetail;