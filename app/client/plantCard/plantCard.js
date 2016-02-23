Template.plantCard.onCreated(() => {
});

Template.plantCard.helpers({
    imageURL: (plant) => {
        console.log(this);
        return Images.findOne(this.image_id);
    },
    statusMessage: () => {
        var events = Events.find().fetch();
        for(var i = 0; i < events.length; i++) {
            if(events[i].eventType === 'great') {
                return "UGH... finally you feed me...";
            }
        }
        return Plant.findOne({_id: this._id}).status;
    }
});

Template.plantCard.events({
    'click ': function(plant) {
        return Images.findOne(this.image_id);
    }
});