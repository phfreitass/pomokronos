// Importações de ícones e componentes UI reutilizáveis
import { PlayCircleIcon } from 'lucide-react';
import { DefaultInput } from '../DefaultInput';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';

// Hooks do React e imports de contexto/tipos
import { useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import type { TaskModel } from '../../models/TaskModel';

// Utilitários para cálculo de ciclos Pomodoro
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCyclesType';

/**
 * Componente principal do formulário de criação de tarefas
 * Integra com o contexto de tarefas e gerencia o ciclo Pomodoro
 */
export function MainForm() {
  // Acesso ao contexto global de tarefas
  const { state, setState } = useTaskContext();

  // Ref para controle do input de nome da tarefa
  const taskNameInput = useRef<HTMLInputElement>(null);

  // Cálculo do próximo ciclo Pomodoro (trabalho/descanso)
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  /**
   * Handler para criação de nova tarefa
   * @param event - Evento de submit do formulário
   */
  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Validação do input
    if (taskNameInput.current === null) return;
    const taskName = taskNameInput.current.value.trim();
    if (!taskName) {
      alert('Digite o nome da tarefa');
      return;
    }

    // Criação do objeto da nova tarefa
    const newTask: TaskModel = {
      id: Date.now().toString(), // ID baseado no timestamp
      name: taskName,
      startDate: Date.now(), // Timestamp atual
      completeDate: null, // Será preenchido quando concluído
      interruptDate: null, // Será preenchido se interrompido
      duration: 1, // Duração padrão em minutos (ajustar conforme necessidade)
      type: nextCycleType, // Tipo baseado no ciclo atual (trabalho/descanso)
    };

    // Conversão para segundos (base para o timer)
    const secondsRemaining = newTask.duration * 60;

    // Atualização do estado global
    setState(prevState => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask, // Define a nova tarefa como ativa
        currentCycle: nextCycle, // Avança para o próximo ciclo
        secondsRemaining, // Inicia a contagem regressiva
        formattedSecondsRemaining: '00:00', // Placeholder (deve ser formatado)
        tasks: [...prevState.tasks, newTask], // Adiciona à lista de tarefas
      };
    });
  }

  // Renderização do formulário
  return (
    <form onSubmit={handleCreateNewTask} className='form' action=''>
      {/* Linha do input de nome da tarefa */}
      <div className='formRow'>
        <DefaultInput
          labelText='task'
          id='meuInput'
          type='text'
          placeholder='Digite algo'
          ref={taskNameInput}
        />
      </div>

      {/* Linha de texto placeholder (deve ser substituído) */}
      <div className='formRow'>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      {/* Componente de visualização dos ciclos */}
      <div className='formRow'>
        <Cycles />
      </div>

      {/* Botão de submissão com ícone */}
      <div className='formRow'>
        <DefaultButton icon={<PlayCircleIcon />} />
      </div>
    </form>
  );
}
