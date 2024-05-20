import React, { FC, useEffect, useState } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import {
  FileCode2Icon,
  FileTextIcon,
  FoldersIcon,
  LayoutGridIcon,
  ListTreeIcon,
  NotebookTabsIcon,
  PackageIcon,
  SettingsIcon,
  UsersIcon
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@ui/components/ui/collapsible';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@ui/components/ui/hover-card';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import CategoriesSubMenu from './sub-menus/categories-sub-menu';
import DocumentationSubMenu from './sub-menus/documentation-sub-menu';
import PostsSubMenu from './sub-menus/posts-sub-menu';
import ProductsSubMenu from './sub-menus/products-sub-menu';
import SettingsSubMenu from './sub-menus/settings-sub-menu';
import UsersSubMenu from './sub-menus/users-sub-menu';
import SidebarIndicator from './sidebar-indicator';
import SidebarMenuItem from './sidebar-menu-item';

type SidebarNavigationProps = ComponentBaseProps & {
  isExpand: boolean;
};

const SidebarNavigation: FC<SidebarNavigationProps> = ({ className, isExpand }) => {
  const t = useTranslations();
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';

  const [isOpenSubMenu, setIsOpenSubMenu] = useState({
    dashboard: false,
    categories: false,
    posts: false,
    products: false,
    users: false,
    files: false,
    audit_logs: false,
    settings: false,
    documentation: false
  });

  useEffect(() => {
    setIsOpenSubMenu(prevState => ({
      ...prevState,
      dashboard: pathname === '/dashboard',
      categories: pathname === '/categories',
      posts: pathname === '/posts',
      products: pathname === '/products',
      users: pathname === '/users',
      files: pathname === '/files',
      audit_logs: pathname === '/audit-logs',
      settings: pathname === '/settings',
      documentation: pathname === '/documentation'
    }));
  }, [pathname]);

  return (
    <div
      className={classNames('nap-sidebar-nav scrollbar relative h-full overflow-y-auto overflow-x-hidden', className)}
    >
      {isExpand && (
        <div className="space-y-1.5">
          {/*************************************************************
          DASHBOARD
          **************************************************************/}
          <div className="relative px-3">
            <Collapsible
              open={isOpenSubMenu.dashboard}
              onOpenChange={value =>
                setIsOpenSubMenu(prevState => ({
                  ...prevState,
                  dashboard: value
                }))
              }
            >
              <SidebarMenuItem url={'/dashboard'} isExpand={isExpand} options={{ icon: LayoutGridIcon }}>
                {t('sidebar_menu_dashboard')}
              </SidebarMenuItem>
            </Collapsible>
          </div>
          {/*************************************************************
          CATEGORIES
          **************************************************************/}
          <div className="relative px-3">
            <Collapsible
              open={isOpenSubMenu.categories}
              onOpenChange={value =>
                setIsOpenSubMenu(prevState => ({
                  ...prevState,
                  categories: value
                }))
              }
            >
              <SidebarMenuItem url={'/categories'} isExpand={isExpand} options={{ icon: ListTreeIcon }}>
                {t('sidebar_menu_categories')}
              </SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <div>
                  <SidebarIndicator
                    isExpand={isExpand}
                    isActive={pathname === '/categories'}
                    isOpen={isOpenSubMenu.categories}
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent
                className={classNames(
                  '[&[data-state=closed]]:animate-collapsible-up [&[data-state=open]]:animate-collapsible-down mt-1 overflow-hidden rounded'
                )}
              >
                <CategoriesSubMenu type="list" />
              </CollapsibleContent>
            </Collapsible>
          </div>
          {/*************************************************************
          POSTS
          **************************************************************/}
          <div className="relative px-3">
            <Collapsible
              open={isOpenSubMenu.posts}
              onOpenChange={value =>
                setIsOpenSubMenu(prevState => ({
                  ...prevState,
                  posts: value
                }))
              }
            >
              <SidebarMenuItem url={'/posts'} isExpand={isExpand} options={{ icon: FileTextIcon }}>
                {t('sidebar_menu_posts')}
              </SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <div>
                  <SidebarIndicator isExpand={isExpand} isActive={pathname === '/posts'} isOpen={isOpenSubMenu.posts} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent
                className={classNames(
                  '[&[data-state=closed]]:animate-collapsible-up [&[data-state=open]]:animate-collapsible-down mt-1 overflow-hidden rounded'
                )}
              >
                <PostsSubMenu type="list" />
              </CollapsibleContent>
            </Collapsible>
          </div>
          {/*************************************************************
          PRODUCTS
          **************************************************************/}
          <div className="relative px-3">
            <Collapsible
              open={isOpenSubMenu.products}
              onOpenChange={value =>
                setIsOpenSubMenu(prevState => ({
                  ...prevState,
                  products: value
                }))
              }
            >
              <SidebarMenuItem url={'/products'} isExpand={isExpand} options={{ icon: PackageIcon }}>
                {t('sidebar_menu_products')}
              </SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <div>
                  <SidebarIndicator
                    isExpand={isExpand}
                    isActive={pathname === '/products'}
                    isOpen={isOpenSubMenu.products}
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent
                className={classNames(
                  '[&[data-state=closed]]:animate-collapsible-up [&[data-state=open]]:animate-collapsible-down mt-1 overflow-hidden rounded'
                )}
              >
                <ProductsSubMenu type="list" />
              </CollapsibleContent>
            </Collapsible>
          </div>
          {/*************************************************************
          USERS
          **************************************************************/}
          <div className="relative px-3">
            <Collapsible
              open={isOpenSubMenu.users}
              onOpenChange={value =>
                setIsOpenSubMenu(prevState => ({
                  ...prevState,
                  users: value
                }))
              }
            >
              <SidebarMenuItem url={'/users'} isExpand={isExpand} options={{ icon: UsersIcon }}>
                {t('sidebar_menu_users')}
              </SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <div>
                  <SidebarIndicator isExpand={isExpand} isActive={pathname === '/users'} isOpen={isOpenSubMenu.users} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent
                className={classNames(
                  '[&[data-state=closed]]:animate-collapsible-up [&[data-state=open]]:animate-collapsible-down mt-1 overflow-hidden rounded'
                )}
              >
                <UsersSubMenu type="list" />
              </CollapsibleContent>
            </Collapsible>
          </div>
          {/*************************************************************
          FILES
          **************************************************************/}
          <div className="relative px-3">
            <Collapsible
              open={isOpenSubMenu.files}
              onOpenChange={value =>
                setIsOpenSubMenu(prevState => ({
                  ...prevState,
                  files: value
                }))
              }
            >
              <SidebarMenuItem url={'/files'} isExpand={isExpand} options={{ icon: FoldersIcon }}>
                {t('sidebar_menu_files')}
              </SidebarMenuItem>
            </Collapsible>
          </div>
          {/*************************************************************
          AUDIT LOGS
          **************************************************************/}
          <div className="relative px-3">
            <Collapsible
              open={isOpenSubMenu.audit_logs}
              onOpenChange={value =>
                setIsOpenSubMenu(prevState => ({
                  ...prevState,
                  audit_logs: value
                }))
              }
            >
              <SidebarMenuItem url={'/audit-logs'} isExpand={isExpand} options={{ icon: NotebookTabsIcon }}>
                {t('sidebar_menu_audit_logs')}
              </SidebarMenuItem>
            </Collapsible>
          </div>
          {/*************************************************************
          SETTINGS
          **************************************************************/}
          <div className="relative px-3">
            <Collapsible
              open={isOpenSubMenu.settings}
              onOpenChange={value =>
                setIsOpenSubMenu(prevState => ({
                  ...prevState,
                  settings: value
                }))
              }
            >
              <SidebarMenuItem url={'/settings/appearance'} isExpand={isExpand} options={{ icon: SettingsIcon }}>
                {t('sidebar_menu_settings')}
              </SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <div>
                  <SidebarIndicator
                    isExpand={isExpand}
                    isActive={pathname === '/settings'}
                    isOpen={isOpenSubMenu.settings}
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent
                className={classNames(
                  '[&[data-state=closed]]:animate-collapsible-up [&[data-state=open]]:animate-collapsible-down mt-1 overflow-hidden rounded'
                )}
              >
                <SettingsSubMenu type="list" />
              </CollapsibleContent>
            </Collapsible>
          </div>
          {/*************************************************************
          DOCUMENTATION
          **************************************************************/}
          <div className="relative px-3">
            <Collapsible
              open={isOpenSubMenu.documentation}
              onOpenChange={value =>
                setIsOpenSubMenu(prevState => ({
                  ...prevState,
                  documentation: value
                }))
              }
            >
              <SidebarMenuItem
                url={'/documentation/getting-started'}
                isExpand={isExpand}
                options={{ icon: FileCode2Icon }}
              >
                Documentation
              </SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <div>
                  <SidebarIndicator
                    isExpand={isExpand}
                    isActive={pathname === '/documentation'}
                    isOpen={isOpenSubMenu.documentation}
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent
                className={classNames(
                  '[&[data-state=closed]]:animate-collapsible-up [&[data-state=open]]:animate-collapsible-down mt-1 overflow-hidden rounded'
                )}
              >
                <DocumentationSubMenu type="list" />
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      )}
      {!isExpand && (
        <div className="absolute left-0 top-0 w-full space-y-1.5 px-3">
          {/*************************************************************
          DASHBOARD
          **************************************************************/}
          <HoverCard openDelay={250} closeDelay={250}>
            <HoverCardTrigger asChild>
              <div>
                <SidebarMenuItem url={'/dashboard'} isExpand={isExpand} options={{ icon: LayoutGridIcon }} />
              </div>
            </HoverCardTrigger>
          </HoverCard>
          {/*************************************************************
          CATEGORIES
          **************************************************************/}
          <HoverCard openDelay={250} closeDelay={250}>
            <HoverCardTrigger asChild>
              <div>
                <SidebarMenuItem url={'/categories'} isExpand={isExpand} options={{ icon: ListTreeIcon }} />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-52 p-1" sideOffset={12} alignOffset={-6} side="right" align="start">
              <CategoriesSubMenu type="dropdown" />
            </HoverCardContent>
          </HoverCard>
          {/*************************************************************
          POSTS
          **************************************************************/}
          <HoverCard openDelay={250} closeDelay={250}>
            <HoverCardTrigger asChild>
              <div>
                <SidebarMenuItem url={'/posts'} isExpand={isExpand} options={{ icon: FileTextIcon }} />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-52 p-1" sideOffset={12} alignOffset={-6} side="right" align="start">
              <PostsSubMenu type="dropdown" />
            </HoverCardContent>
          </HoverCard>
          {/*************************************************************
          PRODUCTS
          **************************************************************/}
          <HoverCard openDelay={250} closeDelay={250}>
            <HoverCardTrigger asChild>
              <div>
                <SidebarMenuItem url={'/products'} isExpand={isExpand} options={{ icon: PackageIcon }} />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-52 p-1" sideOffset={12} alignOffset={-6} side="right" align="start">
              <ProductsSubMenu type="dropdown" />
            </HoverCardContent>
          </HoverCard>
          {/*************************************************************
          USERS
          **************************************************************/}
          <HoverCard openDelay={250} closeDelay={250}>
            <HoverCardTrigger asChild>
              <div>
                <SidebarMenuItem url={'/users'} isExpand={isExpand} options={{ icon: UsersIcon }} />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-52 p-1" sideOffset={12} alignOffset={-6} side="right" align="start">
              <UsersSubMenu type="dropdown" />
            </HoverCardContent>
          </HoverCard>
          {/*************************************************************
          FILES
          **************************************************************/}
          <HoverCard openDelay={250} closeDelay={250}>
            <HoverCardTrigger asChild>
              <div>
                <SidebarMenuItem url={'/files'} isExpand={isExpand} options={{ icon: FoldersIcon }} />
              </div>
            </HoverCardTrigger>
          </HoverCard>
          {/*************************************************************
          AUDIT LOGS
          **************************************************************/}
          <HoverCard openDelay={250} closeDelay={250}>
            <HoverCardTrigger asChild>
              <div>
                <SidebarMenuItem url={'/audit-logs'} isExpand={isExpand} options={{ icon: NotebookTabsIcon }} />
              </div>
            </HoverCardTrigger>
          </HoverCard>
          {/*************************************************************
          SETTINGS
          **************************************************************/}
          <HoverCard openDelay={250} closeDelay={250}>
            <HoverCardTrigger asChild>
              <div>
                <SidebarMenuItem url={'/settings/appearance'} isExpand={isExpand} options={{ icon: SettingsIcon }} />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-52 p-1" sideOffset={12} alignOffset={-6} side="right" align="start">
              <SettingsSubMenu type="dropdown" />
            </HoverCardContent>
          </HoverCard>
          {/*************************************************************
          DOCUMENTATION
          **************************************************************/}
          <HoverCard openDelay={250} closeDelay={250}>
            <HoverCardTrigger asChild>
              <div>
                <SidebarMenuItem
                  url={'/documentation/getting-started'}
                  isExpand={isExpand}
                  options={{ icon: FileCode2Icon }}
                />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-52 p-1" sideOffset={12} alignOffset={-6} side="right" align="start">
              <DocumentationSubMenu type="dropdown" />
            </HoverCardContent>
          </HoverCard>
        </div>
      )}
    </div>
  );
};

export default SidebarNavigation;
