import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { getAllPosts } from '../utils/posts';

export default function Blog() {
    const posts = getAllPosts();

    return (
        <>
            <main className="flex min-h-screen w-full flex-col select-none">
                <NavBar />
                <div className="ml-0 md:ml-[15%] lg:ml-[12%] xl:ml-[10%] px-6 py-24 md:py-16">
                    <h1 className="text-secondary mb-12 text-4xl font-bold tracking-widest uppercase">Behind the Scenes</h1>
                    {posts.length === 0 && (
                        <p className="text-gray-400 tracking-widest uppercase text-sm">No posts yet — check back soon.</p>
                    )}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <Link key={post.slug} to={`/blog/${post.slug}`} className="group block">
                                <div className="overflow-hidden border border-gray-800 transition-all duration-300 hover:border-gray-500">
                                    {post.cover && (
                                        <img
                                            src={post.cover}
                                            alt={post.title}
                                            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    )}
                                    <div className="p-5">
                                        <p className="text-secondary mb-2 text-xs tracking-widest uppercase">
                                            {new Date(post.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                        <h2 className="text-primary mb-3 text-xl font-bold tracking-wide">{post.title}</h2>
                                        {post.excerpt && <p className="text-sm text-gray-400 leading-relaxed">{post.excerpt}</p>}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
