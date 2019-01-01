import React from "react";
import { View, StyleSheet } from "react-native";

import { gql } from "apollo-boost";
import { Query } from "react-apollo";

import { DogWithLikes } from "../Dog";
import DogList from "../DogList";
import { Fetching, Error } from "../Fetching";

export const GET_DOG = gql`
  query getDogByBreed($breed: String!) {
    dog(breed: $breed) {
      images {
        url
        id
        isLiked @client
      }
    }
  }
`;

export default class DetailScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
        <View style={styles.container}>
        <Query query={GET_DOG} variables={{ breed }}>
          {({ loading, error, data }) => {
            if (loading) return <Fetching />;
            if (error) return <Error />;
    
            return (
              <DogList
                data={data.dog.images}
                renderRow={(type, data) => (
                  <DogWithLikes
                    id={id}
                    isLiked={data.isLiked}
                    imageId={data.id}
                    url={data.url}
                  />
                )}
              />
            );
          }}
        </Query>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flex: 1
    },
    fetching: {
      fontSize: 30,
      color: "#23a599",
      margin: 10,
      letterSpacing: 1
    }
  });
