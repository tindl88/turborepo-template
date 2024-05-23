import fs from 'fs';
import path from 'path';

import { Category } from '../entities/category.entity';

export function createFolder(folderPath: string) {
  try {
    const folder = path.join('', folderPath);

    const isExist = fs.existsSync(folder);

    if (isExist) return null;

    fs.mkdirSync(folder);

    return folder;
  } catch (error) {
    return null;
  }
}

export function createFolderRecursively(folderPath: string) {
  const folders = folderPath.split('/');

  let currentPath = '';

  folders.forEach(folder => {
    currentPath = path.join(currentPath, folder);

    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath);
    }
  });

  return currentPath;
}

export function renameDirectorySync(oldPath: string, newPath: string) {
  try {
    fs.renameSync(oldPath, newPath);
  } catch (err) {
    throw new Error('Could not rename');
  }
}

export function getCategoryInfo(categories: Category[], categoryId: string): { path: string; depth: number } {
  const category = categories.find(cat => cat.id === categoryId);

  if (!category) {
    return { path: '', depth: 0 };
  }

  let catePath = `/${category.name}`;
  let depth = 0;

  if (category.parent) {
    const parentInfo = getCategoryInfo(categories, category.parent.id);

    catePath = `${parentInfo.path}${path}`;
    depth = parentInfo.depth + 1;
  }

  return { path: catePath, depth };
}

export function buildTree(categories: Category[], id: string, basePath: string) {
  const tree: Category[] = [];

  categories.forEach(category => {
    const parentId = category.parent && category.parent.id;

    if (parentId === id) {
      const fullPath = basePath === '/' ? basePath + category.name : basePath + '/' + category.name;
      const children = buildTree(categories, category.id, fullPath);

      tree.push({
        ...category,
        children: children.length > 0 ? children : null,
        path: fullPath,
        depth: fullPath.split('/').length - 2
      } as Category & { path: string; depth: number });
    }
  });

  return tree;
}
