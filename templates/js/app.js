/**
 * Created by rahil on 4/30/17.
 */

var Allfieldcleared = true;

function integersOnly(input) {
    var regex = /[^0-9]/g;
    input.value = input.value.replace(regex,"");
}

function lettersOnly(input) {
    var regex = /[^a-z]/gi;
    input.value = input.value.replace(regex,"");
}

function validateStudentId(){
    var studentID = document.getElementById("sID");
    var _length = studentID.textContent.length;
    var _error = document.getElementById("id-error");
    if(_length == 9){
        return true;
    }
    else{

        studentID.style.border = "1px solid red";
        _error.textContent = "StudentID must be of only 9 digits";
        studentID.focus();
    }
}

function clearField(){
    var studentID = document.getElementById("sID");
    var _error = document.getElementById("id-error");
    studentID.style.border = "0px solid";
    _error.textContent = "";
    studentID.autofocus = true;
}

function validateDetails(){
    console.log($("#studentID").val().length );
    if($("#studentID").val().length !== 9){
        $("#s-id-error").text("Student ID must be of only 9 digits");
        $("#studentID").css("border","1px solid red");
        $("#studentID").focus();
        Allfieldcleared = true;
        return false;
    }
    console.log($("#firstPwd").val());
    console.log($("#re-pwd-error").val());
    if($("#firstPwd").val() !== $("#re-pwd-error").val()){
        $("#pwd-error").text("password does not matche");
        $("#firstPwd").css("border","1px solid red");
        $("#ReenterPwd").css("border","1px solid red");
        $("#re-pwd-error").text("password does not matche");
        $("#firstPwd").focus();
        $("#ReenterPwd").focus();
        Allfieldcleared = true;
        return false;
    }
    return true;
}


function clearAllFields() {
    if (Allfieldcleared) {
        $("#studentID").focus();
        $("#studentID").css("border","0px solid");
        // $("#fName").focus();
        $("#fName").css("border","0px solid");
        // $("#lName").focus();
        $("#lName").css("border","0px solid");
        $("#firstPwd").focus();
        $("#firstPwd").css("border","0px solid");
        $("#ReenterPwd").focus();
        $("#ReenterPwd").css("border","0px solid");

        $("#s-id-error").text("");
        // $("#fn_error").text("");
        // $("#ln_error").text("");
        $("#pwd-error").text("");
        $("#re-pwd-error").text("");
        Allfieldcleared = false;
    }
}