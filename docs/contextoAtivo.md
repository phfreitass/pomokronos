# Contexto Ativo

## Foco Atual

- Correção e estabilização dos componentes visuais do Pomodoro, como a exibição
  de ciclos.
- Garantir a integração correta entre a lógica de estado (`TaskContext`) e a
  interface.

## Decisões e Padrões

- **Consistência de Tipos:** Foi identificado um bug (`[ts Error]`) causado por
  uma inconsistência entre as chaves de um objeto de mapeamento
  (`cycleDescriptionMap`) e os valores de retorno de uma função utilitária
  (`getNextCycleType`). O padrão a ser seguido é garantir que as estruturas de
  dados (objetos, mapas) correspondam exatamente aos tipos definidos no
  `TaskModel` e aos valores manipulados pelas funções para evitar erros de
  runtime e de compilação.

## Próximos Passos

- Finalizar a implementação do componente `CountDown`.
- Conectar completamente o `CountDown` com o `TaskContext` para controlar o
  timer.
- Validar o fluxo completo de um ciclo Pomodoro (trabalho -> descanso curto ->
  trabalho -> descanso longo).
