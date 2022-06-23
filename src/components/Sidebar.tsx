import { gql, useQuery } from '@apollo/client';
import { Lesson } from './Lesson';
import ILesson from '../interfaces/Lesson';
import { ArrowRight, ArrowLeft } from 'phosphor-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface GetLessonsQueryResponse {
  lessons: ILesson[];
}

const GET_LESSONS_QUERY = gql`
  query {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      id
      slug
      title
      lessonType
      availableAt
    }
  }
`;

export const Sidebar = () => {
  const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      {isSidebarOpen ? (
        <aside className='w-[348px] bg-gray-700 p-6 border-l border-gray-600 h-max-screen'>
          <div className='flex items-center gap-6 border-b border-gray-500 mb-6 pb-6'>
            <button
              className='bg-gray-600 p-2 rounded border border-gray-500'
              onClick={() => setIsSidebarOpen(false)}
            >
              <ArrowRight size={20} />
            </button>
            <span className='font-bold text-white text-2xl'>
              Cronograma de aulas
            </span>
          </div>

          <div className='flex flex-col gap-8'>
            {data?.lessons.map((lesson) => (
              <Lesson
                key={lesson.id}
                title={lesson.title}
                slug={lesson.slug}
                availableAt={new Date(lesson.availableAt)}
                type={lesson.lessonType}
              />
            ))}
          </div>
        </aside>
      ) : (
        <div className='bg-gray-700 p-6 border-l border-gray-600 h-max-screen'>
          <button
            className='bg-gray-600 p-2 rounded border border-gray-500'
            onClick={() => setIsSidebarOpen(true)}
          >
            <ArrowLeft size={20} />
          </button>
        </div>
      )}
    </AnimatePresence>
  );
};
