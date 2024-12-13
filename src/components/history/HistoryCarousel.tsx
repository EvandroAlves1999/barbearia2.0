import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const projects = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    title: 'Plataforma E-commerce',
    description: 'Desenvolvimento de marketplace com mais de 1 milhão de usuários ativos'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&q=80&w=1200',
    title: 'App de Delivery',
    description: 'Aplicativo mobile para gestão de entregas em tempo real'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    title: 'Sistema ERP',
    description: 'Software completo para gestão empresarial integrada'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200',
    title: 'Análise de Dados',
    description: 'Dashboard interativo para análise de métricas de negócio'
  }
];

export function HistoryCarousel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      className="rounded-lg overflow-hidden border border-blue-500/20"
    >
      {projects.map((project) => (
        <SwiperSlide key={project.id}>
          <div className="relative h-[400px]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-blue-100">
                {project.description}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}