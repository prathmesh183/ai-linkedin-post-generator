import { useState, useEffect } from 'react';
import { Copy, Trash2, Check, BookOpen, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { getSavedPosts, deletePost } from '../utils/api';
import './History.css';

const TONES = ['all', 'professional', 'casual', 'motivational', 'storytelling', 'humorous'];
const TONE_EMOJIS = {
  professional: '💼', casual: '☕', motivational: '🔥',
  storytelling: '📖', humorous: '😄',
};

export default function History() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = filter !== 'all' ? { tone: filter } : {};
      const res = await getSavedPosts(params);
      setPosts(res.data.data);
    } catch {
      toast.error('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, [filter]);

  const handleCopy = (post) => {
    navigator.clipboard.writeText(post.generatedPost);
    setCopiedId(post._id);
    toast.success('Copied!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
      toast.success('Post deleted');
    } catch {
      toast.error('Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="history-page">
      <div className="history-header fade-up">
        <div>
          <h1 className="history-title">
            <BookOpen size={28} />
            Your Saved Posts
          </h1>
          <p className="history-sub">All your generated LinkedIn posts in one place</p>
        </div>
        <button className="btn-refresh" onClick={fetchPosts}>
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Filter bar */}
      <div className="filter-bar fade-up" style={{ animationDelay: '0.1s' }}>
        {TONES.map((t) => (
          <button
            key={t}
            className={`filter-btn ${filter === t ? 'active' : ''}`}
            onClick={() => setFilter(t)}
          >
            {t !== 'all' && TONE_EMOJIS[t]} {t === 'all' ? 'All Posts' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="posts-grid fade-in">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="post-skeleton">
              <div className="sk-line w-30" />
              <div className="sk-line w-90 mt" />
              <div className="sk-line w-75" />
              <div className="sk-line w-85" />
              <div className="sk-line w-60" />
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && posts.length === 0 && (
        <div className="empty-history fade-in">
          <div className="empty-icon">📭</div>
          <p className="empty-title">No saved posts yet</p>
          <p className="empty-sub">
            {filter !== 'all'
              ? `No ${filter} posts saved. Try a different filter.`
              : 'Generate and save your first LinkedIn post!'}
          </p>
        </div>
      )}

      {/* Posts grid */}
      {!loading && posts.length > 0 && (
        <div className="posts-grid fade-up" style={{ animationDelay: '0.15s' }}>
          {posts.map((post, idx) => (
            <div
              key={post._id}
              className="post-card"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="post-card-header">
                <div className="post-tone">
                  {TONE_EMOJIS[post.tone]} {post.tone}
                </div>
                <div className="post-date">{formatDate(post.createdAt)}</div>
              </div>

              <div className="post-topic">{post.topic}</div>

              <div className="post-preview">
                {post.generatedPost.substring(0, 180)}
                {post.generatedPost.length > 180 && '...'}
              </div>

              {post.hashtags?.length > 0 && (
                <div className="post-hashtags">
                  {post.hashtags.slice(0, 4).map((tag) => (
                    <span key={tag} className="post-tag">{tag}</span>
                  ))}
                  {post.hashtags.length > 4 && (
                    <span className="post-tag-more">+{post.hashtags.length - 4}</span>
                  )}
                </div>
              )}

              <div className="post-card-footer">
                <span className="post-chars">{post.characterCount} chars</span>
                <div className="post-actions">
                  <button
                    className="post-btn"
                    onClick={() => handleCopy(post)}
                    title="Copy post"
                  >
                    {copiedId === post._id
                      ? <Check size={14} style={{ color: 'var(--accent)' }} />
                      : <Copy size={14} />}
                  </button>
                  <button
                    className="post-btn delete-btn"
                    onClick={() => handleDelete(post._id)}
                    disabled={deletingId === post._id}
                    title="Delete post"
                  >
                    {deletingId === post._id
                      ? <span className="spinner-xs" />
                      : <Trash2 size={14} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

