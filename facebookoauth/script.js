var button;
var userInfo;

window.fbAsyncInit = function() {
    FB.init({ appId: '568380213209675', //change the appId to your appId
        status: true, 
        cookie: true,
        xfbml: true,
        oauth: true});
 
   function updateButton(response) {
        button       =   document.getElementById('fb-auth');
        userInfo     =   document.getElementById('user-info');
        
        if (response.authResponse) {
            //user is already logged in and connected
            FB.api('/me', function(info) {
                login(response, info);
            });
            
            button.onclick = function() {
                FB.logout(function(response) {
                    logout(response);
                });
            };
        } else {
            //user is not connected to your app or logged out
            button.innerHTML = 'Login';
            button.onclick = function() {

                FB.login(function(response) {
                    if (response.authResponse) {
                        FB.api('/me', function(info) {
                            login(response, info);
                        });	   
                    } else {
                        //user cancelled login or did not grant authorization
                        
                    }
                }, {scope:'email,user_birthday,status_update,publish_stream,user_about_me'});  	
            }
        }
    }
    
    // run once with current status and whenever the status changes
    FB.getLoginStatus(updateButton);
    FB.Event.subscribe('auth.statusChange', updateButton);	
};
(function() {
    var e = document.createElement('script'); e.async = true;
    e.src = document.location.protocol 
        + '//connect.facebook.net/en_US/all.js';
    document.getElementById('fb-root').appendChild(e);
}());


function login(response, info){
    if (response.authResponse) {
        var accessToken                                 =   response.authResponse.accessToken;
        
        userInfo.innerHTML                             = '<img src="https://graph.facebook.com/' + info.id + '/picture">' + info.name
                                                         + "<br /> Your Access Token: " + accessToken;
        button.innerHTML                               = 'Logout';
        document.getElementById('other').style.display = "block";
    }
}

function logout(response){
    userInfo.innerHTML                             =   "";
    document.getElementById('debug').innerHTML     =   "";
    document.getElementById('other').style.display =   "none";
}

//stream publish method
function streamPublish(name, description, hrefTitle, hrefLink, userPrompt){
    FB.ui(
    {
        method: 'stream.publish',
        message: '',
        attachment: {
            name: name,
            caption: '',
            description: (description),
            href: hrefLink
        },
        action_links: [
            { text: hrefTitle, href: hrefLink }
        ],
        user_prompt_message: userPrompt
    },
    function(response) {
    });

}
function showStream(){
    FB.api('/me', function(response) {
        //console.log(response.id);
        streamPublish('GlobalScholar Website link', 'I like this website', 'hrefTitle', 'http://www.globalscholar.com/', "Share GlobalScholar");
    });
}

function share(){
    var share = {
        method: 'stream.share',
        u: 'http://nagesforyou.blogspot.com/'
    };

    FB.ui(share, function(response) { 
        console.log(response); 
    });
}

function graphStreamPublish(){
    
    FB.api('/me/feed', 'post', 
        { 
            message     : "This is a test application.",
            link        : 'http://nagesforyou.blogspot.com',
            picture     : 'http://m.c.lnkd.licdn.com/mpr/pub/image-haOXnx7nNlBkDcAQdA5JDKs7toqHScPIhaOMsw-2tJ75SjWIhaOM7lOntHyiSQ0dr7IY/nageswaran-sokkayaraj.jpg',
            name        : 'Nothing special',
            description : 'There is nothing special in this application'
            
    }, 
    function(response) {
        
        if (!response || response.error) {
            alert('Error occured');
        } else {
            alert('Post ID: ' + response.id);
        }
    });
}

function fqlQuery(){
    
    FB.api('/me', function(response) {    
        //http://developers.facebook.com/docs/reference/fql/user/
        var query       =  FB.Data.query('select name, profile_url, sex, pic_small from user where uid={0}', response.id);
		//var query       =  FB.Data.query('select * from user where uid={0}', response.id);
        query.wait(function(rows) {
           document.getElementById('debug').innerHTML =  
             'FQL Information: '+  "<br />" + 
             'Your name: '      +  rows[0].name                                                            + "<br />" +
             'Your Sex: '       +  (rows[0].sex!= undefined ? rows[0].sex : "")                            + "<br />" +
             'Your Profile: '   +  "<a href='" + rows[0].profile_url + "'>" + rows[0].profile_url + "</a>" + "<br />" +
             '<img src="'       +  rows[0].pic_small + '" alt="" />' + "<br />";
         });
    });
}
