export interface Project {
  id: number;
  name: string;
  description: string;
  images: string[];
}

let projects: Project[] = [];
let nextId = 1;

export function list(): Project[] {
  return projects;
}

export function find(id: number): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function create(data: Omit<Project, 'id'>): Project {
  const project: Project = { id: nextId++, ...data };
  projects.push(project);
  return project;
}

export function update(
  id: number,
  data: Partial<Omit<Project, 'id'>>
): Project | null {
  const project = find(id);
  if (!project) {
    return null;
  }
  if (data.name !== undefined) {
    project.name = data.name;
  }
  if (data.description !== undefined) {
    project.description = data.description;
  }
  if (data.images && data.images.length > 0) {
    project.images = data.images;
  }
  return project;
}

export function remove(id: number): boolean {
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) {
    return false;
  }
  projects.splice(index, 1);
  return true;
}
