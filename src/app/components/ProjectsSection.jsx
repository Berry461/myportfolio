"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "An E-commerce Website",
    description: "Add to Cart",
    image: "/images/projects/1.jpg",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Berry461/ecommerce",
    previewUrl: "https://ecommerce-tan-delta.vercel.app",
  },
  {
    id: 2,
    title: "A React Design Website",
    description: "AI Generative Template",
    image: "/images/projects/2.jpg",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Berry461/brainwave",
    previewUrl: "https://berry461.github.io/brainwave",
  },
  {
    id: 3,
    title: "Sign Up/Sign In Page",
    description: "Using PHP & MySQL as Backend",
    image: "/images/projects/3.jpeg",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Berry461/Bank-login-sys-with-phpnsql",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "Sign Up/Sign In Page",
    description: "Using Express & NodeJS as Backend",
    image: "/images/projects/4.jpg",
    tag: ["All", "Mobile"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 5,
    title: "A Simple CRUD Application",
    description: "Authentication and CRUD operations",
    image: "/images/projects/5.jpg",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Berry461/A-simple-crud",
    previewUrl: "https://a-simple-crud.vercel.app",
  },
  {
    id: 6,
    title: "Full-stack Roadmap",
    description: "Project 5 description",
    image: "/images/projects/6.jpg",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Berry461/ai_interview",
    previewUrl: "https://ai-interview-fawn-seven.vercel.app/sign-in",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Mobile"
          isSelected={tag === "Mobile"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;