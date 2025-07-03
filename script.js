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

  downloadBtn.addEventListener('click', () => {
    if (!readyToDownload || downloadBtn.classList.contains('disabled')) return;

    // Step 1: Show spinner
    downloadBtn.setAttribute('disabled', true);
    downloadSpinner.style.display = 'inline-block';

    // Step 2: Hide modal after short delay
    setTimeout(() => {
      const modalInstance = bootstrap.Modal.getInstance(licenseModal);
      if (modalInstance) modalInstance.hide();

      // Step 3: Start download after delay
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = './Capsule_Installer.zip';
        link.download = 'Capsule_Installer.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Step 4: Cleanup
        downloadSpinner.style.display = 'none';
        downloadBtn.setAttribute('disabled', true);
        downloadBtn.classList.add('disabled');
        licenseCheck.checked = false;
        readyToDownload = false;
      }, 1200); // 1.2s after modal hides

    }, 800); // 0.8s delay before hiding modal
  });

  // Form submission
  document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Message sent successfully! We will get back to you soon.');
    this.reset();
  });