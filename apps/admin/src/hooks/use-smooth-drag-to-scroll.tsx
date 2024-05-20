// import { useEffect, useRef } from 'react';

// interface ISmoothDragToScrollOptions {
//   sensitivity?: number;
// }

// const useSmoothDragToScroll = (
//   ref: React.RefObject<HTMLDivElement>,
//   options: ISmoothDragToScrollOptions = {}
// ): void => {
//   const { sensitivity = 1 } = options;
//   const startXRef = useRef<number>(0);
//   const startYRef = useRef<number>(0);
//   const isDraggingRef = useRef<boolean>(false);

//   useEffect(() => {
//     const handleDragStart = (event: MouseEvent | TouchEvent) => {
//       if (event instanceof MouseEvent) {
//         startXRef.current = event.clientX;
//         startYRef.current = event.clientY;
//       } else if (event.touches && event.touches.length > 0) {
//         startXRef.current = event.touches[0].clientX;
//         startYRef.current = event.touches[0].clientY;
//       }
//       isDraggingRef.current = true;
//       ref.current?.classList.add('cursor-grab');
//     };

//     const handleDrag = (event: MouseEvent | TouchEvent) => {
//       if (!isDraggingRef.current || !ref.current) return;

//       let deltaX = 0;
//       let deltaY = 0;

//       if (event instanceof MouseEvent) {
//         deltaX = event.clientX - startXRef.current;
//         deltaY = event.clientY - startYRef.current;
//       } else if (event.touches && event.touches.length > 0) {
//         deltaX = event.touches[0].clientX - startXRef.current;
//         deltaY = event.touches[0].clientY - startYRef.current;
//       }

//       ref.current.scrollLeft -= deltaX * sensitivity;
//       ref.current.scrollTop -= deltaY * sensitivity;

//       if (event instanceof MouseEvent) {
//         startXRef.current = event.clientX;
//         startYRef.current = event.clientY;
//       } else if (event.touches && event.touches.length > 0) {
//         startXRef.current = event.touches[0].clientX;
//         startYRef.current = event.touches[0].clientY;
//       }
//     };

//     const handleDragEnd = () => {
//       isDraggingRef.current = false;
//       ref.current?.classList.remove('cursor-grab');
//     };

//     const handleMouseLeave = () => {
//       isDraggingRef.current = false;
//     };

//     const element = ref.current;

//     if (element) {
//       element.addEventListener('mousedown', handleDragStart);
//       element.addEventListener('mousemove', handleDrag);
//       element.addEventListener('mouseup', handleDragEnd);
//       element.addEventListener('touchstart', handleDragStart);
//       element.addEventListener('touchmove', handleDrag);
//       element.addEventListener('touchend', handleDragEnd);
//       element.addEventListener('mouseleave', handleMouseLeave);
//     }

//     return () => {
//       if (element) {
//         element.removeEventListener('mousedown', handleDragStart);
//         element.removeEventListener('mousemove', handleDrag);
//         element.removeEventListener('mouseup', handleDragEnd);
//         element.removeEventListener('touchstart', handleDragStart);
//         element.removeEventListener('touchmove', handleDrag);
//         element.removeEventListener('touchend', handleDragEnd);
//         element.removeEventListener('mouseleave', handleMouseLeave);
//       }
//     };
//   }, [ref, sensitivity]);
// };

// export default useSmoothDragToScroll;
