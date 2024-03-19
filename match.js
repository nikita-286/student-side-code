document.addEventListener('DOMContentLoaded', function() {
    const mapButton = document.getElementById('mapButton');
    const examFilter = document.getElementById('examFilter');
    const locationFilter = document.getElementById('locationFilter');
    const ratingFilter = document.getElementById('ratingFilter');

    // Sample data for institutes
    const institutes = [
        { name: 'Center 1', exam: 'JEE', location: 'Mumbai', rating: 4 },
        { name: 'Center 3', exam: 'JEE', location: 'Delhi', rating: 5 },
        { name: 'Center 5', exam: 'CET', location: 'Bangalore', rating: 5 },
        { name: 'Center 7', exam: 'CET', location: 'Chennai', rating: 3 },
        { name: 'Center 9', exam: 'UPSC', location: 'Jaipur', rating: 5 },
        { name: 'Center 11', exam: 'UPSC', location: 'Lucknow', rating: 3 },
        { name: 'Center 13', exam: 'NEET', location: 'Chandigarh', rating: 4 },
        { name: 'Center 15', exam: 'NEET', location: 'Ahmedabad', rating: 5 },
        { name: 'Center 17', exam: 'GATE', location: 'Pune', rating: 3 },
        { name: 'Center 19', exam: 'GATE', location: 'Nagpur', rating: 5 },
        { name: 'Center 21', exam: 'JEE', location: 'Kolkata', rating: 5 },
        { name: 'Center 23', exam: 'JEE', location: 'Hyderabad', rating: 3 },
        { name: 'Center 25', exam: 'CET', location: 'Indore', rating: 5 }
        // Add more centers and variations as needed
    ];

    // Function to remove duplicate locations from the list of institutes
    function removeDuplicateLocations(institutes) {
        const uniqueLocations = new Set();
        const uniqueInstitutes = [];

        institutes.forEach(institute => {
            const location = institute.location.toLowerCase();
            if (!uniqueLocations.has(location)) {
                uniqueLocations.add(location);
                uniqueInstitutes.push(institute);
            }
        });

        return uniqueInstitutes;
    }

    // Get unique institutes without duplicate locations
    const uniqueInstitutes = removeDuplicateLocations(institutes);

    // Clear existing options in the location dropdown
    locationFilter.innerHTML = '';

    // Populate dropdown with unique locations
    uniqueInstitutes.forEach(institute => {
        const option = document.createElement('option');
        option.value = institute.location;
        option.textContent = institute.location;
        locationFilter.appendChild(option);
    });

    mapButton.addEventListener('click', function() {
        const selectedExam = examFilter.value;
        const selectedLocation = locationFilter.value;

        const filteredResults = filterInstitutes(selectedExam, selectedLocation);
        if (filteredResults.length === 0) {
            alert('The selected coaching center does not exist.');
        } else {
            openMapPage(filteredResults);
        }
    });

    // Function to filter institutes based on user preferences
    function filterInstitutes(selectedExam, selectedLocation) {
        return uniqueInstitutes.filter(institute => {
            const examMatch = selectedExam === 'All' || institute.exam === selectedExam;
            const locationMatch = selectedLocation === 'All' || institute.location === selectedLocation;

            return examMatch && locationMatch;
        });
    }

    // Function to open the map page with filtered results
    function openMapPage(filteredResults) {
        const queryString = `exam=${encodeURIComponent(examFilter.value)}&location=${encodeURIComponent(locationFilter.value)}&rating=${encodeURIComponent(ratingFilter.value)}`;
        window.open(`/index.html?${queryString}`, '_blank');
    }
});
