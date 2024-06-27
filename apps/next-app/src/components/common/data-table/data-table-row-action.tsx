import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '~react-web-ui-shadcn/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '~react-web-ui-shadcn/components/ui/dropdown-menu';

type DataTableRowActionProps<T> = {
  onAction?: (action: T) => void;
  items: { label: string; action: T }[];
};

export default function DataTableRowAction<T>({ onAction, items }: DataTableRowActionProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex h-5 w-5 rounded-full p-0">
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {items.map((item, index) => (
          <DropdownMenuItem key={index} onClick={() => onAction?.(item.action)}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
