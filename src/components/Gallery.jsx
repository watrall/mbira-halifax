// src/components/Gallery.jsx
export default function Gallery({ media }) {
  // Filter out the hero image if it's in the gallery to avoid duplicates
  const galleryImages = media.gallery?.filter(img => img !== media.heroImage) || [];

  return (
    <div className="mt-8 p-4 bg-white rounded-xl shadow-card">
      <h2 className="text-xl font-semibold mb-4">Gallery</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {/* Gallery Images */}
        {galleryImages.map((img, index) => (
          <div key={`img-${index}`} className="aspect-square overflow-hidden rounded-lg">
            <img src={img} alt={`Gallery item ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
        {/* Video */}
        {media.video && (
          <div className="aspect-video rounded-lg overflow-hidden col-span-2">
            <video src={media.video} controls className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}