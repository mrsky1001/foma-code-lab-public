import { useState } from 'react';
import { ChevronDown, ChevronRight, FolderOpen, Folder, FileCode, Lock } from 'lucide-react';
import { isStepEditableFile, getStepFileConfig } from '../../utils/virtualFiles';
import './FileTree.css';

export type VirtualFile = {
  /** Уникальный ключ файла */
  key: string;
  /** Отображаемое имя */
  name: string;
  /** Язык редактора */
  lang: 'html' | 'css' | 'js';
  /** Иконка */
  icon?: 'html' | 'css' | 'js';
};

type TreeNode = {
  name: string;
  children?: TreeNode[];
  file?: VirtualFile;
};

// ─── Доступные файлы по модулю ─────────────────────────────────────────────
function getAvailableFiles(lessonId: number): VirtualFile[] {
  const base: VirtualFile[] = [
    { key: 'index.html', name: 'index.html', lang: 'html', icon: 'html' },
    { key: 'style.css',  name: 'style.css',  lang: 'css',  icon: 'css'  },
    { key: 'main.js',    name: 'main.js',     lang: 'js',   icon: 'js'   },
  ];

  if (lessonId >= 5) {
    base.push({ key: 'data.js', name: 'data.js', lang: 'js', icon: 'js' });
    base.push({ key: 'catalog.html',     name: 'catalog.html',     lang: 'html', icon: 'html' });
    base.push({ key: 'room-details.html', name: 'room-details.html', lang: 'html', icon: 'html' });
  }
  if (lessonId >= 6) {
    base.push({ key: 'login.html',    name: 'login.html',    lang: 'html', icon: 'html' });
    base.push({ key: 'register.html', name: 'register.html', lang: 'html', icon: 'html' });
  }
  if (lessonId >= 8) {
    base.push({ key: 'booking.html',     name: 'booking.html',     lang: 'html', icon: 'html' });
    base.push({ key: 'my-bookings.html', name: 'my-bookings.html', lang: 'html', icon: 'html' });
  }

  return base;
}

// ─── Дерево папок ─────────────────────────────────────────────────────────────
function buildTree(files: VirtualFile[]): TreeNode[] {
  const rootFiles: TreeNode[] = [];
  const pagesFiles: TreeNode[] = [];

  for (const f of files) {
    const isPage = ['catalog.html', 'room-details.html', 'login.html', 'register.html', 'booking.html', 'my-bookings.html'].includes(f.key);
    const node: TreeNode = { name: f.name, file: f };
    if (isPage) {
      pagesFiles.push(node);
    } else {
      rootFiles.push(node);
    }
  }

  const tree: TreeNode[] = [];

  const htmlRoot = rootFiles.filter(n => n.file?.lang === 'html');
  const cssRoot  = rootFiles.filter(n => n.file?.lang === 'css');
  const jsRoot   = rootFiles.filter(n => n.file?.lang === 'js');

  // index.html at root
  tree.push(...htmlRoot);

  // css/ folder
  if (cssRoot.length) {
    tree.push({ name: 'css/', children: cssRoot });
  }

  // js/ folder
  if (jsRoot.length) {
    tree.push({ name: 'js/', children: jsRoot });
  }

  // pages/ folder
  if (pagesFiles.length) {
    tree.push({ name: 'pages/', children: pagesFiles });
  }

  return tree;
}

// ─── Иконки ──────────────────────────────────────────────────────────────────
function FileIcon({ type }: { type?: 'html' | 'css' | 'js' }) {
  if (type === 'html') return <span className="ft-file-icon ft-icon-html">H</span>;
  if (type === 'css')  return <span className="ft-file-icon ft-icon-css">C</span>;
  if (type === 'js')   return <span className="ft-file-icon ft-icon-js">J</span>;
  return <FileCode size={12} />;
}

// ─── Узел дерева ─────────────────────────────────────────────────────────────
function TreeItem({
  node,
  depth,
  targetKey,
  selectedKey,
  lessonId,
  stepIndex,
  onSelectFile,
}: {
  node: TreeNode;
  depth: number;
  targetKey: string;
  selectedKey: string;
  lessonId: number;
  stepIndex: number;
  onSelectFile: (fileKey: string, lang: 'html' | 'css' | 'js', isEditable: boolean) => void;
}) {
  const [open, setOpen] = useState(true);
  const isFolder = !!node.children;
  const file = node.file;

  if (isFolder) {
    return (
      <div className="ft-folder">
        <button
          className="ft-folder-row"
          onClick={() => setOpen(v => !v)}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          {open
            ? <><FolderOpen size={12} className="ft-folder-icon" /><ChevronDown size={10} className="ft-chevron" /></>
            : <><Folder     size={12} className="ft-folder-icon" /><ChevronRight size={10} className="ft-chevron" /></>
          }
          <span className="ft-folder-name">{node.name}</span>
        </button>
        {open && (
          <div className="ft-folder-children">
            {node.children!.map((child, i) => (
              <TreeItem
                key={i}
                node={child}
                depth={depth + 1}
                targetKey={targetKey}
                selectedKey={selectedKey}
                lessonId={lessonId}
                stepIndex={stepIndex}
                onSelectFile={onSelectFile}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (!file) return null;

  const isTarget = file.key === targetKey;
  const isSelected = file.key === selectedKey;
  const isEditable = isStepEditableFile(file.key, lessonId, stepIndex);

  return (
    <button
      className={`ft-file-row ${isSelected ? 'ft-selected' : ''} ${isTarget ? 'ft-active-target' : ''}`}
      onClick={() => onSelectFile(file.key, file.lang, isEditable)}
      style={{ paddingLeft: `${depth * 12 + 8}px` }}
      title={
        isTarget
          ? `Основной файл шага (${file.name}) — редактируется`
          : isEditable
          ? `${file.name} — доступен для редактирования в этом шаге`
          : `${file.name} — только для чтения (просмотр в редакторе)`
      }
    >
      <FileIcon type={file.icon} />
      <span className="ft-file-name">{file.name}</span>
      {isTarget && <span className="ft-badge-active">редактируется</span>}
      {!isEditable && <span title="Только чтение"><Lock size={10} className="ft-lock-icon" /></span>}
    </button>
  );
}

// ─── Основной компонент ───────────────────────────────────────────────────────
export interface FileTreeProps {
  lessonId: number;
  stepIndex: number;
  highlight?: 'html' | 'css' | 'js';
  selectedFileKey: string;
  onSelectFile: (fileKey: string, lang: 'html' | 'css' | 'js', isEditable: boolean) => void;
  height?: number;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function FileTree({
  lessonId,
  stepIndex,
  highlight,
  selectedFileKey,
  onSelectFile,
  height = 220,
  collapsed: controlledCollapsed,
  onToggleCollapse,
}: FileTreeProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const handleToggle = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    } else {
      setInternalCollapsed(v => !v);
    }
  };

  const { htmlName, cssName, jsName } = getStepFileConfig(lessonId, stepIndex);
  const targetKey = highlight === 'css' ? cssName : highlight === 'js' ? jsName : htmlName;

  const files = getAvailableFiles(lessonId);
  const tree = buildTree(files);

  return (
    <div
      className={`file-tree ${isCollapsed ? 'ft-collapsed' : ''}`}
      style={{ height: isCollapsed ? '32px' : `${height}px` }}
    >
      {/* Заголовок */}
      <div className="ft-header">
        <span className="ft-header-label">
          <FileCode size={12} />
          ФАЙЛЫ ПРОЕКТА
        </span>
        <button
          className="ft-toggle-btn"
          onClick={handleToggle}
          title={isCollapsed ? 'Развернуть дерево файлов' : 'Свернуть дерево файлов'}
          id="filetree-toggle-btn"
        >
          {isCollapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
        </button>
      </div>

      {/* Дерево */}
      {!isCollapsed && (
        <div className="ft-body">
          {tree.map((node, i) => (
            <TreeItem
              key={i}
              node={node}
              depth={0}
              targetKey={targetKey}
              selectedKey={selectedFileKey}
              lessonId={lessonId}
              stepIndex={stepIndex}
              onSelectFile={onSelectFile}
            />
          ))}
        </div>
      )}
    </div>
  );
}
