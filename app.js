var fs = require('fs'),
    sylvester = require('sylvester'),
    Matrix = sylvester.Matrix,
    Vector = sylvester.Vector;


var X = [] //features
var y = [] //labels
var theta = [0,0];

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

function computeCost(X_mat, y_vec, theta_vec){
    var m = y.length;
   
    //Hypothesis
    var h_vec = X_mat.x(theta_vec);

    //Cost function
    var diff_vec= h_vec.subtract(y_vec);
    diff_vec = diff_vec.elementMultiply(diff_vec)
    var J = (1/(2*m))*(diff_vec.sum())
    return J;
}

function gradientDescent(X_mat, y_vec, theta_vec, alpha, iterations){
    var m = y.length;
    //Run gradient descent
    for(var iter=1; iter<iterations; iter++){
        var h_vec  = X_mat.x(theta_vec);
        var error_vec = (h_vec.subtract(y_vec));
        var term = (X_mat.transpose()).x(error_vec);
        var correction_vec = term.x((alpha/m));
        
        theta_vec  = theta_vec.subtract(correction_vec)
    }
    return theta_vec;
}

var main = function(){
    var input_file = process.argv[2];
    if(input_file === undefined){
        console.log("Usage: node app.js <filename>");
    }
    parseInput(input_file, function(){
        //Append 1s to X
        for(var i=0; i<X.length; i++){
            X[i] = [1, X[i]];
        }
        //Vectorize inputs
        var X_mat = Matrix.create(X);
        var y_vec = Vector.create(y);
        var theta_vec = Vector.create(theta);     
        
        var iterations = 2500;
        var alpha = 0.01;

        var J = computeCost(X_mat, y_vec, theta_vec);
        console.log("old cost "+J);
        theta_vec = gradientDescent(X_mat,y_vec,theta_vec, alpha, iterations);
        var J_new = computeCost(X_mat, y_vec, theta_vec)
        console.log("new cost "+ J_new);
    });


}

if(require.main === module){
    main();
}
