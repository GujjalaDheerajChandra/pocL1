import { useQuery, gql } from "@apollo/client";
import { Card } from "semantic-ui-react";
const GET_USER = gql`
  query getUser($id: ID!) {
    userProfile(id: $id) {
      id
      fullName
      phoneNumber
      email
    }
  }
`;

function DisplayUser(props) {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: props.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  const { id: userId, fullName, phoneNumber, email } = data.userProfile;
  
  return (
    <div key={userId}>
      <Card>
        <Card.Content>
          <Card.Header>{fullName}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Card.Description>Email: {email}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Card.Description>Phone Number: {phoneNumber}</Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}

export default DisplayUser;
