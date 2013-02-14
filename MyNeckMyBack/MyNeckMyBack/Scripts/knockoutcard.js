//knockoutcard.js
//Created by Edgar Ivan Buenrostro some time in early 2013

// represent a single card item with a question and answer.
var Card = function(question, answer) {
    this.question = ko.observable(question);
    this.answer = ko.observable(answer);
    this.editing = ko.observable(false);
};

var ViewModel = function(todos) {
    var self = this;

    self.Cards = ko.observableArray([
        new Card("8x9", "72"),
        new Card("11x6", "66"),
        new Card("12x12", "144")
    ]);

};

ko.applyBindings(new ViewModel());
