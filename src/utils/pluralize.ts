/**
 * Хелперы для правильного склонения слов с числительными в русском языке.
 */

/**
 * Выбирает правильную форму слова в зависимости от числа.
 * 
 * @param count - Число
 * @param one - Форма для 1 (например: 'тест', 'шаг', 'модуль', 'строка', 'вопрос')
 * @param few - Форма для 2-4 (например: 'теста', 'шага', 'модуля', 'строки', 'вопроса')
 * @param many - Форма для 5-0 и 11-19 (например: 'тестов', 'шагов', 'модулей', 'строк', 'вопросов')
 * @returns Слово в правильном падеже
 */
export function getPluralWord(count: number, one: string, few: string, many: string): string {
  const abs = Math.abs(Math.round(count));
  const mod10 = abs % 10;
  const mod100 = abs % 100;

  if (mod100 >= 11 && mod100 <= 19) {
    return many;
  }
  if (mod10 === 1) {
    return one;
  }
  if (mod10 >= 2 && mod10 <= 4) {
    return few;
  }
  return many;
}

/**
 * Возвращает строку с числом и словом в правильной форме:
 * например `pluralize(1, 'тест', 'теста', 'тестов')` -> `"1 тест"`
 * `pluralize(2, 'тест', 'теста', 'тестов')` -> `"2 теста"`
 * `pluralize(5, 'тест', 'теста', 'тестов')` -> `"5 тестов"`
 */
export function pluralize(count: number, one: string, few: string, many: string): string {
  return `${count} ${getPluralWord(count, one, few, many)}`;
}
