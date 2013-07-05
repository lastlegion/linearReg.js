var fs = require('fs')

X = [] //features
y = [] //labels
function parseInput(fileName, callback){
    fs.readFile('ex1data1.txt', 'utf8', function(err,data){

        lines = data.split("\n");

        for(var i=0; i<lines.length; i++){
            var line = lines[i].split(",");
            if(!line[0] ==""){
                X[i] = line[0];
                y[i] = line[1];
            }
        }
        callback();
    });

}

var main = function(){
    var input_file = process.argv[2];
    if(input_file === undefined){
        console.log("Usage: node app.js <filename>");
    }
    parseInput(input_file, function(){
        console.log(X);
    });
}

if(require.main === module){
    main();
}
