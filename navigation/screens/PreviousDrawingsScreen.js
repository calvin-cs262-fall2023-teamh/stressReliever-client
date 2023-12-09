import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';

// Import images
import image1 from '../../pictures/1.jpg';
import image2 from '../../pictures/2.jpg';
import image3 from '../../pictures/3.jpg';
import image4 from '../../pictures/4.jpg';
import image5 from '../../pictures/5.jpg';
import image6 from '../../pictures/6.jpg';
import image7 from '../../pictures/7.jpg';

const { width } = Dimensions.get('window');

const PreviousDrawingsScreen = () => {
  // Array of images
  const images = [image1, image2, image3, image4, image5, image6, image7];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleBar}>
        <Text style={styles.title}>Previous Drawings</Text>
      </View>
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <View key={index.toString()} style={styles.imageWrapper}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  titleBar: {
    backgroundColor: '#333', // Dark bar for the title
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  imageWrapper: {
    margin: 10,
    borderRadius: 10, // Optional for rounded corners
    overflow: 'hidden', // Needed to apply the borderRadius
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: width / 2 - 40, // Adjust the width to fit two images per row with added margin
    height: width / 2 - 40, // Making the height equal to the width for square images
  },
});

export default PreviousDrawingsScreen;
