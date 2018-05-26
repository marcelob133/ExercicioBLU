$(function(){
    //VERIFICATION DURING FIELDS INPUT
    $("input").on("input", function(){
        var inputCase = $(this).attr("id");
        switch (inputCase) {
            case "name":
                alertMessage(inputCase, $(this), "Use apenas letras padawan.");   
                break;
            case "age":
                alertMessage(inputCase, $(this), "Use apenas números padawan.");
                break;
            case "email":
                alertMessage(inputCase, $(this), "Informe um email válido.");
                break;
        }
    })

    $('#register-form').on('submit', function(ev) {
        ev.preventDefault()

        //MAIN VARIABLES ENTRANCE======================
        var formValidation = true;

        var name = $("#name");
        var age = $("#age");
        var email = $("#email");
        var allFields = $("#name, #age, #email");
        var allAlerts = $("#alertName, #alertAge, #alertEmail").text("");

        var currentName = name.val();
        var currentAge = age.val();
        var currentEmail = email.val();
        //=============================================
        //LOGICAL PROCESSMENT==========================
        //Form verifications
        allFields.removeClass("not-valid");

        if(currentName === ""){
            $("#alertName").text("Forneça o seu nome padawan.");
            name.focus();
            name.addClass("not-valid");
            formValidation = false;
        }
        else if(currentAge === ""){
            $("#alertAge").text("Preencha a sua idade padawan.");
            age.focus();
            age.addClass("not-valid");
            formValidation = false;
        }
        else if(currentAge.match(/^[0-9]+$/) == null || parseInt(currentAge) <= 0){
            $("#alertAge").text("Sua idade deve ser um nº maior que zero.");
            age.focus();
            age.addClass("not-valid");
            formValidation = false;
        }
        else if(currentEmail === ""){
            $("#alertEmail").text("Forneça um email válido padawan.");
            email.focus();
            email.addClass("not-valid");
            formValidation = false;
        }
        //=============================================
        //INFORMATIONS OUTPUT========================== 
        //Session Storage
        window.sessionStorage.setItem("name",currentName);
        window.sessionStorage.setItem("age",currentAge);
        window.sessionStorage.setItem("email",currentEmail);
        //=============================================
        //RELEASING PAGE===============================
        if(formValidation) {
            $("form button[type='submit']")
                .removeClass("show")
                .addClass("hide")
                .on("transitionend", function () {
                window.location = "confirmacao.html";
            });
        }
        
        //=============================================
    })

    //GENERAL ALERT MESSAGE VERIFICATIONS============
    function alertMessage(id,  field, message){
        var capitalize = id[0].toUpperCase() + id.slice(1);
        var regexName = /^\D+$/g; //aceitando apenas letras
        var regexMail = /^(\w+)?@.+(\w+).*(\.\w{2,3})$/g; //aceitando email .com ou .com.algumacoisa
        var regexNumber = /^[0-9]+$/; //aceitando apenas números

        if(id === "name"){
            regexName.test(field.val()) ? removeClassError(capitalize, field) : addClassError(capitalize, field, message);
        }
        if(id === "age"){
            regexNumber.test(field.val()) ? removeClassError(capitalize, field) : addClassError(capitalize, field, message);
        }
        if(id === "email"){
            regexMail.test(field.val()) ? removeClassError(capitalize, field) : addClassError(capitalize, field, message);
        }
    }

    function addClassError(capitalize, field, message){
        $("#alert" + capitalize).text(message);
        field.focus();
        field.addClass("not-valid");
    }

    function removeClassError(capitalize, field){
        $("#alert" + capitalize).text("");
        field.removeClass("not-valid");
    }

    $("form button[type='submit']").addClass("show");
    //=============================================
})