const chatPanel = document.querySelector("#chat-panel");
      const chatLauncher = document.querySelector(".chat-launcher");
      const chatClose = document.querySelector(".chat-close");
      const chatMessages = document.querySelector("#chat-messages");
      const chatForm = document.querySelector("#chat-form");
      const chatInput = document.querySelector("#chat-input");
      const chatChips = document.querySelectorAll(".chat-chip");

      const answerLibrary = [
        {
          keywords: ["hour", "open", "operation", "schedule", "availability"],
          answer: "Project hours and crew availability can vary by jobsite. For scheduling, dispatch, or urgent project needs, contact Firebitt directly at <a href=\"tel:8006782648\">800 678 2648</a> or <a href=\"mailto:INFO@Firebitt.com\">INFO@Firebitt.com</a>."
        },
        {
          keywords: ["contact", "phone", "email", "call", "number"],
          answer: "You can contact Firebitt at <a href=\"tel:8006782648\">800 678 2648</a> or email <a href=\"mailto:INFO@Firebitt.com\">INFO@Firebitt.com</a>.<br><br>Charlotte area location:<br>2425 Derita Rd.<br>Concord, NC 28027<br><br>Other location:<br>264 Marlowe Dr<br>Mills River, NC 28759"
        },
        {
          keywords: ["service", "do", "work", "offer", "hdd", "trenching", "drilling", "utility"],
          answer: "Firebitt LLC provides utility contracting, drilling, rock drilling, trenching, trenchless HDD, and underground construction support for communications, electrical, gas, sewer, water, irrigation, fuel supply lines, fiber, and telecommunications projects."
        },
        {
          keywords: ["area", "location", "charlotte", "concord", "mills", "river", "address", "where", "state", "serve"],
          answer: "Firebitt serves the Greater Charlotte Metro area and operates throughout the Southeastern United States, including North Carolina, South Carolina, Virginia, Georgia, and Louisiana.<br><br>Charlotte area location:<br>2425 Derita Rd.<br>Concord, NC 28027<br><br>Other location:<br>264 Marlowe Dr<br>Mills River, NC 28759"
        },
        {
          keywords: ["human", "person", "representative", "text", "sms", "real", "agent"],
          answer: "You can save Firebitt as a phone contact, then call or text the team from your contacts app.<br><br><a href=\"assets/firebitt-contact.vcf\">Save Firebitt Contact</a><br><br>You can also call the main office at <a href=\"tel:8006782648\">800 678 2648</a>."
        },
        {
          keywords: ["quote", "estimate", "price", "cost", "bid", "project"],
          answer: "For project pricing or a quote, please share your project location, service type, timeline, and site details with Firebitt at <a href=\"mailto:INFO@Firebitt.com\">INFO@Firebitt.com</a> or call <a href=\"tel:8006782648\">800 678 2648</a>."
        }
      ];

      const addChatMessage = (message, type = "bot") => {
        const bubble = document.createElement("div");
        bubble.className = `chat-message ${type}`;
        bubble.innerHTML = message;
        chatMessages.appendChild(bubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      };

      const getChatAnswer = (question) => {
        const normalized = question.toLowerCase();
        const match = answerLibrary.find((entry) =>
          entry.keywords.some((keyword) => normalized.includes(keyword))
        );

        if (match) {
          return match.answer;
        }

        return "I can help with Firebitt services, contact information, service areas, hours, and project quote next steps. For a human response, ask to chat with a human and I will provide text options.";
      };

      const askChatQuestion = (question) => {
        const cleanQuestion = question.trim();
        if (!cleanQuestion) {
          return;
        }

        addChatMessage(cleanQuestion, "user");
        window.setTimeout(() => {
          addChatMessage(getChatAnswer(cleanQuestion), "bot");
        }, 240);
      };

      const openChat = () => {
        chatPanel.classList.add("is-open");
        chatLauncher.setAttribute("aria-expanded", "true");
        if (!chatMessages.children.length) {
          addChatMessage("Hi, I’m the Firebitt chatbot. Ask about services, contact info, locations, hours, or request a human by text.", "bot");
        }
        chatInput.focus();
      };

      const closeChat = () => {
        chatPanel.classList.remove("is-open");
        chatLauncher.setAttribute("aria-expanded", "false");
      };

      chatLauncher.addEventListener("click", () => {
        if (chatPanel.classList.contains("is-open")) {
          closeChat();
        } else {
          openChat();
        }
      });

      chatClose.addEventListener("click", closeChat);

      chatForm.addEventListener("submit", (event) => {
        event.preventDefault();
        askChatQuestion(chatInput.value);
        chatInput.value = "";
      });

      chatChips.forEach((chip) => {
        chip.addEventListener("click", () => {
          openChat();
          askChatQuestion(chip.dataset.question);
        });
      });
