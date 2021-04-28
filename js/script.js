$(document).ready(function () {
    $('.btn-start').click(function (e) {
        e.preventDefault();
        console.info('a');
        // $.ajax({
        //     url: $(this).attr('href'),
        //     context: document.body
        // }).done(function(data) {
        //     console.info(data);
        //     $( this ).addClass( "done" );
        // });
    });
    $('.btn-start2').click(function (e) {
        e.preventDefault();
        console.info('asd');
    });
});