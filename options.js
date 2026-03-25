
const triggerInput = document.getElementById("trigger");
const targetInput = document.getElementById("target");
const addBtn = document.getElementById("add");
const list = document.getElementById("list");
const exportBtn = document.getElementById("export");
const importBtn = document.getElementById("import");
const fileInput = document.getElementById("fileInput");
const themeBtn = document.getElementById("toggleTheme");

function refreshList() {
  list.innerHTML = "";
  chrome.storage.local.get("redirects", (data) => {
    const redirects = data.redirects || {};
    Object.entries(redirects).forEach(([key, val]) => {
      const li = document.createElement("li");

      const triggerBox = document.createElement("input");
      triggerBox.value = key;
      triggerBox.className = "trigger-box";

      const targetBox = document.createElement("input");
      targetBox.value = val;
      targetBox.className = "target-box";

      const arrow = document.createElement("span");
      arrow.className = "arrow";
      arrow.textContent = "→";

      const delBtn = document.createElement("button");
      delBtn.className = "del-btn";
      delBtn.textContent = "✕";

      triggerBox.onchange = targetBox.onchange = () => {
        const newTrigger = triggerBox.value.trim();
        const newTarget = targetBox.value.trim();
        if (!newTrigger || !newTarget) return;
        chrome.storage.local.get("redirects", (data) => {
          const redirects = data.redirects || {};
          delete redirects[key];
          redirects[newTrigger] = newTarget;
          chrome.storage.local.set({ redirects }, refreshList);
        });
      };

      delBtn.onclick = () => {
        chrome.storage.local.get("redirects", (data) => {
          const redirects = data.redirects || {};
          delete redirects[key];
          chrome.storage.local.set({ redirects }, refreshList);
        });
      };

      li.appendChild(triggerBox);
      li.appendChild(arrow);
      li.appendChild(targetBox);
      li.appendChild(delBtn);
      list.appendChild(li);
    });
  });
}

function addRedirect() {
  const trigger = triggerInput.value.trim();
  const target = targetInput.value.trim();
  if (trigger && target) {
    chrome.storage.local.get("redirects", (data) => {
      const redirects = data.redirects || {};
      redirects[trigger] = target;
      chrome.storage.local.set({ redirects }, refreshList);
    });
    triggerInput.value = "";
    targetInput.value = "";
  }
}

addBtn.onclick = addRedirect;

[triggerInput, targetInput].forEach(i => {
  i.addEventListener("keydown", e => {
    if (e.key === "Enter") addRedirect();
  });
});

exportBtn.onclick = () => {
  chrome.storage.local.get("redirects", (data) => {
    const blob = new Blob([JSON.stringify(data.redirects, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "redirects_backup.json";
    a.click();
    URL.revokeObjectURL(url);
  });
};

importBtn.onclick = () => fileInput.click();

fileInput.onchange = () => {
  const file = fileInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      chrome.storage.local.set({ redirects: imported }, refreshList);
    } catch (e) {
      alert("Invalid JSON file.");
    }
  };
  reader.readAsText(file);
};

themeBtn.onclick = () => {
  const body = document.body;
  body.classList.toggle("dark");
  body.classList.toggle("light");
};

refreshList();
