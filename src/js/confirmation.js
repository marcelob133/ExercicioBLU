$(function () {
    //CLEAN MENTOR HISTORY===========================
    sessionStorage.removeItem('mentorNameStack')
    //===============================================
    //MAIN VARIABLES ENTRANCE========================
    const mentorName = 'carregando...';
    const url = 'https://swapi.co/api/people/';

    var userName = window.sessionStorage.getItem("name");
    var userAge = window.sessionStorage.getItem("age");
    var userEmail = window.sessionStorage.getItem("email");

    $('#mentor-name').html(mentorName)
    var mentor = Math.floor(Math.random() * 90) + 1;
    var mentorUrl = url + mentor + '/';
    var stackResponse = null
    //===============================================
    //GETTING DATA FROM API==========================
    fetch(mentorUrl)
    .then((resp) => resp.json())
        .then(function(response) {
            console.log(response);
            stackResponse = response;
            window.sessionStorage.setItem("mentorName",response.name);
            window.sessionStorage.setItem("mentorPlanet",response.homeworld);
            $('#mentor-name').html(response.name);
        })
        .catch(function() {
            $('#mentor-name').html("tente novamente");
        });

    //===============================================
    //ACCEPTING MENTOR===============================
    $('#btn-accept').on('click', function () {
        window.location = 'inscrito.html'
    })
    //===============================================
    //DENYING MENTOR=================================
    $('#btn-deny').on('click', function () {
        
        if (!sessionStorage.mentorNameStack) {
            var stack = [];
            stack.push(stackResponse);
            window.sessionStorage.setItem("mentorNameStack", JSON.stringify(stack));
        } else  {
            var stringData = sessionStorage.getItem('mentorNameStack');
            var data = JSON.parse(stringData);
            data.push(stackResponse);
            window.sessionStorage.setItem("mentorNameStack", JSON.stringify(data));
        }

        var mentoragain = Math.floor(Math.random() * 90) + 1;
        var mentorUrlagain = url + mentoragain + '/';

        $('#mentor-name').html(mentorName);

        fetch(mentorUrlagain)
        .then((resp) => resp.ok ? resp.json() : $('#mentor-name').html("tente novamente"))
            .then((response) => {
                $('#btn-back').show("slow");
                console.log(response);
                stackResponse = response;
                window.sessionStorage.setItem("mentorName",response.name);
                window.sessionStorage.setItem("mentorPlanet",response.homeworld);
                $('#mentor-name').html(response.name);
            })
            .catch(function() {
                $('#mentor-name').html("tente novamente");
            });
    })

    if (!sessionStorage.mentorNameStack) {
        $('#btn-back').hide()
    }
    //===============================================
    //GETTING LAST MENTOR============================
    $('#btn-back').on('click', function () {
        var dataString = window.sessionStorage.mentorNameStack;
        var data = JSON.parse(dataString)
        var index = (data.length - 1) === -1 ? 0 : data.length - 1
        var lastStack = data[index]
        
        if (data.length > 0) {
            var getName = lastStack.name;
            var getHome = lastStack.homeworld;

            data.splice(index, 1)
            stackResponse = lastStack

            window.sessionStorage.setItem("mentorName",getName);
            window.sessionStorage.setItem("mentorPlanet",getHome);
            window.sessionStorage.setItem("mentorNameStack", JSON.stringify(data));

            $('#mentor-name').html(getName);

            data.length === 0 ? $(this).hide() : null

        }
    })
    //===============================================
})