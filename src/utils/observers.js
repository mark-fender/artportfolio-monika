function observeFadeInElements() {
  const fadeInElements = document.querySelectorAll(".fade-in");
  const fadeInOptions = {
    threshold: 0,
  };
  const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target);
      }
    });
  }, fadeInOptions);
  fadeInElements.forEach((element) => {
    appearOnScroll.observe(element);
  });
}

export { observeFadeInElements };
