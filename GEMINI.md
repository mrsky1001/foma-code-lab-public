# foma-code-lab: Project Guidelines & Deployment Rules

## Git & Deployment Protocol (Dual Remote)

Репозиторий проекта настроен с двумя удалёнными репозиториями:
- `origin` (`git@github.com:mrsky1001/foma-code-lab.git`) — основной рабочий репозиторий проекта.
- `public` (`git@github.com:mrsky1001/foma-code-lab-public.git`) — публичный репозиторий, из которого GitHub Actions собирает и публикует сайт на GitHub Pages.

### Обязательное правило деплоя:
При запросе на деплой, публикацию или отправку изменений в продакшн:
1. Закоммитить изменения с понятным описанием.
2. Обязательно пушить в **оба** удалённых репозитория:
   ```powershell
   git push origin main
   git push public main
   ```
3. Предупреждать пользователя о времени сборки GitHub Actions (1–2 минуты) и возможном кэшировании браузера (Ctrl+F5).
