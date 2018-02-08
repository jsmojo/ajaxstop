
(function () {
    callWhenRadyToGo(myCB);

    //Test data 
    var counter = 0;
    var streams = {
        each: function (callback) {
            callback('data1');
            callback('data2');
            callback('data3');
        } 
    }
    function ajaxReq(obj) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            document.getElementById("counter").innerHTML = ++counter;
            }
        };
        xhttp.open("GET", "/data/"+obj+".json", true);
        xhttp.send();
    }
    
    streams.each(ajaxReq);
    
    // Callback function
    function myCB() {
        var element = document.createElement('div');
        var title = document.createElement('h2');
        var textnode = document.createTextNode('All requests complete'); 
        title.appendChild(textnode); 
        element.appendChild(title);
        document.getElementById("root").appendChild(element );
    }
    //request to call myCB when all ajax requests are complete
    
})();

function callWhenRadyToGo(cb) {
    var interceptor = (function(open) {

        var activeXhr = [];
        
        XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
    
            this.addEventListener('readystatechange', function() {
                // open has been called
                if(this.readyState == 1 ){
                    activeXhr.push(this);
                }
                // operation is complete
                else if(this.readyState == 4 ) {
                    var i = activeXhr.indexOf(this);
                    if(i > -1) {
                        activeXhr.splice(i ,1);
                    }
                    if(!activeXhr.length) {
                        cb();
                    }
                }
            }, false);
    
            open.call(this, method, url, async, user, pass);
        };
    
    })(XMLHttpRequest.prototype.open);
}