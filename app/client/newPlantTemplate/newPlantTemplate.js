function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.fileDownload')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function playAnimation(){
        var $buttonWrapper = $(".button-wrapper"),
        $ripple = $(".ripple"),
        $layer = $(".layered-content");
    $ripple.addClass("rippling");
    $buttonWrapper.addClass("clicked").delay(1500).queue(function(){
        $layer.addClass("active");
    });
    setTimeout(function() { showCheckmark(); }, 1500);
    setTimeout(function() { close(); }, 3000);
}

function close() {
    AntiModals.dismissAll();
    var $buttonWrapper = $(".button-wrapper"),
        $ripple = $(".ripple"),
        $layer = $(".layered-content")

    $buttonWrapper.removeClass("clicked");
    $ripple.removeClass("rippling");
    $layer.removeClass("active");
}

function showCheckmark() {
    var icon = $('.icon');
    icon.addClass('icon--order-success svg');
    icon.css('display','inline');
}

function isEmpty() {
    var nickname = $('#nickname').val();
    var serial = $('#serial').val();
    var office = $('#office').val();

    if (nickname && serial) {
        return false;
    } else {
        return true;
    }
}

function createNewPlant() {
    var nickname = $('#nickname').val();
    var serial = $('#serial').val();
    var office = $('#office').val();
    var image_id = Session.get('image_id');

    Plant.insert({
        level: 0,
        _id: serial,
        user_id: Meteor.userId(),
        name: nickname,
        location: office,
        image_id:image_id
    })
}

function saveImageToDb(event) {
    var files = event.target.files;
    //for (var i = 0, ln = files.length; i < ln; i++) {
    Images.insert(files[0], function (err, fileObj) {
        var id = fileObj._id;
        Session.set('image_id',id);
    });
    //}
}

Template.newPlantTemplate.helpers({
    images: function() {
        return Images.find();
    }
});

Template.newPlantTemplate.events({
    'click .hiddenFileInputContainter img':function(event) {
        var input = $('#flupld');
        input.trigger('click');
    },

    'change #flupld':function(event,template){
        readURL(event.target);
        saveImageToDb(event);
    },
    'click .main-button': function(event) {
        console.log('clicked');
    },
    'click .hidden':function(event) {
        createNewPlant();
        console.log("sumbit clicked");
        event.stopPropagation();
    },
    'click a':function()  {
        function showPosition(position) {
            var location = $('#location');
            var label = $('#locationLabel');



            var long = position.coords.longitude;
            var lat = position.coords.latitude;

            //icon--order-success svg

            //console.log(label.text());
            label.text('');
            location.val(long + ' ' + lat);
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    },
});

Template.newPlantTemplate.rendered = function(){
    'use strict';
    var $mainButton = $(".main-button");
    $mainButton.on("click", function(){
        if (isEmpty()) {
            AntiModals.alert('Not all fields are filled!');
        } else {
            createNewPlant();
            playAnimation();
        }
    });
}