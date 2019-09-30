
$(document).ready(function(){
    $('.slider__inner').slick({
        prevArrow:'<button type="button" class="slider-prev"></button>',
        nextArrow:'<button type="button" class="slider-next"></button>',
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                arrows:false,
                dots:true,                 
              }
            }
        ]
    });

    //tabs
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    //catalog items
    function toggleSlide(item){
      $(item).each(function(i){
        $(this).on('click', function(e){
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__div').eq(i).toggleClass('catalog-item__div_active');
        });
      });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal

    $('[data-modal=consultation]').on('click',function(){
      $('.overlay,#consultation').fadeIn('slow');
    });

    $('.modal__close').on('click',function(){
      $('.overlay,#consultation, #thanks, #order').fadeOut('slow');
    });   

    $(document).mouseup(function (e){
      var div = $("#consultation, #thanks, #order"); 
      if (!div.is(e.target) && div.has(e.target).length === 0) { 
        div.fadeOut('slow');
        $('.overlay,#consultation, #thanks, #order').fadeOut('slow');
      }
    });



    $('.button_mini').each(function(i){
      $(this).on('click', function(){
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
      });
    });

    function validateForms(form){
      $(form).submit(function(e) {
        e.preventDefault();
      }).validate({
        rules:{
          name: "required",
          phone:"required",
          email:{
            required:true,
            email:true,
          }
        },
        messages:{
          name:"Пожалуйста введите имя",
          phone:"Пожалуйста введите номер телефона",
          email:{
            required:"Пожалуйста введите email",
            email:"Не правильно введен адрес email"
          }
        },
        submitHandler: function(form) { 
          $.ajax({
              type: "POST",
              url: "mailer/smart.php",
              data: $(this).serialize()
          }).done(function() {
              $(this).find("input").val("");
              $('#consultation, #order').fadeOut();
              $('.overlay, #thanks').fadeIn('slow');
              $('#consultation, #order').fadeOut();
              $('.overlay, #thanks').fadeIn('slow');
              $('form').trigger('reset');
          });    
        return false;
        }
    
      });
    }

    validateForms('#consultation form');
    validateForms('#consultation-form');
    validateForms('#order form');

    $('input[name=phone]').mask('+7 (999) 999-9999');

    // scroll

    $(window).scroll(function(){
      if($(this).scrollTop()>1600){
        $('.pageup').fadeIn();
      }else{
        $('.pageup').fadeOut();
      }
    });

    $("a[href^='#up']").click(function(){
      var _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });

    new WOW().init();
});
