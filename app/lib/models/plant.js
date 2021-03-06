Plant = new Mongo.Collection('plant');


Plant.helpers({
    user: function() {
        return Users.findOne(this.user_id);
    },
    incrementLevel: function() {
        Meteor.call('incrementLevel', this._id);
    },
    picture: function() {
        var image = Images.findOne({_id:this.image_id});
        return image;
    }
});

Meteor.methods({
    incrementLevel: function(_id) {
       Plant.update(_id, {$inc: {level: 1}});
    },
    insertTestPlants :function(){
        Plant.insert({
            level: 0,
            id: 0,
            user_id: 'Gc5XdEiB3mMRshY9Z',
            name: 'Jimbo',
            location: 0,
            url: 'http://vignette4.wikia.nocookie.net/simpsons/images/2/22/Simp_Jimbo.png/revision/latest?cb=20100515113605'
        });

        Plant.insert({
            level: 0,
            id: 1,
            user_id: 'Gc5XdEiB3mMRshY9Z',
            name: 'Jerry Seinfeld',
            location: 0,
            url: 'https://upload.wikimedia.org/wikipedia/en/f/f6/Jerry_Seinfeld.jpg'
        });

        Plant.insert({
            level: 0,
            id: 2,
            user_id: 'Gc5XdEiB3mMRshY9Z',
            name: 'Your Dad',
            location: 0,
            url: 'http://rack.2.mshcdn.com/media/ZgkyMDEzLzA1LzI4LzY5L2RhZGFsd2F5c2ZhLjZjOWMxLmpwZwpwCXRodW1iCTEyMDB4OTYwMD4/2fa477a4/144/dad-always-fathers-day-ecard-someecards.jpg'
        });

        Plant.insert({
            level: 0,
            id: 3,
            user_id: 'Gc5XdEiB3mMRshY9Z',
            name: 'Electrolytic Capacitor',
            location: 0,
            url: 'http://www.rfwireless-world.com/images/electrolytic-capacitor.jpg'
        });

        Plant.insert({
            level: 99,
            id: 4,
            user_id: 'Gc5XdEiB3mMRshY9Z',
            name: 'Sweet Lemon tree',
            location: 0,
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Lemon_Tree_in_Santa_Clara_California.jpg/544px-Lemon_Tree_in_Santa_Clara_California.jpg'
        });
    }
});