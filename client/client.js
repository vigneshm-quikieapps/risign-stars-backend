// NOTIFICATION FOR WEBSITES

// Register ServiceWorker, Register Push, Send Push
async function send() {
  // Register Service Worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/", // we can define the Different URL where this worker gonna apply
  });
  console.log("Service Worker Registered...");

  // Register Push
  console.log("Registering Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      "BL6b9CDwCqhn7phJX8qVq_QFYVkv7UTQVb4N4-mcbInTMWqeCg0tr-HFsEueGCxwO4J6Vy4YqFwIvKHPAmhxQNE"
    ), // public Key
  });
  console.log("Push Registered...", subscription);

  // Send Push Notification
  console.log("Sending Push...");

  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
    },
  });
  console.log("Push Sent...");
}

// Check for service worker
if ("serviceWorker" in navigator) {
  send().catch((err) => console.log(err));
}
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
