// Scrollmagic library from http://scrollmagic.io/
var controller = new ScrollMagic.Controller();

// Single item fade in and slide up...

$(".single-tween-item").each(function() {

 	var tween = TweenMax.from(this, .6, {
	        y: 40,
	        autoAlpha: 0,
	        delay: 0,
	        ease: Power2.easeOut
	    }, .1);

	var scene1 = new ScrollMagic.Scene({
	        triggerElement: this,
	        offset: -100,
	        reverse:true
	    })
		.setTween(tween)
		.addTo(controller)
    // .addIndicators()
		;
});


// Fade in and slide up, cascade through out elements

$(".stagger-tween").each(function() {
  
  var stagger = TweenMax.staggerFrom($(this).find(".stagger-tween-item"), .6, {
    y: 40,
    autoAlpha: 0,
    delay: 0,
    ease: Power2.easeOut
  },
  0.2);

	var scene2 = new ScrollMagic.Scene({
	        triggerElement: this,
	        offset: -100,
	        reverse:true
	    })
		.setTween(stagger)
		.addTo(controller)
    // .addIndicators()
		;
});

// LH Content fade and slide in from right, RH Content fade and slide up...

$(".content-tween").each(function() {
  
  var contentTweenTL = new TimelineMax({
    repeat:0,
  });
  
  var contentTween = contentTweenTL.from($(this).find(".content-tween-left"), 2, {
    x: -80,
    autoAlpha: 0,
    delay: 0,
    ease: Power2.easeOut
  }, .1)
  .from($(this).find(".content-tween-right"), 2, {
    x: 80,
    y: 80,
    autoAlpha: 0,
    delay: 0,
    ease: Power2.easeOut
  }, .1);

	var scene3 = new ScrollMagic.Scene({
	        triggerElement: this,
	        offset: -100,
	        reverse:true
	    })
		.setTween(contentTween)
		.addTo(controller)
    // .addIndicators()
		;
});

// content...

$(".connect-tween").each(function() {
  
  var connectTweenTL = new TimelineMax({
    repeat:0,
  });
  
  var connectTween = connectTweenTL.from($(this).find(".connect-tween-item:nth-child(1)"), .6, {
    x: -40,
    y: 40,
    autoAlpha: 0,
    delay: 0,
    ease: Power2.easeOut
  }, .1)
  .from($(this).find(".connect-tween-item:nth-child(2)"), .6, {
    x: -20,
    y: 40,
    autoAlpha: 0,
    delay: 0,
    ease: Power2.easeOut
  }, .1)
  .from($(this).find(".connect-tween-item:nth-child(3)"), .6, {
    x: 20,
    y: 40,
    autoAlpha: 0,
    delay: 0,
    ease: Power2.easeOut
  }, .1)
  .from($(this).find(".connect-tween-item:nth-child(4)"), .6, {
    x: 40,
    y: 40,
    autoAlpha: 0,
    delay: 0,
    ease: Power2.easeOut
  }, .1);

	var scene4 = new ScrollMagic.Scene({
	        triggerElement: this,
	        offset: -100,
	        reverse:true,
          duration: "100%"
	    })
		.setTween(connectTween)
		.addTo(controller)
    // .addIndicators()
		;
});