import { useRef } from 'react';
import { useInView } from '../../hooks/useInView';

export function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const isVisible = useInView(ref);

  return (
    <Tag
      ref={ref}
      className={`${className} reveal ${isVisible ? 'is-visible' : 'is-hidden'}`.trim()}
      style={{ '--delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
