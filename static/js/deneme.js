// This script assumes mathjs is loaded globally as 'math' (which it does when using the browser bundle)


// Available options: "number", "BigNumber", "bigint", "Fraction"
math.config({ number: 'number' });  


// Example: Basic arithmetic and constants
console.log("Pi:", math.pi);
console.log("e ^ 2:", math.exp(2));
console.log("sqrt(16):", math.sqrt(16));

// Example: Expression parsing
console.log("Evaluate '2 + 3 * 4':", math.evaluate('2 + 3 * 4'));

// Example: Matrix operations
const matrix1 = math.matrix([[1, 2], [3, 4]]);
const matrix2 = math.matrix([[5, 6], [7, 8]]);
console.log("Matrix addition:", math.add(matrix1, matrix2));

// Example: Complex numbers
const complex = math.complex(3, -4);
console.log("Complex magnitude:", math.abs(complex));

// Example: Units
console.log("Convert 100 km/h to m/s:", math.evaluate('100 km/h to m/s'));

// Example: Creating a custom function (optional extension)
const customScope = {
    a: 5,
    b: 10
};
console.log("Custom expression 'a * b + sin(pi/4)':", math.evaluate('a * b + sin(pi/4)', customScope));

// Example: Simple 1D FFT (signal with constant value)
const signal1 = [1, 1, 1, 1, 5, 8];  // Length must be power of 2 for current mathjs fft
const fft1 = math.fft(signal1);
console.log("FFT:", fft1);

// Example: Simple 3x3 diagonal matrix (eigenvalues should match diagonal)
const matrix10 = math.matrix([[0,  -1, -1 ], 
                              [1, 0, -1], 
                              [0,  1, 0 ]] );
const eigs1 = math.eigs(matrix10);
console.log("Eigenvalues:", eigs1.values);
console.log("Eigenvectors:", eigs1.eigenvectors);
