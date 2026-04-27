(function () {
  function tagBadge(tag) {
    return '<span class="badge badge-secondary mr-1 mb-1">' + tag + '</span>';
  }

  function categoryCard(category) {
    var highlights = (category.highlights || []).map(function (item) {
      return '<li>' + item + '</li>';
    }).join('');

    var tags = (category.tags || []).map(tagBadge).join('');

    return [
      '<div class="col-lg-4 col-md-6 mb-4">',
      '  <div class="card h-100">',
      '    <div class="card-body">',
      '      <h4 class="card-title">' + category.name + '</h4>',
      '      <p class="card-text">' + category.description + '</p>',
      highlights ? '      <ul>' + highlights + '</ul>' : '',
      '      <div>' + tags + '</div>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function simpleList(items) {
    return items.map(function (item) {
      return '<li class="list-group-item">' + item + '</li>';
    }).join('');
  }

  function init(data) {
    var titleEl = document.getElementById('things-title');
    var summaryEl = document.getElementById('things-summary');
    var metaEl = document.getElementById('things-meta');
    var categoriesEl = document.getElementById('categories-grid');
    var destinationsEl = document.getElementById('featured-destinations');
    var holidaysEl = document.getElementById('holiday-types');
    var socialEl = document.getElementById('social-links');
    var supportEl = document.getElementById('support-links');

    titleEl.textContent = data.title;
    summaryEl.textContent = data.summary;
    metaEl.innerHTML = 'Source: <a href="' + data.source + '" target="_blank" rel="noopener noreferrer">newzealand.com</a> · Last updated: ' + data.last_updated;

    categoriesEl.innerHTML = data.categories.map(categoryCard).join('');

    destinationsEl.innerHTML = data.featured_destinations.map(function (destination) {
      return '<li class="list-group-item d-flex justify-content-between align-items-center"><span>' + destination.name + '</span><small class="text-muted">' + destination.context + '</small></li>';
    }).join('');

    holidaysEl.innerHTML = (data.holiday_types || []).map(function (type) {
      return '<span class="badge badge-dark mr-2 mb-2 p-2">' + type + '</span>';
    }).join('');

    socialEl.innerHTML = simpleList(data.navigation.social);
    supportEl.innerHTML = simpleList(data.navigation.support);
  }

  fetch('data/things-to-do.json')
    .then(function (response) { return response.json(); })
    .then(init)
    .catch(function () {
      var summaryEl = document.getElementById('things-summary');
      summaryEl.textContent = 'Unable to load the things-to-do guide right now. Please try again later.';
    });
})();
