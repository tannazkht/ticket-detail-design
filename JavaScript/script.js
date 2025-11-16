document.addEventListener("DOMContentLoaded", () => {
  // Get elements
  const sendBtn = document.getElementById("sendBtn") //????
  const messageInput = document.getElementById("messageInput")
  var conversationMessages = document.getElementById("conversationMessages");  //in which tag ??

  const sendNoteBtn = document.getElementById("sendNoteBtn")
  const noteInput = document.getElementById("noteInput") //????
  const notesMessages = document.getElementById("notesMessages") //????


  var isConversation = true;








///////////////////


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
  // sendNoteBtn.addEventListener("click", () => {
  //   const note = noteInput.value.trim()
  //   if (note) {
  //     addMessage(notesMessages, note, "note")
  //     noteInput.value = ""
  //   }
  // })

  // // Send note on Enter key
  // noteInput.addEventListener("keypress", (e) => {
  //   if (e.key === "Enter") {
  //     sendNoteBtn.click()
  //   }
  // })

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


    $(".nav-item").click(function(){
  var value = $(this).data("value")
  if(value == 0){
    isConversation = true
    conversationMessages = document.getElementById("conversationMessages")
  }else{
    isConversation = false
      conversationMessages = document.getElementById("conversationMessages2")

  }
  })


  function addMessage(container, text, type) {
    



    const messageWrapper = document.createElement("div")
    messageWrapper.className = "message-wrapper mb-4"
    const now = new Date()
    const persianDate = now.toLocaleDateString("fa-IR")
    const time = now.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })

    let messageHTML = ""


    if(isConversation){
            if (type === "user") {
      // User messages appear on the LEFT side
      messageHTML = `
          <div class="message-3">
              <div class="image-and-message">
                  <!-- <img src="" alt=""> -->
                  <i class="bi bi-headset"></i>
                  <span class="message">${text}</span>
              </div>
              <p> علی محمدی- پشتیبانی فنی<span class="date-and-time"> ${persianDate} ساعت ${time}</span></p>
          </div>
            `
    } else if (type === "support") {
      // Support messages appear on the RIGHT side
      messageHTML = `
            <div class="message-3">
                <div class="image-and-message">
                    <!-- <img src="" alt=""> -->
                    <i class="bi bi-headset"></i>
                    <span class="message">${text}</span>
                </div>
                <p> علی محمدی- پشتیبانی فنی<span class="date-and-time">${persianDate} ساعت ${time}</span></p>
            </div>
            `
    }
    }else{
            messageHTML = `
              <div class="internal-notes" id="notesMessages">
                  <div class="image-and-message">
                      <img src="../assets/images/user1.jpg" alt="user image">
                      <span class="message">${text}</span>
                  </div>
                  <p> پارسا حسینی<span class="date-and-time"> ${persianDate} ساعت ${time}</span></p>
              </div>
            `
    }


console.log(conversationMessages)

    messageWrapper.innerHTML = messageHTML
    conversationMessages.appendChild(messageWrapper)

    // Scroll to bottom
    conversationMessages.parentElement.scrollTop = conversationMessages.parentElement.scrollHeight
  }
})



flatpickr("#reminderDate", {
  locale: "fa",
  dateFormat: "Y-m-d"
});



// Tab switching
// const tabs = document.querySelectorAll('.tabs');
// tabs.forEach(tab => {
//     tab.addEventListener('click', function() {
//         tabs.forEach(t => t.classList.remove('active'));
//         this.classList.add('active');
//     });
// });