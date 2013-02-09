
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
    FlashCard = Backbone.Model.extend({
        //Create a model to hold friend atribute
        question: null,
        answer: null
    });

    FlashCardCollection = Backbone.Collection.extend({
        model: FlashCard,       //Indicates what it's a collection of
        //This is our Friends collection and holds our Friend models
        initialize: function (models, options) {
            //this.bind("add", options.view.addFriendLi);
            //Listen for new additions to the collection and call a view function if so
        }
    });

    window.FlashCardView = Backbone.View.extend({
        el: $("body"),              //The element representing the view.
        initialize: function() {    //Like a constructor
            this.friends = new FlashCardCollection(null, { view: this });
            //Create a flash card collection when the view is initialized.
            //Pass it a reference to this view to create a connection between the two
        },
        events: {
            "click #add-card":"showPrompt"
        },
        showPrompt: function() {
            alert('you clicked');
        }
    });
    var flashCardView = new FlashCardView;




    window.AppView = Backbone.View.extend({
        el: $("body"),
        initialize: function () {
            this.friends = new Friends(null, { view: this });
            //Create a friends collection when the view is initialized.
            //Pass it a reference to this view to create a connection between the two
        },
        events: {
            "click #add-friend": "showPrompt",
        },
        showPrompt: function () {
            var friend_name = prompt("Who is your friend?");
            var friend_model = new Friend({ name: friend_name });
            //Add a new friend model to our friend collection
            this.friends.add(friend_model);
        },
        addFriendLi: function (model) {
            //The parameter passed is a reference to the model that was added
            $("#friends-list").append("<li>" + model.get('name') + "</li>");
            //Use .get to receive attributes of the model
        }

    });

});//End of document ready