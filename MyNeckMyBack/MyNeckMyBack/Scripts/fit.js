
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
        name: null
    });

    FlashCards = Backbone.Collection.extend({
        //This is our Friends collection and holds our Friend models
        initialize: function (models, options) {
            //this.bind("add", options.view.addFriendLi);
            //Listen for new additions to the collection and call a view function if so
        }
    });

});