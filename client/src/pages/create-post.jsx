import React, { useState } from 'react';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState(''); // Simple string for tags, comma-separated
  const [coverImageUrl, setCoverImageUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const postData = {
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag), // Basic tag splitting
      coverImageUrl,
      createdAt: new Date().toISOString(), // Add a timestamp for completeness
    };
    console.log('New Post Data:', postData);
    alert('Blog post data logged to console. Backend functionality is not yet implemented.');
    // Here you would normally make an API call to your backend
  };

  // Basic styling for demonstration. Assumes Tailwind-like classes might be available.
  const inputStyle = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500";
  const labelStyle = "block text-sm font-medium text-slate-700";
  const buttonStyle = "mt-6 px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50";

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-slate-800">Write Your Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-8">
        <div>
          <label htmlFor="title" className={labelStyle}>Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputStyle}
            placeholder="Enter your post title"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className={labelStyle}>Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            className={inputStyle}
            placeholder="Write your blog content here..."
            required
          />
          <p className="mt-1 text-xs text-slate-500">
            You can use Markdown for formatting if a Markdown parser is implemented later.
          </p>
        </div>

        <div>
          <label htmlFor="tags" className={labelStyle}>Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className={inputStyle}
            placeholder="e.g., technology, programming, lifestyle"
          />
        </div>

        <div>
          <label htmlFor="coverImageUrl" className={labelStyle}>Cover Image URL (Optional)</label>
          <input
            type="url"
            id="coverImageUrl"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            className={inputStyle}
            placeholder="https://example.com/your-image.jpg"
          />
        </div>

        <div>
          <button type="submit" className={buttonStyle}>
            Publish (Frontend Only)
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;
