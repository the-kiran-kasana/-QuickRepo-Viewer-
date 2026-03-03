import React, { useContext, useMemo, useState } from "react";
import { ThemeContext } from "./components/themeContext";

const practicePrompts = [
  "Hello! How are you today?",
  "Could you tell me where the nearest station is?",
  "I would like a cup of coffee, please.",
  "What do you enjoy doing on weekends?",
  "I am learning English speaking skills every day.",
];

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [customText, setCustomText] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState(practicePrompts[0]);
  const [status, setStatus] = useState("Ready to practice.");

  const canSpeak = useMemo(
    () => typeof window !== "undefined" && "speechSynthesis" in window,
    []
  );

  const speakText = (textToSpeak) => {
    const text = textToSpeak.trim();
    if (!text) {
      setStatus("Please enter a sentence first.");
      return;
    }

    if (!canSpeak) {
      setStatus("Speech is not supported in this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.pitch = 1;

    utterance.onstart = () => setStatus("Speaking...");
    utterance.onend = () => setStatus("Done! Try speaking the sentence aloud.");
    utterance.onerror = () => setStatus("Something went wrong while speaking.");

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <main className="min-h-screen p-6 flex items-center justify-center">
      <section className="w-full max-w-2xl rounded-xl shadow-lg border p-6 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">English Speaking App</h1>
            <p className="text-sm opacity-80 mt-1">
              Practice pronunciation by listening and repeating English sentences.
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="px-3 py-2 border rounded-md"
            aria-label="toggle-theme"
          >
            {theme === "light" ? "Dark" : "Light"} mode
          </button>
        </div>

        <div className="space-y-3">
          <label className="font-medium" htmlFor="prompt-select">
            Practice prompt
          </label>
          <select
            id="prompt-select"
            className="w-full border rounded-md p-2"
            value={selectedPrompt}
            onChange={(event) => setSelectedPrompt(event.target.value)}
          >
            {practicePrompts.map((prompt) => (
              <option key={prompt} value={prompt}>
                {prompt}
              </option>
            ))}
          </select>
          <button
            onClick={() => speakText(selectedPrompt)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            🔊 Listen to prompt
          </button>
        </div>

        <div className="space-y-3">
          <label className="font-medium" htmlFor="custom-text">
            Your own sentence
          </label>
          <textarea
            id="custom-text"
            rows="4"
            className="w-full border rounded-md p-2"
            placeholder="Type any English sentence and press speak..."
            value={customText}
            onChange={(event) => setCustomText(event.target.value)}
          />
          <button
            onClick={() => speakText(customText)}
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            🎙️ Speak my sentence
          </button>
        </div>

        <p className="text-sm border rounded-md p-3">Status: {status}</p>
      </section>
    </main>
  );
}

export default App;
