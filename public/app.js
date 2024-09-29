const socket = io();

const input = document.querySelector("#message-box");
const form = document.querySelector("form");
const chatEl = document.querySelector("main");
const headEl = document.querySelector("h1");

const username = prompt("enter a username");
if (username) {
  socket.emit('set_username', username);
}

socket.on('message', message => {
  showIncomingMessage(message);
})

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const messageText = input.value;
  input.value = "";
  if (messageText) {
    showSendingMessage(messageText);
    socket.emit("message", messageText);
  }
  input.focus();
});

function showIncomingMessage(message) {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("incoming-message");
  messageContainer.innerHTML = `
      <p>${message}</p>
      <span class="info">
        <span class="time">16:56</span>
      </span>`;
  chatEl.append(messageContainer);
  scrollToBottom();
}

function showSendingMessage(message) {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message");
  messageContainer.innerHTML = `
      <p>${message}</p>
      <span class="info">
        <span class="time">16:56</span>
        <img src="./Vector.svg" alt="seen">
      </span>`;
  chatEl.append(messageContainer);
}

function scrollToBottom() {
  chatEl.scrollTop = chatEl.scrollHeight;
}
