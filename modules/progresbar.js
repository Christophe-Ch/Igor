exports.progressbar = (min, max, curr, fullCharacter, emptyCharacter) => {

    if(curr > max){
        curr = max;
    }
    else if(curr < min){
        curr = min;
    }

    var progress = "[";
    max -= min;
    curr -= min;
    curr /= max;
    
    for(var i = 0; i < curr * 10; i++){
        progress += fullCharacter;
    }

    if(Math.floor(curr * 10) != curr * 10){
        var i = Math.floor(curr * 10) + 1;
    }

    for(; i < 10; i += 1){
        progress += emptyCharacter;
    }

    progress += ']';

    return progress;
}