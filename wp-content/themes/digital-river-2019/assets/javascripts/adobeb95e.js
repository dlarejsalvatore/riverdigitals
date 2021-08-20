var adobe_boxes_offset = 0;
jQuery(document).ready(function($){
    
    $(".adobe-slide-tabs").hide();

	var number_of_slides = $(".adobe-slide-tabs").find(".adobe-slide-tab").length;
	var current_slide = 1;
	var third_of_screen = ($(window).height() / 1.5);

	transition_slide = function(slide_number) { 

		if(slide_number === current_slide) return false;

		$('.adobe-box').removeClass("top-box").removeClass("current-box");

		$(".adobe-slide-tab").removeClass("active");
		$('.adobe-slide-tab[data-slide="'+slide_number+'"]').addClass("active");


		$('.adobe-box').find(".target").css("opacity",0);


		// if(slide_number > current_slide) {
			
		// 	for (var i = current_slide; i < slide_number; i++) {
		// 		$('[data-slide="'+i+'"]').css("top","-100%");
		// 	}

		// } else if(slide_number < current_slide) {
			
		// 	for (var i = current_slide; i >= slide_number; i--) {
		// 		$('[data-slide="'+i+'"]').css("top","0%");
		// 	}
		
		// }

		// setTimeout(function(){
			for (var i = 0; i < slide_number; i++) {
				$('.adobe-box[data-slide="'+i+'"]').addClass("top-box");
			}

			for (var i = number_of_slides; i >= slide_number; i--) {
				$('.adobe-box[data-slide="'+i+'"]').addClass("current-box");
			}
		// },300);

		var boxes_height = $(".adobe-boxes").height() - ($(".adobe-boxes").find(".adobe-box").eq(0).outerHeight() * 2);
        adobe_boxes_offset = ((boxes_height/number_of_slides)* slide_number);
        
		$('.adobe-box[data-slide="'+slide_number+'"]').find(".target").css("opacity",1);

		current_slide = slide_number;
	}

	$('.adobe-box').find(".target").css("opacity", 0);


	adobe_slides = [];
	$(".adobe-slide").each(function(){
		adobe_slides.push($(this).offset().top);
	});


	var adobe_content_piece = $(".adobe-content-piece").offset().top + ($(".adobe-content").outerHeight() * 2);
    var adobe_content_piece_bottom = $("#bottomSection").offset().top; 
	$(window).on("scroll", function(e) {
		
		var top_of_screen = $(document).scrollTop() + third_of_screen;
		var found = false;

		if(top_of_screen < adobe_content_piece) {
			$('.adobe-box').removeClass("top-box").removeClass("current-box");
			current_slide = 0;

            $(".adobe-boxes").css("position", "absolute");
        }else if(top_of_screen > adobe_content_piece_bottom-third_of_screen) {
			$(".adobe-boxes").css({
                position:"absolute"
            });
		} else {
			$(".adobe-boxes").css({
                position: "absolute",
                top: (($(document).scrollTop() - $(".adobe-slides").offset().top) - adobe_boxes_offset) - 100
            });
		}

		for (var i = (adobe_slides.length+1); i >= 1; i--) {
			
			if (top_of_screen > adobe_slides[i-1]) {
				transition_slide(i);
				found = true;
				break;
			}

		}

	});
});



$(document).scroll(function() {
  var y = $(this).scrollTop();
  if (y > $(".adobe-content").offset().top && y < ($(".adobe-content-piece").height()+500)) {
    $('.adobe-slide-tabs').fadeIn("fast");
  } else {
    $('.adobe-slide-tabs').fadeOut("fast");
  }
});


$(".adobe-slide-tab").on("click", function(){$('html, body').animate({
    scrollTop: $(".slide-content[data-slide='"+$(this).data("slide")+"']").offset().top - 150
}, 500);})