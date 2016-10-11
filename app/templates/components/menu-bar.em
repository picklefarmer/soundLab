ul class=menubar
  li{action 'click'}
    h1: =icon
    // &#x2609;

  if barVisible
    if song.routes.isFulfilled
      each song.routes as |page|
        li
          if page.x
            link-to page.name (concat "isOnline." page.route) isOnline page.y tagName="div"
          else
            link-to page.name page.route tagName="div"
  else
    if song.selected.isFulfilled
      li: h1 &#x2637; 
      li: h1: =song.selected.selection
      li: h1 &#x2637; 
      each songOptions as | path |
        li class="{{if (e-q isActive.option path) hit}}":  link-to path (concat "isOnline.song." path ) isOnline song.selected.selection tagName="div"
      li: h1 &#x2637; 
      li: =play-bar
      /each songToggles as | bool |
        =toggle-button name=bool bool=(get song bool)
          =bool
      li: =clock
  

