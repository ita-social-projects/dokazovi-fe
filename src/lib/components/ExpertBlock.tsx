import React from 'react';
import cards from '../constants/mockDataCards';

interface IExpertProps{
  infoCards: typeof cards;
}

export const ExpertBlock:React.FC<IExpertProps> = (props)=> {
  const {infoCards} = props;
  return (
    <div>
      <h4>Experts</h4>
      <div className="row">{infoCards.map((card) => {
    return (
      <div className="col m3" key={card.phone}>
        <div className="card small">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src={card.photo} alt="doctor" />
          </div>
        </div>
      </div>
    );
  })}</div>
    </div>
  );
};
