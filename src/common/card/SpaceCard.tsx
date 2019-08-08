import React from 'react';
import './SpaceCard.css';
import Card from 'react-bootstrap/Card';

interface SpaceCardProps {
  title: string;
  children?: React.ReactNode;
}

const SpaceCard: React.FC<SpaceCardProps> = props => {
  return (
    <div className="SpaceCard">
      <Card className="Card">
        <Card.Body>
          <Card.Img className="Image" variant="top" src={require('./space.jpg')}/>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>
              {props.children}
            </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SpaceCard;
