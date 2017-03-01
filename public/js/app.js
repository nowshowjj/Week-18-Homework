$(document).ready(function () {
    $('.button-collapse').sideNav();

    // define the modal
    $('#modal_note').modal({
    });

    //
    $('.noteBtn').on('click', function (ret) {

        ret.stopImmediatePropagation();

        
        var currentBtn = $(this).attr('id');
        populate_all_notes(currentBtn);

        
        $('#modal_note').modal('open');

        
        $('#noteBtn').on('click', function (ret) {
            ret.preventDefault();

        
            var note_text = $('#note_text');

                $.post("/note/" + currentBtn, $('#form').serialize())
                    .done(function (data) {
                        populate_all_notes(currentBtn);
                    })
                    .fail(function (error) {
                        console.log("could not make the note", error);
                    });

            // empty out the note
            note_text.val('');

            return false;
        });
    });

    // function to read in notes
    function populate_all_notes(id) {

       
        $('.messages').empty();

      
        $.get("/note/" + id, function (data) {
            for (var i = 0; i < data.length; i++) {
                var note = $(
                    '<li class="note collection-item">'
                    + '<p>'
                    + (i+1) + ': ' + data[i].note_text + '</p>'
                    + '<button class="singleNoteBtn waves-effect waves-light btn-flat red" data-currentBtnId="' + data[i]._id + '">Delete note #' + (i+1) + '</button>'
                    + '</li>'
                );

                $('.messages').append(note);
            }

        })
        .then(function() {

          
            $(".singleNoteBtn").on("click", function() {

                var currentBtnId = $(this).data(currentBtnId);

               
                $.post("/delete_note/" + currentBtnId.currentBtnid, $('#form').serialize())
                    .done(function (data) {
                        $('#modal_note').modal('close');
                    })

                .fail(function () {
                    console.log("Sorry, i could delete");
                });

        
            });
        })

    }

})