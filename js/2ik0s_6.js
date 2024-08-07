(function ($){
const CTCCoupon={
init: function (){
this._bind();
},
_bind: function (){
$(document).on('click', '.ctc-coupon-toggle-link', this.toggleDetails);
$(document).on('click', '.ctc-coupon-link', this.handleClick);
},
handleClick: function (event){
event.preventDefault()
const self=$(this)
const parent=self.parents('.ctc-coupon')
if(parent.hasClass('ctc-coupon-clicked')){
return
}
const href=self.attr('href')
const target=self.attr('target')
const couponCode=parent.find('.ctc-coupon-code').text().trim()||''
console.log(couponCode)
parent.addClass('ctc-coupon-clicked')
CTCWP.copy(couponCode)
window.open(href, target)
},
oldHandleClick: function (event){
event.preventDefault();
const self=$(this)
const href=self.data('href')
const target=self.data('target')
const btn=self.find('.ctc-coupon-button')
if(! self.hasClass('ctc-coupon-link-clicked')){
window.open(href, target)
self.addClass('ctc-coupon-link-clicked')
btn.text('Copy Code')
}
if(self.hasClass('ctc-coupon-link-clicked')){
self.addClass('ctc-coupon-link-copied')
btn.text('Copied')
}},
toggleDetails: function (event){
event.preventDefault();
const self=$(this)
const coupon=self.parents('.ctc-coupon')
const details=coupon.find('.ctc-toggle-details')
details.slideToggle('fast')
}};
$(function (){
CTCCoupon.init();
});
})(jQuery);