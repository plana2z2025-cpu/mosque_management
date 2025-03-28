import { cn } from '@/lib/utils';
import React, { memo } from 'react';

const ImageComponent = (props) => {
  const { imageUrl, alt, styleClass } = props;

  return (
    <div className="h-full w-full">
      <img className={cn(styleClass)} src={imageUrl} alt={alt} />
    </div>
  );
};

export default memo(ImageComponent);
