document.addEventListener('DOMContentLoaded', function() {
    const toggleDetailsButton = document.getElementById('toggleDetailsButton');
    const detailsBox = document.getElementById('detailsBox');
    const examSelect = document.getElementById('examSelect');
    const progressReport = document.getElementById('progressReport');

    toggleDetailsButton.addEventListener('click', function() {
        detailsBox.style.display = detailsBox.style.display === 'none' ? 'block' : 'none';
    });

    const examSubjects = {
        jee: ['Physics', 'Chemistry', 'Mathematics'],
        cet: ['Physics', 'Chemistry', 'Biology'],
        gate: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering'],
        neet: ['Physics', 'Chemistry', 'Biology'],
        upsc: ['History', 'Geography', 'Economics', 'Political Science']
    };

    function showProgressReport() {
        const selectedExam = examSelect.value;

        // Clear previous progress report content
        progressReport.innerHTML = '';

        // Check if selected exam data exists
        if (examSubjects[selectedExam]) {
            const subjects = examSubjects[selectedExam];
            const examTitle = document.createElement('h2');
            examTitle.textContent = `Progress Report - ${selectedExam.toUpperCase()}`;
            progressReport.appendChild(examTitle);

            // Create progress report table
            const reportTable = document.createElement('table');
            reportTable.classList.add('progress-table');

            // Create table header
            const tableHeader = document.createElement('tr');
            const thSubject = document.createElement('th');
            thSubject.textContent = 'Subject Name';
            const thMarks = document.createElement('th');
            thMarks.textContent = 'Marks';
            tableHeader.appendChild(thSubject);
            tableHeader.appendChild(thMarks);
            reportTable.appendChild(tableHeader);

            // Populate table with exam subjects and marks
            subjects.forEach(subject => {
                const tableRow = document.createElement('tr');
                const tdSubject = document.createElement('td');
                tdSubject.textContent = subject;
                const tdMarks = document.createElement('td');
                tdMarks.textContent = '100'; // Set default marks or retrieve from data source
                tableRow.appendChild(tdSubject);
                tableRow.appendChild(tdMarks);
                reportTable.appendChild(tableRow);
            });

            progressReport.appendChild(reportTable);
        } else {
            const noDataMessage = document.createElement('p');
            noDataMessage.textContent = 'No data available for the selected exam.';
            progressReport.appendChild(noDataMessage);
        }
    }

    // Initialize progress report on page load
    showProgressReport();

    // Call showProgressReport whenever the exam selection changes
    examSelect.addEventListener('change', showProgressReport);
});
