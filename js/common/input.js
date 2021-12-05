$(document).ready(function () {
    $("input[type=text]").focus(function(sender) {
        $(sender.target).removeClass("m-input-error");
    });
});