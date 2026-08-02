import React from 'react';
import { MOCK_PROJECTS } from '../../data/mockData';
import { ImmersiveFrame } from './ImmersiveFrame';

export const CinematicGallery: React.FC = () => {
  return (
    <div className="w-full bg-[#08080a] text-[#f5f5f5]">
      {MOCK_PROJECTS.map((project, idx) => (
        <ImmersiveFrame
          key={project.id}
          id={project.id}
          slug={project.slug}
          title={project.title}
          category={project.category}
          year={project.release_year}
          role={project.roles[0] || 'Aesthetic Director'}
          client={project.client_id || 'GERDY ABELARD STUDIO'}
          imageUrl={project.hero_image_url}
          index={idx}
        />
      ))}
    </div>
  );
};
