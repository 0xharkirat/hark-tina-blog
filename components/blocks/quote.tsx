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
            <blockquote className="relative border-l-2 border-neutral-300 dark:border-neutral-700 pl-6 my-8">
                <p
                    className="text-lg md:text-xl text-foreground italic leading-relaxed"
                    data-tina-field={tinaField(data, 'quote')}
                >
                    {data.quote}
                </p>
                {data.author && (
                    <footer className="mt-3">
                        <cite
                            className="text-sm text-neutral-600 dark:text-neutral-400 not-italic font-medium"
                            data-tina-field={tinaField(data, 'author')}
                        >
                            — {data.author}
                        </cite>
                    </footer>
                )}
            </blockquote>
        </Section>
    );
}; export const quoteBlockSchema: Template = {
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
