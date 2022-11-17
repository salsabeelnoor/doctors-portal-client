import React from "react";

const InfoCard = ({ card }) => {
  const { name, Description, icon, bgClass } = card;
  return (
    <div className={`card p-6 lg:card-side md:card-side shadow-xl ${bgClass}`}>
      <figure>
        <img src={icon} alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-white">{name}</h2>
        <p className="text-white">{Description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
