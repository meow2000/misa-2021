$(document).ready(function () {
    formMode = null;
    loadData();
});

function loadData() {
    // empty body data
    let employees = [];
    $('tbody').empty();
    // GET data to employees
    $.ajax({
        type: "GET",
        url: "http://cukcuk.manhnv.net/api/v1/Employees",
        async: false,
        dataType: "Json",
        success: function (response) {
            employees = response;
        },
        error: function(res) {
            console.log("error");
        }
    });
    console.log("2");
    console.log(employees);
    for (const emp of employees) {
        let dateOfBirth = new Date(emp.DateOfBirth);
        let date = dateOfBirth.getDate();
        let month = dateOfBirth.getMonth() + 1;
        let year = dateOfBirth.getFullYear();
        date = (date < 10 ? `0${date}` : date);
        month = (month < 10 ? `0${month}` : month);
        dateOfBirth = `${date}/${month}/${year}`;
        let trCheckboxHTML = `<label class="checkbox-wrapper">
                                    <input type="checkbox">
                                    <span class="m-checkbox" id="m-checkbox"></span>
                                </label>`;
        let trHTML = $(
            `<tr class="m-tr">
                <td class="m-multi-check">${trCheckboxHTML}</td>
                <td class="text-align-left" fieldvalue="">${emp.EmployeeCode}</td>
                <td class="text-align-left">${emp.FullName}</td>
                <td class="text-align-left">${emp.GenderName}</td>
                <td class="text-align-center">${dateOfBirth}</td>
                <td class="text-align-left">${emp.IdentityNumber}</td>
                <td class="text-align-left">${emp.PositionName}</td>
                <td class="text-align-left">${emp.DepartmentName}</td>
                <td class="text-align-left"></td>
                <td class="text-align-left">Viettinbank</td>
                <td class="text-align-left">CHI NHÁNH NGÂN HÀNG</td>
                <td class="text-align-center">Sửa</td>
            </tr>`);
        $('tbody').append(trHTML);
        console.log("1");
    }
}