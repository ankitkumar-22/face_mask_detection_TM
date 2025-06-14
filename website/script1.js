document.addEventListener("DOMContentLoaded", () => {
  let currentImages = [];

  setInterval(async () => {
    try {
      const res = await fetch('/get-latest-images');
      const latestImages = await res.json();
      const gallery = document.querySelector('.gallery'); // use class since your div uses class="gallery"

      // Remove images that are no longer in the list
      currentImages.forEach(src => {
        if (!latestImages.includes(src)) {
          const img = [...gallery.getElementsByTagName('img')]
                        .find(img => img.src === location.origin + src);
          if (img) img.remove();
        }
      });

      // Add new images
      latestImages.forEach(src => {
        if (!currentImages.includes(src)) {
          const img = document.createElement('img');
          img.src = src;
          img.width = 200;
          img.style.margin = "10px";
          gallery.prepend(img);
        }
      });

      currentImages = latestImages;
    } catch (err) {
      console.error('Error updating gallery:', err);
    }
  }, 5000);
});
