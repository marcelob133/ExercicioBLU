$(function () {
    //MAIN VARIABLES ENTRANCE======================
    var userName = window.sessionStorage.getItem("name");
    var userAge = window.sessionStorage.getItem("age");
    var userEmail = window.sessionStorage.getItem("email");
    var mentorName = window.sessionStorage.getItem("mentorName");
    var mentorPlanet = window.sessionStorage.getItem("mentorPlanet");
    //=============================================
    //CHANGING HTML================================
    $('#student-name').html(userName);
    $('#mentor-name').html(mentorName);
    //=============================================
    //GETTING DATA FROM API========================
    fetch(mentorPlanet)
    .then((resp) => resp.json())
        .then((response)  => $('#mentor-planet').html(response.name))
        .catch(err => $('#mentor-planet').html("não foi obtido o planeta."));
    //=============================================
})