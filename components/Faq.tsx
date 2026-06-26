'use client';

import { useState } from 'react';
import { Reveal } from './Reveal';
import { ChevronDownIcon } from './Icons';
import { faqItems } from '@/lib/faq';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container-page py-20 sm:py-28">
      <Reveal>
        <span className="eyebrow">Preguntas frecuentes</span>
        <h2 className="mt-4 max-w-2xl font-serif text-3xl font-semibold leading-tight tracking-tight text-cream sm:text-4xl">
          Lo que la gente pregunta antes de entrar.
        </h2>
      </Reveal>

      <div className="mx-auto mt-12 max-w-3xl divide-y divide-cream/10 border-y border-cream/10">
        {faqItems.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.question}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left transition-colors duration-200 hover:text-gold"
                >
                  <span className="font-serif text-lg font-medium text-cream">{item.question}</span>
                  <ChevronDownIcon
                    className={`h-5 w-5 shrink-0 text-gold transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </h3>
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-trigger-${i}`}
                hidden={!isOpen}
                className="pb-6 pr-10 text-cream/70"
              >
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
