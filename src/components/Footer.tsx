import { Logo } from './FooterLogo';

export const Footer = () => {
  return (
    <div className='flex items-center justify-between max-w-[1100px] mx-auto border-t border-gray-500 pt-6'>
      <div className='flex items-center gap-6 text-gray-300'>
        <Logo />
        <span className='leading-relaxed'>
          Rocketseat - Todos os direitos reservados
        </span>
      </div>
      <a href='#' className='text-gray-300'>
        Políticas de privacidade
      </a>
    </div>
  );
};
