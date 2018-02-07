
$(document).ready(function () {
    var counter = 0;

    function myCB() {
        setTimeout(function() {
            $( "#root" ).append('<div><h2>All requests complete</h2></div>' );
        }, 500);
    }

    var streams = {
        each: function (callback) {
            callback('data1');
            callback('data2');
            callback('data3');
        } 
    }

    function ajaxReq(obj) {
        $.ajax({
            url: '/data/'+obj+'.json',
            data: obj
        })
        .done(function() {
            $('#root #counter').html(++counter);
        });
    }
    
    streams.each(ajaxReq);
    callWhenRadyToGo(myCB);
});

function callWhenRadyToGo(cb) {
    $(document).ajaxStop(function() {
        cb();
    });
}