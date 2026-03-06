import { createSignal, onMount, onCleanup } from 'solid-js';

const App = () => {
  const [content, setContent] = createSignal('');
  const [copied, setCopied] = createSignal(false);
  let ws;

  onMount(async () => {
    // 1. Charger le contenu initial
    const res = await fetch('/api/clipboard');
    const data = await res.json();
    setContent(data.content);

    // 2. Connecter le WebSocket
    ws = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/ws`);

    // 3. Mettre à jour le contenu quand un autre client envoie
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setContent(data.content);
    };
  });

  onCleanup(() => ws?.close());

  const handlePost = async () => {
    await fetch('/api/clipboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: content() }),  // ← content() avec ()
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div class="flex flex-col items-center gap-4 py-20 px-4">
      <textarea
        class="w-full max-w-lg h-40 p-3 border rounded"
        value={content()}
        onInput={(e) => setContent(e.target.value)}
      />
      <div class="flex flex-col items-center gap-2">
        <div class="flex gap-2">
          <button
            class="px-6 py-2 bg-violet-400 text-white rounded hover:bg-violet-500"
            onClick={handlePost}
          >
            🚀 Envoyer
          </button>
          <button
            class="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            onClick={handleCopy}
          >
            📋 Copier
          </button>
        </div>
        {copied() && <span class="text-sm text-green-600">✅ L'élément a été copié</span>}
      </div>
    </div>
  );
};

export default App;
