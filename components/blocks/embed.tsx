'use client';
import React from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';
import { sectionBlockSchemaField } from '../layout/section';

export const Embed = ({ data }: { data: any }) => {
    const getEmbedUrl = (url: string): string => {
        // YouTube
        const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const youtubeMatch = url.match(youtubeRegex);
        if (youtubeMatch) {
            return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
        }

        // Vimeo
        const vimeoRegex = /vimeo\.com\/(?:video\/)?(\d+)/;
        const vimeoMatch = url.match(vimeoRegex);
        if (vimeoMatch) {
            return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
        }

        // CodePen
        const codepenRegex = /codepen\.io\/([^\/]+)\/pen\/([^\/]+)/;
        const codepenMatch = url.match(codepenRegex);
        if (codepenMatch) {
            return `https://codepen.io/${codepenMatch[1]}/embed/${codepenMatch[2]}?default-tab=result`;
        }

        // CodeSandbox
        const codesandboxRegex = /codesandbox\.io\/s\/([^\/\?]+)/;
        const codesandboxMatch = url.match(codesandboxRegex);
        if (codesandboxMatch) {
            return `https://codesandbox.io/embed/${codesandboxMatch[1]}`;
        }

        // If no pattern matches, return original URL
        return url;
    };

    const embedUrl = data.embedUrl ? getEmbedUrl(data.embedUrl) : '';
    const height = data.height || 450;

    return (
        <Section background={data.background!} data-tina-field={tinaField(data)}>
            <div
                className="relative w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 my-8"
                style={{ paddingBottom: `${(height / 16) * 9}px` }}
            >
                {embedUrl && (
                    <iframe
                        src={embedUrl}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        data-tina-field={tinaField(data, 'embedUrl')}
                    />
                )}
            </div>
        </Section>
    );
};

export const embedBlockSchema: Template = {
    name: 'embed',
    label: 'Embed',
    ui: {
        previewSrc: '/blocks/embed.png',
        defaultItem: {
            embedUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            height: 450,
        },
    },
    fields: [
        sectionBlockSchemaField as any,
        {
            type: 'string',
            label: 'Embed URL',
            name: 'embedUrl',
            required: true,
            description: 'YouTube, Vimeo, CodePen, or CodeSandbox URL',
        },
        {
            type: 'number',
            label: 'Height',
            name: 'height',
            description: 'Height in pixels (default: 450)',
        },
    ],
};
