import React from 'react';
import './RoomDetail.css';

const RoomDetail = (props) => {
    const { roomId, usernames } = props;

    return (
        <div className="room-details pa2">
            <div>
                <h1>Room Details</h1>
            </div>
            <div className="card-content" style={{width: "100%"}}>
                <p className="fw9">Room Id</p>
                <p>{ roomId }</p>
                <p className="fw9">Connected Users</p>
                <div>
                    {usernames.map((username, i) => <p key={i}>{username}</p>)}
                </div>
            </div>
        </div>
    );
}
    
export default RoomDetail;