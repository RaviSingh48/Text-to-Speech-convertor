let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");
let textarea = document.querySelector("textarea");

// 🔹 Load available voices
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    speech.voice = voices[0]; // default
    voices.forEach((voice, i) => {
      voiceSelect.options[i] = new Option(voice.name, i);
    });
  }
};

// 🔹 Change selected voice
voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

// 🔹 Play (Listen button)
document.querySelector("#playBtn").addEventListener("click", () => {
  speech.text = textarea.value;
  if (speech.text.trim() !== "") {
    window.speechSynthesis.speak(speech);
  } else {
    alert("Please enter or dictate some text first!");
  }
});

// 🔹 Stop button
document.querySelector("#stopBtn").addEventListener("click", () => {
  window.speechSynthesis.cancel();
});

// 🔹 Speech Recognition (Mic button)
let recognition;
if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    textarea.value = event.results[0][0].transcript;
  };

  document.querySelector("#micBtn").addEventListener("click", () => {
    recognition.start();
  });
} else {
  alert("Speech Recognition not supported in this browser. Use Google Chrome.");
}

// 🔹 Automatic Welcome Message (Accessibility)
window.onload = () => {
  let intro = new SpeechSynthesisUtterance(
    "Welcome to the Text to Speech Converter. Type or dictate your text, then press the Listen button. Use the Stop button to stop reading anytime."
  );
  speechSynthesis.speak(intro);
};
