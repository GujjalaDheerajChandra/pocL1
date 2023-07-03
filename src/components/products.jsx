import React from "react";
import { Image, Card, Button, Rating } from "semantic-ui-react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import "../App.css";
const GET_ALL_PRODUCTS = gql`
  query getProducts($id: Int) {
    allProductsData(id: $id) {
      id
      title
      description
      price
      discountPercentage
      thumbnail
      rating
    }
  }
`;

const GridExampleContainer = (props) => {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS, {
    variables: { id: 1 },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div className="productslist">
      {data.allProductsData &&
        data.allProductsData.slice(0, 99).map((item, index) => {
          return (
            <div key={index} value={index} onClick={() => props.onclicked()}>
              <Card as={Link} to={`product/${item.id}`}>
                <Image className="card-image" src={item.thumbnail} ui={false} />
                <Card.Content>
                  <Card.Header>{item.title}</Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Card.Header>
                    <Rating
                      icon="star"
                      defaultRating={item.rating}
                      maxRating={5}
                      disabled
                    />
                    {item.rating}
                  </Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Card.Header>
                    <span >
                      ₹{((item.price * (100 - item.discountPercentage)) / 100).toFixed(2)}
                    </span>
                    <p className="discpercent">{'(-'+item.discountPercentage+')'}%</p>
                  </Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Button fluid color="teal">
                    Buy Now
                  </Button>
                </Card.Content>
              </Card>
            </div>
          );
        })}
    </div>
  );
};
export default GridExampleContainer;
