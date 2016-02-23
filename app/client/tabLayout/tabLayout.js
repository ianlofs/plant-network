Template.tabLayout.events({
    'click #myplants': function(event, template) {
        var pathRedirect = '/plants/' +  Meteor.userId();
        if(FlowRouter.current().path !== pathRedirect) {
            FlowRouter.go(pathRedirect);
        }
    },
    'click #office': function(event, template) {
        var pathRedirect = '/nearby/' +  Meteor.userId();
        if(FlowRouter.current().path !== pathRedirect) {
            FlowRouter.go(pathRedirect);
        }
    },
    'click .logout': function(event, template) {
        Accounts.logout();
        FlowRouter.go('/');
    }
});