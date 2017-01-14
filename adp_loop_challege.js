var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100, 112, 113];

var counter = 0;

function myFunction() {
	var eachNumber = numbers[counter];

	if (eachNumber % 2 != 0)
	{
		numbers.splice(counter, 1);
	}

    if (counter <= numbers.length) {
        setTimeout(myFunction, 1);
    }

	counter++;

    if (eachNumber === undefined)
    {
		console.log(numbers);
	}

}

myFunction();



