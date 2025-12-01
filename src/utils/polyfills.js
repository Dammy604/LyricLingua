import * as React from 'react';

// Avoid SSR warnings for libraries that rely on useLayoutEffect
if (typeof window === 'undefined' || typeof document === 'undefined') {
  React.useLayoutEffect = React.useEffect;
}

