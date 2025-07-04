 // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // License and download
const licenseCheck = document.getElementById('licenseCheck');
const downloadBtn = document.getElementById('downloadBtn');
const downloadSpinner = document.getElementById('downloadSpinner');
const licenseModal = document.getElementById('licenseModal');

let readyToDownload = false;

licenseCheck.addEventListener('change', () => {
  readyToDownload = licenseCheck.checked;
  if (readyToDownload) {
    downloadBtn.classList.remove('disabled');
    downloadBtn.removeAttribute('disabled');
  } else {
    downloadBtn.classList.add('disabled');
    downloadBtn.setAttribute('disabled', true);
  }
});

downloadBtn.addEventListener('click', (e) => {
  if (!readyToDownload || downloadBtn.classList.contains('disabled')) return;

  // Step 1: Show spinner and disable button
  downloadBtn.setAttribute('disabled', true);
  downloadSpinner.style.display = 'inline-block';

  // Step 2: Hide modal after short delay
  setTimeout(() => {
    const modalInstance = bootstrap.Modal.getInstance(licenseModal);
    if (modalInstance) modalInstance.hide();

    // Step 3: Start download and handle spinner
    const link = document.createElement('a');
    link.href = './Capsule_Installer.zip';
    link.download = 'Capsule_Installer.zip';
    link.addEventListener('click', () => {
      // Step 4: Stop spinner only after download starts
      setTimeout(() => {
        downloadSpinner.style.display = 'none';
        downloadBtn.setAttribute('disabled', true);
        downloadBtn.classList.add('disabled');
        licenseCheck.checked = false;
        readyToDownload = false;
      }, 500); // Brief delay to ensure download initiation
    });
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, 800); // 0.8s delay before hiding modal
});

// Form submission
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Message sent successfully! We will get back to you soon.');
  this.reset();
});

  // Word rotation effect HERO
     const wrapper = document.querySelector(".words");
  const words = wrapper.querySelectorAll("span");
  const CURRENT_CLASS = "current";
  const NEXT_CLASS = "next";

  const wordsWidths = Array.from(words).map(word => word.offsetWidth);
  const maxWordsWidth = Math.max(...wordsWidths);

  wrapper.style.setProperty("--width", `${words[0].offsetWidth}px`);
  wrapper.style.setProperty("--width-mobile", `${maxWordsWidth}px`);
  wrapper.style.setProperty("--color", words[0].dataset.color);
  wrapper.style.setProperty("--color-bg", words[0].dataset.bgColor);

  setInterval(() => {
    const current = wrapper.querySelector(`.${CURRENT_CLASS}`);
    const next = wrapper.querySelector(`.${NEXT_CLASS}`);
    const upcoming = next.nextElementSibling || wrapper.firstElementChild;

    current.classList.remove(CURRENT_CLASS);
    next.classList.remove(NEXT_CLASS);
    next.classList.add(CURRENT_CLASS);
    upcoming.classList.add(NEXT_CLASS);

    wrapper.style.setProperty("--color", next.dataset.color);
    wrapper.style.setProperty("--color-bg", next.dataset.bgColor);
    wrapper.style.setProperty("--width", `${next.offsetWidth}px`);
  }, 1800);

