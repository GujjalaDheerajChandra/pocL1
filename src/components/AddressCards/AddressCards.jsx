import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import "./AddressCards.css";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_ALL_ADDRESS = gql`
  query allAddress($id: Int) {
    getAllAddress(id: $id) {
      id
      name
      address
      cityname
      state
      zipcode
    }
  }
`;

const AddressCards = ({
  setShippingButton,
  setAddressId,
  addressIdforOrder,
}) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
  };
  const { loading, error, data, refetch } = useQuery(GET_ALL_ADDRESS, {
    variables: { id: 1 },
  });
  useEffect(() => {
    if (selectedCard) {
      setAddressId(selectedCard);
      setShippingButton(false);
    } else {
      setShippingButton(true);
    }
  }, [selectedCard]);
  useEffect(() => {
    if (addressIdforOrder) {
      setSelectedCard(addressIdforOrder);
    }
  }, [addressIdforOrder]);
  useEffect(() => {
    refetch({ id: 1 });
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <Card.Group>
      {data.getAllAddress &&
        data.getAllAddress.length > 0 &&
        data.getAllAddress.map((card) => (
          <Card
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            color={selectedCard === card.id ? "green" : null}
          >
            <Card.Content>
              <Card.Header>{card.name}</Card.Header>
              <div className="meta-description">
                <Card.Meta>Address:</Card.Meta>
                <Card.Description>{card.address}</Card.Description>
              </div>
              <div className="meta-description">
                <Card.Meta>City:</Card.Meta>
                <Card.Description>{card.cityname}</Card.Description>
              </div>
              <div className="meta-description">
                <Card.Meta>State:</Card.Meta>
                <Card.Description>{card.state}</Card.Description>
              </div>
              <div className="meta-description">
                <Card.Meta>ZipCode:</Card.Meta>
                <Card.Description>{card.zipcode}</Card.Description>
              </div>
            </Card.Content>
          </Card>
        ))}
    </Card.Group>
  );
};

export default AddressCards;
