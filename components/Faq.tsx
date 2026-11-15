'use client';

import { useState } from 'react';
import { Reveal } from './Reveal';
import { ChevronDownIcon } from './Icons';
import { faqItems } from '@/lib/faq';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="container-page py-14 sm:py-24 scroll-mt-20">
      <Reveal>
        <span className="eyebrow">PREGUNTAS FRECUENTES</span>
        <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold leading-tight tracking-tight text-cream sm:mt-4 sm:text-4xl">
          Dudas rápidas antes de entrar.
        </h2>
      </Reveal>

      <div className="mx-auto mt-8 max-w-3xl space-y-2.5 sm:mt-12">
        {faqItems.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-2xl border border-cream/10 bg-graphite px-4 sm:px-6"
            >
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  className="flex w-full cursor-pointer items-center justify-between gap-3 py-4 text-left transition-colors duration-200 hover:text-gold sm:py-5"
                >
                  <span className="font-display text-sm font-bold text-cream sm:text-base">
                    {item.question}
                  </span>
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
                className="pb-4 text-sm leading-relaxed text-muted sm:pb-5 sm:pr-8"
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
