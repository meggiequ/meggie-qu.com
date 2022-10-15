
  // Enable Tool Tips Globally 
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
  
  // Enable Modal Gallery Globally 
  $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
      event.preventDefault();
      $(this).ekkoLightbox();
  }); 

  function pasuser(form) { 

    var loginPassword = "meggie"; 

      if (form.pass.value== loginPassword ) { 
        $('.tranStuff').toggleClass( "transparent", 1000, "easeInSine" );
        $('div.tile').addClass('hidden');
        $('body').css( "background", "#fbfbfb" );
      } 
    else { alert("Wrong Password"); }
  }


  
