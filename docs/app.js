
"use strict";

//Task controller
var taskController = (function () {

    //created different function constructors  for the different categories
    var Morning = function (id,plan,startTime, endTime,) {
        this.id = id;
        this.plan = plan;
        this.startTime = startTime;
        this.endTime = endTime;
    };
    

     var Afternoon = function (id, plan, startTime, endTime) {
         this.id = id;
         this.plan = plan;
         this.startTime = startTime;
         this.endTime = endTime;
     };

      var Night = function (id, plan, startTime, endTime) {
          this.id = id;
          this.plan = plan;
          this.startTime = startTime;
          this.endTime = endTime;
      };


      var calculateTaskTotal = function (timeRange) {
          var sum = 0;

          data.allCategories[timeRange].forEach(cur => {
              sum += cur.value;
          });

          data.total[timeRange] = sum;


      };


      //created a datastructure for adding the items to the category they fall
      var data = {
          allCategories : {
              morningPlan: [],
              afternoonPlan: [],
              nightPlan: []
          },

          total : {
              morningPlan: 0,
              afternoonPlan: 0,
              nightPlan: 0

          }
         
      };


      return {
          //returning a function that will enable me addItem to the structure i created and also make it available to the controller
          addItem: function (sTime,eTime, pla,timeRange) {
              var newItem, ID, noOfItems;

              //give an id to the item being addded
              if (data.allCategories[timeRange].length > 0) {
                  ID = data.allCategories[timeRange][data.allCategories[timeRange].length-1].id + 1;
              } else  {
                  ID = 0;
              }


              if (timeRange === 'morningPlan') {
                  newItem = new Morning(ID,pla,sTime,eTime);

              }  else if(timeRange  === 'afternoonPlan') {
                 newItem = new Afternoon(ID, pla, sTime, eTime);

              } else if (timeRange === 'nightPlan') {
                   newItem = new Night(ID, pla, sTime, eTime);
              }

              data.allCategories[timeRange].push(newItem);
              
              return newItem;
          },

          updateTask: function (timeRange) {
            var noOfItems;

              noOfItems = data.allCategories[timeRange].length;

              data.total[timeRange] = noOfItems;

              return noOfItems;

          },

          deleteItem: function (timeRange, id) {
              var ids, index;

              ids = data.allCategories[timeRange].map(function (current) {
                  return current.id;
              });

              index = ids. indexOf(id);

              if (index !== -1){
                  //checks if the index returned exists, splice is used to remove an element from an array, while slice is used to create a copy
                  data.allCategories[timeRange].splice(index, 1);
              }

              index = ids.indexOf(id);
          },

          testing:  function () {
              console.log(data);
          }
          
          
      }

})();



//UI controller
var UIController = (function () {

    //collected and renamed the classes and  id from  the html, so as to give them easier names
    var DOMstrings = {
       addPlan: '.add__plan',
       InputStartTime: '.startTime',
       InputEndTime: '.endTime',
       inputBtn: '.add__btn',
        tasksContainer: '.tasks',
       morningContainer: '.task-morning',
       afternoonContainer: '.task-afternoon',
       nightContainer: '.task-night',
       numMorningTask: '.Daily-plan__morning--value',
       numAfternoonTask: '.Daily-plan__afternoon--value',
        numNightTask:  '.Daily-plan__night--value'

    };

    return {
        //returns,  an object collection object that we  want to be able to acess from the other controllers 

        getINput: function () {
            return {
                plan: document.querySelector(DOMstrings.addPlan).value,
                startTime: document.querySelector(DOMstrings.InputStartTime).value,
                endTime: document.querySelector(DOMstrings.InputEndTime).value,

            }

        },


        addListItem: function (newIt,timeRange) {

            //adds the item to the UI
            var html, element, newHtml;

            if (timeRange === 'morningPlan') {
                element = DOMstrings.morningContainer;

                html = '<div class="item clearfix" id="morningPlan-%id%"><div class="item__morningPlan">%plan%</div><div class="right clearfix"><div class="item__time">%startTime% - %endTime%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (timeRange === 'afternoonPlan') {
                element = DOMstrings.afternoonContainer;

                html = '<div class="item clearfix" id="afternoonPlan-%id%"><div class="item__afternoonPlan">%plan%</div><div class="right clearfix"><div class="item__time">%startTime% - %endTime%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (timeRange === 'nightPlan') {
                element = DOMstrings.nightContainer;
                html = '<div class="item clearfix" id="nightPlan-%id%"><div class="item__nightPlan">%plan%</div><div class="right clearfix"><div class="item__time">%startTime% - %endTime%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            newHtml = html.replace('%id%',newIt.id);
            newHtml = newHtml.replace('%plan%', newIt.plan);
            newHtml = newHtml.replace('%startTime%', newIt.startTime);
            newHtml = newHtml.replace('%endTime%', newIt.endTime);

            
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
           
        },

        deleteListItem: function (slectorID) {
            var el;

             el = document.getElementById(slectorID);
            el.parentNode.removeChild(el);
        },

        updateNumOfTasks: function (numtask,timeRange) {
            if (timeRange === 'morningPlan') {
                document.querySelector(DOMstrings.numMorningTask).textContent = numtask;     
            }  
            
            else if (timeRange === 'afternoonPlan') {
                document.querySelector(DOMstrings.numAfternoonTask).textContent = numtask;
            }

            else if (timeRange === 'nightPlan') {
                document.querySelector(DOMstrings.numNightTask).textContent = numtask;
            }


        },

        clearFields: function () {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.addPlan  + ','+ DOMstrings.InputStartTime + ',' + DOMstrings.InputEndTime);
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach((current, index, array) => {
                array[0].value = "";
                array[1].value = document.querySelector(DOMstrings.InputEndTime).value;
                array[2].value = document.querySelector(DOMstrings.InputEndTime).value;
            });

            fieldsArr[0].focus();
        },

        getDOMstrings: function () {

            
            return DOMstrings;
        }
    }

})();


// controller
var controller = (function (taskCtrl, UICtrl) {

    //sets up Event listeners
    var setupEventListeners = function (){

        var  DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
         

            if (event.keycode ===13 || event.which === 13) {
                ctrlAddItem();
            }
        })

        document.querySelector(DOM.tasksContainer).addEventListener('click', ctrlDeleteItem);
    };



    var ctrlAddItem = function () {
        var input,newItem, noOfItems;

        //1. colleced filled input data
        input = UICtrl.getINput();

        if (input.plan !== ""  && input.startTime !== "" && input.endTime !=="") {
         
            //2. collect and format the time and decide the periodOfDay
            var timeSplitStart, timeSplitEnd, hoursStart,hoursEnd, minutesStart, minutesEnd, meridianStart, meridianEnd, periodOfDay;

            timeSplitStart = input.startTime.split(':');
            timeSplitEnd = input.endTime.split(':');
           

            hoursStart = timeSplitStart[0];
            minutesStart = timeSplitStart[1];

            hoursEnd = timeSplitEnd[0];
            minutesEnd = timeSplitEnd[1];

            meridianStart = timeSplitStart[0] >= 12 ? "PM" : "AM";
            meridianEnd = timeSplitEnd[0] >= 12 ? "PM" : "AM";

            if (hoursStart < 12) {
                periodOfDay = 'morningPlan';
            } else if (hoursStart >= 12 && hoursStart < 18) {
                periodOfDay = 'afternoonPlan';
            } else if (hoursStart >= 18) {
                periodOfDay = 'nightPlan';
            }

            hoursStart = hoursStart % 12 || 12;
            

            hoursEnd = hoursEnd % 12 || 12;
           

            input.startTime = hoursStart + ':' + minutesStart + ' ' + meridianStart;
            input.endTime = hoursEnd + ':' + minutesEnd + ' ' + meridianEnd;
            //3. then add the input to our data structure i.e the taskController
            newItem =taskCtrl.addItem(input.startTime, input.endTime, input.plan, periodOfDay);
        
            //4. display the item added to the UI
            UICtrl.addListItem(newItem, periodOfDay);

            noOfItems = taskCtrl.updateTask(periodOfDay);

            UICtrl.updateNumOfTasks(noOfItems,periodOfDay);

            UICtrl.clearFields();
          
            taskCtrl.testing();

        }
        
    };


    var ctrlDeleteItem = function (event) {
        var ItemID, splitItem, periodOfDay, ID, noOfItems;

        ItemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (ItemID) {
            //checks if ItemID has a value
            splitItem = ItemID.split('-');

            periodOfDay = splitItem[0];
            ID = parseInt(splitItem[1]);

            taskCtrl.deleteItem(periodOfDay, ID);

            UICtrl.deleteListItem(ItemID);

            noOfItems = taskCtrl.updateTask(periodOfDay);
            UICtrl.updateNumOfTasks(noOfItems, periodOfDay);
            
        }
    };

    return {
        init: function () {
            console.log('Daily planner is running');
            setupEventListeners();
        }
    }

})(taskController, UIController);

controller.init();