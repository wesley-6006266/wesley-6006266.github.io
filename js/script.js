// JavaScript Document
window.onload = function(){
	
	
	if (window.innerWidth <= 768.9) {
		document.getElementById("socials").style.left = "-50px";
		document.getElementById("arrow").style.transform = "rotateY(180deg)";
	} else  { document.getElementById("socials").style.left = "0px";}
}
			
		function checkMenuOpen() {
				var showMenu = document.getElementById("nav-ul");

				if(showMenu.style.display == "block") {
					showMenu.style.display = "none";
					
				} else {
					showMenu.style.display = "block";
					
				}
		}
			
	function hamburgerMenu(){
		var hamburger = document.getElementById("hamburger");
		if(hamburger.className == "open") {
			hamburger.classList.remove("open"); 
		}
		else {				
			hamburger.classList.add("open"); }
			checkMenuOpen();
		}
	
function hide(){
var socials = document.getElementById("socials");
var arrow = document.getElementById("arrow");

		if (socials.style.left == "0px") {
			socials.style.left = "-50px";
			arrow.style.transform = "rotateY(180deg)";
		} else { 
			socials.style.left = "0px";
			arrow.style.transform = "rotateY(0deg)"
		}
	
	
}
