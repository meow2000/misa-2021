$(document).ready(function () {
    formMode = null;
    var selectedId = null;
    loadData();
    loadDepartmentComboboxData();
    $("#txtFullName").prop('required',true);
    // event when click delete btn
    $("table#tblEmployee").on('click', '#show-delete-popup-btn', function() {
        // debugger
        selectedId = $(this).attr("id-value");
        $("#dlgDeletePopup").show();
        $("#delete-btn").click(() => {
            deleteEmp(selectedId);
            $('#dlgDeletePopup').hide()
        })
    });
    $("input[type=text]").focus(function(sender) {
        $(sender.target).removeClass("m-input-error");
    });

    $("table#tblEmployee").on('click', '#edit-btn', function() {
        // debugger
        selectedId = $(this).attr("id-value");
        formMode = "edit";
        $.ajax({
            type: "GET",
            url: `http://amis.manhnv.net/api/v1/Employees/${selectedId}`,
            success: function (emp) {
                $('#txtEmployeeCode').val(emp.EmployeeCode);
                $('#txtFullName').val(emp.EmployeeName);
                $('#dtDateOfBirth').val();
                $('input[name="Gender"]:checked').val(emp.Gender);
                $('#txtPositionName').val(emp.EmployeePosition);
                $('#txtIdentityNumber').val(emp.IdentityNumber);
                $('#txtIdentityDate').val();
                $('#txtIdentityPlace').val();
                $('#cbxDepartment').data('value', emp.DepartmentId);
                $('#txtAddress').val(emp.Address);
                $('#txtPhoneNumber').val(emp.PhoneNumber);
                $('#txtTelePhoneNumber').val(emp.TelephoneNumber);
                $('#txtEmail').val(emp.Email);
                $('#txtBankAccountNumber').val(emp.BankAccountNumber);
                $('#txtBankName').val(emp.BankName);
                $('#txtBankBranchName').val(emp.BankBranchName);
            
                $('#dlgPopup').show();
            }
        });
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
        const gender = $('input[name="Gender"]:checked').val();
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
        // debugger
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
            "employeePosition": position,
            "departmentId": departmentName,
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
                    $('#dlgPopup').hide();
                    loadData(); 
                },
                error: function(res) {
                    console.log(res);
                    debugger
                    if(res.status === 400) {
                        if(employeeCode.trim() === "") {
                            $('#txtEmployeeCode').toggleClass("m-input-error");
                        }
                        if(fullName.trim() === "") {
                            $('#txtFullName').toggleClass("m-input-error");
                        }
                        if($('#cbxDepartment').data('value') === undefined) {
                            $('#cbxDepartment .m-combo-box').toggleClass("m-input-error");
                        }
                    }
                }
            });
        } else {
            $.ajax({
                type: "PUT",
                url: `http://amis.manhnv.net/api/v1/Employees/${selectedId}`,
                data: JSON.stringify(employee),
                dataType: "json",
                async: false,
                contentType: "application/json",
                success: function(response) {
                    console.log(response);
                    $('#dlgPopup').hide();
                    loadData();
                },
                error: function(res) {
                    console.log(res);
                }
            });
        }

        
    });
    $('#show-delete-popup-btn').click(() => {
        $('#dlgDeletePopup').show();
    });
    // close popup form
    $('#btnCancel').click(() => {
        $('#dlgPopup').hide();
    });
    $('#btnDeleteCancel').click(() => {
        $('#dlgDeletePopup').hide();
    });
    
    // $('').click(() => {
    //     document.getElementById("dropdown-content").classList.toggle("show");
    // });
    $('#btnCloseDialog').click(() => {
        $('#dlgPopup').hide();
    });
    // $("#checkAll").click(function(){
    //     var checkBoxes = $('document').find('input');
    //     // var checkBoxes = $(this).find("input");
    //     checkBoxes.prop("checked", !checkBoxes.prop("checked"));
    // });
    $('table#tblEmployee').on('click', 'tbody tr', RowOnClick);
    $('#recordPerPage').on('change', loadData);
});

function RowOnClick(sender) {
    // debugger
    $(sender.target).find(".dropdown-content").toggleClass("show");
}

function deleteEmp(employeeId) {
    // debugger
    $.ajax({
        type: "DELETE",
        url: `http://amis.manhnv.net/api/v1/Employees/${employeeId}`,
        success: function (response) {
            // alert("deleted");
            loadData();
        }
    });
}

function loadDepartmentComboboxData() {
    // Lấy dữ liệu về:
    $.ajax({
        type: "GET",
        url: "http://amis.manhnv.net/api/v1/Departments",
        success: function(response) {
            // Build combobox:
            
            for (const department of response) {
                // let optionHTML = `<option value="${department.DepartmentId}">${department.DepartmentName}</option>`;
                let optionHTML = `<div class="m-combobox-item" value="${department.DepartmentId}">${department.DepartmentName}</div>`;

                $('#cbxDepartment .m-combobox-data').append(optionHTML);
                let itemDataElements = $('#cbxDepartment').find('.m-combobox-data').html();
                $('#cbxDepartment').data("itemDataElement", itemDataElements);
            }
        }
    });

}

function loadData() {
    // empty body data
    let employees = [];
    $('tbody').empty();
    let searchText = $('#txtSearchInput').val();
    const pageSize = $('#recordPerPage').val();
    pageNumber = 1;
    // GET data to employees
    $.ajax({
        type: "GET",
        url: `http://amis.manhnv.net/api/v1/Employees/filter?pageSize=${pageSize}&pageNumber=${pageNumber}&employeeFilter=${searchText}`,
        async: false,
        dataType: "Json",
        success: function (response) {
            mlem = response;
        },
        error: function(res) {
            console.log("error");
        }
    });
    // console.log("2");
    employees = mlem.Data;
    $('#records').text(mlem.TotalRecord);
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
                <td class="text-align-left">${emp.EmployeePosition}</td>
                <td class="text-align-left">${emp.DepartmentName}</td>
                <td class="text-align-left">${emp.BankAccountNumber}</td>
                <td class="text-align-left">${emp.BankName}</td>
                <td class="text-align-left">${emp.BankBranchName}</td>
                <td class="text-align-center">
                    <div class="td__edit-delete-wrapper">
                        <div id="edit-btn" class="td__edit-btn" id-value="${emp.EmployeeId}">Sửa</div>
                        <div class="td__dropdown dropdown-wrapper">
                            <!-- <button id="show-delete-popup-btn" class='td__dropdown-icon'></button> -->
                            <button id="dropdown-menu" class="td__dropdown-icon">
                                <div id="dropdown-content" class="td__dropdown-content dropdown-content">
                                    <div id="show-delete-popup-btn" class="dropdown-item" id-value=${emp.EmployeeId}>Xóa</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>`);
        trHTML.data("employeeId", emp.EmployeeId);
        trHTML.data("data", emp);
        $('tbody').append(trHTML);
    }
    // $('table#tblEmployee').on('click', 'tbody tr', RowOnClick);
}