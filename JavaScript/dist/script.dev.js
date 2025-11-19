"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Get elements
  var sendBtn = document.getElementById("sendBtn"); //????

  var messageInput = document.getElementById("messageInput");
  var conversationMessages = document.getElementById("conversationMessages"); //in which tag ??

  var sendNoteBtn = document.getElementById("sendNoteBtn");
  var noteInput = document.getElementById("noteInput"); //????

  var notesMessages = document.getElementById("notesMessages"); //????

  var isConversation = true; ///////////////////

  var emojiBtn = document.getElementById("emojiBtn");
  var emojiPicker = document.getElementById("emojiPicker");
  var fontSizeBtn = document.getElementById("fontSizeBtn");
  var fontSizeDropdown = document.getElementById("fontSizeDropdown");
  var attachBtn = document.getElementById("attachBtn");
  var imageBtn = document.getElementById("imageBtn");
  var fileInput = document.getElementById("fileInput");
  var reminderDateInput = document.getElementById("reminderDate");
  var currentFontSize = 14;
  sendBtn.addEventListener("click", function () {
    var message = messageInput.value.trim();

    if (message) {
      addMessage(conversationMessages, message, "user");
      messageInput.value = "";
    }
  }); // Send message on Enter key

  messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendBtn.click();
    }
  }); // Send internal note
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

  emojiBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    emojiPicker.style.display = emojiPicker.style.display === "none" ? "flex" : "none";
    fontSizeDropdown.style.display = "none";
  }); // Add emoji to input

  document.querySelectorAll(".emoji-option").forEach(function (btn) {
    btn.addEventListener("click", function () {
      messageInput.value += this.textContent;
      emojiPicker.style.display = "none";
      messageInput.focus();
    });
  }); // Toggle font size dropdown

  fontSizeBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    fontSizeDropdown.style.display = fontSizeDropdown.style.display === "none" ? "flex" : "none";
    emojiPicker.style.display = "none";
  }); // Change font size

  document.querySelectorAll(".font-size-option").forEach(function (btn) {
    btn.addEventListener("click", function () {
      currentFontSize = Number.parseInt(this.dataset.size);
      messageInput.style.fontSize = currentFontSize + "px";
      fontSizeDropdown.style.display = "none";
    });
  }); // File attachment

  attachBtn.addEventListener("click", function () {
    fileInput.click();
  });
  imageBtn.addEventListener("click", function () {
    fileInput.click();
  });
  fileInput.addEventListener("change", function (e) {
    var file = e.target.files[0];

    if (file) {
      var fileName = file.name;
      messageInput.value = "\uD83D\uDCCE ".concat(fileName);
    }
  }); // Close dropdowns when clicking outside

  document.addEventListener("click", function () {
    emojiPicker.style.display = "none";
    fontSizeDropdown.style.display = "none";
  }); //////////////////////////////////////////////

  $(".nav-item").click(function () {
    var value = $(this).data("value");

    if (value == 0) {
      isConversation = true;
      conversationMessages = document.getElementById("conversationMessages");
    } else {
      isConversation = false;
      conversationMessages = document.getElementById("conversationMessages2");
    }
  }); /////////////////////////////////////////////

  function addMessage(container, text, type) {
    var messageWrapper = document.createElement("div");
    messageWrapper.className = "message-wrapper mb-4";
    var now = new Date();
    var persianDate = now.toLocaleDateString("fa-IR");
    var time = now.toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit"
    });
    var messageHTML = "";

    if (isConversation) {
      if (type === "user") {
        // User messages appear on the LEFT side
        messageHTML = "\n          <div class=\"message-3\">\n              <div class=\"image-and-message\">\n                  <!-- <img src=\"\" alt=\"\"> -->\n                  <i class=\"bi bi-headset\"></i>\n                  <span class=\"message\">".concat(text, "</span>\n              </div>\n              <p> \u0639\u0644\u06CC \u0645\u062D\u0645\u062F\u06CC- \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0641\u0646\u06CC<span class=\"date-and-time\"> ").concat(persianDate, " \u0633\u0627\u0639\u062A ").concat(time, "</span></p>\n          </div>\n            ");
      } else if (type === "support") {
        // Support messages appear on the RIGHT side
        messageHTML = "\n            <div class=\"message-3\">\n                <div class=\"image-and-message\">\n                    <!-- <img src=\"\" alt=\"\"> -->\n                    <i class=\"bi bi-headset\"></i>\n                    <span class=\"message\">".concat(text, "</span>\n                </div>\n                <p> \u0639\u0644\u06CC \u0645\u062D\u0645\u062F\u06CC- \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0641\u0646\u06CC<span class=\"date-and-time\">").concat(persianDate, " \u0633\u0627\u0639\u062A ").concat(time, "</span></p>\n            </div>\n            ");
      }
    } else {
      messageHTML = "\n              <div class=\"internal-notes\" id=\"notesMessages\">\n                  <div class=\"image-and-message\">\n                      <img src=\"../assets/images/user1.jpg\" alt=\"user image\">\n                      <span class=\"message\">".concat(text, "</span>\n                  </div>\n                  <p> \u067E\u0627\u0631\u0633\u0627 \u062D\u0633\u06CC\u0646\u06CC<span class=\"date-and-time\"> ").concat(persianDate, " \u0633\u0627\u0639\u062A ").concat(time, "</span></p>\n              </div>\n            ");
    }

    console.log(conversationMessages);
    messageWrapper.innerHTML = messageHTML;
    conversationMessages.appendChild(messageWrapper); // Scroll to bottom

    conversationMessages.parentElement.scrollTop = conversationMessages.parentElement.scrollHeight;
  }
});
flatpickr("#reminderDate", {
  locale: "fa",
  dateFormat: "Y-m-d"
}); // flatpickr("#reminderDate", {
//     locale: "fa",
//     enableTime: true,
//     time_24hr: true,
//     dateFormat: "Y-m-d H:i",
//     altInput: true,
//     altFormat: "Y/m/d - H:i",
// });
// Tab switching
// const tabs = document.querySelectorAll('.tabs');
// tabs.forEach(tab => {
//     tab.addEventListener('click', function() {
//         tabs.forEach(t => t.classList.remove('active'));
//         this.classList.add('active');
//     });
// });