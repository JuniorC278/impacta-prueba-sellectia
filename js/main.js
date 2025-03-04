// Script para scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
      });
  });
});

// Swiper
const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressCircle.style.setProperty("--progress", 1 - progress);
      progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    },
  },
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".mobile-toggle");
  const menu = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
      menu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });
});

document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    resetErrorMessages();

    let nombre = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let telefono = document.getElementById("phone").value.trim();
    let planeta = document.getElementById("planet").value.trim();
    let privacidadCheckbox = document.getElementById("privacy");

    let isValid = true;

    if (!nombre) {
      isValid = false;
      mostrarError("name", "El nombre es obligatorio.");
    } else if (nombre.length > 255) {
      isValid = false;
      mostrarError("name", "El nombre no puede superar los 255 caracteres.");
    } else if (!/^[a-zA-Z\s]+$/.test(nombre)) {
      isValid = false;
      mostrarError(
        "name",
        "El nombre solo puede contener letras y espacios."
      );
    }

    if (!email) {
      isValid = false;
      mostrarError("email", "El email es obligatorio.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      isValid = false;
      mostrarError("email", "El email no tiene un formato válido.");
    }

    if (telefono) {
      const telefonoRegex = /^[0-9+()\s-]*$/;
      if (!telefonoRegex.test(telefono)) {
        isValid = false;
        mostrarError(
          "phone",
          "Número de teléfono inválido"
        );
      }
    }

    const planetasValidos = [
      "mercurio",
      "venus",
      "tierra",
      "marte",
      "jupiter",
      "saturno",
      "urano",
      "neptuno",
      "plutón",
    ];

    if (!planeta) {
      isValid = false;
      mostrarError("planet", "El planeta de nacimiento es obligatorio.");
    } else if (!planetasValidos.includes(planeta.toLowerCase())) {
      isValid = false;
      mostrarError(
        "planet",
        "Introduce un planeta válido de nuestro sistema solar."
      );
    }

    if (!privacidadCheckbox.checked) {
      isValid = false;
      mostrarError("privacy", "Debes aceptar la política de privacidad.");
    }

    if (isValid) {
      setTimeout(function () {
        Swal.fire({
          icon: "success",
          title: "¡Mensaje Enviado!",
          confirmButtonColor: "#FFD700",
        }).then((result) => {
          if (result.isConfirmed) {
            document.getElementById("contactForm").reset();
          }
        });
      }, 500);
    }
});

function mostrarError(campoId, mensaje) {
  let campo = document.getElementById(campoId);
  let mensajeError = document.createElement("div");
  mensajeError.className = "mensaje-error";
  mensajeError.textContent = mensaje;

  campo.parentNode.insertBefore(mensajeError, campo.nextSibling);
  campo.classList.add("error-input");
}

function resetErrorMessages() {
  let errorMessages = document.querySelectorAll(".mensaje-error");
  errorMessages.forEach((message) => message.remove());

  let errorInputs = document.querySelectorAll(".error-input");
  errorInputs.forEach((input) => input.classList.remove("error-input"));
}

const nombreInput = document.getElementById("name");

nombreInput.addEventListener("input", function (event) {
  let valorInput = event.target.value;
  let valorValidado = "";

  for (let i = 0; i < valorInput.length; i++) {
    let caracter = valorInput[i];
    if (/[a-zA-Z\s]/.test(caracter)) {
      valorValidado += caracter;
    }
  }
  event.target.value = valorValidado;
});

function mostrarError(campoId, mensaje) {
  let campo = document.getElementById(campoId);
  let errorSpan = document.createElement("span");
  errorSpan.className = "error-message";
  errorSpan.textContent = mensaje;
  campo.parentNode.insertBefore(errorSpan, campo.nextSibling);
  campo.classList.add("input-error");
}

function resetErrorMessages() {
  let errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((message) => message.remove());
  let errorInputs = document.querySelectorAll(".input-error");
  errorInputs.forEach((input) => input.classList.remove("input-error"));
}

// AOS
const AOS = window.AOS;
AOS.init();
const Swal = window.Swal;