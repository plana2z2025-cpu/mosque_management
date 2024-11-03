import React, { useState, useEffect, memo } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const imagesList = [
  {
    url: 'https://images.unsplash.com/photo-1602797992680-57a4964033e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW9zcXVlfGVufDB8fDB8fHww',
  },
  {
    url: 'https://images.unsplash.com/photo-1600105244719-8992fd1f1967?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE1fHxtb3NxdWV8ZW58MHx8MHx8fDA%3D',
  },
  {
    url: 'https://images.unsplash.com/photo-1720097119232-b22d44febc69?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fG1vc3F1ZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    url: 'https://images.unsplash.com/photo-1707009504242-4945b641c621?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fG1vc3F1ZXxlbnwwfHwwfHx8MA%3D%3D',
  },
];

const HeroSection = () => {
  const [api, setApi] = useState();
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    gsap.fromTo(
      '.carouselContainer',
      {
        height: 0,
        opacity: 0,
      },
      {
        height: window.innerWidth > 400 ? '80vh' : '35vh',
        opacity: 1,
        duration: 3,
      }
    );
  });

  useEffect(() => {
    if (!api) {
      return;
    }

    setActiveIndex(api.selectedScrollSnap());

    api.on('select', () => {
      console.log(api.selectedScrollSnap());
      setActiveIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative carouselContainer">
      <Carousel
        opts={{
          align: 'center',
          loop: true,
        }}
        className="relative w-full mx-auto carouselContainer"
        setApi={setApi}
      >
        <CarouselContent>
          {imagesList.map((singleSlider, index) => (
            <CarouselItem key={index} className="w-full">
              <div className="carouselContainer">
                <Card>
                  <CardContent className="flex h-[35vh] md:h-[80vh] items-center justify-center p-0 overflow-hidden">
                    <img
                      src={singleSlider?.url}
                      alt={`Mosque ${index + 1}`}
                      className="object-fill w-full h-full"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-5" />
        <CarouselNext className="absolute right-5" />
      </Carousel>

      <div className="flex absolute justify-center w-full bottom-7 space-x-2">
        {imagesList.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-green-400 scale-110' : ' border-2 border-white scale-95'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default memo(HeroSection);
