//knockoutcard.js
//Created by Edgar Ivan Buenrostro some time in early 2013

// represent a single card item with a question and answer.
var Card = function(question, answer) {
    this.question = ko.observable(question);
    this.answer = ko.observable(answer);
    this.editing = ko.observable(false);
}