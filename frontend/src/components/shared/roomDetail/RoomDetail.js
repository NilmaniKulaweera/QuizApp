import React from 'react';
import './RoomDetail.css';

const RoomDetail = (props) => {
    const { roomId } = props;

    return (
        <div className="room-details pa2">
            <div>
                <h1>Room Details</h1>
            </div>
            <div className="card-content" style={{width: "100%"}}>
                <p className="fw9">Room Id</p>
                <p>{ roomId }</p>
            </div>
        </div>
    );
}
    
export default RoomDetail;