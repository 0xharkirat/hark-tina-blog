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
            <div className="w-full max-w-4xl mx-auto">
                {data.title && (
                    <div className="bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-t-lg border border-b-0 border-neutral-200 dark:border-neutral-700">
                        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300" data-tina-field={tinaField(data, 'title')}>
                            {data.title}
                        </p>
                    </div>
                )}
                <div className="relative group">
                    <button
                        onClick={handleCopy}
                        className="absolute right-3 top-3 p-2 rounded-md bg-neutral-800 dark:bg-neutral-700 hover:bg-neutral-700 dark:hover:bg-neutral-600 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Copy code"
                    >
                        {copied ? (
                            <Check className="w-4 h-4 text-green-400" />
                        ) : (
                            <Copy className="w-4 h-4 text-neutral-300" />
                        )}
                    </button>
                    <div
                        className={`overflow-x-auto ${!data.title ? 'rounded-t-lg' : ''} rounded-b-lg border border-neutral-200 dark:border-neutral-700 [&>pre]:!my-0 [&>pre]:!p-4 ${data.showLineNumbers ? '[&>pre]:!pl-12' : ''}`}
                        data-tina-field={tinaField(data, 'code')}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </div>
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
