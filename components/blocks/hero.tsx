'use client';
import { iconSchema } from '@/tina/fields/icon';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { PageBlocksHero, PageBlocksHeroImage } from '../../tina/__generated__/types';
import { Icon } from '../icon';
import { Section, sectionBlockSchemaField } from '../layout/section';
import { AnimatedGroup } from '../motion-primitives/animated-group';
import { TextEffect } from '../motion-primitives/text-effect';
import { Button } from '../ui/button';
import HeroVideoDialog from '../ui/hero-video-dialog';
import { Transition } from 'motion/react';
const transitionVariants = {
  container: {
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.75,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      } as Transition,
    },
  },
};

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  return (
    <Section background={data.background!}>
      <div className='mx-auto max-w-3xl'>
        {data.headline && (
          <h1 
            className='text-4xl md:text-5xl font-bold mb-4 text-foreground'
            data-tina-field={tinaField(data, 'headline')}
          >
            {data.headline!}
          </h1>
        )}
        {data.tagline && (
          <p 
            className='text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8'
            data-tina-field={tinaField(data, 'tagline')}
          >
            {data.tagline!}
          </p>
        )}

        {data.actions && data.actions.length > 0 && (
          <div className='flex flex-wrap gap-4'>
            {data.actions.map((action) => (
              <Link
                key={action!.label}
                href={action!.link!}
                data-tina-field={tinaField(action)}
                className={`
                  inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors no-underline
                  ${action!.type === 'button' 
                    ? 'bg-foreground text-background hover:bg-neutral-800 dark:hover:bg-neutral-200' 
                    : 'text-foreground hover:text-neutral-600 dark:hover:text-neutral-400'
                  }
                `}
              >
                {action?.icon && <Icon data={action?.icon} />}
                <span>{action!.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {data.image && (
        <div className='relative mt-12 max-w-full' data-tina-field={tinaField(data, 'image')}>
          <div className='relative mx-auto max-w-3xl overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800'>
            <ImageBlock image={data.image} />
          </div>
        </div>
      )}
    </Section>
  );
};

const ImageBlock = ({ image }: { image: PageBlocksHeroImage }) => {
  if (image.videoUrl) {
    let videoId = '';
    if (image.videoUrl) {
      const embedPrefix = '/embed/';
      const idx = image.videoUrl.indexOf(embedPrefix);
      if (idx !== -1) {
        videoId = image.videoUrl.substring(idx + embedPrefix.length).split('?')[0];
      }
    }
    const thumbnailSrc = image.src ? image.src! : videoId ? `https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg` : '';

    return <HeroVideoDialog videoSrc={image.videoUrl} thumbnailSrc={thumbnailSrc} thumbnailAlt='Hero Video' />;
  }

  if (image.src) {
    return (
      <Image
        className='z-2 border-border/25 aspect-15/8 relative rounded-2xl border max-w-full h-auto'
        alt={image!.alt || ''}
        src={image!.src!}
        height={4000}
        width={3000}
      />
    );
  }
};

export const heroBlockSchema: Template = {
  name: 'hero',
  label: 'Hero',
  ui: {
    previewSrc: '/blocks/hero.png',
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: 'This Big Text is Totally Awesome',
      text: 'Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Headline',
      name: 'headline',
    },
    {
      type: 'string',
      label: 'Tagline',
      name: 'tagline',
    },
    {
      label: 'Actions',
      name: 'actions',
      type: 'object',
      list: true,
      ui: {
        defaultItem: {
          label: 'Action Label',
          type: 'button',
          icon: {
              name: "Tina",
              color: "white",
              style: "float",
          },
          link: '/',
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: 'Label',
          name: 'label',
          type: 'string',
        },
        {
          label: 'Type',
          name: 'type',
          type: 'string',
          options: [
            { label: 'Button', value: 'button' },
            { label: 'Link', value: 'link' },
          ],
        },
        iconSchema as any,
        {
          label: 'Link',
          name: 'link',
          type: 'string',
        },
      ],
    },
    {
      type: 'object',
      label: 'Image',
      name: 'image',
      fields: [
        {
          name: 'src',
          label: 'Image Source',
          type: 'image',
        },
        {
          name: 'alt',
          label: 'Alt Text',
          type: 'string',
        },
        {
          name: 'videoUrl',
          label: 'Video URL',
          type: 'string',
          description: 'If using a YouTube video, make sure to use the embed version of the video URL',
        },
      ],
    },
  ],
};
