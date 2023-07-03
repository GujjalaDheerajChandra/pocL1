import React, { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useQuery, gql, useMutation } from "@apollo/client";
import { Image, Button, Icon, Rating, Label } from "semantic-ui-react";
import "../App.css";
const GET_PRODUCT_DATA = gql`
  query getProductData($id: Int!) {
    oneProductData(id: $id) {
      id
      title
      description
      price
      discountPercentage
      rating
      stock
      brand
      category
      thumbnail
      images
    }
  }
`;

const ADD_ITEM_TO_CART = gql`
  mutation addcartItem($productId: Int!, $quantity: Int!) {
    addCartItem(productId: $productId, quantity: $quantity)
  }
`;

function Product(props) {
  
  const { loading, error, data } = useQuery(GET_PRODUCT_DATA, {
    variables: { id: props.productId },
  });
  const [imageurl, setImageurl] = useState("");
  const [quant, setQuant] = useState(1);
  const increase = () => {
    setQuant((prevValue) => prevValue + 1);
  };
  const decrease = () => {
    setQuant((prevValue) => {
      if (prevValue < 2) return prevValue;
      return prevValue - 1;
    });
  };
  const [addcartItem] = useMutation(ADD_ITEM_TO_CART, {
    update(_, result) {
      props.onAddItemClick('success');
    },
    variables: { productId: props.productId, quantity: quant },
  });

  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Error : {error.message}</p>;
  }
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    thumbnail,
    images,
  } = data.oneProductData;
  if (thumbnail && imageurl === "") {
    setImageurl(thumbnail);
  }

  const handleCartclick = () => {
    addcartItem();
  };

  return (
    <>
      <div className="productData">
        <div className="imagedata">
          <div className="productImage">
            <Image src={imageurl} size="medium" inline={true} />
          </div>
          <div className="imagethumbnails">
            {images.map((item, index) => {
              return (
                <Image
                  className="thumbnailImage"
                  key={index}
                  src={item}
                  size="tiny"
                  inline={true}
                  onClick={() => setImageurl(item)}
                />
              );
            })}
          </div>
        </div>
        <div className="productDetails">
          <h1>{title}</h1>
          <Rating icon="star" defaultRating={rating} maxRating={5} disabled />
          <span>{rating}</span>
          <h6 className="productDescription">{description}</h6>
          <p className="discpercent">-{discountPercentage}%</p>
          <span className="price">
            ₹{((price * (100 - discountPercentage)) / 100).toFixed(2)}
          </span>
          <p
            className="price"
            style={{ textDecoration: "line-through", margin: "10px 0" }}
          >
            ₹{price}
          </p>
          <h6 style={{ fontSize: "17px", margin: "10px 0" }}>
            In stock: {stock}
          </h6>
          <h5 style={{ fontSize: "17px", margin: "10px 0" }}>Brand: {brand}</h5>
          <div style={{ margin: "10px 0" }}>
            <h4
              style={{ fontSize: "17px", margin: "10px 0", display: "inline" }}
            >
              Quantity:
            </h4>
            <Button
              onClick={increase}
              style={{ marginLeft: "5px" }}
              size="mini"
            >
              +
            </Button>
            <Label style={{ marginLeft: "5px" }} size="medium">
              {quant}
            </Label>
            <Button
              onClick={decrease}
              style={{ marginLeft: "5px" }}
              size="mini"
            >
              -
            </Button>
          </div>
          <div style={{ display: "block" }}>
            <Button onClick={handleCartclick} icon labelPosition="left" primary>
              <Icon name="cart" />
              Add to Cart
            </Button>
            <Button icon labelPosition="right" standard>
              <Icon name="star" />
              Add to WishList
            </Button>
          </div>
        </div>
      
      </div>
    </>
  );
}

export default Product;
