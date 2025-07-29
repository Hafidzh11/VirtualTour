(function(){
    var script = {
 "scrollBarMargin": 2,
 "id": "rootPlayer",
 "children": [
  "this.MainViewer",
  "this.Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
  "this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
  "this.Container_57C1AC65_46EC_7CF8_41C3_7D751A91ED3B",
  "this.Container_504301D9_45C1_1785_41A3_F6DA6F57A6FD",
  "this.Image_4A68500C_45A4_4448_41CE_FB3B1BAEA781",
  "this.HTMLText_4AF1BB37_45AB_C458_41C0_69D24B6F89B7",
  "this.Container_453166ED_5064_E0C2_41BC_A6F496CB6806",
  "this.veilPopupPanorama",
  "this.zoomImagePopupPanorama",
  "this.closeButtonPopupPanorama"
 ],
 "scrollBarVisible": "rollOver",
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_57C22C64_46EC_7CF9_41B1_505373026857], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_57C1EC65_46EC_7CF8_41A0_CDF7DC55813B].forEach(function(component) { component.set('visible', false); }) }",
 "layout": "absolute",
 "width": "100%",
 "scripts": {
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "unregisterKey": function(key){  delete window[key]; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "existsKey": function(key){  return key in window; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "getKey": function(key){  return window[key]; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "registerKey": function(key, value){  window[key] = value; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); }
 },
 "scrollBarWidth": 10,
 "minHeight": 20,
 "shadow": false,
 "defaultVRPointer": "laser",
 "buttonToggleFullscreen": "this.IconButton_57C1EC65_46EC_7CF8_41A0_CDF7DC55813B",
 "verticalAlign": "top",
 "downloadEnabled": false,
 "paddingRight": 0,
 "height": "100%",
 "contentOpaque": false,
 "minWidth": 20,
 "buttonToggleMute": "this.IconButton_57C1DC65_46EC_7CF8_4198_200A6F520095",
 "borderRadius": 0,
 "horizontalAlign": "left",
 "borderSize": 0,
 "definitions": [{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -6.25,
   "backwardYaw": 156.7,
   "distance": 1,
   "panorama": "this.panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C"
  }
 ],
 "label": "Koridor Ruang Lab",
 "id": "panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D",
 "hfovMax": 130,
 "audios": [
  "this.audio_56404FD9_4543_0B85_41CE_BA25DF6738E4"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2DB1CF33_3F43_2A55_4183_17E472992590",
  "this.overlay_5DDB3FDD_46AC_7BC8_41C4_BCB6BD6F8340"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 1.1,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5E318E30_5061_0E80_41D1_FBA010436E2A",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -2.1,
   "backwardYaw": -177.51,
   "distance": 1,
   "panorama": "this.panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -177.93,
   "backwardYaw": -95.67,
   "distance": 1,
   "panorama": "this.panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E"
  }
 ],
 "label": "Koridor Kelas",
 "id": "panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56",
 "hfovMax": 130,
 "audios": [
  "this.audio_56378AB0_4543_1583_41A0_E3543832A549"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2D9843F4_3F47_19D3_41C9_358B8B62AC22",
  "this.overlay_5D6A20AA_46A4_4448_41D0_1906B2545729"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_camera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4"
  }
 ],
 "label": "Ruang Guru",
 "id": "panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508",
 "hfovMax": 130,
 "audios": [
  "this.audio_566B38D9_4542_F584_41CB_6B3616A53C54"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2FB9236A_3F47_3AF7_41CB_F662EEE0E60C"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "popupDistance": 100,
 "popupMaxHeight": "95%",
 "showEasing": "cubic_in",
 "showDuration": 500,
 "id": "popup_1C829608_3FCF_1A33_41B2_81D161E1A2E7",
 "rotationX": 0,
 "rotationZ": 0,
 "hideDuration": 500,
 "hideEasing": "cubic_out",
 "class": "PopupPanoramaOverlay",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_1C829608_3FCF_1A33_41B2_81D161E1A2E7_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 576
   }
  ]
 },
 "hfov": 6,
 "yaw": 23.35,
 "pitch": -4.74
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 6.12,
   "backwardYaw": -2.1,
   "distance": 1,
   "panorama": "this.panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 173.52,
   "backwardYaw": 2.42,
   "distance": 1,
   "panorama": "this.panorama_3156142C_3F45_1E73_41B7_353A81B89835"
  }
 ],
 "label": "Koridor Ruang Perpustakaan",
 "id": "panorama_316B8F01_3F45_2A35_41B4_E0910A12955F",
 "hfovMax": 130,
 "audios": [
  "this.audio_562558E5_4543_158C_41A7_A085508A63C4"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2DDCDA6E_3F47_2ACF_41CE_B5DDD3906FB2",
  "this.overlay_5DFAD8B0_46A4_4458_41CB_2304DFD83AB9"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -3.79,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_4067BA2B_5061_F687_41CF_D515E6AC03D3",
 "automaticZoomSpeed": 10
},
{
 "class": "PlayList",
 "id": "mainPlayList",
 "items": [
  {
   "media": "this.panorama_372264E4_3CEC_C7B4_4151_94D194AF4546",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_camera"
  },
  {
   "media": "this.panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_camera"
  },
  {
   "media": "this.panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_camera"
  },
  {
   "media": "this.panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_camera"
  },
  {
   "media": "this.panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_camera"
  },
  {
   "media": "this.panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_camera"
  },
  {
   "media": "this.panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_camera"
  },
  {
   "media": "this.panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_camera"
  },
  {
   "media": "this.panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_camera"
  },
  {
   "media": "this.panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_camera"
  },
  {
   "media": "this.panorama_3141A582_3F43_3E37_41BA_417EFE1BA192",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_camera"
  },
  {
   "media": "this.panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_camera"
  },
  {
   "media": "this.panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_camera"
  },
  {
   "media": "this.panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_camera"
  },
  {
   "media": "this.panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_camera"
  },
  {
   "media": "this.panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_camera"
  },
  {
   "media": "this.panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_camera"
  },
  {
   "media": "this.panorama_316B8F01_3F45_2A35_41B4_E0910A12955F",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_camera"
  },
  {
   "media": "this.panorama_3156142C_3F45_1E73_41B7_353A81B89835",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3156142C_3F45_1E73_41B7_353A81B89835_camera"
  },
  {
   "media": "this.panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_camera"
  },
  {
   "media": "this.panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_camera"
  },
  {
   "media": "this.panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_camera"
  },
  {
   "media": "this.panorama_316D98BA_3F47_3657_41C6_9BACE880DB72",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_camera"
  },
  {
   "media": "this.panorama_31767D68_3F47_6EF3_4187_81165D5A0E07",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_camera"
  },
  {
   "media": "this.panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_camera"
  },
  {
   "media": "this.panorama_317B4917_3F47_165D_41AB_976EC50857C8",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_317B4917_3F47_165D_41AB_976EC50857C8_camera"
  },
  {
   "media": "this.panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC",
   "end": "this.trigger('tourEnded')",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_camera"
  }
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.9,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_40B1DC4F_5061_F280_41D3_2E559596B596",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -177.51,
   "backwardYaw": -2.1,
   "distance": 1,
   "panorama": "this.panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -2.1,
   "backwardYaw": 6.12,
   "distance": 1,
   "panorama": "this.panorama_316B8F01_3F45_2A35_41B4_E0910A12955F"
  }
 ],
 "label": "Koridor Kelas",
 "id": "panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25",
 "hfovMax": 130,
 "audios": [
  "this.audio_5638198C_4543_379C_41D0_BF229A761282"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2DF2E2CC_3F47_FA33_41C2_34198EA4BAF9",
  "this.overlay_5B43535C_46A4_44C8_41B2_688A671683C5"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 23.37,
   "backwardYaw": 175.28,
   "distance": 1,
   "panorama": "this.panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 176.21,
   "backwardYaw": -8.11,
   "distance": 1,
   "panorama": "this.panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 0.08,
   "backwardYaw": -171.26,
   "distance": 1,
   "panorama": "this.panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5"
  }
 ],
 "label": "Koridor Kelas",
 "id": "panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B",
 "hfovMax": 130,
 "audios": [
  "this.audio_561F1113_4541_7485_411C_59794D8F2B68"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2FDCAC7D_3F45_6ECD_419A_B8082B9CE4A9",
  "this.overlay_2FC3A2C2_3F45_1A37_41B9_42872B3D66AF",
  "this.overlay_2EEEF88A_3F43_3637_4199_7BEC08C9ABA6",
  "this.overlay_5B345C1C_46A4_DC48_41C0_0D2E8FDB0D80"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.9,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_409CCCBB_5061_F380_41B2_74797B917871",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_5664587D_4541_357D_41B4_D3F2CFE93CE9",
 "data": {
  "label": "Audio"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -175.18,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5E4BAE0E_5061_0E80_41D0_81F312845705",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 0.14,
   "backwardYaw": -2.1,
   "distance": 1,
   "panorama": "this.panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 177.67,
   "backwardYaw": -163.12,
   "distance": 1,
   "panorama": "this.panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20"
  }
 ],
 "label": "Koridor Ruang Kepala Sekolah",
 "id": "panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964",
 "hfovMax": 130,
 "audios": [
  "this.audio_5655213B_4543_1484_41BE_AFA62DCE0B9F"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2FA3DC33_3F4C_EE54_41C6_34D1DFA78CE1",
  "this.overlay_5C30CCF7_46AC_7DD8_41CC_D98829CBE5DF"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_500E3CC2_4547_0D84_41D1_1F0597D07C35",
 "data": {
  "label": "Audio"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -23.3,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5F30F796_5061_FD80_4184_4253DBC90275",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -173.88,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5ECCEFEF_5061_0D9F_41BE_0131FE269D9B",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -144.68,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5EBA8010_5061_1281_41A6_6B00280BD5FA",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PlayList",
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "items": [
  {
   "media": "this.panorama_372264E4_3CEC_C7B4_4151_94D194AF4546",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_camera"
  },
  {
   "media": "this.panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_camera"
  },
  {
   "media": "this.panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_camera"
  },
  {
   "media": "this.panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_camera"
  },
  {
   "media": "this.panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_camera"
  },
  {
   "media": "this.panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_camera"
  },
  {
   "media": "this.panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_camera"
  },
  {
   "media": "this.panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_camera"
  },
  {
   "media": "this.panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_camera"
  },
  {
   "media": "this.panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_camera"
  },
  {
   "media": "this.panorama_3141A582_3F43_3E37_41BA_417EFE1BA192",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_camera"
  },
  {
   "media": "this.panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_camera"
  },
  {
   "media": "this.panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_camera"
  },
  {
   "media": "this.panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_camera"
  },
  {
   "media": "this.panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_camera"
  },
  {
   "media": "this.panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_camera"
  },
  {
   "media": "this.panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_camera"
  },
  {
   "media": "this.panorama_316B8F01_3F45_2A35_41B4_E0910A12955F",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_camera"
  },
  {
   "media": "this.panorama_3156142C_3F45_1E73_41B7_353A81B89835",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3156142C_3F45_1E73_41B7_353A81B89835_camera"
  },
  {
   "media": "this.panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_camera"
  },
  {
   "media": "this.panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_camera"
  },
  {
   "media": "this.panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_camera"
  },
  {
   "media": "this.panorama_316D98BA_3F47_3657_41C6_9BACE880DB72",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_camera"
  },
  {
   "media": "this.panorama_31767D68_3F47_6EF3_4187_81165D5A0E07",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_camera"
  },
  {
   "media": "this.panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_camera"
  },
  {
   "media": "this.panorama_317B4917_3F47_165D_41AB_976EC50857C8",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_317B4917_3F47_165D_41AB_976EC50857C8_camera"
  },
  {
   "media": "this.panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 26, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_camera"
  }
 ]
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_56308365_4543_F48C_41BF_112A718B998B",
 "data": {
  "label": "Audio"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 26.25,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5FDAC885_5061_F380_41A4_266C3F103D83",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -6.48,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_40130B72_5061_F681_4187_C4A7470F98DE",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_5612C1C6_4543_378C_41C5_6440D6F37C28",
 "data": {
  "label": "Audio"
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 6.72,
   "backwardYaw": -89.18,
   "distance": 1,
   "panorama": "this.panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 6.72,
   "backwardYaw": -89.18,
   "distance": 1,
   "panorama": "this.panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE"
  }
 ],
 "label": "Gerbang",
 "id": "panorama_372264E4_3CEC_C7B4_4151_94D194AF4546",
 "hfovMax": 130,
 "audios": [
  "this.audio_500E3CC2_4547_0D84_41D1_1F0597D07C35"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2965B1E2_3CF4_41AC_41C1_FD27792279E3"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_5655213B_4543_1484_41BE_AFA62DCE0B9F",
 "data": {
  "label": "Audio"
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -95.67,
   "backwardYaw": -177.93,
   "distance": 1,
   "panorama": "this.panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 88.71,
   "backwardYaw": -2.1,
   "distance": 1,
   "panorama": "this.panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C"
  }
 ],
 "label": "Koridor Kelas",
 "id": "panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E",
 "hfovMax": 130,
 "audios": [
  "this.audio_56308365_4543_F48C_41BF_112A718B998B"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2DE28F71_3F45_6AD5_41CB_C1580EFB27C3",
  "this.overlay_5D43DCE5_46A4_FDF8_41C1_08A41981F198"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -171.26,
   "backwardYaw": 0.08,
   "distance": 1,
   "panorama": "this.panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -170.26,
   "backwardYaw": 80.07,
   "distance": 1,
   "panorama": "this.panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 4.62,
   "backwardYaw": -176.33,
   "distance": 1,
   "panorama": "this.panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0"
  }
 ],
 "label": "Koridor Kelas",
 "id": "panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5",
 "hfovMax": 130,
 "audios": [
  "this.audio_567B621E_4541_14BF_41B9_9C364E6119E6"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2FAF86F3_3F5D_3BD5_41C9_698F918D4F9F",
  "this.overlay_2F4D49C8_3F5D_3633_41CE_BD577C9D1012",
  "this.overlay_2FFB3721_3F5D_1A75_41C6_DE19B4825973",
  "this.overlay_5CE8CF6E_46A4_7CC8_41B8_A662AC8D929A"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 2.07,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_40C1EC2E_5061_F280_41C9_CDE838438941",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -175.38,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5F98C967_5061_F28F_41D0_C7AFFFA72655",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_56E2931B_4541_1484_41AE_B59079A2D98E",
 "data": {
  "label": "Audio"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -177.15,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5FEC9863_5061_F280_41B6_E77A48A2ECB0",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 4.82,
   "backwardYaw": -167.39,
   "distance": 1,
   "panorama": "this.panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 163.97,
   "backwardYaw": -179.1,
   "distance": 1,
   "panorama": "this.panorama_3156142C_3F45_1E73_41B7_353A81B89835"
  }
 ],
 "label": "Koridor Kelas",
 "id": "panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0",
 "hfovMax": 130,
 "audios": [
  "this.audio_5612C1C6_4543_378C_41C5_6440D6F37C28"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2DBC1134_3F45_1653_41C7_AF1ABA0DA60D",
  "this.overlay_5D798749_46A4_4CC8_41C8_C84AA2FA360D"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_317B4917_3F47_165D_41AB_976EC50857C8_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -2.33,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5FFD6842_5061_F280_41D3_5160BB0E900F",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -2.1,
   "backwardYaw": 0.14,
   "distance": 1,
   "panorama": "this.panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -178.9,
   "backwardYaw": -0.25,
   "distance": 1,
   "panorama": "this.panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6"
  }
 ],
 "label": "Koridor Kelas",
 "id": "panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A",
 "hfovMax": 130,
 "audios": [
  "this.audio_5605AEAB_4543_0D84_41C7_8F154C81DC42"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2D535005_3F43_763D_41BA_6C4EFD6411EC",
  "this.overlay_5D259042_46A4_C439_41A2_616ABC9A9EAF"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -153.75,
   "backwardYaw": 35.32,
   "distance": 1,
   "panorama": "this.panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 26.76,
   "backwardYaw": -154.21,
   "distance": 1,
   "panorama": "this.panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC"
  }
 ],
 "label": "Koridor Kelas",
 "id": "panorama_317B4917_3F47_165D_41AB_976EC50857C8",
 "hfovMax": 130,
 "audios": [
  "this.audio_56D34265_4541_748C_41C8_F395FA7C02E1"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2C2EE4A6_3F45_1E7F_41C8_A5D5BB95F5AF",
  "this.overlay_5DA8455C_465C_4CC8_41D0_3BC4ABC0E839"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -23.97,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5E2DEEBD_5061_0F80_41C0_0EDC2859B4AC",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_56661858_4541_1483_41C2_7C886CC32F6E",
 "data": {
  "label": "Audio"
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -89.18,
   "backwardYaw": 6.72,
   "distance": 1,
   "panorama": "this.panorama_372264E4_3CEC_C7B4_4151_94D194AF4546"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 12.16,
   "backwardYaw": -136.69,
   "distance": 1,
   "panorama": "this.panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B"
  }
 ],
 "label": "Halaman Depan",
 "id": "panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE",
 "hfovMax": 130,
 "audios": [
  "this.audio_5781F28C_4541_1583_41BB_5FC9A9C702DC"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2ACDBD4B_3CEC_C6F3_41C0_D07F461C496E",
  "this.overlay_308D4EAF_3F47_2A4D_41A8_CDEBDE400B72",
  "this.overlay_5A662A3B_4664_C448_4184_08C55AEA07C6"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_5781F28C_4541_1583_41BB_5FC9A9C702DC",
 "data": {
  "label": "Audio"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 3.67,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5FA8A90C_5061_F280_41CE_B1D411B4D596",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 173.75,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5E0A2F27_5061_0E80_41A0_13138EB433A1",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -21.54,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5F0F4820_5061_F280_41C4_FCF686EB4C8F",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.75,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_40F0FBC7_5061_F580_41C1_238104F9D9C6",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_56F065FB_4541_1F84_41C9_1BA6FECD1650",
 "data": {
  "label": "Audio"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_5638198C_4543_379C_41D0_BF229A761282",
 "data": {
  "label": "Audio"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 16.88,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_408C1CE0_5061_F380_41C7_802A6A2CD9CF",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonToggleGyroscope": "this.IconButton_57C22C64_46EC_7CF9_41B1_505373026857",
 "mouseControlMode": "drag_acceleration",
 "id": "MainViewerPanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "buttonToggleHotspots": "this.IconButton_57C1FC65_46EC_7CF8_41B3_ED1669FBC5AC"
},
{
 "class": "FadeInEffect",
 "id": "effect_45D5786C_5064_2FC2_41D1_3A0D5D9FA25A",
 "easing": "linear",
 "duration": 1000
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 156.03,
   "backwardYaw": 19.81,
   "distance": 1,
   "panorama": "this.panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -1.19,
   "backwardYaw": 158.46,
   "distance": 1,
   "panorama": "this.panorama_3141A582_3F43_3E37_41BA_417EFE1BA192"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -163.12,
   "backwardYaw": 177.67,
   "distance": 1,
   "panorama": "this.panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964"
  }
 ],
 "label": "Koridor Kelas",
 "id": "panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20",
 "hfovMax": 130,
 "audios": [
  "this.audio_5652444E_4543_1C9F_41B0_8B2230F6C437"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2FA6A022_3F43_1677_4181_3868324D9F79",
  "this.overlay_2ECEBB78_3F43_6AD4_41CF_31086068184B",
  "this.overlay_5D461DDB_46AF_DFC8_41C0_25F8EDF19A6E"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -154.21,
   "backwardYaw": 26.76,
   "distance": 1,
   "panorama": "this.panorama_317B4917_3F47_165D_41AB_976EC50857C8"
  }
 ],
 "label": "Koridor Kelas",
 "id": "panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC",
 "hfovMax": 130,
 "audios": [
  "this.audio_56D83676_4541_1C8C_41AB_168225B6122B"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_5D8B573E_465C_CC48_41A3_E829741D0CAF"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_5652444E_4543_1C9F_41B0_8B2230F6C437",
 "data": {
  "label": "Audio"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.81,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5ED4FFAC_5061_0D81_41B7_EA366689E010",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 8.74,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_40359B01_5061_F683_41D2_4045C877092B",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 171.89,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_40447AC2_5061_F781_41C3_213BCEDB00F8",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -143.61,
   "backwardYaw": 2.85,
   "distance": 1,
   "panorama": "this.panorama_31767D68_3F47_6EF3_4187_81165D5A0E07"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 35.32,
   "backwardYaw": -153.75,
   "distance": 1,
   "panorama": "this.panorama_317B4917_3F47_165D_41AB_976EC50857C8"
  }
 ],
 "label": "Koridor Kelas",
 "id": "panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19",
 "hfovMax": 130,
 "audios": [
  "this.audio_56E2931B_4541_1484_41AE_B59079A2D98E"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2C3B7628_3F45_3A74_41C9_FC88BE837619",
  "this.overlay_5D94443F_465C_4C48_41CA_482A12DB6945"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_561BC06D_4543_149D_4185_04C782846E4E",
 "data": {
  "label": "Audio"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -16.03,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_4025AB48_5061_F681_41A3_7376995836F2",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_562558E5_4543_158C_41A7_A085508A63C4",
 "data": {
  "label": "Audio"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.92,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5FCAC8A7_5061_F380_41D4_109FA0DE231C",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3156142C_3F45_1E73_41B7_353A81B89835_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.9,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5E3B7E76_5061_0E80_41D3_35AEC4CF874C",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_56D83676_4541_1C8C_41AB_168225B6122B",
 "data": {
  "label": "Audio"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.86,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_40037B9B_5061_F580_41D0_C670B59A31B5",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -167.39,
   "backwardYaw": 4.82,
   "distance": 1,
   "panorama": "this.panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -0.25,
   "backwardYaw": -178.9,
   "distance": 1,
   "panorama": "this.panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 175.28,
   "backwardYaw": 23.37,
   "distance": 1,
   "panorama": "this.panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B"
  }
 ],
 "label": "Koridor Kelas",
 "id": "panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6",
 "hfovMax": 130,
 "audios": [
  "this.audio_561BC06D_4543_149D_4185_04C782846E4E"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2DEA6164_3F43_36F3_41A1_23571EFF91F4",
  "this.overlay_2118790C_3FC3_7633_41BB_176947F3AE96",
  "this.overlay_21E8C530_3FCD_3E53_41AA_9A67018EAACB",
  "this.overlay_5D10B6CD_46A4_4DC8_41CA_F98932EA6AE7"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 19.81,
   "backwardYaw": 156.03,
   "distance": 1,
   "panorama": "this.panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0"
  }
 ],
 "label": "Koridor Ruang Guru",
 "id": "panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4",
 "hfovMax": 130,
 "audios": [
  "this.audio_56566640_4543_3C83_41C3_732421EE0EB6"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2E53B952_3F45_36D4_4161_A4179A819C36",
  "this.overlay_5D3F190D_46AC_C448_4116_4C2A2450D160"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -153.24,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5E457DEC_5061_0D80_41CC_D3541BDEA093",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_56404FD9_4543_0B85_41CE_BA25DF6738E4",
 "data": {
  "label": "Audio"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.9,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5EDE2FCD_5061_0D83_41D1_8C71EEC4E5CF",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_57894F81_4541_0B84_41C1_4ADB14051912",
 "data": {
  "label": "Audio"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 9.74,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_415A5D4F_5061_F280_41A3_CF7E3B4B578F",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_566B38D9_4542_F584_41CB_6B3616A53C54",
 "data": {
  "label": "Audio"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -147.25,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5E017F05_5061_0E80_4172_205F37D029CA",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 158.46,
   "backwardYaw": -1.19,
   "distance": 1,
   "panorama": "this.panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20"
  }
 ],
 "label": "Mushola",
 "id": "panorama_3141A582_3F43_3E37_41BA_417EFE1BA192",
 "hfovMax": 130,
 "audios": [
  "this.audio_565F225D_4543_74BC_41C1_73DCD7CF2203"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2E4A2647_3F4D_3A3C_41B7_AACE1A80022B"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_56378AB0_4543_1583_41A0_E3543832A549",
 "data": {
  "label": "Audio"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 47.92,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5E145EE3_5061_0F80_41D0_73C47830A760",
 "automaticZoomSpeed": 10
},
{
 "from": "top",
 "class": "SlideInEffect",
 "id": "effect_2E112D86_3CFC_4674_41A1_097EBE855E72",
 "easing": "linear",
 "duration": 0
},
{
 "levels": [
  {
   "url": "media/popup_1C829608_3FCF_1A33_41B2_81D161E1A2E7_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1080
  },
  {
   "url": "media/popup_1C829608_3FCF_1A33_41B2_81D161E1A2E7_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 576
  },
  {
   "url": "media/popup_1C829608_3FCF_1A33_41B2_81D161E1A2E7_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 288
  }
 ],
 "class": "ImageResource",
 "id": "ImageResource_1B336EAD_3FCD_EA4D_419D_646DA9F345DF"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 2.85,
   "backwardYaw": -143.61,
   "distance": 1,
   "panorama": "this.panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -132.08,
   "backwardYaw": 160.08,
   "distance": 1,
   "panorama": "this.panorama_316D98BA_3F47_3657_41C6_9BACE880DB72"
  }
 ],
 "label": "Koridor Kelas",
 "id": "panorama_31767D68_3F47_6EF3_4187_81165D5A0E07",
 "hfovMax": 130,
 "audios": [
  "this.audio_56F4E48A_4541_3D84_41D0_F7B84D15989A"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2CD075F8_3F47_79D3_41C6_F91E12B8E89E",
  "this.overlay_5DBC2AC8_465C_45C8_41B8_555CB9413CA1"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -19.92,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_40D0EC0B_5061_F280_41D3_1D8766B958B0",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 90.82,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5EE1BF6A_5061_0E80_41CE_DE66588595A4",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_561F1113_4541_7485_411C_59794D8F2B68",
 "data": {
  "label": "Audio"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -99.93,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5FBB68D5_5061_F380_41D2_E2F9FF6A64BD",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_56D34265_4541_748C_41C8_F395FA7C02E1",
 "data": {
  "label": "Audio"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_56F4E48A_4541_3D84_41D0_F7B84D15989A",
 "data": {
  "label": "Audio"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -177.58,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5E20EE9B_5061_0F80_41B2_F8C43F9FE04E",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_565F225D_4543_74BC_41C1_73DCD7CF2203",
 "data": {
  "label": "Audio"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 36.39,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_40E02BE9_5061_F580_41B7_56F5D4264D4C",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -91.29,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5EF4AF48_5061_0E80_41C2_E2BFEE565A62",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -160.19,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5F1E97FE_5061_FD80_41CF_8639D73B55A4",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -4.72,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_40578A75_5061_F683_41B5_D578C8FA63B3",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_camera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -136.69,
   "backwardYaw": 12.16,
   "distance": 1,
   "panorama": "this.panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 32.75,
   "backwardYaw": -13.16,
   "distance": 1,
   "panorama": "this.panorama_316D98BA_3F47_3657_41C6_9BACE880DB72"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -8.11,
   "backwardYaw": 176.21,
   "distance": 1,
   "panorama": "this.panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B"
  }
 ],
 "label": "Halaman Depan Piket",
 "id": "panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B",
 "hfovMax": 130,
 "audios": [
  "this.audio_57894F81_4541_0B84_41C1_4ADB14051912"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_30C15EE5_3F47_6BFD_41C0_0357028B93AB",
  "this.overlay_2ECA2182_3F45_1637_419A_4A06612EDBCB",
  "this.overlay_1C8C9CEC_3FCF_2FF3_41C8_EB246266C19B",
  "this.popup_1C829608_3FCF_1A33_41B2_81D161E1A2E7",
  "this.overlay_5B85CEE3_465C_3DF8_4180_6A9208834439"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 160.08,
   "backwardYaw": -132.08,
   "distance": 1,
   "panorama": "this.panorama_31767D68_3F47_6EF3_4187_81165D5A0E07"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -13.16,
   "backwardYaw": 32.75,
   "distance": 1,
   "panorama": "this.panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B"
  }
 ],
 "label": "Koridor Kelas",
 "id": "panorama_316D98BA_3F47_3657_41C6_9BACE880DB72",
 "hfovMax": 130,
 "audios": [
  "this.audio_56F065FB_4541_1F84_41C9_1BA6FECD1650"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2C2D86A7_3F47_7A7C_41C1_E09F62FEB81E",
  "this.overlay_5D8EB2BD_465B_C448_41BF_88089DEB4D22"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_561572BF_4543_15FC_41BD_CB8F81949186",
 "data": {
  "label": "Audio"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0.9,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5F2EB7DC_5061_FD80_41C3_9F1D139A0BD1",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -167.84,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5F8639A5_5061_F583_41CD_EA7ADEF16A95",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_567B621E_4541_14BF_41B9_9C364E6119E6",
 "data": {
  "label": "Audio"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 84.33,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_416A7D29_5061_F280_41D1_B259F7E09B34",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 43.31,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_40AF4C96_5061_F380_41C3_02174CA834EC",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_5605AEAB_4543_0D84_41C7_8F154C81DC42",
 "data": {
  "label": "Audio"
 }
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_5635644D_4543_1C9C_41B6_E59DDF73678F",
 "data": {
  "label": "Audio"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 12.61,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5F2087BA_5061_FD80_41CA_E034BBE23B99",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 166.84,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_407609DE_5061_F5BA_41BA_6B9781C6B2BE",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -179.1,
   "backwardYaw": 163.97,
   "distance": 1,
   "panorama": "this.panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 2.42,
   "backwardYaw": 173.52,
   "distance": 1,
   "panorama": "this.panorama_316B8F01_3F45_2A35_41B4_E0910A12955F"
  }
 ],
 "label": "Koridor Ruang Perpustakaan",
 "id": "panorama_3156142C_3F45_1E73_41B7_353A81B89835",
 "hfovMax": 130,
 "audios": [
  "this.audio_561572BF_4543_15FC_41BD_CB8F81949186"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2D999925_3F45_167D_41C2_2B4EE0E0BF2B",
  "this.overlay_5DF42BC8_46A4_3BC8_41D1_5485036C5AAA"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 156.7,
   "backwardYaw": -6.25,
   "distance": 1,
   "panorama": "this.panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -2.1,
   "backwardYaw": 88.71,
   "distance": 1,
   "panorama": "this.panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E"
  }
 ],
 "label": "Koridor Kelas",
 "id": "panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C",
 "hfovMax": 130,
 "audios": [
  "this.audio_5635644D_4543_1C9C_41B6_E59DDF73678F"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2B7E2409_3F45_3E35_4191_B0F9618C15A0",
  "this.overlay_5DB174D8_46AB_CDC8_41C4_C53CD0271331"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -156.63,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5E352E53_5061_0E80_41BF_1E99F750B5F6",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 2.49,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_417C0D03_5061_F280_4160_14EA91298B39",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -173.28,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_40BF1C73_5061_F280_41BC_ED3A857FCF48",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 80.07,
   "backwardYaw": -170.26,
   "distance": 1,
   "panorama": "this.panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5"
  }
 ],
 "label": "Ruangan Kelas",
 "id": "panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939",
 "hfovMax": 130,
 "audios": [
  "this.audio_5664587D_4541_357D_41B4_D3F2CFE93CE9"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2F8FC4BC_3F45_3E53_41C2_E26B0061FCE6"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 25.79,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5EA6C032_5061_1281_41CF_14751EA7DCFE",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -176.33,
   "backwardYaw": 4.62,
   "distance": 1,
   "panorama": "this.panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5"
  }
 ],
 "label": "Koridor ",
 "id": "panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0",
 "hfovMax": 130,
 "audios": [
  "this.audio_56661858_4541_1483_41C2_7C886CC32F6E"
 ],
 "pitch": 0,
 "overlays": [
  "this.overlay_2F8874DD_3F45_FFCD_41C2_8DB3D375774F",
  "this.overlay_2ED0D553_3F45_1ED5_41A7_D491D569A6D3",
  "this.overlay_5D7C62A4_46AC_4479_41A3_BA2ACB9B6E11"
 ],
 "vfov": 180,
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "autoplay": true,
 "id": "audio_56566640_4543_3C83_41C3_732421EE0EB6",
 "data": {
  "label": "Audio"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 90.82,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5EE83F8A_5061_0D81_41D0_60E6D86C81FB",
 "automaticZoomSpeed": 10
},
{
 "toolTipFontSize": 13,
 "toolTipOpacity": 0.5,
 "id": "MainViewer",
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "right": 0,
 "width": "100%",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 7,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "minHeight": 50,
 "shadow": false,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "paddingRight": 0,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "height": "100%",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "minWidth": 100,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": true,
 "toolTipTextShadowOpacity": 0,
 "toolTipShadowOpacity": 0,
 "toolTipFontFamily": "Georgia",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBottom": 0,
 "paddingLeft": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "#000000",
 "toolTipFontColor": "#FFFFFF",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionMode": "blending",
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "top": 0,
 "toolTipPaddingTop": 7,
 "toolTipPaddingLeft": 10,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 10,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "data": {
  "name": "Main Viewer"
 },
 "paddingBottom": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "class": "ViewerArea"
},
{
 "class": "Container",
 "id": "Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
 "left": "0.08%",
 "children": [
  "this.IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8",
  "this.IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8"
 ],
 "layout": "horizontal",
 "width": "13.587%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "shadow": false,
 "verticalAlign": "middle",
 "bottom": "0%",
 "height": 90,
 "paddingRight": 30,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "horizontalAlign": "right",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": true,
 "gap": 3,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Button"
 },
 "paddingBottom": 0,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0
},
{
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "shadow": false,
 "horizontalAlign": "left",
 "layout": "absolute",
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingRight": 0,
 "minHeight": 1,
 "backgroundOpacity": 0.6,
 "minWidth": 1,
 "bottom": "0%",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---PANORAMA LIST"
 },
 "gap": 10,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "left": "0%",
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "shadow": false,
 "horizontalAlign": "left",
 "layout": "absolute",
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingRight": 0,
 "minHeight": 1,
 "backgroundOpacity": 0.6,
 "minWidth": 1,
 "bottom": "0%",
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---PHOTOALBUM"
 },
 "gap": 10,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "id": "Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
 "left": "0%",
 "children": [
  "this.Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
  "this.Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F"
 ],
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "shadow": false,
 "horizontalAlign": "left",
 "layout": "absolute",
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingRight": 0,
 "minHeight": 1,
 "backgroundOpacity": 0.6,
 "minWidth": 1,
 "bottom": "0%",
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#04A3E1",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---REALTOR"
 },
 "gap": 10,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "id": "Container_57C1AC65_46EC_7CF8_41C3_7D751A91ED3B",
 "width": 115,
 "scrollBarMargin": 2,
 "right": "0.36%",
 "children": [
  "this.Container_57C26C64_46EC_7CF8_41D1_91AB8D2E84C6",
  "this.Container_57C20C64_46EC_7CF8_41C7_217BD4840C09"
 ],
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "shadow": false,
 "horizontalAlign": "left",
 "layout": "absolute",
 "top": "0%",
 "verticalAlign": "top",
 "height": 580.25,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--SETTINGS"
 },
 "gap": 10,
 "paddingBottom": 0,
 "overflow": "scroll",
 "class": "Container",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0
},
{
 "id": "Container_504301D9_45C1_1785_41A3_F6DA6F57A6FD",
 "left": "0%",
 "children": [
  "this.Container_5043D1D8_45C1_1783_41B2_273C05231740"
 ],
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "shadow": false,
 "horizontalAlign": "left",
 "layout": "absolute",
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingRight": 0,
 "minHeight": 1,
 "backgroundOpacity": 0.6,
 "minWidth": 1,
 "bottom": "0%",
 "click": "this.setComponentVisibility(this.Container_504301D9_45C1_1785_41A3_F6DA6F57A6FD, false, 0, null, null, false)",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---FLOORPLAN"
 },
 "gap": 10,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "maxHeight": 266,
 "maxWidth": 266,
 "id": "Image_4A68500C_45A4_4448_41CE_FB3B1BAEA781",
 "left": "2.63%",
 "width": "7.428%",
 "url": "skin/Image_4A68500C_45A4_4448_41CE_FB3B1BAEA781.png",
 "minHeight": 1,
 "shadow": false,
 "top": "1.82%",
 "verticalAlign": "middle",
 "height": "14.096%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "horizontalAlign": "center",
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Logo SMP"
 },
 "class": "Image",
 "paddingBottom": 0,
 "paddingLeft": 0
},
{
 "id": "HTMLText_4AF1BB37_45AB_C458_41C0_69D24B6F89B7",
 "left": "9.06%",
 "width": "22.068%",
 "scrollBarMargin": 2,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "shadow": false,
 "top": "6.3%",
 "height": "10.463%",
 "paddingRight": 10,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderColor": "#000000",
 "borderSize": 3,
 "scrollBarColor": "#000000",
 "paddingTop": 10,
 "propagateClick": false,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:21px;font-family:'Times New Roman', Times, serif;\"><B>SMP 1 Sukawening</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText1580"
 },
 "class": "HTMLText",
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 10
},
{
 "scrollBarMargin": 2,
 "id": "Container_453166ED_5064_E0C2_41BC_A6F496CB6806",
 "left": "41.45%",
 "children": [
  "this.Image_47979ECE_507F_E0DE_41C4_EBD5E349CE26",
  "this.Container_453096ED_5064_E0C2_41C9_39FCCAE0477E"
 ],
 "shadowColor": "#000000",
 "right": "36.94%",
 "contentOpaque": false,
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "shadow": true,
 "layout": "absolute",
 "top": "14.58%",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "backgroundOpacity": 1,
 "shadowVerticalLength": 0,
 "minWidth": 1,
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "horizontalAlign": "center",
 "bottom": "22.06%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "shadowHorizontalLength": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "visible": false,
 "data": {
  "name": "Global"
 },
 "paddingBottom": 0,
 "overflow": "visible",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "id": "veilPopupPanorama",
 "left": 0,
 "right": 0,
 "shadow": false,
 "top": 0,
 "backgroundColor": [
  "#000000"
 ],
 "paddingRight": 0,
 "minHeight": 0,
 "backgroundOpacity": 0.55,
 "minWidth": 0,
 "bottom": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "showEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 350
 },
 "data": {
  "name": "UIComponent2952"
 },
 "visible": false,
 "paddingBottom": 0,
 "class": "UIComponent",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "id": "zoomImagePopupPanorama",
 "left": 0,
 "right": 0,
 "shadow": false,
 "top": 0,
 "backgroundColor": [],
 "paddingRight": 0,
 "minHeight": 0,
 "backgroundOpacity": 1,
 "minWidth": 0,
 "bottom": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [],
 "scaleMode": "custom",
 "data": {
  "name": "ZoomImage2953"
 },
 "visible": false,
 "paddingBottom": 0,
 "class": "ZoomImage",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "class": "CloseButton",
 "id": "closeButtonPopupPanorama",
 "iconWidth": 20,
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "right": 10,
 "fontFamily": "Arial",
 "iconHeight": 20,
 "shadowBlurRadius": 6,
 "minHeight": 0,
 "shadow": false,
 "horizontalAlign": "center",
 "iconLineWidth": 5,
 "layout": "horizontal",
 "top": 10,
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "pressedIconColor": "#888888",
 "paddingRight": 5,
 "mode": "push",
 "backgroundOpacity": 0.3,
 "fontSize": "1.29vmin",
 "minWidth": 0,
 "iconColor": "#000000",
 "label": "",
 "borderRadius": 0,
 "borderColor": "#000000",
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 5,
 "backgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "rollOverIconColor": "#666666",
 "showEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 350
 },
 "fontStyle": "normal",
 "gap": 5,
 "textDecoration": "none",
 "visible": false,
 "data": {
  "name": "CloseButton2954"
 },
 "paddingBottom": 5,
 "cursor": "hand",
 "shadowSpread": 1,
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 5
},
{
 "class": "IconButton",
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_57C1EC65_46EC_7CF8_41A0_CDF7DC55813B",
 "width": 58,
 "pressedIconURL": "skin/IconButton_57C1EC65_46EC_7CF8_41A0_CDF7DC55813B_pressed.png",
 "minHeight": 1,
 "shadow": false,
 "pressedRollOverIconURL": "skin/IconButton_57C1EC65_46EC_7CF8_41A0_CDF7DC55813B_pressed_rollover.png",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": 58,
 "paddingRight": 0,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_57C1EC65_46EC_7CF8_41A0_CDF7DC55813B.png",
 "transparencyActive": true,
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "class": "IconButton",
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_57C1DC65_46EC_7CF8_4198_200A6F520095",
 "width": 58,
 "pressedIconURL": "skin/IconButton_57C1DC65_46EC_7CF8_4198_200A6F520095_pressed.png",
 "minHeight": 1,
 "shadow": false,
 "pressedRollOverIconURL": "skin/IconButton_57C1DC65_46EC_7CF8_4198_200A6F520095_pressed_rollover.png",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": 58,
 "paddingRight": 0,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_57C1DC65_46EC_7CF8_4198_200A6F520095.png",
 "transparencyActive": true,
 "data": {
  "name": "IconButton MUTE"
 },
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 174.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -28.25,
   "hfov": 8.08
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_6611B208_466C_C448_41C0_081FAC8EE8A0",
   "pitch": -28.25,
   "yaw": 174.56,
   "hfov": 8.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2DB1CF33_3F43_2A55_4183_17E472992590",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C, this.camera_5F30F796_5061_FD80_4184_4253DBC90275); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -6.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -13.71,
   "hfov": 8.91
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_61C6EF73_47A4_DCD8_41B4_BA0BA5D62A15",
   "pitch": -13.71,
   "yaw": -6.25,
   "hfov": 8.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5DDB3FDD_46AC_7BC8_41C4_BCB6BD6F8340",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E, this.camera_416A7D29_5061_F280_41D1_B259F7E09B34); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -177.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -35.21,
   "hfov": 7.5
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24C802D0_3F45_3BD3_41C9_708513D53ECC",
   "pitch": -35.21,
   "yaw": -177.93,
   "hfov": 7.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2D9843F4_3F47_19D3_41C9_358B8B62AC22",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25, this.camera_417C0D03_5061_F280_4160_14EA91298B39); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -23.39,
   "hfov": 8.42
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_6613B214_466C_C458_41C9_8951F8FAD84B",
   "pitch": -23.39,
   "yaw": -2.1,
   "hfov": 8.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5D6A20AA_46A4_4448_41D0_1906B2545729",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -79.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -20.74,
   "hfov": 6.02
  }
 ],
 "data": {
  "label": "Arrow 02c Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24C872C0_3F45_3A33_41C0_7079D5BDA0F9",
   "pitch": -20.74,
   "yaw": -79.57,
   "hfov": 6.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_2FB9236A_3F47_3AF7_41CB_F662EEE0E60C",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25, this.camera_5E3B7E76_5061_0E80_41D3_35AEC4CF874C); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -35.07,
   "hfov": 7.53
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24C872D0_3F45_3BD3_41C2_26C2F74D22A1",
   "pitch": -35.07,
   "yaw": 6.12,
   "hfov": 7.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2DDCDA6E_3F47_2ACF_41CE_B5DDD3906FB2",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3156142C_3F45_1E73_41B7_353A81B89835, this.camera_5E20EE9B_5061_0F80_41B2_F8C43F9FE04E); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 173.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -21.09,
   "hfov": 8.56
  }
 ],
 "data": {
  "label": "Arrow 02c"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_6612D218_466C_C448_41CF_22AE4EAB6F37",
   "pitch": -21.09,
   "yaw": 173.52,
   "hfov": 8.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5DFAD8B0_46A4_4458_41CB_2304DFD83AB9",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56, this.camera_5EDE2FCD_5061_0D83_41D1_8C71EEC4E5CF); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -177.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -28.52,
   "hfov": 8.06
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24C822D0_3F45_3BD3_419F_594707AB3788",
   "pitch": -28.52,
   "yaw": -177.51,
   "hfov": 8.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2DF2E2CC_3F47_FA33_41C2_34198EA4BAF9",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_316B8F01_3F45_2A35_41B4_E0910A12955F, this.camera_5ECCEFEF_5061_0D9F_41BE_0131FE269D9B); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -28.46,
   "hfov": 8.07
  }
 ],
 "data": {
  "label": "Arrow 02c Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_66134217_466C_C458_41C0_A8AB48DA2C04",
   "pitch": -28.46,
   "yaw": -2.1,
   "hfov": 8.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_5B43535C_46A4_44C8_41B2_688A671683C5",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5, this.camera_40359B01_5061_F683_41D2_4045C877092B); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -27.58,
   "hfov": 8.13
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24C922C0_3F45_3A33_41BE_49812BE64902",
   "pitch": -27.58,
   "yaw": 0.08,
   "hfov": 8.13,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2FDCAC7D_3F45_6ECD_419A_B8082B9CE4A9",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6, this.camera_40578A75_5061_F683_41B5_D578C8FA63B3); this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 23.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -20.92,
   "hfov": 8.57
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24C942C0_3F45_3A33_41CC_EEB674D0B742",
   "pitch": -20.92,
   "yaw": 23.37,
   "hfov": 8.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2FC3A2C2_3F45_1A37_41B9_42872B3D66AF",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 24.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0_HS_2_0_map.gif",
      "width": 33,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -23.62,
   "hfov": 8
  }
 ],
 "data": {
  "label": "Lantai 2"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0_HS_2_0.png",
      "width": 290,
      "class": "ImageResourceLevel",
      "height": 137
     }
    ]
   },
   "pitch": -23.62,
   "yaw": 24.19,
   "hfov": 8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 12.47
  }
 ],
 "id": "overlay_2EEEF88A_3F43_3637_4199_7BEC08C9ABA6",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B, this.camera_40447AC2_5061_F781_41C3_213BCEDB00F8); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 176.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0_HS_5_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -21.33,
   "hfov": 8.41
  }
 ],
 "data": {
  "label": "Arrow 02b Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_5C9D5A55_46A4_C4DB_41BE_9B2276A025AC",
   "pitch": -21.33,
   "yaw": 176.21,
   "hfov": 8.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_5B345C1C_46A4_DC48_41C0_0D2E8FDB0D80",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "AudioResource",
 "id": "audioresource_5781E28C_4541_1583_41CC_D37C598B0C17",
 "mp3Url": "media/audio_500E3CC2_4547_0D84_41D1_1F0597D07C35.mp3",
 "oggUrl": "media/audio_500E3CC2_4547_0D84_41D1_1F0597D07C35.ogg"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A, this.camera_409CCCBB_5061_F380_41B2_74797B917871); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -21.15,
   "hfov": 8.56
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24CB02D0_3F45_3BD3_41BA_094C510AA32A",
   "pitch": -21.15,
   "yaw": 0.14,
   "hfov": 8.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2FA3DC33_3F4C_EE54_41C6_34D1DFA78CE1",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20, this.camera_408C1CE0_5061_F380_41C7_802A6A2CD9CF); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 177.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -40.45,
   "hfov": 6.98
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_661E7207_466C_C438_41A6_06E04F837C9F",
   "pitch": -40.45,
   "yaw": 177.67,
   "hfov": 6.98,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5C30CCF7_46AC_7DD8_41CC_D98829CBE5DF",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE, this.camera_5EE83F8A_5061_0D81_41D0_60E6D86C81FB); this.mainPlayList.set('selectedIndex', 1); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -19.14,
   "hfov": 8.67
  }
 ],
 "data": {
  "label": "Arrow 02c"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24D4F2C0_3F45_3A33_41C0_480396A501A3",
   "pitch": -19.14,
   "yaw": 6.72,
   "hfov": 8.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2965B1E2_3CF4_41AC_41C1_FD27792279E3",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C, this.camera_40B1DC4F_5061_F280_41D3_2E559596B596); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 88.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -22.5,
   "hfov": 8.48
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24C9E2D0_3F45_3BD3_41C9_92E6A057A7FD",
   "pitch": -22.5,
   "yaw": 88.71,
   "hfov": 8.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2DE28F71_3F45_6AD5_41CB_C1580EFB27C3",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56, this.camera_40C1EC2E_5061_F280_41C9_CDE838438941); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -95.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -32.61,
   "hfov": 7.73
  }
 ],
 "data": {
  "label": "Arrow 02c"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_66101212_466C_C459_41C2_3E1A13875FB9",
   "pitch": -32.61,
   "yaw": -95.67,
   "hfov": 7.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5D43DCE5_46A4_FDF8_41C1_08A41981F198",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0, this.camera_5FA8A90C_5061_F280_41CE_B1D411B4D596); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -21.89,
   "hfov": 8.51
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24C982C0_3F45_3A33_41B1_E2B2218C2C6E",
   "pitch": -21.89,
   "yaw": 4.62,
   "hfov": 8.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2FAF86F3_3F5D_3BD5_41C9_698F918D4F9F",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939, this.camera_5FBB68D5_5061_F380_41D2_E2F9FF6A64BD); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -170.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -29.72,
   "hfov": 7.97
  }
 ],
 "data": {
  "label": "Arrow 02c Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24C9A2C0_3F45_3A33_41CE_4C230AADCDF1",
   "pitch": -29.72,
   "yaw": -170.26,
   "hfov": 7.97,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_2F4D49C8_3F5D_3633_41CE_BD577C9D1012",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -167.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_1_HS_2_0_map.gif",
      "width": 34,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -33.36,
   "hfov": 12.71
  }
 ],
 "data": {
  "label": "Kelas"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_1_HS_2_0.png",
      "width": 505,
      "class": "ImageResourceLevel",
      "height": 233
     }
    ]
   },
   "pitch": -33.36,
   "yaw": -167.78,
   "hfov": 12.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_2FFB3721_3F5D_1A75_41C6_DE19B4825973",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B, this.camera_5FCAC8A7_5061_F380_41D4_109FA0DE231C); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -171.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0_HS_3_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -16.48,
   "hfov": 8.8
  }
 ],
 "data": {
  "label": "Arrow 02c"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_5D0E5D07_46A4_DC38_41D0_9AD116C79C04",
   "pitch": -16.48,
   "yaw": -171.26,
   "hfov": 8.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5CE8CF6E_46A4_7CC8_41B8_A662AC8D929A",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3156142C_3F45_1E73_41B7_353A81B89835, this.camera_5F2EB7DC_5061_FD80_41C3_9F1D139A0BD1); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 163.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -34.22,
   "hfov": 7.59
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22D17340_3FCD_1A33_41C7_317408729C5F",
   "pitch": -34.22,
   "yaw": 163.97,
   "hfov": 7.59,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2DBC1134_3F45_1653_41C7_AF1ABA0DA60D",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6, this.camera_5F2087BA_5061_FD80_41CA_E034BBE23B99); this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -32.61,
   "hfov": 7.73
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_66151221_466C_C478_41CF_9DD832FF40F2",
   "pitch": -32.61,
   "yaw": 4.82,
   "hfov": 7.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5D798749_46A4_4CC8_41C8_C84AA2FA360D",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6, this.camera_40F0FBC7_5061_F580_41C1_238104F9D9C6); this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -178.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -34.2,
   "hfov": 7.59
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24C8E2D0_3F45_3BD3_41BB_3EEB4235E6F0",
   "pitch": -34.2,
   "yaw": -178.9,
   "hfov": 7.59,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2D535005_3F43_763D_41BA_6C4EFD6411EC",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964, this.camera_40037B9B_5061_F580_41D0_C670B59A31B5); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -24.31,
   "hfov": 8.36
  }
 ],
 "data": {
  "label": "Arrow 02b"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_6617B227_466C_C478_41C8_06F2E28A959B",
   "pitch": -24.31,
   "yaw": -2.1,
   "hfov": 8.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5D259042_46A4_C439_41A2_616ABC9A9EAF",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC, this.camera_5EA6C032_5061_1281_41CF_14751EA7DCFE); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 26.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -36.75,
   "hfov": 7.35
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24CB92D0_3F45_3BD3_41C3_E6CDD7A50892",
   "pitch": -36.75,
   "yaw": 26.76,
   "hfov": 7.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2C2EE4A6_3F45_1E7F_41C8_A5D5BB95F5AF",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19, this.camera_5EBA8010_5061_1281_41A6_6B00280BD5FA); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -153.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -25.23,
   "hfov": 8.3
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_6CA44C23_47BC_FC7F_41CF_97C70168B048",
   "pitch": -25.23,
   "yaw": -153.75,
   "hfov": 8.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5DA8455C_465C_4CC8_41D0_3BC4ABC0E839",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_372264E4_3CEC_C7B4_4151_94D194AF4546, this.camera_40BF1C73_5061_F280_41BC_ED3A857FCF48); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -89.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -23.12,
   "hfov": 5.92
  }
 ],
 "data": {
  "label": "Arrow 02c"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24D6B2C0_3F45_3A33_41CB_4BE1B0EC0F85",
   "pitch": -23.12,
   "yaw": -89.18,
   "hfov": 5.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2ACDBD4B_3CEC_C6F3_41C0_D07F461C496E",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B, this.camera_40AF4C96_5061_F380_41C3_02174CA834EC); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 12.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -21.96,
   "hfov": 8.51
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24D6C2C0_3F45_3A33_41CB_1CE708ECF868",
   "pitch": -21.96,
   "yaw": 12.16,
   "hfov": 8.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_308D4EAF_3F47_2A4D_41A8_CDEBDE400B72",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.setComponentVisibility(this.Container_504301D9_45C1_1785_41A3_F6DA6F57A6FD, true, 0, null, null, false)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -159.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 4.32,
   "hfov": 3.87
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_6618B1EA_466C_C7C8_41B3_445144FEE74E",
   "pitch": 4.32,
   "yaw": -159.99,
   "hfov": 3.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5A662A3B_4664_C448_4184_08C55AEA07C6",
 "rollOverDisplay": false,
 "data": {
  "label": "Info 02"
 }
},
{
 "class": "IconButton",
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_57C22C64_46EC_7CF9_41B1_505373026857",
 "width": 58,
 "pressedIconURL": "skin/IconButton_57C22C64_46EC_7CF9_41B1_505373026857_pressed.png",
 "minHeight": 1,
 "shadow": false,
 "pressedRollOverIconURL": "skin/IconButton_57C22C64_46EC_7CF9_41B1_505373026857_pressed_rollover.png",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": 58,
 "paddingRight": 0,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_57C22C64_46EC_7CF9_41B1_505373026857.png",
 "transparencyActive": true,
 "data": {
  "name": "IconButton GYRO"
 },
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "class": "IconButton",
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_57C1FC65_46EC_7CF8_41B3_ED1669FBC5AC",
 "width": 58,
 "pressedIconURL": "skin/IconButton_57C1FC65_46EC_7CF8_41B3_ED1669FBC5AC_pressed.png",
 "minHeight": 1,
 "shadow": false,
 "pressedRollOverIconURL": "skin/IconButton_57C1FC65_46EC_7CF8_41B3_ED1669FBC5AC_pressed_rollover.png",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": 58,
 "paddingRight": 0,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_57C1FC65_46EC_7CF8_41B3_ED1669FBC5AC.png",
 "transparencyActive": true,
 "data": {
  "name": "IconButton HS "
 },
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3141A582_3F43_3E37_41BA_417EFE1BA192, this.camera_5F0F4820_5061_F280_41C4_FCF686EB4C8F); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -14.66,
   "hfov": 8.88
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24C8B2C0_3F45_3A33_4170_927D35E74BE0",
   "pitch": -14.66,
   "yaw": -1.19,
   "hfov": 8.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2FA6A022_3F43_1677_4181_3868324D9F79",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964, this.camera_5FFD6842_5061_F280_41D3_5160BB0E900F); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -163.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -30.64,
   "hfov": 7.89
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24C8D2D0_3F45_3BD3_41BB_00A37BEA0972",
   "pitch": -30.64,
   "yaw": -163.12,
   "hfov": 7.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2ECEBB78_3F43_6AD4_41CF_31086068184B",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4, this.camera_5F1E97FE_5061_FD80_41CF_8639D73B55A4); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 156.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -57.96,
   "hfov": 12.23
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_6CBB2BFA_47BC_FBC8_41A3_AD18FA0C58F9",
   "pitch": -57.96,
   "yaw": 156.03,
   "hfov": 12.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5D461DDB_46AF_DFC8_41C0_25F8EDF19A6E",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_317B4917_3F47_165D_41AB_976EC50857C8, this.camera_5E457DEC_5061_0D80_41CC_D3541BDEA093); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -154.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -34.45,
   "hfov": 7.57
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_6CA7BC24_47BC_FC78_41C3_866196A19E84",
   "pitch": -34.45,
   "yaw": -154.21,
   "hfov": 7.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5D8B573E_465C_CC48_41A3_E829741D0CAF",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_317B4917_3F47_165D_41AB_976EC50857C8, this.camera_5FDAC885_5061_F380_41A4_266C3F103D83); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 35.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -27.55,
   "hfov": 8.13
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24CB72D0_3F45_3BD3_41C9_9A78086F0A6C",
   "pitch": -27.55,
   "yaw": 35.32,
   "hfov": 8.13,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2C3B7628_3F45_3A74_41C9_FC88BE837619",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_31767D68_3F47_6EF3_4187_81165D5A0E07, this.camera_5FEC9863_5061_F280_41B6_E77A48A2ECB0); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -143.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -35.37,
   "hfov": 7.48
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_6629822D_466C_C448_418D_8DA7774676FC",
   "pitch": -35.37,
   "yaw": -143.61,
   "hfov": 7.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5D94443F_465C_4C48_41CA_482A12DB6945",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0, this.camera_5E4BAE0E_5061_0E80_41D0_81F312845705); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -167.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -22.83,
   "hfov": 8.46
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_1FEBA8C7_3FC3_163D_41C6_414998CC45F5",
   "pitch": -22.83,
   "yaw": -167.39,
   "hfov": 8.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2DEA6164_3F43_36F3_41A1_23571EFF91F4",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B, this.camera_5E352E53_5061_0E80_41BF_1E99F750B5F6); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 175.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -21.69,
   "hfov": 4.11
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_1FEB58C7_3FC3_163D_41BD_E01ECD30FE7C",
   "pitch": -21.69,
   "yaw": 175.28,
   "hfov": 4.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2118790C_3FC3_7633_41BB_176947F3AE96",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 175.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0_HS_2_0_map.gif",
      "width": 35,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -23.06,
   "hfov": 6.92
  }
 ],
 "data": {
  "label": "Lantai 1"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0_HS_2_0.png",
      "width": 249,
      "class": "ImageResourceLevel",
      "height": 112
     }
    ]
   },
   "pitch": -23.06,
   "yaw": 175.57,
   "hfov": 6.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_21E8C530_3FCD_3E53_41AA_9A67018EAACB",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A, this.camera_5E318E30_5061_0E80_41D1_FBA010436E2A); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0_HS_3_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -29.38,
   "hfov": 7.99
  }
 ],
 "data": {
  "label": "Arrow 02b"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_66143225_466C_C478_41AD_8D2DC95DDC33",
   "pitch": -29.38,
   "yaw": -0.25,
   "hfov": 7.99,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5D10B6CD_46A4_4DC8_41CA_F98932EA6AE7",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20, this.camera_5E2DEEBD_5061_0F80_41C0_0EDC2859B4AC); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 19.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -22.34,
   "hfov": 8.49
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24C892C0_3F45_3A33_41AA_B928269D1AA2",
   "pitch": -22.34,
   "yaw": 19.81,
   "hfov": 8.49,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2E53B952_3F45_36D4_4161_A4179A819C36",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -175.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -30.3,
   "hfov": 7.92
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_661FD201_466C_C438_41CA_5B613E14759D",
   "pitch": -30.3,
   "yaw": -175.41,
   "hfov": 7.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5D3F190D_46AC_C448_4116_4C2A2450D160",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20, this.camera_5ED4FFAC_5061_0D81_41B7_EA366689E010); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 158.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -31.61,
   "hfov": 7.81
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24C8E2D0_3F45_3BD3_4199_374B947FCD64",
   "pitch": -31.61,
   "yaw": 158.46,
   "hfov": 7.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2E4A2647_3F4D_3A3C_41B7_AACE1A80022B",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19, this.camera_40E02BE9_5061_F580_41B7_56F5D4264D4C); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -26.49,
   "hfov": 8.21
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24CB22D0_3F45_3BD3_418A_57FBCFDA9DD6",
   "pitch": -26.49,
   "yaw": 2.85,
   "hfov": 8.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2CD075F8_3F47_79D3_41C6_F91E12B8E89E",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_316D98BA_3F47_3657_41C6_9BACE880DB72, this.camera_40D0EC0B_5061_F280_41D3_1D8766B958B0); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -132.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -39.98,
   "hfov": 7.03
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_6616F22B_466C_C448_4172_24DC0BE2594A",
   "pitch": -39.98,
   "yaw": -132.08,
   "hfov": 7.03,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5DBC2AC8_465C_45C8_41B8_555CB9413CA1",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B, this.camera_4067BA2B_5061_F687_41CF_D515E6AC03D3); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -8.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -22.91,
   "hfov": 8.45
  }
 ],
 "data": {
  "label": "Arrow 02b Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24D6E2C0_3F45_3A33_41CD_3A11C74B9990",
   "pitch": -22.91,
   "yaw": -8.11,
   "hfov": 8.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_30C15EE5_3F47_6BFD_41C0_0357028B93AB",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_316D98BA_3F47_3657_41C6_9BACE880DB72, this.camera_407609DE_5061_F5BA_41BA_6B9781C6B2BE); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 32.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -27.73,
   "hfov": 8.12
  }
 ],
 "data": {
  "label": "Arrow 02b Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24C902C0_3F45_3A33_41B4_AD4F0ED206DF",
   "pitch": -27.73,
   "yaw": 32.75,
   "hfov": 8.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_2ECA2182_3F45_1637_419A_4A06612EDBCB",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupPanoramaOverlay(this.popup_1C829608_3FCF_1A33_41B2_81D161E1A2E7, {'pressedIconColor':'#888888','pressedBackgroundColorDirection':'vertical','rollOverBackgroundOpacity':0.3,'backgroundColorDirection':'vertical','pressedBorderColor':'#000000','iconHeight':20,'paddingRight':5,'rollOverBackgroundColorDirection':'vertical','pressedIconHeight':20,'rollOverIconLineWidth':5,'paddingLeft':5,'rollOverIconWidth':20,'borderSize':0,'rollOverBorderColor':'#000000','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingTop':5,'pressedIconLineWidth':5,'rollOverIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconWidth':20,'iconColor':'#000000','pressedBackgroundOpacity':0.3,'paddingBottom':5,'pressedBorderSize':0,'iconWidth':20,'iconLineWidth':5,'rollOverBorderSize':0,'rollOverIconColor':'#666666','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'borderColor':'#000000'}, this.ImageResource_1B336EAD_3FCD_EA4D_419D_646DA9F345DF, null, null, null, null, false)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 23.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -4.74,
   "hfov": 6
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_1_HS_2_0.png",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ]
   },
   "pitch": -4.74,
   "yaw": 23.35,
   "hfov": 6
  }
 ],
 "id": "overlay_1C8C9CEC_3FCF_2FF3_41C8_EB246266C19B",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE, this.camera_5F8639A5_5061_F583_41CD_EA7ADEF16A95); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -136.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0_HS_3_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -26.16,
   "hfov": 8.23
  }
 ],
 "data": {
  "label": "Arrow 02c"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_4CD4329B_5064_2346_41A8_FD63C972B563",
   "pitch": -26.16,
   "yaw": -136.69,
   "hfov": 8.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5B85CEE3_465C_3DF8_4180_6A9208834439",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_31767D68_3F47_6EF3_4187_81165D5A0E07, this.camera_5E145EE3_5061_0F80_41D0_73C47830A760); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 160.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -20.21,
   "hfov": 8.61
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_52F4EB82_454F_0B87_41C1_1B0858B9F600",
   "pitch": -20.21,
   "yaw": 160.08,
   "hfov": 8.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2C2D86A7_3F47_7A7C_41C1_E09F62FEB81E",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B, this.camera_5E017F05_5061_0E80_4172_205F37D029CA); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -13.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -29.38,
   "hfov": 7.99
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_6CA23C1B_47BC_FC48_41A3_7F160043D68B",
   "pitch": -29.38,
   "yaw": -13.16,
   "hfov": 7.99,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5D8EB2BD_465B_C448_41BF_88089DEB4D22",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_316B8F01_3F45_2A35_41B4_E0910A12955F, this.camera_40130B72_5061_F681_4187_C4A7470F98DE); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -26.92,
   "hfov": 8.18
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_66122219_466C_C448_41BC_737AF5B30E59",
   "pitch": -26.92,
   "yaw": 2.42,
   "hfov": 8.18,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2D999925_3F45_167D_41C2_2B4EE0E0BF2B",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0, this.camera_4025AB48_5061_F681_41A3_7376995836F2); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -179.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -24.77,
   "hfov": 8.33
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_6615821A_466C_C448_41A9_60ABC7A25BE0",
   "pitch": -24.77,
   "yaw": -179.1,
   "hfov": 8.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5DF42BC8_46A4_3BC8_41D1_5485036C5AAA",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D, this.camera_5E0A2F27_5061_0E80_41A0_13138EB433A1); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 156.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -48.76,
   "hfov": 6.05
  }
 ],
 "data": {
  "label": "Arrow 02a Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24C9C2D0_3F45_3BD3_41B9_0FB02833E632",
   "pitch": -48.76,
   "yaw": 156.7,
   "hfov": 6.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_2B7E2409_3F45_3E35_4191_B0F9618C15A0",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E, this.camera_5EF4AF48_5061_0E80_41C2_E2BFEE565A62); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -28.46,
   "hfov": 8.07
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_6610B210_466C_C458_41C1_8EE5F79F889A",
   "pitch": -28.46,
   "yaw": -2.1,
   "hfov": 8.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5DB174D8_46AB_CDC8_41C4_C53CD0271331",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5, this.camera_415A5D4F_5061_F280_41A3_CF7E3B4B578F); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 80.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -29.57,
   "hfov": 7.98
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_661D31FB_466C_C7C8_4164_91F0767001CC",
   "pitch": -29.57,
   "yaw": 80.07,
   "hfov": 7.98,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2F8FC4BC_3F45_3E53_41C2_E26B0061FCE6",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -21.3,
   "hfov": 8.55
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_24C832C0_3F45_3A33_4175_A02F27D01BE0",
   "pitch": -21.3,
   "yaw": 1.92,
   "hfov": 8.55,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2F8874DD_3F45_FFCD_41C2_8DB3D375774F",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0_HS_1_0_map.gif",
      "width": 53,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -23.51,
   "hfov": 11.48
  }
 ],
 "data": {
  "label": "Ruang Guru"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0_HS_1_0.png",
      "width": 416,
      "class": "ImageResourceLevel",
      "height": 125
     }
    ]
   },
   "pitch": -23.51,
   "yaw": 2.22,
   "hfov": 11.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_2ED0D553_3F45_1ED5_41A7_D491D569A6D3",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5, this.camera_5F98C967_5061_F28F_41D0_C7AFFFA72655); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -176.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -24.31,
   "hfov": 8.36
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_661C11FE_466C_C7C8_41AE_5C0DCA3D69E6",
   "pitch": -24.31,
   "yaw": -176.33,
   "hfov": 8.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5D7C62A4_46AC_4479_41A3_BA2ACB9B6E11",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "IconButton",
 "maxHeight": 101,
 "maxWidth": 101,
 "id": "IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8",
 "width": 44,
 "minHeight": 1,
 "shadow": false,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": 44,
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "rollOverIconURL": "skin/IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "propagateClick": false,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8.png",
 "transparencyActive": true,
 "data": {
  "name": "IconButton Thumblist"
 },
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "class": "IconButton",
 "maxHeight": 101,
 "maxWidth": 101,
 "id": "IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8",
 "width": 44,
 "pressedIconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8_pressed.png",
 "minHeight": 1,
 "shadow": false,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": 44,
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "rollOverIconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_453166ED_5064_E0C2_41BC_A6F496CB6806, true, 0, this.effect_45D5786C_5064_2FC2_41D1_3A0D5D9FA25A, 'showEffect', false)",
 "propagateClick": false,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8.png",
 "transparencyActive": true,
 "data": {
  "name": "IconButton Realtor"
 },
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "left": "15%",
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "shadowColor": "#000000",
 "right": "15%",
 "contentOpaque": false,
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "shadow": true,
 "layout": "absolute",
 "top": "10%",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "paddingRight": 0,
 "minHeight": 1,
 "backgroundOpacity": 1,
 "shadowVerticalLength": 0,
 "minWidth": 1,
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "horizontalAlign": "center",
 "bottom": "10%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "shadowHorizontalLength": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "data": {
  "name": "Global"
 },
 "paddingBottom": 0,
 "overflow": "visible",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "left": "15%",
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "shadowColor": "#000000",
 "right": "15%",
 "contentOpaque": false,
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "minHeight": 1,
 "shadow": true,
 "layout": "vertical",
 "top": "10%",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "backgroundOpacity": 1,
 "shadowVerticalLength": 0,
 "minWidth": 1,
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "horizontalAlign": "center",
 "bottom": "10%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "shadowHorizontalLength": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "gap": 10,
 "visible": false,
 "data": {
  "name": "Global"
 },
 "overflow": "visible",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
 "left": "15%",
 "children": [
  "this.Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
  "this.Container_27875147_3F82_7A70_41CC_C0FFBB32BEFD",
  "this.Container_06C58BA5_1140_A63F_419D_EC83F94F8C54"
 ],
 "shadowColor": "#000000",
 "right": "15%",
 "contentOpaque": false,
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "shadow": true,
 "layout": "horizontal",
 "top": "10%",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "paddingRight": 0,
 "minHeight": 1,
 "backgroundOpacity": 1,
 "shadowVerticalLength": 0,
 "minWidth": 1,
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "bottom": "10%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "shadowHorizontalLength": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "gap": 0,
 "data": {
  "name": "Global"
 },
 "paddingBottom": 0,
 "overflow": "scroll",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F",
 "left": "15%",
 "children": [
  "this.IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81"
 ],
 "right": "15%",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "shadow": false,
 "horizontalAlign": "right",
 "layout": "vertical",
 "top": "10%",
 "verticalAlign": "top",
 "bottom": "80%",
 "paddingRight": 20,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 20,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "gap": 10,
 "paddingBottom": 0,
 "overflow": "visible",
 "class": "Container",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_57C26C64_46EC_7CF8_41D1_91AB8D2E84C6",
 "width": 110,
 "right": "0%",
 "children": [
  "this.IconButton_57C21C64_46EC_7CF8_41CB_DF4B525E3286"
 ],
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "shadow": false,
 "horizontalAlign": "center",
 "layout": "horizontal",
 "top": "0%",
 "verticalAlign": "middle",
 "height": 110,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "button menu sup"
 },
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "overflow": "visible",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_57C20C64_46EC_7CF8_41C7_217BD4840C09",
 "children": [
  "this.IconButton_57C22C64_46EC_7CF9_41B1_505373026857",
  "this.IconButton_57C1DC65_46EC_7CF8_4198_200A6F520095",
  "this.IconButton_57C1FC65_46EC_7CF8_41B3_ED1669FBC5AC",
  "this.IconButton_57C1EC65_46EC_7CF8_41A0_CDF7DC55813B"
 ],
 "right": "0%",
 "width": "91.304%",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "shadow": false,
 "layout": "vertical",
 "verticalAlign": "top",
 "bottom": "0%",
 "height": "85.96%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "horizontalAlign": "center",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": true,
 "gap": 3,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-button set"
 },
 "paddingBottom": 0,
 "visible": false,
 "overflow": "scroll",
 "class": "Container",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_5043D1D8_45C1_1783_41B2_273C05231740",
 "left": "30.49%",
 "children": [
  "this.ViewerAreaLabeled_5043C1D9_45C1_1785_41AB_293CBD17E694",
  "this.HTMLText_1C7A0ACD_3F4D_6BCD_416C_6738EF95F93E",
  "this.Container_504331D9_45C1_1785_41BA_C0D0EBF34D60"
 ],
 "shadowColor": "#000000",
 "right": "22.25%",
 "contentOpaque": false,
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "shadow": true,
 "layout": "absolute",
 "top": "22.94%",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "paddingRight": 0,
 "minHeight": 1,
 "backgroundOpacity": 1,
 "shadowVerticalLength": 0,
 "minWidth": 1,
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "horizontalAlign": "center",
 "bottom": "21.94%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "shadowHorizontalLength": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "data": {
  "name": "Global"
 },
 "paddingBottom": 0,
 "overflow": "visible",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "maxHeight": 1004,
 "maxWidth": 591,
 "id": "Image_47979ECE_507F_E0DE_41C4_EBD5E349CE26",
 "left": "0%",
 "width": "100%",
 "url": "skin/Image_47979ECE_507F_E0DE_41C4_EBD5E349CE26.png",
 "minHeight": 1,
 "shadow": false,
 "top": "0%",
 "verticalAlign": "middle",
 "height": "100%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "horizontalAlign": "center",
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image13309"
 },
 "class": "Image",
 "paddingBottom": 0,
 "paddingLeft": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_453096ED_5064_E0C2_41C9_39FCCAE0477E",
 "children": [
  "this.IconButton_4530A6ED_5064_E0C2_41A9_A610FA47A7F2"
 ],
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "shadow": false,
 "verticalAlign": "top",
 "height": 140,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "header"
 },
 "paddingBottom": 0,
 "class": "Container",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6611B208_466C_C448_41C0_081FAC8EE8A0",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_31595036_3F43_165F_41C4_F1DFACAD2F7D_0_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_61C6EF73_47A4_DCD8_41B4_BA0BA5D62A15",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24C802D0_3F45_3BD3_41C9_708513D53ECC",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_316BC4C9_3F45_3E35_41AC_39940FCA5B56_0_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6613B214_466C_C458_41C9_8951F8FAD84B",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_311E135C_3F3D_3AD3_41CB_A5D9D6910508_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24C872C0_3F45_3A33_41C0_7079D5BDA0F9",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24C872D0_3F45_3BD3_41C2_26C2F74D22A1",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_316B8F01_3F45_2A35_41B4_E0910A12955F_0_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6612D218_466C_C448_41CF_22AE4EAB6F37",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24C822D0_3F45_3BD3_419F_594707AB3788",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_315BBAEE_3F45_6BCF_41C4_11272F33AB25_0_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_66134217_466C_C458_41C0_A8AB48DA2C04",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24C922C0_3F45_3A33_41BE_49812BE64902",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_1_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24C942C0_3F45_3A33_41CC_EEB674D0B742",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_31359A8B_3F3C_EA35_41CE_98E3F599915B_0_HS_5_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5C9D5A55_46A4_C4DB_41BE_9B2276A025AC",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24CB02D0_3F45_3BD3_41BA_094C510AA32A",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3175EB88_3F43_EA33_41CE_8DD2E0A9E964_0_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_661E7207_466C_C438_41A6_06E04F837C9F",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_372264E4_3CEC_C7B4_4151_94D194AF4546_0_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24D4F2C0_3F45_3A33_41C0_480396A501A3",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24C9E2D0_3F45_3BD3_41C9_92E6A057A7FD",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_32BA3059_3F44_F6D5_41A4_12CF9930B00E_0_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_66101212_466C_C459_41C2_3E1A13875FB9",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24C982C0_3F45_3A33_41B1_E2B2218C2C6E",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_1_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24C9A2C0_3F45_3A33_41CE_4C230AADCDF1",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_31208FF2_3F3D_29D7_41C5_D0F3550F47B5_0_HS_3_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D0E5D07_46A4_DC38_41D0_9AD116C79C04",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_22D17340_3FCD_1A33_41C7_317408729C5F",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_316A0AFD_3F45_6BCD_4158_18975EA792E0_0_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_66151221_466C_C478_41CF_9DD832FF40F2",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24C8E2D0_3F45_3BD3_41BB_3EEB4235E6F0",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3170F3EC_3F44_F9CC_41C6_E24C1338EE6A_0_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6617B227_466C_C478_41C8_06F2E28A959B",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24CB92D0_3F45_3BD3_41C3_E6CDD7A50892",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_317B4917_3F47_165D_41AB_976EC50857C8_0_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6CA44C23_47BC_FC7F_41CF_97C70168B048",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24D6B2C0_3F45_3A33_41CB_4BE1B0EC0F85",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0_HS_2_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24D6C2C0_3F45_3A33_41CB_1CE708ECF868",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_32965CD1_3CEC_47EC_41C4_AB9070C0FDFE_0_HS_3_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6618B1EA_466C_C7C8_41B3_445144FEE74E",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24C8B2C0_3F45_3A33_4170_927D35E74BE0",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_1_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24C8D2D0_3F45_3BD3_41BB_00A37BEA0972",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_31595F6C_3F43_6AF3_41A4_96CFF3F40F20_0_HS_2_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6CBB2BFA_47BC_FBC8_41A3_AD18FA0C58F9",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_31719E23_3F47_6A75_41CE_628D4B0B7FBC_0_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6CA7BC24_47BC_FC78_41C3_866196A19E84",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24CB72D0_3F45_3BD3_41C9_9A78086F0A6C",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3171B340_3F47_1A33_41A8_686DD0E5AB19_0_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6629822D_466C_C448_418D_8DA7774676FC",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_1FEBA8C7_3FC3_163D_41C6_414998CC45F5",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_1FEB58C7_3FC3_163D_41BD_E01ECD30FE7C",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_31577F6D_3F45_2ACD_41B1_5F20057DFDE6_0_HS_3_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_66143225_466C_C478_41AD_8D2DC95DDC33",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24C892C0_3F45_3A33_41AA_B928269D1AA2",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3149F83D_3F43_164D_41C9_EE0AD7C8DAD4_0_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_661FD201_466C_C438_41CA_5B613E14759D",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3141A582_3F43_3E37_41BA_417EFE1BA192_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24C8E2D0_3F45_3BD3_4199_374B947FCD64",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24CB22D0_3F45_3BD3_418A_57FBCFDA9DD6",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_31767D68_3F47_6EF3_4187_81165D5A0E07_0_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6616F22B_466C_C448_4172_24DC0BE2594A",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24D6E2C0_3F45_3A33_41CD_3A11C74B9990",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_1_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24C902C0_3F45_3A33_41B4_AD4F0ED206DF",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_30F3093A_3F3F_7657_41B8_7640CC241B8B_0_HS_3_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_4CD4329B_5064_2346_41A8_FD63C972B563",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_52F4EB82_454F_0B87_41C1_1B0858B9F600",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_316D98BA_3F47_3657_41C6_9BACE880DB72_0_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6CA23C1B_47BC_FC48_41A3_7F160043D68B",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_66122219_466C_C448_41BC_737AF5B30E59",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3156142C_3F45_1E73_41B7_353A81B89835_0_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6615821A_466C_C448_41A9_60ABC7A25BE0",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24C9C2D0_3F45_3BD3_41B9_0FB02833E632",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3155B9E6_3F43_29FF_4187_9B0AA55F8A5C_0_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6610B210_466C_C458_41C1_8EE5F79F889A",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3125C8B7_3F3D_165D_41C1_82950C0E1939_0_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_661D31FB_466C_C7C8_4164_91F0767001CC",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_24C832C0_3F45_3A33_4175_A02F27D01BE0",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_31250C4C_3F3D_EE33_41AB_A3222FA1CFF0_0_HS_2_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_661C11FE_466C_C7C8_41AE_5C0DCA3D69E6",
 "colCount": 4
},
{
 "scrollBarMargin": 2,
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "children": [
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "width": "100%",
 "scrollBarWidth": 10,
 "minHeight": 1,
 "shadow": false,
 "contentOpaque": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "height": 140,
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "header"
 },
 "paddingBottom": 0,
 "overflow": "scroll",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "itemMaxWidth": 1000,
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "left": 0,
 "rollOverItemThumbnailShadowColor": "#F7931E",
 "itemLabelFontFamily": "Montserrat",
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "width": "100%",
 "itemMaxHeight": 1000,
 "itemBorderRadius": 0,
 "minHeight": 1,
 "shadow": false,
 "selectedItemLabelFontColor": "#F7931E",
 "itemHorizontalAlign": "center",
 "itemLabelPosition": "bottom",
 "horizontalAlign": "center",
 "selectedItemLabelFontWeight": "bold",
 "verticalAlign": "middle",
 "selectedItemThumbnailShadowVerticalLength": 0,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "height": "92%",
 "backgroundOpacity": 0,
 "itemPaddingLeft": 3,
 "paddingRight": 70,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "minWidth": 1,
 "itemThumbnailBorderRadius": 0,
 "borderSize": 0,
 "itemWidth": 220,
 "itemBackgroundColor": [],
 "propagateClick": false,
 "itemMinHeight": 50,
 "itemBackgroundColorRatios": [],
 "itemPaddingTop": 3,
 "itemVerticalAlign": "top",
 "itemThumbnailShadow": false,
 "paddingLeft": 70,
 "scrollBarMargin": 2,
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemLabelTextDecoration": "none",
 "itemLabelFontWeight": "normal",
 "itemMinWidth": 50,
 "itemThumbnailHeight": 125,
 "rollOverItemThumbnailShadow": true,
 "itemOpacity": 1,
 "scrollBarWidth": 10,
 "itemHeight": 160,
 "itemThumbnailOpacity": 1,
 "itemLabelFontSize": 13,
 "selectedItemThumbnailShadow": true,
 "itemThumbnailScaleMode": "fit_outside",
 "itemLabelFontColor": "#666666",
 "bottom": -0.2,
 "itemThumbnailWidth": 220,
 "borderRadius": 5,
 "itemBackgroundColorDirection": "vertical",
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "scrollBarColor": "#F7931E",
 "paddingTop": 10,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "itemPaddingBottom": 3,
 "gap": 26,
 "itemPaddingRight": 3,
 "data": {
  "name": "ThumbnailList"
 },
 "paddingBottom": 70,
 "itemLabelGap": 7,
 "scrollBarOpacity": 0.5,
 "itemLabelFontStyle": "normal",
 "rollOverItemLabelFontColor": "#F7931E",
 "itemLabelHorizontalAlign": "center",
 "class": "ThumbnailGrid",
 "itemBackgroundOpacity": 0,
 "itemMode": "normal",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "width": "100%",
 "scrollBarWidth": 10,
 "minHeight": 1,
 "shadow": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "height": "100%",
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "minWidth": 1,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container photo"
 },
 "paddingBottom": 0,
 "overflow": "visible",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
 "children": [
  "this.Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "width": "55%",
 "scrollBarWidth": 10,
 "minHeight": 1,
 "shadow": false,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000"
 ],
 "paddingRight": 0,
 "height": "100%",
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "minWidth": 1,
 "borderRadius": 0,
 "horizontalAlign": "center",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0
 ],
 "data": {
  "name": "-left"
 },
 "paddingBottom": 0,
 "overflow": "scroll",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_27875147_3F82_7A70_41CC_C0FFBB32BEFD",
 "width": 8,
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "scrollBarWidth": 10,
 "minHeight": 1,
 "shadow": false,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "backgroundColor": [
  "#F7931E",
  "#000000"
 ],
 "paddingRight": 0,
 "height": "100%",
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  1,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "orange line"
 },
 "paddingBottom": 0,
 "gap": 10,
 "overflow": "scroll",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_06C58BA5_1140_A63F_419D_EC83F94F8C54",
 "children": [
  "this.Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
  "this.Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
  "this.Container_06C42BA5_1140_A63F_4195_037A0687532F"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "width": "45%",
 "scrollBarWidth": 10,
 "minHeight": 1,
 "shadow": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 60,
 "height": "100%",
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "minWidth": 460,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "borderSize": 0,
 "scrollBarColor": "#0069A3",
 "paddingTop": 20,
 "propagateClick": false,
 "gap": 0,
 "scrollBarOpacity": 0.51,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "-right"
 },
 "paddingBottom": 20,
 "overflow": "visible",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 60
},
{
 "class": "IconButton",
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81",
 "width": "25%",
 "pressedIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_pressed.jpg",
 "minHeight": 50,
 "shadow": false,
 "verticalAlign": "middle",
 "height": "75%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "rollOverIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_rollover.jpg",
 "borderRadius": 0,
 "horizontalAlign": "center",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "paddingTop": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81.jpg",
 "transparencyActive": false,
 "data": {
  "name": "X"
 },
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "class": "IconButton",
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_57C21C64_46EC_7CF8_41CB_DF4B525E3286",
 "width": 60,
 "pressedIconURL": "skin/IconButton_57C21C64_46EC_7CF8_41CB_DF4B525E3286_pressed.png",
 "minHeight": 1,
 "shadow": false,
 "pressedRollOverIconURL": "skin/IconButton_57C21C64_46EC_7CF8_41CB_DF4B525E3286_pressed_rollover.png",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": 60,
 "paddingRight": 0,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "click": "if(!this.Container_57C20C64_46EC_7CF8_41C7_217BD4840C09.get('visible')){ this.setComponentVisibility(this.Container_57C20C64_46EC_7CF8_41C7_217BD4840C09, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_57C20C64_46EC_7CF8_41C7_217BD4840C09, false, 0, null, null, false) }",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_57C21C64_46EC_7CF8_41CB_DF4B525E3286.png",
 "transparencyActive": true,
 "data": {
  "name": "image button menu"
 },
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "toolTipFontSize": 12,
 "toolTipOpacity": 1,
 "id": "ViewerAreaLabeled_5043C1D9_45C1_1785_41AB_293CBD17E694",
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "width": "100%",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "minHeight": 1,
 "shadow": false,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "paddingRight": 0,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "height": "100%",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "minWidth": 1,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "paddingLeft": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionMode": "blending",
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingBottom": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "data": {
  "name": "Floor Plan"
 },
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "class": "ViewerArea"
},
{
 "id": "HTMLText_1C7A0ACD_3F4D_6BCD_416C_6738EF95F93E",
 "left": "0%",
 "width": "99.847%",
 "shadowColor": "#000000",
 "scrollBarMargin": 2,
 "shadowBlurRadius": 7,
 "minHeight": 1,
 "shadow": true,
 "top": "0%",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#CCCCCC"
 ],
 "shadowSpread": 1,
 "paddingRight": 20,
 "height": "100%",
 "backgroundOpacity": 0.91,
 "shadowVerticalLength": 2,
 "minWidth": 1,
 "shadowOpacity": 0.19,
 "borderRadius": 10,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 20,
 "shadowHorizontalLength": 2,
 "backgroundColorRatios": [
  0.73,
  1
 ],
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><p STYLE=\"margin:0; line-height:37px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffff33;font-size:37px;\"><B> </B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:37px;\"><B> Gallery Of Victory</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:12px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:12px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:12px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;font-size:16px;font-family:'Times New Roman', Times, serif;\">Gallery of Victory adalah sebuah ruang khusus di lingkungan sekolah yang didedikasikan untuk menampilkan dokumentasi berbagai pencapaian akademik maupun non-akademik, seperti piala, piagam penghargaan, foto-foto kemenangan dalam lomba, karya siswa, hingga momen bersejarah yang membanggakan sekolah</SPAN><SPAN STYLE=\"color:#333333;\">.</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText53815"
 },
 "paddingBottom": 10,
 "class": "HTMLText",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 20
},
{
 "scrollBarMargin": 2,
 "id": "Container_504331D9_45C1_1785_41BA_C0D0EBF34D60",
 "children": [
  "this.IconButton_504311D9_45C1_1785_41BC_5F687F8F750B"
 ],
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "shadow": false,
 "verticalAlign": "top",
 "height": 140,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "header"
 },
 "paddingBottom": 0,
 "class": "Container",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0
},
{
 "maxHeight": 30,
 "maxWidth": 30,
 "id": "IconButton_4530A6ED_5064_E0C2_41A9_A610FA47A7F2",
 "right": 20,
 "width": "100%",
 "pressedIconURL": "skin/IconButton_4530A6ED_5064_E0C2_41A9_A610FA47A7F2_pressed.jpg",
 "minHeight": 30,
 "shadow": false,
 "top": 20,
 "verticalAlign": "top",
 "height": "36.14%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 30,
 "rollOverIconURL": "skin/IconButton_4530A6ED_5064_E0C2_41A9_A610FA47A7F2_rollover.jpg",
 "borderRadius": 0,
 "horizontalAlign": "right",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_453166ED_5064_E0C2_41BC_A6F496CB6806, false, 0, null, null, false)",
 "paddingTop": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_4530A6ED_5064_E0C2_41A9_A610FA47A7F2.jpg",
 "transparencyActive": false,
 "data": {
  "name": "IconButton X"
 },
 "class": "IconButton",
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "right": 20,
 "width": "8.52%",
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "minHeight": 50,
 "shadow": false,
 "top": "20%",
 "verticalAlign": "top",
 "height": "35.71%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "borderRadius": 0,
 "horizontalAlign": "right",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "paddingTop": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "transparencyActive": false,
 "data": {
  "name": "IconButton X"
 },
 "class": "IconButton",
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "toolTipFontSize": 12,
 "toolTipOpacity": 1,
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "left": "0%",
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "width": "100%",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "minHeight": 1,
 "shadow": false,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "paddingRight": 0,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "height": "100%",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "minWidth": 1,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "paddingLeft": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionMode": "blending",
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "top": "0%",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "paddingBottom": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "class": "ViewerArea"
},
{
 "class": "IconButton",
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "left": 10,
 "width": "14.22%",
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "minHeight": 50,
 "shadow": false,
 "top": "20%",
 "verticalAlign": "middle",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "bottom": "20%",
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "borderRadius": 0,
 "horizontalAlign": "center",
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "transparencyActive": false,
 "data": {
  "name": "IconButton <"
 },
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "cursor": "hand",
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "right": 10,
 "width": "14.22%",
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "minHeight": 50,
 "shadow": false,
 "top": "20%",
 "verticalAlign": "middle",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "bottom": "20%",
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "borderRadius": 0,
 "horizontalAlign": "center",
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "transparencyActive": false,
 "data": {
  "name": "IconButton >"
 },
 "paddingBottom": 0,
 "class": "IconButton",
 "paddingLeft": 0
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "right": 20,
 "width": "10%",
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg",
 "minHeight": 50,
 "shadow": false,
 "top": 20,
 "verticalAlign": "top",
 "height": "10%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.jpg",
 "borderRadius": 0,
 "horizontalAlign": "right",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "paddingTop": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.jpg",
 "transparencyActive": false,
 "data": {
  "name": "IconButton X"
 },
 "class": "IconButton",
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "maxHeight": 1000,
 "maxWidth": 2000,
 "id": "Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397",
 "left": "0%",
 "width": "100%",
 "url": "skin/Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397.jpg",
 "minHeight": 1,
 "shadow": false,
 "top": "0%",
 "verticalAlign": "bottom",
 "height": "100%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "horizontalAlign": "center",
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "scaleMode": "fit_outside",
 "data": {
  "name": "Image"
 },
 "class": "Image",
 "paddingBottom": 0,
 "paddingLeft": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
 "width": "100%",
 "scrollBarVisible": "rollOver",
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "minHeight": 0,
 "shadow": false,
 "contentOpaque": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "height": 60,
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "horizontalAlign": "right",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "propagateClick": false,
 "gap": 0,
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container space"
 },
 "paddingBottom": 0,
 "overflow": "scroll",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
 "children": [
  "this.HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
  "this.Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "width": "100%",
 "scrollBarWidth": 10,
 "minHeight": 520,
 "shadow": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "height": "100%",
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "minWidth": 100,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "borderSize": 0,
 "scrollBarColor": "#E73B2C",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.79,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container text"
 },
 "paddingBottom": 30,
 "overflow": "scroll",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_06C42BA5_1140_A63F_4195_037A0687532F",
 "width": 370,
 "scrollBarVisible": "rollOver",
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "minHeight": 1,
 "shadow": false,
 "horizontalAlign": "left",
 "contentOpaque": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "height": 40,
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "paddingBottom": 0,
 "gap": 10,
 "overflow": "scroll",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "maxHeight": 40,
 "maxWidth": 40,
 "id": "IconButton_504311D9_45C1_1785_41BC_5F687F8F750B",
 "right": 20,
 "width": "100%",
 "pressedIconURL": "skin/IconButton_504311D9_45C1_1785_41BC_5F687F8F750B_pressed.jpg",
 "minHeight": 40,
 "shadow": false,
 "top": 20,
 "verticalAlign": "top",
 "height": "36.14%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 40,
 "rollOverIconURL": "skin/IconButton_504311D9_45C1_1785_41BC_5F687F8F750B_rollover.jpg",
 "borderRadius": 0,
 "horizontalAlign": "right",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_504301D9_45C1_1785_41A3_F6DA6F57A6FD, false, 0, null, null, false)",
 "paddingTop": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_504311D9_45C1_1785_41BC_5F687F8F750B.jpg",
 "transparencyActive": false,
 "data": {
  "name": "IconButton X"
 },
 "class": "IconButton",
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
 "width": "100%",
 "scrollBarWidth": 10,
 "minHeight": 1,
 "shadow": false,
 "height": "20.204%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#04A3E1",
 "paddingTop": 0,
 "propagateClick": false,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#0033ff;font-size:7.46vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.15vh;font-family:'Montserrat';\"><B>Created By :</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.15vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1vh;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "data": {
  "name": "HTMLText18899"
 },
 "paddingBottom": 10,
 "class": "HTMLText",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C",
 "children": [
  "this.Image_578BB8BE_4541_35FF_41C9_5CD7AF611E9B",
  "this.HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "horizontal",
 "width": "100%",
 "scrollBarWidth": 10,
 "minHeight": 1,
 "shadow": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "height": "80%",
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "minWidth": 1,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "- content"
 },
 "paddingBottom": 0,
 "overflow": "scroll",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "maxHeight": 200,
 "maxWidth": 200,
 "id": "Image_578BB8BE_4541_35FF_41C9_5CD7AF611E9B",
 "width": "58.824%",
 "url": "skin/Image_578BB8BE_4541_35FF_41C9_5CD7AF611E9B.jpg",
 "minHeight": 1,
 "shadow": false,
 "verticalAlign": "middle",
 "height": "100%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "horizontalAlign": "center",
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image14384"
 },
 "paddingBottom": 0,
 "class": "Image",
 "paddingLeft": 0
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE",
 "width": "100%",
 "scrollBarWidth": 10,
 "minHeight": 1,
 "shadow": false,
 "height": "100%",
 "paddingRight": 10,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#F7931E",
 "paddingTop": 0,
 "propagateClick": false,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><p STYLE=\"margin:0; line-height:1.99vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:1.99vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:1.99vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:1.99vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:1.99vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:1.99vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.99vh;font-family:'Montserrat';\"><B>Hafidzh Fakry</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.66vh;font-family:'Montserrat';\">Teknik Informatika</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:1vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1vh;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "data": {
  "name": "HTMLText19460"
 },
 "paddingBottom": 10,
 "class": "HTMLText",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 10
}],
 "scrollBarColor": "#000000",
 "desktopMipmappingEnabled": false,
 "paddingTop": 0,
 "propagateClick": true,
 "gap": 10,
 "mouseWheelEnabled": true,
 "backgroundPreloadEnabled": true,
 "scrollBarOpacity": 0.5,
 "mobileMipmappingEnabled": false,
 "data": {
  "name": "Player468"
 },
 "paddingBottom": 0,
 "overflow": "visible",
 "class": "Player",
 "vrPolyfillScale": 0.5,
 "paddingLeft": 0
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
