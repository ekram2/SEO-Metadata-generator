import { auth, provider, db } from './firebase-config.js';
import { addDoc, collection } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// 🧠 Handle tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// 🧠 AI button
document.getElementById('generate-ai').addEventListener('click', async () => {
  const input = prompt("Paste a short paragraph or intro about your page:");
  if (!input) return;
  const response = await window.generateMetaDescription(input);
  document.getElementById('gen-desc').value = response;
  alert("AI Meta Description generated!");
});

// 📝 Generate meta tags
document.getElementById('meta-generator-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('gen-title').value;
  const desc = document.getElementById('gen-desc').value;
  const keywords = document.getElementById('gen-keywords').value;

  const meta = `<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="keywords" content="${keywords}">`;

  document.getElementById('generated-meta').textContent = meta;
  document.getElementById('generator-results').classList.remove('hidden');

  if (auth.currentUser) {
    await addDoc(collection(db, "meta_entries"), {
      uid: auth.currentUser.uid,
      title, desc, keywords,
      created: new Date().toISOString()
    });
  }
});
// 📋 Copy meta to clipboard
document.getElementById('copy-meta').addEventListener('click', () => {
  const code = document.getElementById('generated-meta').textContent;
  navigator.clipboard.writeText(code).then(() => {
    alert("Metadata copied to clipboard!");
  });
});

// 📤 Export as JSON
document.getElementById('export-json').addEventListener('click', () => {
  const data = {
    title: document.getElementById('gen-title').value,
    description: document.getElementById('gen-desc').value,
    keywords: document.getElementById('gen-keywords').value
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = "meta-data.json";
  a.click();
});

// 📤 Export as CSV
document.getElementById('export-csv').addEventListener('click', () => {
  const title = document.getElementById('gen-title').value;
  const desc = document.getElementById('gen-desc').value;
  const keywords = document.getElementById('gen-keywords').value;
  const csv = `"title","description","keywords"\n"${title}","${desc}","${keywords}"`;
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = "meta-data.csv";
  a.click();
});

// 👤 Login with Google
document.getElementById('login-btn').addEventListener('click', () => {
  import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js').then(({ signInWithPopup }) => {
    signInWithPopup(auth, provider);
  });
});

