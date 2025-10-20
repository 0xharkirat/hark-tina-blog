'use client';
import React from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';
import { sectionBlockSchemaField } from '../layout/section';
import { Quote as QuoteIcon } from 'lucide-react';

export const Quote = ({ data }: { data: any }) => {
  return (
    <Section background={data.background!} data-tina-field={tinaField(data)}>
      <div className="w-full max-w-3xl mx-auto">
        <blockquote className="relative">
          <div className="flex gap-4">
            <QuoteIcon className="w-8 h-8 text-neutral-300 dark:text-neutral-700 flex-shrink-0 mt-1" />
            <div>
              <p 
                className="text-xl md:text-2xl font-medium text-neutral-800 dark:text-neutral-200 italic leading-relaxed"
                data-tina-field={tinaField(data, 'quote')}
              >
                {data.quote}
              </p>
              {data.author && (
                <footer className="mt-4">
                  <cite 
                    className="text-base text-neutral-600 dark:text-neutral-400 not-italic font-medium"
                    data-tina-field={tinaField(data, 'author')}
                  >
                    — {data.author}
                  </cite>
                </footer>
              )}
            </div>
          </div>
        </blockquote>
      </div>
    </Section>
  );
};

export const quoteBlockSchema: Template = {
  name: 'quote',
  label: 'Quote',
  ui: {
    previewSrc: '/blocks/quote.png',
    defaultItem: {
      quote: 'The best way to predict the future is to invent it.',
      author: 'Alan Kay',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Quote',
      name: 'quote',
      required: true,
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'string',
      label: 'Author',
      name: 'author',
      description: 'Optional author attribution',
    },
  ],
};
