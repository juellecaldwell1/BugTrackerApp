import React from 'react';


const Card1 = () => {
  return (
    <div className="container">
      <div className="card">
        <div className="front">
          <div className="card-top">
            <p className="card-top-para">Profile</p>
          </div>
          <p className="heading"> Front Card </p>
          <p className="follow">Follow me for more...</p>
          <p>hello and my name is juelle caldlwell and this is the card im going to be holding the data inside do you like it or no i have so much more gong for me as we speak so buckle up your seat belt cause were going for an ride </p>
        </div>
        <div className="back">
          <p className="heading">Follow Me</p>
          <div className="icons">
            <p className="icon-text">Instagram</p>
            <p className="icon-text">Twitter</p>
            <p className="icon-text">WhatsApp</p>
            <p className="icon-text">Facebook</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card1;
