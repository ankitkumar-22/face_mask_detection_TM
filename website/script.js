document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById('camera1');

  // Check if browser supports media devices
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing the camera:', error);
        // Handle different error types
        if (error.name === 'NotAllowedError') {
          alert('Camera access was denied. Please allow permission.');
        } else if (error.name === 'NotFoundError') {
          alert('No camera device found.');
        } else {
          alert('Camera access denied or not supported in this environment.');
        }
      });
  } else {
    console.warn('getUserMedia not supported');
    alert('Your browser does not support camera access.');
  }
});
