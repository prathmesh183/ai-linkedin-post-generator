import { useState } from 'react';
import { Sparkles, RefreshCw, Save, Copy, Check, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { generatePost, savePost } from '../utils/api';
import './Home.css';

const TONES = [
  { value: 'professional', label: 'Professional', emoji: '💼', desc: 'Formal & authoritative' },
  { value: 'casual', label: 'Casual', emoji: '☕', desc: 'Friendly & conversational' },
  { value: 'motivational', label: 'Motivational', emoji: '🔥', desc: 'Inspiring & energetic' },
  { value: 'storytelling', label: 'Storytelling', emoji: '📖', desc: 'Narrative & personal' },
  { value: 'humorous', label: 'Humorous', emoji: '😄', desc: 'Witty & light-hearted' },
];

export default function Home() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [keywords, setKeywords] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic first');
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const keywordArr = keywords
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean);

      const res = await generatePost({ topic, tone, keywords: keywordArr });
      setResult(res.data.data);
      toast.success('Post generated!');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to generate. Check your OpenAI API key.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.generatedPost);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    if (!result) return;
    setSaving(true);
    try {
      const keywordArr = keywords.split(',').map((k) => k.trim()).filter(Boolean);
      await savePost({
        topic,
        tone,
        keywords: keywordArr,
        generatedPost: result.generatedPost,
        hashtags: result.hashtags,
      });
      toast.success('Post saved to history!');
    } catch (err) {
      toast.error('Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  const handleRegenerate = () => handleGenerate();

  const selectedTone = TONES.find((t) => t.value === tone);

  return (
    <div className="home">
      {/* Hero */}
      <div className="hero fade-up">
        <div className="hero-badge">
          <Sparkles size={12} />
          Powered by GPT-3.5
        </div>
        <h1 className="hero-title">
          Write LinkedIn posts<br />
          <span className="hero-gradient">that actually get seen</span>
        </h1>
        <p className="hero-sub">
          Enter your idea, pick a tone, and let AI craft a post worth sharing.
        </p>
      </div>

      <div className="main-grid">
        {/* LEFT: Input Form */}
        <div className="card form-card fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="card-label">Your Input</div>

          {/* Topic */}
          <div className="field">
            <label className="field-label">
              What do you want to post about?
              <span className="required">*</span>
            </label>
            <textarea
              className="field-textarea"
              placeholder="e.g. I just won my first hackathon with my team after 48 hours of coding..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={4}
              maxLength={300}
            />
            <div className="field-count">{topic.length}/300</div>
          </div>

          {/* Tone */}
          <div className="field">
            <label className="field-label">Tone</label>
            <div className="tone-grid">
              {TONES.map((t) => (
                <button
                  key={t.value}
                  className={`tone-btn ${tone === t.value ? 'active' : ''}`}
                  onClick={() => setTone(t.value)}
                >
                  <span className="tone-emoji">{t.emoji}</span>
                  <span className="tone-label">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div className="field">
            <label className="field-label">
              Keywords
              <span className="optional">optional</span>
            </label>
            <input
              className="field-input"
              placeholder="hackathon, teamwork, coding, learning"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
            <div className="field-hint">Separate keywords with commas</div>
          </div>

          <button
            className={`btn-generate ${loading ? 'loading' : ''}`}
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" />
                Generating your post...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Generate Post
              </>
            )}
          </button>
        </div>

        {/* RIGHT: Output */}
        <div className="output-area">
          {!result && !loading && (
            <div className="empty-state fade-in">
              <div className="empty-icon">✦</div>
              <p className="empty-title">Your post will appear here</p>
              <p className="empty-sub">Fill in the form and click Generate Post</p>
            </div>
          )}

          {loading && (
            <div className="skeleton-card fade-in">
              <div className="skeleton-label">Crafting your post...</div>
              <div className="skeleton-line w-90" />
              <div className="skeleton-line w-75" />
              <div className="skeleton-line w-85" />
              <div className="skeleton-line w-60" />
              <div className="skeleton-line w-80" />
              <div className="skeleton-line w-50" />
              <div className="skeleton-line w-40 mt" />
            </div>
          )}

          {result && !loading && (
            <div className="result-card fade-up">
              <div className="result-header">
                <div className="result-meta">
                  <span className="result-tone">{selectedTone?.emoji} {selectedTone?.label}</span>
                  <span className="result-chars">{result.characterCount} chars</span>
                </div>
                <div className="result-actions">
                  <button className="action-btn" onClick={handleRegenerate} title="Regenerate">
                    <RefreshCw size={15} />
                  </button>
                  <button className="action-btn" onClick={handleCopy} title="Copy">
                    {copied ? <Check size={15} style={{ color: 'var(--accent)' }} /> : <Copy size={15} />}
                  </button>
                  <button
                    className={`action-btn save-btn ${saving ? 'loading' : ''}`}
                    onClick={handleSave}
                    disabled={saving}
                    title="Save to history"
                  >
                    {saving ? <span className="spinner-sm" /> : <Save size={15} />}
                    Save
                  </button>
                </div>
              </div>

              <div className="result-body">
                <p className="result-text">{result.generatedPost}</p>
              </div>

              {result.hashtags?.length > 0 && (
                <div className="hashtags">
                  {result.hashtags.map((tag) => (
                    <span key={tag} className="hashtag">{tag}</span>
                  ))}
                </div>
              )}

              <button className="btn-copy-full" onClick={handleCopy}>
                {copied ? '✓ Copied!' : 'Copy Full Post'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
