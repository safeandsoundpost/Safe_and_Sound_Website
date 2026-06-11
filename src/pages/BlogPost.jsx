import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { getPostBySlug } from '../utils/posts';

export default function BlogPost() {
    const { slug } = useParams();
    const post = getPostBySlug(slug);

    if (!post) {
        return (
            <main className="flex min-h-screen w-full flex-col items-center justify-center">
                <p className="text-gray-400 tracking-widest uppercase">Post not found.</p>
                <Link to="/blog" className="text-secondary mt-4 text-sm tracking-widest uppercase hover:underline">← Back to Blog</Link>
            </main>
        );
    }

    return (
        <>
            <main className="flex min-h-screen w-full flex-col select-none">
                <NavBar />
                <div className="ml-0 md:ml-[15%] lg:ml-[12%] xl:ml-[10%]">
                    {post.cover && (
                        <img src={post.cover} alt={post.title} className="h-72 w-full object-cover md:h-96" />
                    )}
                    <div className="px-6 py-12 md:px-16 lg:max-w-3xl">
                        <Link to="/blog" className="text-secondary mb-8 block text-xs tracking-widest uppercase hover:opacity-70 transition-opacity">← Back</Link>
                        <p className="text-secondary mb-3 text-xs tracking-widest uppercase">
                            {new Date(post.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <h1 className="text-primary mb-10 text-3xl font-bold tracking-wide md:text-4xl">{post.title}</h1>
                        <div className="prose prose-invert prose-sm md:prose-base max-w-none
                            prose-headings:text-white prose-headings:font-bold prose-headings:tracking-wide
                            prose-p:text-gray-300 prose-p:leading-relaxed
                            prose-strong:text-white
                            prose-li:text-gray-300
                            prose-a:text-secondary prose-a:no-underline hover:prose-a:underline
                            prose-hr:border-gray-700">
                            <ReactMarkdown>{post.content}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
