import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

function MapScreen({ route }) {
  const { latitude, longitude } = route.params.location.location;
  console.log("latitude", latitude);
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title="travel photo" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default MapScreen;
