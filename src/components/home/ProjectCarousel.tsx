import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Card } from '../ui/Card';

const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Desenvolvimento de plataforma completa de e-commerce com integração de pagamentos',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800',
    category: 'Desenvolvimento Web'
  },
  {
    id: 2,
    title: 'Cloud Migration',
    description: 'Migração de infraestrutura local para AWS com zero downtime',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    category: 'Cloud Computing'
  },
  {
    id: 3,
    title: 'Mobile App',
    description: 'Aplicativo móvel para gestão de entregas em tempo real',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    category: 'Desenvolvimento Mobile'
  }
];

export function ProjectCarousel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-32 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6 text-white">Projetos Realizados</h2>
          <p className="text-white max-w-2xl mx-auto text-lg">
            Conheça alguns dos projetos que desenvolvemos para nossos clientes
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="!pb-14"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <Card className="h-full bg-black/60 backdrop-blur-xl border border-blue-500/20">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-6">
                  <span className="text-sm text-blue-400 font-medium">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold mt-2 mb-3 text-white">
                    {project.title}
                  </h3>
                  <p className="text-blue-800">
                    {project.description}
                  </p>
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}