import Teacher from './Teacher';

export default interface Lesson {
  id: string;
  title: string;
  slug: string;
  lessonType: 'class' | 'live';
  availableAt: string;
  videoId: string;
  description: string;
  teacher: Teacher;
}
