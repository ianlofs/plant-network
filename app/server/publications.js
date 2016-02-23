"use strict";

Meteor.publish('recentMeasurementByPlant', (plant_id) => {
    return Measurements.find({plant_id: plant_id}, {sort: {time: -1}, limit: 60});
});

Meteor.publish('recentEventsByPlant', (plant_id) => {
    return Events.find({plant_id: plant_id}, {sort: {time: -1}, limit: 10})
});

Meteor.publish('imageFromPlant', (image_id) => {
    console.log(image_id);
   return Images.find(image_id);
});

Meteor.publish('plantsFromUser', (user_id) => {
    return Plant.find({user_id: user_id});
});

Meteor.publish('plantsFromOffice', (organization_id) => {
    return Plant.find({organization_id: organization_id});
});

Meteor.publish('plantsAndUsers', () => {
    return [
        Plant.find({}),
        Users.find({})
    ];
});

