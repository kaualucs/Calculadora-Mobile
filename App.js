import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  PaperProvider,
  MD3DarkTheme,
  Appbar,
  Surface,
  Text,
  Button,
} from 'react-native-paper';

function calcular(a, b, operador) {
  switch (operador) {
    case '+':
      return a + b;
    case '−':
      return a - b;
    case '×':
      return a * b;
    case '÷':
      return b === 0 ? NaN : a / b;
    default:
      return b;
  }
}

function formatar(numero) {
  if (!isFinite(numero)) return 'Erro';
  return parseFloat(numero.toPrecision(12)).toString();
}

export default function App() {
  const [display, setDisplay] = useState('0');
  const [valorAnterior, setValorAnterior] = useState(null);
  const [operador, setOperador] = useState(null);
  const [aguardandoNovo, setAguardandoNovo] = useState(false);

  function digitar(digito) {
    if (display === 'Erro' || aguardandoNovo) {
      setDisplay(digito);
      setAguardandoNovo(false);
      return;
    }
    if (display.length >= 12) return;
    setDisplay(display === '0' ? digito : display + digito);
  }

  function inserirPonto() {
    if (display === 'Erro' || aguardandoNovo) {
      setDisplay('0.');
      setAguardandoNovo(false);
      return;
    }
    if (!display.includes('.')) setDisplay(display + '.');
  }

  function escolherOperacao(op) {
    if (display === 'Erro') return;
    const atual = parseFloat(display);

    if (valorAnterior !== null && operador && !aguardandoNovo) {
      const resultado = calcular(valorAnterior, atual, operador);
      setDisplay(formatar(resultado));
      setValorAnterior(resultado);
    } else {
      setValorAnterior(atual);
    }
    setOperador(op);
    setAguardandoNovo(true);
  }

  function igual() {
    if (operador === null || valorAnterior === null || display === 'Erro') return;
    const resultado = calcular(valorAnterior, parseFloat(display), operador);
    setDisplay(formatar(resultado));
    setValorAnterior(null);
    setOperador(null);
    setAguardandoNovo(true);
  }

  function limpar() {
    setDisplay('0');
    setValorAnterior(null);
    setOperador(null);
    setAguardandoNovo(false);
  }

  function apagar() {
    if (display === 'Erro' || aguardandoNovo) return limpar();
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  }

  function porcentagem() {
    if (display === 'Erro') return;
    setDisplay(formatar(parseFloat(display) / 100));
  }

  const linhas = [
    [['C', 'acao'], ['⌫', 'acao'], ['%', 'acao'], ['÷', 'op']],
    [['7', 'num'], ['8', 'num'], ['9', 'num'], ['×', 'op']],
    [['4', 'num'], ['5', 'num'], ['6', 'num'], ['−', 'op']],
    [['1', 'num'], ['2', 'num'], ['3', 'num'], ['+', 'op']],
    [['0', 'num'], ['.', 'num'], ['=', 'igual']],
  ];

  function aoPressionar(rotulo) {
    if (/^[0-9]$/.test(rotulo)) return digitar(rotulo);
    if (rotulo === '.') return inserirPonto();
    if (rotulo === 'C') return limpar();
    if (rotulo === '⌫') return apagar();
    if (rotulo === '%') return porcentagem();
    if (rotulo === '=') return igual();
    return escolherOperacao(rotulo);
  }

  function modoDoBotao(tipo, rotulo) {
    if (tipo === 'igual') return 'contained';
    if (tipo === 'op') return operador === rotulo && aguardandoNovo ? 'contained' : 'contained-tonal';
    if (tipo === 'acao') return 'outlined';
    return 'elevated';
  }

  return (
    <PaperProvider theme={MD3DarkTheme}>
      <StatusBar style="light" />
      <View style={[styles.container, { backgroundColor: MD3DarkTheme.colors.background }]}>
        <Appbar.Header>
          <Appbar.Content title="Calculadora" />
        </Appbar.Header>

        <Surface style={styles.display} elevation={2}>
          <Text variant="titleMedium" style={styles.expressao}>
            {valorAnterior !== null && operador ? `${formatar(valorAnterior)} ${operador}` : ' '}
          </Text>
          <Text variant="displayMedium" numberOfLines={1} adjustsFontSizeToFit>
            {display}
          </Text>
        </Surface>

        <View style={styles.teclado}>
          {linhas.map((linha, i) => (
            <View key={i} style={styles.linha}>
              {linha.map(([rotulo, tipo]) => (
                <Button
                  key={rotulo}
                  mode={modoDoBotao(tipo, rotulo)}
                  onPress={() => aoPressionar(rotulo)}
                  style={[styles.botao, rotulo === '0' && styles.botaoLargo]}
                  contentStyle={styles.botaoConteudo}
                  labelStyle={styles.botaoTexto}
                >
                  {rotulo}
                </Button>
              ))}
            </View>
          ))}
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  display: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    minHeight: 150,
  },
  expressao: {
    opacity: 0.6,
  },
  teclado: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  linha: {
    flexDirection: 'row',
  },
  botao: {
    flex: 1,
    margin: 6,
    borderRadius: 16,
    minWidth: 0,
  },
  botaoLargo: {
    flex: 2.15,
  },
  botaoConteudo: {
    height: 68,
  },
  botaoTexto: {
    fontSize: 24,
  },
});
