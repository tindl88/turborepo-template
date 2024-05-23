import { FC, Fragment, useState } from 'react';
import classNames from 'classnames';
import { FolderClosedIcon } from 'lucide-react';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import { CategoryEntity } from '@/modules/categories/interfaces/categories.interface';

type TreeNodeProps = {
  node: CategoryEntity;
  depth?: number;
  onItemClick?: (node: CategoryEntity) => void;
} & ComponentBaseProps;

const TreeNode: FC<TreeNodeProps> = ({ className, node, depth = 0, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classNames(className)}>
      <div className="py-1" style={{ paddingLeft: `${depth * 12}px` }}>
        <div className="flex cursor-pointer items-center space-x-2 px-2">
          <span onClick={handleToggle}>
            <FolderClosedIcon className="text-amber-600" size={20} />
          </span>
          <p onClick={() => onItemClick?.(node)}>{node.name}</p>
        </div>
      </div>
      {isOpen && node.children && (
        <div>
          {node.children.map(child => (
            <Fragment key={child.id}>
              <TreeNode key={child.id} node={child} depth={depth + 1} onItemClick={onItemClick} />
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

type DirectoryTreeProps = {
  data?: CategoryEntity[];
  onItemClick?: (node: CategoryEntity) => void;
} & ComponentBaseProps;

const DirectoryTree: React.FC<DirectoryTreeProps> = ({ className, data, onItemClick }) => {
  return (
    <div className={classNames(className)}>
      {data?.map(node => <TreeNode key={node.id} node={node} onItemClick={onItemClick} />)}
    </div>
  );
};

export default DirectoryTree;
