import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 48.766,
          longitude: 9.2026,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{ latitude: 48.766, longitude: 9.2026 }}
          title="travel photo"
        />
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
