import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import Form from './src/components/Form';
import ResultCalculation from './src/components/ResultCalculation';
import Footer from './src/components/Footer';
import colors from './src/utils/colors';

export default function App() {

  const [capital, setCapital] = useState(null);
  const [interest, setInterest] = useState(null);
  const [months, setMonths] = useState(null);
  const [total, setTotal] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {

    if (capital && interest && months) {
      calculate();
    } else {
      reset();
    }

  }, [capital, interest, months]);

  const calculate = () => {

    reset();

    if (!capital) {
      setErrorMessage('Ingresa la cantidad que quieres solicitar');
    } else if (!interest) {
      setErrorMessage('Ingresa el interes del prestamo');
    } else if (!months) {
      setErrorMessage('Selecciona los meses a pagar');
    } else {

      const i = interest / 100;
      const fee = capital / ((1 - Math.pow(i + 1, -months)) / i);

      setTotal({
        monthlyFee: fee.toFixed(2),
        totalPayable: (fee * months).toFixed(2)
      });
    }
  }

  const reset = () => {
    setErrorMessage('');
    setTotal(null);
  }

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor={colors.PRIMARY_COLOR_DARK} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.background} />
        <Text style={styles.titleApp}>Cotizador de Prestamos</Text>
        <Form
          setCapital={setCapital}
          setInterest={setInterest}
          setMonths={setMonths}
        />
      </SafeAreaView>

      <ResultCalculation
        capital={capital}
        interest={interest}
        months={months}
        total={total}
        errorMessage={errorMessage}
      />

      <Footer
        calculate={calculate}
      />
    </>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    height: 290,
    alignItems: 'center'
  },
  background: {
    backgroundColor: colors.PRIMARY_COLOR,
    height: 200,
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    zIndex: -1
  },
  titleApp: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15
  }
});