      const menuToggle = document.querySelector(".menu-toggle");
      const menu = document.querySelector("#primary-menu");

      menuToggle.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      });

      menuToggle.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          menuToggle.click();
        }
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          menu.classList.remove("is-open");
          menuToggle.setAttribute("aria-expanded", "false");
          menuToggle.setAttribute("aria-label", "Open menu");
        }
      });

      document.addEventListener("click", (event) => {
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
          menu.classList.remove("is-open");
          menuToggle.setAttribute("aria-expanded", "false");
          menuToggle.setAttribute("aria-label", "Open menu");
        }
      });

      menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          menu.classList.remove("is-open");
          menuToggle.setAttribute("aria-expanded", "false");
          menuToggle.setAttribute("aria-label", "Open menu");
        });
      });
