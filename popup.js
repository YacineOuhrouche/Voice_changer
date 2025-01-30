document.getElementById("pitch").addEventListener("input", function (event) {
  const pitchValue = event.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: applyPitchShift,
      args: [pitchValue],
    });
  });
});

document.getElementById("volume").addEventListener("input", function (event) {
  const volumeValue = event.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: applyVolumeControl,
      args: [volumeValue],
    });
  });
});

function applyPitchShift(pitchValue) {
  chrome.runtime.sendMessage({ command: "applyPitchShift", value: pitchValue });
}

function applyVolumeControl(volumeValue) {
  // Implement volume control logic in content.js
}
