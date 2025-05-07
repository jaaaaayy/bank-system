const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const navbarHeight = document.querySelector("header")?.offsetHeight || 0;

    const elementPosition = element.offsetTop - navbarHeight;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
};

export default scrollToSection;
