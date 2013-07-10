var sylvester = require('sylvester'),
    Matrix = sylvester.Matrix,
    Vector = sylvester.Vector;

var prepareTrainingData = function(X, y, theta){
    var trainingData = {};
    var n = X[1].length +1;
    
    //Initialize theta to 0s
    for(var i=0; i<n ;i++){
        theta[i] = 0;
    }
    //Append 1s to X
    for(var i=0; i<X.length; i++){
        X[i] = [1].concat(X[i]);
    }
    //Vectorize inputs using sylvester
    var X_mat = Matrix.create(X);
    var y_vec = Vector.create(y);
    var theta_vec = Vector.create(theta);     
    trainingData["X_mat"] = X_mat;
    trainingData["y_vec"] = y_vec;
    trainingData["theta_vec"] = theta_vec;
    return trainingData;
};

var featureNorm = function(X_mat){
    var m = X_mat.rows();
    var n = X_mat.cols();
    var X = X_mat.elements;

    for(var i=0; i<n; i++){ 
        var feat_max= -100000;
        for(var j=0; j<m; j++){
            if(X[j][i] > feat_max){
                feat_max = X[j][i];
            } 
        }
        for(var j=0; j<m; j++){
            X[j][i] = X[j][i]/feat_max;
        }
}  
    X_mat = Matrix.create(X);
    return X_mat;
}

var computeCost = function(X_mat, y_vec, theta_vec){
    var m = y_vec.cols();   

    //Hypothesis
    var h_vec  = X_mat.x(theta_vec);
    //Cost function
    var diff_vec= h_vec.subtract(y_vec);
    diff_vec = diff_vec.elementMultiply(diff_vec)
    var J = (1/(2*m))*(diff_vec.sum())
    return J;
};

var gradientDescent = function(X_mat, y_vec, theta_vec, alpha, iterations){
    var m = y_vec.cols();
    
    //Run gradient descent
    for(var iter=1; iter<iterations; iter++){
        var h_vec  = X_mat.x(theta_vec);
        var error_vec = (h_vec.subtract(y_vec));
        var term = (X_mat.transpose()).x(error_vec);
        var correction_vec = term.x((alpha/m));
                
        theta_vec  = theta_vec.subtract(correction_vec)
        //console.log(theta_vec);
    }
    return theta_vec;
};
exports.featureNorm = featureNorm;
exports.prepareTrainingData = prepareTrainingData;
exports.gradientDescent = gradientDescent;
exports.computeCost = computeCost;
