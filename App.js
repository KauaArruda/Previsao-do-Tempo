import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = '29befefd49d61a11808289c7d097eca0';

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError('');
    setWeatherData(null);

    console.log('Buscando clima para a cidade:', city);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
      );

      console.log('Resposta da API:', response.data);

      setWeatherData(response.data);
    } catch (err) {
      console.error('Erro na requisição:', err);
      setError('Cidade não encontrada ou erro na requisição.');
    } finally {
      setLoading(false);
      console.log('Carregamento finalizado.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previsão do Tempo</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da cidade"
        value={city}
        onChangeText={setCity}
      />
      
      <Button title="Buscar" onPress={fetchWeather} />
      
      {loading && <Text style={styles.loading}>Carregando...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}

      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.cityName}>{weatherData.name}</Text>
          <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
          <Text style={styles.description}>{weatherData.weather[0].description}</Text>

          <FontAwesome
            name={weatherData.weather[0].main === 'Clear' ? 'sun-o' : 'cloud'}
            size={50}
            color="#FFD700"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  loading: {
    fontSize: 16,
    color: '#888',
  },
  error: {
    fontSize: 16,
    color: 'red',
    marginTop: 10,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    color: '#555',
  },
});
