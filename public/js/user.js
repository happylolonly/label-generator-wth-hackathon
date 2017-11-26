$(document).ready(function(){
	$('.j-show-new-color').change(function(){
		var vineColor = $('input[name="vine"]:checked').val();
		var bottleColor = $('input[name="bottle"]:checked').val();
		var image = 'images/' + vineColor + '-' + bottleColor + '.jpg';
		$('.j-result-image').attr('src', image);
	});

	$('.j-generate').click(function(){
		$('#preloader').addClass('preloader-visible');

		$.ajax({
		  url: "/api/generate",
		  // context: document.body
			method: 'get'
		}).done(function(data) {
			const img = document.createElement('img');
			img.src = data;
			img.id = 'label';

			var secondStepResult = document.querySelector('.j-second-step-result');
			secondStepResult.innerHTML = '';
			secondStepResult.append(img);
			$('#preloader').removeClass('preloader-visible');
		  // $( this ).addClass( "done" );

			$('.wrapper').fadeOut(600);
			setTimeout(function(){
				$('.second-step').fadeIn(600);
			}, 600);
		});

		
		return false;
	});

	$('.j-dislike').click(function(){
		$('.second-step').fadeOut(600);
		setTimeout(function(){
			$('.wrapper').fadeIn(600);
		}, 600);
	});

	$('.j-like').click(function(){
		var label = document.getElementById('label');
		var bottle = document.querySelector('.j-result-image');
		var finalRes = document.getElementById('third-step-image');
		finalRes.appendChild(label);
		finalRes.appendChild(bottle);

		$('.second-step').fadeOut(600);
		setTimeout(function(){
			$('.third-step').fadeIn(600);
		}, 600);
	});
});
