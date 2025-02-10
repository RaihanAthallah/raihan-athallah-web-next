export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string | ""; // Change from string | undefined to string | null
  projectUrl: string | null;
  techStacks: TechStack[];
  createdAt: Date;
  updatedAt: Date;
}


export interface TechStack{
  id : string;
  name : string;
  createdAt : Date;
  updatedAt : Date;
}