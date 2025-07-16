import type { Metadata } from 'next'
import Project from '@/widgets/project/Project'

export const metadata: Metadata = {
  title: 'Project',
  description: 'Проект c задачами'
}

interface IProps {
  params: { project: string };
};

export default function ProjectPage({ params }: IProps) {
  return <Project projectId={params.project} />
}