var fs = require('fs'),
    sylvester = require('sylvester'),
    Matrix = sylvester.Matrix,
    Vector = sylvester.Vector,
    linearReg = require('./lib/linearReg');


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
        var trainingData = linearReg.prepareTrainingData(X,y,theta);      
        X_mat = trainingData["X_mat"];
        y_vec = trainingData["y_vec"];
        theta_vec = trainingData["theta_vec"];
        
        //Configurations for gradient descent
        var iterations = 2500;
        var alpha = 0.01;

        var J = linearReg.computeCost(X_mat, y_vec, theta_vec);
        console.log("old cost "+J);
        theta_vec = linearReg.gradientDescent(X_mat,y_vec,theta_vec, alpha, iterations);
        var J_new = linearReg.computeCost(X_mat, y_vec, theta_vec)
        console.log("new cost "+ J_new);
    });


}

if(require.main === module){
    main();
}
