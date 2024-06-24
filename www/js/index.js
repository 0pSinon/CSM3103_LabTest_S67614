$(document).ready(function() {
    $.ajax({
        url: 'https://kerbau.odaje.biz/getstaff.php',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            let data = response.map(item => JSON.parse(item)).filter(item => item.status !== 1);
            if (data.length > 0) {
                data.forEach(function(staff) {
                    $('#staff-list').append(
                        `<tr><td>
                            <a href="secondpage.html?id=${staff.employeeNumber}" id="${staff.employeeNumber}">
                                ${staff.email}
                            </a>
                        </td></tr>`
                    );
                });
            }
        },
        error: function(error) {
            console.error('Error fetching staff data', error);
        }
    });
});
