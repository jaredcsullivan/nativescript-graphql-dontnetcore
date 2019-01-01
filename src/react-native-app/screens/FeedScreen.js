import React from "react";
import { View, StyleSheet, Link } from "react-native";

import { gql } from "apollo-boost";
import { Query } from "react-apollo";

import { GET_DOG } from "./DetailScreen";
import DogList from "../DogList";
import { Dog } from "../Dog";
import { Fetching, Error } from "../Fetching";


const GET_DOGS = gql`
  {
    dogs {
      id
      breed
      displayImage
    }
  }
`;

export default class FeedScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
    <Query query={GET_DOGS}>
      {({ loading, error, data, client }) => {
        if (loading) return <Fetching />;
        if (error) return <Error />;
        console.log(data);
        return (
          <DogList
            data={data.dogs}
            renderRow={(type, data) => (
                <Dog {...data} url={data.displayImage} />
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
  }
});
