//Creating variables to select the Required HTML Elements
var Time=document.getElementById('Time');
var display=document.getElementById('display_Alarms_Container');
var T;


//Get Method For Time Display
function Curr_Time()
{
	T=new Date().toString().split(' ')[4];
	var H=T.split(':');
	if( H[0] >12){
		if(H[0]<10)
			H[0]="0"+(parseInt(H[0])-12).toString();
		else
			H[0]=(parseInt(H[0])-12).toString();
		T=H[0]+":"+H[1]+":"+H[2];
		Time.innerHTML=T+" PM";
		return;
	}
	Time.innerHTML=T+" AM";
}

// Getting & Updating Current Time to the HTML 
var id=setInterval(Curr_Time,1000);

//Creating variables to select the Required HTML Elements
var Input=document.querySelectorAll('.alarm_Input > input');
var M_E=document.getElementById('Time_selector');
var H,M,S,delete_1={},resu;

//Adding Event Listener to get the Input values of Hour,Minutes,Seconds
Input[0].addEventListener('keydown',function(e){
		if(e.keyCode==9){
			H=Input[0].value;
		}
});
Input[1].addEventListener('keydown',function(e){
		if(e.keyCode==9){
			M=Input[1].value;
		}
});
Input[2].addEventListener('keydown',function(e){
		if(e.keyCode==9){
			S=Input[2].value;
		}
});


// Creating Listener & Adding the Alarm Queue Tasks Data
var submit=document.querySelector('.button');
submit.addEventListener('click',()=>{
		if(delete_1.length==undefined || delete_1.length==0){	
			result();
			delete_1 = document.querySelectorAll('.del');
			return;
		
		}
		else{
			//Checking If Queue has already added this Alarm Task
		
			for(let i of delete_1){
				if(`${H}:${M}:${S} ${M_E.value}`== i.outerText){
					alert('Alarm already Existed');
					return;
				}
				
			   }
			
				//Adding a new Alarm
				result();
				delete_1 = document.querySelectorAll('.del');
			
			}
			
		});


// Functions which Creates and add Elements to the Alarm Queue
function result(){
		
		// Checking if user has left any input without a Proper value 
		
		if(H==undefined || M==undefined || S==undefined || H>12 || M>59 || S>59){
		  alert("Enter the Correct value and use Tab to move to Next field");
		  return;
		}
		else{
	
			// Creating the Required HTML Elements for displaying Alarm Queue  
			
			let div=document.createElement("div");
			div.setAttribute('style',"display:flex");
			let para=document.createElement('p');
			let text=document.createTextNode(`${H}:${M}:${S} ${M_E.value}`);
			let B=document.createElement("INPUT");
			div.setAttribute('class',"del");
			let d = new Date();
			B.setAttribute('id',d.getTime().toString());
			B.setAttribute('type','button');
			B.setAttribute('value','Delete');
			para.appendChild(text);
			div.appendChild(para);
			div.appendChild(B);	
			display.appendChild(div);
		    }
				
}


// Adding Event Listener on Entire documents to find the Delete input element id
document.addEventListener('click', function(e){
  	resu=e.target.id;
	for(let i of delete_1){

		// Removing the Element if Delete Button is Clicked 
		if(i.lastChild.id==resu)
			i.remove();
			delete_1 = document.querySelectorAll('.del');
	}
  });


// Constantly Checking if one the Alarm Queue Task is equal to Current Time 
var id1= setInterval(()=>{
	
	//Getting the Current Time 
	var Test=new Date().toString().split(' ')[4];
	var t
	if(Test.split(':')[0]>11){
    		t=T+" PM";
	}
	else{
    		t=T+" AM";
	}

	// Alert the User if one of the Alarm Queue is Equal to the Time
	for(let i of delete_1){
		if(i.outerText==t){
			alert('Time to Wake UP!');
		}
	}
},1000);


