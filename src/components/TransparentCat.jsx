import React, { useEffect, useState } from 'react';
import catSrc from '../assets/birthday_cat.png';

export const TransparentCat = ({ className = '', size = 260, onClick }) => {
  const [processedUrl, setProcessedUrl] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = catSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Make grey background pixels (around #7e7e7e / #808080) 100% transparent
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Match grey background color
        if (
          r >= 95 && r <= 155 &&
          g >= 95 && g <= 155 &&
          b >= 95 && b <= 155 &&
          Math.abs(r - g) < 20 &&
          Math.abs(g - b) < 20
        ) {
          data[i + 3] = 0; // 100% Transparent!
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setProcessedUrl(canvas.toDataURL());
    };
  }, []);

  return (
    <div 
      onClick={onClick}
      className={`inline-block cursor-pointer transition-transform hover:scale-110 active:scale-95 ${className}`}
    >
      <img
        src={processedUrl || catSrc}
        alt="Birthday Kitten with Balloons"
        style={{ width: `${size}px` }}
        className="drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)] mx-auto object-contain select-none"
      />
    </div>
  );
};
