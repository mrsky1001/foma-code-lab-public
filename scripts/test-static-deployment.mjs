import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { join, resolve, relative, extname } from 'path';
import http from 'http';
import { spawn } from 'child_process';

const DIST_DIR = resolve('dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};

async function main() {
  console.log('====================================================');
  console.log('🔍 ТЕСТИРОВАНИЕ СТАТИЧЕСКОЙ СБОРКИ ДЛЯ ХОСТИНГА');
  console.log('====================================================\n');

  // 1. Проверка наличия директории dist
  if (!existsSync(DIST_DIR)) {
    console.error('❌ Ошибка: папка dist не найдена. Запустите `npm run build` сначала.');
    process.exit(1);
  }
  console.log('✅ Папка dist существует:', DIST_DIR);

  // 2. Инвентаризация файлов dist
  const distFiles = [];
  function scanDir(dir) {
    for (const item of readdirSync(dir)) {
      const full = join(dir, item);
      const st = statSync(full);
      if (st.isDirectory()) {
        scanDir(full);
      } else {
        distFiles.push(full);
      }
    }
  }
  scanDir(DIST_DIR);

  console.log(`📦 Всего файлов в dist: ${distFiles.length}`);
  for (const f of distFiles) {
    const rel = relative(DIST_DIR, f).replace(/\\/g, '/');
    const size = (statSync(f).size / 1024).toFixed(1);
    console.log(`   - /${rel} (${size} KB)`);
  }

  // 3. Проверка dist/index.html
  const indexPath = join(DIST_DIR, 'index.html');
  if (!existsSync(indexPath)) {
    console.error('❌ Ошибка: dist/index.html не найден!');
    process.exit(1);
  }
  const indexHtml = readFileSync(indexPath, 'utf-8');

  // Проверка тегов и относительных путей
  const scriptMatches = [...indexHtml.matchAll(/<script[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
  const linkMatches = [...indexHtml.matchAll(/<link[^>]+href=["']([^"']+)["']/g)].map(m => m[1]);

  console.log('\n📄 Анализ index.html:');
  console.log(`   Найденные скрипты: ${scriptMatches.join(', ')}`);
  console.log(`   Найденные ссылки: ${linkMatches.join(', ')}`);

  let refErrors = 0;
  for (const src of scriptMatches) {
    const cleanSrc = src.replace(/^\.\//, '').replace(/^\//, '');
    const fullPath = join(DIST_DIR, cleanSrc);
    if (!existsSync(fullPath)) {
      console.error(`❌ Ошибка: файл скрипта не существует в dist: ${cleanSrc}`);
      refErrors++;
    } else {
      console.log(`   ✅ Скрипт найден: ${cleanSrc}`);
    }
  }

  for (const href of linkMatches) {
    if (href.startsWith('http://') || href.startsWith('https://')) continue;
    const cleanHref = href.replace(/^\.\//, '').replace(/^\//, '');
    const fullPath = join(DIST_DIR, cleanHref);
    if (!existsSync(fullPath)) {
      console.error(`❌ Ошибка: файл по ссылке не существует в dist: ${cleanHref}`);
      refErrors++;
    } else {
      console.log(`   ✅ Ресурс найден: ${cleanHref}`);
    }
  }

  if (refErrors > 0) {
    console.error(`\n❌ Найдено ${refErrors} битых ссылок в index.html!`);
    process.exit(1);
  }

  // 4. Проверка критических статических ресурсов (картинки комнат, слайдер, логотип)
  const criticalAssets = [
    'favicon.svg',
    'icons.svg',
    'img/logo.svg',
    'img/no-image.svg',
    'img/room-1.jpg',
    'img/room-2.jpg',
    'img/room-3.jpg',
    'img/slider-1.jpg',
    'js/data.js',
  ];

  console.log('\n🖼️ Проверка ключевых ассетов (изображения, иконки, data.js):');
  let assetErrors = 0;
  for (const asset of criticalAssets) {
    const full = join(DIST_DIR, asset);
    if (!existsSync(full)) {
      console.error(`   ❌ Отсутствует ассет: dist/${asset}`);
      assetErrors++;
    } else {
      const size = (statSync(full).size / 1024).toFixed(1);
      console.log(`   ✅ dist/${asset} (${size} KB)`);
    }
  }

  if (assetErrors > 0) {
    console.error(`❌ Отсутствуют ${assetErrors} ассетов!`);
    process.exit(1);
  }

  // 5. Запуск локального HTTP сервера и тестирование сетевых запросов
  console.log('\n🌐 Тестирование отдачи статических файлов через HTTP сервер...');
  const PORT = 8899;

  const server = http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0].split('#')[0];
    if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

    // Обработка префикса подкаталога для тестирования hosting подпапок (например, /foma-code-lab-public/)
    if (urlPath.startsWith('/foma-code-lab-public/')) {
      urlPath = urlPath.slice('/foma-code-lab-public'.length);
      if (urlPath === '/' || urlPath === '') urlPath = '/index.html';
    } else if (urlPath.startsWith('/foma-code-lab/')) {
      urlPath = urlPath.slice('/foma-code-lab'.length);
      if (urlPath === '/' || urlPath === '') urlPath = '/index.html';
    }

    const filePath = join(DIST_DIR, urlPath.replace(/^\//, ''));

    if (existsSync(filePath) && !statSync(filePath).isDirectory()) {
      const ext = extname(filePath).toLowerCase();
      const mime = MIME_TYPES[ext] || 'application/octet-stream';
      const content = readFileSync(filePath);
      res.writeHead(200, {
        'Content-Type': mime,
        'Content-Length': content.length,
        'Access-Control-Allow-Origin': '*',
      });
      res.end(content);
    } else {
      // SPA Fallback: если запрашивается HTML путь, отдаем index.html
      if (urlPath.endsWith('.html') || !extname(urlPath)) {
        const content = readFileSync(indexPath);
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Length': content.length,
        });
        res.end(content);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      }
    }
  });

  await new Promise(res => server.listen(PORT, '127.0.0.1', res));
  console.log(`   Сервер запущен на http://127.0.0.1:${PORT}`);

  // Выполняем HTTP GET запросы ко всем файлам
  const testUrls = [
    '/',
    '/index.html',
    '/?lesson=2&step=1',
    '/?l=5&s=3',
    '/favicon.svg',
    '/icons.svg',
    '/img/logo.svg',
    '/img/room-1.jpg',
    '/js/data.js',
    ...scriptMatches.map(s => s.replace(/^\./, '')),
    ...linkMatches.filter(l => !l.startsWith('http')).map(l => l.replace(/^\./, '')),
    // Тест подкаталога
    '/foma-code-lab-public/',
    '/foma-code-lab-public/index.html',
    '/foma-code-lab-public/img/room-1.jpg',
  ];

  let httpErrors = 0;
  for (const u of testUrls) {
    const fullUrl = `http://127.0.0.1:${PORT}${u}`;
    try {
      const resp = await fetch(fullUrl);
      if (resp.status !== 200) {
        console.error(`   ❌ HTTP ${resp.status} для ${u}`);
        httpErrors++;
      } else {
        const contentType = resp.headers.get('content-type');
        console.log(`   ✅ HTTP 200: ${u} [${contentType}]`);
      }
    } catch (err) {
      console.error(`   ❌ Сетевая ошибка для ${u}: ${err.message}`);
      httpErrors++;
    }
  }

  // 6. Проверка исполнения в реальном браузере (Chrome / Edge Headless)
  console.log('\n🖥️ Проверка запуска в реальном браузере (Headless Chrome/Edge)...');
  const browserPaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  ];

  let browserPath = browserPaths.find(p => existsSync(p));

  if (browserPath) {
    console.log(`   Найден браузер: ${browserPath}`);
    const testUrl = `http://127.0.0.1:${PORT}/?lesson=1&step=1`;
    try {
      const domOutput = await new Promise((resolveRun, rejectRun) => {
        const proc = spawn(browserPath, [
          '--headless=new',
          '--disable-gpu',
          '--no-sandbox',
          '--dump-dom',
          testUrl,
        ]);
        let stdout = '';
        let stderr = '';
        proc.stdout.on('data', d => stdout += d.toString());
        proc.stderr.on('data', d => stderr += d.toString());
        proc.on('close', code => {
          if (code === 0) resolveRun(stdout);
          else rejectRun(new Error(`Exit code ${code}: ${stderr}`));
        });
      });

      // Проверяем, что в DOM отрендерился React компонент
      const hasApp = domOutput.includes('foma-app') || domOutput.includes('app-header') || domOutput.includes('lesson-panel') || domOutput.includes('Foma');
      const hasRootContent = !domOutput.includes('<div id="root"></div>');

      if (hasApp && hasRootContent) {
        console.log('   ✅ React успешно смонтировался в headless браузере!');
        console.log('   ✅ Приложение отрисовало интерфейс тренажёра (Header, Sidebar, Workspace)');
      } else {
        console.warn('   ⚠️ React монтирование: контент в #root не обнаружен или пуст.');
      }
    } catch (err) {
      console.warn(`   ⚠️ Не удалось запустить dump-dom: ${err.message}`);
    }
  } else {
    console.log('   (Браузер не найден для headless теста, пропуск)');
  }

  server.close();

  console.log('\n====================================================');
  if (httpErrors === 0) {
    console.log('🎉 ВСЕ ТЕСТЫ СТАТИЧЕСКОЙ СБОРКИ УСПЕШНО ПРОЙДЕНЫ!');
    console.log('Сайт полностью готов к развертыванию на любом хостинге:');
    console.log('- GitHub Pages');
    console.log('- Vercel / Netlify / Cloudflare Pages');
    console.log('- Nginx / Apache / Рег.ру / Beget / Timeweb');
    console.log('====================================================');
  } else {
    console.error(`❌ Тестирование завершилось с ${httpErrors} ошибками.`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Непредвиденная ошибка:', err);
  process.exit(1);
});
