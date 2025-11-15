document.addEventListener("DOMContentLoaded", () => {
  // Get elements
  const sendBtn = document.getElementById("sendBtn")
  const messageInput = document.getElementById("messageInput")
  const conversationMessages = document.getElementById("conversationMessages")

  const sendNoteBtn = document.getElementById("sendNoteBtn")
  const noteInput = document.getElementById("noteInput")
  const notesMessages = document.getElementById("notesMessages")

  const emojiBtn = document.getElementById("emojiBtn")
  const emojiPicker = document.getElementById("emojiPicker")

  const fontSizeBtn = document.getElementById("fontSizeBtn")
  const fontSizeDropdown = document.getElementById("fontSizeDropdown")

  const attachBtn = document.getElementById("attachBtn")
  const imageBtn = document.getElementById("imageBtn")
  const fileInput = document.getElementById("fileInput")

  const reminderDateInput = document.getElementById("reminderDate")

  let currentFontSize = 14

  sendBtn.addEventListener("click", () => {
    const message = messageInput.value.trim()
    if (message) {
      addMessage(conversationMessages, message, "user")
      messageInput.value = ""
    }
  })

  // Send message on Enter key
  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendBtn.click()
    }
  })

  // Send internal note
  sendNoteBtn.addEventListener("click", () => {
    const note = noteInput.value.trim()
    if (note) {
      addMessage(notesMessages, note, "note")
      noteInput.value = ""
    }
  })

  // Send note on Enter key
  noteInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendNoteBtn.click()
    }
  })

  // Toggle emoji picker
  emojiBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    emojiPicker.style.display = emojiPicker.style.display === "none" ? "flex" : "none"
    fontSizeDropdown.style.display = "none"
  })

  // Add emoji to input
  document.querySelectorAll(".emoji-option").forEach((btn) => {
    btn.addEventListener("click", function () {
      messageInput.value += this.textContent
      emojiPicker.style.display = "none"
      messageInput.focus()
    })
  })

  // Toggle font size dropdown
  fontSizeBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    fontSizeDropdown.style.display = fontSizeDropdown.style.display === "none" ? "flex" : "none"
    emojiPicker.style.display = "none"
  })

  // Change font size
  document.querySelectorAll(".font-size-option").forEach((btn) => {
    btn.addEventListener("click", function () {
      currentFontSize = Number.parseInt(this.dataset.size)
      messageInput.style.fontSize = currentFontSize + "px"
      fontSizeDropdown.style.display = "none"
    })
  })

  // File attachment
  attachBtn.addEventListener("click", () => {
    fileInput.click()
  })

  imageBtn.addEventListener("click", () => {
    fileInput.click()
  })

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0]
    if (file) {
      const fileName = file.name
      messageInput.value = `📎 ${fileName}`
    }
  })

  // Close dropdowns when clicking outside
  document.addEventListener("click", () => {
    emojiPicker.style.display = "none"
    fontSizeDropdown.style.display = "none"
  })

  function addMessage(container, text, type) {
    const messageWrapper = document.createElement("div")
    messageWrapper.className = "message-wrapper mb-4"

    const now = new Date()
    const persianDate = now.toLocaleDateString("fa-IR")
    const time = now.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })

    let messageHTML = ""

    if (type === "user") {
      // User messages appear on the LEFT side
      messageHTML = `
                <div class="d-flex gap-3 align-items-start">
                    <img src="/placeholder.svg?height=40&width=40" class="message-avatar rounded-circle" alt="User">
                    <div class="flex-grow-1">
                        <div class="user-info-message" style="font-size: ${currentFontSize}px;">
                            ${text}
                        </div>
                        <div class="message-meta">
                            کاربر - ${persianDate} ساعت ${time}
                        </div>
                    </div>
                </div>
            `
    } else if (type === "support") {
      // Support messages appear on the RIGHT side
      messageHTML = `
                <div class="d-flex gap-3 align-items-start justify-content-end">
                    <div class="message-icon">
                        <img src="/placeholder.svg?height=24&width=24" alt="Support">
                    </div>
                    <div class="flex-grow-1 d-flex flex-column align-items-end">
                        <div class="message-bubble user-message" style="font-size: ${currentFontSize}px;">
                            ${text}
                        </div>
                        <div class="message-meta text-end">
                            پشتیبان - ${persianDate} ساعت ${time}
                        </div>
                    </div>
                    <img src="/placeholder.svg?height=40&width=40" class="message-avatar rounded-circle" alt="Support">
                </div>
            `
    } else if (type === "note") {
      // Internal notes appear on the LEFT side
      messageHTML = `
                <div class="d-flex gap-3 align-items-start">
                    <img src="/placeholder.svg?height=40&width=40" class="message-avatar rounded-circle" alt="Admin">
                    <div class="flex-grow-1">
                        <div class="message-bubble internal-note" style="font-size: ${currentFontSize}px;">
                            ${text}
                        </div>
                        <div class="message-meta">
                            یادداشت داخلی - ${persianDate} ساعت ${time}
                        </div>
                    </div>
                </div>
            `
    }

    messageWrapper.innerHTML = messageHTML
    container.appendChild(messageWrapper)

    // Scroll to bottom
    container.parentElement.scrollTop = container.parentElement.scrollHeight
  }

  const flatpickr = window.flatpickr // Declare the flatpickr variable
  if (reminderDateInput && typeof flatpickr !== "undefined") {
    flatpickr(reminderDateInput, {
      locale: "fa",
      altInput: true,
      altFormat: "Y/m/d",
      dateFormat: "Y-m-d",
      disableMobile: true,
    })
  }
})
