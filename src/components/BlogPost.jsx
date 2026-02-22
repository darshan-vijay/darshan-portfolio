import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { LuArrowLeft } from 'react-icons/lu';
import { getBlogImageUrl } from '../utils/blogAssets';
import '../styles/BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams();
  const [postMeta, setPostMeta] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const base = import.meta.env.BASE_URL || '/';
        const dataRes = await fetch(`${base}blogs/blogs.json`);
        if (!dataRes.ok) throw new Error('Failed to load blog list');
        const data = await dataRes.json();
        const post = data.posts?.find((p) => p.slug === slug);
        if (!post) {
          setError('Post not found');
          setLoading(false);
          return;
        }
        setPostMeta(post);

        const mdRes = await fetch(`${base}blogs/${post.mdFile}`);
        if (!mdRes.ok) throw new Error('Failed to load post content');
        const mdText = await mdRes.text();
        setContent(mdText);
      } catch (err) {
        setError(err.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <article className="blog-post-section">
        <div className="blog-post-container">
          <div className="blog-post-loading">Loading...</div>
        </div>
      </article>
    );
  }

  if (error) {
    return (
      <article className="blog-post-section">
        <div className="blog-post-container">
          <p className="blog-post-error">{error}</p>
          <Link to="/blog" className="blog-back-link">
            <LuArrowLeft size={20} />
            Back to blog
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="blog-post-section">
      <div className="blog-post-container">
        <Link to="/blog" className="blog-back-link">
          <LuArrowLeft size={20} />
          Back to blog
        </Link>

        <header className="blog-post-header">
          <div className="blog-post-meta">
            {(postMeta?.datePublished || postMeta?.date) && (
              <time className="blog-post-date">
                {postMeta.datePublished || postMeta.date}
              </time>
            )}
            {postMeta?.readTime && (
              <span className="blog-post-read-time">
                {postMeta.readTime} min read
              </span>
            )}
          </div>
          {postMeta?.authors?.length > 0 && (
            <p className="blog-post-authors">
              {postMeta.authors.join(', ')}
            </p>
          )}
          <h1 className="blog-post-title">{postMeta?.title}</h1>
        </header>

        <div className="blog-post-body">
          <ReactMarkdown
            components={{
              img: ({ src, alt }) => {
                const resolvedSrc =
                  getBlogImageUrl(src) ||
                  (src?.startsWith('http') ? src : null) ||
                  src;
                return (
                  <span className="blog-post-image-wrap">
                    <img src={resolvedSrc} alt={alt || ''} />
                  </span>
                );
              },
              h1: ({ children }) => (
                <h2 className="md-h1">{children}</h2>
              ),
              h2: ({ children }) => (
                <h2 className="md-h2">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="md-h3">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="md-p">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="md-ul">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="md-ol">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="md-li">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="md-blockquote">{children}</blockquote>
              ),
              code: ({ className, children }) => {
                const isInline = !className;
                return isInline ? (
                  <code className="md-inline-code">{children}</code>
                ) : (
                  <code className="md-code-block">{children}</code>
                );
              },
              pre: ({ children }) => (
                <pre className="md-pre">{children}</pre>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
