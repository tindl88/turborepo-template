import React, {FC, memo, useMemo} from 'react';
import {Pressable} from 'react-native';

import Text from '../text';
import {DesignSystem as ds} from '../themes';
import {ICoreUIBaseProps} from '../types';
import View from '../view';

interface IPagination extends ICoreUIBaseProps {
  type?: 'minimal';
  totalItems?: number;
  currentPage?: number;
  itemPerPage?: number;
  pageVisible?: number;
  onChange?: (page: number) => void;
}

const Pagination: FC<IPagination> = ({
  type,
  totalItems = 0,
  currentPage = 1,
  itemPerPage = 5,
  pageVisible = 5,
  visible = true,
  onChange
}) => {
  const pager = useMemo(
    () => generatePagination({totalItems, currentPage, itemPerPage, pageVisible}),
    [totalItems, currentPage, itemPerPage, pageVisible]
  );

  const setPage = (page: number) => {
    if (page < 1 || page > pager.totalPages) return;
    onChange?.(page);
  };

  const renderPageNumber = () => {
    if (type === 'minimal') return null;

    return pager.pages.map((page: number, index: number) => (
      <Pressable key={index} style={ds.p6} onPress={() => setPage(page)}>
        <Text style={[pager.currentPage === page && ds.textRed500]}>{page}</Text>
      </Pressable>
    ));
  };

  const renderFirstButton = () => {
    if (type === 'minimal') return null;

    const isDisabled = pager.currentPage === 1;

    return (
      <Pressable disabled={isDisabled} style={ds.p6} onPress={() => setPage(1)}>
        <Text style={isDisabled && ds.textGray400}>First</Text>
      </Pressable>
    );
  };

  const renderLastButton = () => {
    if (type === 'minimal') return null;

    const isDisabled = pager.currentPage === pager.totalPages;

    return (
      <Pressable disabled={isDisabled} style={ds.p6} onPress={() => setPage(pager.totalPages)}>
        <Text style={isDisabled && ds.textGray400}>Last</Text>
      </Pressable>
    );
  };

  const renderPreviousButton = () => {
    const isDisabled = pager.currentPage === 1;

    return (
      <Pressable disabled={isDisabled} style={ds.p6} onPress={() => setPage(pager.currentPage - 1)}>
        <Text style={isDisabled && ds.textGray400}>Prev</Text>
      </Pressable>
    );
  };

  const renderNextButton = () => {
    const isDisabled = pager.currentPage === pager.totalPages;

    return (
      <Pressable disabled={isDisabled} style={ds.p6} onPress={() => setPage(pager.currentPage + 1)}>
        <Text style={isDisabled && ds.textGray400}>Next</Text>
      </Pressable>
    );
  };

  if (!visible) return null;
  if (!totalItems) return null;
  if (!currentPage) return null;
  if (pager && !pager.pages) return null;

  return (
    <View style={[ds.row]}>
      {renderFirstButton()}
      {renderPreviousButton()}
      {renderPageNumber()}
      {renderNextButton()}
      {renderLastButton()}
    </View>
  );
};

export default memo(Pagination);

interface IPager {
  totalItems: number;
  currentPage: number;
  itemPerPage: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[];
}
export interface IPageParams {
  totalItems: number;
  currentPage: number;
  itemPerPage: number;
  pageVisible: number;
}

export const generatePagination = ({totalItems, currentPage, itemPerPage, pageVisible}: IPageParams): IPager => {
  const totalPages = Math.ceil(totalItems / itemPerPage);
  const middle = Math.floor(pageVisible / 2);
  const preMiddle = middle - 1;
  const nextMiddle = middle + 1;
  const isOdd = pageVisible % 2 === 0;
  let startPage: number, endPage: number;

  if (totalPages <= pageVisible) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= nextMiddle) {
      startPage = 1;
      endPage = pageVisible;
    } else if (currentPage + preMiddle >= totalPages) {
      startPage = totalPages - (pageVisible - 1);
      endPage = totalPages;
    } else {
      startPage = currentPage - middle;
      endPage = currentPage + (isOdd ? preMiddle : middle);
    }
  }
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = Math.min(startIndex + itemPerPage - 1, totalItems - 1);

  const pages = Array.apply(null, {length: endPage + 1 - startPage} as unknown[]).map((_, i) => startPage + i);

  return {
    totalItems: totalItems,
    currentPage: currentPage,
    itemPerPage: itemPerPage,
    totalPages: totalPages,
    startPage: startPage,
    endPage: endPage,
    startIndex: startIndex,
    endIndex: endIndex,
    pages: pages
  } as IPager;
};
