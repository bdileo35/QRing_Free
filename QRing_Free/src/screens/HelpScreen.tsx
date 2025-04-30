import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList, ScrollView } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && flatListRef.current) {
      // Pequeño timeout para asegurar que el FlatList está listo
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: 0, animated: false });
        setActiveIndex(0);
      }, 100);
    }
  }, [isFocused]);

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            ¿Cómo funciona <Text style={{color: '#007AFF'}}>QR</Text><Text style={{color: '#000'}}>ing</Text>?
          </Text>
          
          <View style={styles.carouselContainer}>
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
              snapToInterval={width - 100}
              snapToAlignment="center"
              decelerationRate="fast"
              getItemLayout={(_, index) => ({ 
                length: width - 100,
                offset: (width - 100) * index,
                index 
              })}
            />
            
            <View style={styles.progressBar}>
              {helpData.map((_, idx) => (
                <View
                  key={idx}
                  style={[styles.progressDot, activeIndex === idx && styles.progressDotActive]}
                />
              ))}
            </View>

            <View style={styles.swipeIndicator}>
              <Icon name="gesture-tap-button" size={28} color="#007AFF" />
              <Text style={styles.swipeText}>Deslizá para ver más</Text>
            </View>
          </View>

          <View style={styles.instructionContainer}>
            <Text style={styles.instructionTitle}>💡 ¿Sabías que?</Text>
            <Text style={styles.instructionText}>
              • QRing funciona aunque no estés en casa{'\n'}
              • Podés atender desde cualquier lugar{'\n'}
              • Tu número está seguro, nadie lo ve
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#EAF6FF',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  contentContainer: {
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
    paddingBottom: 24,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 0,
  },
  carouselContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.3)',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  carousel: {
    flexGrow: 0,
  },
  slide: {
    width: width - 100,
    alignItems: 'center',
    padding: 16,
    minHeight: 400,
  },
  image: {
    width: width - 140,
    height: 320,
    marginBottom: 16,
    borderRadius: 12,
  },
  step: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
    textAlign: 'center',
    width: '100%',
  },
  desc: {
    fontSize: 16,
    color: '#48484A',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
    lineHeight: 22,
    width: '100%',
    paddingHorizontal: 8,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
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
  swipeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    gap: 4,
    opacity: 0.8,
  },
  swipeText: {
    color: '#007AFF',
    fontSize: 13,
    fontWeight: '400',
  },
  instructionContainer: {
    width: '90%',
    backgroundColor: '#EAF6FF',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 24,
  },
  instructionTitle: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 2,
    paddingLeft: '5%',
  },
  instructionText: {
    color: '#48484A',
    fontSize: 14,
    lineHeight: 22,
    paddingLeft: '5%',
  },
}); 