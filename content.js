let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let mediaStreamSource = null;
let pitchShiftNode = null;
let gainNode = null;
let audioStream = null;

// Function to capture audio from the user's microphone
async function getAudioStream() {
  audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaStreamSource = audioContext.createMediaStreamSource(audioStream);

  // Create a gain node to control volume
  gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(1, audioContext.currentTime);

  // Create a pitch shift effect (basic shift using playbackRate for demonstration)
  pitchShiftNode = audioContext.createBufferSource();
  pitchShiftNode.playbackRate.setValueAtTime(1.2, audioContext.currentTime); // Increase pitch by 20%

  mediaStreamSource.connect(gainNode);
  gainNode.connect(audioContext.destination);
}

// Apply changes when the user interacts with the extension (e.g., UI controls)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "applyPitchShift") {
    if (request.value) {
      pitchShiftNode.playbackRate.setValueAtTime(request.value, audioContext.currentTime);
    }
  }
});

// Start capturing the user's microphone
getAudioStream();
