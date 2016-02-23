Template.plantList.onCreated(function() {
    var userId = Meteor.userId();
    if ( FlowRouter.current().path === '/' + userId + '/nearby') {
       // this.subscribe('plantsByOffice');
    } else {
        this.subscribe('plantsByUser', userId);
    }
});

Template.plantList.helpers({
    plants: function() {
        return Plant.find();
    }
});

Template.plantList.events({
    'click .btn-floating': function() {
        AntiModals.overlay('newPlantTemplate',{});
    }
});