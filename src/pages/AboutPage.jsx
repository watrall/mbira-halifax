// src/pages/AboutPage.jsx
export default function AboutPage({ project }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">About</h1>
      <div className="prose max-w-none bg-white p-6 rounded-xl shadow-card">
        {/* Render the HTML content from project.json safely */}
        <div dangerouslySetInnerHTML={{ __html: project.aboutHtml }} />
      </div>
    </div>
  );
}