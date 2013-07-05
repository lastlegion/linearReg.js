var fs = require('fs'),
    sylvester = require('sylvester'),
    Matrix = sylvester.Matrix,
    Vector = sylvester.Vector,
    lineareg= require('./lib/lineareg');


function parseInput(fileName, X, y, callback){
    fs.readFile(fileName, 'utf8', function(err,data){
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
        return;
    }
    var X = [] //features
    var y = [] //labels
    var theta = [0,0];  //linear regression parameters

    parseInput(input_file, X, y, function(){       
               
        //Vectorize training data
        var trainingData = lineareg.prepareTrainingData(X,y,theta);      
        X_mat = trainingData["X_mat"];
        y_vec = trainingData["y_vec"];
        theta_vec = trainingData["theta_vec"];
        
        //Configurations for gradient descent
        var iterations = 2500;
        var alpha = 0.01;

        var J = lineareg.computeCost(X_mat, y_vec, theta_vec);
        console.log("old cost "+J);
        theta_vec = lineareg.gradientDescent(X_mat,y_vec,theta_vec, alpha, iterations);
        var J_new = lineareg.computeCost(X_mat, y_vec, theta_vec)
        console.log("new cost "+ J_new);
    });


}

if(require.main === module){
    main();
}
