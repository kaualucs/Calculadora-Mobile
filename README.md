# Calculadora — React Native + Expo + React Native Paper

Calculadora simples com as operações básicas (+, −, ×, ÷), feita para a disciplina de Soluções Mobile (UniSATC).

Usa componentes do **React Native Paper** (`PaperProvider`, `Appbar`, `Surface`, `Text`, `Button`) e o Hook **`useState`** para guardar o valor do display, o valor anterior, o operador escolhido e se o próximo dígito começa um número novo.

## Funcionalidades

- Soma, subtração, multiplicação e divisão
- Contas encadeadas (ex.: `2 + 3 × 4 =` calcula passo a passo)
- Decimal, porcentagem, apagar último dígito (⌫) e limpar (C)
- Divisão por zero mostra "Erro"

## Tecnologias

- Expo SDK 58
- React Native 0.88
- React Native Paper 5

## Como rodar no emulador do Android Studio

1. **Abrir o emulador:** no Android Studio, vá em *Device Manager*, crie um dispositivo virtual (se ainda não tiver) e clique em ▶ para ligá-lo. Deixe ele aberto.

2. **Baixar o projeto e instalar as dependências:**
   ```bash
   git clone https://github.com/SEU-USUARIO/calculadora.git
   cd calculadora
   npm install
   ```

3. **Rodar:**
   ```bash
   npx expo start
   ```
   Com o emulador aberto, aperte **`a`** no terminal. O Expo instala o Expo Go no emulador e abre o app.
