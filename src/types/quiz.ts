// Quiz question structure
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  topic: string;
}

export interface QuizQuestionResult {
  questionId: number;
  topic?: string;
  question: string;
  isCorrect: boolean;
  userAnswer?: string;
  correctAnswer?: string;
}

// Result of a completed quiz attempt
export interface QuizResult {
  lessonId: number;
  score: number;       // number of correct answers
  total: number;       // total questions (25)
  timestamp: number;
  passed: boolean;     // whether the user scored at least 75%
  questionResults: QuizQuestionResult[];
}

// Achievement rank definition
export interface AchievementRank {
  level: number;       // 1-10
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const INITIAL_RANK: AchievementRank = {
  level: 0,
  name: 'Юнлинг магии кода',
  description: 'Начало пути: Сила веб-разработки пробуждается',
  icon: '○',
  color: '#94a3b8',
};

export const ACHIEVEMENT_RANKS: AchievementRank[] = [
  { level: 1,  name: 'Падаван разметки',             description: '1 тест сдан: первый шаг на путь джедая HTML',      icon: '★', color: '#38bdf8' },
  { level: 2,  name: 'Адепт стилей Силы',            description: '2 теста сданы: управление каскадами и Flexbox',    icon: '◆', color: '#38bdf8' },
  { level: 3,  name: 'Иллюзионист адаптива',         description: '3 теста сданы: магия сеток и медиа-запросов',      icon: '✦', color: '#fcd34d' },
  { level: 4,  name: 'Рыцарь-джедай DOM',            description: '4 теста сданы: владение структурой документа',      icon: '⬡', color: '#fcd34d' },
  { level: 5,  name: 'Заклинатель событий',          description: '5 тестов сданы: управление потоками интерактива',   icon: '◉', color: '#f97066' },
  { level: 6,  name: 'Страж Галактики скриптов',     description: '6 тестов сданы: асинхронность и логика JS',        icon: '⚡', color: '#f97066' },
  { level: 7,  name: 'Архимаг интерфейсов',          description: '7 тестов сданы: проектирование динамических UI',    icon: '◈', color: '#a78bfa' },
  { level: 8,  name: 'Магистр Ордена Fullstack',     description: '8 тестов сданы: баланс фронтенда и компонентов',   icon: '▲', color: '#f472b6' },
  { level: 9,  name: 'Владыка тёмной и светлой темы',description: '9 тестов сданы: абсолютная гармония верстки',       icon: '◐', color: '#f472b6' },
  { level: 10, name: 'Гранд-мастер Магии Веб-Силы',  description: 'Все 10 модулей пройдены: легенда веб-разработки!',icon: '✦', color: '#fbbf24' },
];

