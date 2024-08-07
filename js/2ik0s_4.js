(function ($){
const CTCDeal={
init: function (){
this._bind();
},
_bind: function (){
$(document).on('click', '.ctc-deal-toggle-link', this.toggleDetails);
},
toggleDetails: function (event){
event.preventDefault();
const self=$(this)
const deal=self.parents('.ctc-deal')
const details=deal.find('.ctc-toggle-details')
details.slideToggle('fast')
}};
$(function (){
CTCDeal.init();
});
})(jQuery);