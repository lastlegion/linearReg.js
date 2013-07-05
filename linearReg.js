var computeCost = function(X_mat, y_vec, theta_vec){
    var m = y_vec.cols();
   
    //Hypothesis
    var h_vec = X_mat.x(theta_vec);

    //Cost function
    var diff_vec= h_vec.subtract(y_vec);
    diff_vec = diff_vec.elementMultiply(diff_vec)
    var J = (1/(2*m))*(diff_vec.sum())
    return J;
}

var gradientDescent = function(X_mat, y_vec, theta_vec, alpha, iterations){
    var m = y_vec.cols();
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

exports.gradientDescent = gradientDescent;
exports.computeCost = computeCost;
