'use client';
import React from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';
import { sectionBlockSchemaField } from '../layout/section';
import { Info, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

export const Alert = ({ data }: { data: any }) => {
    const icons = {
        info: Info,
        warning: AlertTriangle,
        success: CheckCircle,
        tip: Lightbulb,
    };

    const styles = {
        info: 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/50 dark:border-blue-800/30',
        warning: 'bg-yellow-50/50 dark:bg-yellow-950/20 border-yellow-200/50 dark:border-yellow-800/30',
        success: 'bg-green-50/50 dark:bg-green-950/20 border-green-200/50 dark:border-green-800/30',
        tip: 'bg-purple-50/50 dark:bg-purple-950/20 border-purple-200/50 dark:border-purple-800/30',
    };

    const iconStyles = {
        info: 'text-blue-600 dark:text-blue-400',
        warning: 'text-yellow-600 dark:text-yellow-400',
        success: 'text-green-600 dark:text-green-400',
        tip: 'text-purple-600 dark:text-purple-400',
    };

    const Icon = icons[data.type as keyof typeof icons] || Info;
    const alertStyle = styles[data.type as keyof typeof styles] || styles.info;
    const iconStyle = iconStyles[data.type as keyof typeof iconStyles] || iconStyles.info;

    return (
        <Section background={data.background!} data-tina-field={tinaField(data)}>
            <div className={`flex gap-3 p-4 rounded-lg border ${alertStyle}`}>
                <div className="flex-shrink-0 mt-0.5">
                    <Icon className={`w-4 h-4 ${iconStyle}`} />
                </div>
                <div className="flex-1">
                    {data.title && (
                        <h4 className="font-semibold text-sm mb-1 text-foreground" data-tina-field={tinaField(data, 'title')}>
                            {data.title}
                        </h4>
                    )}
                    <div className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>p]:text-neutral-700 dark:[&>p]:text-neutral-300" data-tina-field={tinaField(data, 'content')}>
                        <TinaMarkdown content={data.content} />
                    </div>
                </div>
            </div>
        </Section>
    );
};

export const alertBlockSchema: Template = {
    name: 'alert',
    label: 'Alert',
    ui: {
        previewSrc: '/blocks/alert.png',
        defaultItem: {
            type: 'info',
            title: 'Important Information',
            content: {
                type: 'root',
                children: [
                    {
                        type: 'p',
                        children: [
                            {
                                type: 'text',
                                text: 'This is an alert message.',
                            },
                        ],
                    },
                ],
            },
        },
    },
    fields: [
        sectionBlockSchemaField as any,
        {
            type: 'string',
            label: 'Type',
            name: 'type',
            required: true,
            options: [
                { value: 'info', label: 'Info' },
                { value: 'warning', label: 'Warning' },
                { value: 'success', label: 'Success' },
                { value: 'tip', label: 'Tip' },
            ],
        },
        {
            type: 'string',
            label: 'Title',
            name: 'title',
        },
        {
            type: 'rich-text',
            label: 'Content',
            name: 'content',
            required: true,
        },
    ],
};
