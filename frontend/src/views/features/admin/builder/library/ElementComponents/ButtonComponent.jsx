import React from 'react';
import { cn } from '@/lib/utils';

const ButtonComponent = ({ content, style, url = '', styleClass = '' }) => {
  return (
    <div>
      <a href={url}>
        <button style={style} className={cn('m-0 p-0', styleClass)}>
          {content}
        </button>
      </a>
    </div>
  );
};

export default ButtonComponent;
