(function ($){
const CTCCore={
init: function (){
this._bind();
},
_bind: function (){
$(document).on('click', '.ctc-block-copy', this.doCopy);
},
doCopy: function (event){
event.preventDefault();
let btn=$(this),
btnText=btn.find('.ctc-button-text'),
oldText=btnText.text(),
copiedText=btn.attr('data-copied')||'Copied',
copyAsRaw=btn.attr('copy-as-raw')||'',
block=btn.parents('.ctc-block'),
textarea=block.find('.ctc-copy-content'),
content=textarea.val(),
selectionTarget=textarea.attr('selection-target')||''
if(selectionTarget){
const source=$(selectionTarget)
if(! source.length){
return
}
CTCWP.copySelection(source)
}else{
if(! copyAsRaw){
content=content.replace(/<br\s*[\/]?>/gi, "\n");
content=content.replace(/<div\s*[\/]?>/gi, "\n");
content=content.replace(/<p\s*[\/]?>/gi, "\n\n");
content=content.replace(/<li\s*[\/]?>/gi, "\n");
content=content.replace(/(<([^>]+)>)/ig, '');
content=content.replace(new RegExp("/^\s+$/"), "");
}
content=$.trim(content);
CTCWP.copy(content);
}
if(btn.hasClass('ctc-block-copy-icon')){
btn.addClass('copied');
setTimeout(
function (){
btn.removeClass('copied')
},
1000
);
}else{
btnText.text(copiedText);
block.addClass('copied')
setTimeout(
function (){
btnText.text(oldText)
block.removeClass('copied')
},
1000
);
}}
};
$(
function (){
CTCCore.init();
}
);
})(jQuery);