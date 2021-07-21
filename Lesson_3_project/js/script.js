// open modal on button click
var modal_open_btn = document.getElementById('myBtn');

var modal_div = document.getElementById('myModal');

var modal_close_btn = document.getElementsByClassName('close')[0];

// when click on open button, open the modal
modal_open_btn.onclick = function() {
	modal_div.style.display = 'block';
}

// when click on close button, close the modal
modal_close_btn.onclick = function() {
	modal_div.style.display = 'none';
}

// when click outside the modal area, close the modal
window.onclick = function(event) {
	if(event.target == modal_div) {
		modal_div.style.display = 'none';
	}
}

// update age slider value
var slider = document.getElementById('age');
var output = document.getElementById('ageRange');
output.innerHTML = slider.value; // display the initial value

// change to current value
slider.oninput = function() {
	output.innerHTML = this.value;
}


// this function receives student information
function sendStudentInfo(e) {
	e.preventDefault();
	
	// receive input
	var name, gender, age, nationality;

	name = document.getElementById('name').value;
	gender = document.getElementById('gender').value;
	age = document.getElementById('age').value;
	nationality = document.getElementById('nationality').value;




	// generate question
	var questions;

	questions = '<h1>Traffic Questions</h1>';

	questions += '<pre id="student_info">Student: <strong>' + name + '</strong>   ';
	questions += 'Gender: <strong>' + gender + '</strong>   ';
	questions += 'Age: <strong>' + age + '</strong>   ';
	questions += 'Nationality: <strong>' + nationality + '</strong>   </pre>';
	

	questions += generateDate(); // get current date
	questions += generateQuestion(); // get questions

	// submit answer button
	questions += '<button class="btn" onclick="submitAnswer(event)">መልሱን ያስገቡ</button>';
	questions += '';




	document.getElementById('question_header').innerHTML = questions;





	// close modal
	modal_div.style.display = 'none';

	// hide original button
	modal_open_btn.style.display = 'none';
}

// this function generates current date
function generateDate(){
	var thisDate = ''; // Wednesday July 21, 2021
	var today = new Date();
	var date = today.getDate(); // 1 ... 31 (31 days of month)
	var day = today.getDay(); // 0 .. 6 (7 days of week)
	var month = today.getMonth(); // 0 ... 11 (12 months of year)
	var year = today.getFullYear(); // 2021

	// get week day by name, 0 .. 6
	switch(day) {
		case 0:
			thisDate += 'Sunday';
			break;
		case 1:
			thisDate += 'Monday';
			break;
		case 2:
			thisDate += 'Tuesday';
			break;
		case 3:
			thisDate += 'Wednesday';
			break;
		case 4:
			thisDate += 'Thursday';
			break;
		case 5:
			thisDate += 'Friday';
			break;
		case 6:
			thisDate += 'Saturday';
			break;
	}

	var monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var thisMonth = monthsArr[month]; // 6

	// Wednesday July 21, 2021
	thisDate += ' ' + thisMonth + ' ' + date + ', ' + year;

	return thisDate;
}

// this function outputs questions related to traffic rules
function generateQuestion() {
	var trafficQuestion = '', str;

	var questionsArray = [
		'This road sign is:',
		'This sign indicates the _______________ vehicles can safely travel in this area.',
		'This warning sign:',
		'This sign warns of a ________ ahead.',
		'This road sign means:',
		'This road sign means:',
		'This signal means:',
		'This sign means:',
		'This road sign means:',
		'This sign means:'
	];

	var choicesArray = [
		'a guide sign, a regulatory sign, a warning sign, a speed reduction sign',
		'reaction speed, minimum speed, maximum speed, suggested speed',
		'provides advance notice to upcoming speed limit change, shows the current speed limit that all vehicles traveling in the direction of the arrow must not exceed, indicates the suggested highest safe speed, tells drivers that the minimum safe speed is 45 MPH',
		'soft shoulder, hill, no passing zone, truck',
		'Merging traffic, Do not enter, You must come to a complete stop, Slow down! stop if necessary and yield the right-of-way',
		'Roundabout ahead, Parking spaces are reserved for people with disabled parking permits, Traffic must turn in the direction of the arrow, Lanes are reserved for carpool vehicles',
		'Move to the left, Stop, Slow down, Proceed',
		'the road may be slippery when wet, no turns are allowed on this road, narrow road ahead, series of curves ahead',
		'Do not block intersection, No right turn, Low clearance, Yield the right-of-way to oncoming vehicles',
		'The divided highway on which drivers are traveling ends ahead, A road crosses the main highway ahead, Drivers are coming to a point where another traffic lane joins the one they are on, None of the above'
	];

	var imagesArray = [
		'img/1_slower-traffic-keep-right.jpeg',
		'img/2_speed-limit-sign.jpeg',
		'img/3_speed-reduction-sign.jpeg',
		'img/4_hill-sign.jpeg',
		'img/5_yield-sign.jpeg',
		'img/6_parking-disabled-sign.jpeg',
		'img/7_flag-stop.jpeg',
		'img/8_winding-road-sign.jpeg',
		'img/9_low-clearance-sign-2.jpeg',
		'img/10_merging-traffic-sign.jpeg'
	];

	for(var i = 0; i < questionsArray.length; i++){
		trafficQuestion += '<br><br><hr> <p>' + (i + 1) + '. ' + questionsArray[i] + '</p>';
		// add the image
		trafficQuestion += '<div class="question_left">';
		trafficQuestion += '<img src="' + imagesArray[i] + '" class="traffic_img">';
		trafficQuestion += '</div>';

		// split choices string to choices array
		str = choicesArray[i].split(', ');

		// add the choice
		trafficQuestion += '<div class="question_right">';
		trafficQuestion += '<form>';

		// give different ID to each choice; 
		// id = choice0_0, choice0_1, choice0_2, choice0_3 .... first question
		// id = choice1_0, choice1_1, choice1_2, choice1_3 .... second question
		// id = choice2_0, choice2_1, choice2_2, choice2_3 .... third question

		// loop through choices
		for(var j = 0; j < str.length; j++){

			trafficQuestion += '<label class="choices">';
			trafficQuestion += str[j];
			trafficQuestion += '<input id="choice' + i + '_' + j + '" type="radio" name="radio" value="' + str[j] + '">';
			trafficQuestion += '<span class="checkmark"></span>';
			trafficQuestion += '</label>';
			
		}
		trafficQuestion += '</form>';
		trafficQuestion += '</div> <br><br>';


	}


	return trafficQuestion;
}

// this function submits answers on button click
function submitAnswer(event){
	event.preventDefault();

	// capture student answers
	// only 10 answers submitted!!
	var question_0_answer, question_1_answer, question_2_answer, question_3_answer,
		question_4_answer, question_5_answer, question_6_answer, question_7_answer,
		question_8_answer, question_9_answer;

	var studentAnswers, correctAnswers;

	// collect choices first, 40 choices for 10 questions
	var question_0_choices_array = [], question_1_choices_array = [], question_2_choices_array = [],
		question_3_choices_array = [], question_4_choices_array = [], question_5_choices_array = [],
		question_6_choices_array = [], question_7_choices_array = [], question_8_choices_array = [],
		question_9_choices_array = []; // 4 choices

	for(var i = 0; i < 4; i++){
		question_0_choices_array[i] = document.getElementById('choice0_' + i); // 0_0, 0_1, 0_2, 0_3
		question_1_choices_array[i] = document.getElementById('choice1_' + i); // 1_0, 1_1, 1_2, 1_3
		question_2_choices_array[i] = document.getElementById('choice2_' + i);
		question_3_choices_array[i] = document.getElementById('choice3_' + i);
		question_4_choices_array[i] = document.getElementById('choice4_' + i);
		question_5_choices_array[i] = document.getElementById('choice5_' + i);
		question_6_choices_array[i] = document.getElementById('choice6_' + i);
		question_7_choices_array[i] = document.getElementById('choice7_' + i);
		question_8_choices_array[i] = document.getElementById('choice8_' + i);
		question_9_choices_array[i] = document.getElementById('choice9_' + i);

		// if the choice is selected, the submit it as student answer
		if(question_0_choices_array[i].checked){
			question_0_answer = question_0_choices_array[i].value;
		}

		if(question_1_choices_array[i].checked){
			question_1_answer = question_1_choices_array[i].value;
		}

		if(question_2_choices_array[i].checked){
			question_2_answer = question_2_choices_array[i].value;
		}
		if(question_3_choices_array[i].checked){
			question_3_answer = question_3_choices_array[i].value;
		}
		if(question_4_choices_array[i].checked){
			question_4_answer = question_4_choices_array[i].value;
		}
		if(question_5_choices_array[i].checked){
			question_5_answer = question_5_choices_array[i].value;
		}
		if(question_6_choices_array[i].checked){
			question_6_answer = question_6_choices_array[i].value;
		}
		if(question_7_choices_array[i].checked){
			question_7_answer = question_7_choices_array[i].value;
		}
		if(question_8_choices_array[i].checked){
			question_8_answer = question_8_choices_array[i].value;
		}
		if(question_9_choices_array[i].checked){
			question_9_answer = question_9_choices_array[i].value;
		}
	}

	// gather student 10 answers
	studentAnswersArr = [question_0_answer, question_1_answer, question_2_answer, question_3_answer,
		question_4_answer, question_5_answer, question_6_answer, question_7_answer,
		question_8_answer, question_9_answer];

	// b, c, a, b, d, b, b, d, c, c
	correctAnswersArr = ['a regulatory sign', 'maximum speed',
		'provides advance notice to upcoming speed limit change', 
		'hill', 'Slow down! stop if necessary and yield the right-of-way', 
		'Parking spaces are reserved for people with disabled parking permits', 
		'Stop', 'series of curves ahead', 'Low clearance', 
		'Drivers are coming to a point where another traffic lane joins the one they are on'];


	// sent submitted choices for grading
	gradeAnswers(studentAnswersArr, correctAnswersArr);
}


// this function grades submitted answers
function gradeAnswers(responseArr, correctArr){
	var counter = 0, finalGrade, decision, message, certificate;
	
	// get student info from output
	var stu_info_arr = studentInfo(); // name, gender, age, nationality

	// get current date
	var today = generateDate();



	// compare to the correct answers and !!COUNT!! the correct ones
	for(var i = 0; i < responseArr.length; i++){
		if(responseArr[i] == correctArr[i]){
			counter++; // increases as answer is correct
		}
	}


	// final grade out of 100%
	// if answers 6 out of 10, 6/10 = 0.6; 0.6*100 = 60; score = 60%
	finalGrade = (counter/10) * 100;

	// decide the passing grade, only allowd to miss one question
	if(finalGrade >= 90){
		decision = 'Passed!';
		message = 'Congradulations! You are now ready for practical test.';
	} else {
		decision = 'Failed!';
		message = 'Exam must be retaken. You are only allowd to miss one question!';
	}

	// generate certificate
	certificate = '=================== Driving Test Exam ===================';
	certificate += '<br>Student: ' + stu_info_arr[0];
	certificate += '<br>Exam taken on: ' + today;
	certificate += '<br>Score: ' + finalGrade + '%';
	certificate += '<br>Decision: ' + decision;
	certificate += '<br>' + message;
	certificate += '<br>Correct Answers: 1. b, 2. c, 3. a, 4. b, 5. d, 6. b, 7. b, 8. d, 9. c, 10. c';
	certificate += '<br>====================================================';


	// export certificate
	document.getElementById('question_header').innerHTML = certificate;

}

function studentInfo(){
	var stuInfoStr = document.getElementById('student_info').textContent;
	var stuInfoArr = stuInfoStr.split(' '); // 17 elements
	var studentInfo = [];
	var j = 0;

	for(var i = 0; i < stuInfoArr.length; i++){
		if(stuInfoArr[i].includes(':') || stuInfoArr[i] == ''){
			// do nothing
		} else {
			studentInfo[j] = stuInfoArr[i];
			j++; // increases as we find correct info
		}
	}


	return studentInfo;
}











