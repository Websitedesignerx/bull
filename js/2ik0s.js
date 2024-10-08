window.CopyTheCodeToClipboard=(function (window, document, navigator){
var textArea,
copy;
function isOS(){
return navigator.userAgent.match(/ipad|iphone/i);
}
function createTextArea(text){
textArea=document.createElement('textArea');
textArea.value=text;
document.body.appendChild(textArea);
}
function selectText(){
var range,
selection;
if(isOS()){
range=document.createRange();
range.selectNodeContents(textArea);
selection=window.getSelection();
selection.removeAllRanges();
selection.addRange(range);
textArea.setSelectionRange(0, 999999);
}else{
textArea.select();
}}
function copyToClipboard(){
document.execCommand ('copy');
document.body.removeChild(textArea);
if(copyTheCode.redirect_url){
window.location.href=copyTheCode.redirect_url;
}}
copy=function (text){
createTextArea(text);
selectText();
copyToClipboard();
};
return {
copy: copy
};})(window, document, navigator);
(function ($){
CopyTheCode={
selector: copyTheCode.settings.selector||copyTheCode.selector||'pre',
button_position: copyTheCode.settings['button-position']||'inside',
init: function (){
this._bind();
this._initialize();
},
_bind: function (){
$(document).on('click', '.copy-the-code-button', CopyTheCode.copyCode);
$(document).on('click', '.copy-the-code-shortcode', CopyTheCode.copyShortcode);
},
_initialize: function (){
if(!$(copyTheCode.selectors).length){
return;
}
$(copyTheCode.selectors).each(function (index, el){
var button_copy_text=el['button_copy_text']||'';
var button_position=el['button_position']||'';
var button_text=el['button_text']||'';
var button_title=el['button_title']||'';
var selector=el['selector']||'';
var style=el['style']||'';
var copy_format=el['copy_format']||'';
$(selector).each(function (index, single_selector){
var buttonMarkup=CopyTheCode._getButtonMarkup(button_title, button_text, style);
$(single_selector).addClass('copy-the-code-target');
if('cover'!==style&&'outside'===button_position){
$(single_selector).wrap('<span data-copy-format="' + copy_format + '" data-button-text="' + button_text + '" data-button-position="' + button_position + '" data-button-copy-text="' + button_copy_text + '" data-style="' + style + '" data-button-title="' + button_title + '" data-selector="' + selector + '" class="copy-the-code-wrap copy-the-code-style-' + style + ' copy-the-code-outside-wrap"></span>');
$(single_selector).parent().prepend('<div class="copy-the-code-outside">' + buttonMarkup + '</div>');
}else{
$(single_selector).wrap('<span data-copy-format="' + copy_format + '" data-button-text="' + button_text + '" data-button-position="' + button_position + '" data-button-copy-text="' + button_copy_text + '" data-style="' + style + '" data-button-title="' + button_title + '" data-selector="' + selector + '" class="copy-the-code-wrap copy-the-code-style-' + style + ' copy-the-code-inside-wrap"></span>');
$(single_selector).append(buttonMarkup);
}
switch (style){
case 'svg-icon':
$(single_selector).find('.copy-the-code-button').html(copyTheCode.buttonSvg);
break;
case 'cover':
case 'button':
default:
$(single_selector).find('.copy-the-code-button').html(button_text);
break;
}});
});
},
_getButtonMarkup: function (button_title, button_text, style){
if('svg-icon'===style){
button_text=copyTheCode.buttonSvg;
}
return '<button class="copy-the-code-button" data-style="' + style + '" title="' + button_title + '">' + button_text + '</button>';
},
format: function (html){
var tab='\t';
var result='';
var indent='';
html.split(/>\s*</).forEach(function (element){
if(element.match(/^\/\w/)){
indent=indent.substring(tab.length);
}
result +=indent + '<' + element + '>\r\n';
if(element.match(/^<?\w[^>]*[^\/]$/)&&!element.startsWith("input")){
indent +=tab;
}});
return result.substring(1, result.length - 3);
},
copyShortcode: function (event){
event.preventDefault();
var btn=$(this),
oldText=btn.html(),
target=btn.attr('data-target')||'',
copy_content_as=btn.attr('data-copy-as')||copyTheCode.copy_content_as,
button_copy_text=btn.attr('data-button-copy-text')||'',
content=btn.attr('data-content')||'',
link=btn.attr('data-link')||'';
if(content){
CopyTheCodeToClipboard.copy(content);
btn.text(button_copy_text);
setTimeout(function (){
btn.html(oldText);
if(link){
window.open(link, '_blank').focus()
}}, 1000);
return;
}
var source=$(target);
if(!source.length){
btn.text('Not found!');
setTimeout(function (){
btn.text(oldText);
}, 1000);
return;
}
var html=source.html();
html=CopyTheCode.format(html);
if('html'!==copy_content_as){
var brRegex=/<br\s*[\/]?>/gi;
html=html.replace(brRegex, "\n");
var divRegex=/<div\s*[\/]?>/gi;
html=html.replace(divRegex, "\n");
var pRegex=/<p\s*[\/]?>/gi;
html=html.replace(pRegex, "\n");
var pRegex=/<li\s*[\/]?>/gi;
html=html.replace(pRegex, "\n");
html=html.replace(/(<([^>]+)>)/ig, '');
}
if('html'!==copy_content_as){
html=html.replace(/[\t\n]+/gm, ' ').trim();
}else{
var reWhiteSpace=new RegExp("/^\s+$/");
html=html.replace(reWhiteSpace, "");
}
var tempElement=$("<div id='temp-element'></div>");
$("body").append(tempElement);
html=$.trim(html);
$('#temp-element').html(html);
var html=$('#temp-element').html();
$('#temp-element').remove();
var tempHTML=html;
var tempPre=$("<textarea id='temp-pre'>"),
temp=$("<textarea>");
$("body").append(temp);
$("body").append(tempPre);
tempPre.html(tempHTML);
var content=tempPre.text();
content=content.trim();
if(copyTheCode.trim_lines){
content=content.replace(/^(?=\n)$|\s*$|\n\n+/gm,"");
if(content){
content=content.split('\n');
content=content.map(item=> {
return item.trim();
});
content=content.join('\n');
}}
temp.val(content).select();
CopyTheCodeToClipboard.copy(content.trim());
temp.remove();
tempPre.remove();
btn.text(button_copy_text);
setTimeout(function (){
btn.text(oldText);
}, 1000);
},
copyCode: function (event){
event.preventDefault();
var btn=$(this),
oldText=btn.text(),
parent=btn.parents('.copy-the-code-wrap'),
selector=parent.attr('data-selector')||'',
button_text=parent.attr('data-button-text')||'',
button_position=parent.attr('data-button-position')||'',
button_copy_text=parent.attr('data-button-copy-text')||'',
button_title=parent.attr('data-button-title')||'',
style=parent.attr('data-style')||''
copy_format=parent.attr('data-copy-format')||'';
if(selector.indexOf(' ') >=0){
var source=btn.parents('.copy-the-code-wrap');
}else{
var source=btn.parents('.copy-the-code-wrap').find(selector);
}
if('google-docs'===copy_format){
if('inside'===button_position){
$('.copy-the-code-button').hide();
}
var range=document.createRange();
range.selectNode(source[0]);
window.getSelection().addRange(range);
document.execCommand ('copy');
if(window.getSelection){
if(window.getSelection().empty){
window.getSelection().empty();
}else if(window.getSelection().removeAllRanges){
window.getSelection().removeAllRanges();
}}else if(document.selection){
document.selection.empty();
}
if('inside'===button_position){
$('.copy-the-code-button').show();
}}else{
var html=source.html();
var buttonMarkup=CopyTheCode._getButtonMarkup(button_title, button_text, style);
html=html.replace(buttonMarkup, '');
let allEmojis=CopyTheCode._getImages(html);
if(allEmojis){
allEmojis.map(function(image){
let alt=CopyTheCode._getAlt(image);
if(alt){
let cleanAlt=alt[0];
cleanAlt=cleanAlt.replaceAll('"', '');
cleanAlt=cleanAlt.replaceAll("'", '');
cleanAlt=cleanAlt.replaceAll('alt=', '');
html=html.replaceAll(image, cleanAlt);
}});
}
if(copyTheCode.remove_spaces){
html=html.replace(/^(?=\n)$|\s*$|\n\n+/gm,"");
}
if('html'!==copyTheCode.copy_content_as){
var brRegex=/<br\s*[\/]?>/gi;
html=html.replace(brRegex, "\n");
var divRegex=/<div\s*[\/]?>/gi;
html=html.replace(divRegex, "\n");
var pRegex=/<p\s*[\/]?>/gi;
html=html.replace(pRegex, "\n");
var pRegex=/<li\s*[\/]?>/gi;
html=html.replace(pRegex, "\n");
html=html.replace(/(<([^>]+)>)/ig, '');
}
var reWhiteSpace=new RegExp("/^\s+$/");
html=html.replace(reWhiteSpace, "");
var tempElement=$("<div id='temp-element'></div>");
$("body").append(tempElement);
html=$.trim(html);
$('#temp-element').html(html);
var html=$('#temp-element').html();
$('#temp-element').remove();
var tempHTML=html;
var reWhiteSpace=new RegExp("/^\s+$/");
tempHTML=tempHTML.replace(reWhiteSpace, "");
tempHTML=tempHTML.replace(button_text, '');
var tempPre=$("<textarea id='temp-pre'>"),
temp=$("<textarea>");
$("body").append(temp);
$("body").append(tempPre);
var content=tempPre.html(tempHTML).text();
content=$.trim(content);
temp.val(content).select();
CopyTheCodeToClipboard.copy(content);
temp.remove();
tempPre.remove();
}
btn.text(button_copy_text);
setTimeout(function (){
if('svg-icon'===style){
btn.html(copyTheCode.buttonSvg);
}else{
btn.text(oldText);
}}, 1000);
},
_getImages(content){
return content.match(/<img\s+[^>]*?src=("|')([^"']+)">/gi);
},
_getAlt(img){
return img.match(/alt=("|')([^"']+)"|'/gi);
}};
$(function (){
CopyTheCode.init();
});
})(jQuery);