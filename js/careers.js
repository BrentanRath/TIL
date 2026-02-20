(function () {
  const careersListEl = document.getElementById('careers-list');
  const jobDetailEl = document.getElementById('job-detail-box');
  const categoryBtns = document.querySelectorAll('.category-btn');

  if (!careersListEl || !jobDetailEl || typeof CAREERS_DATA === 'undefined') return;

  var currentCategory = 'work';

  function getFilteredJobs() {
    return CAREERS_DATA.filter(function (job) {
      return job.category === currentCategory;
    });
  }

  function renderCareers() {
    var jobs = getFilteredJobs();
    careersListEl.innerHTML = jobs.map(function (job) {
      return (
        '<li class="careers-item careers-item-clickable" data-job-id="' +
        job.id +
        '">' +
        '<span class="careers-role">' +
        job.role +
        '</span>' +
        '<span class="careers-company">— ' +
        job.company +
        '</span>' +
        '<span class="careers-date">' +
        job.date +
        '</span>' +
        '</li>'
      );
    }).join('');
  }

  function showJobDetail(jobId) {
    const job = CAREERS_DATA.find(function (j) {
      return j.id === jobId;
    });
    if (!job) return;

    jobDetailEl.innerHTML =
      '<div class="job-detail-header">' +
      '<span class="job-detail-title">' +
      job.role +
      ' at ' +
      job.company +
      '</span>' +
      '<button type="button" class="job-detail-close" aria-label="Close">×</button>' +
      '</div>' +
      '<p class="job-detail-description">' +
      job.description +
      '</p>';

    jobDetailEl.classList.add('visible');

    jobDetailEl.querySelector('.job-detail-close').addEventListener('click', hideJobDetail);

    document.querySelectorAll('.careers-item-clickable').forEach(function (el) {
      el.classList.toggle('active', el.dataset.jobId === jobId);
    });
  }

  function hideJobDetail() {
    jobDetailEl.classList.remove('visible');
    jobDetailEl.innerHTML = '';
    document.querySelectorAll('.careers-item-clickable').forEach(function (el) {
      el.classList.remove('active');
    });
  }

  function handleCareersClick(e) {
    const item = e.target.closest('.careers-item-clickable');
    if (!item) return;

    const jobId = item.dataset.jobId;
    showJobDetail(jobId);
  }

  function handleCategoryClick(e) {
    const btn = e.target.closest('.category-btn');
    if (!btn) return;

    currentCategory = btn.dataset.category;
    categoryBtns.forEach(function (b) {
      b.classList.toggle('active', b.dataset.category === currentCategory);
    });
    hideJobDetail();
    renderCareers();
  }

  categoryBtns.forEach(function (btn) {
    btn.addEventListener('click', handleCategoryClick);
  });
  careersListEl.addEventListener('click', handleCareersClick);
  renderCareers();
})();
