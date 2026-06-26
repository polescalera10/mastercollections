import { Logo } from './Logo';
import { TelegramButton } from './TelegramButton';

/**
 * Barra de navegación flotante. Mínima: marca + único CTA.
 * No hay menú largo — la web tiene una sola misión.
 */
export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="container-page mt-3 sm:mt-4">
        <nav className="flex items-center justify-between rounded-full border border-cream/10 bg-ink/70 px-4 py-2.5 backdrop-blur-md sm:px-6">
          <Logo />

          <TelegramButton
            label="Unirme gratis"
            className="hidden px-5 py-2.5 text-sm sm:inline-flex"
          />
        </nav>
      </div>
    </header>
  );
}
