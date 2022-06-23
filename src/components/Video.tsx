import { DefaultUi, Player, Youtube } from '@vime/react';
import {
  DiscordLogo,
  Lightning,
  Image,
  FileArrowDown,
  CaretRight,
} from 'phosphor-react';
import { Footer } from './Footer';
import '@vime/core/themes/default.css';
import { gql, useQuery } from '@apollo/client';
import Lesson from '../interfaces/Lesson';

interface VideoProps {
  lessonSlug: string;
}

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug($slug: String) {
    lesson(where: { slug: $slug }) {
      title
      videoId
      description
      teacher {
        bio
        avatarURL
        name
      }
    }
  }
`;

interface GetLessonBySlugResponse {
  lesson: Lesson;
}

export const Video = ({ lessonSlug }: VideoProps) => {
  const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
    variables: {
      slug: lessonSlug,
    },
  });

  if (!data) {
    return <div className='flex-1'>Carregando ...</div>;
  }

  return (
    <div className='flex-1'>
      <div className='bg-black flex justify-center'>
        <div className='h-full w-full max-w-[1100px] max-h-[60vh] aspect-video'>
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className='p-8 max-w-[1100px] mx-auto'>
        <div className='flex items-start gap-16'>
          <div className='flex-1'>
            <h1 className='text-2xl font-bold'>{data?.lesson.title}</h1>
            <p className='mt-4 text-gray-200 leading-relaxed'>
              {data.lesson.description}
            </p>

            <div className='flex items-center gap-4 mt-6'>
              <img
                src={data.lesson.teacher.avatarURL}
                alt='Img'
                className='w-16 h-16 rounded-full border-2 border-blue-500'
              />
              <div className='leading-relaxed'>
                <strong className='font-bold text-2xl block'>
                  {data.lesson.teacher.name}
                </strong>
                <span className='text-sm text-gray-400 block'>
                  {data.lesson.teacher.bio}
                </span>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <a
              href='#'
              className='py-4 px-6 rounded text-sm text-white font-semibold bg-green-500 hover:bg-green-700 transition-colors flex items-center justify-center uppercase gap-[10px]'
            >
              <DiscordLogo size={24} />
              comunidade no discord
            </a>
            <a
              href='#'
              className='py-4 px-6 text-sm rounded border border-blue-500 text-blue-500 flex items-center justify-center gap-[10px] hover:bg-blue-500 uppercase hover:text-gray-900 transition-colors font-bold'
            >
              <Lightning size={24} />
              acesse o desafio
            </a>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-8 my-20'>
          <a
            href='#'
            className='bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors group'
          >
            <div className='h-full bg-green-700 p-6 flex items-center'>
              <FileArrowDown size={40} />
            </div>
            <div className='py-6 leading-relaxed'>
              <strong className='font-bold text-2xl mb-2 block'>
                Material Complementar
              </strong>
              <p className='text-sm text-gray-200'>
                Acesse o material complementar para <br />
                acelerar o seu desenvolvimento
              </p>
            </div>
            <div className='text-blue-500 flex items-center justify-center ml-auto mr-6'>
              <CaretRight
                size={24}
                className='group-hover:translate-x-1 transition-transform'
              />
            </div>
          </a>

          <a
            href='#'
            className='bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 group'
          >
            <div className='h-full bg-green-700 p-6 flex items-center'>
              <Image size={40} />
            </div>
            <div className='py-6 leading-relaxed'>
              <strong className='text-2xl mb-2 block'>
                Wallpapers Exclusivos
              </strong>
              <p className='text-sm text-gray-200'>
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua
                máquina
              </p>
            </div>
            <div className='text-blue-500 flex items-center justify-center ml-auto mr-6'>
              <CaretRight
                size={24}
                className='group-hover:translate-x-1 transition-transform'
              />
            </div>
          </a>
        </div>

        <Footer />
      </div>
    </div>
  );
};
