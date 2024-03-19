document.addEventListener('DOMContentLoaded', function() {
    const examSelector = document.getElementById('exam');
    const subjectList = document.getElementById('subjectList');
    const generateTimetableBtn = document.getElementById('generateTimetableBtn');
    const timetableResults = document.getElementById('timetableResults');
    const startTimeInput = document.getElementById('startTime');
    const endTimeInput = document.getElementById('endTime');

    const examSubjects = {
        'CET': ['Mathematics', 'Physics', 'Chemistry'],
        'JEE': ['Mathematics', 'Physics', 'Chemistry'],
        'GATE': ['Engineering Maths', 'General Aptitude', 'Technical Subject'],
        'UPSC': ['GS Paper 1', 'GS Paper 2', 'Optional Subject'],
        'NEET': ['Biology', 'Physics', 'Chemistry']
    };

    function generateTimetable() {
        const selectedExam = examSelector.value;
        const subjects = examSubjects[selectedExam];
        const startTime = startTimeInput.value;
        const endTime = endTimeInput.value;

        if (!startTime || !endTime) {
            alert('Please enter start and end times.');
            return;
        }

        // Clear previous timetable
        timetableResults.innerHTML = '';

        // Generate the timetable HTML
        let timetableHTML = `<h3>Generated Study Timetable (${startTime} - ${endTime}):</h3><table><tr><th>Time Slot</th>`;

        subjects.forEach(subject => {
            timetableHTML += `<th>${subject}</th>`;
        });

        timetableHTML += '</tr>';

        const timeSlots = generateTimeSlots(startTime, endTime);
        const subjectHours = getSubjectHours(subjects);

        timeSlots.forEach(slot => {
            timetableHTML += `<tr><td>${slot}</td>`;

            subjects.forEach((subject, index) => {
                const hours = subjectHours[subject];
                const isStudyHour = hours && index < parseInt(hours, 10);
                timetableHTML += `<td>${isStudyHour ? '✔️' : ''}</td>`;
            });

            timetableHTML += '</tr>';
        });

        timetableHTML += '</table>';

        timetableResults.innerHTML = timetableHTML;
    }

    function generateTimeSlots(start, end) {
        const timeSlots = [];
        let currentTime = start;

        while (currentTime < end) {
            const nextTime = incrementTime(currentTime);
            timeSlots.push(`${currentTime} - ${nextTime}`);
            currentTime = nextTime;
        }

        return timeSlots;
    }

    function incrementTime(time) {
        const [hours, minutes] = time.split(':').map(Number);
        let nextHours = hours;
        let nextMinutes = minutes + 60;

        if (nextMinutes >= 60) {
            nextHours += 1;
            nextMinutes -= 60;
        }

        return `${String(nextHours).padStart(2, '0')}:${String(nextMinutes).padStart(2, '0')}`;
    }

    function getSubjectHours(subjects) {
        const subjectHours = {};

        subjects.forEach(subject => {
            const hoursInput = document.getElementById(subject).value;
            subjectHours[subject] = hoursInput ? parseInt(hoursInput, 10) : 0;
        });

        return subjectHours;
    }

    examSelector.addEventListener('change', function() {
        const selectedExam = examSelector.value;
        const subjects = examSubjects[selectedExam];

        let subjectHTML = '';

        subjects.forEach(subject => {
            subjectHTML += `
                <label for="${subject}">${subject} Time Limit (in hours):</label>
                <input type="text" id="${subject}" name="${subject}" placeholder="Enter time limit">
            `;
        });

        subjectList.innerHTML = subjectHTML;
    });

    generateTimetableBtn.addEventListener('click', generateTimetable);
});
