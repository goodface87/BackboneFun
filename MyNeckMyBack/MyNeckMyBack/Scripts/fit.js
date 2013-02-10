
function canDoTransforms() {
    return Modernizr.csstransforms3d;
}

// INUR: pretty much every $() needs scope.
function bind_card_interactions() {
    $('.card').unbind();

    // THAT: this *probably* == window. I sure hope it's not unbinding
    // any important hover events! Also, using .data
    $(this).data('mouseover', false);

    if (canDoTransforms()) {
        $(".card").addClass("flippy");
        $('.card').hover(function () {

            $('.card-container').css({ "z-index": '' });
            $(this).parent('.card-container').css({ "z-index": '14' });
            $(this).addClass('card-rotate');
            $(this).data('sentinel', 'changing');
            $(this).data('mouseover', true);
            if ($('#recommended-groups-container .cards-wrapper').length !== 0)
                $('#recommended-groups-container .cards-wrapper').cycle('pause');
        }, function () {
            $(this).data('mouseover', false);
            if ($(this).data('sentinel') === 'changing')
                return;
            $(this).removeClass('card-rotate');
            if ($('#recommended-groups-container .cards-wrapper').length !== 0)
                $('#recommended-groups-container .cards-wrapper').cycle('resume');
        });

        //multibrowser support FTL :(
        $('.card').bind("webkitTransitionEnd oTransitionEnd transitionend msTransitionEnd", function () {
            $(this).data('sentinel', null);
            if (!($(this).data('mouseover'))) {
                $(this).removeClass('card-rotate');
            }
        });
    }
    else {
        $(".card .card-back").hide();
        //old school
        //        $('.card .card-back').hide()
        $('.card').hover(function () {
            $(this).children('.card-back').fadeIn(300);
            $(this).children('.card-front').hide(); 
        }, function () {
            $(this).children('.card-front').fadeIn(300);
            $(this).children('.card-back').hide(); 
        });
    }


}

$(function() {
    bind_card_interactions();

});//End of document ready

(function ($) {


    FlashCard = Backbone.Model.extend({
        //Create a model to hold flash card atribute
        question: null,
        answer: null
    });

    FlashCardCollection = Backbone.Collection.extend({
        model: FlashCard,       //Indicates what it's a collection of
        //This is our flash card collection and holds our flash card models
        initialize: function (models, options) {
            this.bind("add", options.view.addFlashCardLi);
            //Listen for new additions to the collection and call a view function if so
            //Now, if anything is ever added to this collection, that will automatically call addFlashCardLi 
            //function in the view that was passed.
        }
    });

    window.FlashCardView = Backbone.View.extend({
        el: $("body"),              //The element representing the view.
        initialize: function () {    //Like a constructor
            this.flashCards = new FlashCardCollection(null, { view: this });
            //Create a flash card collection when the view is initialized.
            //Pass it a reference to this view to create a connection between the two
        },
        events: {
            "click #add-card": "submitCard",
            "keypress #answer" : "answerEnterKey",
        },
        answerEnterKey: function (e) {
            if (e.which == 13) {
                this.submitCard();
                $('#question').focus();
            }
        },
        submitCard: function () {
            var $questionInput = $('#question');
            var $answerInput = $('#answer');
            var flashCard = new FlashCard({ question: $questionInput.val(), answer: $answerInput.val() });
            this.flashCards.add(flashCard);
            $questionInput.val('');
            $answerInput.val('');
        },
        addFlashCardLi: function (model) {
            $('#flash-cards-list').append("<li>" + model.get('question') + ' : ' + model.get('answer') + '</li>');
            //The parameter passed is a reference to the model that was added
            // Use .get to receive attributes of the model
        }
    });
    var flashCardView = new FlashCardView;



})(jQuery);


