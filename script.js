
// Sample data for coaching centers
const coachingCenters = [
   

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
    


// Initialize the map with India coordinates
const map = L.map('map').setView([20.5937, 78.9629], 5); // India center and zoom level


// Add the OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);


// Function to add markers to the map
function addMarkers(examFilter) {
    coachingCenters.forEach(center => {
        if (examFilter === 'All' || center.exam === examFilter) {
            const marker = L.marker(center.location).addTo(map);
            marker.bindPopup(center.name + '<br>' + center.exam);
        }
    });
}


// Call the addMarkers function with default filter 'All' when the page loads
addMarkers('All');


// Add event listener for filter change
document.getElementById('examFilter').addEventListener('change', function() {
    const selectedExam = this.value;
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
    addMarkers(selectedExam);
});
