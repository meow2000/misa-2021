$(document).ready(function () {
    formMode = null;
    loadData();
    // event when click delete btn
    $("table#tblEmployee").on('click', '#delete-btn', function() {
        debugger
        var employeeId = $(this).val();
        deleteEmp(employeeId);
    });
    // event when click add btn
    $('#btnAdd').click(() => {
        formMode="add";
        $('#dlgPopup').show();
        // genarate new ID and focus
        $.ajax({
            type: "GET",
            url: "http://amis.manhnv.net/api/v1/Employees/NewEmployeeCode",
            success: function (response) {
                $('#txtEmployeeCode').val(response);
                $('#txtEmployeeCode').focus();
            }
        });
    });
    // event when click save btn
    $('#btnSave').click(() => {
        const employeeCode = $('#txtEmployeeCode').val();
        const fullName = $('#txtFullName').val();
        const dateOfBirh = $('#dtDateOfBirth').val();
        const gender = $('#Gender').data('value');
        const position = $('#txtPositionName').val();
        const identityNumber = $('#txtIdentityNumber').val();
        const identityDate = $('#txtIdentityDate').val();
        const identityPlace = $('#txtIdentityPlace').val();
        const departmentName = $('#cbxDepartment').data('value');
        const address = $('#txtAddress').val();
        const phoneNumber = $('#txtPhoneNumber').val();
        const telePhoneNumber = $('#txtTelePhoneNumber').val();
        const email = $('#txtEmail').val();
        const bankNumber = $('#txtBankAccountNumber').val();
        const bankName = $('#txtBankName').val();
        const bankBranchName = $('#txtBankBranchName').val();
        let employee = {
            "employeeCode": employeeCode,
            "employeeName": fullName,
            "dateOfBirth": dateOfBirh,
            "identityNumber": identityNumber,
            "identityDate": identityDate,
            "identityPlace": identityPlace,
            "phoneNumber": phoneNumber,
            "telephoneNumber": telePhoneNumber,
            "bankAccountNumber": bankNumber,
            "bankName": bankName,
            "bankBranchName": bankBranchName,
            "positionName": position,
            "departmentName": departmentName,
            "email": email,
            "address": address,
            "gender": gender,
        };

        if(formMode == 'add') {
            $.ajax({
                type: "POST",
                url: "http://amis.manhnv.net/api/v1/Employees",
                data: JSON.stringify(employee),
                dataType: "json",
                async: false,
                contentType: "application/json",
                success: function(response) {
                    console.log(response);
                },
                error: function(res) {
                    console.log(res);
                }
            });
        }
    });
    // close popup form
    $('#btnCloseDialog').click(() => {
        $('#dlgPopup').hide();
    });

    // $("#checkAll").click(function(){
    //     var checkBoxes = $('document').find('input');
    //     // var checkBoxes = $(this).find("input");
    //     checkBoxes.prop("checked", !checkBoxes.prop("checked"));
    // });
});

function deleteEmp(employeeId) {
    $.ajax({
        type: "DELETE",
        url: `http://amis.manhnv.net/api/v1/Employees/${employeeId}`,
        success: function (response) {
            alert("deleted");
            loadData();
        }
    });
}

function RowOnClick(sender) {
    alert("meow");
}

function loadData() {
    // empty body data
    let employees = [];
    $('tbody').empty();
    // GET data to employees
    $.ajax({
        type: "GET",
        url: "http://amis.manhnv.net/api/v1/Employees",
        async: false,
        dataType: "Json",
        success: function (response) {
            employees = response;
        },
        error: function(res) {
            console.log("error");
        }
    });
    // console.log("2");
    console.log(employees);
    for (const emp of employees) {
        // format JSON date to mm/dd/yyyy
        let dateOfBirth = new Date(emp.DateOfBirth);
        let date = dateOfBirth.getDate();
        let month = dateOfBirth.getMonth() + 1;
        let year = dateOfBirth.getFullYear();
        date = (date < 10 ? `0${date}` : date);
        month = (month < 10 ? `0${month}` : month);
        dateOfBirth = `${date}/${month}/${year}`;
        // 
        let trCheckboxHTML = `<label class="checkbox-wrapper">
                                    <input type="checkbox">
                                    <span class="m-checkbox" id="m-checkbox"></span>
                                </label>`;
        let trHTML = $(
            `<tr class="m-tr">
                <td class="m-multi-check">${trCheckboxHTML}</td>
                <td class="text-align-left" fieldvalue="">${emp.EmployeeCode}</td>
                <td class="text-align-left">${emp.EmployeeName}</td>
                <td class="text-align-left">${emp.GenderName}</td>
                <td class="text-align-center">${dateOfBirth}</td>
                <td class="text-align-left">${emp.IdentityNumber}</td>
                <td class="text-align-left">${emp.PositionName}</td>
                <td class="text-align-left">${emp.DepartmentName}</td>
                <td class="text-align-left">${emp.BankAccountNumber}</td>
                <td class="text-align-left">${emp.BankName}</td>
                <td class="text-align-left">${emp.BankBranchName}</td>
                <td class="text-align-center">
                    <div class="td__edit-delete-wrapper">
                        <div id="edit-btn" class="td__edit-btn">Sửa</div>
                        <button id="delete-btn" class="td__dropdown-icon" value="${emp.EmployeeId}"></button>
                    </div>
                </td>
            </tr>`);
        trHTML.data("employeeId", emp.EmployeeId);
        trHTML.data("data", emp);
        $('tbody').append(trHTML);
    }
    // $('table#tblEmployee').on('click', 'tbody tr', RowOnClick);
}