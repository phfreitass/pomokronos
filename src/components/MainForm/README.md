# Componente: MainForm

## Visão Geral

O `MainForm` é o componente React principal para a interação do usuário com o
sistema Pomodoro. Ele encapsula o formulário de criação de tarefas, a lógica de
controle dos ciclos e a interação com o estado global da aplicação. Sua
principal responsabilidade é permitir que o usuário inicie e interrompa tarefas,
gerenciando o ciclo de vida de cada uma.

## Estrutura e Funcionalidades

### 1. Dependências e Importações

O componente utiliza as seguintes dependências:

- **Ícones**: `PlayCircleIcon` e `StopCircleIcon` da biblioteca `lucide-react`
  para representar visualmente as ações de iniciar e interromper.
- **Componentes de UI**:
  - `DefaultInput`: Para a entrada do nome da tarefa.
  - `Cycles`: Para a visualização dos ciclos Pomodoro concluídos.
  - `DefaultButton`: Para as ações do formulário.
- **Hooks do React**: `useRef` para acesso direto ao elemento de input sem
  causar novas renderizações.
- **Contexto**: `useTaskContext` para se conectar ao estado global das tarefas.
- **Tipos**: `TaskModel` para garantir a tipagem correta dos objetos de tarefa.
- **Utilitários**:
  - `formatSecondsToMinutes`: Para formatar o tempo restante.
  - `getNextCycle`: Para calcular qual o próximo ciclo (ex: 1º, 2º).
  - `getNextCycleType`: Para determinar o tipo do próximo ciclo (trabalho ou
    descanso).

### 2. Gerenciamento de Estado e Lógica Interna

- **Acesso ao Contexto**: O componente obtém `state` e `setState` do
  `useTaskContext` para ler e escrever no estado global.
- **Controle de Input**: `taskNameInput` (um `useRef`) é usado para capturar o
  nome da tarefa diretamente do DOM, uma abordagem performática para formulários
  não controlados.
- **Cálculo de Ciclo**: Antes da renderização, o componente calcula o
  `nextCycle` e o `nextCycleType` para determinar a duração e o tipo da próxima
  tarefa a ser criada.

### 3. Criação de Tarefas (`handleCreateNewTask`)

Esta função é o coração da criação de tarefas e segue os seguintes passos:

1.  **Prevenção de Comportamento Padrão**: `event.preventDefault()` impede que a
    página seja recarregada na submissão do formulário.
2.  **Validação**: Garante que o nome da tarefa foi preenchido.
3.  **Construção do Objeto `TaskModel`**:
    - `id`: Um ID único gerado com `Date.now().toString()`.
    - `name`: O nome da tarefa, após remover espaços em branco.
    - `startDate`: O timestamp exato do início.
    - `completeDate` e `interruptDate`: Inicializados como `null`.
    - `duration`: Definido com base na configuração do tipo de ciclo (ex:
      `state.config.work` ou `state.config.shortBreak`).
    - `type`: O tipo de ciclo (`'work'`, `'shortBreak'`, etc.).
4.  **Conversão para Segundos**: A duração, que está em minutos, é convertida
    para segundos para ser usada pelo timer.
5.  **Atualização do Estado Global**: `setState` é chamado para atualizar o
    estado da aplicação de forma imutável:
    - `activeTask` recebe a nova tarefa.
    - `currentCycle` é incrementado.
    - `secondsRemaining` é iniciado com o total de segundos da tarefa.
    - A nova tarefa é adicionada ao array `tasks`.

### 4. Renderização do Formulário

- O formulário é renderizado com a classe `form` e o handler
  `handleCreateNewTask` no `onSubmit`.
- **Input Desabilitado**: O `DefaultInput` é desabilitado se uma tarefa já
  estiver ativa (`disabled={!!state.activeTask}`).
- **Placeholder**: Existe um texto "Lorem ipsum" que deve ser substituído por um
  componente ou informação relevante.
- **Visualização de Ciclos**: O componente `Cycles` só aparece após o primeiro
  ciclo ser concluído (`state.currentCycle > 0`).
- **Botões de Ação**:
  - Se não houver tarefa ativa (`!state.activeTask`), o botão "Iniciar"
    (`PlayCircleIcon`) é renderizado com `type="submit"`.
  - Se houver uma tarefa ativa (`state.activeTask`), o botão "Interromper"
    (`StopCircleIcon`) é renderizado.

## Pontos de Atenção

- **Lógica de Interrupção**: O botão "Interromper" atualmente não possui uma
  função associada ao `onClick`. A implementação da função `handleInterruptTask`
  é necessária para que a interrupção de tarefas funcione corretamente.
- **Placeholder**: A seção com "Lorem ipsum" é um conteúdo temporário e precisa
  ser substituída pela funcionalidade ou componente apropriado.
