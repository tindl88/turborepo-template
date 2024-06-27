import { DependencyList, EffectCallback, useEffect, useRef } from 'react';
import { isDeepEqual } from '../utils/object.util';

export default function useDeepCompareEffect(callback: EffectCallback, dependencies?: DependencyList) {
  const currentDependenciesRef = useRef<DependencyList>();

  if (!isDeepEqual(currentDependenciesRef.current, dependencies)) {
    currentDependenciesRef.current = dependencies;
  }
  useEffect(callback, [currentDependenciesRef.current]);
}
