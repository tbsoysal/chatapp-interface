const socket = io('ws://localhost:3500');
const input = document.querySelector("#message-box");
const form = document.querySelector("form");
const chatEl = document.querySelector("main");

function sendMessage(e) {
  e.preventDefault();
  if (input.value) {
    showSendingMessage(input.value);
    socket.emit("message", input.value);
    input.value = '';
    scrollToBottom();
  }
  input.focus();
}

form.addEventListener("submit", sendMessage);

socket.on("message", data => showIncomingMessage(data))

function showIncomingMessage(message) {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('incoming-message');
  messageContainer.innerHTML = 
    `
      <p>${message}</p>
      <span class="info">
        <span class="time">16:56</span>
      </span>`;
  chatEl.append(messageContainer);
  scrollToBottom();
}

function showSendingMessage(message) {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message');
  messageContainer.innerHTML = 
    `
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


input.addEventListener("keypress", () => {
  socket.emit('activity', socket.id.substring(0, 5));
})

