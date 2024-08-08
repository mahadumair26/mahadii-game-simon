
    var gameArray = [];
    var userClickedPattern=[];
    var color = ["green","red","blue","yellow"];
    var Level;
    var started = false;
    var difficulty;

    $("h1").text("Select the Game Level");

    $(".level-btn").on("click",function(e){  //easy medium hard function 
        var audio = new Audio;
        audio.src="mouse-click.mp3";
        audio.play();
        difficulty = e.target.attributes[2].value; //getting the value form the click as i hardcode the value in the button as value=400;

        // console.log("You clicked me");
        $(".difficulty-level").addClass("container");//special effect
        $("div").eq(2).removeClass("container");
        $("h1").text("Press A Key to Start");


    $("body").keypress(function (e) { 
        if(!started){
        if(e.key.toLowerCase() === "a"){ 
            Level = 1;                        
            $("h1").text("Level "+Level);

            nextSequence();
            userInput();
            
            started = true}
            }
            });
        })

            function nextSequence(){
            var random_number = Math.floor(Math.random()*4);     //random number generator
            $("#"+color[random_number]).addClass("white");  //taking the random number from the array and adding a class white for effect

            setTimeout(()=>{
                $("#"+color[random_number]).removeClass("white"); //using the difficulty for the game level 
                },difficulty);

                var audio = new Audio();               //playing the audio as according to the song   
                audio.src=color[random_number]+".mp3";
                audio.play(); 

                gameArray.push(color[random_number]);      //pushing the color in the array 
            }

            function userInput(){                        //taking the user Input
                $(".btn").off("click").on("click", (e) => {  //tracking the click event and getting the id which is color

                    var userChosenColor = e.target.id;

                    var audio = new Audio();
                    audio.src=userChosenColor+".mp3";
                    audio.play(); 

                    $("#"+userChosenColor).addClass("pressed");//adding the special effect
                    setTimeout(()=>{
                    $("#"+userChosenColor).removeClass("pressed");
                    },100);
                    userClickedPattern.push(userChosenColor);//pushing the color into the user array
                    
                    if(gameArray.length === userClickedPattern.length){//checking the length is equal if not call itself again so it can take the user input
                        checkAnswer();
                    }else{
                        userInput();
                    }
                });
                }
        
                //if wrong answer
            function wrongAnswer(){
                $("h1").text("Game Over, Press Any Key to Restart");
                $("body").addClass("body");

                setTimeout(()=>{
                $("body").removeClass("body");
                },500);

                var audio = new Audio();
                audio.src="wrong.mp3";
                audio.play(); 

                $(document).on("keypress",()=>{
                    window.location.reload();
                })
            }

            //checking the array remember both array are global 
            //we are 
            function checkAnswer(){
                console.log("Game: "+gameArray);
                console.log("User: "+userClickedPattern);

                function checkinginprogress(){
                    for(var i=0 ;i<gameArray.length;i++){
                    if(gameArray[i] !== userClickedPattern[i] ){
                        return false;
                    }
                }
                return true;
            }


                    if(checkinginprogress()){//if user and comp color same then

                    // console.log("correct answer");
                    Level++;
                    userClickedPattern= []; //making the array empty so it can take the input again for the next level 

                    $("h1").text("Level "+Level);
                    console.log(Level);
                    nextSequence(); //generating the next sequence form the computer 
                    }
                else{
                    console.log("wrong answer");
                    wrongAnswer();
                }
        }
