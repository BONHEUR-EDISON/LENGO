import { projectsData } from "@/data/projects";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) return notFound();

  return (
    <div className="px-6 md:px-16 py-12">
      <h1 className="text-4xl font-bold mb-6">{project.title}</h1>

      <p className="mb-8">{project.description}</p>

      <div className="grid md:grid-cols-2 gap-8">
        {project.images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={project.title}
            width={800}
            height={600}
            className="rounded-xl"
          />
        ))}
      </div>

      <div className="mt-10">
  <h3 className="font-semibold mb-3">Technologies</h3>

  <ul className="flex gap-3 flex-wrap">
    {(project.technologies ?? []).map((tech) => (
      <li key={tech} className="bg-gray-200 px-3 py-1 rounded">
        {tech}
      </li>
    ))}
  </ul>
</div>
    </div>
  );
}
