import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native';
import Header from '../components/Header';

const helpData = [
  {
    image: require('../../assets/help/step1.png'),
    desc: 'El visitante/cartero escanea el QR para comunicarse con un ocupante (esté o no en casa).',
    step: 'Paso 1: Escanear el QR',
  },
  {
    image: require('../../assets/help/step2.png'),
    desc: 'El ocupante atiende la llamada o WhatsApp.',
    step: 'Paso 2: Comunicación',
  },
  {
    image: require('../../assets/help/step3.png'),
    desc: 'Abrís tu puerta o acordás la entrega.',
    step: 'Paso 3: Recepción',
  },
];

const { width } = Dimensions.get('window');

export default function HelpScreen() {
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const goToStep = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setActiveIndex(index);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.step}>{item.step}</Text>
      <Text style={styles.desc}>{item.desc}</Text>
    </View>
  );

  return (
    <View style={styles.root}>
      <Header />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          ¿Cómo funciona <Text style={{color: '#007AFF'}}>QR</Text><Text style={{color: '#000'}}>ing</Text>?
        </Text>
        <FlatList
          ref={flatListRef}
          data={helpData}
          renderItem={renderItem}
          keyExtractor={(_, idx) => idx.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
          initialScrollIndex={0}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          getItemLayout={(_, index) => ({ length: width - 80, offset: (width - 80) * index, index })}
        />
        <View style={styles.progressBar}>
          {helpData.map((_, idx) => (
            <View
              key={idx}
              style={[styles.progressDot, activeIndex === idx && styles.progressDotActive]}
            />
          ))}
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.navButton, activeIndex === 0 && styles.navButtonDisabled]}
            onPress={() => goToStep(activeIndex - 1)}
            disabled={activeIndex === 0}
          >
            <Text style={[styles.navButtonText, activeIndex === 0 && styles.navButtonTextDisabled]}>Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, activeIndex === helpData.length - 1 && styles.navButtonDisabled]}
            onPress={() => goToStep(activeIndex + 1)}
            disabled={activeIndex === helpData.length - 1}
          >
            <Text style={[styles.navButtonText, activeIndex === helpData.length - 1 && styles.navButtonTextDisabled]}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#EAF6FF',
  },
  contentContainer: {
    flex: 1,
    margin: 24,
    backgroundColor: '#fff',
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    paddingTop: 36,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 0,
  },
  carousel: {
    marginTop: 8,
    flexGrow: 0,
  },
  slide: {
    width: width - 80,
    backgroundColor: '#f6faff',
    borderRadius: 16,
    alignItems: 'center',
    padding: 16,
    minHeight: 320,
    marginHorizontal: 10,
  },
  image: {
    width: width - 120,
    height: 180,
    marginBottom: 16,
    borderRadius: 12,
  },
  step: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  desc: {
    fontSize: 16,
    color: '#48484A',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  progressDot: {
    width: 24,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D1D6',
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: '#007AFF',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 12,
    paddingHorizontal: 24,
  },
  navButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderWidth: 1.5,
    borderColor: '#007AFF',
    marginHorizontal: 8,
  },
  navButtonDisabled: {
    borderColor: '#D1D1D6',
    backgroundColor: '#f6faff',
  },
  navButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  navButtonTextDisabled: {
    color: '#D1D1D6',
  },
}); 