import { gql, useQuery } from '@apollo/client';
import { Lesson } from './Lesson';

interface GetLessonsQueryResponse {
  lessons: Array<{
    id: string;
    title: string;
    slug: string;
    lessonType: 'class' | 'live';
    availableAt: string;
  }>;
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

  return (
    <aside className='w-[348px] bg-gray-700 p-6 border-l border-gray-600 h-max-screen'>
      <span className='font-bold text-white text-2xl border-b border-gray-500 block mb-6 pb-6'>
        Cronograma de aulas
      </span>

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
  );
};
