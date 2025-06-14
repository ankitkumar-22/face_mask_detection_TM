let stream = null;

document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById('camera1');
  const backBtn = document.getElementById('backBtn');

  // Check if browser supports media devices
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((mediaStream) => {
        stream = mediaStream;
        video.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing the camera:', error);
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

  // Stop stream when Back button is clicked
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    });
  }
});

// Stop camera stream when page unloads
window.addEventListener('beforeunload', () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
});
