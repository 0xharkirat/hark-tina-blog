'use client';
import React, { useState } from 'react';
import { codeToHtml } from 'shiki';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';
import { sectionBlockSchemaField } from '../layout/section';
import { Copy, Check } from 'lucide-react';

export const CodeBlock = ({ data }: { data: any }) => {
    const [html, setHtml] = React.useState<string>('');
    const [copied, setCopied] = useState(false);

    React.useEffect(() => {
        const generateHTML = async () => {
            try {
                const result = await codeToHtml(data.code || '', {
                    lang: data.language || 'typescript',
                    themes: {
                        light: 'github-light',
                        dark: 'github-dark',
                    },
                    defaultColor: false,
                });
                setHtml(result);
            } catch (error) {
                console.error('Error highlighting code:', error);
                setHtml(`<pre><code>${data.code}</code></pre>`);
            }
        };
        generateHTML();
    }, [data.code, data.language]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(data.code || '');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Section background={data.background!} data-tina-field={tinaField(data)}>
            {data.title && (
                <div className="bg-neutral-50 dark:bg-neutral-900/50 px-4 py-2 rounded-t-lg border border-b-0 border-neutral-200 dark:border-neutral-800">
                    <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400" data-tina-field={tinaField(data, 'title')}>
                        {data.title}
                    </p>
                </div>
            )}
            <div className="relative group">
                <button
                    onClick={handleCopy}
                    className="absolute right-3 top-3 p-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors opacity-0 group-hover:opacity-100 z-10"
                    aria-label="Copy code"
                >
                    {copied ? (
                        <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                    ) : (
                        <Copy className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
                    )}
                </button>
                <div
                    className={`overflow-x-auto ${!data.title ? 'rounded-lg' : 'rounded-b-lg'} border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 [&>pre]:!my-0 [&>pre]:!p-4 [&>pre]:!bg-transparent [&>pre]:text-sm`}
                    data-tina-field={tinaField(data, 'code')}
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        </Section>
    );
};

export const codeBlockSchema: Template = {
    name: 'codeBlock',
    label: 'Code Block',
    ui: {
        previewSrc: '/blocks/code-block.png',
        defaultItem: {
            code: 'console.log("Hello, World!");',
            language: 'javascript',
            showLineNumbers: true,
        },
    },
    fields: [
        sectionBlockSchemaField as any,
        {
            type: 'string',
            label: 'Title',
            name: 'title',
            description: 'Optional title or filename for the code block',
        },
        {
            type: 'string',
            label: 'Language',
            name: 'language',
            required: true,
            options: [
                { value: 'javascript', label: 'JavaScript' },
                { value: 'typescript', label: 'TypeScript' },
                { value: 'jsx', label: 'JSX' },
                { value: 'tsx', label: 'TSX' },
                { value: 'python', label: 'Python' },
                { value: 'java', label: 'Java' },
                { value: 'csharp', label: 'C#' },
                { value: 'cpp', label: 'C++' },
                { value: 'go', label: 'Go' },
                { value: 'rust', label: 'Rust' },
                { value: 'php', label: 'PHP' },
                { value: 'ruby', label: 'Ruby' },
                { value: 'bash', label: 'Bash' },
                { value: 'shell', label: 'Shell' },
                { value: 'powershell', label: 'PowerShell' },
                { value: 'sql', label: 'SQL' },
                { value: 'json', label: 'JSON' },
                { value: 'yaml', label: 'YAML' },
                { value: 'xml', label: 'XML' },
                { value: 'html', label: 'HTML' },
                { value: 'css', label: 'CSS' },
                { value: 'scss', label: 'SCSS' },
                { value: 'markdown', label: 'Markdown' },
            ],
        },
        {
            type: 'string',
            label: 'Code',
            name: 'code',
            required: true,
            ui: {
                component: 'textarea',
            },
        },
        {
            type: 'boolean',
            label: 'Show Line Numbers',
            name: 'showLineNumbers',
            description: 'Display line numbers in the code block',
        },
    ],
};
