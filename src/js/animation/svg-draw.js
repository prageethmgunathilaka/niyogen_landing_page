const svgDraw = () => {
  // Check if GSAP and required plugins are available
  if (typeof gsap === 'undefined') {
    console.error('GSAP is not loaded.');
    return;
  }

  if (typeof ScrollTrigger === 'undefined') {
    console.error('ScrollTrigger plugin is not loaded.');
    return;
  }

  if (typeof DrawSVGPlugin === 'undefined') {
    console.error('DrawSVGPlugin is not loaded.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

  const selectors = ['#svg-one', '#svg-two', '#svg-three'];
  
  // Filter selectors to only include elements that exist in the DOM
  const existingSelectors = selectors.filter(selector => {
    const element = document.querySelector(selector);
    return element !== null;
  });

  if (existingSelectors.length === 0) {
    // No SVG elements found, skip animation
    return;
  }

  gsap.set(existingSelectors.join(', '), { visibility: 'visible' });

  existingSelectors.forEach((selector) => {
    const element = document.querySelector(selector);
    if (element) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: selector,
          start: 'top 80%',
        },
      });

      tl.from(selector, {
        duration: 1,
        drawSVG: 1,
        delay: 0.5,
        ease: 'power2.out',
      });
    }
  });
};

if (typeof window !== 'undefined') {
  svgDraw();
}
