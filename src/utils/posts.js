import matter from 'gray-matter';

const modules = import.meta.glob('../posts/*.md', { eager: true, query: '?raw', import: 'default' });

export function getAllPosts() {
    return Object.entries(modules)
        .map(([filepath, raw]) => {
            const slug = filepath.replace('../posts/', '').replace('.md', '');
            const { data, content } = matter(raw);
            return { slug, content, ...data };
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
    return getAllPosts().find((p) => p.slug === slug) ?? null;
}
