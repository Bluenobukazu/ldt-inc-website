/* runs before first paint: continue the black cut when arriving from another page */
(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('ldt-cut')){sessionStorage.removeItem('ldt-cut');d.classList.add('cut-in');setTimeout(function(){d.classList.remove('cut-in')},3000)}}catch(e){}})();
