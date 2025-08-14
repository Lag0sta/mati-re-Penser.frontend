
export function openChevron({ scope, animate }: any) {
    animate(scope.current, { rotate: 90 }, { duration: 0.3 });
}

export function closeChevron({ scope, animate }: any) {
    animate(
        scope.current, 
        { rotate: 0 }, 
        { duration: 0.3 }
    );
}

export function appearComments({ scope, animate }: any) {
  if (!scope.current) return;

  animate(
    scope.current,
    { opacity: [0, 1], y: [20, 0] },
    { duration: 0.3 }
  );
}

export function hideComments({ scope, animate }: any) {
  if (!scope.current) return;

  animate(
    scope.current,
    { opacity: [1, 0], y: [0, -10] },
    { duration: 0.3 }
  );
}