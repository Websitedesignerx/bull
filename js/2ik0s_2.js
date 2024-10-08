(function ($){
const CTCInline={
init: function (){
this._bind();
},
_bind: function (){
$(document).on('click', '.ctc-inline-copy', this.doCopy);
},
doCopy: function (event){
event.preventDefault();
const self=$(this)
let text=self.find('.ctc-inline-copy-textarea').val()||''
text=$.trim(text);
CTCWP.copy(text);
self.addClass('copied');
setTimeout(function (){
self.removeClass('copied');
}, 1000);
}};
$(function (){
CTCInline.init();
});
})(jQuery);