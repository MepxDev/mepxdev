document.addEventListener('DOMContentLoaded', function() {
    // View option toggle
    const viewOptions = document.querySelectorAll('.view-option');
    viewOptions.forEach(option => {
        option.addEventListener('click', function() {
            viewOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Here you would implement the actual view change logic
            const viewType = this.dataset.view;
            console.log(`Switching to ${viewType} view`);
        });
    });

    // Bookmark toggle
    const bookmarkButtons = document.querySelectorAll('.session-bookmark');
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = '#0066cc';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = '#999';
            }
        });
    });

    // Filter functionality
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            // Here you would implement the actual filtering logic
            console.log(`Filter changed: ${this.id} = ${this.value}`);
            
            // For demo purposes, we'll just log the current filter values
            const filters = {
                day: document.getElementById('day-filter').value,
                view: document.getElementById('view-filter').value,
                stage: document.getElementById('stage-filter').value,
                track: document.getElementById('track-filter').value
            };
            console.log('Current filters:', filters);
        });
    });

    // Search functionality
    const searchBox = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    function performSearch() {
        const query = searchBox.value.trim();
        if (query) {
            console.log(`Searching for: ${query}`);
            // Here you would implement the actual search functionality
        }
    }
    
    searchButton.addEventListener('click', performSearch);
    searchBox.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});
