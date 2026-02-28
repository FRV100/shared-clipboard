import { createSignal, onMount, onCleanup } from 'solid-js';

const App = () => {
  const [content, setContent] = createSignal('');
  let ws;

  onMount(async () => {
    // 1. Charger le contenu initial
    const res = await fetch('/api/clipboard');
    const data = await res.json();
    setContent(data.content);

    // 2. Connecter le WebSocket
    ws = new WebSocket(`ws://${location.host}/ws`);

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

  return (
    <div class="flex flex-col items-center gap-4 py-20 px-4">
      <textarea
        class="w-full max-w-lg h-40 p-3 border rounded"
        value={content()}
        onInput={(e) => setContent(e.target.value)}
      />
      <button
        class="px-6 py-2 bg-violet-400 text-white rounded hover:bg-violet-500"
        onClick={handlePost}
      >
        Envoyer
      </button>
    </div>
  );
};

export default App;
