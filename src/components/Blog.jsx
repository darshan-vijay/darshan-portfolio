import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuArrowLeft, LuBookOpen } from 'react-icons/lu';
import { getBlogImageUrl } from '../utils/blogAssets';
import '../styles/Blog.css';

const BLOGS_JSON = `${import.meta.env.BASE_URL || '/'}blogs/blogs.json`;

const Blog = () => {
  const [blogData, setBlogData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(BLOGS_JSON)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load blogs');
        return res.json();
      })
      .then((data) => setBlogData(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <section id="blog" className="blog-section">
        <div className="blog-container">
          <Link to="/" className="blog-back-link">
            <LuArrowLeft size={20} />
            Back to portfolio
          </Link>
          <p className="blog-error">Could not load blogs: {error}</p>
        </div>
      </section>
    );
  }

  if (!blogData?.posts?.length) {
    return (
      <section id="blog" className="blog-section">
        <div className="blog-container">
          <Link to="/" className="blog-back-link">
            <LuArrowLeft size={20} />
            Back to portfolio
          </Link>
          <p className="blog-loading">Loading blogs...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="blog-section">
      <div className="blog-container">
        <Link to="/" className="blog-back-link">
          <LuArrowLeft size={20} />
          Back to portfolio
        </Link>

        <header className="blog-header">
          <h1 className="blog-main-title">{blogData.title}</h1>
          <p className="blog-subtitle">{blogData.subtitle}</p>
        </header>

        <div className="blog-tiles">
          {blogData.posts.map((post, index) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="blog-tile"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="blog-tile-image-wrap">
                <img
                  src={getBlogImageUrl(post.thumbnail) || post.thumbnail}
                  alt={post.title}
                  className="blog-tile-thumb"
                />
              </div>
              <div className="blog-tile-content">
                <span className="blog-tile-meta">
                  {post.datePublished || post.date}
                  {post.readTime && (
                    <>
                      <span className="blog-tile-meta-sep">·</span>
                      <span>{post.readTime} min read</span>
                    </>
                  )}
                </span>
                {post.authors?.length > 0 && (
                  <span className="blog-tile-authors">
                    {post.authors.join(', ')}
                  </span>
                )}
                <h2 className="blog-tile-title">{post.title}</h2>
                <p className="blog-tile-excerpt">{post.excerpt}</p>
                <span className="blog-tile-cta">
                  Read <LuBookOpen size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
