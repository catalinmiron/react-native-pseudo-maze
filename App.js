import React from "react";
import { StyleSheet, StatusBar, View, Dimensions } from "react-native";
import posed from "react-native-pose";
const { width, height } = Dimensions.get("screen");

const GridItem = posed.View({
  RIGHT: { rotate: "45deg" },
  LEFT: { rotate: "-45deg" }
});
const LINE_WIDTH = 3;

const RATIO = height / width;
const ITEMS_PER_ROW = 10;
const SIZE = width / ITEMS_PER_ROW;
const ROWS = Math.round((RATIO * height) / SIZE);
const TOTAL_ITEMS = ITEMS_PER_ROW * ROWS;

const POSITIONS = ["LEFT", "RIGHT"];
const getRandomPosition = (arr = POSITIONS) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const Grid = ({ items }) =>
  items.map(({ key, position }) => (
    <GridItem pose={position} key={key} style={styles.gridItem}>
      <View style={styles.gridItemDiagonal} />
    </GridItem>
  ));

export default class App extends React.Component {
  animationInterval = null;
  constructor(props) {
    super(props);

    this.state = {
      items: this.constructGrid()
    };
  }

  constructGrid = () => {
    return [...Array(TOTAL_ITEMS).keys()].map(index => ({
      key: index,
      position: getRandomPosition()
    }));
  };

  componentDidMount() {
    StatusBar.setHidden(true);
    // this.animationInterval = setInterval(() => {
    //   this.setState({
    //     items: this.constructGrid()
    //   });
    // }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.animationInterval);
    this.animationInterval = null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Grid items={this.state.items} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gridItem: {
    width: SIZE,
    height: SIZE,
    alignItems: "center",
    justifyContent: "center"
  },
  gridItemDiagonal: {
    width: LINE_WIDTH,
    height: Math.sqrt(2) * SIZE,
    backgroundColor: "#333"
  },
  container: {
    flex: 1,
    backgroundColor: "gold",
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
