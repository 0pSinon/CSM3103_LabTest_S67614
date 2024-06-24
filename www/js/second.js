$(document).ready(function() {
    // Function to get the query parameter value by name
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Get the employeeNumber from the URL
    const employeeNumber = getQueryParam('id');

    if (employeeNumber) {
        // Make an AJAX call to fetch staff details by employeeNumber
        $.ajax({
            url: 'https://kerbau.odaje.biz/getstaffbyid.php',
            method: 'GET',
            data: { id: employeeNumber },
            dataType: 'json',
            success: function(response) {
                let data = response.map(item => JSON.parse(item)).filter(item => item.status !== 1);
                if (data.length > 0) {
                    let staff = data[0];
                    // Display the staff details
                    $('#staff-details').html(`

                        <tr><td><strong>Name:</strong> ${staff.firstName} ${staff.lastName}</td></tr>
                        <tr><td><strong>Email:</strong> ${staff.email}</td></tr>
                        <tr><td><strong>Job Title:</strong> ${staff.jobTitle}</td></tr>
                        <tr><td><strong>Office Code:</strong> ${staff.officeCode}</td></tr>
                        <tr><td><strong>Extension:</strong> ${staff.extension}</td></tr>
                        <tr><td><strong>Reports To:</strong> ${staff.reportsTo}</td></tr>
                        </tr>
                    `);
                } else {
                    $('#staff-details').html('<p>No details found for this employee.</p>');
                }
            },
            error: function(error) {
                console.error('Error fetching staff details', error);
                $('#staff-details').html('<p>Error fetching staff details. Please try again later.</p>');
            }
        });
    } else {
        $('#staff-details').html('<p>No employee ID provided in the URL.</p>');
    }
});
