# `TaskContext`

Este diretório contém toda a lógica relacionada ao `TaskContext`, que é
responsável por gerenciar o estado global das tarefas na aplicação Pomodoro. Ele
utiliza a API de Contexto do React, preparando o terreno para o uso do hook
`useReducer` para um gerenciamento de estado mais robusto e previsível.

A seguir, uma explicação detalhada de cada arquivo e seu papel na arquitetura do
contexto.

---

## Arquivos

### `TaskContext.tsx`

Este arquivo é o ponto de partida do nosso contexto.

- **Propósito**: Define a "forma" do contexto usando `createContext` do React.
- **`TaskContextProps`**: É um `type` que define quais dados estarão disponíveis
  para os componentes que consumirem este contexto. Neste caso, são o `state` (o
  estado atual das tarefas) e uma função `setState` para atualizá-lo.
- **`initialContextValue`**: Fornece um valor inicial padrão para o contexto.
  Isso é útil para evitar erros caso um componente tente acessar o contexto sem
  estar dentro do `Provider` e também para auxiliar no autocomplete do editor de
  código.
- **`TaskConxtext`**: É o objeto de contexto exportado que será usado pelo
  `Provider` para fornecer o valor e pelos componentes consumidores para
  acessá-lo.

_Observação: Há um pequeno erro de digitação em `TaskConxtext`. O correto seria
`TaskContext`._

### `TaskContextProvider.tsx`

Este componente é o provedor do contexto.

- **Propósito**: Envolve a árvore de componentes que precisa ter acesso ao
  estado das tarefas, disponibilizando o `state` e a função `setState` para
  eles.
- **`useState(initialTaskState)`**: Utiliza o hook `useState` para criar e
  gerenciar o estado do contexto. Ele é inicializado com `initialTaskState`.
- **`useEffect`**: Atualmente, há um `useEffect` que imprime o estado no console
  sempre que ele é alterado. Isso é útil para fins de depuração durante o
  desenvolvimento.
- **`<TaskConxtext.Provider>`**: É o componente que efetivamente "injeta" o
  valor (`state` e `setState`) na árvore de componentes React. Qualquer
  componente filho (direto ou indireto) de `TaskContextProvider` poderá acessar
  esses valores.

### `initialTaskState.ts`

Este arquivo define o estado inicial para o contexto das tarefas.

- **Propósito**: Centralizar a definição do estado inicial garante consistência
  e facilita a manutenção. Se precisarmos adicionar ou remover uma propriedade
  do estado, fazemos isso em um único lugar.
- **`TaskStateModel`**: O estado inicial obedece ao tipo `TaskStateModel`,
  garantindo que todas as propriedades necessárias estejam presentes e com os
  tipos corretos.

### `taskActions.ts`

Este arquivo define todas as ações possíveis que podem modificar o estado do
`TaskContext`. Embora a implementação atual use `useState`, esta estrutura é
fundamental para migrar para `useReducer`.

- **Propósito**: Padronizar as ações que podem ser despachadas para o `reducer`.
  Isso torna o fluxo de dados mais previsível e menos propenso a erros.
- **`TaskActionTypes`**: É um `enum` que lista os tipos de ações como strings.
  Usar um enum evita erros de digitação ao referenciar os tipos de ação em
  outros lugares.
- **`TaskActionModel`**: É um tipo que representa todas as ações possíveis, com
  ou sem `payload`. O `payload` carrega os dados necessários para a atualização
  do estado. Por exemplo, a ação `START_TASK` precisa saber _qual_ tarefa
  iniciar, então ela carrega um `payload` do tipo `TaskModel`.

### `taskReducer.ts`

O `reducer` é o cérebro da lógica de atualização de estado.

- **Propósito**: É uma função pura que recebe o `state` atual e uma `action`, e
  retorna um **novo** estado com base no tipo da ação.
- **`switch (action.type)`**: A estrutura `switch` é comumente usada em reducers
  para tratar cada tipo de ação de forma clara e organizada.
- **Imutabilidade**: É crucial que o reducer não modifique o `state`
  diretamente. Ele deve sempre retornar um novo objeto de estado. A
  implementação atual ainda não possui a lógica de atualização, apenas retorna o
  estado existente, mas a estrutura está pronta.

### `useTaskContext.ts`

Este é um hook customizado para simplificar o uso do contexto.

- **Propósito**: Em vez de importar `useContext` e `TaskConxtext` em todo
  componente que precisa do estado, importamos apenas o hook `useTaskContext`.
  Isso torna o código do componente mais limpo e desacoplado da implementação do
  contexto.
- **`useContext(TaskConxtext)`**: É o hook do React que lê o valor do contexto
  fornecido pelo `Provider` mais próximo na árvore de componentes.

---

## Como Usar

Para utilizar o contexto, envolva a sua aplicação (ou a parte dela que precisa
do estado) com o `TaskContextProvider`:

```jsx
// Em App.tsx ou um arquivo de layout principal
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';

function App() {
  return (
    <TaskContextProvider>{/* O resto da sua aplicação */}</TaskContextProvider>
  );
}
```

E em qualquer componente filho, você pode acessar o estado e a função para
atualizá-lo usando o hook `useTaskContext`:

```jsx
import { useTaskContext } from '../contexts/TaskContext/useTaskContext';

function MyComponent() {
  const { state, setState } = useTaskContext();

  // Agora você pode usar state.tasks, state.config, etc.
  // E pode chamar setState(novoEstado) para atualizar o contexto.

  return (
    <div>
      <p>Tempo de trabalho: {state.config.workTime} minutos</p>
    </div>
  );
}
```
