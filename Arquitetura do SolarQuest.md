# Arquitetura do Componente SolarQuest

## 1. Visão Geral

O SolarQuest é um componente React de página única que gerencia o estado e a renderização de um jogo de aventura baseado em texto. Ele é construído como uma **máquina de estados finitos**, onde cada "estado" é uma cena da história. A transição entre as cenas é controlada pelas interações do usuário.

### Tecnologias Centrais

- **React**: Para a construção da interface e gerenciamento de estado (via Hooks)
- **Framer Motion**: Para animações declarativas que melhoram a experiência do usuário
- **Lucide React**: Para a utilização de ícones vetoriais
- **Tailwind CSS**: Framework para estilização (inferido pelas classes CSS utilizadas)

## 2. Estrutura de Dados

A lógica do jogo é desacoplada da renderização e centralizada em dois objetos principais: `storyData` e `backgrounds`.

### storyData

Este objeto funciona como o "motor" do jogo. É um mapa onde cada chave é um id de cena e o valor é um objeto contendo todas as informações dessa cena.

#### Estrutura de um Objeto de Cena

```javascript
{
  id: String,           // Identificador único da cena (ex: 'intro')
  type: String,         // Define o tipo de renderização e interação
  title: String,        // O título exibido no cabeçalho da cena
  content: String | Object, // O texto narrativo da cena
  background: String,   // Chave que mapeia para um estilo de fundo
  choices: Array,       // Lista de opções para o jogador (opcional)
  next: String          // Próxima cena (para cenas lineares)
}
```

#### Tipos de Cena Possíveis

- `'input'`: Cena com campo de entrada de texto
- `'choice'`: Cena com múltiplas opções de escolha
- `'story'`: Cena narrativa com botão "Continuar"
- `'ending'`: Cena final do jogo
- `'credits'`: Cena de créditos

#### Estrutura das Escolhas (choices)

```javascript
{
  text: String,         // O texto do botão de escolha
  next: String,         // O id da próxima cena
  gender: String,       // Dados adicionais (opcional)
  terrain: String       // Dados adicionais (opcional)
}
```

### backgrounds

Um objeto que mapeia os nomes de background (ex: `'sertao'`, `'solar'`) a valores de CSS `linear-gradient`. Permite uma fácil customização visual para cada cena.

## 3. Gerenciamento de Estado (React Hooks)

O estado dinâmico do jogo é gerenciado por `useState`:

| Estado | Tipo | Descrição |
|--------|------|-----------|
| `currentScene` | `String` | ID da cena atual (controla o que é exibido) |
| `playerName` | `String` | Nome do jogador |
| `playerGender` | `String` | Gênero escolhido (`'male'` ou `'female'`) |
| `selectedTerrain` | `String` | Terreno escolhido (`'pedraBranca'` ou `'chapada'`) |
| `inputValue` | `String` | Valor do campo de input (temporário) |

## 4. Funções e Manipuladores de Eventos

### Funções Principais

#### `resetGame()`
Reinicia o jogo, restaurando todas as variáveis de estado para seus valores iniciais, e define a cena atual como `'intro'`.

#### `handleChoice(choice)`
Chamada quando o jogador clica em um botão de uma lista de `choices`. Atualiza o estado com base na escolha e avança para a próxima cena definida em `choice.next`.

#### `handleNext(nextScene)`
Função para cenas que só têm um caminho a seguir. Apenas atualiza a cena atual para a `nextScene`.

#### `handleNameSubmit()`
Valida se um nome foi digitado e, em caso afirmativo:
1. Salva o nome no estado
2. Transiciona da cena `'intro'` para `'genderChoice'`

#### `replacePlayerName(text)`
Função utilitária que substitui o placeholder `[Nome]` no texto da história pelo nome real do jogador, personalizando a narrativa.

## 5. Fluxo de Execução e Renderização

O componente segue um **Game Loop** reativo:

```
Renderização Inicial → Interação do Usuário → Atualização de Estado → Re-renderização
```

### Ciclo Detalhado

1. **Renderização Inicial**: Componente montado com `currentScene = 'intro'`
2. **Lógica de Renderização**: JSX renderiza condicionalmente baseado em `scene.type`
3. **Interação do Usuário**: Usuário interage (digita nome, clica botão, etc.)
4. **Disparo do Evento**: Evento `onClick` chama função manipuladora
5. **Atualização de Estado**: Função atualiza estados relevantes e `currentScene`
6. **Re-renderização**: React detecta mudança e re-renderiza o componente
7. **Novo Ciclo**: Processo recomeça com nova cena

Este loop continua até que uma cena do tipo `'ending'` seja alcançada.

## 6. Renderização de Conteúdo Narrativo

A exibição do texto da história utiliza formatação inteligente:

```jsx
{replacePlayerName(scene.content).split('\n\n').map((paragraph, index) => (
  <motion.p 
    key={index}
    className="mb-4 whitespace-pre-line"
    // ...animações
  >
    {paragraph}
  </motion.p>
))}
```

### Funcionalidades

- **`split('\n\n')`**: Divide o texto em parágrafos usando dupla quebra de linha
- **`.map()`**: Itera sobre cada parágrafo, renderizando-o com animação
- **`whitespace-pre-line`**: Preserva quebras de linha (`\n`) no navegador, permitindo diálogos e pausas

## 7. Animações com Framer Motion

### Componentes de Animação

#### `<AnimatePresence mode="wait">`
Envolve a cena principal, garantindo que:
- A animação de saída de uma cena seja concluída
- Antes que a animação de entrada da próxima cena comece
- Evita sobreposições visuais

#### `<motion.div key={currentScene}>`
- **`key={currentScene}`**: Essencial para informar ao React/Framer Motion que é um novo componente
- Aciona animações de entrada (`initial`, `animate`) e saída (`exit`)

#### Feedback Visual em Botões
- **`whileHover`**: Animação ao passar o mouse
- **`whileTap`**: Animação ao clicar

### Padrão de Animação

```jsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.5 }}
```

## 8. Arquitetura Modular

A arquitetura permite fácil extensão e manutenção:

- **Separação de Dados**: Lógica do jogo isolada em `storyData`
- **Estado Centralizado**: Todos os estados gerenciados em um local
- **Renderização Condicional**: Interface adapta-se automaticamente ao tipo de cena
- **Animações Declarativas**: Transições suaves sem lógica complexa
- **Personalização Visual**: Backgrounds facilmente configuráveis
