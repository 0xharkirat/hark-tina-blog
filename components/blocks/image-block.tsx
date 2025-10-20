'use client';
import React from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';
import { sectionBlockSchemaField } from '../layout/section';
import Image from 'next/image';

export const ImageBlock = ({ data }: { data: any }) => {
  return (
    <Section background={data.background!} data-tina-field={tinaField(data)}>
      <div className="w-full max-w-4xl mx-auto">
        <figure>
          <div className="relative w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
            {data.src && (
              <img
                src={data.src}
                alt={data.alt || ''}
                className="w-full h-auto"
                data-tina-field={tinaField(data, 'src')}
              />
            )}
          </div>
          {data.caption && (
            <figcaption 
              className="mt-3 text-center text-sm text-neutral-600 dark:text-neutral-400 italic"
              data-tina-field={tinaField(data, 'caption')}
            >
              {data.caption}
            </figcaption>
          )}
        </figure>
      </div>
    </Section>
  );
};

export const imageBlockSchema: Template = {
  name: 'imageBlock',
  label: 'Image',
  ui: {
    previewSrc: '/blocks/image.png',
    defaultItem: {
      alt: 'Image description',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'image',
      label: 'Image',
      name: 'src',
      required: true,
    },
    {
      type: 'string',
      label: 'Alt Text',
      name: 'alt',
      required: true,
      description: 'Describe the image for accessibility',
    },
    {
      type: 'string',
      label: 'Caption',
      name: 'caption',
      description: 'Optional caption displayed below the image',
    },
  ],
};
