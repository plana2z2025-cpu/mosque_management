import React from 'react';
import { cn } from '@/lib/utils';

const TextComponent = ({ content, style, styleClass }) => {
  console.log(content);
  return (
    <div>
      <p className={cn(styleClass)} style={style}>
        {content}
      </p>
    </div>
  );
};

export default TextComponent;
