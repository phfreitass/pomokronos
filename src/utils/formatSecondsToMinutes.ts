export function formatSecondsToMinutes(seconds: number) {
  // Calcula os minutos e garante que tenha dois dígitos.
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  // Calcula os segundos restantes e garante que tenha dois dígitos.
  const secondsMod = String(Math.floor(seconds % 60)).padStart(2, '0');
  // Retorna a string no formato "mm:ss".
  return `${minutes}:${secondsMod}`;
}
