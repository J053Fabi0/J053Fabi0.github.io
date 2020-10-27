let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/Documents/Actividades\ master
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +201 Trivia/src/index.html
badd +101 Trivia/src/index.js
badd +202 Trivia/src/TriviaGame.js
badd +84 Trivia/src/Images.js
badd +1 Trivia/src/Phrases.js
argglobal
%argdel
$argadd Trivia/src/index.html
edit Trivia/src/index.html
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=expr
setlocal fde=b:anyfold_ind_buffer[v:lnum-1]
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=99
setlocal fml=1
setlocal fdn=20
setlocal fen
2
normal! zo
3
normal! zo
107
normal! zo
117
normal! zo
177
normal! zo
178
normal! zo
179
normal! zo
180
normal! zo
192
normal! zo
200
normal! zo
208
normal! zo
222
normal! zo
223
normal! zo
224
normal! zo
225
normal! zo
237
normal! zo
245
normal! zo
253
normal! zo
268
normal! zo
269
normal! zo
270
normal! zo
274
normal! zo
285
normal! zo
288
normal! zo
291
normal! zo
319
normal! zo
328
normal! zo
329
normal! zo
338
normal! zo
347
normal! zo
348
normal! zo
let s:l = 296 - ((24 * winheight(0) + 19) / 38)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
296
normal! 063|
tabnext 1
if exists('s:wipebuf') && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 winminheight=1 winminwidth=1 shortmess=filnxtToOFc
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
